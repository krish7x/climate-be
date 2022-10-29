"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_ui_json_1 = __importDefault(require("./docs/swagger-ui.json"));
const logger_1 = require("./utils/logger");
const statusCode_1 = require("./utils/statusCode");
const index_1 = require("./routes/index");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.static('public'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(statusCode_1.statusCode.WRONG_ENTITY).json({ error: errors.array() });
    }
    next();
});
(0, index_1.routes)(app);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_ui_json_1.default));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    (0, logger_1.loggerUtil)(`Listening on port ${PORT}`, 'SERVER');
});
app.get('/api', (_, res) => {
    res.send('hello');
});
//# sourceMappingURL=server.js.map