import prisma from './prismadb'

export async function getPatients(){
    try{
        const patients = await prisma.patient.findMany()
        return {patients}
    }catch(error){
        return {error}
    }
}

export async function createPatient(
    name: string, 
    age: string, 
    sex: string, 
    contact: string
  ) {
      try {
          const patient = await prisma.patient.create({
              data: {
                  name,
                  age,
                  sex,
                  contact,
              }
          });
          return { patient };
      } catch (error) {
          return { error };
      }
  }
  

  export async function deletePatient(id: string) {
    try {
      const patient = await prisma.patient.delete({
        where: { id },
      });
      return { patient };
    } catch (error) {
      return { error };
    }
  }
 
  
  export async function updatePatient(
    id: string,
    name: string,
    age: string,
    sex: string,
    contact: string
  ) {
    try {
      const patient = await prisma.patient.update({
        where: { id },
        data: {
          name,
          age,
          sex,
          contact,
        },
      });
      return { patient };
    } catch (error) {
      return { error };
    }
  }