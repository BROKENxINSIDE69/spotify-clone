import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Bell, ExternalLink, User } from "lucide-react";

const Navbar = ({ scrolled }) => {
  const navigate = useNavigate();

  return (
    <header
      className={`sticky top-0 z-30 flex items-center justify-between px-6 py-3 transition-colors duration-300 rounded-t-lg ${
        scrolled ? "bg-[#121212]/95 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      {/* Left: Nav arrows */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors disabled:opacity-40"
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90 transition-colors disabled:opacity-40"
          aria-label="Go forward"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="px-4 py-1.5 text-sm font-bold bg-white text-black rounded-full hover:scale-105 hover:bg-gray-100 transition-all hidden md:block">
          Explore Premium
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold bg-black/60 text-white rounded-full hover:bg-black/80 hover:scale-105 transition-all">
          <ExternalLink size={16} />
          <span className="hidden sm:inline">Install App</span>
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full text-[#b3b3b3] hover:text-white transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1ed760] text-black font-bold text-sm hover:scale-105 transition-transform"
          aria-label="User profile"
        >
          <User size={16} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
