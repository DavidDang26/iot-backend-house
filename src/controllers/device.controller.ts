import * as express from "express";
import {
  DELETE_DEVICE_SUCCESSFULLY,
  GET_ALL_DEVICE_SUCCESS,
  NEW_DEVICE_CREATED_SUCCESSFULLY,
  UPDATE_DEVICE_DESCRIPTION_SUCCESSFULLY,
  UPDATE_DEVICE_STATUS_SUCCESSFULLY
} from "../constants/successMessage";
import { INTERNAL_SERVER_ERROR } from "../constants/errorMessages";
import deviceService from "../services/deviceService";
import { sendMessage } from "../services/mqttService";
import { getDeviceById } from "../data/devices";
import Device from "../data/models/Device";
import DeviceTypeEnum, { deviceMapping } from "../enum/DeviceTypeEnum";
import { getCurrentCount } from "../data/count";

class DeviceController {
  path = "/api/device";
  router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(`${this.path}/get-all`, this.getAllDevices);
    this.router.post(`${this.path}/add`, this.addDevice);
    this.router.delete(`${this.path}/delete`, this.deleteDevice);
    this.router.put(`${this.path}/description`, this.updateDeviceDescription);
    this.router.put(`${this.path}/status`, this.updateDeviceStatus);
  }

  private async getAllDevices(req: express.Request, res: express.Response) {
    try {
      const allDevices = await deviceService.getAllDevice();
      return res.status(200).send({
        message: GET_ALL_DEVICE_SUCCESS,
        data: allDevices
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }

  private async addDevice(req: express.Request, res: express.Response) {
    try {
      const { type, isOn, description } = req.body;
      const newDevice = await deviceService.addDevice({
        type,
        isOn,
        description
      });
      return res.status(201).send({
        message: NEW_DEVICE_CREATED_SUCCESSFULLY,
        data: newDevice
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }

  private async deleteDevice(req: express.Request, res: express.Response) {
    try {
      const { deviceId } = req.body;
      await deviceService.deleteDevice(deviceId);
      return res.status(200).send({
        message: DELETE_DEVICE_SUCCESSFULLY,
        data: {
          deviceId
        }
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }

  private async updateDeviceDescription(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const { deviceId, description } = req.body;
      await deviceService.updateDeviceDescription(deviceId, description);
      return res.status(200).send({
        message: UPDATE_DEVICE_DESCRIPTION_SUCCESSFULLY,
        data: {
          deviceId,
          description
        }
      });
    } catch (error) {
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }

  private async updateDeviceStatus(
    req: express.Request,
    res: express.Response
  ) {
    try {
      const { deviceId, isOn, message } = req.body;
      const device = (await getDeviceById(deviceId)) as Device;
      await deviceService.updateDeviceStatus(deviceId, isOn);
      const count = await getCurrentCount();
      const messageSent = {
        id: count,
        device: deviceMapping[device.type],
        command: isOn ? "on" : "off",
        ledIndex: device?.ledIndex && device.ledIndex,
        message
      };
      if (device.type === DeviceTypeEnum.TV) messageSent["command"] = "print";
      sendMessage(process.env.TOPIC, messageSent);
      return res.status(200).send({
        message: UPDATE_DEVICE_STATUS_SUCCESSFULLY,
        data: {
          deviceId,
          isOn
        }
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        message: INTERNAL_SERVER_ERROR
      });
    }
  }
}

export default DeviceController;
