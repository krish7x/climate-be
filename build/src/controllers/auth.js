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
exports.signout = exports.signin = exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("./../helpers/auth");
const express_validator_1 = require("express-validator");
const auth_2 = require("../helpers/auth");
const index_1 = require("../prisma/index");
const logger_1 = require("../utils/logger");
const statusCode_1 = require("../utils/statusCode");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs_1.default.extend(customParseFormat);
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const errors = (0, express_validator_1.validationResult)(req) || [];
    if (!errors.isEmpty()) {
        return res.status(statusCode_1.statusCode.WRONG_ENTITY).json({
            error: (_a = errors.array()[0]) === null || _a === void 0 ? void 0 : _a.msg
        });
    }
    const { name, email, phoneNumber = null, password, dateOfBirth } = req.body;
    try {
        yield index_1.prisma.user
            .create({
            data: {
                name,
                email,
                phoneNumber,
                dateOfBirth: (0, dayjs_1.default)(dateOfBirth, 'DD/MM/YYYY').format('DD/MM/YYYY') || null,
                age: (0, dayjs_1.default)().get('year') -
                    (0, dayjs_1.default)(dateOfBirth, 'DD/MM/YYYY').get('year') || null,
                gender: (_b = req.body) === null || _b === void 0 ? void 0 : _b.gender,
                encrypted_password: (0, auth_2.hashPassword)(password, process.env.SALT || 'climate-be')
            }
        })
            .then(user => {
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'User Signed Up, Successfully!',
                data: user
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.BAD_REQUEST).json({
                error: 'Failed to add user in DB!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Sign up API called by user - ${email}`);
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const errors = (0, express_validator_1.validationResult)(req) || [];
    if (!errors.isEmpty()) {
        return res.status(statusCode_1.statusCode.WRONG_ENTITY).json({
            error: (_c = errors.array()[0]) === null || _c === void 0 ? void 0 : _c.msg
        });
    }
    const { email, password } = req.body;
    try {
        yield index_1.prisma.user
            .findUnique({
            where: {
                email
            }
        })
            .then(user => {
            if (!user) {
                return res.status(statusCode_1.statusCode.NOT_FOUND).json({
                    error: "E-Mail doesn't exist in DB!"
                });
            }
            if (!(0, auth_1.authenticate)(password, process.env.SALT || '', user.encrypted_password)) {
                return res.status(statusCode_1.statusCode.UNAUTHORIZED).json({
                    error: 'Oops!, E-mail and Password does not match!'
                });
            }
            const expiryTime = new Date();
            expiryTime.setMonth(expiryTime.getMonth() + 6);
            const exp = expiryTime.getTime() / 1000;
            const token = jsonwebtoken_1.default.sign({ _id: user.id, exp: exp }, process.env.SECRET || '');
            res.cookie('Token', token, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });
            return res.status(statusCode_1.statusCode.OK).json({
                message: 'User Logged in Successfully!',
                token,
                data: user
            });
        })
            .catch(err => {
            (0, logger_1.loggerUtil)(err, 'ERROR');
            return res.status(statusCode_1.statusCode.INTERNAL_SERVER_ERROR).json({
                error: 'Login failed!'
            });
        });
    }
    catch (err) {
        (0, logger_1.loggerUtil)(err, 'ERROR');
    }
    finally {
        (0, logger_1.loggerUtil)(`Sign in API called by user - ${email}`);
    }
});
exports.signin = signin;
const signout = (res) => {
    res.clearCookie('Token');
    res.status(statusCode_1.statusCode.OK).json({
        message: 'User Signed Out Sucessfully!'
    });
};
exports.signout = signout;
//# sourceMappingURL=auth.js.map