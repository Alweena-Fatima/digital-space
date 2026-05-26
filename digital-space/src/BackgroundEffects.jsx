import React from "react";

const BackgroundEffects = ({ effect }) => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {/* 🌧️ Rain */}
      {effect === "rain" &&
        Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "-10%",
              width: "2px",
              height: "80px",
              background: "rgba(180,220,255,.12)",
              animation: `rainFall ${1 + Math.random()}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

      {/* 🍂 Leaves */}
      {effect === "leaves" &&
        Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "-10%",
              fontSize: `${20 + Math.random() * 24}px`,
              opacity: 0.12,
              animation: `leafFall ${5 + Math.random() * 5}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            🍂
          </div>
        ))}

      {/* 📚 Books */}
      {effect === "books" &&
        Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i % 4) * 25 + 8}%`,
              top: `${Math.floor(i / 4) * 30 + 10}%`,
              fontSize: "90px",
              opacity: 0.05,
              transform: "rotate(-12deg)",
            }}
          >
            📚
          </div>
        ))}

      {/* ☕ Coffee */}
      {effect === "coffee" &&
        Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              fontSize: "70px",
              opacity: 0.06,
            }}
          >
            ☕
          </div>
        ))}

      {/* 🌿 Plants */}
      {effect === "plants" &&
        Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
              fontSize: "50px",
              opacity: 0.05,
            }}
          >
            🌿
          </div>
        ))}
    </div>
  );
};

export default BackgroundEffects;