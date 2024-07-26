import dotenv from 'dotenv';
dotenv.config();

import { initializeMqttClient } from "./config/MqttConfig";
import { startWebSocketServer } from "./entities/WebsockServer";

const main = async () => {
  try {
    startWebSocketServer();
    initializeMqttClient();
    console.log("Services initialized successfully");
  } catch (error) {
    console.error("Error initializing the application:", error);
  }
};

main();
