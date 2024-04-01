"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the schema for the User collection
const userSchema = new mongoose_1.Schema({
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
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
