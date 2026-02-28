import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Search, Library, Plus, ArrowRight, Music4 } from "lucide-react";
import { albumsData, songsData } from "../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");

  const libraryItems = [
    ...albumsData.map((a) => ({
      id: `album-${a.id}`,
      title: a.name,
      subtitle: `Playlist`,
      image: a.image,
      type: "playlist",
      route: `/album/${a.id}`,
    })),
    { id: "liked", title: "Liked Songs", subtitle: "Playlist - 120 songs", image: null, type: "playlist", route: "/" },
    { id: "artist-1", title: "The Weeknd", subtitle: "Artist", image: songsData[0]?.image, type: "artist", route: "/" },
    { id: "artist-2", title: "Drake", subtitle: "Artist", image: songsData[1]?.image, type: "artist", route: "/" },
  ];

  const filteredItems =
    activeFilter === "all"
      ? libraryItems
      : libraryItems.filter((item) =>
          activeFilter === "playlists" ? item.type === "playlist" : item.type === "artist"
        );

  return (
    <div className="w-[420px] flex-shrink-0 flex flex-col gap-2 h-full" role="navigation" aria-label="Main Sidebar">
      {/* Top: Home & Search */}
      <div className="bg-[#121212] rounded-lg px-3 py-2">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-5 px-3 py-3 w-full text-[#b3b3b3] hover:text-white transition-colors rounded-md"
          aria-label="Home"
        >
          <Home size={26} strokeWidth={2.5} className="flex-shrink-0" />
          <span className="font-bold text-base">Home</span>
        </button>
        <button
          className="flex items-center gap-5 px-3 py-3 w-full text-[#b3b3b3] hover:text-white transition-colors rounded-md"
          aria-label="Search"
        >
          <Search size={26} strokeWidth={2.5} className="flex-shrink-0" />
          <span className="font-bold text-base">Search</span>
        </button>
      </div>

      {/* Bottom: Library */}
      <div className="bg-[#121212] rounded-lg flex-1 flex flex-col overflow-hidden">
        {/* Library Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <button className="flex items-center gap-3 text-[#b3b3b3] hover:text-white transition-colors">
            <Library size={26} strokeWidth={2.5} />
            <span className="font-bold text-base">Your Library</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] transition-all"
              aria-label="Create playlist or folder"
            >
              <Plus size={20} />
            </button>
            <button
              className="w-8 h-8 flex items-center justify-center rounded-full text-[#b3b3b3] hover:text-white hover:bg-[#1a1a1a] transition-all"
              aria-label="Show more"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-4 pb-2">
          {[
            { key: "all", label: "All" },
            { key: "playlists", label: "Playlists" },
            { key: "artist", label: "Artists" },
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.key
                  ? "bg-white text-black"
                  : "bg-[#232323] text-white hover:bg-[#2a2a2a]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Scrollable Library Items */}
        <div className="flex-1 overflow-y-auto px-2 pb-2">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-[#1a1a1a] transition-colors text-left group"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-12 h-12 object-cover flex-shrink-0 ${
                    item.type === "artist" ? "rounded-full" : "rounded"
                  }`}
                />
              ) : (
                <div className="w-12 h-12 rounded bg-gradient-to-br from-[#450af5] to-[#8e8ee5] flex items-center justify-center flex-shrink-0">
                  <Music4 size={18} className="text-white" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate group-hover:text-white">
                  {item.title}
                </p>
                <p className="text-xs text-[#b3b3b3] truncate">{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
