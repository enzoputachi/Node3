import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

// Validation rules for room types
const validateRoomType: ValidationChain[] = [
    body('name').notEmpty().withMessage('Name is required for room type'),
];

// Validation rules for rooms
const validateRoom: ValidationChain[] = [
    body('name').notEmpty().withMessage('Name is required for room'),
    body('roomType').notEmpty().withMessage('Room type is required for room'),
    body('price').notEmpty().withMessage('Price is required for room'),
];

const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};

export {
    validateRoomType,
    validateRoom,
    validateRequest
}