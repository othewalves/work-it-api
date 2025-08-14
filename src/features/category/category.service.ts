import { hasPermission } from './../../utils/has-permission';
import { ExceptionError } from '../../utils';
import * as repository from './category.repository';
import { CreateCategoryDTO } from './schema';

class CategoryService {
    async listAllCategories() {
        const categories = await repository.listAllCategories();

        return categories;
    };

    async listCategoryById(category_id: string) {
        const category = await repository.findCategoryById(category_id);

        if (!category) {
            throw new ExceptionError('Categoria não existe', 404, '');
        };

        return category;
    }

    async create(user_id: string, { name }: CreateCategoryDTO) {

        const isAdmin = await hasPermission(user_id);

        if (!isAdmin) {
            throw new ExceptionError('Operação não autorizada', 403, '');
        };

        const categoryAlreadyExists = await repository.findCategoryByName(name);

        if (categoryAlreadyExists) {
            throw new ExceptionError('Categoria já cadastrada', 401, '');
        };

        const category = await repository.createCategory({ name });

        return category;
    };


};

export { CategoryService };