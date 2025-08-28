"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const generateToken = (payload) => {
    const token = (0, jsonwebtoken_1.sign)({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role
    }, process.env.SECRETE_JWT, {
        subject: payload.id,
        expiresIn: '15d'
    });
    return token;
};
exports.generateToken = generateToken;
