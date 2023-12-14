"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserData = exports.checkLogin = void 0;
const errorMessages_1 = require("../constants/errorMessages");
const users_1 = require("../data/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const checkLogin = async (username, password) => {
    const user = await (0, users_1.getStateForUser)(username.replace(".", "-"));
    if (!user)
        throw new Error(errorMessages_1.USER_NOT_FOUND);
    const check = bcrypt_1.default.compareSync(password, user.password);
    if (!check)
        throw new Error(errorMessages_1.PASSWORD_NOT_MATCH);
    const data = Object.assign(Object.assign({}, user), { password: undefined, email: user.email.replace("-", ".") });
    const accessToken = jsonwebtoken_1.default.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    });
    return {
        data,
        accessToken
    };
};
exports.checkLogin = checkLogin;
const updateUserData = async (email, data) => {
    const rawEmail = email.replace(".", "-");
    return (0, users_1.updateUser)(rawEmail, data);
};
exports.updateUserData = updateUserData;
exports.default = {
    checkLogin: exports.checkLogin,
    updateUserData: exports.updateUserData
};
//# sourceMappingURL=userService.js.map