import prisma from '../../app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListings(){
    try{
        const currentuser = await getCurrentUser();
        if(!currentuser){
            return []
        }

        const favorites = await prisma.listing.findMany({
            where:{
                id:{
                    in: [...(currentuser.favoritesIds || [])]
                }
            }
        });

        const safeFavorites = favorites.map((favorite)=>({
            ...favorite,
            createdAt: favorite.createdAt.toString()
        }))

        return safeFavorites

    }catch(error){
        throw new Error(error)
    }
}