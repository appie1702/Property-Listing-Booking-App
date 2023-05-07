"use client"

import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

const TripsClient = ({reservations,currentuser}) => {
    

    const router = useRouter();
    const [deleteId, setdeleteId] = useState("")


    const onCancel = useCallback((id)=>{
        setdeleteId(id);
        axios.delete(`/api/reservations/${id}`)
        .then(()=>{
            toast.success("Reservation cancelled")
            router.refresh();
        })
        .catch((error)=>{
            toast.error("Oops! Something went wrong, Try again later.")
        })
        .finally(()=>{
            setdeleteId("");
        })
    },[router])


    return (
    <Container>
        <Heading
            title="Trips"
            subtitle="Where you have been and where you are going"
        />
        <div className='mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {reservations.map((reservation)=>(
                <ListingCard
                    key={reservation.id}
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deleteId===reservation.id}
                    actionLable="Cancel Reservation"
                    currentUser={currentuser}
                
                />
            ))} 
        </div>
    </Container>
  )
}

export default TripsClient