import React from 'react'
import getListingById from '../../../app/actions/getListingById'
import EmptyState from '../../../app/components/ClientOnly'
import ClientOnly from '../../../app/components/ClientOnly'
import ListingClient from './ListingClient'
import getCurrentUser from '../../../app/actions/getCurrentUser'
import getReservations from '../../actions/getReservations'

const page = async ({params}) => {
  console.log(params);
  const listing = await getListingById(params);
  const currentuser = await getCurrentUser();
  const reservations = await getReservations(params);
  if(!listing) {
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentuser={currentuser}
      />
    </ClientOnly>
  )
}

export default page