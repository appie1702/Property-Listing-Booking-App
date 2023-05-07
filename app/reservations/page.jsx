import EmptyState from '../components/Emptypage'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'


import React from 'react'
import ReservationsClient from './ReservationsClient'

const Page = async () => {


    const currentuser = await getCurrentUser();

    if(!currentuser){
        return(
            <ClientOnly>
                <EmptyState
                    title='Unauthorized'
                    subtitle='Please login first'
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({
        authorId: currentuser.id
    })


    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                    title='No reservations found'
                    subtitle="Looks like you have no reservations on any of your properties yet :("
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentuser={currentuser}
            />
    </ClientOnly>
  )
}

export default Page