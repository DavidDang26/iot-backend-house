"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const login_controller_1 = __importDefault(require("./controllers/login.controller"));
const device_controller_1 = __importDefault(require("./controllers/device.controller"));
const statistic_controller_1 = __importDefault(require("./controllers/statistic.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
require("dotenv/config");
const port = process.env.PORT || 5000;
const app = new app_1.default([
    new login_controller_1.default(),
    new device_controller_1.default(),
    new statistic_controller_1.default(),
    new user_controller_1.default()
], port);
app.listen();
//# sourceMappingURL=server.js.map