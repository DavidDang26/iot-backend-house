import App from "./app";
import LoginController from "./controllers/login.controller";
import DeviceController from "./controllers/device.controller";
import StatisticController from "./controllers/statistic.controller";
import UserController from "./controllers/user.controller";

import "dotenv/config";

const port = process.env.PORT || 5000;
const app = new App(
  [
    new LoginController(),
    new DeviceController(),
    new StatisticController(),
    new UserController()
  ],
  port
);

app.listen();
