import { Request, Response } from 'express';
import { RoomType, RoomTypeDocument } from '../models/roomTypeModel';
import { ValidationError } from 'express-validator';

// Create a new room type
async function createRoomType(req: Request, res: Response): Promise<void> {
    try {
        // Create a new room type based on the request body
        const roomType: RoomTypeDocument = await RoomType.create(req.body);
        // Send a success response with the created room type
        res.status(201).json(roomType);
    } catch (error: unknown) {
        const err = error as Error;
        // Send an error response if something went wrong
        res.status(400).json({ error: err.message });
    }
};

// Retrieve all room types
async function getAllRoomTypes(req: Request, res: Response): Promise<void> {
    try {
        // Find all room types in the database
        const roomTypes: RoomTypeDocument[] = await RoomType.find();
        // Send a success response with all room types
        res.status(200).json(roomTypes);
    } catch (error: unknown) {
        const err = error as Error;
        // Send an error response if something went wrong
        res.status(500).json({ error: err.message });
    }
};

// Retrieve a specific room type by its ID
async function getRoomTypeById(req: Request, res: Response): Promise<void> {
    try {
        // Find the room type by its ID
        const roomType: RoomTypeDocument | null = await RoomType.findById(req.params.id);
        // If room type is not found, return a 404 error
        if (!roomType) {
            res.status(404).json({ error: 'Room type not found' });
            return;
        }
        // Send a success response with the found room type
        res.status(200).json(roomType);
    } catch (error: unknown) {
        const err = error as Error;
        // Send an error response if something went wrong
        res.status(500).json({ error: err.message });
    }
};

// Update a specific room type by its ID
async function updateRoomType(req: Request, res: Response): Promise<void> {
    try {
        // Find and update the room type by its ID with the new data provided in the request body
        const roomType: RoomTypeDocument | null = await RoomType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // If room type is not found, return a 404 error
        if (!roomType) {
            res.status(404).json({ error: 'Room type not found' });
            return;
        }
        // Send a success response with the updated room type
        res.status(200).json(roomType);
    } catch (error: unknown) {
        const err = error as Error;
        // Send an error response if something went wrong
        res.status(500).json({ error: err.message });
    }
};

// Delete a specific room type by its ID
async function deleteRoomType(req: Request, res: Response): Promise<void> {
    try {
        // Find and delete the room type by its ID
        const roomType: RoomTypeDocument | null = await RoomType.findByIdAndDelete(req.params.id);
        // If room type is not found, return a 404 error
        if (!roomType) {
            res.status(404).json({ error: 'Room type not found' });
            return;
        }
        // Send a success response indicating the room type has been deleted
        res.status(200).json({ message: 'Room type deleted successfully' });
    } catch (error) {
        const err = error as Error;
        // Send an error response if something went wrong
        res.status(500).json({ error: err.message });
    }
};

export default {
    createRoomType,
    getAllRoomTypes,
    getRoomTypeById,
    updateRoomType,
    deleteRoomType
}