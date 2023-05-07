"use client"

import React from 'react'
import Image from 'next/image'

const Avatar = ({src}) => {
  return (
    <Image
        className='rounded-full'
        height="30"
        width="30"
        alt='avatar'
        src={src || "/images/placeholder.jpg"}
    />
  )
}

export default Avatar