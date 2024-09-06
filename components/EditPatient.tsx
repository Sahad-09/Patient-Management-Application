"use client";

import { useRef, useEffect, useState } from "react";
import { updatePatientAction } from "@/lib/actions";
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

export function EditPatientForm({ patient }) {
  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);
  const [sex, setSex] = useState(patient.sex);
  const [contact, setContact] = useState(patient.contact);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await updatePatientAction(patient.id, name, age, sex, contact);
    formRef.current?.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Edit Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogDescription>
            Edit patient details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 mb-5"
        >
          <Label>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-white"
            type="text"
            placeholder="Name"
          />
          <Label>Age</Label>
          <Input
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="text-white"
            type="text"
            placeholder="Age"
          />
          <Label>Sex</Label>
          <Input
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            className="text-white"
            type="text"
            placeholder="Sex"
          />
          <Label>Contact</Label>
          <Input
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="text-white"
            type="text"
            placeholder="Contact"
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
