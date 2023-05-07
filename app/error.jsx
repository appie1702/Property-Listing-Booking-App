"use client"

import { useEffect } from "react"
import EmptyPage from './components/Emptypage'
import React from 'react'

const error = ({error}) => {

    useEffect(()=>{
        console.log(error)
    },[error])

  return (
    <EmptyPage
        title="Oops!"
        subtitle="Something went wrong:( Please Try again later"
    />
  )
}

export default error