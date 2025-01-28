import React from 'react'

const MinecraftModal = ({children}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center z-50'>
        {/* Modal overlay */}
        <div className='z-30 fixed h-screen w-screen flex justify-center items-center bg-black opacity-70'/>

        {/*  */}
        <div className='z-50 w-[60%] h-[490px] bg-[#D9D9D9] flex justify-center items-center p-6 rounded-lg border-4 border-black shadow'>
            <div className="w-full h-full bg-minecraft-abyss bg-secondary-light text-black p-6 rounded-lg border border-[#1c1c1c] shadow-craftingBoard">
                {children}
            </div>
        </div>
    </div>

  )
}

export default MinecraftModal
