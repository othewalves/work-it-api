import { Router } from "express";

import { isAuthenticated } from "../../middlewares/isAuthenticated";

import { CategoryController } from "./category.controller";

const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.post('/',
    isAuthenticated,
    categoryController.createCategory.bind(categoryController)
);

export { categoryRouter }