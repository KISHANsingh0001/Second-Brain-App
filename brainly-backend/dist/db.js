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
exports.Link = exports.Content = exports.Tag = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// const contentTypes = ["image", "video", "article", "audio"]; // Extend as needed
// This is the  User Schema
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});
// This is the Tag Schema
const tagSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
});
// This is the Content Schema
const contentSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    link: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose_1.Types.ObjectId, ref: "User", },
});
// This is the Link Schema
const linkSchema = new mongoose_1.Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
// Here are Models of our Schemas
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
const Tag = (0, mongoose_1.model)("Tag", tagSchema);
exports.Tag = Tag;
const Content = (0, mongoose_1.model)("Content", contentSchema);
exports.Content = Content;
const Link = (0, mongoose_1.model)("Link", linkSchema);
exports.Link = Link;
