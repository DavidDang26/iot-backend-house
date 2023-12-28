import statistic from "../data/statistic";

export const getStatistic = (email: string) => statistic.getStatistic(email);

export const updateStatistic = (data: any, email: string) =>
  statistic.updateStatistic(data, email);

export default {
  getStatistic,
  updateStatistic
};
