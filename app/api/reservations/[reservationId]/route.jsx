import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";
import prisma from '../../../../app/libs/prismadb'


export async function DELETE(request,{params}){

    const currentuser = await getCurrentUser();
    console.log(params+'------------')
    if(!currentuser){
        return NextResponse.error();
    }

    const {reservationId} = params;
    console.log(reservationId+'-------==-----')

    if(!reservationId || typeof reservationId !== "string"){
        throw new Error('Invalid Id')
    }


    const reservation = await prisma.reservation.deleteMany({
        where:{
            id: reservationId,
            OR: [
                {
                    userId:currentuser.id
                },
                {
                    listing: {userId: currentuser.id}
                }
            ]
        }
    })

    console.log(reservationId,currentuser.id+'finalllll')

    return NextResponse.json(reservation);
}