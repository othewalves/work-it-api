import { Request, Response } from "express";

import { CategoryService } from "./category.service";

import { CreateCategoryDTO, CreateCategorySchema } from "./schema";

import { handleError } from "../../utils";

const categoryService = new CategoryService();

class CategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const { user_id } = req;

            const dataCategory = CreateCategorySchema.parse(req.body) as CreateCategoryDTO;

            const category = await categoryService.create(user_id, dataCategory);

            return res.status(200).json(category);

        } catch (error) {
            return handleError(error, res);
        }
    };
};

export { CategoryController };