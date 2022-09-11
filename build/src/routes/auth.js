"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const auth_1 = require("../controllers/auth");
const authRoute = express_1.default.Router();
exports.authRoute = authRoute;
authRoute.post('/signup', [
    (0, express_validator_1.check)('name')
        .isLength({
        min: 3
    })
        .withMessage('Please provide a name'),
    (0, express_validator_1.check)('email').isEmail().withMessage('Please provide a valid E-Mail!'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 6 })
        .withMessage('Password length should be minimum of 8 characters')
], auth_1.signup);
authRoute.post('/signin', [
    (0, express_validator_1.check)('email').isEmail().withMessage('Please provide a valid E-Mail!'),
    (0, express_validator_1.check)('password')
        .isLength({ min: 6 })
        .withMessage('Password length should be minimum of 8 characters')
], auth_1.signin);
authRoute.get('/signout', auth_1.signout);
//# sourceMappingURL=auth.js.map