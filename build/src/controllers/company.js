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
exports.getAllCompanies = exports.getCompany = exports.deleteCompany = exports.updateCompany = exports.createCompany = void 0;
const crud_1 = require("../helpers/crud");
const index_1 = require("../prisma/index");
const logger_1 = require("../utils/logger");
const statusCode_1 = require("../utils/statusCode");
const createCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address } = req.body;
        const data = {
            name,
            email,
            address
        };
        yield (0, crud_1.create)(index_1.prisma.company, data)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Company created successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to add company in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Create Company API Called!`);
    }
});
exports.createCompany = createCompany;
const updateCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.updateById)(index_1.prisma.company, req.body, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Company updated successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to update company in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Update Company API Called!`);
    }
});
exports.updateCompany = updateCompany;
const deleteCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.deleteById)(index_1.prisma.company, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Company deleted successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to delete company in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Delete Company API Called!`);
    }
});
exports.deleteCompany = deleteCompany;
const getCompany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.getById)(index_1.prisma.company, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Company fetched successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to fetch company!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get Company API Called!`);
    }
});
exports.getCompany = getCompany;
const getAllCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
    try {
        yield (0, crud_1.getAll)(index_1.prisma.company, take, skip)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'All Companies fetched successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to fetch all companies!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get All Companies API Called!`);
    }
});
exports.getAllCompanies = getAllCompanies;
//# sourceMappingURL=company.js.map