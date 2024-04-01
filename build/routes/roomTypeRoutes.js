"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomTypeController_1 = __importDefault(require("../controllers/roomTypeController"));
const roomValidation_1 = require("../middlewares/roomValidation");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
// Create a new room type
router.post('/create', authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, roomValidation_1.validateRequest, roomTypeController_1.default.createRoomType);
// Retrieve all room types
router.get('/all', roomTypeController_1.default.getAllRoomTypes);
// Retrieve a specific room type by its ID
router.get('/:id', roomTypeController_1.default.getRoomTypeById);
// Update a specific room type by its ID
router.patch('/:id', authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, roomValidation_1.validateRequest, roomTypeController_1.default.updateRoomType);
// Delete a specific room type by its ID
router.delete('/:id', authMiddleware_1.authenticateUser, authMiddleware_1.authorizeAdmin, roomTypeController_1.default.deleteRoomType);
// Export room router module
exports.default = router;
