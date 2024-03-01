import React from 'react'
import Header from './Header.js'
import { Outlet } from "react-router-dom";
const Body = () => {
  return (
    <div>
      <Header />
     
      <Outlet />
    </div>
  )
}

export default Body
