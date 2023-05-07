"use client"
import axios from 'axios'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Reservation } from '@prisma/client'
import { categories } from '../../components/navbar/Categories'
import Container from '../../components/Container'
import ListingHead from '../../components/listings/ListingHead'
import ListingInfo from '../../components/listings/ListingInfo'
import useLoginModal from '../../hooks/useLoginModal'
import { useRouter } from 'next/navigation'
import { differenceInCalendarDays, eachDayOfInterval } from 'date-fns'
import { toast } from 'react-hot-toast'
import ListingReservation from '../../components/listings/ListingReservation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}


const ListingClient = ({listing,reservations=[],currentuser}) => {

  const loginModal = useLoginModal();
  const router = useRouter();

  const disabledDates = useMemo(()=>{
    let dates = [];
    reservations.forEach((reservation)=>{
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });
      
      dates = [...dates,...range]
    });

    return dates
  },[reservations])


  const [isloading, setisloading] = useState(false)
  const [totalPrice, settotalPrice] = useState(listing.price)
  const [dateRange, setdateRange] = useState(initialDateRange)



  const onCreateReservation = useCallback(()=>{

    if(!currentuser){
      return loginModal.onOpen();
    }

    setisloading(true)
    
    axios.post('/api/reservations',{
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(()=>{
      toast.success("Listing reserved");
      setdateRange(initialDateRange);
      router.push('/trips')
    })
    .catch(()=>{
      toast.error("Something went wrong!")
    })
    .finally(()=>{
      setisloading(false);
    })

  },[totalPrice,dateRange,listing?.id,router,currentuser,loginModal]);


  useEffect(()=>{
    console.log(dateRange+'in useeffect')
    if(dateRange.startDate && dateRange.endDate){

      const dayCount = differenceInCalendarDays(
        dateRange.endDate,dateRange.startDate
      )
      console.log(dayCount+'in use')
      if(dayCount && listing.price){
        settotalPrice(dayCount * listing.price);
      } else{
        settotalPrice(listing.price);
      }
    }

},[dateRange, listing.price])


  const category = useMemo(()=>{
    return categories.find((item)=> item.label === listing.category)
  },[listing.category])

  return (
    <Container>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col gap-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentuser={currentuser}
          />
          <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
            
            <ListingInfo
              user={listing.user}
              category={category}
              desc={listing.desc}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className='order-first mb-10 md:order-last md:col-span-3'>
              <ListingReservation
                price={listing.price}
                dateRange={dateRange}
                totalPrice={totalPrice}
                onChangeDate={(value)=>setdateRange(value)}
                disabled={isloading}
                disabledDates={disabledDates}
                onSubmit={onCreateReservation}
              />
            </div>

          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient