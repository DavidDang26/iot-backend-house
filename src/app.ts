import express from "express";
import * as bodyParser from "body-parser";
import allowCors from "./middlewares/allowCors";
import authToken from "./middlewares/jwtVerify";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeCors();
    this.initializeMiddleWares();
    this.initializeControllers(controllers);
  }

  private initializeCors() {
    this.app.use(allowCors);
  }

  private initializeMiddleWares() {
    this.app.use(bodyParser.json());
    this.app.use("/api", authToken);
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
export default App;
