"use client";

import { useRef, useState } from "react";
import { updatePatientAction } from "@/lib/actions";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Patient } from "@/types";

interface EditPatientProps {
  patient: Patient;
  onClose: () => void;
}

const EditPatient: React.FC<EditPatientProps> = ({ patient, onClose }) => {
  const [name, setName] = useState(patient.name);
  const [age, setAge] = useState(patient.age);
  const [sex, setSex] = useState(patient.sex);
  const [contact, setContact] = useState(patient.contact);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    await updatePatientAction(patient.id, name, age, sex, contact);
    formRef.current?.reset();
    onClose();
  }

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="transparentBottom">Edit</Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-[425px]">
          <SheetHeader>
            <SheetTitle>Edit Patient</SheetTitle>
            <SheetDescription>
              Edit patient details here. Click save when you&apos;re done.
            </SheetDescription>
          </SheetHeader>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 mb-5"
          >
            <Label className=" mt-4">Name</Label>
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
            <SheetFooter className="flex justify-between mt-5">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onClose();
                }}
              >
                Cancel
              </Button>
              <SheetClose asChild>
                <Button type="submit" variant="addPatient">
                  Save Changes
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EditPatient;
