'use client'

import React from 'react'
import { Toaster } from 'react-hot-toast'


//we have to make these providers rather than just using toaster
//like modules in next 13 because they are not made for next but react
//and they might include uesEffect or useState in there code,
//so it is necessary to make these providers with "use client" to top
//to let the module function properly.
const ToasterProvider = () => {
  return (
    <Toaster/>
  )
}

export default ToasterProvider