import { db } from "./firebase";
import { User } from "./models/User";

const users = () => db.ref("users");

export const getStateForUser = async (key: string) => {
  const user = await users().child(key).once("value");
  return user.val();
};

export const addUser = (user: User) => {
  const customChild = users().child(user.email) as any;
  if (customChild.email) {
    return updateUser(user.email, user);
  } else customChild.set(user);
};

export const updateUser = (key: string, data: Partial<User>) =>
  users().child(key).update(data);

export const deleteUser = (key: string) => users().child(key).remove();

export async function getAllUser() {
  const ref = users();
  const user = await ref.once("value");
  return user.val();
}

export default {
  getAllUser,
  deleteUser,
  updateUser,
  addUser,
  getStateForUser
};
