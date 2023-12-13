"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const userService_1 = __importDefault(require("../services/userService"));
const errorMessages_1 = require("../constants/errorMessages");
const successMessage_1 = require("../constants/successMessage");
class LoginController {
    constructor() {
        this.path = "/login";
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(this.path, this.checkLogin);
    }
    async checkLogin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService_1.default.checkLogin(email, password);
            return res.status(200).send({
                message: successMessage_1.LOGIN_SUCCESS,
                data: user.data,
                accessToken: user.accessToken
            });
        }
        catch (error) {
            if (error.message) {
                switch (error.message) {
                    case errorMessages_1.USER_NOT_FOUND:
                        return res.status(400).send({
                            message: error.message
                        });
                    case errorMessages_1.PASSWORD_NOT_MATCH:
                        return res.status(401).send({
                            message: error.message
                        });
                }
            }
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
}
exports.default = LoginController;
//# sourceMappingURL=login.controller.js.map