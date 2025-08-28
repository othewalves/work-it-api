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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPassword = exports.forgotPassword = exports.updateUser = exports.createUser = exports.findByEmail = exports.findByCPF = exports.findById = void 0;
const bcryptjs_1 = require("bcryptjs");
const client_1 = __importDefault(require("../../prisma/client"));
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findFirst({
        where: {
            id
        },
        select: {
            cpf: true,
            name: true,
            email: true,
            phone: true,
            store: true,
        }
    });
    return user !== null && user !== void 0 ? user : null;
});
exports.findById = findById;
const findByCPF = (cpf) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findFirst({
        where: {
            cpf
        }
    });
    return user !== null && user !== void 0 ? user : null;
});
exports.findByCPF = findByCPF;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findFirst({
        where: {
            email
        }
    });
    return user !== null && user !== void 0 ? user : null;
});
exports.findByEmail = findByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const passwordEncrypted = yield (0, bcryptjs_1.hash)(data.password, 8);
    const user = yield client_1.default.user.create({
        data: {
            email: data.email,
            name: data.name,
            cpf: data.cpf,
            phone: data.phone,
            role: data.role,
            password: passwordEncrypted,
            photo: data.photo
        }, select: {
            email: true,
            name: true,
            id: true,
            role: true
        }
    });
    return user;
});
exports.createUser = createUser;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.update({
        where: {
            id
        },
        data: data,
        select: {
            id: true,
            name: true,
            email: true,
            cpf: true,
            phone: true,
            photo: true,
            store: true,
        }
    });
    return user;
});
exports.updateUser = updateUser;
const forgotPassword = (newPassword, id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.update({
        where: {
            id
        },
        data: {
            password: newPassword
        }
    });
    return user;
});
exports.forgotPassword = forgotPassword;
const getPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield client_1.default.user.findFirst({
        where: {
            id
        },
        select: {
            password: true
        }
    });
    return user;
});
exports.getPassword = getPassword;
