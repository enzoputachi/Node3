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
exports.authorizeAdmin = exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function to authenticate user
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract token from authorization header
        const testToken = req.headers.authorization || req.headers.Authorization;
        let token;
        if (testToken && typeof testToken === 'string' && testToken.startsWith('Bearer')) {
            token = testToken.split(' ')[1];
        }
        if (!token) {
            throw new Error('Token not found');
        }
        // Verify token and decode user information
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Find user by decoded userId
        const authorized = decoded.role;
        if (authorized !== 'admin') {
            throw new Error('Unauthorized');
        }
        console.log(authorized);
        // Attach user to request object
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
});
exports.authenticateUser = authenticateUser;
// Middleware function to authorize admin
const authorizeAdmin = (req, res, next) => {
    var _a;
    const userRole = (_a = req.user) === null || _a === void 0 ? void 0 : _a.role;
    if (userRole !== 'admin') {
        res.status(403).json({ message: 'Not authorized' });
        return;
    }
    next();
};
exports.authorizeAdmin = authorizeAdmin;
