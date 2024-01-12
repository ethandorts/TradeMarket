import jwt from 'jsonwebtoken';

const TokenGenerator = (res, userId) => {
    const auth_token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '30d'});

    res.cookie('jwt', auth_token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 259200000,
    });
}

export default TokenGenerator;