import jwt from 'jsonwebtoken';
import { expressjwt } from 'express-jwt';

export type JwtPayload = {
    userId: string;
    role: "admin" | "user";
};

const SECRET_KEY = "plop";
const ALGORITHM = "HS256";

export const createAuthToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, SECRET_KEY, {
        algorithm: ALGORITHM,
        expiresIn: '24h'
    });
};

export const authMiddleware = expressjwt({
    secret: SECRET_KEY,
    algorithms: [ALGORITHM],
});