"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomController_1 = __importDefault(require("../controllers/roomController"));
const roomValidation_1 = require("../middlewares/roomValidation");
const router = express_1.default.Router();
// Create a new room
router.post('/create', roomValidation_1.validateRequest, roomController_1.default.createRoom);
// Retrieve all rooms
router.get('/all', roomController_1.default.getAllRooms);
// Retrieve a specific room by its ID
router.get('/:id', roomController_1.default.getRoomById);
// Update a specific room by its ID
router.patch('/:id', roomValidation_1.validateRequest, roomController_1.default.updateRoomById);
// Delete a specific room by its ID
router.delete('/:id', roomController_1.default.deleteRoomById);
exports.default = router;
