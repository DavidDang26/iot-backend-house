import * as express from "express";
import {
  ENTER_EMAIL_ERROR,
  INTERNAL_SERVER_ERROR
} from "../constants/errorMessages";
import userService from "../services/userService";
import { UPDATE_USER_DATA_SUCCESSFULLY } from "../constants/successMessage";

class UserController {
  path = "/api/user";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.put(`${this.path}/edit`, this.updateUser);
  }

  private async updateUser(req: express.Request, res: express.Response) {
    try {
      const data = req.body;
      if (!data.email)
        return res.status(401).send({
          message: ENTER_EMAIL_ERROR
        });
      await userService.updateUserData(data.email, data);
      res.status(200).send({
        message: UPDATE_USER_DATA_SUCCESSFULLY,
        data
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }
}

export default UserController;
