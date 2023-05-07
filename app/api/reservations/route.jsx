import {NextResponse} from 'next/server'

import prisma from '../../../app/libs/prismadb'
import getCurrentUser from '../../../app/actions/getCurrentUser'
import { list } from 'postcss';


export async function POST(request){

    const currentuser = await getCurrentUser();

    if(!currentuser){
        return NextResponse.error()
    }

    const body = await request.json();

    const {
        listingId,
        startDate,
        endDate,
        totalPrice
    } = body;


    if(!listingId || !startDate || !endDate || !totalPrice){
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where:{
            id:listingId
        },
        data:{
            reservations:{
                //creating new reservation with automatic relation 
                //building with that particular listing
                create:{
                    userId: currentuser.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    })

    return NextResponse.json(listingAndReservation);
}