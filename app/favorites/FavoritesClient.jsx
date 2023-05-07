import React from 'react'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import ListingCard from '../components/listings/ListingCard'

const FavoritesClient = ({listings,currentuser}) => {
  return (
    <Container>
        <Heading
            title="Favorites"
            subtitle="Your favorite places to visit!"
        />
        <div className='mt-10 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
            {listings.map((listing)=>(
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentuser}
                />
            ))} 
        </div>
    </Container>
  )
}

export default FavoritesClient