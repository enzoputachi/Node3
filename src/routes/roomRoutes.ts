import express, { Router } from 'express';
import roomController from '../controllers/roomController';
import { validateRequest } from '../middlewares/roomValidation';

const router: Router = express.Router();

// Create a new room
router.post('/create', validateRequest, roomController.createRoom);

// Retrieve all rooms
router.get('/all', roomController.getAllRooms);

// Retrieve a specific room by its ID
router.get('/:id', roomController.getRoomById);

// Update a specific room by its ID
router.patch('/:id', validateRequest, roomController.updateRoomById);

// Delete a specific room by its ID
router.delete('/:id', roomController.deleteRoomById);

export default router;
