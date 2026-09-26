
import React, { useEffect, useRef, useState } from "react";
import { createWebSocketClient } from "../websocket";


// ============================================================
// MOCK DATA
// ============================================================

const MOCK_M = [
  {
    id: 1,
    u: "moonbunny",
    t: "hii everyone! let's get to work~ 🌸",
    ts: "2:30 PM",
  },
  {
    id: 2,
    u: "tealeaf",
    t: "motivation loading... 📚✨",
    ts: "2:31 PM",
  },
  {
    id: 3,
    u: "stargazer",
    t: "I finished my notes!! feels so good 🎉",
    ts: "2:45 PM",
  },
];

const EMOJIS = ["🌸", "✨", "💚", "☕", "📚", "🌙"];


// ============================================================
// STUDY ROOM
// ============================================================

const Study = ({
  nick,
  displayName,
  memberId,
  roomCode,
  onLeaveRoom,
  t,
}) => {
  // ----------------------------------------------------------
  // State
  // ----------------------------------------------------------

  const [members, setMembers] = useState([]);
  const [myStatus, setMyStatus] = useState("STUDYING");

  const [messages, setMessages] = useState([]);
  const [inp, setInp] = useState("");



  // Keeps the WebSocket connection available throughout the component.
  const wsClient = useRef(null);

  // Used to automatically scroll the chat to the latest message.
  const chatRef = useRef(null);


  // ==========================================================
  // ROOM MEMBERS
  // ==========================================================

  // Fetch the members already present in the room.
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/members`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch members");
        }

        const data = await response.json();

        console.log("Room members:", data);

        setMembers(data);

        // Find our own member record so we can restore our status.
        const myMember = data.find(
          (member) => member.id === memberId
        );

        if (myMember) {
          setMyStatus(myMember.status);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    if (roomCode && memberId) {
      fetchMembers();
    }
  }, [roomCode, memberId]);


  // ==========================================================
  // CHAT HISTORY
  // ==========================================================

  // Load previous messages when the user enters a room.
  useEffect(() => {
    if (!roomCode) return;

    const loadChatHistory = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/messages`
        );

        if (!response.ok) {
          throw new Error("Failed to load chat history");
        }

        const data = await response.json();

        setMessages(data);

        console.log("💬 Chat history loaded:", data);
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };

    loadChatHistory();
  }, [roomCode]);


  // ==========================================================
  // CHAT AUTO-SCROLL
  // ==========================================================

  // Whenever a new message arrives, keep the latest message visible.
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);


  // ==========================================================
  // MESSAGE COOLDOWN
  // ==========================================================

  // Count down the remaining time before another message can be sent.
  // useEffect(() => {
  //   if (cd <= 0) return;

  //   const timer = setTimeout(() => {
  //     setCd((current) => current - 1);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [cd]);


  // ==========================================================
  // WEBSOCKET CONNECTION
  // ==========================================================

  useEffect(() => {
    if (!roomCode) return;

    console.log("🔌 Connecting to WebSocket...");

    wsClient.current = createWebSocketClient((client) => {
      console.log("✅ Study page connected to WebSocket");


      // --------------------------------------------------------
      // Listen for member status updates
      // --------------------------------------------------------

      client.subscribe(
        `/topic/room/${roomCode}`,
        (message) => {
          const updatedMember = JSON.parse(message.body);

          console.log(
            "📢 Status update received:",
            updatedMember
          );

          // Update only the member whose status changed.
          setMembers((currentMembers) =>
            currentMembers.map((member) =>
              member.id === updatedMember.memberId
                ? {
                  ...member,
                  status: updatedMember.status,
                }
                : member
            )
          );
        }
      );


      // --------------------------------------------------------
      // Listen for new chat messages
      // --------------------------------------------------------

      client.subscribe(
        `/topic/room/${roomCode}/chat`,
        (message) => {
          const newMessage = JSON.parse(message.body);

          console.log(
            "💬 Chat message received:",
            newMessage
          );

          setMessages((currentMessages) => [
            ...currentMessages,
            newMessage,
          ]);
        }
      );
      client.subscribe(
        "/user/queue/errors",
        (message) => {
          console.log("❌ Chat error:", message.body);

          alert(message.body);
        }
      );
    });


    // Disconnect when the user leaves the room/page.
    return () => {
      if (wsClient.current) {
        console.log("🔴 Disconnecting WebSocket");

        wsClient.current.deactivate();
        wsClient.current = null;
      }
    };
  }, [roomCode]);


  // ==========================================================
  // CHAT FUNCTIONS
  // ==========================================================

  // Send a normal text message through WebSocket.
  const send = () => {

    const trimmedMessage = inp.trim();

    // Don't send empty messages
    if (!trimmedMessage) return;

    // Member ID is required
    if (!memberId) {
      console.error("Member ID not found");
      return;
    }

    // WebSocket must be connected
    if (!wsClient.current) {
      console.error("WebSocket is not connected");
      return;
    }

    /*
     * Send message to Spring Boot.
     *
     * /app/chat
     *      ↓
     * @MessageMapping("/chat")
     *      ↓
     * MessageService
     *      ↓
     * MySQL
     *      ↓
     * /topic/room/{roomCode}/chat
     */
    wsClient.current.publish({
      destination: "/app/chat",

      body: JSON.stringify({
        roomCode,
        memberId,
        content: trimmedMessage,
      }),
    });

    // Clear input after sending
    setInp("");
  };


  // Send an emoji as a quick chat reaction.
  const react = (emoji) => {

    if (!memberId) {
      console.error("Member ID not found");
      return;
    }

    if (!wsClient.current) {
      console.error("WebSocket is not connected");
      return;
    }

    /*
     * Send emoji as a normal chat message.
     *
     * The backend will apply the same
     * 20-second cooldown.
     */
    wsClient.current.publish({

      destination: "/app/chat",

      body: JSON.stringify({
        roomCode,
        memberId,
        content: emoji,
      }),

    });
  };


  // ==========================================================
  // MEMBER STATUS
  // ==========================================================

  const statusColor = {
    studying: t.green,
    reading: t.accent,
    break: t.textMuted,
  };


  const updateStatus = (newStatus) => {
    if (!memberId) {
      console.error("Member ID not found");
      return;
    }

    if (!wsClient.current) {
      console.error("WebSocket is not connected");
      return;
    }

    /*
      Send the status update to Spring Boot.

      /app/status
          ↓
      Backend updates the member status
          ↓
      /topic/room/{roomCode}
          ↓
      Everyone in the room sees the update
    */

    wsClient.current.publish({
      destination: "/app/status",

      body: JSON.stringify({
        roomCode,
        memberId,
        displayName,
        status: newStatus,
      }),
    });

    // Update our own UI immediately instead of waiting for the server.
    setMyStatus(newStatus);

    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === memberId
          ? {
            ...member,
            status: newStatus,
          }
          : member
      )
    );
  };


  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div
      className="page"
      style={{
        padding: "88px 28px 28px",
        maxWidth: 980,
        margin: "0 auto",
      }}
    >

      {/* Page heading */}
      <div
        className="hand"
        style={{
          fontSize: 32,
          color: t.green,
          marginBottom: 22,
        }}
      >
        Study Together 🌿
      </div>


      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr",
          gap: 18,
        }}
      >

        {/* ====================================================
            SIDEBAR
        ==================================================== */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >

          {/* --------------------------------------------------
              Room information
          -------------------------------------------------- */}

          <div className="card" style={{ padding: 18 }}>
            <div
              className="hand"
              style={{
                fontSize: 18,
                color: t.green,
                marginBottom: 10,
              }}
            >
              🏠 Room
            </div>

            <div
              style={{
                background: t.bgLight,
                borderRadius: 10,
                padding: "11px 14px",
                marginBottom: 9,
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: 2,
                color: t.green,
                textAlign: "center",
                fontFamily: "'Caveat', cursive",
              }}
            >
              {roomCode}
            </div>

            <button
              className="btn-o"
              style={{
                width: "100%",
                fontSize: 12,
              }}
              onClick={() =>
                navigator.clipboard?.writeText(roomCode)
              }
            >
              📋 Copy Invite Code
            </button>
          </div>


          {/* --------------------------------------------------
              Room members
          -------------------------------------------------- */}

          <div className="card" style={{ padding: 18 }}>
            <div
              className="hand"
              style={{
                fontSize: 18,
                color: t.green,
                marginBottom: 10,
              }}
            >
              👥 Online ({members.length}/6)

              <button
                onClick={onLeaveRoom}
                style={{
                  padding: "8px 14px",
                  borderRadius: "8px",
                  border: "none",
                  cursor: "pointer",
                  background: "#e57373",
                  color: "white",
                  fontWeight: "600",
                }}
              >
                Leave Room
              </button>
            </div>


            {/* Current user */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "7px 9px",
                borderRadius: 11,
                background: t.badge,
                marginBottom: 7,
                border: `1px solid ${t.green}28`,
              }}
            >
              <span style={{ fontSize: 18 }}>🌟</span>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: t.green,
                  }}
                >
                  {members.find(
                    (member) => member.id === memberId
                  )?.displayName || nick}{" "}
                  (you)
                </div>

                <select
                  value={myStatus}
                  onChange={(e) =>
                    updateStatus(e.target.value)
                  }
                  style={{
                    fontSize: 10,
                    color: t.green,
                    fontWeight: 600,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    cursor: "pointer",
                  }}
                >
                  <option value="STUDYING">
                    ● studying
                  </option>

                  <option value="READING">
                    ● reading
                  </option>

                  <option value="BREAK">
                    ● break
                  </option>
                </select>
              </div>
            </div>


            {/* Other members */}
            {members
              .filter((member) => member.id !== memberId)
              .map((member) => (
                <div
                  key={member.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 9,
                    padding: "7px 9px",
                    borderRadius: 11,
                    background: t.bgLight,
                    marginBottom: 5,
                  }}
                >
                  <span style={{ fontSize: 18 }}>🌿</span>

                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: t.text,
                      }}
                    >
                      {member.displayName ||
                        member.nickname}
                    </div>

                    <div
                      style={{
                        fontSize: 10,
                        color:
                          statusColor[
                          member.status?.toLowerCase()
                          ] || t.textMuted,
                        fontWeight: 600,
                      }}
                    >
                      ● {member.status?.toLowerCase()}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>


        {/* ====================================================
            CHAT
        ==================================================== */}

        <div
          className="card"
          style={{
            padding: 18,
            display: "flex",
            flexDirection: "column",
            height: 500,
          }}
        >

          {/* Chat heading */}
          <div
            className="hand"
            style={{
              fontSize: 18,
              color: t.green,
              marginBottom: 3,
            }}
          >
            💬 Chat Room
          </div>

          <p
            style={{
              fontSize: 11,
              color: t.textMuted,
              marginBottom: 12,
            }}
          >
            🕊️ Keep it peaceful · 1 message per 30 seconds
          </p>


          {/* Message list */}
          <div
            ref={chatRef}
            style={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              paddingRight: 3,
            }}
          >
            {messages.map((msg) => {

              const me = msg.memberId === memberId;

              return (
                <div
                  key={msg.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: me
                      ? "flex-end"
                      : "flex-start",
                  }}
                >

                  {/* Show sender name for other users */}
                  {!me && (
                    <span
                      style={{
                        fontSize: 10,
                        color: t.textMuted,
                        marginBottom: 3,
                        marginLeft: 7,
                        fontWeight: 600,
                      }}
                    >
                      {msg.Username}
                    </span>
                  )}

                  <div
                    className={`bubble ${me ? "me" : "them"}`}
                  >
                    {msg.content}
                  </div>

                  <span
                    style={{
                      fontSize: 9,
                      color: t.textMuted,
                      marginTop: 2,
                      [me ? "marginRight" : "marginLeft"]: 7,
                    }}
                  >
                    {new Date(msg.sentAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              );
            })}


            {/* --------------------------------------------------
              Emoji reactions
          -------------------------------------------------- */}

            <div
              style={{
                display: "flex",
                gap: 5,
                padding: "8px 0 7px",
              }}
            >
              {EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => react(emoji)}
                  style={{
                    background: t.inputBg,
                    border: `1.5px solid ${t.inputBorder}`,
                    borderRadius: 50,
                    padding: "3px 7px",
                    fontSize: 14,
                    cursor: "pointer",
                    transition: "all .2s",
                  }}
                  onMouseOver={(e) =>
                  (e.currentTarget.style.transform =
                    "scale(1.2)")
                  }
                  onMouseOut={(e) =>
                  (e.currentTarget.style.transform =
                    "scale(1)")
                  }
                >
                  {emoji}
                </button>
              ))}
            </div>


            {/* --------------------------------------------------
              Message input
          -------------------------------------------------- */}

            <div
              style={{
                display: "flex",
                gap: 7,
                borderTop: `1px solid ${t.inputBorder}`,
                paddingTop: 10,
              }}
            >
              <input
                className="inp"
                placeholder="Send a message..."
                value={inp}
                onChange={(e) => setInp(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    send();
                  }
                }}
                style={{
                  flex: 1,
                  fontSize: 13,
                }}
              />

              <button
                className="btn-g"
                style={{
                  padding: "10px 14px",
                  fontSize: 13,
                }}
                onClick={send}
              >
                Send
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Study;

