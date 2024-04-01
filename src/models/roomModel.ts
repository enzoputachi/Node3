// Import the necessary modules from mongoose library
import mongoose, { Schema, Document, Model } from 'mongoose';

// Define interface for room document
interface RoomDocument extends Document {
    name: string;
    roomType: Schema.Types.ObjectId;
    price: string;
}

// Define the Schema for Room collection
const roomSchema: Schema<RoomDocument> = new Schema<RoomDocument>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    roomType: {
        type: Schema.Types.ObjectId,
        ref: 'Roomtype',
        Required: true
    },
    price: {
        type: String,
        required: true
    }
});

// Create model for Room using the schema
const Room: Model<RoomDocument> = mongoose.model<RoomDocument>('Room', roomSchema);

// Export the Room model to be in other parts of the application
export { RoomDocument, Room };