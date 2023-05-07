import React from 'react'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import Emptypage from './components/Emptypage';
import getListings from './actions/getListings';
import ListingCard from './components/listings/ListingCard';
import getCurrentUser from './actions/getCurrentUser'

const page = async ({searchParams}) => {
  //searchParams will always be a object even its empty, and for getlistings, thatswhat we want.
  const listings = await getListings(searchParams);
  const currentuser = await getCurrentUser();
  if(listings.length === 0){
    return(
      <ClientOnly>
        <Emptypage showReset/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className='pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 overflow-y-hidden'>
          {listings?.map((listing)=>{
            return (
              <ListingCard
                currentUser={currentuser}
                key={listing.id}
                data={listing}
              />
            )
          })}
        </div>
      </Container>
    </ClientOnly>
  )
}

export default page