import { Request, Response } from 'express';
import { User, UserDocument } from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Create a new User
async function createUser(req: Request, res: Response): Promise<void> {
    try {
        console.log("Received password:", req.body.password);

        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create the user object with hashed password
        const user: UserDocument = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        });

        res.status(201).json(user);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
}

// Authenticate a User and issue JWT token
async function authenticateUser(req: Request, res: Response): Promise<void> {
    try {
        const user: UserDocument | null = await User.findOne({ username: req.body.username });
        if (!user) {
            throw new Error('User not found');
        }

        // Verify the password
        const isPasswordValid: boolean = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // If username and password are valid, create JWT token
        const token: string = jwt.sign({ role: user.role }, process.env.JWT_SECRET || '', { expiresIn: '1h' });

        // Send the token along with user information
        res.status(200).json({ message: 'user successfully logged in', user, token });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(401).json({ message: err.message });
    }
}

// Retrieve User Profile
async function getUserProfile(req: Request, res: Response): Promise<void> {
    try {
        const user: UserDocument | null = await User.findById(req.params.userId);
        if (!user) {
            throw new Error('User not found');
        }
        res.status(200).json({ user });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(404).json({ message: err.message });
    }
}

// Retrieve all users
async function getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        // Find all users in the database
        const users: UserDocument[] = await User.find(req.body);
        // Send a success response with all users
        res.status(200).json(users);
    } catch (error: unknown) {
        const err = error as Error;
        res.status(500).json({ message: err.message });
    }
}

// Update User Profile
async function updateUserProfile(req: Request, res: Response): Promise<void> {
    try {
        const updatedUser: UserDocument | null = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
        if (!updatedUser) {
            throw new Error('User not found');
        }
        res.status(200).json({ user: updatedUser });
    } catch (error: unknown) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
}

// Delete User
async function deleteUser(req: Request, res: Response): Promise<void> {
    try {
        const deletedUser: UserDocument | null = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        res.status(204).send();
    } catch (error: unknown) {
        const err = error as Error;
        res.status(400).json({ message: err.message });
    }
}

export default {
    createUser,
    authenticateUser,
    getUserProfile,
    getAllUsers,
    updateUserProfile,
    deleteUser
};
