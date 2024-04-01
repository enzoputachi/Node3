import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface CustomRequest extends Request {
    user?: {
        role: string;
    } | undefined;
}

// Middleware function to authenticate user
const authenticateUser = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        // Extract token from authorization header
        const testToken: string | string[] | undefined  = req.headers.authorization || req.headers.Authorization;
        let token: string | undefined;
        if (testToken && typeof testToken === 'string' && testToken.startsWith('Bearer')) {
            token = testToken.split(' ')[1];
        }
        if (!token) {
            throw new Error('Token not found');
        }
        // Verify token and decode user information
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
        // Find user by decoded userId
        const authorized: string = decoded.role;
        if (authorized !== 'admin') {
            throw new Error('Unauthorized');
        }
        console.log(authorized);
        // Attach user to request object
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

// Middleware function to authorize admin
const authorizeAdmin = (req: CustomRequest, res: Response, next: NextFunction): void => {
    const userRole = req.user?.role;
    if (userRole !== 'admin') {
        res.status(403).json({ message: 'Not authorized' });
        return;
    }
    next();
};

export {
    authenticateUser,
    authorizeAdmin
};
