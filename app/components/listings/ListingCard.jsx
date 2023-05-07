"use client"

import React, { useCallback, useMemo } from 'react'
import {Listing, Reservation} from '@prisma/client';
import { useRouter } from 'next/navigation'
import useCountries from '../../../app/hooks/useCountries'
import {format} from 'date-fns'
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

const ListingCard = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLable,
  actionId="",
  currentUser
}) => {
  console.log(currentUser+'In ListingCard')
  const router = useRouter();
  const {getByValue} = useCountries();

  const location = getByValue(data.locationValue)

  
  const handleCancel = useCallback((e)=>{
    e.stopPropagation();

    if(disabled){
      return;
    }
    console.log(actionId+'inListingcard')
    onAction?.(actionId);

  },[onAction, actionId, disabled])
  

  const price = useMemo(()=>{
    if(reservation){
      return reservation.totalPrice
    }
    return data.price
  },[reservation, data.price])


  const reservationDate = useMemo(()=>{
    if(!reservation){
      return null
    }
    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start,'PP')} - ${format(end, 'PP')}`
  },[reservation])


  console.log(data)

  return (
    <div
      onClick={()=> router.push(`/listings/${data.id}`)}
      className=' col-span-1 cursor-pointer group:'
    >
      <div className='flex flex-col gap-2 w-full'>
        <div className=' aspect-square w-full relative overflow-hidden rounded-xl'>
          <Image
            width={500}
            height={500}
            alt='Listing'
            src={data.imageSrc}
            className=' object-cover h-full w-full group-hover:scale-110 transition'
          />
          <div
            className='absolute top-3 right-3'
          >
            <HeartButton
              listingId = {data.id}
              currentUser={currentUser}
            />
          </div>
        </div>

        <div className='font-semibold text-lg'>
          {location?.region}, {location?.label}
        </div>
        <div className='font-light text-neutral-500'>
          {reservationDate || data.category}
        </div>
        <div className='flex flex-row items-center gap-1'>
          <div className='font-semibold '>
            &#x20B9; {price}
          </div>
          {!reservation && (
            <div className='font-light'>night</div>
          )}
        </div>
        {onAction && actionLable && (
          <Button
            disabled={disabled}
            small
            label={actionLable}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  )
}

export default ListingCard