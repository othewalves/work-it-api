"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuthenticated = (req, res, next) => {
    const authToken = req.headers.authorization;
    const token = req.cookies.workit_token;
    // if (!authToken) {
    //     res.status(401).end();
    //     return;
    // }
    // const [, token] = authToken.split(' ');
    try {
        const { sub } = (0, jsonwebtoken_1.verify)(token, process.env.SECRETE_JWT);
        req.user_id = sub;
        next();
    }
    catch (error) {
        res.status(401).end();
    }
};
exports.isAuthenticated = isAuthenticated;
