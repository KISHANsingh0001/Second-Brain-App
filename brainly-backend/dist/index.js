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
const express_1 = __importDefault(require("express"));
const zod_1 = require("zod");
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const middleware_1 = require("./Middleware/middleware");
const utils_1 = require("./utils");
require('dotenv').config();
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Database Connection String  
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected Successfully"))
    .catch((err) => console.error("Database connection Error ", err));
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requireBody = zod_1.z.object({
        email: zod_1.z.string().email("Invalid Email Formate"),
        password: zod_1.z.string().
            refine((password) => {
            return /[A-Z]/.test(password);
        }, { message: "Password must contain at least one uppercase letter" })
            .refine((password) => { return /[a-z]/.test(password); }, {
            message: "Password must contain at least one lowercase letter"
        })
            .refine((password) => { return /[!@#$%^&*(),.?":{}|<>]/.test(password); }, {
            message: "Password must have at least one special character"
        })
    });
    const requireBodyWithSafeParse = requireBody.safeParse(req.body);
    if (!requireBodyWithSafeParse.success) {
        // Extract and return Zod validation errors
        const errors = requireBodyWithSafeParse.error.errors.map((error) => ({
            path: error.path.join("."), // e.g., "password"
            message: error.message, // e.g., "Password must contain at least one uppercase letter"
        }));
        res.status(400).json({
            errors: errors[0].message, // Send an array of field-specific error messages
        });
        return;
    }
    const { email, password } = requireBodyWithSafeParse.data;
    try {
        const userExist = yield db_1.User.findOne({ email: email });
        if (userExist) {
            res.status(409).json({
                msg: "User already exists"
            });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 5);
        yield db_1.User.create({
            email: email,
            password: hashedPassword
        });
        // console.log("user creating");
        res.status(201).json({
            email: email,
            msg: "User signed up successfully"
        });
    }
    catch (e) {
        console.error("Error during SignUp");
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = yield db_1.User.findOne({ email: email });
        if (!user) {
            res.status(401).json({
                msg: "Invalid credentials"
            });
            return;
        }
        const passwordMatched = yield bcrypt_1.default.compare(password, user.password);
        if (passwordMatched) {
            const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
            res.status(200).json({
                email,
                msg: "You are signed in",
                token: token
            });
        }
        else {
            res.status(401).json({
                msg: "Invalid credentials"
            });
        }
    }
    catch (e) {
        console.error("Error during signing in", e);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    const description = req.body.description;
    try {
        yield db_1.Content.create({
            type,
            link,
            title,
            description,
            tags: [],
            userId: req.userId,
        });
        res.status(201).json({
            msg: "Content added successfully"
        });
    }
    catch (e) {
        console.error("Error during content addition", e);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield db_1.Content.find({
            userId: userId
        }).populate("userId", "email");
        if (content.length > 0) {
            res.status(200).json({
                content
            });
        }
        else {
            res.status(404).json({
                msg: "Content not found"
            });
        }
    }
    catch (e) {
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contentId = req.body.contentId;
        console.log(contentId);
        if (!contentId) {
            res.status(400).json({
                msg: "Content ID is required"
            });
            return;
        }
        const userId = req.userId;
        const result = yield db_1.Content.deleteOne({ _id: contentId, userId });
        if (result.deletedCount > 0) {
            res.status(200).json({
                msg: "Deleted successfully",
            });
        }
        else {
            res.status(404).json({
                msg: "Content not found or not owned by the user",
            });
        }
    }
    catch (e) {
        console.error("Error deleting content:", e);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    const userId = req.userId;
    try {
        if (share) {
            const existingLink = yield db_1.Link.findOne({ userId });
            if (existingLink) {
                res.status(200).json({
                    msg: "Sharable link already generated",
                    hash: existingLink.hash
                });
                return;
            }
            const hash = (0, utils_1.random)(10);
            yield db_1.Link.create({ hash, userId });
            const user = yield db_1.User.findOne({ _id: userId }).select('email');
            if (!user) {
                res.status(404).json({ msg: "User Not Found" });
                return;
            }
            res.status(201).json({
                msg: "Sharable link generated",
                hash,
                email: user === null || user === void 0 ? void 0 : user.email
            });
            return;
        }
        else {
            const deleted = yield db_1.Link.deleteOne({ userId });
            if (deleted.deletedCount > 0) {
                res.status(200).json({ msg: "Link removed successfully" });
            }
            else {
                res.status(404).json({ msg: "No link to remove" });
            }
        }
    }
    catch (err) {
        console.error("Error in /share:", err);
        res.status(500).json({ msg: "Internal server error" });
    }
}));
app.get("/api/v1/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    //  Finding the hash from the link table
    const link = yield db_1.Link.findOne({
        hash
    });
    // Link is not found 
    if (!link) {
        res.status(404).json({
            msg: "Page not found"
        });
        return;
    }
    // Find the content from the Content table 
    const content = yield db_1.Content.find({
        userId: link.userId
    });
    // Finding the user 
    const user = yield db_1.User.findOne({
        _id: link.userId
    });
    // if User is not found then it will happen usually it will not happen
    if (!user) {
        res.status(500).json({
            msg: "User not found, unexpected error"
        });
        return;
    }
    // Finial return the email and content of the user 
    res.status(200).json({
        email: user.email,
        content: content
    });
}));
app.get("/users", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //@ts-ignore
        const userId = req.userId;
        const users = yield db_1.User.find({ _id: userId }).select("email");
        if (users.length > 0) {
            res.status(200).json({
                users: users[0].email
            });
        }
        else {
            res.status(404).json({
                msg: "No users found"
            });
        }
    }
    catch (e) {
        console.error("Error fetching users", e);
        res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
app.listen(3003);
