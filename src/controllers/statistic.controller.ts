import * as express from "express";
import { GET_STATISTICS_SUCCESSFULLY } from "../constants/successMessage";
import { INTERNAL_SERVER_ERROR } from "../constants/errorMessages";
import statisticService from "../services/statisticService";

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
      const { ownerEmail } = req.query;
      const data = await statisticService.getStatistic(
        (ownerEmail as string).replace(".", "-")
      );
      return res.status(200).send({
        message: GET_STATISTICS_SUCCESSFULLY,
        data
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }
}

export default StatisticController;
