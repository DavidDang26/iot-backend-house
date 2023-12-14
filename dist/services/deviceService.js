"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDeviceStatus = exports.updateDeviceDescription = exports.deleteDevice = exports.addDevice = exports.getAllDevice = void 0;
const devices_1 = __importDefault(require("../data/devices"));
const uuid_1 = require("uuid");
const getAllDevice = async () => {
    const allDevice = await devices_1.default.getAllDevice();
    return !!allDevice
        ? Object.keys(allDevice).map((deviceId) => allDevice[deviceId])
        : [];
};
exports.getAllDevice = getAllDevice;
const addDevice = async (device) => {
    const deviceWithId = Object.assign(Object.assign({}, device), { id: (0, uuid_1.v4)() });
    await devices_1.default.addDevice(deviceWithId);
    return deviceWithId;
};
exports.addDevice = addDevice;
const deleteDevice = async (deviceId) => devices_1.default.deleteDevice(deviceId);
exports.deleteDevice = deleteDevice;
const updateDeviceDescription = async (deviceId, description) => devices_1.default.updateDevice(deviceId, { description });
exports.updateDeviceDescription = updateDeviceDescription;
const updateDeviceStatus = async (deviceId, isOn = false) => devices_1.default.updateDevice(deviceId, { isOn });
exports.updateDeviceStatus = updateDeviceStatus;
exports.default = {
    getAllDevice: exports.getAllDevice,
    addDevice: exports.addDevice,
    deleteDevice: exports.deleteDevice,
    updateDeviceDescription: exports.updateDeviceDescription,
    updateDeviceStatus: exports.updateDeviceStatus
};
//# sourceMappingURL=deviceService.js.map