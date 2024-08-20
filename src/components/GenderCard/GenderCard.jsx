import React from "react";
import { Link } from "react-router-dom";
function GenderCard({ username, thumbnail, btntext }) {
  return (
    <div className="flex flex-col md:flex-row items-start">
      <div className="relative h-[400px] md:w-[400px] rounded-md mb-4 md:mb-0">
        <img
          src={thumbnail}
          alt="AirMax Pro"
          className="z-0 h-full w-full rounded-md object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        <div className="absolute bottom-4 left-4 text-left">
          <h1 className="text-2xl font-extrabold text-white ">{username}</h1>
          <Link
            to={btntext}
            className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-black bg-white px-4 py-2 rounded-full"
          >
            See Details →
          </Link>
        </div>
      </div>
    </div>
  );
}

function ThreeCardMWC() {
  // card api looping calling
  const users = [
    {
      id: 1,
      username: "MAN",
      btntext: "ManClothingCollection",
      thumbnail:
        "https://images.pexels.com/photos/6050430/pexels-photo-6050430.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 2,
      username: "WOMAN",
      btntext: "WomanClothingCollection",
      thumbnail:
        "https://images.pexels.com/photos/5418889/pexels-photo-5418889.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    },
    {
      id: 3,
      username: "KIDS",
      btntext: "KidsClothingCollection",
      thumbnail:
        "https://images.pexels.com/photos/1619815/pexels-photo-1619815.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];
  return (
    <div>
      <div className="flex flex-wrap justify-around my-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="sm:w:1/3 p-4 flex flex-wrap justify-around"
          >
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
