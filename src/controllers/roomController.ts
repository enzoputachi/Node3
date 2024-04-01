import { Request, Response } from 'express';
import { Room, RoomDocument } from '../models/roomModel'; // Adjust the path as needed

// Controller function to create a new room
async function createRoom(req: Request, res: Response): Promise<void> {
    try {
        const { name, roomType, price } = req.body;
        const room: RoomDocument = new Room({ name, roomType, price });
        const savedRoom: RoomDocument = await room.save();
        res.status(201).json(savedRoom);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

// Controller function to get all rooms
async function getAllRooms(req: Request, res: Response): Promise<void> {
    try {
        const rooms: RoomDocument[] = await Room.find().populate('roomType').exec();
        res.status(200).json(rooms);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

// Controller function to get a single room by ID
async function getRoomById(req: Request, res: Response): Promise<void> {
    try {
        const roomId: string = req.params.id;
        const room: RoomDocument | null = await Room.findById(roomId).populate('roomType').exec();
        if (!room) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.status(200).json(room);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

// Controller function to update a room by ID
async function updateRoomById(req: Request, res: Response): Promise<void> {
    try {
        const roomId: string = req.params.id;
        const { name, roomType, price } = req.body;
        const updatedRoom: RoomDocument | null = await Room.findByIdAndUpdate(
            roomId,
            { name, roomType, price },
            { new: true }
        ).populate('roomType').exec();
        if (!updatedRoom) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.status(200).json(updatedRoom);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

// Controller function to delete a room by ID
async function deleteRoomById(req: Request, res: Response): Promise<void> {
    try {
        const roomId: string = req.params.id;
        const deletedRoom: RoomDocument | null = await Room.findByIdAndDelete(roomId).exec();
        if (!deletedRoom) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }
        res.status(204).send();
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ error: err.message });
    }
}

export default {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomById,
    deleteRoomById
};
