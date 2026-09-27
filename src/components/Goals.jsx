
import React, { useState, useEffect, useRef } from "react";
import { createWebSocketClient } from "../websocket";

const Goals = ({ roomCode, theme }) => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  const webSocketClient = useRef(null);

  useEffect(() => {
    if (!roomCode) return;

    webSocketClient.current = createWebSocketClient((client) => {
      client.subscribe(
        `/topic/room/${roomCode}/goals`,
        (message) => {
          const goalUpdate = JSON.parse(message.body);

          if (goalUpdate.action === "CREATE") {
            const goal = goalUpdate.goal;

            setTodos((currentTodos) => [
              ...currentTodos,
              {
                id: goal.id,
                text: goal.title,
                done: goal.completed,
              },
            ]);
          }

          if (goalUpdate.action === "UPDATE") {
            const goal = goalUpdate.goal;

            setTodos((currentTodos) =>
              currentTodos.map((todo) =>
                todo.id === goal.id
                  ? {
                      ...todo,
                      text: goal.title,
                      done: goal.completed,
                    }
                  : todo
              )
            );
          }

          if (goalUpdate.action === "DELETE") {
            const deletedGoalId = goalUpdate.goalId;

            setTodos((currentTodos) =>
              currentTodos.filter(
                (todo) => todo.id !== deletedGoalId
              )
            );
          }
        }
      );
    });

    return () => {
      if (webSocketClient.current) {
        webSocketClient.current.deactivate();
        webSocketClient.current = null;
      }
    };
  }, [roomCode]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/rooms/${roomCode}/goals`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch goals");
        }

        const goals = await response.json();

        setTodos(
          goals.map((goal) => ({
            id: goal.id,
            text: goal.title,
            done: goal.completed,
          }))
        );
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    if (roomCode) {
      fetchGoals();
    }
  }, [roomCode]);

  const toggleGoal = async (goalId) => {
    const goal = todos.find((todo) => todo.id === goalId);

    if (!goal) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/goals/${goalId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !goal.done,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update goal");
      }

      // WebSocket UPDATE event keeps all connected clients in sync.
      await response.json();
    } catch (error) {
      console.error("Error updating goal:", error);
    }
  };

  const addGoal = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomCode}/goals`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: input,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      // WebSocket CREATE event adds the goal to the UI.
      await response.json();

      setInput("");
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/goals/${goalId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete goal");
      }

      // WebSocket DELETE event removes the goal from the UI.
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const completedGoals = todos.filter(
    (todo) => todo.done
  ).length;

  return (
    <div className="card" style={{ padding: 22 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 3,
        }}
      >
        <div
          className="hand"
          style={{
            fontSize: 22,
            color: theme.green,
          }}
        >
          🎯 Today's Goals
        </div>

        <span
          style={{
            fontSize: 11,
            background: theme.badge,
            color: theme.green,
            padding: "3px 9px",
            borderRadius: 50,
            fontWeight: 700,
          }}
        >
          {completedGoals}/{todos.length}
        </span>
      </div>

      <div
        style={{
          height: 5,
          background: theme.progressBg,
          borderRadius: 50,
          margin: "10px 0 14px",
        }}
      >
        <div
          style={{
            height: "100%",
            borderRadius: 50,
            background: `linear-gradient(to right, ${theme.green}, ${theme.greenLight})`,
            width: `${
              todos.length
                ? (completedGoals / todos.length) * 100
                : 0
            }%`,
            transition: "width .5s ease",
          }}
        />
      </div>

      <div
        style={{
          maxHeight: 190,
          overflowY: "auto",
          marginBottom: 10,
        }}
      >
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="todo"
            style={{
              opacity: todo.done ? 0.6 : 1,
            }}
          >
            <div
              className={`chk ${todo.done ? "done" : ""}`}
              onClick={() => toggleGoal(todo.id)}
            >
              {todo.done && (
                <span
                  style={{
                    color: "white",
                    fontSize: 10,
                  }}
                >
                  ✓
                </span>
              )}
            </div>

            <span
              style={{
                flex: 1,
                textDecoration: todo.done
                  ? "line-through"
                  : "none",
                color: theme.text,
              }}
            >
              {todo.text}
            </span>

            <button
              onClick={() => deleteGoal(todo.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: theme.textMuted,
                fontSize: 14,
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: 7,
        }}
      >
        <input
          className="inp"
          placeholder="Add a goal..."
          value={input}
          onChange={(event) =>
            setInput(event.target.value)
          }
          onKeyDown={(event) =>
            event.key === "Enter" && addGoal()
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
          onClick={addGoal}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Goals;
