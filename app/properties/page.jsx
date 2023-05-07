import EmptyState from '../components/Emptypage'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getListings from '../actions/getListings'
import PropertiesClient from './PropertiesClient'

const Page = async ()=>{

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


    const listings = await getListings({
        userId: currentuser.id
    });

    if(listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState
                    title='No Properties found'
                    subtitle="Looks like you have no Properties listed"
                />
        </ClientOnly>
        )
    }



    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentuser={currentuser}
            />
        </ClientOnly>
    )
}

export default Page