"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceMapping = void 0;
var DeviceTypeEnum;
(function (DeviceTypeEnum) {
    DeviceTypeEnum["LIGHT"] = "Light";
    DeviceTypeEnum["FAN"] = "Fan";
    DeviceTypeEnum["DOOR"] = "Door";
    DeviceTypeEnum["TV"] = "TV";
})(DeviceTypeEnum || (DeviceTypeEnum = {}));
exports.deviceMapping = {
    [DeviceTypeEnum.DOOR]: "door",
    [DeviceTypeEnum.FAN]: "fan",
    [DeviceTypeEnum.TV]: "lcd",
    [DeviceTypeEnum.LIGHT]: "led"
};
exports.default = DeviceTypeEnum;
//# sourceMappingURL=DeviceTypeEnum.js.map