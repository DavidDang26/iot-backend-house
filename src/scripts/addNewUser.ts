import { addUser } from "../data/users";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../constants/saltRound";

(async () => {
  const username = "nmhieu";
  const passwordRaw = "hieudeptrai";
  const email = `nmhieu@gmail.com`;
  const phone = "0969696996";
  const name = "Nguyen Minh Hieu";
  const password = bcrypt.hashSync(passwordRaw, SALT_ROUND);
  return addUser({
    username,
    password,
    email: email.replace(".", "-"),
    phone,
    name
  });
})();
