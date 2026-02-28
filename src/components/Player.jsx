import React, { useContext, useCallback, useRef, useState, useEffect } from "react";
import { PlayerContext } from "../context/PlayerContext";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Volume1,
  VolumeX,
  ListMusic,
  Mic2,
  MonitorSpeaker,
  Maximize2,
  Plus,
} from "lucide-react";
import { songsData } from "../assets/assets";

const formatTime = (minutes, seconds) => {
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

const Player = () => {
  const {
    track,
    playStatus,
    play,
    pause,
    time,
    audioRef,
    playWithId,
  } = useContext(PlayerContext);

  const [volume, setVolume] = useState(80);
  const [prevVolume, setPrevVolume] = useState(80);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);

  const currentTrack = track || {};

  // Calculate progress percentage
  const totalSeconds = time.totalTime.minute * 60 + time.totalTime.second;
  const currentSeconds = time.currentTime.minute * 60 + time.currentTime.second;
  const progress = totalSeconds > 0 ? (currentSeconds / totalSeconds) * 100 : 0;

  const handleProgressChange = useCallback(
    (e) => {
      const audio = audioRef.current;
      if (!audio || isNaN(audio.duration)) return;
      const value = parseFloat(e.target.value);
      audio.currentTime = (value / 100) * audio.duration;
    },
    [audioRef]
  );

  const handleVolumeChange = useCallback(
    (e) => {
      const val = parseInt(e.target.value);
      setVolume(val);
      if (audioRef.current) {
        audioRef.current.volume = val / 100;
      }
    },
    [audioRef]
  );

  const toggleMute = useCallback(() => {
    if (volume > 0) {
      setPrevVolume(volume);
      setVolume(0);
      if (audioRef.current) audioRef.current.volume = 0;
    } else {
      setVolume(prevVolume);
      if (audioRef.current) audioRef.current.volume = prevVolume / 100;
    }
  }, [volume, prevVolume, audioRef]);

  const handleNext = useCallback(() => {
    const nextId = currentTrack.id < songsData.length - 1 ? currentTrack.id + 1 : 0;
    playWithId(nextId);
  }, [currentTrack.id, playWithId]);

  const handlePrev = useCallback(() => {
    const prevId = currentTrack.id > 0 ? currentTrack.id - 1 : songsData.length - 1;
    playWithId(prevId);
  }, [currentTrack.id, playWithId]);

  // Set initial volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, []);

  const VolumeIcon = volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div className="h-[72px] bg-black flex items-center justify-between px-4 select-none">
      {/* Left: Now Playing */}
      <div className="flex items-center gap-3 w-[30%] min-w-[180px]">
        {currentTrack.image && (
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-14 h-14 rounded object-cover"
          />
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-white truncate hover:underline cursor-pointer">
            {currentTrack.name}
          </p>
          <p className="text-xs text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer">
            {(currentTrack.desc || "").slice(0, 20)}
          </p>
        </div>
        <button className="text-[#b3b3b3] hover:text-white transition-colors ml-2 flex-shrink-0" aria-label="Save to library">
          <Plus size={16} />
        </button>
      </div>

      {/* Center: Controls + Progress */}
      <div className="flex flex-col items-center gap-1 flex-1 max-w-[722px]">
        {/* Transport Controls */}
        <div className="flex items-center gap-4">
          <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Shuffle">
            <Shuffle size={18} />
          </button>
          <button onClick={handlePrev} className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Previous">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={playStatus ? pause : play}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-black hover:scale-110 transition-transform"
            aria-label={playStatus ? "Pause" : "Play"}
          >
            {playStatus ? <Pause size={16} fill="black" /> : <Play size={16} fill="black" className="ml-0.5" />}
          </button>
          <button onClick={handleNext} className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Next">
            <SkipForward size={20} fill="currentColor" />
          </button>
          <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Repeat">
            <Repeat size={18} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full progress-bar">
          <span className="text-xs text-[#b3b3b3] tabular-nums w-10 text-right">
            {formatTime(time.currentTime.minute, time.currentTime.second)}
          </span>
          <div className="relative flex-1 h-1 group" ref={progressRef}>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-1 cursor-pointer z-10 opacity-0"
              aria-label="Track progress"
            />
            <div className="absolute inset-0 h-1 rounded-full bg-[#4d4d4d]">
              <div
                className="h-full rounded-full bg-white group-hover:bg-[#1DB954] transition-colors"
                style={{ width: `${progress}%` }}
              />
            </div>
            {/* Thumb indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              style={{ left: `calc(${progress}% - 6px)` }}
            />
          </div>
          <span className="text-xs text-[#b3b3b3] tabular-nums w-10">
            {formatTime(time.totalTime.minute, time.totalTime.second)}
          </span>
        </div>
      </div>

      {/* Right: Extra Controls */}
      <div className="flex items-center gap-3 w-[30%] justify-end">
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block" aria-label="Now playing view">
          <ListMusic size={18} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block" aria-label="Lyrics">
          <Mic2 size={18} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block" aria-label="Queue">
          <ListMusic size={18} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block" aria-label="Connect to device">
          <MonitorSpeaker size={18} />
        </button>

        {/* Volume */}
        <div className="flex items-center gap-2 hidden lg:flex">
          <button
            onClick={toggleMute}
            className="text-[#b3b3b3] hover:text-white transition-colors"
            aria-label={volume === 0 ? "Unmute" : "Mute"}
          >
            <VolumeIcon size={18} />
          </button>
          <div className="relative w-24 h-1 group progress-bar" ref={volumeRef}>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="absolute inset-0 w-full h-1 cursor-pointer z-10 opacity-0"
              aria-label="Volume"
            />
            <div className="absolute inset-0 h-1 rounded-full bg-[#4d4d4d]">
              <div
                className="h-full rounded-full bg-white group-hover:bg-[#1DB954] transition-colors"
                style={{ width: `${volume}%` }}
              />
            </div>
            <div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
              style={{ left: `calc(${volume}% - 6px)` }}
            />
          </div>
        </div>

        <button className="text-[#b3b3b3] hover:text-white transition-colors hidden lg:block" aria-label="Full screen">
          <Maximize2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default Player;
