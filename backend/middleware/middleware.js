import User from "../userModel/usermodel.js";

import jwt from "jsonwebtoken";

export const routecheck = async (req, res, next) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user)
      return res.json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message})

  }
}
 
export const authcheck= (req,res)=>{
    res.json({success: true, user:req.user});
}