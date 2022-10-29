"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyRoute = void 0;
const express_1 = __importDefault(require("express"));
const company_1 = require("../controllers/company");
const index_1 = require("./../middlewares/index");
const companyRoute = express_1.default.Router();
exports.companyRoute = companyRoute;
companyRoute.post('/company/create', company_1.createCompany);
companyRoute.put('/company/update/:id', company_1.updateCompany);
companyRoute.delete('/company/delete/:id', index_1.isAdmin, company_1.deleteCompany);
companyRoute.get('/company/get/:id', company_1.getCompany);
companyRoute.get('/company/get-all', index_1.isAdmin, company_1.getAllCompanies);
//# sourceMappingURL=company.js.map