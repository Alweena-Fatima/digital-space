
import React, { useState, useEffect, useRef } from "react";
import { createWebSocketClient } from "../websocket";

const QuotesMini = ({
  roomCode,
  quotes,
  setQuotes,
  theme,
}) => {
  const [quoteInput, setQuoteInput] = useState("");
  const [authorInput, setAuthorInput] = useState("");

  const webSocketClient = useRef(null);

  useEffect(() => {
    if (!roomCode) return;

    webSocketClient.current = createWebSocketClient(
      (client) => {
        client.subscribe(
          `/topic/room/${roomCode}/quotes`,
          (message) => {
            const quoteUpdate = JSON.parse(message.body);

            if (quoteUpdate.action === "CREATE") {
              const quote = quoteUpdate.quote;

              setQuotes((currentQuotes) => [
                ...currentQuotes,
                quote,
              ]);
            }

            if (quoteUpdate.action === "DELETE") {
              const deletedQuoteId =
                quoteUpdate.quoteId;

              setQuotes((currentQuotes) =>
                currentQuotes.filter(
                  (quote) =>
                    quote.id !== deletedQuoteId
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
  }, [roomCode, setQuotes]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/quotes`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quotes");
        }

        const savedQuotes = await response.json();

        setQuotes(savedQuotes);
      } catch (error) {
        console.error(
          "Error fetching quotes:",
          error
        );
      }
    };

    if (roomCode) {
      fetchQuotes();
    }
  }, [roomCode, setQuotes]);

  const addQuote = async () => {
    if (!quoteInput.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomCode}/quotes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quote: quoteInput,
            author: authorInput || "Unknown",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save quote");
      }

      // WebSocket CREATE event updates the UI.
      await response.json();

      setQuoteInput("");
      setAuthorInput("");
    } catch (error) {
      console.error(
        "Error saving quote:",
        error
      );
    }
  };

  const deleteQuote = async (quoteId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/quotes/${quoteId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete quote");
      }

      // WebSocket DELETE event updates the UI.
    } catch (error) {
      console.error(
        "Error deleting quote:",
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
        💬 My Quotes
      </div>

      <p
        style={{
          fontSize: 11,
          color: theme.textMuted,
          marginBottom: 12,
        }}
      >
        Collect words that inspire you
      </p>

      <textarea
        className="inp"
        placeholder="Add an inspiring quote..."
        value={quoteInput}
        onChange={(event) =>
          setQuoteInput(event.target.value)
        }
        style={{
          resize: "none",
          height: 65,
          marginBottom: 7,
          fontSize: 13,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 7,
          marginBottom: 12,
        }}
      >
        <input
          className="inp"
          placeholder="— Author"
          value={authorInput}
          onChange={(event) =>
            setAuthorInput(event.target.value)
          }
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
          onClick={addQuote}
        >
          Save
        </button>
      </div>

      <div
        style={{
          maxHeight: 170,
          overflowY: "auto",
        }}
      >
        {quotes
          .slice(-3)
          .reverse()
          .map((quote) => (
            <div
              key={quote.id}
              className="qcard"
              style={{
                paddingTop: 22,
              }}
            >
              <p
                style={{
                  fontSize: 13,
                  color: theme.text,
                  lineHeight: 1.6,
                  marginBottom: 5,
                }}
              >
                {quote.quote}
              </p>

              <span
                style={{
                  fontSize: 11,
                  color: theme.textMuted,
                  fontWeight: 700,
                }}
              >
                — {quote.author}
              </span>

              <button
                onClick={() =>
                  deleteQuote(quote.id)
                }
                style={{
                  float: "right",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: theme.textMuted,
                  fontSize: 13,
                }}
              >
                ×
              </button>
            </div>
          ))}

        {quotes.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: 18,
              color: theme.textMuted,
              fontSize: 12,
            }}
          >
            🌸 Add your first quote above~
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesMini;
