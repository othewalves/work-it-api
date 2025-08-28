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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
const utils_1 = require("../../utils");
const schema_1 = require("./schema");
const categoryService = new category_service_1.CategoryService();
class CategoryController {
    listAllCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield categoryService.listAllCategories();
                return res.status(200).json(categories);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
            ;
        });
    }
    ;
    listCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { categoryId } = req.params;
                const category = yield categoryService.listCategoryById(categoryId);
                return res.status(200).json(category);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.user_id;
                const data = schema_1.createCategorySchema.parse(req.body);
                const category = yield categoryService.create(user_id, data);
                return res.status(200).json(category);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
            ;
        });
    }
    ;
}
exports.CategoryController = CategoryController;
;
