import dotenv from 'dotenv';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import roomTypeRoutes from './routes/roomTypeRoutes';
import roomRoutes from './routes/roomRoutes';
import userRoutes from './routes/userRoutes';

// Require the validation middleware
import { validateRequest } from './middlewares/roomValidation';
import validateUserData from './middlewares/userValidation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4111;
const MONGODB_URI: string = process.env.MONGODB_URI as string;

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/room-types', validateRequest, roomTypeRoutes); // Use roomType routes
app.use('/api/v1/rooms', validateRequest, roomRoutes); // Use room routes
app.use('/api/v1/users', userRoutes); // Use user routes validateUserData,

// Connect to MongoDB and start server
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error: Error) => console.error('Error connecting to MongoDB:', error.message));

export default app;
