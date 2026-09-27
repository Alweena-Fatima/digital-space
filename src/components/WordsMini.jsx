
import React, { useState, useEffect, useRef } from "react";
import { createWebSocketClient } from "../websocket";

const WordsMini = ({
  roomCode,
  words,
  setWords,
  theme,
}) => {
  const [wordInput, setWordInput] = useState("");
  const [meaningInput, setMeaningInput] = useState("");

  const webSocketClient = useRef(null);

  useEffect(() => {
    if (!roomCode) return;

    webSocketClient.current = createWebSocketClient(
      (client) => {
        client.subscribe(
          `/topic/room/${roomCode}/words`,
          (message) => {
            const wordUpdate = JSON.parse(message.body);

            if (wordUpdate.action === "CREATE") {
              const word = wordUpdate.word;

              setWords((currentWords) => [
                ...currentWords,
                word,
              ]);
            }

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
      }
    );

    return () => {
      if (webSocketClient.current) {
        webSocketClient.current.deactivate();
        webSocketClient.current = null;
      }
    };
  }, [roomCode, setWords]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/words`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch words");
        }

        const savedWords = await response.json();

        setWords(savedWords);
      } catch (error) {
        console.error(
          "Error fetching words:",
          error
        );
      }
    };

    if (roomCode) {
      fetchWords();
    }
  }, [roomCode, setWords]);

  const addWord = async () => {
    if (!wordInput.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomCode}/words`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            word: wordInput,
            meaning:
              meaningInput || "Look it up~",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save word");
      }

      // WebSocket CREATE event updates the UI.
      await response.json();

      setWordInput("");
      setMeaningInput("");
    } catch (error) {
      console.error(
        "Error saving word:",
        error
      );
    }
  };

  const deleteWord = async (wordId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/words/${wordId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete word");
      }

      // WebSocket DELETE event updates the UI.
    } catch (error) {
      console.error(
        "Error deleting word:",
        error
      );
    }
  };

  return (
    <div className="card" style={{ padding: 22 }}>
      <div
        className="hand"
        style={{
          fontSize: 22,
          color: theme.green,
          marginBottom: 3,
        }}
      >
        📝 Vocabulary
      </div>

      <p
        style={{
          fontSize: 11,
          color: theme.textMuted,
          marginBottom: 12,
        }}
      >
        Build your word collection
      </p>

      <div
        style={{
          display: "flex",
          gap: 7,
          marginBottom: 7,
        }}
      >
        <input
          className="inp"
          placeholder="Word..."
          value={wordInput}
          onChange={(event) =>
            setWordInput(event.target.value)
          }
          style={{
            flex: 1,
            fontSize: 13,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: 7,
          marginBottom: 12,
        }}
      >
        <input
          className="inp"
          placeholder="Meaning..."
          value={meaningInput}
          onChange={(event) =>
            setMeaningInput(event.target.value)
          }
          style={{
            flex: 1,
            fontSize: 13,
          }}
        />

        <button
          className="btn-g"
          style={{
            padding: "10px 13px",
            fontSize: 14,
          }}
          onClick={addWord}
        >
          +
        </button>
      </div>

      <div
        style={{
          maxHeight: 170,
          overflowY: "auto",
        }}
      >
        {words
          .slice(-3)
          .reverse()
          .map((word) => (
            <div
              key={word.id}
              className="wcard"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: theme.green,
                  }}
                >
                  {word.emoji} {word.word}
                </span>

                <button
                  onClick={() =>
                    deleteWord(word.id)
                  }
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: theme.textMuted,
                  }}
                >
                  ×
                </button>
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: theme.textLight,
                  marginTop: 3,
                }}
              >
                {word.meaning}
              </p>
            </div>
          ))}

        {words.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 16,
              color: theme.textMuted,
              fontSize: 12,
            }}
          >
            ✨ Save words from Word Magic above~
          </div>
        )}
      </div>
    </div>
  );
};

export default WordsMini;
