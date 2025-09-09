import React, { useState } from 'react'
import Sidedbar from '../component/Sidedbar'
import Chatcontainer from '../component/Chatcontainer'
import Rightsidebar from '../component/Rightsidebar'

const Homepage = () => {
    const [selectedUser, setselecteduser]= useState(false)
  return (
    <div className='w-full h-screen sm:px-[5%] sm:py-[2%]'>
        <div className={`sm:border-2 sm:border-gray-600 overflow-hidden sm:rounded-2xl h-[100%] grid grid-cols-1 relative
            ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' : 'md:grid-cols-2'}`} >
            <Sidedbar selectedUser={selectedUser} setSelectedUser={setselecteduser}/>
            <Chatcontainer selectedUser={selectedUser} setSelectedUser={setselecteduser}/>
            <Rightsidebar selectedUser={selectedUser} setSelectedUser={setselecteduser}/>
        </div>

    </div>
  )
}

export default Homepage   