import React, { useContext } from "react";
import assets, { userDummyData, imagesDummyData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../verify/Auth.jsx';

const Sidedbar = ({ selectedUser, setSelectedUser }) => {

  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div
  className={`bg-[#8185B2]/10 h-full w-full relative   overflow-y-scroll text-white ${
    selectedUser ? "max-md:hidden" : ""
  }`}
>
  {/* Header - fixed on top */}
  <div className="sticky top-0  bg-[#212226]   p-4 z-10">
    <div className="flex justify-between items-center">
      <div className="flex items-center w-40 pt-5 gap-1">
        <img src={assets.logo} alt="logo" className="w-7 h-7" />
        <span className="text-lg font-bold">BitChat</span>
      </div>

      <div className="relative py-2 group">
        <img
          src={assets.menu_icon}
          alt="Menu"
          className="max-h-5 cursor-pointer"
        />
        <div className="absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-gray-900 border border-gray-200 text-gray-100 hidden group-hover:block">
          <p
            onClick={() => navigate("/profile")}
            className="cursor-pointer text-sm"
          >
            Edit Profile
          </p>
          <hr className="my-2 border-t border-gray-500" />
          <p onClick={()=>logout()} className="cursor-pointer text-sm">Logout</p>
        </div>
      </div>
    </div>

    <div className="bg-[#e4e1ee] rounded-full flex items-center gap-2 py-3 px-4 mt-5">
      <img src={assets.search_icon} alt="Search" className="w-3" />
      <input
        type="text"
        className="bg-transparent border-none outline-none text-[#3c3b3b] text-xs placeholder-[#3c3b3b] flex-1"
        placeholder="Search User..."
      />
    </div>
  </div>

  {/* Scrollable user list */}
  <div className="flex flex-col mt-1">
    {userDummyData.map((user, index) => (
      <div
        onClick={() =>{setSelectedUser(user), console.log(selectedUser)}}

        key={index}
        className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
          ${selectedUser?._id === user._id && "bg-[#2e2f2f]/50"}`}
      >
        <img
          src={user.profilePic || assets.avatar_icon}
          alt=""
          className="w-[35px] aspect-[1/1] rounded-full"
        />
        <div className="flex flex-col leading-5">
          <p>{user.fullName}</p>
          {index < 3 ? (
            <span className="text-green-400 text-xs">Online</span>
          ) : (
            <span className="text-neutral-400 text-xs">Offline</span>
          )}
        </div>
        {index > 2 && (
          <p className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-green-400/80">
            {index}
          </p>
        )}
      </div>
    ))}
  </div>
</div>

  );
};

export default Sidedbar;
