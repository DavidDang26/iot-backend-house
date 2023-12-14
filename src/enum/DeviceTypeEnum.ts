enum DeviceTypeEnum {
  LIGHT = "Light",
  FAN = "Fan",
  DOOR = "Door",
  TV = "TV"
}

export const deviceMapping = {
  [DeviceTypeEnum.DOOR]: "door",
  [DeviceTypeEnum.FAN]: "fan",
  [DeviceTypeEnum.TV]: "lcd",
  [DeviceTypeEnum.LIGHT]: "led"
};

export default DeviceTypeEnum;
