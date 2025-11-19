import { PhysicalAssessment } from "@/components/form/AddPartnerDetailsForm";
import { LoginRequest } from "../types/requestInterface";
import apiClient from "./axiosInstance";

export const login = (data: LoginRequest) => {
  return apiClient.post("/auth/login", data);
} 

export const getLoginUser = () => {
  return apiClient.get("/profile/get/login-user");
}


export const selectClinic = (clinicId: string ) => {
  return apiClient.post("/auth/select-clinic", { clinicId });
};


export const forgotPassword = (data: { email: string }) => {
  return apiClient.post("/auth/forgot-password", data);
}

export const forgotPasswordVerify = (data: { token: string | null, otp: number | string }) => {
  return apiClient.post("/auth/forgot-password-verify", data);
}

export const newPassword = (data: { token: string | null, password: string }) => {
  return apiClient.post("/auth/new-password", data);
}

export const update = () => {
  return apiClient.put("/auth/update");
}

export const changePassword = (data: { oldPassword: string, newPassword: string }) => {
  return apiClient.post("/profile/change-password", data);
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

export const getLoggedInUser = () => {
  const token = localStorage.getItem("token");
  return apiClient.get("/profile/get", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}


type QualificationType = {
  degree: string;
  fieldOfStudy: string;
  university: string;
  startYear: number | string;
  endYear: number | string;
};

// ...... QUALIFICATION ...... //

export const addQualification = (data: QualificationType[]) => {
  const token = localStorage.getItem("token");
  return apiClient.post("/profile/qualifications/add", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
}

export const editQualification = (data: QualificationType, id:string) => {
  const token = localStorage.getItem("token");
  return apiClient.put(`/profile/qualifications/edit/${id}`, data, {
    headers: {
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




// ...... PATIENT - PARTNER FERTILITY  ASSESSMENT ...... //

export const partnerfertilityAssessmentpost= () => {
  return apiClient.post("/patient/partner/fertilityAssessment");
}
export const partnerfertilityAssessmentget= () => {
  return apiClient.get("/patient/partner/fertilityAssessment");
}

export const partnerfertilityAssessmentput= () => {
  return apiClient.put("/patient/partner/fertilityAssessment");
} 




// ...... NOTIFICATATION ...... //

export const partnernotificationspost= () => {
  return apiClient.post("/notifications");
}
export const partnernotificationsget= () => {
  return apiClient.get("/notifications");
}

export const partnernotificationsput= () => {
  return apiClient.put("/notifications");
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





//...... UPDATE IMAGES ......//
export const updateImages = (formData: FormData) => {
  return apiClient.post("/update-images", formData, {
    headers: { "Content-Type": "multipart/form-data"},
  });
};