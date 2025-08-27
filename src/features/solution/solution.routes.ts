import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import SolutionController from "./solution.controller";

const solutionRouter = Router();

const solutionController = new SolutionController();


solutionRouter.post('/',
    isAuthenticated,
    solutionController.create.bind(solutionController)
);

export { solutionRouter };