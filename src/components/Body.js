import React from 'react'
import Header from './Header.js'
import { Outlet } from "react-router-dom";
import GetAllQuestions from './GetAllQuestions';
import { useLocation } from 'react-router-dom';

const Body = () => {

  const location = useLocation().pathname;
  console.log(location)
  return (
    <div>
      <Header />
         {location==='/' && <GetAllQuestions /> }
      <Outlet />
   
    </div>
  )
}

export default Body
