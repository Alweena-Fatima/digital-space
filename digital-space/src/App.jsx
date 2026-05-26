import { useState } from "react";
import { getTheme } from "./theme";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Themes from "./components/Themes";
import Study from "./components/Study";
import Library from "./components/Library";
import About from "./components/About";

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [page, setPage] = useState("home");
  const [nick, setNick] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [themeKey, setThemeKey] = useState("default");
  const [run, setRun] = useState(false);
  const [words, setWords] = useState([]);
  const [quotes, setQuotes] = useState([
    { id: 1, text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  ]);

  const t = getTheme(themeKey);

  const enter = (n, c) => {
    setNick(n);
    setRoomCode(c);
    setScreen("app");
  };

  return (
    <>
      <GlobalStyles t={t} />

      {screen === "landing" ? (
        <Landing onEnter={enter} t={t} />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            background: t.pageBg,
            transition: "background 0.6s ease",
          }}
        >
          <Navbar page={page} setPage={setPage} nick={nick} t={t} />

          <div style={{ display: page === "home" ? "block" : "none" }}>
            <Home
              nick={nick}
              words={words}
              setWords={setWords}
              quotes={quotes}
              setQuotes={setQuotes}
              t={t}
              run={run}
              setRun={setRun}
            />
          </div>
          <div style={{ display: page === "themes" ? "block" : "none" }}>
            <Themes sel={themeKey} setSel={setThemeKey} t={t} />
          </div>
          <div style={{ display: page === "study" ? "block" : "none" }}>
            <Study nick={nick} roomCode={roomCode} t={t} />
          </div>
          <div style={{ display: page === "library" ? "block" : "none" }}>
            <Library words={words} setWords={setWords} quotes={quotes} setQuotes={setQuotes} t={t} />
          </div>
          <div style={{ display: page === "about" ? "block" : "none" }}>
            <About t={t} />
          </div>
        </div>
      )}
    </>
  );
}
