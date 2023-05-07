"use client"


import React from 'react'

const ListingCategory = ({icon:Icon,label,desc}) => {
  return (
    <div className='flex flex-col gap-6'>
        <div className='flex flex-row items-center gap-4'>
            <Icon size={40} className="text-neutral-500"/>
            <div className='flex flex-col'>
                <div className='text-lg font-semibold'>
                    {label}
                </div>
                <div className='text-neutral-500 font-light'>
                    {desc}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListingCategory