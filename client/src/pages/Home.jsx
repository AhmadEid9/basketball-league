import React from 'react'
import { Toaster } from 'sonner'
import darkTheme from "../themes/dark.js";

const Home = () => {
  return (
    <div className='h-screen flex flex-col items-center pt-6'>
      <Toaster position="top-right"/>
    </div>
  )
}

export default Home