import React from 'react'
import { useRef } from 'react';
import AddQuestion from './AddQuestion'
const Qform = () => {
  const pathname = window.location.pathname;
  return (
    <div>
      <AddQuestion />
    </div>
  )
}

export default Qform
