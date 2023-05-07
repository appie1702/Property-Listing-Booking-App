import EmptyState from '../components/Emptypage'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'

const Trips = async ()=>{

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return (
        <ClientOnly>
            <EmptyState
                title='Unauthorized'
                subtitle='Please login first'
            />
        </ClientOnly>
        )
    }


    const reservations = await getReservations({
        userId: currentuser.id
    });

    if(reservations.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                    title='No trips found'
                    subtitle="Looks like you haven't reserved any trip."
                />
        </ClientOnly>
        )
    }



    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentuser={currentuser}
            />
        </ClientOnly>
    )
}

export default Trips