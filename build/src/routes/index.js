"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("./auth");
const user_1 = require("./user");
const company_1 = require("./company");
const site_1 = require("./site");
const siteMapping_1 = require("./siteMapping");
const routes = (app) => {
    app.use('/api', auth_1.authRoute);
    app.use('/api', user_1.userRoute);
    app.use('/api', company_1.companyRoute);
    app.use('/api', site_1.siteRoute);
    app.use('/api', siteMapping_1.siteMapRoute);
    return app;
};
exports.routes = routes;
//# sourceMappingURL=index.js.map