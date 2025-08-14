import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { handleError } from "../../utils";
import { CreateCategoryDTO, createCategorySchema } from "./schema";

const categoryService = new CategoryService();

class CategoryController {
    async listAllCategories(req: Request, res: Response) {
        try {
            const categories = await categoryService.listAllCategories();

            return res.status(200).json(categories);
        } catch (error) {
            return handleError(error, res);
        };
    };

    async listCategoryById(req: Request, res: Response) {
        try {

            const { categoryId } = req.params;

            const category = await categoryService.listCategoryById(categoryId);

            return res.status(200).json(category);

        } catch (error) {
            return handleError(error, res)
        }
    }

    async create(req: Request, res: Response) {
        try {
            const user_id = req.user_id;

            const data: CreateCategoryDTO = createCategorySchema.parse(req.body);

            const category = await categoryService.create(user_id, data);

            return res.status(200).json(category);

        } catch (error) {
            return handleError(error, res);
        };
    };
};

export { CategoryController };