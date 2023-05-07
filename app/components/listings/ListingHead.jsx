"use client"

import React from 'react'
import useCountries from '../../../app/hooks/useCountries'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

const ListingHead = ({title, locationValue, imageSrc, id, currentuser}) => {
    const {getByValue} = useCountries();
    const location = getByValue(locationValue)


 
    return (
    <>
        <Heading
            title={title}
            subtitle={`${location?.region}, ${location?.label}`}
        />
        <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
            <Image
                src={imageSrc}
                alt="Image"
                fill
                className=' object-cover w-full'
            />
            <div className='absolute top-5 right-5 cursor-pointer'>
                <HeartButton
                    listingId={id}
                    currentUser={currentuser}
                />
            </div>
        </div>
    </>
  )
}

export default ListingHead