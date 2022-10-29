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
exports.getAllSiteMaps = exports.getSiteMap = exports.deleteSiteMapping = exports.updateSiteMapping = exports.createSiteMapping = void 0;
const crud_1 = require("../helpers/crud");
const index_1 = require("../prisma/index");
const logger_1 = require("../utils/logger");
const statusCode_1 = require("../utils/statusCode");
const createSiteMapping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, siteId, userId } = req.body;
        const data = {
            name,
            siteId: +siteId,
            userId: +userId
        };
        yield (0, crud_1.create)(index_1.prisma.siteMapping, data)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site Mapped successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to map site!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Create Site Mapping API Called!`);
    }
});
exports.createSiteMapping = createSiteMapping;
const updateSiteMapping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.updateById)(index_1.prisma.siteMapping, req.body, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Sitemap updated successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to update sitemap!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Update Site Mapping API Called!`);
    }
});
exports.updateSiteMapping = updateSiteMapping;
const deleteSiteMapping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.deleteById)(index_1.prisma.siteMapping, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site map deleted successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to delete site map in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Delete Site Map API Called!`);
    }
});
exports.deleteSiteMapping = deleteSiteMapping;
const getSiteMap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, crud_1.getById)(index_1.prisma.siteMapping, 'id', req.params.id && +req.params.id)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'Site map fetched successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to fetch site map!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get Site Map API Called!`);
    }
});
exports.getSiteMap = getSiteMap;
const getAllSiteMaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const take = +(req.query.limit || '10'), skip = +(req.query.offset || '0');
    try {
        yield (0, crud_1.getAll)(index_1.prisma.siteMapping, take, skip)
            .then(value => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'All Sites map fetched successfully!',
                data: value
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to fetch all site maps!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get All Site Maps API Called!`);
    }
});
exports.getAllSiteMaps = getAllSiteMaps;
//# sourceMappingURL=siteMapping.js.map