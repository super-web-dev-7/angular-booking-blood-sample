import expressJwt from 'express-jwt';
import config from './config';

const jwt = () => {
    return expressJwt({secret: config.jwtSecret}).unless({
        path: [
            // public routes that don't require authentication
            '/api/auth/login',
            '/api/auth/register',
        ]
    });
};

export default jwt;
