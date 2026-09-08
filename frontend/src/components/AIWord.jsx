import React, { useState } from "react";

const AIWord = ({ onSave, t }) => {
  const [word, setWord] = useState("");
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(false);

  const lookup = async () => {
  if (!word.trim()) return;

  setLoading(true);
  setRes(null);

  try {
    const response = await fetch(
      `http://localhost:8080/api/gemini/meaning?word=${encodeURIComponent(
        word.trim()
      )}`
    );

    if (!response.ok) {
      throw new Error("Failed to get word meaning");
    }

    const meaning = await response.text();

    setRes({
      word: word.trim(),
      meaning: meaning,
      example: "",
      emoji: "📖",
      category: "general",
    });
  } catch (error) {
    console.error("Word lookup error:", error);

    setRes({
      word: word.trim(),
      meaning: "Could not find the meaning. Please try again.",
      example: "",
      emoji: "📖",
      category: "general",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="card" style={{ padding: 22, height: "100%" }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        🔮 Word Magic
      </div>
      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 14 }}>Discover meanings with AI ✨</p>

      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        <input
          className="inp"
          placeholder="Enter a word..."
          value={word}
          onChange={(e) => setWord(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && lookup()}
          style={{ flex: 1 }}
        />
        <button
          className="btn-g"
          style={{ padding: "12px 14px", fontSize: 13, whiteSpace: "nowrap" }}
          onClick={lookup}
        >
          {loading ? "✨" : "Look up"}
        </button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "22px", animation: "breathe 1.5s ease infinite" }}>
          <div style={{ fontSize: 30 }}>🔮</div>
          <p style={{ fontSize: 12, color: t.textMuted, marginTop: 7 }}>Finding meaning...</p>
        </div>
      )}

      {res && !loading && (
        <div
          style={{
            background: t.green + "10",
            borderRadius: 14,
            padding: 16,
            border: `1.5px solid ${t.green}28`,
            animation: "fadeUp .4s ease",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 9 }}>
            <span style={{ fontSize: 26 }}>{res.emoji}</span>
            <div>
              <div className="hand" style={{ fontSize: 21, color: t.green }}>{res.word}</div>
              <span
                style={{
                  fontSize: 10, background: t.badge,
                  color: t.green, padding: "2px 7px", borderRadius: 50, fontWeight: 700,
                }}
              >
                {res.category}
              </span>
            </div>
          </div>
          <p style={{ fontSize: 13, color: t.text, lineHeight: 1.6, marginBottom: 7 }}>{res.meaning}</p>
          <p style={{ fontSize: 11, color: t.textMuted, fontStyle: "italic", lineHeight: 1.5 }}>
            "{res.example}"
          </p>
          <button
            className="btn-o"
            style={{ marginTop: 10, fontSize: 11, padding: "7px 14px" }}
            onClick={() => onSave && onSave(res)}
          >
            + Save to Library
          </button>
        </div>
      )}

      {!res && !loading && (
        <div
          style={{
            textAlign: "center",
            padding: "24px 14px",
            background: t.bgLight,
            borderRadius: 12,
            border: `1.5px dashed ${t.inputBorder}`,
          }}
        >
          <div style={{ fontSize: 34, marginBottom: 7, animation: "wiggle 3s ease infinite" }}>📚</div>
          <p style={{ fontSize: 12, color: t.textMuted }}>Type a word and discover its meaning~</p>
        </div>
      )}
    </div>
  );
};

export default AIWord;
