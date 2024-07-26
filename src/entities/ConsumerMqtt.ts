import { broadcastToClients } from "./WebsockServer";

interface SensorData {
    Object: string;
    RitCardiaco: string;
    Spo: string;
    Pulso: string;
  }
  
  export const parseMessage = (message: string): SensorData => {
    const mlxRegex = /MLX90614 - Ambient:\s*([\d.]+)\s*C,\s*Object:\s*([\d.]+)\s*C/;
    const maxRegex = /MAX30100 - HR:\s*([\d.]+),\s*SpO2:\s*([\d.]+)/;
    const ritmoRegex = /Ritmo - Pulso:\s*([\d.]+)/;
  
    let match = message.match(mlxRegex);
    if (match) {
      return {
        Object: `${match[2]} C`,
        RitCardiaco: "N/A",
        Spo: "N/A",
        Pulso: "N/A",
      };
    }
  
    match = message.match(maxRegex);
    if (match) {
      return {
        Object: "N/A",
        RitCardiaco: match[1],
        Spo: match[2],
        Pulso: "N/A",
      };
    }
  
    match = message.match(ritmoRegex);
    if (match) {
      return {
        Object: "N/A",
        RitCardiaco: "N/A",
        Spo: "N/A",
        Pulso: match[1],
      };
    }
  
    throw new Error("Invalid message format");
  };
  
  export const sendDataToWebSocketServer = (data: SensorData) => {
    broadcastToClients(data);
  };
  