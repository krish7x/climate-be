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
exports.getAllByQuery = exports.getAllById = exports.getAll = exports.getById = exports.deleteById = exports.updateById = exports.createMany = exports.create = void 0;
const create = (schema, data) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .create({
            data
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.create = create;
const createMany = (schema, data) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .createMany({
            data
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.createMany = createMany;
const updateById = (schema, data, key = 'id', id) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .update({
            where: {
                [key]: id
            },
            data
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.updateById = updateById;
const deleteById = (schema, key = 'id', id) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .delete({
            where: {
                [key]: id
            }
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.deleteById = deleteById;
const getById = (schema, key = 'id', id) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .findUnique({
            where: {
                [key]: id
            }
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.getById = getById;
const getAll = (schema, take = 10, skip = 0) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .findMany({ take, skip })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.getAll = getAll;
const getAllById = (schema, key = 'id', id, take = 10, skip = 0) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .findMany({
            take,
            skip,
            where: {
                [key]: id
            }
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.getAllById = getAllById;
const getAllByQuery = (schema, queryObj) => {
    return new Promise((res, rej) => __awaiter(void 0, void 0, void 0, function* () {
        yield schema
            .findMany({
            where: Object.assign({}, queryObj)
        })
            .then((response) => res(response))
            .catch((err) => rej(err));
    }));
};
exports.getAllByQuery = getAllByQuery;
//# sourceMappingURL=crud.js.map