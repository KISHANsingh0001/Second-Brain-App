import express from "express";
import { z } from 'zod';
import { Content, Link, User } from "./db";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, MONGO_URL } from "./config";
import mongoose from "mongoose";
import { userMiddleware } from "./Middleware/middleware";
import { random } from "./utils";
require('dotenv').config();
const app = express();
import cors from 'cors'

app.use(express.json());
app.use(cors());

// Database Connection String  
mongoose.connect(MONGO_URL)
    .then(() => console.log("Database connected Successfully"))
    .catch((err) => console.error("Database connection Error ", err))

app.post("/api/v1/signup", async (req, res) => {
    const requireBody = z.object({
        email: z.string().email("Invalid Email Formate"),
        password: z.string().
            refine((password) => {
                return /[A-Z]/.test(password)
            }, { message: "Password must contain at least one uppercase letter" })
            .refine((password) => { return /[a-z]/.test(password) }, {
                message: "Password must contain at least one lowercase letter"
            })
            .refine((password) => { return /[!@#$%^&*(),.?":{}|<>]/.test(password) }, {
                message: "Password must have at least one special character"
            })
    });

    const requireBodyWithSafeParse = requireBody.safeParse(req.body);
    if (!requireBodyWithSafeParse.success) {
        // Extract and return Zod validation errors
        const errors = requireBodyWithSafeParse.error.errors.map((error) => ({
            path: error.path.join("."), // e.g., "password"
            message: error.message,    // e.g., "Password must contain at least one uppercase letter"
        }));

         res.status(400).json({
            errors: errors[0].message, // Send an array of field-specific error messages
        });
        return;
    }
    console.log("here");
    
    const { email, password } = requireBodyWithSafeParse.data;
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.status(409).json({
                msg: "User already exists"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        await User.create({
            email: email,
            password: hashedPassword
        });
        // console.log("user creating");


        res.status(201).json({
            msg: "User signed up successfully"
        });
    }
    catch (e) {
        console.error("Error during SignUp");
        res.status(500).json({
            msg: "Internal server error"
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            res.status(401).json({
                msg: "Invalid credentials"
            })
            return;
        }
        const passwordMatched = await bcrypt.compare(password, user.password);

        if (passwordMatched) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET);
            res.status(200).json({
                msg: "You are signed in",
                token: token
            })
        } else {
            res.status(401).json({
                msg: "Invalid credentials"
            })
        }
    } catch (e) {
        console.error("Error during signing in", e);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    try {
        await Content.create({
            type,
            link,
            title,
            tags: [],
            //@ts-ignore
            userId: req.userId,
        })
        res.status(201).json({
            msg: "Content added successfully"
        })
    } catch (e) {
        console.error("Error during content addition", e);
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        //@ts-ignore
        const userId = req.userId;
        const content = await Content.find({
            userId: userId
        }).populate("userId", "email")
        if (content.length > 0) {
            res.status(200).json({
                content
            });
        } else {
            res.status(404).json({
                msg: "Content not found"
            })
        }
    } catch (e) {
        res.status(500).json({
            msg: "Internal server error"
        })
    }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        console.log(contentId)
        if (!contentId) {
            res.status(400).json({
                msg: "Content ID is required"
            })
            return;
        }
        //@ts-ignore
        const userId = req.userId;
        const result = await Content.deleteOne({ _id: contentId, userId });

        if (result.deletedCount > 0) {
            res.status(200).json({
                msg: "Deleted successfully",
            })
        } else {
            res.status(404).json({
                msg: "Content not found or not owned by the user",
            });
        }
    } catch (e) {
        console.error("Error deleting content:", e);
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;
    try {
        if (share) {
            const existingLink = await Link.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if (existingLink) {
                res.status(200).json({
                    msg: "Sharable link already generated",
                    hash: existingLink.hash
                });
                return;
            }
            const hash: string = random(10);
            await Link.create({
                hash: hash,
                //@ts-ignore
                userId: req.userId,
            });
            res.status(201).json({
                msg: "Sharable link generated successfully",
                hash
            });
        } else {
            const deletedUser = await Link.deleteOne({
                //@ts-ignore
                userId: req.userId
            })
            if (deletedUser.deletedCount > 0) {
                res.status(200).json({
                    msg: "Link removed successfully"
                });
            } else {
                res.status(404).json({
                    msg: "No link to remove"
                });
            }
        }
    } catch (e) {
        res.status(500).json({
            msg: "Internal server error",
        });
    }
});

app.get("/api/v1/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
//  Finding the hash from the link table
    const link = await Link.findOne({ 
        hash
    });
   // Link is not found 
    if (!link) {
        res.status(404).json({
            msg: "Page not found"
        })
        return;
    }
   // Find the content from the Content table 
    const content = await Content.find({
        userId: link.userId
    })
  // Finding the user 
    const user = await User.findOne({
        _id: link.userId
    });
  // if User is not found then it will happen usually it will not happen
    if (!user) {
        res.status(500).json({
            msg: "User not found, unexpected error"
        });
        return;
    }
  // Finialy return the email and content of the user 
    res.status(200).json({
        email: user.email,
        content: content
    })
})

app.listen(3003);