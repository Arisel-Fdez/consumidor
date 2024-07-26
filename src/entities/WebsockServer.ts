import WebSocket from "ws";

const clients: WebSocket[] = [];

export const startWebSocketServer = () => {
  const wss = new WebSocket.Server({ port: 3001 });

  wss.on("connection", (ws) => {
    console.log("Client connected to WebSocket server");
    clients.push(ws);

    ws.on("message", (message) => {
      console.log(`Received message from client: ${message}`);
    });

    ws.on("close", () => {
      console.log("Client disconnected from WebSocket server");
      clients.splice(clients.indexOf(ws), 1);
    });

    ws.on("error", (error) => {
      console.error("WebSocket server error:", error);
      clients.splice(clients.indexOf(ws), 1);
    });
  });

  console.log("WebSocket server started on ws://localhost:3001");
};

export const broadcastToClients = (data: any) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};
