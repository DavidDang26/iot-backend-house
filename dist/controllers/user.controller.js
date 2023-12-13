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
const errorMessages_1 = require("../constants/errorMessages");
const userService_1 = __importDefault(require("../services/userService"));
const successMessage_1 = require("../constants/successMessage");
class UserController {
    constructor() {
        this.path = "/api/user";
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.put(`${this.path}/edit`, this.updateUser);
    }
    async updateUser(req, res) {
        try {
            const data = req.body;
            if (!data.email)
                return res.status(401).send({
                    message: errorMessages_1.ENTER_EMAIL_ERROR
                });
            await userService_1.default.updateUserData(data.email, data);
            res.status(200).send({
                message: successMessage_1.UPDATE_USER_DATA_SUCCESSFULLY,
                data
            });
        }
        catch (error) {
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map