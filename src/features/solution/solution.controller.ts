import { Request, Response } from "express";
import SolutionService from "./solution.service";
import { CreateSolutionDTO, CreateSolutionSchema } from "./schema";
import { handleError } from "../../utils";

const solutionService = new SolutionService();

class SolutionController {
    async create(req: Request, res: Response) {
        try {
            const data: CreateSolutionDTO = CreateSolutionSchema.parse(req.body);

            const solution = await solutionService.create(data);

            return res.status(201).json(solution);
        } catch (error) {
            return handleError(error, res)
        }
    }
}

export default SolutionController;