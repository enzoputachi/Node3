import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the User document
interface UserDocument extends Document {
    username: string;
    email: string;
    password: string;
    role: 'guest' | 'admin';
}

// Define the schema for the User collection
const userSchema: Schema<UserDocument> = new Schema({
    // Username filled with type String, required, and unique
    username: {
        type: String,
        required: true,
        unique: true
    },

    // email field with type String and required
    email: {
        type: String,
        required: true,
        unique: true
    },

    // Password field with type String and required
    password: {
        type: String,
        required: true
    },

    // Role filed with type String, restricted to 'guest' or 'admin', defaulting to 'guest'
    role: {
        type: String,
        enum: ['guest', 'admin'],
        default: 'guest'
    }
});

// Create the User model based on the schema
const User: Model<UserDocument> = mongoose.model<UserDocument>('User', userSchema);

// Export the User model for use in other parts of the application
export { User, UserDocument };
