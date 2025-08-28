"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const address_service_1 = require("./address.service");
const schema_1 = require("./schema");
const utils_1 = require("../../utils");
const addressService = new address_service_1.AddressService();
class AddressController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = schema_1.createAddressSchema.parse(req.body);
                const address = yield addressService.create(data);
                return res.status(201).json(address);
            }
            catch (error) {
                return (0, utils_1.handleError)(error, res);
            }
            ;
        });
    }
    ;
}
;
exports.default = AddressController;
