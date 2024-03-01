import React from 'react'
import { Link } from "react-router-dom";
import { Select, Option, Checkbox, Textarea, Input, Button } from "@material-tailwind/react";

const Header = () => {
  return (
    <div>
      <div className="flex space-x-96  bg-cyan-500  shadow-xl h-16">
        <div className="logo-container">
          <Link to="/">  <img className="w-20 p-5 bg-transparent" src="https://www.qmanagementinc.com/assets/q-models/img/logo-large-q-model.svg" alt="" /> </Link>
        </div>
        <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className=" font-bolt text-xl">
             {/*   <select className=" w-48 h-8 rounded-lg align-center cursor-pointer text-center">
                <option value="">Subjects</option>
                <option>Maths</option>
                <option>Physics</option>
                <option>English</option>
              </select>  */}
              <Select variant="outlined" className="" value=""  label="Select Subject type" >
                <Option value="Maths">Maths</Option>
                <Option value="Physics">Physics</Option>
                <Option value="English">English</Option>
              </Select>
            </li>
            <li className="px-4 font-bolt text-xl">
              <Link to="/qform">
               {/*  <button className='w-48 h-8 bg-white rounded-lg shadow-lg'>+Add Questions</button> */}
                <Button variant="outlined" className="rounded-full">
                  +Add Questions
                </Button>

              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}

export default Header
