import React, { useState } from "react";

const Goals = ({ t }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Finish DSA sheet 🧩", done: false },
    { id: 2, text: "Read 20 pages 📖", done: false },
    { id: 3, text: "Complete assignment ✏️", done: true },
  ]);
  const [inp, setInp] = useState("");

  const toggle = (id) => setTodos((ts) => ts.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
  const add = () => {
    if (!inp.trim()) return;
    setTodos((ts) => [...ts, { id: Date.now(), text: inp, done: false }]);
    setInp("");
  };

  const done = todos.filter((t) => t.done).length;

  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 3 }}>
        <div className="hand" style={{ fontSize: 22, color: t.green }}>🎯 Today's Goals</div>
        <span
          style={{
            fontSize: 11, background: t.badge,
            color: t.green, padding: "3px 9px", borderRadius: 50, fontWeight: 700,
          }}
        >
          {done}/{todos.length}
        </span>
      </div>

      <div style={{ height: 5, background: t.progressBg, borderRadius: 50, margin: "10px 0 14px" }}>
        <div
          style={{
            height: "100%", borderRadius: 50,
            background: `linear-gradient(to right,${t.green},${t.greenLight})`,
            width: `${todos.length ? (done / todos.length) * 100 : 0}%`,
            transition: "width .5s ease",
          }}
        />
      </div>

      <div style={{ maxHeight: 190, overflowY: "auto", marginBottom: 10 }}>
        {todos.map((todo) => (
          <div key={todo.id} className="todo" style={{ opacity: todo.done ? 0.6 : 1 }}>
            <div className={`chk ${todo.done ? "done" : ""}`} onClick={() => toggle(todo.id)}>
              {todo.done && <span style={{ color: "white", fontSize: 10 }}>✓</span>}
            </div>
            <span style={{ flex: 1, textDecoration: todo.done ? "line-through" : "none", color: t.text }}>
              {todo.text}
            </span>
            <button
              onClick={() => setTodos((ts) => ts.filter((x) => x.id !== todo.id))}
              style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, fontSize: 14 }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 7 }}>
        <input
          className="inp"
          placeholder="Add a goal..."
          value={inp}
          onChange={(e) => setInp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && add()}
          style={{ flex: 1, fontSize: 13 }}
        />
        <button className="btn-g" style={{ padding: "10px 13px", fontSize: 14 }} onClick={add}>+</button>
      </div>
    </div>
  );
};

export default Goals;
