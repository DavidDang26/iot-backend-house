"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const mqtt_1 = __importDefault(require("mqtt"));
const sendMessage = (topic, message) => {
    const client = mqtt_1.default.connect("mqtt://broker.mqtt-dashboard.com");
    client.on("connect", () => {
        client.publish(topic, Buffer.from(JSON.stringify(message)));
    });
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=mqttService.js.map