import { Client } from "@stomp/stompjs";
import { API_URL } from "../config";

/*
 * Convert the HTTP API URL into a WebSocket URL.
 *
 * Local:
 * http://localhost:8080
 *        ↓
 * ws://localhost:8080
 *
 * Production:
 * https://digital-space-backend-production.up.railway.app
 *        ↓
 * wss://digital-space-backend-production.up.railway.app
 */
const WS_URL = API_URL.replace(/^http/, "ws");

/*
 * Creates a WebSocket connection between
 * React and Spring Boot.
 *
 * React  <=================>  Spring Boot
 */
export const createWebSocketClient = (onConnected) => {

  const client = new Client({

    /*
     * Direct WebSocket connection.
     *
     * Spring Boot endpoint:
     * /ws
     */
    brokerURL: `${WS_URL}/ws`,

    /*
     * Called when connection succeeds.
     */
    onConnect: () => {

      console.log("🟢 WebSocket connected");

      if (onConnected) {
        onConnected(client);
      }
    },

    /*
     * STOMP errors.
     */
    onStompError: (frame) => {
      console.error(
        "WebSocket STOMP error:",
        frame.headers["message"]
      );
    },

    /*
     * Connection errors.
     */
    onWebSocketError: (error) => {
      console.error(
        "WebSocket connection error:",
        error
      );
    },
  });

  /*
   * Start the connection.
   */
  client.activate();

  /*
   * Return the client so Study.jsx
   * can disconnect it later.
   */
  return client;
};