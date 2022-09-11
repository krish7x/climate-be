"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDocumentId = void 0;
const generateDocumentId = (num, size) => {
    let s = num + '';
    while (s.length < size)
        s = '0' + s;
    return s;
};
exports.generateDocumentId = generateDocumentId;
//# sourceMappingURL=generateId.js.map