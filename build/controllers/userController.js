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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = require("../models/userModel");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// Create a new User
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Received password:", req.body.password);
            // Hash the password
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            // Create the user object with hashed password
            const user = yield userModel_1.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            });
            res.status(201).json(user);
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
        }
    });
}
// Authenticate a User and issue JWT token
function authenticateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.User.findOne({ username: req.body.username });
            if (!user) {
                throw new Error('User not found');
            }
            // Verify the password
            const isPasswordValid = yield bcrypt_1.default.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            // If username and password are valid, create JWT token
            const token = jsonwebtoken_1.default.sign({ role: user.role }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
            // Send the token along with user information
            res.status(200).json({ message: 'user successfully logged in', user, token });
        }
        catch (error) {
            const err = error;
            res.status(401).json({ message: err.message });
        }
    });
}
// Retrieve User Profile
function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.User.findById(req.params.userId);
            if (!user) {
                throw new Error('User not found');
            }
            res.status(200).json({ user });
        }
        catch (error) {
            const err = error;
            res.status(404).json({ message: err.message });
        }
    });
}
// Retrieve all users
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find all users in the database
            const users = yield userModel_1.User.find(req.body);
            // Send a success response with all users
            res.status(200).json(users);
        }
        catch (error) {
            const err = error;
            res.status(500).json({ message: err.message });
        }
    });
}
// Update User Profile
function updateUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const updatedUser = yield userModel_1.User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
            if (!updatedUser) {
                throw new Error('User not found');
            }
            res.status(200).json({ user: updatedUser });
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
        }
    });
}
// Delete User
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const deletedUser = yield userModel_1.User.findByIdAndDelete(req.params.userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            res.status(204).send();
        }
        catch (error) {
            const err = error;
            res.status(400).json({ message: err.message });
        }
    });
}
exports.default = {
    createUser,
    authenticateUser,
    getUserProfile,
    getAllUsers,
    updateUserProfile,
    deleteUser
};
