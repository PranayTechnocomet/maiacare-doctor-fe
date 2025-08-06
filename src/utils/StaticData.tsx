import { Patient, PhysicalAssessmentData } from "./types/interfaces";

export const tableResponse: Patient[] = [
  {
    id: 1,
    name: "Meera Joshi",
    mobile: "9092038491",
    email: "----",
    pincode: "400072",
    treatment: "Fertility Support +2",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Kapoor",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pincode: "400072",
    treatment: "IVF",
    status: "Deactivated",
  },
  // ...add more rows
];


export const MedicalHistoryData = {
    id_medical_history:1,
    medical_medications:"true",
    medical_surgeries:"false",
    medical_medical_condition:["PCOS", "Thyroid Disorder","Peanut Allergy","Lactose Intolerant"],
    medical_family_medical_history:["Mother had endometriosis","Father had thyroid"],
    medical_lifestyle:["Non-smoker","Occasional alcohol","Vegetarian diet"],
    medical_exercise:"never",
    medical_stress_level:"low",
      
}
export const physicalAssessmentData: PhysicalAssessmentData[] = [
  {
    date: "Wed, 19 Feb 2024",
    height: "5'4''(162cm)",
    weight: "58 kg",
    bmi: "22.1(Normal)",
    bloodGroup: "O+",
    bloodPressure: "120 mmHg",
    heartRate: "72 bpm",
  },
  {
    date: "mon, 22 Feb 2024",
    height: "5'4''(162cm)",
    weight: "58 kg",
    bmi: "22.1(Normal)",
    bloodGroup: "O+",
    bloodPressure: "120 mmHg",
    heartRate: "72 bpm",
  },
];
