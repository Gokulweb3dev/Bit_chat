import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import assets, {messagesDummyData} from '../assets/assets'
import { AuthContext } from '../verify/Auth';

const Profilepage = () => {
const { authUser, updateProfile } = useContext(AuthContext);


  const [selectedimg, setseletedimg]=useState(null);
  const navigate =useNavigate();
  const [name,setname]=useState(authUser?.fullName || "BitChat User");
  const [bio, setbio]=useState(authUser?.bio ||"I'm avilable in Bitchat")

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!selectedimg){ 
      await updateProfile({fullName:name,bio});
          navigate('/');
          return;
    }
    const render=new FileReader();
    render.readAsDataURL(selectedimg);
    render.onload=async()=>{
      const base64img=render.result;
      await updateProfile({fullName:name,bio,profilePic:base64img});
      navigate('/');
    }

  };
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='w-5/6 max-w-2xl text-white border-2 border-gray-400 flex items-center justify-between rounded-lg'>
        <form onSubmit={handleSubmit}  className='flex flex-col gap-5 p-10 flex-1'>
         <h3 className="text-xl">Profile details</h3>
<label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer">
  <input
    onChange={(e) => setseletedimg(e.target.files[0])}
    type="file"
    id="avatar"
    accept=".png, .jpg, .jpeg"
    hidden
  />
  <img
    src={selectedimg ? URL.createObjectURL(selectedimg) : assets.avatar_icon}
    alt=""
    className={`w-12 h-12 ${selectedimg && 'rounded-full'}`}
  />
  upload profile image
</label>
<input
  onChange={(e) => setname(e.target.value)}
  value={name}
  type="text"
  required
  placeholder="Your name"
  className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
/>

<textarea
  onChange={(e) => setbio(e.target.value)}
  value={bio}
  placeholder="Write profile bio"
  required
  className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
  rows={4}
/>

<button
  type="submit"
  className="bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded-full text-lg cursor-pointer button"
>
  Save
</button>


        </form>
        <img
  className={`max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ${selectedimg && 'rounded-full'}`}
  src={authUser?.profilePic || assets.avatar_icon}
  alt=""
/>

      </div>
    </div>
  )
}

export default Profilepage