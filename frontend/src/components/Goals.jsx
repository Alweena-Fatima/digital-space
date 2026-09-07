import React, { useState, useEffect } from "react";

const Goals = ({ roomCode, t }) => {
  const [todos, setTodos] = useState([]);

  const [inp, setInp] = useState("");
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/goals`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch goals");
        }

        const data = await response.json();

        console.log("Room goals:", data);

        // setTodos(data); as we have complete in backend and done in frontend sa,e text and title 
        // Convert backend goal format
        // into the format our UI already uses.
        setTodos(
          data.map((goal) => ({
            id: goal.id,
            text: goal.title,
            done: goal.completed,
          }))
        );
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };
// Only fetch when we actually have a room code
    if (roomCode) {
      fetchGoals();
    }
  }, [roomCode]);
//chaning goal status 
  const toggle = async (id) => {
  // Find the clicked goal
  const goal = todos.find((todo) => todo.id === id);

  // Stop if goal doesn't exist
  if (!goal) return;

  try {
    // Send updated status to backend
    const response = await fetch(
      `http://localhost:8080/api/rooms/goals/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Toggle completed status
        body: JSON.stringify({
          completed: !goal.done,
        }),
      }
    );

    // Check if update was successful
    if (!response.ok) {
      throw new Error("Failed to update goal");
    }

    // Get updated goal from backend
    const data = await response.json();

    console.log("Updated goal:", data);

    // Update UI with backend response
    setTodos((ts) =>
      ts.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              done: data.completed,
            }
          : todo
      )
    );

  } catch (error) {
    // Handle API/request errors
    console.error("Error updating goal:", error);
  }
};
  //adding goal via frontend 
  const add = async () => {
  // Don't add empty goals
  if (!inp.trim()) return;

  try {
    // Send new goal to backend
    const response = await fetch(
      `http://localhost:8080/api/rooms/${roomCode}/goals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Send goal title to backend
        body: JSON.stringify({
          title: inp,
        }),
      }
    );

    // Check if request was successful
    if (!response.ok) {
      throw new Error("Failed to create goal");
    }

    // Get created goal from backend
    const data = await response.json();

    console.log("Created goal:", data);

    // Convert backend data to UI format
    const newGoal = {
      id: data.id,
      text: data.title,
      done: data.completed,
    };

    // Add new goal to the list
    setTodos((ts) => [...ts, newGoal]);

    // Clear input field
    setInp("");

  } catch (error) {
    // Handle API/request errors
    console.error("Error creating goal:", error);
  }
};
//now delete the goal 
const deleteGoal = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/rooms/goals/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete goal");
    }

    console.log("Goal deleted:", id);

    // Remove the goal from the UI
    // only after backend deletion succeeds.
    setTodos((ts) => ts.filter((todo) => todo.id !== id));

  } catch (error) {
    console.error("Error deleting goal:", error);
  }
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
              onClick={() => deleteGoal(todo.id)}
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
