import { PrismaClient } from "@prisma/client";

//assigned the PrismaClient to a global variable client to avoid hot reloading and creation of 
//Prismaclient again and again.
const client = globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV !== "production" ) globalThis.prisma = client

export default client