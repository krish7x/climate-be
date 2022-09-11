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
exports.getAllUsers = exports.getUserById = void 0;
const index_1 = require("../prisma/index");
const logger_1 = require("../utils/logger");
const statusCode_1 = require("../utils/statusCode");
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +(req.params.userId || '1');
    try {
        yield index_1.prisma.user
            .findFirst({
            where: {
                id: id
            }
        })
            .then(user => {
            if (!user) {
                return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                    error: "User doesn't exist in DB!"
                });
            }
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'User fetched Successfully!',
                user
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch the user!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get User By Id API Called!`);
    }
});
exports.getUserById = getUserById;
const getAllUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield index_1.prisma.user
            .findMany()
            .then(user => {
            if (!(user === null || user === void 0 ? void 0 : user.length)) {
                return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                    error: "User doesn't exist in DB!"
                });
            }
            (0, logger_1.log)(user);
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'User fetched Successfully!',
                user
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                message: 'Failed to fetch the user!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Get All User API Called!`);
    }
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=user.js.map