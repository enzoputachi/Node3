"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const roomTypeModel_1 = require("../models/roomTypeModel");
// Create a new room type
function createRoomType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a new room type based on the request body
            const roomType = yield roomTypeModel_1.RoomType.create(req.body);
            // Send a success response with the created room type
            res.status(201).json(roomType);
        }
        catch (error) {
            const err = error;
            // Send an error response if something went wrong
            res.status(400).json({ error: err.message });
        }
    });
}
;
// Retrieve all room types
function getAllRoomTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find all room types in the database
            const roomTypes = yield roomTypeModel_1.RoomType.find();
            // Send a success response with all room types
            res.status(200).json(roomTypes);
        }
        catch (error) {
            const err = error;
            // Send an error response if something went wrong
            res.status(500).json({ error: err.message });
        }
    });
}
;
// Retrieve a specific room type by its ID
function getRoomTypeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find the room type by its ID
            const roomType = yield roomTypeModel_1.RoomType.findById(req.params.id);
            // If room type is not found, return a 404 error
            if (!roomType) {
                res.status(404).json({ error: 'Room type not found' });
                return;
            }
            // Send a success response with the found room type
            res.status(200).json(roomType);
        }
        catch (error) {
            const err = error;
            // Send an error response if something went wrong
            res.status(500).json({ error: err.message });
        }
    });
}
;
// Update a specific room type by its ID
function updateRoomType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find and update the room type by its ID with the new data provided in the request body
            const roomType = yield roomTypeModel_1.RoomType.findByIdAndUpdate(req.params.id, req.body, { new: true });
            // If room type is not found, return a 404 error
            if (!roomType) {
                res.status(404).json({ error: 'Room type not found' });
                return;
            }
            // Send a success response with the updated room type
            res.status(200).json(roomType);
        }
        catch (error) {
            const err = error;
            // Send an error response if something went wrong
            res.status(500).json({ error: err.message });
        }
    });
}
;
// Delete a specific room type by its ID
function deleteRoomType(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find and delete the room type by its ID
            const roomType = yield roomTypeModel_1.RoomType.findByIdAndDelete(req.params.id);
            // If room type is not found, return a 404 error
            if (!roomType) {
                res.status(404).json({ error: 'Room type not found' });
                return;
            }
            // Send a success response indicating the room type has been deleted
            res.status(200).json({ message: 'Room type deleted successfully' });
        }
        catch (error) {
            const err = error;
            // Send an error response if something went wrong
            res.status(500).json({ error: err.message });
        }
    });
}
;
exports.default = {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomType,
    deleteRoomType
};
