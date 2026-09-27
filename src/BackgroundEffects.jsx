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

     // 🍂 LEAVES — add drift animation
      {effect === "leaves" && Array.from({ length: 20 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 110 - 5}%`,
          top: "-60px",
          fontSize: `${14 + Math.random() * 16}px`,
          opacity: 0.18,
          animation: `leafFall ${5 + Math.random() * 6}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -8}s`,  // ← negative delay = already mid-flight
        }}>🍂</div>
      ))}

// books effect — lavender tinted
{effect === "books" && Array.from({ length: 8 }).map((_, i) => (
  <div key={i} style={{
    position: "absolute",
    left: `${Math.random() * 85}%`,
    top: `${Math.random() * 80}%`,
    fontSize: `${44 + Math.random() * 44}px`,
    opacity: 0.13,
    transform: `rotate(${Math.random() * 18 - 9}deg)`,
    animation: `bookFloat ${4 + Math.random() * 4}s ease-in-out infinite`,
    animationDelay: `${Math.random() * -6}s`,
  }}>{ i % 2 ? "📚" : "📖" }</div>
))}

// coffee effect — green matcha steam
{effect === "coffee" && Array.from({ length: 16 }).map((_, i) => (
  <div key={i} style={{
    position: "absolute",
    left: `${Math.random() * 100}%`,
    bottom: `${Math.random() * 45}%`,
    width: "3px",
    height: `${18 + Math.random() * 28}px`,
    borderRadius: "3px",
    background: `rgba(80,180,80,${0.25 + Math.random() * 0.2})`,
    animation: `floatUp ${1.4 + Math.random() * 2}s ease-out infinite`,
    animationDelay: `${Math.random() * 2.5}s`,
  }} />
))}

// 🌿 PLANTS — add sway animation
      {effect === "plants" && Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 95}%`,
          bottom: `${Math.random() * 80}%`,
          fontSize: `${30 + Math.random() * 30}px`,
          opacity: 0.06,
          animation: `plantSway ${3 + Math.random() * 4}s ease-in-out infinite`,
          animationDelay: `${Math.random() * -5}s`,
          transformOrigin: "bottom center",
        }}>🌿</div>
      ))}
    </div>
  );
};

export default BackgroundEffects;