import React,{useState} from 'react'
import { Link } from "react-router-dom";
import { Select, Option, Checkbox, Textarea, Input, Button } from "@material-tailwind/react";


const Header = () => {
  const getSubjectType = (e) => {
    console.log(e)
  
  }


  return (
    <div>
      <div className="flex space-x-96  bg-cyan-500  shadow-xl h-16">
        <div className="logo-container">
          <Link to="/">  <img className="w-20 p-5 bg-transparent" src="https://www.qmanagementinc.com/assets/q-models/img/logo-large-q-model.svg" alt="" /> </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className=" font-bolt text-xl">

              <Select variant="outlined" className="" value="" label="Select Subject type" onChange={(event) => {
                getSubjectType(event);
              }} >
                <Option value="maths">Maths</Option>
                <Option value="physics">Physics</Option>
                <Option value="english">English</Option>
              </Select>
            </li>
            <li className="px-4 font-bolt text-xl">
              <Link to="/qform">

                <Button variant="outlined" className="rounded-full">
                  +Add Questions
                </Button>

              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/*   <select className=" w-48 h-8 rounded-lg align-center cursor-pointer text-center">
                <option value="">Subjects</option>
                <option>Maths</option>
                <option>Physics</option>
                <option>English</option>
              </select>  */}
      {/*  <button className='w-48 h-8 bg-white rounded-lg shadow-lg'>+Add Questions</button> */}
    </div>
  )
}

export default Header
