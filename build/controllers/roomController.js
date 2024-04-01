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
const roomModel_1 = require("../models/roomModel"); // Adjust the path as needed
// Controller function to create a new room
function createRoom(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, roomType, price } = req.body;
            const room = new roomModel_1.Room({ name, roomType, price });
            const savedRoom = yield room.save();
            res.status(201).json(savedRoom);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    });
}
// Controller function to get all rooms
function getAllRooms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const rooms = yield roomModel_1.Room.find().populate('roomType').exec();
            res.status(200).json(rooms);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    });
}
// Controller function to get a single room by ID
function getRoomById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomId = req.params.id;
            const room = yield roomModel_1.Room.findById(roomId).populate('roomType').exec();
            if (!room) {
                res.status(404).json({ message: 'Room not found' });
                return;
            }
            res.status(200).json(room);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    });
}
// Controller function to update a room by ID
function updateRoomById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomId = req.params.id;
            const { name, roomType, price } = req.body;
            const updatedRoom = yield roomModel_1.Room.findByIdAndUpdate(roomId, { name, roomType, price }, { new: true }).populate('roomType').exec();
            if (!updatedRoom) {
                res.status(404).json({ message: 'Room not found' });
                return;
            }
            res.status(200).json(updatedRoom);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    });
}
// Controller function to delete a room by ID
function deleteRoomById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const roomId = req.params.id;
            const deletedRoom = yield roomModel_1.Room.findByIdAndDelete(roomId).exec();
            if (!deletedRoom) {
                res.status(404).json({ message: 'Room not found' });
                return;
            }
            res.status(204).send();
        }
        catch (error) {
            const err = error;
            res.status(500).json({ error: err.message });
        }
    });
}
exports.default = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoomById,
    deleteRoomById
};
