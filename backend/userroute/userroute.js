import express from "express";
import {login, signup, updateProfile } from "../usercontrol/usercontrol.js";
import { routecheck,authcheck } from "../middleware/middleware.js";

const userRouter = express.Router();

userRouter.post("/Signup", signup);
userRouter.post("/login", login);
userRouter.put("/update-profile", routecheck, updateProfile);
userRouter.get("/check", routecheck, authcheck);
userRouter.get("/ch", (req, res) => {
  res.send("hello");
});


export default userRouter;
