import React, { useState } from "react";

const QuotesMini = ({ quotes, setQuotes, t }) => {
  const [inp, setInp] = useState("");
  const [auth, setAuth] = useState("");

  const add = () => {
    if (!inp.trim()) return;
    setQuotes((q) => [...q, { id: Date.now(), text: inp, author: auth || "Unknown" }]);
    setInp("");
    setAuth("");
  };

  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="hand" style={{ fontSize: 22, color: t.green, marginBottom: 3 }}>
        💬 My Quotes
      </div>
      <p style={{ fontSize: 11, color: t.textMuted, marginBottom: 12 }}>Collect words that inspire you</p>

      <textarea
        className="inp"
        placeholder="Add an inspiring quote..."
        value={inp}
        onChange={(e) => setInp(e.target.value)}
        style={{ resize: "none", height: 65, marginBottom: 7, fontSize: 13 }}
      />

      <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
        <input
          className="inp"
          placeholder="— Author"
          value={auth}
          onChange={(e) => setAuth(e.target.value)}
          style={{ flex: 1, fontSize: 13 }}
        />
        <button className="btn-g" style={{ padding: "10px 14px", fontSize: 13 }} onClick={add}>
          Save
        </button>
      </div>

      <div style={{ maxHeight: 170, overflowY: "auto" }}>
        {quotes.slice(0, 4).map((q) => (
          <div key={q.id} className="qcard" style={{ paddingTop: 22 }}>
            <p style={{ fontSize: 13, color: t.text, lineHeight: 1.6, marginBottom: 5 }}>{q.text}</p>
            <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 700 }}>— {q.author}</span>
            <button
              onClick={() => setQuotes((qs) => qs.filter((x) => x.id !== q.id))}
              style={{ float: "right", background: "none", border: "none", cursor: "pointer", color: t.textMuted, fontSize: 13 }}
            >
              ×
            </button>
          </div>
        ))}
        {quotes.length === 0 && (
          <div style={{ textAlign: "center", padding: 18, color: t.textMuted, fontSize: 12 }}>
            🌸 Add your first quote above~
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesMini;
