import { PhysicalAssessment } from "@/components/form/AddPartnerDetailsForm";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
} 

export const getLoginUser = () => {
  return apiClient.get("/profile/get/login-user");
}

export const selectclinic = () => {
  return apiClient.post("/auth/select-clinic");
} 

export const forgotPassword = () => {
  return apiClient.post("/auth/forgot-password");
}

export const forgotPasswordVerify = () => {
  return apiClient.post("/auth/forgot-password-verify");
}
export const newPassword = () => {
  return apiClient.post("/auth/new-password");
}

export const update = () => {
  return apiClient.put("/auth/update");
}

export const changePassword = () => {
  return apiClient.post("/profile/change-password");
}

export const logout = () => {
  return apiClient.post("/profile/logout");
}
export const logoutByDevice = () => {
  return apiClient.post("/profile/logoutByDevice");
}

export const listlogindevice = () => {
  return apiClient.get("/profile/list-login-device");
}

export const updateclinicdetails = () => {
  return apiClient.put("/profile/update-clinic-details");
}

export const uploadkycdetails = () => {
  return apiClient.put("/profile/upload-kyc-details");
}



// type QualificationType = {
//   degree: string;
//   fieldOfStudy: string;
//   university: string;
//   startYear: number;
//   endYear: number;
// };


// ...... QUALIFICATION ...... //

export const addQualification = () => {
  const token = localStorage.getItem("token");
  return apiClient.post("/profile/qualifications/add", {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const editQualification = () => {
  const token = localStorage.getItem("token");
  return apiClient.put("/profile/qualifications/edit",  {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const deleteQualification = () => {
  const token = localStorage.getItem("token");
  return apiClient.delete("/profile/qualifications/edit",  {
    headers : {
      Authorization: `Bearer ${token}`,
    }
  });
}



// ...... APPOINTMENT ...... //

export const createappointment = () => {
  return apiClient.post("/patient/create-appointment");
}

export const patientinfo = () => {
  return apiClient.get("/patient/patient-info");
}

export const getappointments = () => {
  return apiClient.post("/patient/get-appointments");
}

export const rescheduleappointment = () => {
  return apiClient.post("/patient/reschedule-appointment");
}

export const cancelappointment = () => {
  return apiClient.post("/patient/cancel-appointment");
}

export const confirmappointment = () => {
  return apiClient.post("/patient/confirm-appointment");
}


// ..... PATIENT CRUD ..... //

export const patientdelete = () => {
  return apiClient.delete("/patient/delete");
}

export const patientupdate= () => {
  return apiClient.put("/patient/update");
}

export const getAll= () => {
  return apiClient.get("/patient/getAll");
}
export const add= () => {
  return apiClient.post("/patient/add");
}


// ...... PATIENT - PHYSICAL ASSESSMENT ...... //


export const physicalassessmentpost= () => {
  return apiClient.post("/patient/physical-assessment");
}

export const physicalassessmentget= () => {
  return apiClient.get("/patient/physical-assessment");
}

export const physicalassessmentput= () => {
  return apiClient.put("/patient/physical-assessment");
}

export const physicalassessmentdelete= () => {
  return apiClient.delete("/patient/physical-assessment");
}



// ...... PATIENT MEDICAL HISTOTY ......//

export const patientmedicalhistorypost= () => {
  return apiClient.post("/patient/medical-history");
}

export const patientmedicalhistorydelete= () => {
  return apiClient.delete("/patient/medical-history");
}

export const patientmedicalhistoryget= () => {
  return apiClient.get("/patient/medical-history");
}

export const patientmedicalhistoryput= () => {
  return apiClient.put("/patient/medical-history");
}




//...... PATIENT - FERTILITY ASSESSMENT ......//

export const fertilityassessmentpost= () => {
  return apiClient.post("/patient/fertility-assessment");
}

export const fertilityassessmentget= () => {
  return apiClient.get("/patient/fertility-assessment");
}

export const fertilityassessmentput= () => {
  return apiClient.put("/patient/fertility-assessment");
}

export const fertilityassessmentdel= () => {
  return apiClient.delete("/patient/fertility-assessment");
}




//...... PATIENT - PARTNER BASIC DETAILS ......//

export const basicDetailspost= () => {
  return apiClient.post("/patient/partner/basicDetails");
}

export const basicDetailsput= () => {
  return apiClient.get("/patient/partner/basicDetails");
}

export const basicDetailsget= () => {
  return apiClient.put("/patient/partner/basicDetails");
} 


//...... PATIENT - PARTNER MEDICAL HISTORY ......//

export const partnermedicalHistorypost= () => {
  return apiClient.post("/patient/partner/medicalHistory");
}

export const partnermedicalHistoryget= () => {
  return apiClient.get("/patient/partner/medicalHistory");
}

export const partnermedicalHistoryput= () => {
  return apiClient.put("/patient/partner/medicalHistory");
} 


//...... PATIENT - PARTNER PHYSICAL  ASSESSMENT ......//
export const partnerphysicalAssessmentpost= () => {
  return apiClient.post("/patient/partner/physicalAssessment");
}
export const partnerphysicalAssessmentget= () => {
  return apiClient.get("/patient/partner/physicalAssessment");
}

export const partnerphysicalAssessmentput= () => {
  return apiClient.put("/patient/partner/physicalAssessment");
} 




//...... PATIENT - PARTNER FERTILITY  ASSESSMENT ......//

export const partnerfertilityAssessmentpost= () => {
  return apiClient.post("/patient/partner/fertilityAssessment");
}
export const partnerfertilityAssessmentget= () => {
  return apiClient.get("/patient/partner/fertilityAssessment");
}

export const partnerfertilityAssessmentput= () => {
  return apiClient.put("/patient/partner/fertilityAssessment");
} 





//...... LEAVES ...... //
export const createleave= () => {
  return apiClient.post("/profile/create-leave");
}

export const getleaves= () => {
  return apiClient.get("/profile/get-leaves");
}

export const getleupdateleaveaves= () => {
  return apiClient.get("/profile/update-leave");
}

export const deleteleave= () => {
  return apiClient.get("/profile/delete-leave");
}

