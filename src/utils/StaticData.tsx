import { MedicationPrescriptionType, Patient, PatientJourneyItem, PhysicalAssessmentData, SelectPatientType } from "./types/interfaces";
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

import { ColumnDef } from "@tanstack/react-table";

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

export const ClinicReviewsTable = [
  {
    id: "1",
    image: patientImg1,
    name: "Meera Joshi",
    rating: "4.5",
    date: "7 Jan 2024",
    time: "2:30 PM",
    comment: "Dr. Kort practices the exact opposite of a one size fits all approach to medicine. He took my",
  },
  {
    id: "2",
    image: patientImg2,
    name: "Meera Joshi",
    rating: "4.5",
    date: "7 Jan 2024",
    time: "2:30 PM",
    comment: "Dr. Kort practices the exact opposite of a one size fits all approach to medicine. He took my",
  },
  {
    id: "3",
    image: patientImg3,
    name: "Meera Joshi",
    rating: "4.5",
    date: "7 Jan 2024",
    time: "2:30 PM",
    comment: "Dr. Kort practices the exact opposite of a one size fits all approach to medicine. He took my",
  },
  {
    id: "4",
    image: patientImg4,
    name: "Meera Joshi",
    rating: "4.5",
    date: "7 Jan 2024",
    time: "2:30 PM",
    comment: "Dr. Kort practices the exact opposite of a one size fits all approach to medicine. He took my",
  },
]

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
    transactionId: "TXN1234567891",
    serviceType: "Treatment",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Paid",
    actions: "View"
  },
  {
    transactionId: "TXN1234567892",
    serviceType: "Lab Test",
    date: "11 Feb 2025",
    time: "3 PM",
    paymentMode: "UPI",
    amount: "₹1,200",
    status: "Paid",
    actions: "View"
  },
  {
    transactionId: "TXN1234567893",
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

// export const patientReport = [
//   {
//     img: dummyPdfImg,
//     title: "Ultrasound Report",
//     subtitle: "Ultrasound_Analysis",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyJpgImg,
//     title: "Ultrasound Report",
//     subtitle: "Xray.jpg",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyJpgImg,
//     title: "Ultrasound Report",
//     subtitle: "Xray.jpg",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyPdfImg,
//     title: "Ultrasound Report",
//     subtitle: "Ultrasound_Analysis",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyPdfImg,
//     title: "Ultrasound Report",
//     subtitle: "Ultrasound_Analysis",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyJpgImg,
//     title: "Ultrasound Report",
//     subtitle: "Ultrasound_Analysis",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyPdfImg,
//     title: "Ultrasound Report",
//     subtitle: "Ultrasound_Analysis",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
//   {
//     img: dummyPdfImg,
//     title: "Ultrasound Report",
//     subtitle: "Ultrasound_Analysis",
//     fileInfo: "60 KB • 11 Feb 2025"
//   },
// ]

export const patientReport = [
  {
    reportName: "Ultrasound Report",
    name: "Ultrasound_Ana.pdf",
    size: "60 KB",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Ultrasound Report",
    name: "Xray.jpg",
    size: "60 KB",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Sonography",
    name: "Sonography.jpg",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Sonography Report",
    name: "Sonography_Re.pdf",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Xray",
    name: "Xray.jpg",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Xray Report",
    name: "Xray_Ana.pdf",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
  {
    reportName: "Blood Test",
    name: "Blood_T.pdf",
    size: "60 KB",
    progress: 100,
    status: "completed",
    uploadedAt: 1739251200000,
  },
];

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

export const journeyData: PatientJourneyItem[] = [
  {
    id: "1",
    title: "Online Consultation",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "Success"
  },
  {
    id: "2",
    title: "Appointment Booked",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "Success"
  },
  {
    id: "3",
    title: "Clinic Visits",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "In Progress",
  },
  {
    id: "4",
    title: "Treatment Started",
    date: "on 09 Jul 2024",
    time: "10:30 AM",
    status: "Pending"
  },
  {
    id: "5",
    title: "Pregnancy Confirmed",
    date: "on 09 Jul 2024",
    time: "12:11 PM",
    status: "Pending"
  },

];

export const IVFProgressData = [
  {
    id: 1,
    title: 'Fertility Assessment',
    date: 'on 09 Jul 2024',
    time: '12:11 PM',
    Complete: "50",
    status: 'Success' as const
  },
  {
    id: 2,
    title: 'Ovarian Stimulation',
    date: 'on 09 Jul 2024',
    time: '12:11 PM',
    status: 'In Progress' as const
  },
  {
    id: 3,
    title: 'Monitoring',
    // date: 'on 09 Jul 2024',
    // time: '12:11 PM',
    // Complete: "50",
    status: 'Pending' as const
  },
  {
    id: 4,
    title: 'Follow up',
    status: 'Pending' as const
  },
  {
    id: 5,
    title: 'Egg Retrieval',
    status: 'Pending' as const
  },
  {
    id: 6,
    title: 'Sperm Collection',
    status: 'Pending' as const
  },
];


export const medicationPrescriptionData: MedicationPrescriptionType[] = [
  {
    id: "1",
    medicineName: "Follistim",
    type: "Capsule",
    typeQuantity: "50",
    duration: "12",
    quantity: 1,
    timeslot: ["morning", "evening"],
    meal: "Before",
    intake: "1",
    description: "This is description",
  },
  {
    id: "2",
    medicineName: "Progesterone",
    type: "Tablet",
    typeQuantity: "200",
    duration: "12",
    quantity: 1,
    timeslot: ["morning", "evening"],
    meal: "Before",
    intake: "1",
    description: "This is description",
  },
];

export const StatusAndUpdatesData = {
  stepName: "Fertility Assessment",
  status: "Success",
  notes: "Cycle is normal, no fertility related issue",
}

export const EditTreatmentStaticData = {
  treatmentplan: {
    selectpatient: "partner",
    treatment: "Embryo Transfer",
    duration: "6 Months",
  },
  medicalPrescription: [
    {
      id: "1",
      medicineName: "Progesterone",
      type: "Tablet",
      typeQuantity: "200 mg",
      duration: "14",
      quantity: 1,
      timeslot: ["morning"],
      meal: "After",
      intake: "test",
      description: "test description",
    },
    {
      id: "2",
      medicineName: "Follistim",
      type: "Capsule",
      typeQuantity: "50 mg",
      duration: "14",
      quantity: 1,
      timeslot: ["morning"],
      meal: "After",
      intake: "test2",
      description: "test description2",
    }
  ],
  tests: [
    { id: "1", value: "Blood Test", label: "Blood Test" },
    { id: "2", value: "Sonography", label: "Sonography" },
  ],
  followUpAction: {
    nextStep: "1 Ovarian Stimulation",
    appointmentDate: "2025-10-16",
    appointmentTime: "15:50",
    forTime: "30minutes",
    instructionsForPatient: "1.Report any abdominal pain, spotting, or unusual symptoms immediately",
  }

}

export const leaveData: LeaveEntry[] = [
  {
    id: '01',
    type: 'Casual leave',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '1 Day',
  },
  {
    id: '02',
    type: 'Sick leave',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '3 Days',
  },
  {
    id: '03',
    type: 'Vacation',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '15 Days',
  },
  {
    id: '04',
    type: 'Family Thing',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '1 Day',
  },
  {
    id: '05',
    type: 'Sick leave',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '2 Days',
  },
  {
    id: '06',
    type: 'Casual leave',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '1 Day',
  },
  {
    id: '07',
    type: 'Family thing',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '2 Days',
  },
  {
    id: '08',
    type: 'Casual leave',
    startDate: '12/08/25',
    endDate: '12/08/25',
    days: '1 Day',
  },
];
export const leaveColumns: ColumnDef<LeaveEntry>[] = [
  {
    header: '#',
    accessorKey: 'id',
  },
  {
    header: 'Leave Type',
    accessorKey: 'type',
  },
  {
    header: 'Start Date',
    accessorKey: 'startDate',
  },
  {
    header: 'End Date',
    accessorKey: 'endDate',
  },
  {
    header: 'No. of days',
    accessorKey: 'days',
  },
  // {
  //   header: 'Action',
  //   cell: () => (
  //     <div className="d-flex gap-2">
  //       <button className="btn btn-sm profile-card-boeder ">
  //         <Image src={LightEditimg} alt="Specialization" width={18} height={20} />
  //       </button>

  //       <button className="btn btn-sm profile-card-boeder">
  //         <Image src={Trash} alt="Specialization" width={18} height={20} />
  //       </button>
  //     </div>
  //   ),
  // },
];
export type LeaveEntry = {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  days: string;
};


import RaniImg from "@/assets/images/Img-1.png";
import NinaImg from "@/assets/images/Img-2.png";
import HimariImg from "@/assets/images/Img-3.png";
import AnjaliImg from "@/assets/images/Img-4.png";
import AasthaImg from "@/assets/images/Img-5.png";
import { StaticImageData } from "next/image";
// import Doctor1 from "@/assets/images/doctor1.png";
// import Doctor2 from "@/assets/images/doctor2.png";
// import Doctor3 from "@/assets/images/doctor3.png";
// import Doctor4 from "@/assets/images/doctor4.png";


export interface ConsultationEntry {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  treatment: string;
  pin: string;
  status: string;
  image: string | StaticImageData;
  date?: string;  // ✅ optional date field
}

export interface InventoryEntry {
  id: number; // <-- ADD ID
  name: string;
  mobile: string;
  treatment: string;
  Date: string;
  Time: string;
  status: string;
  image: string | StaticImageData;
  date?: string;  // ✅ optional date field
}

export interface TreatmentPlanEntry {
  id: number;
  treatmentPlan: string;
  step: string;
  date: string;
  patientName: string;
  partnerName: string;
  status: string;
  image: string | StaticImageData;
}



export type Doctor = {
  id: string | number;
  name: string;
  image: string | StaticImageData;
  slots: string[];
};







export const consultationData: ConsultationEntry[] = [
  {
    id: 1,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Completed",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 2,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Pending",
    image: RiyaSharma,
    date: "2025-11-07"

  },
  {
    id: 3,
    name: "Himari Roy",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Scheduled",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 4,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "No Response",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 5,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Cancelled",
    image: RiyaSharma,
    date: "2025-11-08"

  },
  {
    id: 6,
    name: "Aastha Patil",
    mobile: "9092038491",
    treatment: "IVF",
    pin: "400077",
    status: "Rescheduled",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 7,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "No Response",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 8,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Completed",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 9,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    pin: "400077",
    status: "Cancelled",
    image: RiyaSharma,
    date: "2025-09-15"
  },
  {
    id: 10,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Egg Freezing",
    pin: "400077",
    status: "Completed",
    image: RiyaSharma,
    date: "2025-10-15"
  },
];


export const treatmentPlanData: TreatmentPlanEntry[] = [
  {
    id: 1,
    treatmentPlan: "IVF",
    step: "Fertility Assessment",
    date: "7 Jan 2024",
    patientName: "Meera Joshi",
    partnerName: "Ravi Sharma",
    status: "Success",
    image: RiyaSharma,
  },
  {
    id: 2,
    treatmentPlan: "Egg Freezing",
    step: "Ovarian Stimulation",
    date: "7 Jan 2024",
    patientName: "Ravi Sharma",
    partnerName: "Ravi Sharma",
    status: "Pending",
    image: AarushiPatel,
  },
  {
    id: 3,
    treatmentPlan: "IUI",
    step: "Fertilisation",
    date: "7 Jan 2024",
    patientName: "Priya Singh",
    partnerName: "Rohan Singh",
    status: "Cancelled",
    image: RiyaSharma,
  },
  {
    id: 4,
    treatmentPlan: "Fertility Support",
    step: "IVF",
    date: "7 Jan 2024",
    patientName: "Lakshmi Patel",
    partnerName: "Arjun Patel",
    status: "Success",
    image: RiyaSharma,
  },
  {
    id: 5,
    treatmentPlan: "IVF",
    step: "Embryo Culture",
    date: "7 Jan 2024",
    patientName: "Arjun Patel",
    partnerName: "Arjun Patel",
    status: "Upcoming",
    image: AarushiPatel,
  },
  {
    id: 6,
    treatmentPlan: "Egg Freezing",
    step: "Embryo Transfer",
    date: "7 Jan 2024",
    patientName: "Suresh Gupta",
    partnerName: "Suresh Gupta",
    status: "Cancelled",
    image: AarushiPatel,
  },
  {
    id: 7,
    treatmentPlan: "Fertility Support",
    step: "Pregnancy Test",
    date: "7 Jan 2024",
    patientName: "Ananya Sharma",
    partnerName: "Vikram Sharma",
    status: "Pending",
    image: AarushiPatel,
  },
  {
    id: 8,
    treatmentPlan: "Fertility Support",
    step: "Fertility Assessment",
    date: "7 Jan 2024",
    patientName: "Ananya Sharma",
    partnerName: "Vikram Sharma",
    status: "Success",
    image: AarushiPatel,
  },
];


export const inventoryData: InventoryEntry[] = [
  {
    id: 1,
    name: "Rani Desai",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Completed",
    image: PriyaGupta,
    date: "2025-11-7"
  },
  {
    id: 2,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "Egg Freezing +1",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Pending",
    image: AarushiPatel,
    date: "2025-09-15"
  },
  {
    id: 3,
    name: "Himari Roy",
    mobile: "9092038491",
    treatment: "Egg Freezing +1",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "",
    image: NishaRao,
    date: "2025-09-15"
  },
  {
    id: 4,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "IVF",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "No Response",
    image: RiyaSharma,
    date: "2025-11-8"
  },
  {
    id: 5,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Cancelled",
    image: AarushiPatel,
    date: "2025-10-15"
  },

  {
    id: 6,
    name: "Aastha Patil",
    mobile: "9092038491",
    treatment: "Egg Freezing +1",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Scheduled",
    image: NishaRao,
    date: "2025-09-15"
  },
  {
    id: 7,
    name: "Nina Gupta",
    mobile: "9092038491",
    treatment: "IVF",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "No Response",
    image: RiyaSharma,
    date: "2025-09-25"
  },
  {
    id: 8,
    name: "Anjali Shinde",
    mobile: "9092038491",
    treatment: "Fertility Support +2",
    Date: "7 Jan 2024",
    Time: "2:30 PM",
    status: "Cancelled",
    image: PriyaGupta,
    date: "2025-10-15"
  },

];
// ];

export const Appointments = [
  {
    id: "1",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 1",
      profileImage: patientImg1,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment1",
    date: "11 Nov 2025",
    time: "9:01"
  },
  {
    id: "2",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 2",
      profileImage: patientImg2,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
    reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:02"
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 3",
      profileImage: patientImg1,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
   reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:10"
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 4",
      profileImage: patientImg2,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
   reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:15"
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 5",
      profileImage: patientImg4,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
   reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:17"
  },
  {
    id: "4",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 6",
      profileImage: patientImg2,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
   reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:17"
  },
  {
    id: "3",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 1",
      profileImage: patientImg1,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:00",
    reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:30"
  },

  {
    id: "5",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah 2",
      profileImage: patientImg2,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:15",
   reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "9:40"
  },
  {
    id: "6",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: patientImg3,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:20",
    reason: [
      "Fertility Support", "Egg Freezing", "IVF", "IUI", "Fertility Support 2", "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "10:07"
  },
  {
    id: "7",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: patientImg4,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "10:30",
    reason: [
      "Fertility Support", "Egg Freezing", "IVF", "IUI", "Fertility Support 2", "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "11:30"
  },
  {
    id: "8",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: patientImg1,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "11:15",
   reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "6:15"
  },
  {
    id: "9",
    status: 1,
    doctor: {
      _id: "68b5723f5e662f13011c00ff",
      name: "Dr. Priya Sharma"
    },
    patient: {
      _id: "69005c207162eaf97429433c",
      name: "smriti shah",
      profileImage: patientImg2,
      contactNumber: "9898765432"
    },
    appointmentDate: "11 Nov 2025",
    appointmentTime: "1:30",
    reason: [
      "Fertility Support" , "other"
    ],
    title: "smriti shah - reason  to appointment",
    date: "11 Nov 2025",
    time: "1:30"
  }
];


