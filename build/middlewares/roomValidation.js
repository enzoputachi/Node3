"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = exports.validateRoom = exports.validateRoomType = void 0;
const express_validator_1 = require("express-validator");
// Validation rules for room types
const validateRoomType = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required for room type'),
];
exports.validateRoomType = validateRoomType;
// Validation rules for rooms
const validateRoom = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required for room'),
    (0, express_validator_1.body)('roomType').notEmpty().withMessage('Room type is required for room'),
    (0, express_validator_1.body)('price').notEmpty().withMessage('Price is required for room'),
];
exports.validateRoom = validateRoom;
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
};
exports.validateRequest = validateRequest;
