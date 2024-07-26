import mqtt from "mqtt";
import { parseMessage, sendDataToWebSocketServer } from "../entities/ConsumerMqtt";

const mqttHost = process.env.MQTT_HOST || "mqtt://44.198.205.23";
const mqttClientId = process.env.MQTT_CLIENT_ID || "mqtt_js_consumer";
const mqttUsername = process.env.MQTT_USERNAME || "guest";
const mqttPassword = process.env.MQTT_PASSWORD || "guest";
const mqttTopic = process.env.MQTT_TOPIC || "esp32/mqtt";

export const initializeMqttClient = () => {
  const mqttClient = mqtt.connect(mqttHost, {
    clientId: mqttClientId,
    username: mqttUsername,
    password: mqttPassword,
  });

  mqttClient.on("connect", () => {
    console.log("Connected to MQTT broker");
    mqttClient.subscribe(mqttTopic, (err) => {
      if (err) {
        console.error("Failed to subscribe to topic:", err);
      } else {
        console.log(`Subscribed to topic ${mqttTopic}`);
      }
    });
  });

  mqttClient.on("error", (error) => {
    console.error("Connection error:", error);
  });

  mqttClient.on("message", async (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    try {
      const data = parseMessage(message.toString());
      sendDataToWebSocketServer(data);
    } catch (error) {
      console.error("Error processing MQTT message:", error);
    }
  });
};
