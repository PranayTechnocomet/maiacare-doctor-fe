export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Patient {
  id: number;
  name: string;
  mobile: string;
  email: string;
  pincode: string;
  treatment: string;
  status: string;
};

export interface PhysicalAssessmentDataModel {
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string
  systolic: string;
  diastolic: string;
  heartRate: string;
};

export interface PhysicalAssessmentData {
  date: string;
  height: string;
  weight: string;
  bmi: string;
  bloodGroup: string;
  bloodPressure: string;
  heartRate: string;
}

export interface FertilityAssessmentData {
  date: string;
  semenAnalysis: string;
  semenAnalysisContent?: string;
  fertilityIssues: string;
  fertilityIssuesContent?: string;
  fertilityTreatment: string;
  fertilityTreatmentContent?: string;
  surgeries: string;
  surgeriesContent?: string;
}

export interface FertilityAssessmentHistory {
  semenAnalysis: string;
  semenAnalysisContent?: string;
  fertilityIssues: string;
  fertilityIssuesContent?: string;
  fertilityTreatment: string;
  fertilityTreatmentContent?: string;
  surgeries: string;
  surgeriesContent?: string;
}

export interface AddPatientFormData {
   // Personal details
   name: string;
   patientId: string;
   gender: string;
   date: string;
   age: string;
   phone: string;
   email: string;
   address: string;
   pincode: string;
   city: string;
   state: string;

   // Emergency contact
   emergencyContactName: string;
   emergencyContactPhone: string;
   emergencyContactRelation: string;
}

