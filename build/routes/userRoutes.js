"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import the necessary dependencies
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Route to create a new user
router.post('/create', userController_1.default.createUser);
// Route to authenticate a user
router.post('/login', userController_1.default.authenticateUser);
// Route to get all users
router.get('/all', userController_1.default.getAllUsers);
// Route to retrieve user profile by id
router.get('/:userId', userController_1.default.getUserProfile);
// Route to update user profile
router.patch('/:userId', authMiddleware_1.authenticateUser, userController_1.default.updateUserProfile); //validateUserData,
// Route to delete user
router.delete('/:userId', authMiddleware_1.authenticateUser, userController_1.default.deleteUser);
exports.default = router;
