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
exports.isDMTeam = exports.isAdmin = exports.isAuthenticated = exports.isValidToken = exports.isSignedIn = void 0;
const express_jwt_1 = __importDefault(require("express-jwt"));
const prisma_1 = require("../prisma");
const statusCode_1 = require("../utils/statusCode");
const logger_1 = require("../utils/logger");
exports.isSignedIn = (0, express_jwt_1.default)({
    secret: process.env.SECRET || '',
    algorithms: ['HS256', 'RS256'],
    userProperty: 'auth'
});
const isValidToken = (err, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(statusCode_1.statusCode.UNAUTHORIZED).json({ error: 'Authentication Failed!' });
    }
    return next();
};
exports.isValidToken = isValidToken;
const isAuthenticated = (req, res, next) => {
    const checker = req.profile && req.auth && req.profile.id == req.auth.id;
    if (!checker) {
        return res.status(statusCode_1.statusCode.FORBIDDEN).json({
            error: 'ACCESS DENIED!'
        });
    }
    return next();
};
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authId = req.auth._id;
    if (authId) {
        yield prisma_1.prisma.user
            .findFirst({
            where: {
                id: authId
            }
        })
            .then(user => {
            if (!user) {
                return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                    error: 'No user was found in DB!'
                });
            }
            if (user.role === "ADMIN") {
                return next();
            }
            return res.status(statusCode_1.statusCode.UNAUTHORIZED).json({
                error: 'Not an admin!'
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
        });
    }
});
exports.isAdmin = isAdmin;
const isDMTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authId = req.auth._id;
    if (authId) {
        yield prisma_1.prisma.user
            .findFirst({
            where: {
                id: authId
            }
        })
            .then(user => {
            if (!user) {
                return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                    error: 'No user was found in DB!'
                });
            }
            if (user.role === "DM_TEAM") {
                return next();
            }
            return res.status(statusCode_1.statusCode.UNAUTHORIZED).json({
                error: 'Not a DM Team user!'
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
        });
    }
});
exports.isDMTeam = isDMTeam;
//# sourceMappingURL=index.js.map