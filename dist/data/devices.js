"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDevice = exports.deleteDevice = exports.updateDevice = exports.addDevice = exports.getDeviceById = void 0;
const firebase_1 = require("./firebase");
const devices = () => firebase_1.db.ref("devices");
const getDeviceById = async (key) => {
    const device = await devices().child(key).once("value");
    return device.val();
};
exports.getDeviceById = getDeviceById;
const addDevice = (device) => {
    const customChild = devices().child(device.id);
    if (customChild.username) {
        return (0, exports.updateDevice)(device.id, device);
    }
    else
        customChild.set(device);
};
exports.addDevice = addDevice;
const updateDevice = (key, data) => devices().child(key).update(data);
exports.updateDevice = updateDevice;
const deleteDevice = (key) => devices().child(key).remove();
exports.deleteDevice = deleteDevice;
async function getAllDevice() {
    const ref = devices();
    const device = await ref.once("value");
    return device.val();
}
exports.getAllDevice = getAllDevice;
exports.default = {
    getAllDevice,
    deleteDevice: exports.deleteDevice,
    updateDevice: exports.updateDevice,
    addDevice: exports.addDevice,
    getDeviceById: exports.getDeviceById
};
//# sourceMappingURL=devices.js.map