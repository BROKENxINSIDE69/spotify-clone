import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { Play } from "lucide-react";

const SongItem = ({ name, image, desc, id }) => {
  const { playWithId } = useContext(PlayerContext);

  return (
    <div
      onClick={() => playWithId(id)}
      className="p-3 rounded-md bg-[#181818] hover:bg-[#282828] transition-all duration-300 cursor-pointer group"
      role="button"
      tabIndex={0}
      aria-label={`Play ${name}`}
    >
      {/* Cover Art with Play Button */}
      <div className="relative mb-4">
        <img
          src={image}
          alt={`${name} cover art`}
          className="w-full aspect-square object-cover rounded-md shadow-lg"
          loading="lazy"
        />
        {/* Green Play Button - slides up on hover */}
        <button
          className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-[#1DB954] flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-[#1ed760]"
          aria-label={`Play ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            playWithId(id);
          }}
        >
          <Play size={20} fill="black" stroke="black" />
        </button>
      </div>

      {/* Text */}
      <p className="font-bold text-sm text-white truncate">{name}</p>
      <p className="text-xs text-[#b3b3b3] mt-1 line-clamp-2 leading-relaxed">{desc}</p>
    </div>
  );
};

export default SongItem;
