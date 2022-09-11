"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_1 = require("./auth");
const user_1 = require("./user");
const routes = (app) => {
    app.use('/api', auth_1.authRoute);
    app.use('/api', user_1.userRoute);
    return app;
};
exports.routes = routes;
//# sourceMappingURL=index.js.map