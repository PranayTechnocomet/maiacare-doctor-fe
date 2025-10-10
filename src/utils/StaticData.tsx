import { Patient, PhysicalAssessmentData, SelectPatientType } from "./types/interfaces";
import dummyPdfImg from "../assets/images/dummy-pdf-img.png"
import dummyJpgImg from "../assets/images/dummy-jpg-img.png"
import appointmentProfile from "../assets/images/appoiment-img-1.png"
import PriyaGupta from "../assets/images/Priya Gupta.png"
import AarushiPatel from "../assets/images/Aarushi Patel.png"
import NishaRao from "../assets/images/Nisha Rao.png"
import RiyaSharma from "../assets/images/Riya Sharma.png"
import patientImg1 from "../assets/images/patient-img-1.png"
import patientImg2 from "../assets/images/patient-img-2.png"
import patientImg3 from "../assets/images/patient-img-3.png"
import patientImg4 from "../assets/images/patient-img-4.png"

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

export const AppointmentData = [
  {
    id: 1,
    reason: "Ultrasound scan",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Pending",
    status: "Upcoming",
    prescription: "N/A",
    invoice: "N/A",
    actions: "View"
  },
  {
    id: 2,
    reason: "Blood Test Review",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "file",
    invoice: "file",
    actions: "View"
  },
  {
    id: 3,
    reason: "Physical Check-up",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "viewfile",
    invoice: "viewfile",
    actions: "View"
  },
  {
    id: 4,
    reason: "Initial Consultation",
    date: "11 Feb 2025",
    time: "3 PM",
    payment: "Done",
    status: "Completed",
    prescription: "viewfile",
    invoice: "viewfile",
    actions: "View"
  },

];

export const PaymentHistoryData = [
  {
    transactionId: "TXN1234567890",
    serviceType: "Treatment",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Pending",
    actions: "View"
  },
  {
    transactionId: "TXN1234567890",
    serviceType: "Treatment",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Paid",
    actions: "View"
  },
  {
    transactionId: "TXN1234567890",
    serviceType: "Lab Test",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Paid",
    actions: "View"
  },
  {
    transactionId: "TXN1234567890",
    serviceType: "Consultation",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Refunded",
    actions: "View"
  },
]

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
    medicationcontent: "This is Medical Condition",
    surgeriesContent: "This is Medical Condition",
    currentMedication: "CureAll 5000, HealMax Plus",
    surgeries: "no",
    MedicalconditionAllergies: ["PCOS", "Thyroid Disorder", "Peanut Allergy", "Lactose Intolerant"],
    familyMedicalHistory: ["Mother had endometriosis", "Father had thyroid"],
    lifestyle: ["Non-smoker", "Occasional alcohol", "Vegetarian diet"],
    exercise: "rarely",
    stress: "high",
  },
  PhysicalAssessmentData: [
    // {
    //   date: "Wed, 19 Feb 2024",
    //   height: "5'4'",
    //   weight: "58",
    //   bmi: "22.1",
    //   bloodGroup: "O+",
    //   systolic: "120",
    //   diastolic: "80",

    //   heartRate: "72",
    // },
    // {
    //   date: "Mon, 22 Feb 2024",
    //   height: "5'4'",
    //   weight: "58",
    //   bmi: "22.1",
    //   bloodGroup: "O+",
    //   systolic: "120",
    //   diastolic: "80",
    //   heartRate: "72",
    // },
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

export const tempAppointmentProfileData = {
  profilePhoto: appointmentProfile,
  name: "Radhika More",
  id: "PTS-874562",
  gender: "Female",
  year: "31 Years",
  date: "15 Jun 2025",
  time: "3:15 PM",
  FertilityAssessment: "Fertility assessment"
}

export interface tempAppointmentProfileData {
  appointment_id: string;
  patient_profile: string | any;
  patient_name: string;
  patient_status: string;
  patient_contactnumber: string;
  patient_email: string;
  patient_appointment_date: string;
  patient_appointment_time: string;
  patient_treatment: string[];
  patient_payment: string;
  patient_additional_commet: string;
  patient_time: string;
}

export const doctorlistingModalData: tempAppointmentProfileData[] = [
  {

    appointment_id: "1",
    patient_profile: PriyaGupta,
    patient_name: "Priya Gupta",
    patient_status: "Follow Up",
    patient_contactnumber: "12345 67890",
    patient_email: "riya@gmail.com",
    patient_appointment_date: "12 May 2024",
    patient_appointment_time: "10:00 AM - 10:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "11:00 AM"

  },
  {

    appointment_id: "2",
    patient_profile: AarushiPatel,
    patient_name: "Aarushi Patel",
    patient_status: "Follow Up",
    patient_contactnumber: "09876 54321",
    patient_email: "aarushi@gmail.com",
    patient_appointment_date: "15 April 2024",
    patient_appointment_time: "12:00 AM - 12:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "12:00 AM"

  },
  {

    appointment_id: "3",
    patient_profile: NishaRao,
    patient_name: "Nisha Rao",
    patient_status: "Follow Up",
    patient_contactnumber: "98562 98758",
    patient_email: "nisha@gmail.com",
    patient_appointment_date: "20 January 2024",
    patient_appointment_time: "01:00 AM - 01:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "1:00 PM"

  },
  {

    appointment_id: "4",
    patient_profile: RiyaSharma,
    patient_name: "Riya Sharma",
    patient_status: "Follow Up",
    patient_contactnumber: "78545 69855",
    patient_email: "priya@gmail.com",
    patient_appointment_date: "28 February 2024",
    patient_appointment_time: "02:00 AM - 02:30 AM",
    patient_treatment: ["Fertility Support", "IVF", "IUI"],
    patient_payment: "Unpaid",
    patient_additional_commet: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    patient_time: "2:00 PM"

  },

]
export const umeshData = [
  {
    appointment_id: "1234",
  },
]
export const PatientsDetails: SelectPatientType[] = [
  { id: "1", ProfilePhoto: patientImg1, name: "Nisha S" },
  { id: "2", ProfilePhoto: patientImg2, name: "Kavita Sharma" },
  { id: "3", ProfilePhoto: patientImg3, name: "Anjali Rao" },
  { id: "4", ProfilePhoto: patientImg4, name: "Priya Desai" },
];

export const TempTreatmentSteps = [
  {
    id: 1,
    step: " Fertility Assessment",
  },
  {
    id: 2,
    step: " Ovarain Stimulation",
  },
  {
    id: 3,
    step: "Monitoring",
  },
  {
    id: 4,
    step: "Follow up (HCG trigger shot)",
  },
  {
    id: 5,
    step: "Egg Retrieval",
  },
  {
    id: 6,
    step: "Sperm Collection",
  },
  {
    id: 7,
    step: "Fertilisation",
  },
  {
    id: 8,
    step: "Embryo Culture",
  },
  {
    id: 9,
    step: "Embryo Transfer",
  },
  {
    id: 10,
    step: "Pregnancy Test",
  },

];
