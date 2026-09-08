import { Client } from "@stomp/stompjs";

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
    brokerURL: "ws://localhost:8080/ws",

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