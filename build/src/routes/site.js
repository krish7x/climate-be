"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteRoute = void 0;
const express_1 = __importDefault(require("express"));
const site_1 = require("../controllers/site");
const index_1 = require("./../middlewares/index");
const siteRoute = express_1.default.Router();
exports.siteRoute = siteRoute;
siteRoute.post('/site/create', site_1.createSite);
siteRoute.put('/site/update/:id', site_1.updateSite);
siteRoute.delete('/site/delete/:id', index_1.isAdmin, site_1.deleteSite);
siteRoute.get('/site/get/:id', site_1.getSite);
siteRoute.get('/site/get-all', index_1.isAdmin, site_1.getAllSites);
//# sourceMappingURL=site.js.map