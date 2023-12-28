import { addUser } from "../data/users";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "../constants/saltRound";

(async () => {
  const username = "pdhung";
  const passwordRaw = "hungdeptrai";
  const email = `pdhung@gmail.com`;
  const phone = "0959696996";
  const name = "Pham Duy Hung";
  const topic = "abc";
  const password = bcrypt.hashSync(passwordRaw, SALT_ROUND);
  return addUser({
    username,
    password,
    email: email.replace(".", "-"),
    phone,
    name,
    topic
  });
})();
