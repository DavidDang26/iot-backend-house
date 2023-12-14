import { db } from "./firebase";

const counts = () => db.ref("count");

export const getCurrentCount = async () => {
  const count = await counts().child("valueId").once("value");
  const currentValue = await count.val();
  await addCount(currentValue + 1);
  return currentValue;
};

export const addCount = (newCount: number) =>
  counts().child("valueId").set(newCount);

export default {
  getCurrentCount
};
