"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = exports.loggerUtil = void 0;
const log4js_1 = __importDefault(require("log4js"));
const logger = log4js_1.default.getLogger();
logger.level = 'debug';
const loggerUtil = (message, logType = 'INFO') => {
    logType === 'INFO' || logType === 'SERVER'
        ? logger.info(message)
        : logType === 'ERROR'
            ? logger.error(message)
            : null;
};
exports.loggerUtil = loggerUtil;
const log = (data) => {
    logger.debug(data);
};
exports.log = log;
//# sourceMappingURL=logger.js.map