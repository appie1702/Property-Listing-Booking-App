"use client"

import React from 'react'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import useFavorite from '../hooks/useFavorites'


const HeartButton = ({listingId, currentUser}) => {
    console.log(currentUser+'In heartbutton')
    const {favorited, toggleFavorite} = useFavorite({listingId, currentUser})
  
    return (
    <div 
        onClick={toggleFavorite}
        className='relative hover:opacity-80 transition'
    >
        <AiOutlineHeart
            size={28}
            className=" fill-white absolute -top-[2px] -right-[2px]"
        />
        <AiFillHeart
            size={24}
            className={favorited ? 'fill-rose-500' : ' fill-neutra-500/70'}
        />
    </div>
  )
}

export default HeartButton