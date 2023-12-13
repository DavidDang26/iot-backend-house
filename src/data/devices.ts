import { db } from "./firebase";
import Device from "./models/Device";

const devices = () => db.ref("devices");

export const getDeviceById = async (key: string) => {
  const device = await devices().child(key).once("value");
  return device.val();
};

export const addDevice = (device: Device) => {
  const customChild = devices().child(device.id) as any;
  if (customChild.username) {
    return updateDevice(device.id, device);
  } else customChild.set(device);
};

export const updateDevice = (key: string, data) =>
  devices().child(key).update(data);

export const deleteDevice = (key: string) => devices().child(key).remove();

export async function getAllDevice() {
  const ref = devices();
  const device = await ref.once("value");
  return device.val();
}

export default {
  getAllDevice,
  deleteDevice,
  updateDevice,
  addDevice,
  getDeviceById
};
