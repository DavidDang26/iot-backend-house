import DeviceTypeEnum from "../../enum/DeviceTypeEnum";

type Device = {
  id?: string;
  type: DeviceTypeEnum;
  isOn: boolean;
  description: string;
  ledIndex?: number;
};

export default Device;
