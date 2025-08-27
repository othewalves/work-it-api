import { Request, Response } from "express";
import { AddressService } from "./address.service";
import { CreateAddressDTO, createAddressSchema } from "./schema";
import { handleError } from "../../utils";
import { error } from "console";

const addressService = new AddressService();

class AddressController {
    async create(req: Request, res: Response) {
        try {
            const data: CreateAddressDTO = createAddressSchema.parse(req.body);

            const address = await addressService.create(data);

            return res.status(201).json(address);

        } catch (error) {
            return handleError(error, res);
        };
    };
};

export default AddressController;