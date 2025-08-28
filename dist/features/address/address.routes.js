"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRouter = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
const address_controller_1 = __importDefault(require("./address.controller"));
const addressRouter = (0, express_1.Router)();
exports.addressRouter = addressRouter;
const addressController = new address_controller_1.default();
addressRouter.post('/', isAuthenticated_1.isAuthenticated, addressController.create.bind(addressController));
