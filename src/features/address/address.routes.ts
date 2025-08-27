import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";

import AddressController from "./address.controller";

const addressRouter = Router();

const addressController = new AddressController();

addressRouter.post('/',
    isAuthenticated,
    addressController.create.bind(addressController)
);


export { addressRouter };