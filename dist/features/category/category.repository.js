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
exports.createCategory = exports.findCategoryByName = exports.findCategoryById = exports.listAllCategories = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const listAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield client_1.default.category.findMany();
    return categories;
});
exports.listAllCategories = listAllCategories;
const findCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield client_1.default.category.findUnique({
        where: {
            id: categoryId
        },
        select: {
            id: true,
            name: true
        }
    });
    return category;
});
exports.findCategoryById = findCategoryById;
const findCategoryByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield client_1.default.category.findUnique({
        where: {
            name
        }
    });
    return category;
});
exports.findCategoryByName = findCategoryByName;
const createCategory = (_a) => __awaiter(void 0, [_a], void 0, function* ({ name }) {
    const category = yield client_1.default.category.create({
        data: {
            name
        }
    });
    return category;
});
exports.createCategory = createCategory;
