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
const successMessage_1 = require("../constants/successMessage");
const errorMessages_1 = require("../constants/errorMessages");
const deviceService_1 = __importDefault(require("../services/deviceService"));
const mqttService_1 = require("../services/mqttService");
const devices_1 = require("../data/devices");
const DeviceTypeEnum_1 = __importStar(require("../enum/DeviceTypeEnum"));
const count_1 = require("../data/count");
class DeviceController {
    constructor() {
        this.path = "/api/device";
        this.router = express.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/get-all`, this.getAllDevices);
        this.router.post(`${this.path}/add`, this.addDevice);
        this.router.delete(`${this.path}/delete`, this.deleteDevice);
        this.router.put(`${this.path}/description`, this.updateDeviceDescription);
        this.router.put(`${this.path}/status`, this.updateDeviceStatus);
    }
    async getAllDevices(req, res) {
        try {
            const allDevices = await deviceService_1.default.getAllDevice();
            return res.status(200).send({
                message: successMessage_1.GET_ALL_DEVICE_SUCCESS,
                data: allDevices
            });
        }
        catch (error) {
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
    async addDevice(req, res) {
        try {
            const { type, isOn, description } = req.body;
            const newDevice = await deviceService_1.default.addDevice({
                type,
                isOn,
                description
            });
            return res.status(201).send({
                message: successMessage_1.NEW_DEVICE_CREATED_SUCCESSFULLY,
                data: newDevice
            });
        }
        catch (error) {
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
    async deleteDevice(req, res) {
        try {
            const { deviceId } = req.body;
            await deviceService_1.default.deleteDevice(deviceId);
            return res.status(200).send({
                message: successMessage_1.DELETE_DEVICE_SUCCESSFULLY,
                data: {
                    deviceId
                }
            });
        }
        catch (error) {
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
    async updateDeviceDescription(req, res) {
        try {
            const { deviceId, description } = req.body;
            await deviceService_1.default.updateDeviceDescription(deviceId, description);
            return res.status(200).send({
                message: successMessage_1.UPDATE_DEVICE_DESCRIPTION_SUCCESSFULLY,
                data: {
                    deviceId,
                    description
                }
            });
        }
        catch (error) {
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
    async updateDeviceStatus(req, res) {
        try {
            const { deviceId, isOn, message } = req.body;
            const device = (await (0, devices_1.getDeviceById)(deviceId));
            await deviceService_1.default.updateDeviceStatus(deviceId, isOn);
            const count = await (0, count_1.getCurrentCount)();
            const messageSent = {
                id: count,
                device: DeviceTypeEnum_1.deviceMapping[device.type],
                command: isOn ? "on" : "off",
                ledIndex: (device === null || device === void 0 ? void 0 : device.ledIndex) && device.ledIndex,
                message
            };
            if (device.type === DeviceTypeEnum_1.default.TV)
                messageSent["command"] = "print";
            (0, mqttService_1.sendMessage)(process.env.TOPIC, messageSent);
            return res.status(200).send({
                message: successMessage_1.UPDATE_DEVICE_STATUS_SUCCESSFULLY,
                data: {
                    deviceId,
                    isOn
                }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({
                message: errorMessages_1.INTERNAL_SERVER_ERROR
            });
        }
    }
}
exports.default = DeviceController;
//# sourceMappingURL=device.controller.js.map