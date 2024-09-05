import prisma from './prismadb'

export async function getPatients(){
    try{
        const patients = await prisma.patient.findMany()
        return {patients}
    }catch(error){
        return {error}
    }
}