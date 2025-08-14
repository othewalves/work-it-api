import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { CategoryController } from "./category.controller";

const categoryRouter = Router();

const categoryController = new CategoryController();

categoryRouter.get('/',
    categoryController.listAllCategories.bind(categoryController)
);
categoryRouter.get('/:categoryId',
    categoryController.listCategoryById.bind(categoryController)
);

categoryRouter.post('/',
    isAuthenticated,
    categoryController.create.bind(categoryController)
);

// categoryRouter.put('/',
//     isAuthenticated,
//     categoryController.update.bind(categoryController)
// );

export { categoryRouter };