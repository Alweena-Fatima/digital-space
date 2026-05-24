import React from "react";

const NAV = [
  { id: "home", l: "🏡 Home" },
  { id: "themes", l: "🌸 Themes" },
  { id: "study", l: "👥 Study" },
  { id: "library", l: "📚 Library" },
  { id: "about", l: "🌿 About" },
];

const Navbar = ({ page, setPage, nick, t }) => (
  <nav
    style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 100,
      background: t.navBg,
      backdropFilter: "blur(14px)",
      borderBottom: `1.5px solid ${t.navBorder}`,
      padding: "11px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <span style={{ fontSize: 20 }}>✨</span>
      <span className="hand" style={{ fontSize: 22, color: t.green, fontWeight: 700 }}>
        Digital Space
      </span>
    </div>

    <div style={{ display: "flex", gap: 3 }}>
      {NAV.map((n) => (
        <button
          key={n.id}
          className={`nav-i ${page === n.id ? "act" : ""}`}
          onClick={() => setPage(n.id)}
        >
          {n.l}
        </button>
      ))}
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div
        style={{
          width: 30, height: 30,
          borderRadius: "50%",
          background: `linear-gradient(135deg,${t.green},${t.greenLight})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 13, fontWeight: 700,
        }}
      >
        {nick?.[0]?.toUpperCase() || "?"}
      </div>
      <span style={{ fontSize: 13, color: t.textLight, fontWeight: 600 }}>
        {nick || "Guest"}
      </span>
    </div>
  </nav>
);

export default Navbar;
