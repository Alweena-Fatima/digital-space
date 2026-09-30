
import React, { useState } from "react";
import { API_URL } from "../../config";
const AIWord = ({ onSave, theme }) => {
  const [word, setWord] = useState("");
  const [wordResult, setWordResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookupWord = async () => {
    if (!word.trim()) return;

    setLoading(true);
    setWordResult(null);

    try {
      const response = await fetch(
        `${API_URL}/api/gemini/meaning?word=${encodeURIComponent(
          word.trim()
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to get word meaning");
      }

      const meaning = await response.text();

      setWordResult({
        word: word.trim(),
        meaning,
        example: "",
        emoji: "📖",
        category: "general",
      });
    } catch (error) {
      console.error("Word lookup error:", error);

      setWordResult({
        word: word.trim(),
        meaning:
          "Could not find the meaning. Please try again.",
        example: "",
        emoji: "📖",
        category: "general",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card"
      style={{
        padding: 22,
        height: "100%",
      }}
    >
      <div
        className="hand"
        style={{
          fontSize: 22,
          color: theme.green,
          marginBottom: 3,
        }}
      >
        🔮 Word Magic
      </div>

      <p
        style={{
          fontSize: 11,
          color: theme.textMuted,
          marginBottom: 14,
        }}
      >
        Discover meanings with AI ✨
      </p>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <input
          className="inp"
          placeholder="Enter a word..."
          value={word}
          onChange={(event) => setWord(event.target.value)}
          onKeyDown={(event) =>
            event.key === "Enter" && lookupWord()
          }
          style={{
            flex: 1,
          }}
        />

        <button
          className="btn-g"
          style={{
            padding: "12px 14px",
            fontSize: 13,
            whiteSpace: "nowrap",
          }}
          onClick={lookupWord}
        >
          {loading ? "✨" : "Look up"}
        </button>
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "22px",
            animation: "breathe 1.5s ease infinite",
          }}
        >
          <div style={{ fontSize: 30 }}>🔮</div>

          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
              marginTop: 7,
            }}
          >
            Finding meaning...
          </p>
        </div>
      )}

      {wordResult && !loading && (
        <div
          style={{
            background: theme.green + "10",
            borderRadius: 14,
            padding: 16,
            border: `1.5px solid ${theme.green}28`,
            animation: "fadeUp .4s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 9,
            }}
          >
            <span style={{ fontSize: 26 }}>
              {wordResult.emoji}
            </span>

            <div>
              <div
                className="hand"
                style={{
                  fontSize: 21,
                  color: theme.green,
                }}
              >
                {wordResult.word}
              </div>

              <span
                style={{
                  fontSize: 10,
                  background: theme.badge,
                  color: theme.green,
                  padding: "2px 7px",
                  borderRadius: 50,
                  fontWeight: 700,
                }}
              >
                {wordResult.category}
              </span>
            </div>
          </div>

          <p
            style={{
              fontSize: 13,
              color: theme.text,
              lineHeight: 1.6,
              marginBottom: 7,
            }}
          >
            {wordResult.meaning}
          </p>

          <p
            style={{
              fontSize: 11,
              color: theme.textMuted,
              fontStyle: "italic",
              lineHeight: 1.5,
            }}
          >
            "{wordResult.example}"
          </p>

          <button
            className="btn-o"
            style={{
              marginTop: 10,
              fontSize: 11,
              padding: "7px 14px",
            }}
            onClick={() => onSave && onSave(wordResult)}
          >
            + Save to Library
          </button>
        </div>
      )}

      {!wordResult && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "24px 14px",
            background: theme.bgLight,
            borderRadius: 12,
            border: `1.5px dashed ${theme.inputBorder}`,
          }}
        >
          <div
            style={{
              fontSize: 34,
              marginBottom: 7,
              animation: "wiggle 3s ease infinite",
            }}
          >
            📚
          </div>

          <p
            style={{
              fontSize: 12,
              color: theme.textMuted,
            }}
          >
            Type a word and discover its meaning~
          </p>
        </div>
      )}
    </div>
  );
};

export default AIWord;

