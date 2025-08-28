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
exports.findSolutionsByStore = exports.findStoreById = exports.create = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const create = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name, price, duration, description, tags, store_id }) {
    const solution = yield client_1.default.solution.create({
        data: {
            name,
            price,
            duration,
            description,
            tags,
            store_id
        }
    });
    return solution;
});
exports.create = create;
const findStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield client_1.default.store.findFirst({
        where: {
            id
        }
    });
    return store;
});
exports.findStoreById = findStoreById;
const findSolutionsByStore = (store_id) => __awaiter(void 0, void 0, void 0, function* () {
    const solutions = yield client_1.default.solution.findMany({
        where: {
            store_id
        }
    });
    return solutions;
});
exports.findSolutionsByStore = findSolutionsByStore;
