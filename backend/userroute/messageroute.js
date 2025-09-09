import express from "express";
import { routecheck,authcheck } from "../middleware/middleware.js";
import { getMessages,getUsersForSidebar, markMessageAsSeen, sendMessage } from "../usercontrol/messagecontrol.js";


const messageRouter = express.Router();

messageRouter.get("/users", routecheck, getUsersForSidebar);
messageRouter.get("/:id", routecheck, getMessages);
messageRouter.put("mark/:id", routecheck, markMessageAsSeen);
messageRouter.put("/send/:id", routecheck, sendMessage);


export default messageRouter;