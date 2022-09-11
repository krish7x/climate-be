"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const index_1 = require("./../middlewares/index");
const userRoute = express_1.default.Router();
exports.userRoute = userRoute;
userRoute.get('/user/get/:userId', user_1.getUserById);
userRoute.get('/user/get-all', index_1.isAdmin, user_1.getAllUsers);
//# sourceMappingURL=user.js.map