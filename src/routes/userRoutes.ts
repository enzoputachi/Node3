// import the necessary dependencies
import express, { Router } from 'express';
import userController from '../controllers/userController';
import validateUserData from '../middlewares/userValidation';
import { authenticateUser } from '../middlewares/authMiddleware';

const router: Router = express.Router();

// Route to create a new user
router.post('/create', userController.createUser);

// Route to authenticate a user
router.post('/login', userController.authenticateUser);

// Route to get all users
router.get('/all', userController.getAllUsers);

// Route to retrieve user profile by id
router.get('/:userId', userController.getUserProfile);

// Route to update user profile
router.patch('/:userId', authenticateUser, userController.updateUserProfile); //validateUserData,

// Route to delete user
router.delete('/:userId', authenticateUser, userController.deleteUser);

export default router;
