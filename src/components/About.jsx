
import React from "react";
import AnimeGirl from "./AnimeGirl";

const About = ({ t }) => {
  const features = [
    {
      title: "Study Together",
      text: "Create a room, invite your friends, and study together in one shared space.",
    },
    {
      title: "Real-Time Chat",
      text: "Stay connected with your study partners through simple real-time room chat.",
    },
    {
      title: "Shared Goals",
      text: "Create study goals and keep everyone on the same page as you work toward them.",
    },
    {
      title: "Word Library",
      text: "Save interesting words and their meanings while building your personal vocabulary collection.",
    },
    {
      title: "Quotes & Inspiration",
      text: "Keep meaningful quotes close by and add a little inspiration to your study space.",
    },
    {
      title: "Study Atmosphere",
      text: "Choose a shared room theme and create an environment that feels comfortable and focused.",
    },
  ];

  return (
    <div
      className="page"
      style={{
        padding: "88px 28px 50px",
        maxWidth: 760,
        margin: "0 auto",
      }}
    >
      {/* =====================================================
          INTRO
          ===================================================== */}

      <div
        style={{
          textAlign: "center",
          marginBottom: 42,
        }}
      >
        <div
          style={{
            fontSize: 48,
            marginBottom: 10,
            animation: "bounce 3s ease infinite",
          }}
        >
          ✦
        </div>

        <div
          className="hand"
          style={{
            fontSize: 40,
            color: t.green,
            marginBottom: 8,
          }}
        >
          About Digital Space
        </div>

        <p
          style={{
            fontSize: 14,
            color: t.textMuted,
            lineHeight: 1.9,
            maxWidth: 600,
            margin: "0 auto",
          }}
        >
          A cozy collaborative study space designed to make studying
          together feel a little calmer, more focused, and more enjoyable.
        </p>
      </div>

      {/* =====================================================
          WHAT IS DIGITAL SPACE?
          ===================================================== */}

      <div
        className="card card-h"
        style={{
          padding: "24px 28px",
          marginBottom: 18,
        }}
      >
        <div
          className="hand"
          style={{
            fontSize: 23,
            color: t.green,
            marginBottom: 9,
          }}
        >
          What is Digital Space?
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.text,
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          Digital Space is a shared online room for studying, planning,
          chatting, and staying motivated with others. Instead of using
          separate tools for goals, conversations, notes, and inspiration,
          everything lives together in one calm study environment.
        </p>
      </div>

      {/* =====================================================
          WHY IT EXISTS
          ===================================================== */}

      <div
        className="card card-h"
        style={{
          padding: "24px 28px",
          marginBottom: 28,
        }}
      >
        <div
          className="hand"
          style={{
            fontSize: 23,
            color: t.green,
            marginBottom: 9,
          }}
        >
          Why Digital Space?
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.text,
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          Studying does not always have to mean working alone. Digital Space
          was created around a simple idea: having a quiet place where you
          can see your friends studying, share small goals, exchange ideas,
          and still have your own focused workspace.
        </p>
      </div>

      {/* =====================================================
          FEATURES
          ===================================================== */}

      <div style={{ marginBottom: 30 }}>
        <div
          className="hand"
          style={{
            fontSize: 26,
            color: t.green,
            textAlign: "center",
            marginBottom: 18,
          }}
        >
          What You Can Do
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: 14,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card card-h"
              style={{
                padding: "20px",
              }}
            >
              <div
                className="hand"
                style={{
                  fontSize: 19,
                  color: t.green,
                  marginBottom: 7,
                }}
              >
                {feature.title}
              </div>

              <p
                style={{
                  fontSize: 12.5,
                  color: t.textMuted,
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* =====================================================
          ABOUT THE CREATOR
          ===================================================== */}

      <div
        className="card card-h"
        style={{
          padding: "26px 28px",
          marginBottom: 28,
        }}
      >
        <div
          className="hand"
          style={{
            fontSize: 24,
            color: t.green,
            marginBottom: 9,
          }}
        >
          About the Creator
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.text,
            lineHeight: 1.9,
            margin: 0,
          }}
        >
          Hi, I'm Alweena, a Computer Science graduate and software
          developer who enjoys building applications that combine technology
          with thoughtful user experiences.
        </p>

        <p
          style={{
            fontSize: 13,
            color: t.text,
            lineHeight: 1.9,
            margin: "10px 0 0",
          }}
        >
          Digital Space started as an idea for making study sessions feel
          less isolated and more peaceful. I built it as a full-stack
          project while exploring React, Spring Boot, MySQL, WebSockets,
          and AI integration.
        </p>
      </div>

      {/* =====================================================
          DESIGN PHILOSOPHY
          ===================================================== */}

      <div
        className="card"
        style={{
          padding: 28,
          marginTop: 10,
          textAlign: "center",
          background: t.cardBg,
        }}
      >
        <AnimeGirl size={90} />

        <div
          className="hand"
          style={{
            fontSize: 25,
            color: t.green,
            marginTop: 10,
          }}
        >
          Built for calm productivity
        </div>

        <p
          style={{
            fontSize: 13,
            color: t.textMuted,
            marginTop: 7,
            lineHeight: 1.8,
            maxWidth: 540,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          No pressure to be productive every second. Just a comfortable
          little space to show up, focus on what matters, and make progress
          together.
        </p>

        <div
          style={{
            marginTop: 18,
            fontSize: 12,
            color: t.textMuted,
          }}
        >
          Made with care for better study sessions.
        </div>
      </div>
    </div>
  );
};

export default About;

