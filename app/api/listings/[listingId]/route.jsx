import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from '../../../../app/libs/prismadb'


export async function DELETE(
    request, {params}
){
    const currentuser=getCurrentUser();

    if(!currentuser){
        return NextResponse.error();
    }

    const {listingId} = params

    if(!listingId || typeof listingId !== 'string'){
        throw new Error("Invalid Id")
    }

    const listing = await prisma.listing.deleteMany({
        where:{
            id:listingId,
            userId: currentuser.id
        }
    })


    return NextResponse.json(listing)

}