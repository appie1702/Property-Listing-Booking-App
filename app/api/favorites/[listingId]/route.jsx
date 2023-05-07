import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from '../../../../app/libs/prismadb'

export async function POST(
    request,{params}
) {
    const currentuser = await getCurrentUser();

    if(!currentuser){
        return NextResponse.error();
    }
    console.log(params+'Ind routes')
    const {listingId} = params;

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Id")
    }

    let favoriteIds = [...(currentuser.favoritesIds || [])]
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
        where:{
            id: currentuser.id
        },
        data:{
            favoritesIds: favoriteIds
        }
    });

    return NextResponse.json(user);
}


export async function DELETE(
    request, {params}
){

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return NextResponse.error();
    }

    const {listingId} = params

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Id")
    }

    let favoriteIds = [...(currentuser.favoritesIds || [])]

    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
        where:{
            id: currentuser.id
        },
        data:{
            favoritesIds: favoriteIds
        }
    });

    return NextResponse.json(user);
}