"use client"

import React from 'react'
import useCountries from '../../../app/hooks/useCountries'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'
import dynamic from 'next/dynamic'

const Map = dynamic(()=>import('../Map'),{
    ssr:false
});


const ListingInfo = ({
    user,
    category,
    desc,
    roomCount,
    guestCount,
    bathroomCount,
    locationValue,
}) => {


    const {getByValue} = useCountries();
    const coordi = getByValue(locationValue)?.latlng
  return (
    <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
            <div className='text-xl font-semibold flex flex-row items-center gap-2'>
                <div>Hosted by {user?.name}</div>
                <Avatar src={user?.image}/>
            </div>
            <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
                <div>{guestCount} guests</div>
                <div>{roomCount} rooms</div>
                <div>{bathroomCount} bathrooms</div>
            </div>
        </div>
        <hr/>
        {category && (
            <ListingCategory
                icon={category.icon}
                label={category.label}
                desc={category.description}
            />
        )}
        <hr/>
        <div className='text-lg font-light text-neutral-500'>
            {desc}
        </div>
        <hr/>
        <Map center={coordi}/>
    </div>  
  )
}

export default ListingInfo