"use client";

import { createPatientAction } from "@/lib/actions";
import { useRef, useState } from "react";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Define the Zod schema for validation
const patientSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .regex(/^\d+$/, "Age must be a number"),
  sex: z.string().min(1, { message: "Sex is required" }),
  contact: z
    .string()
    .min(10, { message: "Contact number is required of 10 digits" })
    .max(10, { message: "Contact number is required of 10 digits" })
    .regex(/^\d+$/, "Contact must be a number"),
});

interface NewPatientFormProps {
  userId: string;
}

export function NewPatientForm({ userId }: NewPatientFormProps) {
  const now = new Date();
  const formattedDateTime = now.toLocaleString();
  const formRef = useRef<HTMLFormElement>(null);
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    age?: string;
    sex?: string;
    contact?: string;
  }>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog open/close

  async function actionTo(data: FormData) {
    const name = data.get("name");
    const age = data.get("age");
    const sex = data.get("sex");
    const contact = data.get("contact");

    // Create an object from form data to validate with Zod
    const formData = { name, age, sex, contact };

    // Zod validation
    const result = patientSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        if (error.path[0] in formData) {
          fieldErrors[error.path[0] as string] = error.message;
        }
      });
      setFormErrors(fieldErrors);
      return;
    }

    // If validation passes, clear errors and proceed
    setFormErrors({});

    // Call a server action to create patient
    await createPatientAction(
      name as string,
      age as string,
      sex as string,
      contact as string,
      userId as string
    );

    // Reset form and close the dialog
    formRef.current?.reset();
    setIsDialogOpen(false);

    // Show toast with the date and time
    toast(`Patient added on ${formattedDateTime}`, {
      description: "The patient was added successfully.",
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="addPatient" onClick={() => setIsDialogOpen(true)}>
          New Patient
        </Button>
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
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(formRef.current as HTMLFormElement);
            actionTo(formData);
          }}
          className="flex flex-col gap-5 mb-5"
        >
          <Label>Name</Label>
          <Input
            className="text-white"
            type="text"
            name="name"
            placeholder="Pavel Durov"
          />
          {formErrors.name && <p className="text-red-500">{formErrors.name}</p>}

          <Label>Age</Label>
          <Input
            className="text-white"
            type="text"
            name="age"
            placeholder="30"
          />
          {formErrors.age && <p className="text-red-500">{formErrors.age}</p>}

          <Label>Sex</Label>
          <Select name="sex">
            <SelectTrigger className="bg-gray-800 text-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          {formErrors.sex && <p className="text-red-500">{formErrors.sex}</p>}

          <Label>Contact</Label>
          <Input
            className="text-white"
            type="text"
            name="contact"
            placeholder="6363024288"
          />
          {formErrors.contact && (
            <p className="text-red-500">{formErrors.contact}</p>
          )}

          <div className="flex gap-4 mt-5">
            <Button type="submit" variant="addPatient">
              Add Patient
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
