"use client";

import { createPatientAction } from "@/lib/actions";
import { useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function NewPatientForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function actionTo(data: FormData) {
    const name = data.get("name");
    const age = data.get("age");
    const sex = data.get("sex");
    const contact = data.get("contact");

    if (!name || typeof name !== "string") return;
    if (!age || typeof age !== "string") return;
    if (!sex || typeof sex !== "string") return;
    if (!contact || typeof contact !== "string") return;

    // call a server action to create patient
    await createPatientAction(name, age, sex, contact);

    // reset form
    formRef.current?.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="addPatient">Add Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Patient</DialogTitle>
          <DialogDescription>
            Add patient here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          action={actionTo}
          className="flex flex-col gap-5 mb-5"
        >
          <Label>Name</Label>
          <Input
            className="text-white"
            type="text"
            name="name"
            placeholder="Name"
          />
          <Label>Age</Label>
          <Input
            className="text-white"
            type="text"
            name="age"
            placeholder="Age"
          />
          <Label>Sex</Label>
          <Input
            className="text-white"
            type="text"
            name="sex"
            placeholder="Sex"
          />
          <Label>Contact</Label>
          <Input
            className="text-white"
            type="text"
            name="contact"
            placeholder="Contact"
          />
          <Button type="submit">Add Patient</Button>
        </form>

        {/* <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
