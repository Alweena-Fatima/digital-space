import React, { useState, useEffect, useRef } from "react";
import { createWebSocketClient } from "../websocket";

const WordsMini = ({ roomCode, words, setWords, t }) => {
  const [w, setW] = useState("");
  const [m, setM] = useState("");
  const wsClient = useRef(null);
  // Listen for real-time word changes
useEffect(() => {

  if (!roomCode) return;

  console.log("🔌 Connecting Words WebSocket...");

  wsClient.current = createWebSocketClient((client) => {

    console.log("✅ Words WebSocket connected");

    client.subscribe(
      `/topic/room/${roomCode}/words`,
      (message) => {

        const wordUpdate = JSON.parse(message.body);

        console.log(
          "📝 Word update received:",
          wordUpdate
        );


        // =======================
        // CREATE
        // =======================

        if (wordUpdate.action === "CREATE") {

          const word = wordUpdate.word;

          setWords((currentWords) => [
            ...currentWords,
            word,
          ]);
        }


        // =======================
        // DELETE
        // =======================

        if (wordUpdate.action === "DELETE") {

          const deletedWordId =
            wordUpdate.wordId;

          setWords((currentWords) =>
            currentWords.filter(
              (word) =>
                word.id !== deletedWordId
            )
          );
        }

      }
    );
  });


  // Cleanup WebSocket when component unmounts
  return () => {

    if (wsClient.current) {

      console.log(
        "🔴 Disconnecting Words WebSocket"
      );

      wsClient.current.deactivate();
      wsClient.current = null;
    }
  };

}, [roomCode, setWords]);
  // Fetch all saved words belonging to the current room
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/words`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }

        const data = await response.json();

        console.log("Room words:", data);

        setWords(data);

      } catch (error) {
        console.error("Error fetching words:", error);
      }
    };

    if (roomCode) {
      fetchWords();
    }
  }, [roomCode, setWords]);
  const add = async () => {
  if (!w.trim()) return;

  try {
    const response = await fetch(
      `http://localhost:8080/api/rooms/${roomCode}/words`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: w,
          meaning: m || "Look it up~",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save word");
    }

    const data = await response.json();

  console.log("Saved word:", data);

  // Do not update words here.
  // WebSocket CREATE event will update the UI.

  setW("");
  setM("");

  } catch (error) {
    console.error("Error saving word:", error);
  }
};
const deleteWord = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/rooms/words/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete word");
    }

    console.log("Deleted word:", id);

    // Remove it from the UI after backend deletion succeeds
    setWords((ws) => ws.filter((word) => word.id !== id));

  } catch (error) {
    console.error("Error deleting word:", error);
  }
};

  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        📝 Vocabulary
      </div>
      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>Build your word collection</p>

      <div style={{ display: "flex", gap: 7, marginBottom: 7 }}>
        <input
          className="inp"
          placeholder="Word..."
          value={w}
          onChange={(e) => setW(e.target.value)}
          style={{ flex: 1, fontSize: 13 }}
        />
      </div>

      <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
        <input
          className="inp"
          placeholder="Meaning..."
          value={m}
          onChange={(e) => setM(e.target.value)}
          style={{ flex: 1, fontSize: 13 }}
        />
        <button className="btn-g" style={{ padding: "10px 13px", fontSize: 14 }} onClick={add}>+</button>
      </div>

      <div style={{ maxHeight: 170, overflowY: "auto" }}>
        {words.slice(-3).reverse().map((w2) => (
          <div key={w2.id} className="wcard">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: t.green }}>
                {w2.emoji} {w2.word}
              </span>
              <button
                onClick={() => deleteWord(w2.id)}
                style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted }}
              >
                ×
              </button>
            </div>
            <p style={{ fontSize: 12, color: t.textLight, marginTop: 3 }}>{w2.meaning}</p>
          </div>
        ))}
        {words.length === 0 && (
          <div style={{ textAlign: "center", padding: 16, color: t.textMuted, fontSize: 12 }}>
            ✨ Save words from Word Magic above~
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsMini;
