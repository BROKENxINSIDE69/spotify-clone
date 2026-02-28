import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { Play, Shuffle, Heart, MoreHorizontal, Clock3 } from "lucide-react";

const DisplayAlbum = () => {
  const { id } = useParams();
  const albumData = albumsData[Number(id)];
  const { playWithId, track, playStatus } = useContext(PlayerContext);

  if (!albumData) {
    return (
      <div className="p-10 text-center text-[#b3b3b3] text-xl">
        Album not found.
      </div>
    );
  }

  return (
    <div className="pb-8">
      {/* Hero Section */}
      <div className="flex items-end gap-6 px-6 pb-6 pt-2">
        <img
          src={albumData.image}
          alt={albumData.name}
          className="w-[232px] h-[232px] object-cover rounded shadow-2xl shadow-black/50"
        />
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-white">Playlist</span>
          <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black text-white leading-none tracking-tight">
            {albumData.name}
          </h1>
          <p className="text-sm text-[#b3b3b3] mt-2">{albumData.desc}</p>
          <div className="flex items-center gap-1 mt-1 text-sm text-white">
            <img
              src={assets.spotify_logo}
              alt="Spotify"
              className="w-6 h-6 inline-block"
            />
            <span className="font-bold ml-1">Spotify</span>
            <span className="text-[#b3b3b3] mx-1">{"  -  "}</span>
            <span className="text-[#b3b3b3]">{"1,323,154 likes"}</span>
            <span className="text-[#b3b3b3] mx-1">{"  -  "}</span>
            <span className="text-[#b3b3b3]">
              <strong className="text-white">50 songs,</strong> about 2 hr 30 min
            </span>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="flex items-center gap-6 px-6 py-4">
        <button
          onClick={() => playWithId(0)}
          className="w-14 h-14 rounded-full bg-[#1DB954] flex items-center justify-center hover:scale-105 hover:bg-[#1ed760] transition-all shadow-lg"
          aria-label="Play"
        >
          <Play size={24} fill="black" stroke="black" />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Shuffle">
          <Shuffle size={24} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Like">
          <Heart size={24} />
        </button>
        <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="More options">
          <MoreHorizontal size={24} />
        </button>
      </div>

      {/* Track List Header */}
      <div className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(80px,1fr)] gap-4 px-6 py-2 text-[#b3b3b3] text-sm font-medium border-b border-[#ffffff1a] mx-6">
        <span className="text-right">#</span>
        <span>Title</span>
        <span>Album</span>
        <span className="hidden sm:block">Date Added</span>
        <span className="flex justify-end">
          <Clock3 size={16} />
        </span>
      </div>

      {/* Track List */}
      <div className="px-6 mt-2">
        {songsData.map((item, index) => {
          const isPlaying = track.id === item.id && playStatus;

          return (
            <div
              key={item.id}
              onClick={() => playWithId(item.id)}
              className="grid grid-cols-[16px_4fr_3fr_2fr_minmax(80px,1fr)] gap-4 px-0 py-2 rounded-md items-center group cursor-pointer hover:bg-[#2a2a2a] transition-colors"
              role="button"
              tabIndex={0}
              aria-label={`Play ${item.name}`}
            >
              {/* Track Number / Play Icon */}
              <span className="text-right text-sm text-[#b3b3b3] tabular-nums">
                <span className="group-hover:hidden">{isPlaying ? <Play size={14} className="text-[#1DB954] inline" fill="#1DB954" /> : index + 1}</span>
                <span className="hidden group-hover:inline">
                  <Play size={14} className="text-white inline" fill="white" />
                </span>
              </span>

              {/* Title with small cover */}
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded flex-shrink-0 object-cover"
                />
                <div className="min-w-0">
                  <p className={`text-sm font-medium truncate ${isPlaying ? "text-[#1DB954]" : "text-white"}`}>
                    {item.name}
                  </p>
                  <p className="text-xs text-[#b3b3b3] truncate">{item.desc.slice(0, 30)}</p>
                </div>
              </div>

              {/* Album */}
              <span className="text-sm text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer transition-colors">
                {albumData.name}
              </span>

              {/* Date Added */}
              <span className="text-sm text-[#b3b3b3] hidden sm:block">5 days ago</span>

              {/* Duration */}
              <span className="text-sm text-[#b3b3b3] text-right tabular-nums">{item.duration}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayAlbum;
