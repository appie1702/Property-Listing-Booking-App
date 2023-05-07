"use client"

import React, { useCallback, useState } from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import ListingCard from '../components/listings/ListingCard'

const PropertiesClient = ({listings,currentuser}) => {
    
    const router = useRouter()
    const [deleteId, setdeleteId] = useState("")


    const onCancel = useCallback((id)=>{
        setdeleteId(id);
        axios.delete(`/api/listings/${id}`)
        .then(()=>{
            toast.success("Listing deleted")
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
            title="Properties"
            subtitle="List of your Properties"
        />
        <div className='mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {listings.map((listing)=>(
                <>
                {console.log(listing)}
                <ListingCard
                    
                    key={listing.id}
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deleteId===listing.id}
                    actionLable="Delete Listing"
                    currentUser={currentuser}
                />
                </>
            ))} 
        </div>
    </Container>
  )
}

export default PropertiesClient