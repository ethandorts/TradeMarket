import AsyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/UserModel.js";
import TokenGenerator from "../utils/TokenGenerator.js";


//@desc Authenticate the user and get a web token 
//@route POST /api/users/login
//@access Public
const LoginUser = AsyncHandler (async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser && (await foundUser.matchPassword(password))) {
        TokenGenerator(res, foundUser._id);
        res.status(200).json({
            _id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            isAdmin: foundUser.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc Register a user 
// @route POST /api/users
// @access Public 
const RegisterUser = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const UserCreated = await User.findOne({ email });

    if (UserCreated) {
        res.status(400);
        throw new Error('User already exists');
    }

    const NewUser = await User.create({
        name,
        email, 
        password,
    });

    if (NewUser) {
        TokenGenerator(res, NewUser._id);
        res.status(201).json({
            _id: NewUser._id,
            name: NewUser.name,
            email: NewUser.email,
            isAdmin: NewUser.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
});

// @desc Logout a User 
// @route POST /api/users/logout 
// @access Private
const LogoutUser = AsyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: 'Logged out successfully' });
});

// @desc Get a User's Profile
// @route GET /api/users/profile
// @access Public 
const GetUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Update a User's Profile
// @route PUT /api/users/profile
// @access Private 
const UpdateUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const UpdatedUser = await user.save();

        res.status(200).json({
            _id: UpdatedUser._id,
            name: UpdatedUser.name,
            email: UpdatedUser.email,
            isAdmin: UpdatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc Get a User
// @route GET /api/users
// @access Admin
const GetUsers = AsyncHandler(async (req, res) => {
    res.send('Get Users');
});

// @desc Delete a User
// @route DELETE /api/users/:id
// @access Admin
const DeleteUser = AsyncHandler(async (req, res) => {
    res.send('Delete a User');
});

// @desc Get a User by ID
// @route GET /api/users/:id
// @access Admin
const GetUserById = AsyncHandler(async (req, res) => {
    res.send('Retrieve User By Id');
});

// @desc Update a User By ID
// @route PUT /api/users/:id
// @access Admin
const UpdateUserByID = AsyncHandler(async (req, res) => {
    res.send('Update User By Id');
});

export {
    LoginUser,
    RegisterUser,
    LogoutUser,
    GetUserProfile,
    UpdateUserProfile,
    GetUsers, 
    DeleteUser,
    GetUserById,
    UpdateUserByID
}

