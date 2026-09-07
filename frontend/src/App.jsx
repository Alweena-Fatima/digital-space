import { useState, useEffect } from "react";
import { getTheme } from "./theme";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Themes from "./components/Themes";
import Study from "./components/Study";
import Library from "./components/Library";
import About from "./components/About";
import BackgroundEffects from "./BackgroundEffects";

export default function App() {
  const [screen, setScreen] = useState("landing");

  const [page, setPage] = useState(
    localStorage.getItem("digitalSpacePage") || "home"
  );

  const [nick, setNick] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [memberId, setMemberId] = useState(null);
  const [roomCode, setRoomCode] = useState("");
  const [themeKey, setThemeKey] = useState("default");

  const [run, setRun] = useState(false);
  const [words, setWords] = useState([]);

  const [quotes, setQuotes] = useState([
    {
      id: 1,
      text: "The secret of getting ahead is getting started.",
      author: "Mark Twain",
    },
  ]);

  const t = getTheme(themeKey);

  // ---------------------------------------
  // RESTORE ROOM AFTER PAGE REFRESH
  // ---------------------------------------
  useEffect(() => {
    const savedNick = localStorage.getItem("digitalSpaceNick");
    const savedDisplayName = localStorage.getItem(
      "digitalSpaceDisplayName"
    );
    const savedRoom = localStorage.getItem("digitalSpaceRoom");
    const savedMemberId = localStorage.getItem(
      "digitalSpaceMemberId"
    );
    const savedPage = localStorage.getItem("digitalSpacePage");

    console.log("Restoring saved room:", {
      savedNick,
      savedDisplayName,
      savedRoom,
      savedMemberId,
      savedPage,
    });

    if (savedNick && savedRoom && savedMemberId) {
      // Restore frontend state
      setNick(savedNick);
      setDisplayName(savedDisplayName || savedNick);
      setRoomCode(savedRoom);
      setMemberId(Number(savedMemberId));

      if (savedPage) {
        setPage(savedPage);
      }

      // Get latest room information from backend
      fetch(`http://localhost:8080/api/rooms/${savedRoom}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Room not found");
          }

          return response.json();
        })
        .then((roomData) => {
          console.log("Restored room:", roomData);

          setThemeKey(roomData.theme.toLowerCase());
          setScreen("app");
        })
        .catch((error) => {
          console.error("Error restoring room:", error);

          // Do NOT clear localStorage here.
          // A temporary backend/network error should not log the user out.
        });
    }
  }, []);

  // ---------------------------------------
  // JOIN ROOM
  // ---------------------------------------
  const enter = async (n, displayName, c) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/rooms/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roomCode: c,
            nickname: n,
            displayName: displayName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to join room");
      }

      const data = await response.json();

      console.log("Joined room:", data);

      // Get room details after joining
      const roomResponse = await fetch(
        `http://localhost:8080/api/rooms/${c}`
      );

      if (!roomResponse.ok) {
        throw new Error("Failed to fetch room");
      }

      const roomData = await roomResponse.json();

      console.log("Room details:", roomData);

      // ---------------------------------------
      // UPDATE REACT STATE
      // ---------------------------------------

      setNick(data.nickname);
      setDisplayName(data.displayName);
      setMemberId(data.id);
      setRoomCode(c);
      setThemeKey(roomData.theme.toLowerCase());

      // ---------------------------------------
      // SAVE ROOM SESSION
      // ---------------------------------------

      localStorage.setItem(
        "digitalSpaceMemberId",
        data.id
      );

      localStorage.setItem(
        "digitalSpaceNick",
        data.nickname
      );

      localStorage.setItem(
        "digitalSpaceDisplayName",
        data.displayName
      );

      localStorage.setItem(
        "digitalSpaceRoom",
        c
      );

      console.log("Room session saved.");

      setScreen("app");

    } catch (error) {
      console.error("Join room error:", error);

      alert(
        "Could not join room. Please check the room code."
      );
    }
  };
  const handleLeaveRoom = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/rooms/${roomCode}/members/${memberId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to leave room");
      }

      // Clear saved room session
      localStorage.removeItem("digitalSpaceMemberId");
      localStorage.removeItem("digitalSpaceNick");
      localStorage.removeItem("digitalSpaceDisplayName");
      localStorage.removeItem("digitalSpaceRoom");
      localStorage.removeItem("digitalSpacePage");

      // Reset React state
      setMemberId(null);
      setNick("");
      setDisplayName("");
      setRoomCode("");
      setPage("home");
      setThemeKey("default");

      // Go back to landing page
      setScreen("landing");

    } catch (error) {
      console.error("Leave room error:", error);
      alert("Could not leave the room. Please try again.");
    }
  };
  return (
    <>
      <GlobalStyles t={t} />

      {screen === "landing" ? (
        <Landing
          onEnter={enter}
          t={t}
        />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            background: t.pageBg,
            transition: "background 0.6s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          <BackgroundEffects effect={t.bgEffect} />

          <Navbar
            page={page}
            setPage={(newPage) => {
              setPage(newPage);

              localStorage.setItem(
                "digitalSpacePage",
                newPage
              );
            }}
            nick={displayName}
            t={t}
          />

          {/* HOME */}
          <div
            style={{
              display: page === "home" ? "block" : "none",
            }}
          >
            <Home
              nick={displayName}
              roomCode={roomCode}
              words={words}
              setWords={setWords}
              quotes={quotes}
              setQuotes={setQuotes}
              t={t}
              run={run}
              setRun={setRun}
            />
          </div>

          {/* THEMES */}
          <div
            style={{
              display: page === "themes" ? "block" : "none",
            }}
          >
            <Themes
              roomCode={roomCode}
              sel={themeKey}
              setSel={setThemeKey}
              t={t}
            />
          </div>

          {/* STUDY */}
          <div
            style={{
              display: page === "study" ? "block" : "none",
            }}
          >
            <Study
              nick={nick}
              displayName={displayName}
              memberId={memberId}
              roomCode={roomCode}
              onLeaveRoom={handleLeaveRoom}
              t={t}
            />
          </div>

          {/* LIBRARY */}
          <div
            style={{
              display: page === "library" ? "block" : "none",
            }}
          >
            <Library
              roomCode={roomCode}
              words={words}
              setWords={setWords}
              quotes={quotes}
              setQuotes={setQuotes}
              t={t}
            />
          </div>

          {/* ABOUT */}
          <div
            style={{
              display: page === "about" ? "block" : "none",
            }}
          >
            <About t={t} />
          </div>
        </div>
      )}
    </>
  );
}