import AsyncHandler from "../middleware/AsyncHandler.js";
import User from "../models/UserModel.js";


//@desc Authenticate the user and get a web token 
//@route POST /api/users/login
//@access Public
const LoginUser = AsyncHandler (async (req, res) => {
    const { email, password } = req.body;
    const foundUser = await User.findOne({ email });
    if (foundUser && (await foundUser.matchPassword(password))) {
        res.json({
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
    res.send('Register a User');
});

// @desc Logout a User 
// @route POST /api/users/logout 
// @access Private
const LogoutUser = AsyncHandler(async (req, res) => {
    res.send('User logged out');
});

// @desc Get a User's Profile
// @route GET /api/users/profile
// @access Public 
const GetUserProfile = AsyncHandler(async (req, res) => {
    res.send('Retrieved User Profile');
});

// @desc Update a User's Profile
// @route PUT /api/users/profile
// @access Private 
const UpdateUserProfile = AsyncHandler(async (req, res) => {
    res.send('Updated User Profile');
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

