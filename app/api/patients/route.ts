import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, age, sex, contact } = body;

    const newPatient = await prisma.patient.create({
      data: {
        name,
        age,
        sex,
        contact,
      },
    });

    return NextResponse.json(newPatient);
  } catch (err) {
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: {
        dateTime: "desc",
      },
    });

    return NextResponse.json(patients);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};
