"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.solutionRouter = void 0;
const express_1 = require("express");
const isAuthenticated_1 = require("../../middlewares/isAuthenticated");
const solution_controller_1 = __importDefault(require("./solution.controller"));
const solutionRouter = (0, express_1.Router)();
exports.solutionRouter = solutionRouter;
const solutionController = new solution_controller_1.default();
solutionRouter.get('/:storeId', isAuthenticated_1.isAuthenticated, solutionController.listSolutions.bind(solutionController));
solutionRouter.post('/', isAuthenticated_1.isAuthenticated, solutionController.create.bind(solutionController));
