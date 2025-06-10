import React from "react";
import { Link } from "react-router-dom";
import { Gender } from "../Home_Products_Api_Data/Home_Products_Api_Data";

function GenderCard({ username, thumbnail, btntext }) {
  return (
    <div className="relative h-[300px] xs:h-[320px] sm:h-[350px] md:h-[380px] lg:h-[400px] rounded-md mb-4 overflow-hidden group">
      <img
        src={thumbnail}
        alt={username}
        className="absolute inset-0 h-full w-full object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent"></div>
      <div className="absolute bottom-4 left-4 text-left">
        <h1 className="text-xl xs:text-2xl font-bold text-white">{username}</h1>
        <Link
          to={btntext}
          className="mt-2 inline-flex items-center text-xs xs:text-sm font-medium text-black bg-white px-3 xs:px-4 py-1.5 xs:py-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          See Details →
        </Link>
      </div>
    </div>
  );
}

function ThreeCardMWC() {
  const users = Gender;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 py-6">
        {users.map((user) => (
          <div key={user.id} className="w-full">
            <GenderCard
              id={user.id}
              username={user.username}
              thumbnail={user.thumbnail}
              btntext={user.btntext}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ThreeCardMWC;
