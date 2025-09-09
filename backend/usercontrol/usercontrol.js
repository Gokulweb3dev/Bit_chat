import User from "../userModel/usermodel.js"
import jwt from "jsonwebtoken";
import cloudinary from "../files/cloud.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    console.log(fullName, email, password, bio);
    if (!fullName || !email || !password || !bio) {
      return res.json({ success: false, message: "Missing Details", fullName, email, password, bio  });
    }
    const user = await User.findOne({ email });

    if (user) {
      return res.json({ success: false, message: "Account already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newuser = await User.create({ fullName, email, password: hashedPassword, bio });
    
    const token = jwt.sign(
         { id: newuser._id }, 
        process.env.JWT_SECRET,                         
        { expiresIn: process.env.JWT_EXPIRES });

        res.json({success:true, userData:newuser, token, message:"Your Bitchat accound created successfull"})
  } catch (error) {
        console.log(error.message);
        res.json({success:false, message:error.message, fullName})

  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(password, userData.password);

    if (!isPasswordCorrect) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

     const token = jwt.sign(
         { id: userData._id}, 
        process.env.JWT_SECRET,                         
        { expiresIn: process.emv.JWT_EXPIRES });

        res.json({success:true, userData:userData, token, message:"login successfull"})
  } catch (error) {
            console.log(error.message);
        res.json({success:false, message:error.message})
  }
}

export const updateProfile = async (req, res) => {
  try {
    console.log("update profile called");
    const { profilePic, bio, fullName } = req.body;
    const userId = req.user._id;
    let updatedUser;

    if (!profilePic) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { bio, fullName },
        { new: true }
      );
    } else {
      const upload = await cloudinary.uploader.upload(profilePic);

      updatedUser = await User.findByIdAndUpdate(
        userId,
        { profilePic: upload.secure_url, bio, fullName },
        { new: true }
      );
    }
    res.json({success:true, user:updatedUser})
  } catch (error) {
                console.log(error.message);
        res.json({success:false, message:error.message})

  }
}

