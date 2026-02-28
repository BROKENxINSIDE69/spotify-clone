import React, { useContext, useEffect, memo } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import NowPlaying from "./components/NowPlaying";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.src = track.file;
    audio.load();
  }, [track, audioRef]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (!audioRef.current) return;
      const audio = audioRef.current;

      if (e.code === "Space" && e.target.tagName !== "INPUT" && e.target.tagName !== "BUTTON") {
        e.preventDefault();
        audio.paused ? audio.play() : audio.pause();
      }
      if (e.code === "ArrowRight" && e.altKey) {
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
      }
      if (e.code === "ArrowLeft" && e.altKey) {
        audio.currentTime = Math.max(0, audio.currentTime - 5);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [audioRef]);

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden">
      {/* Main 3-panel area */}
      <div className="flex-1 flex gap-2 p-2 overflow-hidden">
        {/* Left Sidebar - hidden on mobile */}
        <div className="hidden lg:block flex-shrink-0">
          <Sidebar />
        </div>

        {/* Center: Main View */}
        <Display />

        {/* Right: Now Playing View - hidden on medium and below */}
        <div className="hidden xl:block flex-shrink-0">
          <NowPlaying />
        </div>
      </div>

      {/* Bottom Player Bar */}
      <Player />

      {/* Hidden audio element */}
      <audio ref={audioRef} src={track.file} preload="auto" />
    </div>
  );
};

export default memo(App);
