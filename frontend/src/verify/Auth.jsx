import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {io}  from "socket.io-client";



const backendUrl = import.meta.env.VITE_VITEBACKURL;

axios.defaults.baseURL = backendUrl;



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

const [token, setToken] = useState(localStorage.getItem("token"));
const [authUser, setAuthUser] = useState(null);
const [onlineUsers, setOnlineUsers] = useState([]);
const [socket, setSocket] = useState(null);

// Check if user is authenticated and if so, set the user data and connect the socket
const checkAuth = async () => {
  try {
    const { data } = await axios.get("/bitchat/auth/check");
    if (data.success) {
      setAuthUser(data.user);
      connectsocket(data.user);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "An error occurred");
  }
}
//login
const login = async (state, credentials) => {
  try {
    const { data } = await axios.post(`/bitchat/auth/${state}`, credentials);
    if (data.success) {
      setAuthUser(data.userData);
      connectsocket(data.userData);
      axios.defaults.headers.common["token"] = data.token;
      setToken(data.token);
      localStorage.setItem("token", data.token);
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "An error occurred");
  }
}
//logout
const logout = async () => {
  localStorage.removeItem("token");
  setToken(null);
  setAuthUser(null);
  setOnlineUsers([]);
  axios.defaults.headers.common["token"] = null;
  toast.success("Logged out successfully");
  socket.disconnect();
}

//update
const updateProfile = async (body) => {
  try {
    const { data } = await axios.put("/bitchat/auth/update-profile", body);
    if (data.success) {
      setAuthUser(data.user);
      toast.success("Profile updated successfully");
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "An error occurred");
  }
}











//connect socket
const connectsocket =(userData)=>{
    if(!userData || socket?.connected) return;
    const newsocket= io(backendUrl, {
        query:{
            userId: userData._id,
        }
    });
    newsocket.connect();
    setSocket(newsocket);

    newsocket.on("getOnlineUsers", (userIds)=>{
        setOnlineUsers(userIds);
    })
}

useEffect(()=>{
    if(token){
        axios.defaults.headers.common["token"]=token;
    }
    checkAuth();


},[])

  const value = {
    axios,
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile

  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
