import { createContext, useRef, useState, useCallback } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);

  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const updateTime = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || audio.duration === 0 || isNaN(audio.duration)) return;

    setTime({
      currentTime: {
        second: Math.floor(audio.currentTime % 60),
        minute: Math.floor(audio.currentTime / 60),
      },
      totalTime: {
        second: Math.floor(audio.duration % 60),
        minute: Math.floor(audio.duration / 60),
      },
    });
  }, []);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => setPlayStatus(true)).catch(() => {});
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlayStatus(false);
  }, []);

  const playWithId = useCallback(
    (id) => {
      const audio = audioRef.current;
      if (!audio) return;

      const newTrack = songsData[id];
      if (!newTrack) return;

      setTrack(newTrack);
      audio.src = newTrack.file;
      audio.load();
      audio.play().then(() => setPlayStatus(true)).catch(() => {});
    },
    []
  );

  const previous = useCallback(() => {
    if (track.id > 0) playWithId(track.id - 1);
    else playWithId(songsData.length - 1);
  }, [track.id, playWithId]);

  const next = useCallback(() => {
    if (track.id < songsData.length - 1) playWithId(track.id + 1);
    else playWithId(0);
  }, [track.id, playWithId]);

  // Setup audio event listeners
  if (audioRef.current) {
    audioRef.current.ontimeupdate = updateTime;
    audioRef.current.onloadedmetadata = updateTime;
  }

  const contextValue = {
    audioRef,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
