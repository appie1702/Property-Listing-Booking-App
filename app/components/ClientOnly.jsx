"use client"


import React, { useEffect, useState } from 'react'

const ClientOnly = ({children}) => {

    //we do this to protect the website from errors
    //when server side rendering will be done,
    // the children of this component will be rendered 
    const [isMounted, setisMounted] = useState(false)
    
    useEffect(()=>{
        setisMounted(true)
    },[])

    if(!isMounted){
        return null
    }

  return (
    <div>{children}</div>
  )
}

export default ClientOnly