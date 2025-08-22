import { Patient, PhysicalAssessmentData } from "./types/interfaces";
import dummyPdfImg from "../assets/images/dummy-pdf-img.png"
import dummyJpgImg from "../assets/images/dummy-jpg-img.png"

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

export const appointmentData = [
  {
    id: 1,
    reason: "Ultrasound scan",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Pending",
    status: "Upcoming",
    prescription: "N / A",
    invoice: "N / A",
    actions: "View"
  },
  {
    id: 2,
    reason: "Blood Test Review",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "N / A",
    invoice: "N / A",
    actions: "View"
  },
  {
    id: 3,
    reason: "Physical Check-up",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "N / A",
    invoice: "N / A",
    actions: "View"
  },
  {
    id: 4,
    reason: "Initial Consultation",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "N / A",
    invoice: "N / A",
    actions: "View"
  },

];

export const MedicalHistoryData = {
  id_medical_history: 1,
  medical_medications: "true",
  medical_surgeries: "false",
  medical_medical_condition: ["PCOS", "Thyroid Disorder", "Peanut Allergy", "Lactose Intolerant"],
  medical_family_medical_history: ["Mother had endometriosis", "Father had thyroid"],
  medical_lifestyle: ["Non-smoker", "Occasional alcohol", "Vegetarian diet"],
  medical_exercise: "never",
  medical_stress_level: "low",

}
export const physicalAssessmentData: PhysicalAssessmentData[] = [
  {
    date: "Wed, 19 Feb 2024",
    height: "5'4''(162cm)",
    weight: "58 kg",
    bmi: "22.1(Normal)",
    bloodGroup: "O+",
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
  },
  {
    date: "Mon, 22 Feb 2024",
    height: "5'4''(162cm)",
    weight: "58 kg",
    bmi: "22.1(Normal)",
    bloodGroup: "O+",
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
  },
];

export const patientReportData = [
  {
    img: dummyPdfImg,
    title: "Ultrasound Report",
    subtitle: "Ultrasound_Analysis",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyJpgImg,
    title: "Ultrasound Report",
    subtitle: "Xray.jpg",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyJpgImg,
    title: "Ultrasound Report",
    subtitle: "Xray.jpg",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyPdfImg,
    title: "Ultrasound Report",
    subtitle: "Ultrasound_Analysis",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyPdfImg,
    title: "Ultrasound Report",
    subtitle: "Ultrasound_Analysis",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyJpgImg,
    title: "Ultrasound Report",
    subtitle: "Ultrasound_Analysis",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyPdfImg,
    title: "Ultrasound Report",
    subtitle: "Ultrasound_Analysis",
    fileInfo: "60 KB • 11 Feb 2025"
  },
  {
    img: dummyPdfImg,
    title: "Ultrasound Report",
    subtitle: "Ultrasound_Analysis",
    fileInfo: "60 KB • 11 Feb 2025"
  },
]

export const patientTreatmentData = [
  {
    title: "IVF Cycle 1",
    status: "Ongoing",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Half Paid"

  },
  {
    title: "IVF Cycle 2",
    status: "Ongoing",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Half Paid"

  },
  {
    title: "IUI",
    status: "Completed",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Paid"

  },
  {
    title: "Egg Freezing",
    status: "Completed",
    startDate: "7 Feb 2025",
    endDate: "1:30 PM",
    fees: "₹12000",
    amountStatus: "Paid"

  }

]


export const partnerDetailData = {
  profile: {
    basic_detail_name: "Raj Desai",
    basic_detail_gender: "Male",
    basic_detail_age: "31",
    basic_detail_phone: "12345 67890",
    basic_detail_email: "riyadharang@miacare.com",

  },
  medicalHistory: {
    medication: "yes",

    medicationContent: "This is Medical Condition",
    surgeriesContent: "This is Medical Condition",
    currentMedication: "CureAll 5000, HealMax Plus",
    surgeries: "No",
    MedicalconditionAllergies: ["PCOS", "Thyroid Disorder", "Peanut Allergy", "Lactose Intolerant"],
    familyMedicalHistory: ["Mother had endometriosis", "Father had thyroid"],
    lifestyle: ["Non-smoker", "Occasional alcohol", "Vegetarian diet"],
    exercise: "never",
    stress: "low",
  },
  PhysicalAssessmentData: [
    {
      date: "Wed, 19 Feb 2024",
      height: "5'4'",
      weight: "58",
      bmi: "22.1",
      bloodGroup: "O+",
      systolic: "120",
      diastolic: "80",

      heartRate: "72",
    },
    {
      date: "Mon, 22 Feb 2024",
      height: "5'4'",
      weight: "58",
      bmi: "22.1",
      bloodGroup: "O+",
      systolic: "120",
      diastolic: "80",
      heartRate: "72",
    },
  ],
  fertilityAssessment: {
    semenAnalysis: "Yes | Healthy Semen",
    semenAnalysisContent: "This Is Seema Analys Content",
    fertilityIssues: "No",
    fertilityIssuesContent: "This is Fertility Issue Content",
    fertilityTreatment: "No",
    fertilityTreatmentContent: "This Is fertilityTreatmentContent Contet",
    surgeries: "No",
    surgeriesContent: "This Is surgeriesContent Content"
  }
}