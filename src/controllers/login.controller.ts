import * as express from "express";
import userService from "../services/userService";
import {
  INTERNAL_SERVER_ERROR,
  PASSWORD_NOT_MATCH,
  USER_NOT_FOUND
} from "../constants/errorMessages";
import { LOGIN_SUCCESS } from "../constants/successMessage";

class LoginController {
  public path = "/login";
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.post(this.path, this.checkLogin);
  }

  private async checkLogin(req: express.Request, res: express.Response) {
    try {
      const { email, password } = req.body;
      const user = await userService.checkLogin(email, password);
      return res.status(200).send({
        message: LOGIN_SUCCESS,
        data: user.data,
        accessToken: user.accessToken
      });
    } catch (error) {
      if (error.message) {
        switch (error.message) {
          case USER_NOT_FOUND:
            return res.status(400).send({
              message: error.message
            });
          case PASSWORD_NOT_MATCH:
            return res.status(401).send({
              message: error.message
            });
        }
      }
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }
}

export default LoginController;
