// types.d.ts

export interface Details {
  id: string;
  chiefComplaint: string | null;
  existingDisease: string | null;
  signAndSymptoms: string | null;
  examinationDetails: string | null;
  labInvestigation: string | null;
  xRaysOrMRs: string | null;
  finalDiagnosis: string | null;
  treatmentPresented: string | null;
  followUp: string | null;
  // Add other fields if necessary
}


export interface Patient {
  id: string;
  name: string;
  age: string;
  sex: string;
  contact: string;
  dateTime: Date;
  Details?: PatientDetails;
}
