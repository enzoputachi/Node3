// import the necessary modules
import { Request, Response, NextFunction } from 'express';
import Joi, { ObjectSchema } from 'joi';

// Middleware function to validate user data
const validateUserData = (req: Request, res: Response, next: NextFunction): void => {
    const schema: ObjectSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    
    // Validate request body against schema
    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
        return;
    }
    next();
};

export default validateUserData;
