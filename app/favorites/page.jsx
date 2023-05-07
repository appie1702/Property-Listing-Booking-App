import React from 'react'
import EmptyState from '../components/Emptypage'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getFavoriteListings from '../actions/getFavoriteListings'
import FavoritesClient from './FavoritesClient'


const page = async () => {

    const listings = await getFavoriteListings();
    const currentuser = await getCurrentUser();

    if(listings.length===0){
        return (
            <ClientOnly>
                <EmptyState
                    title='No favorites found'
                    subtitle='Looks like you have no favorite listings'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <FavoritesClient
            listings={listings}
            currentuser={currentuser}
        />
    </ClientOnly>
  )
}

export default page