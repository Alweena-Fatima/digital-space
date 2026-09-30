
import React from "react";

const NAV_ITEMS = [
  { id: "home", label: "🏡 Home" },
  { id: "themes", label: "🌸 Themes" },
  { id: "study", label: "👥 Study" },
  { id: "library", label: "📚 Library" },
  { id: "about", label: "🌿 About" },
];

const playNavigationSound = () => {
  const navigationSound = new Audio("/sound/navsound.wav");
  navigationSound.volume = 0.2;
  navigationSound.play();
};

const Navbar = ({ page, setPage, displayName, theme }) => (
  <nav
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: theme.navBg,
      backdropFilter: "blur(14px)",
      borderBottom: `1.5px solid ${theme.navBorder}`,
      padding: "11px 28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      transition: "background 0.4s ease, border-color 0.4s ease",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 7,
      }}
    >
      <span style={{ fontSize: 20 }}>✨</span>

      <span
        className="hand"
        style={{
          fontSize: 22,
          color: theme.green,
          fontWeight: 700,
        }}
      >
        Digital Space
      </span>
    </div>

    <div style={{ display: "flex", gap: 3 }}>
      {NAV_ITEMS.map((navItem) => (
        <button
          key={navItem.id}
          className={`nav-i ${page === navItem.id ? "act" : ""}`}
          onClick={() => {
            setPage(navItem.id);
            playNavigationSound();
          }}
        >
          {navItem.label}
        </button>
      ))}
    </div>

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${theme.green}, ${theme.greenLight})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 13,
          fontWeight: 700,
        }}
      >
        {displayName?.[0]?.toUpperCase() || "?"}
      </div>

      <span
        style={{
          fontSize: 13,
          color: theme.textLight,
          fontWeight: 600,
        }}
      >
        {displayName || "Guest"}
      </span>
    </div>
  </nav>
);

export default Navbar;
