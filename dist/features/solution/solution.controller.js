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
const solution_service_1 = __importDefault(require("./solution.service"));
const schema_1 = require("./schema");
const utils_1 = require("../../utils");
const solutionService = new solution_service_1.default();
class SolutionController {
    listSolutions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { storeId } = req.params;
                const solutions = yield solutionService.listSolution(storeId);
                return res.status(201).json(solutions);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = schema_1.CreateSolutionSchema.parse(req.body);
                const solution = yield solutionService.create(data);
                return res.status(201).json(solution);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
}
exports.default = SolutionController;
