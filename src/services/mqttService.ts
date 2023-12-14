import mqtt from "mqtt";

export const sendMessage = (topic: string, message: any) => {
  const client = mqtt.connect("mqtt://broker.hivemq.com");

  client.on("connect", () => {
    client.publish(topic, Buffer.from(JSON.stringify(message)));
  });
};
