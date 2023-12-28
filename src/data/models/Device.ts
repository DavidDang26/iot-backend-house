import DeviceTypeEnum from "../../enum/DeviceTypeEnum";

type Device = {
  id?: string;
  type: DeviceTypeEnum;
  isOn: boolean;
  description: string;
  ledIndex?: number;
  ownerEmail: string;
};

export default Device;
