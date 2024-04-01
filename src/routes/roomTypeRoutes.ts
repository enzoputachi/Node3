import express, { Router } from 'express';
import roomTypeController from '../controllers/roomTypeController';
import { validateRequest } from '../middlewares/roomValidation';
import { authenticateUser, authorizeAdmin } from '../middlewares/authMiddleware';

const router: Router = express.Router();

// Create a new room type
router.post('/create', authenticateUser, authorizeAdmin, validateRequest, roomTypeController.createRoomType);

// Retrieve all room types
router.get('/all', roomTypeController.getAllRoomTypes);

// Retrieve a specific room type by its ID
router.get('/:id', roomTypeController.getRoomTypeById);

// Update a specific room type by its ID
router.patch('/:id', authenticateUser, authorizeAdmin, validateRequest, roomTypeController.updateRoomType);

// Delete a specific room type by its ID
router.delete('/:id', authenticateUser, authorizeAdmin, roomTypeController.deleteRoomType);

// Export room router module
export default router;
