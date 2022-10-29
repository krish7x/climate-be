"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.siteMapRoute = void 0;
const express_1 = __importDefault(require("express"));
const siteMapping_1 = require("../controllers/siteMapping");
const index_1 = require("./../middlewares/index");
const siteMapRoute = express_1.default.Router();
exports.siteMapRoute = siteMapRoute;
siteMapRoute.post('/site-map/create', siteMapping_1.createSiteMapping);
siteMapRoute.put('/site-map/update/:id', siteMapping_1.updateSiteMapping);
siteMapRoute.delete('/site-map/delete/:id', index_1.isAdmin, siteMapping_1.deleteSiteMapping);
siteMapRoute.get('/site-map/get/:id', siteMapping_1.getSiteMap);
siteMapRoute.get('/site-map/get-all', index_1.isAdmin, siteMapping_1.getAllSiteMaps);
//# sourceMappingURL=siteMapping.js.map