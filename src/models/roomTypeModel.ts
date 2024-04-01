// Import the neccessary modules from mongoose library
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interface for the roomType document
interface RoomTypeDocument extends Document {
    name: string;
}

// Define the schema for roomType collection
const roomTypeSchema: Schema<RoomTypeDocument> = new Schema<RoomTypeDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

// Create model for roomTyped
const RoomType: Model<RoomTypeDocument> = mongoose.model<RoomTypeDocument>('RoomType', roomTypeSchema);

export { RoomType, RoomTypeDocument };