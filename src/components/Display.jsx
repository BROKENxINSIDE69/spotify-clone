import React, { useRef, useState, useCallback } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";

const Display = () => {
  const displayRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  const albumData = albumId !== "" ? albumsData[Number(albumId)] : null;
  const bgColor = albumData ? albumData.bgColor : null;

  const handleScroll = useCallback((e) => {
    setScrolled(e.target.scrollTop > 40);
  }, []);

  return (
    <div
      ref={displayRef}
      onScroll={handleScroll}
      className="flex-1 rounded-lg overflow-y-auto relative"
      style={{
        background:
          isAlbum && bgColor
            ? `linear-gradient(180deg, ${bgColor} 0%, #121212 340px)`
            : "#121212",
      }}
    >
      <Navbar scrolled={scrolled} />
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
