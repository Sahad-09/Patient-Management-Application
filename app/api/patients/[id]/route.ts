import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

// import { PrismaClient } from "@prisma/client/extension";

// const prisma = new PrismaClient()

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    const patient = await prisma.patient.findUnique({
      where: {
        id,
      },
    });

    if (!patient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(patient);
  } catch (err) {
    return NextResponse.json({ message: "GET Error", err }, { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();
    const { name, age, sex, contact } = body;

    const { id } = params;

    const updatePatient = await prisma.patient.update({
      where: {
        id,
      },
      data: {
        name,
        age,
        sex,
        contact,
      },
    });

    if (!updatePatient) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatePatient);
  } catch (err) {
    return NextResponse.json({ message: "Update Error", err }, { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { id } = params;

    await prisma.patient.delete({
      where: {
        id,
      },
    });

    return NextResponse.json("Patient has been deleted");
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
};
