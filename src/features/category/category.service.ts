import { CreateCategoryDTO } from "./schema/create-category.schema";

import * as repository from "./category.repository";

import { hasPermission, ExceptionError } from "../../utils";


class CategoryService {
    async create(user_id: string, dataCategory: CreateCategoryDTO) {

        const isLibrarian = await hasPermission(user_id);

        if (!isLibrarian) {
            throw new ExceptionError('Operação inválida', 403, 'user');
        }

        const categoryExists = await repository.findCategoryByName(dataCategory.name);

        if (categoryExists) {
            throw new ExceptionError('Categoria já cadastrada', 400, 'name');
        }

        const category = await repository.createCategory(dataCategory);

        return category;
    };
};

export { CategoryService };