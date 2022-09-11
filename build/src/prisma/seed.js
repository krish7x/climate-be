"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const auth_1 = require("../helpers/auth");
const prisma = new client_1.PrismaClient();
const userData = [
    {
        name: 'user',
        email: 'user@climatebventures.com',
        encrypted_password: (0, auth_1.hashPassword)('123456', process.env.SALT || '')
    },
    {
        name: 'admin',
        email: 'admin@climatebventures.com',
        encrypted_password: (0, auth_1.hashPassword)('123456', process.env.SALT || '')
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(`Start seeding ...`);
        for (const u of userData) {
            const user = yield prisma.user.create({
                data: u
            });
            console.log(`Created user with id: ${user.id}`);
        }
        console.log(`Seeding finished.`);
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=seed.js.map