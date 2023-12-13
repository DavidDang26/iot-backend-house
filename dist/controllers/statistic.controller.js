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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const successMessage_1 = require("../constants/successMessage");
const errorMessages_1 = require("../constants/errorMessages");
class StatisticController {
    constructor() {
        this.path = "/api/statistics";
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, this.getStatistic);
    }
    async getStatistic(req, res) {
        try {
            return res.status(200).send({
                message: successMessage_1.GET_STATISTICS_SUCCESSFULLY,
                data: {
                    humidity: 12,
                    temperature: 12
                }
            });
        }
        catch (error) {
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
}
exports.default = StatisticController;
//# sourceMappingURL=statistic.controller.js.map