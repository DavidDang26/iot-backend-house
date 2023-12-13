"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../data/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRound_1 = require("../constants/saltRound");
(async () => {
    const username = "nmhieu";
    const passwordRaw = "hieudeptrai";
    const email = `nmhieu@gmail.com`;
    const phone = "0969696996";
    const name = "Nguyen Minh Hieu";
    const password = bcrypt_1.default.hashSync(passwordRaw, saltRound_1.SALT_ROUND);
    return (0, users_1.addUser)({
        username,
        password,
        email: email.replace(".", "-"),
        phone,
        name
    });
})();
//# sourceMappingURL=addNewUser.js.map