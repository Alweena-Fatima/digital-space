import React, { useState, useEffect } from "react";

const QuotesMini = ({ roomCode,quotes, setQuotes, t }) => {
  const [inp, setInp] = useState("");
  const [auth, setAuth] = useState("");
  // Fetch quotes saved for this room from the backend
useEffect(() => {
  const fetchQuotes = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomCode}/quotes`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch quotes");
      }

      const data = await response.json();

      console.log("Room quotes:", data);

      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  // Only fetch when we have a room code
  if (roomCode) {
    fetchQuotes();
  }
}, [roomCode, setQuotes]);
  const add = async () => {
  if (!inp.trim()) return;

  try {
    const response = await fetch(
      `http://localhost:8080/api/rooms/${roomCode}/quotes`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quote: inp,
          author: auth || "Unknown",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to save quote");
    }

    const data = await response.json();

    console.log("Saved quote:", data);

    // Backend returns the newly created quote.
    // Add it to the UI.
    setQuotes((q) => [...q, data]);

    setInp("");
    setAuth("");

  } catch (error) {
    console.error("Error saving quote:", error);
  }
};
const deleteQuote = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/rooms/quotes/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete quote");
    }

    console.log("Deleted quote:", id);

    // Remove the deleted quote from the UI
    setQuotes((qs) => qs.filter((quote) => quote.id !== id));

  } catch (error) {
    console.error("Error deleting quote:", error);
  }
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
        {quotes.slice(-3).reverse().map((q) => (
          <div key={q.id} className="qcard" style={{ paddingTop: 22 }}>
            <p style={{ fontSize: 13, color: t.text, lineHeight: 1.6, marginBottom: 5 }}>{q.quote}</p>
            <span style={{ fontSize: 11, color: t.textMuted, fontWeight: 700 }}>— {q.author}</span>
            <button
              onClick={()=>deleteQuote(q.id)}
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
