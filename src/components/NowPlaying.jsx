import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { X, MoreHorizontal, Heart } from "lucide-react";

const NowPlaying = () => {
  const { track } = useContext(PlayerContext);
  const currentTrack = track || {};

  return (
    <div className="w-[340px] h-full bg-[#121212] rounded-lg overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 sticky top-0 bg-[#121212] z-10">
        <h3 className="text-sm font-bold text-white">{currentTrack.name || "Now Playing"}</h3>
        <div className="flex items-center gap-2">
          <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="More options">
            <MoreHorizontal size={18} />
          </button>
          <button className="text-[#b3b3b3] hover:text-white transition-colors" aria-label="Close">
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Large Cover Art */}
      <div className="px-4 pb-4">
        {currentTrack.image && (
          <img
            src={currentTrack.image}
            alt={currentTrack.name}
            className="w-full aspect-square object-cover rounded-lg shadow-2xl"
          />
        )}
      </div>

      {/* Song Info */}
      <div className="px-4 pb-4 flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h4 className="text-lg font-bold text-white truncate">{currentTrack.name}</h4>
          <p className="text-sm text-[#b3b3b3] truncate">{(currentTrack.desc || "").slice(0, 30)}</p>
        </div>
        <button className="text-[#b3b3b3] hover:text-white transition-colors flex-shrink-0 ml-3" aria-label="Like">
          <Heart size={20} />
        </button>
      </div>

      {/* About the Artist */}
      <div className="px-4 pb-4">
        <div className="bg-[#1a1a1a] rounded-lg p-4">
          <h5 className="text-sm font-bold text-white mb-3">About the artist</h5>
          <div className="flex items-center gap-3 mb-3">
            {currentTrack.image && (
              <img
                src={currentTrack.image}
                alt="Artist"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}
            <div>
              <p className="text-sm font-bold text-white">Artist Name</p>
              <p className="text-xs text-[#b3b3b3]">2.4M monthly listeners</p>
            </div>
          </div>
          <p className="text-xs text-[#b3b3b3] leading-relaxed line-clamp-3">
            Captivating audiences worldwide with chart-topping hits and unforgettable live
            performances. Known for blending genres and pushing creative boundaries.
          </p>
        </div>
      </div>

      {/* Credits */}
      <div className="px-4 pb-6">
        <div className="bg-[#1a1a1a] rounded-lg p-4">
          <h5 className="text-sm font-bold text-white mb-2">Credits</h5>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-white">Main Artist</p>
              <p className="text-xs text-[#b3b3b3]">Main Artist</p>
            </div>
            <div>
              <p className="text-sm text-white">Producer</p>
              <p className="text-xs text-[#b3b3b3]">Producer</p>
            </div>
            <div>
              <p className="text-sm text-white">Writer</p>
              <p className="text-xs text-[#b3b3b3]">Songwriter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NowPlaying;
