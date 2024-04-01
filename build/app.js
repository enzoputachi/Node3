"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const roomTypeRoutes_1 = __importDefault(require("./routes/roomTypeRoutes"));
const roomRoutes_1 = __importDefault(require("./routes/roomRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
// Require the validation middleware
const roomValidation_1 = require("./middlewares/roomValidation");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4111;
const MONGODB_URI = process.env.MONGODB_URI;
// Middleware
app.use(express_1.default.json());
// Routes
app.use('/api/v1/room-types', roomValidation_1.validateRequest, roomTypeRoutes_1.default); // Use roomType routes
app.use('/api/v1/rooms', roomValidation_1.validateRequest, roomRoutes_1.default); // Use room routes
app.use('/api/v1/users', userRoutes_1.default); // Use user routes validateUserData,
// Connect to MongoDB and start server
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
    .catch((error) => console.error('Error connecting to MongoDB:', error.message));
exports.default = app;
