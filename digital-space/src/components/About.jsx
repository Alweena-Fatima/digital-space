import React from "react";
import AnimeGirl from "./AnimeGirl";

const About = ({ t }) => (
  <div className="page" style={{ padding: "88px 28px 40px", maxWidth: 680, margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <div style={{ fontSize: 54, marginBottom: 11, animation: "bounce 3s ease infinite" }}>✨</div>
      <div className="hand" style={{ fontSize: 40, color: t.green, marginBottom: 7 }}>
        Digital Space
      </div>
      <p style={{ fontSize: 14, color: t.textMuted, lineHeight: 1.8 }}>
        A cozy corner of the internet for focused study, gentle productivity, and calm minds.
      </p>
    </div>

    {[
      {
        t: "🌱 The Inspiration",
        c: "Born from late-night study sessions, lo-fi playlists, and the desire for a digital space that feels like a warm hug. Where productivity meets peace.",
      },
      {
        t: "🎯 The Purpose",
        c: "Digital Space isn't about hustle culture. It's about gentle focus, deep work in a calm environment, and building a vocabulary of beautiful words.",
      },
      {
        t: "🌸 For the Dreamers",
        c: "For students, night owls, readers, journal writers, and anyone who finds focus in cozy atmospheres. This space is yours.",
      },
    ].map((item, i) => (
      <div key={i} className="card card-h" style={{ padding: "22px 26px", marginBottom: 14 }}>
        <div className="hand" style={{ fontSize: 21, color: t.green, marginBottom: 7 }}>{item.t}</div>
        <p style={{ fontSize: 13, color: t.text, lineHeight: 1.8 }}>{item.c}</p>
      </div>
    ))}

    <div
      className="card"
      style={{
        padding: 26,
        marginTop: 22,
        textAlign: "center",
        background: t.cardBg,
      }}
    >
      <AnimeGirl size={90} />
      <div className="hand" style={{ fontSize: 26, color: t.green, marginTop: 10 }}>Made with 💚</div>
      <p style={{ fontSize: 13, color: t.textMuted, marginTop: 5, lineHeight: 1.7 }}>
        Designed for dreamers, studiers & cozy souls everywhere~<br />
        May your focus be deep and your tea stay warm. ☕
      </p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 18 }}>
        {["🌸 GitHub", "✉️ Contact", "🌿 Twitter"].map((l) => (
          <button key={l} className="btn-o" style={{ padding: "7px 14px", fontSize: 12 }}>{l}</button>
        ))}
      </div>
    </div>
  </div>
);

export default About;
