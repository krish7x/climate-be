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
exports.getAllSites = exports.getSite = exports.deleteSite = exports.updateSite = exports.createSite = void 0;
const crud_1 = require("../helpers/crud");
const index_1 = require("../prisma/index");
const logger_1 = require("../utils/logger");
const statusCode_1 = require("../utils/statusCode");
const createSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, companyId, geoLocation } = req.body;
        const data = {
            name,
            companyId,
            geoLocation
        };
        yield (0, crud_1.create)(index_1.prisma.site, data)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site created successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to add site in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Create Site API Called!`);
    }
});
exports.createSite = createSite;
const updateSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.updateById)(index_1.prisma.site, req.body, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site updated successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to update Site in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Update Site API Called!`);
    }
});
exports.updateSite = updateSite;
const deleteSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.deleteById)(index_1.prisma.site, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site deleted successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to delete site in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Delete Site API Called!`);
    }
});
exports.deleteSite = deleteSite;
const getSite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.getById)(index_1.prisma.site, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site fetched successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to fetch site!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get Site API Called!`);
    }
});
exports.getSite = getSite;
const getAllSites = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
    try {
        yield (0, crud_1.getAll)(index_1.prisma.site, take, skip)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'All Sites fetched successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to fetch all sites!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get All Sites API Called!`);
    }
});
exports.getAllSites = getAllSites;
//# sourceMappingURL=site.js.map