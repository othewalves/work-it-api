import { ExceptionError } from "../../utils";
import { CreateSolutionDTO } from "./schema";
import * as repository from './solution.repository';

class SolutionService {
    async create(data: CreateSolutionDTO) {
        const storeExists = await repository.storeExists(data.store_id);

        if (!storeExists) {
            throw new ExceptionError('Comércio inválido', 400, '');
        };

        const solution = await repository.create(data);

        return solution;
    }
}

export default SolutionService;