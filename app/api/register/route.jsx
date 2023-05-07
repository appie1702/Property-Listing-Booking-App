import bcrypt from 'bcrypt'
import prisma from '../../libs/prismadb'
import {NextResponse} from 'next/server'

export async function POST(request){
    const body = await request.json();
    const {email,name,password} = body;
    const hashedPassword = await bcrypt.hash(password,12)

    const finduser = await prisma.user.findUnique({
        where:{
            email: email
        }
    })


    if(finduser){
        throw new Error("This user already exists")
    }


    const user = await prisma.user.create({
        data:{
            name,email,hashedPassword
        }
    });


    return NextResponse.json(user);
}