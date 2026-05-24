import React from "react";
import { THEMES } from "../theme";

const ThemeCard = ({ id, sel, onSel, t }) => {
  const theme = THEMES[id];
  return (
    <div
      onClick={() => onSel(id)}
      style={{
        borderRadius: 24,
        overflow: "hidden",
        cursor: "pointer",
        background: theme.pageBg,
        transition: "all .3s ease",
        boxShadow: sel
          ? `0 0 0 3px ${t.green}, 0 10px 36px ${t.shadow}`
          : `0 4px 20px ${t.shadow}`,
        transform: sel ? "translateY(-4px)" : "translateY(0)",
        border: `3px solid ${sel ? t.green : "transparent"}`,
      }}
    >
      <div style={{ padding: "26px 22px" }}>
        <div style={{ height: 76, marginBottom: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {id === "cafe" && (
            <div style={{ position: "relative" }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${i * 12}px`,
                    bottom: 2,
                    width: 3,
                    height: 22,
                    borderRadius: 3,
                    background: theme.accent + "88",
                    animation: `steam ${1.4 + i * 0.35}s ease-out ${i * 0.25}s infinite`,
                  }}
                />
              ))}
              <span style={{ fontSize: 46, position: "relative", zIndex: 2 }}>☕</span>
            </div>
          )}
          {id === "rain" && (
            <div style={{ position: "relative", width: 90, height: 72, overflow: "hidden", borderRadius: 8 }}>
              {Array.from({ length: 14 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${i * 7}%`,
                    top: "-12px",
                    width: 1.5,
                    height: 14,
                    background: theme.accent + "70",
                    borderRadius: 2,
                    animation: `rain ${0.5 + Math.random() * 0.4}s linear ${Math.random() * 0.8}s infinite`,
                  }}
                />
              ))}
              <span style={{ fontSize: 38, position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
                🏠
              </span>
            </div>
          )}
          {(id === "autumn" || id === "novel" || id === "default") && (
            <span style={{ fontSize: 50 }}>{theme.emoji}</span>
          )}
        </div>
        <div className="hand" style={{ fontSize: 22, color: theme.accent, marginBottom: 5 }}>
          {theme.label}
        </div>
        <p style={{ fontSize: 12, color: theme.accent + "BB", lineHeight: 1.6 }}>{theme.desc}</p>
        {sel && (
          <div
            style={{
              marginTop: 10,
              background: "rgba(255,255,255,.18)",
              borderRadius: 50,
              padding: "4px 13px",
              fontSize: 11,
              fontWeight: 700,
              color: "white",
              display: "inline-block",
            }}
          >
            ✓ Selected
          </div>
        )}
      </div>
    </div>
  );
};

const Themes = ({ sel, setSel, t }) => (
  <div className="page" style={{ padding: "88px 28px 28px", maxWidth: 880, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 30 }}>
      <div className="hand" style={{ fontSize: 36, color: t.green }}>Choose Your Room 🌸</div>
      <p style={{ fontSize: 13, color: t.textMuted, marginTop: 5 }}>
        Pick an atmosphere that changes the whole vibe
      </p>
    </div>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {["default", "rain", "autumn", "novel", "cafe"].map((id) => (
        <ThemeCard key={id} id={id} sel={sel === id} onSel={setSel} t={t} />
      ))}
    </div>

    {sel && (
      <p
        style={{
          textAlign: "center",
          marginTop: 20,
          fontSize: 13,
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

export default Themes;
