import React from "react";
import { albumsData, songsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import SongItem from "./SongItem";

const DisplayHome = () => {
  return (
    <main className="px-6 pb-8">
      {/* Category Filters */}
      <div className="flex items-center gap-2 mb-6">
        <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-white text-black">
          All
        </button>
        <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#232323] text-white hover:bg-[#2a2a2a] transition-colors">
          Music
        </button>
        <button className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#232323] text-white hover:bg-[#2a2a2a] transition-colors">
          Podcasts
        </button>
      </div>

      {/* Featured Charts */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">Featured Charts</h2>
          <button className="text-sm font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {albumsData.map((item) => (
            <AlbumItem
              key={item.id}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </section>

      {/* Today's Biggest Hits */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{"Today's biggest hits"}</h2>
          <button className="text-sm font-bold text-[#b3b3b3] hover:text-white hover:underline transition-colors">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {songsData.map((item) => (
            <SongItem
              key={item.id}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default DisplayHome;
