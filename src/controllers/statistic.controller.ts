import * as express from "express";
import { GET_STATISTICS_SUCCESSFULLY } from "../constants/successMessage";
import { INTERNAL_SERVER_ERROR } from "../constants/errorMessages";

class StatisticController {
  path = "/api/statistics";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getStatistic);
  }

  private async getStatistic(req: express.Request, res: express.Response) {
    try {
      return res.status(200).send({
        message: GET_STATISTICS_SUCCESSFULLY,
        data: {
          humidity: 12,
          temperature: 12
        }
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }
}

export default StatisticController;
