import { db } from "./firebase";

const users = () => db.ref("statistics");

export const getStatistic = async (email: string) => {
  const user = await users().child(email).once("value");
  return user.val();
};

export const updateStatistic = (data: any, email: string) =>
  users().child(email).set(data);

export default {
  updateStatistic,
  getStatistic
};
