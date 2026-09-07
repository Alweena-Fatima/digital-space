import React from "react";
import { THEMES } from "../theme";

const ThemeCard = ({ id, sel, onSel, t }) => {
  const theme = THEMES[id];
  const isFull = id === "default";

  return (
    <div
      onClick={() => onSel(id)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        height: 88,
        gridColumn: isFull ? "1 / -1" : undefined,
        border: `2px solid ${sel ? theme.accent : "transparent"}`,
        boxShadow: sel
          ? `0 0 0 2px ${theme.accent}, 0 8px 28px ${theme.shadow}`
          : `0 3px 16px ${theme.shadow}`,
        transform: sel ? "translateY(-2px)" : "translateY(0)",
        transition: "all .25s ease",
        background: theme.pageBg,
      }}
    >
      {/* animated bg particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {id === "rain" && Array.from({ length: 10 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            left: `${i * 10 + Math.random() * 8}%`,
            width: 1.5,
            height: `${10 + Math.random() * 10}px`,
            borderRadius: 2,
            background: `rgba(140,200,255,${.15 + Math.random() * .2})`,
            animation: `rainFall ${.5 + Math.random() * .4}s linear ${Math.random() * .8}s infinite`,
          }} />
        ))}
        {id === "autumn" && ["🍂","🍁","🍃"].map((e, i) => (
          <div key={i} style={{
            position: "absolute",
            top: -5,
            left: `${18 + i * 26}%`,
            fontSize: 9,
            opacity: .5,
            animation: `leafFall ${2 + i * .4}s ease-in-out ${i * .5}s infinite`,
          }}>{e}</div>
        ))}
        {id === "cafe" && Array.from({ length: 5 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            bottom: 4,
            left: `${12 + i * 18}%`,
            width: 2.5,
            height: `${14 + Math.random() * 12}px`,
            borderRadius: 2,
            background: "rgba(60,160,60,.35)",
            animation: `steam ${1.2 + i * .25}s ease-out ${i * .3}s infinite`,
          }} />
        ))}
      </div>

      {/* content row */}
      <div style={{
        position: "relative", zIndex: 2,
        height: "100%", display: "flex", alignItems: "center",
        padding: "0 16px", gap: 14,
      }}>
        {/* emoji bubble */}
        <div style={{
          width: 48, height: 48, borderRadius: 12, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
          background: "rgba(255,255,255,.18)",
        }}>
          {theme.emoji}
        </div>

        {/* text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="hand" style={{
            fontSize: 18, color: theme.accent,
            lineHeight: 1.1, fontWeight: 700,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {theme.label}
          </div>
          <p style={{
            fontSize: 10.5, color: theme.accent + "BB",
            marginTop: 3, lineHeight: 1.4,
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {theme.desc}
          </p>
        </div>

        {/* selected pill */}
        {sel && (
          <div style={{
            flexShrink: 0,
            padding: "3px 10px", borderRadius: 20,
            fontSize: 10, fontWeight: 700, letterSpacing: .5,
            background: "rgba(255,255,255,.22)",
            color: theme.accent,
            whiteSpace: "nowrap",
          }}>
            ✓ Selected
          </div>
        )}
      </div>
    </div>
  );
};

const Themes = ({ roomCode, sel, setSel, t }) => {

  const handleThemeSelect = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/rooms/${roomCode}/theme?theme=${id.toUpperCase()}`,
      {
        method: "PUT",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update theme");
    }

    const data = await response.json();

    console.log("Updated room theme:", data);

    // Update the frontend only after backend update succeeds
    setSel(id);

  } catch (error) {
    console.error("Error updating theme:", error);
  }
};

  return (
    <div
      className="page"
      style={{
        padding: "88px 24px 28px",
        maxWidth: 760,
        margin: "0 auto"
      }}
    >

      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div
          className="hand"
          style={{
            fontSize: 32,
            color: t.green
          }}
        >
          Choose Your Room 🌸
        </div>

        <p
          style={{
            fontSize: 12,
            color: t.textMuted,
            marginTop: 4
          }}
        >
          Pick an atmosphere that changes the whole vibe
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10
        }}
      >
        {["default", "rain", "autumn", "novel", "cafe"].map((id) => (
          <ThemeCard
            key={id}
            id={id}
            sel={sel === id}
            onSel={handleThemeSelect}
            t={t}
          />
        ))}
      </div>

      {sel && (
        <p
          style={{
            textAlign: "center",
            marginTop: 16,
            fontSize: 12,
            color: t.green,
            fontWeight: 700,
            animation: "fadeUp .4s ease",
          }}
        >
          ✨ Room atmosphere set to {THEMES[sel]?.label}!
        </p>
      )}

    </div>
  );
};


export default Themes;