import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Table, Accordion } from 'react-bootstrap';
import Add from "../../assets/images/Add.png";
import Delete from "../assets/images/Delete.png";
import LightEditimg from "../assets/images/LightEditimg.png";
import Pdfimg from "../assets/images/Pdfimg.png";
import Download from "../assets/images/Download.png";
import Image from 'next/image';
import { useRouter } from "next/navigation";
// import Modal from "../ui/Modal";

import { TimePickerFieldGroup } from './ui/CustomTimePicker';
import Modal from './ui/Modal';
import { InputFieldGroup } from './ui/InputField';

import Button from './ui/Button';
import toast from 'react-hot-toast';
import ContentContainer from './ui/ContentContainer';
import { InputSelect } from './ui/InputSelect';
import ClinicImg from '@/assets/images/GoodHealth Clinic.png';
import ClinicImg2 from '@/assets/images/Fertility Clinic.png';
import MaiaVerified from '@/assets/images/Maia Verified.png';
import { addQualification, getLoggedInUser } from '@/utils/apis/apiHelper';


const ProfileBasicDetailsTabs = () => {
  interface FormError {
    [key: string]: string;

  }

  const router = useRouter();

  // const handleEditClick = () => {  
  //   // set flag before navigation
  //   sessionStorage.setItem("triggerQualificationScroll", "true");
  //   router.push("/edit-profile?scrollTo=qualification");
  // };

  const initialFormError: FormError = {};

  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [activeTab,] = useState('basic');
  const [startTime, setStartTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [endTime, setEndTime] = useState("");

  // const [defaultQualifications, setDefaultQualifications] = useState([
  //   { title: 'MD Gynaecology', university: 'Medical University', years: '2015 - 2017' },
  //   { title: 'MBBS', university: 'Medical University', years: '2010 - 2015' },
  // ]);

  const [defaultQualifications, setDefaultQualifications] = useState<any[]>([]);
  const [showQualificationModal, setShowQualificationModal] = useState(false);

  type FormData = {
    MF: string;
    SS: string;
    Time: string;
    Timer: string;

    degree: string;
    fieldOfStudy: string;
    university: string;
    startYear: string;
    endYear: string;

  };

  const initialFormData: FormData = {
    MF: "",
    SS: "",
    Time: "",
    Timer: "",


    degree: "",
    fieldOfStudy: "",
    university: "",
    startYear: "",
    endYear: ""
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [qualifications, setQualifications] = useState<FormData[]>([
    { ...initialFormData },
  ]);
  const [formErrors, setFormErrors] = useState([
    { degree: "", fieldOfStudy: "", university: "", startYear: "", endYear: "" }
  ]);


 const [, setDocuments] = useState<{ name: string; date: string }[]>([]);
  const documents = [
    { name: 'Certificate.pdf', date: 'October 20, 2024' },
    { name: 'Aadhar Card.pdf', date: 'October 20, 2024' },
    { name: 'License.pdf', date: 'October 20, 2024' },
    { name: 'Certificate.pdf', date: 'October 20, 2024' },
  ];

  const handleDelete = (index: number) => {
    const updated = defaultQualifications.filter((_, i) => i !== index);
    setDefaultQualifications(updated);
  };

  const handleDownload = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name; // 👈 download name set
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const operationalHours = [
    { days: "Mon to Fri", time: "10 AM – 5 PM" },
    { days: "Sat & Sun", time: "10 AM – 2 PM" },
  ];

  //================  + add  Modal all data below ============= //

  const handleOpen = () => {
    // modal open in clean state and clear data 
    setFormData(initialFormData);
    setFormError(initialFormError);
    setFormErrors([]);
    setQualifications([{ ...initialFormData }]); // one  blank qualification row

    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);

    // Modal close par data clear karo
    setFormData(initialFormData);
    setFormError(initialFormError);
    setFormErrors([]);
    setQualifications([{ ...initialFormData }]); // reset to 1 blank
  };


  const yearOptions = Array.from({ length: 51 }, (_, i) => {
    const year = 2000 + i;
    return { id: year.toString(), value: year.toString(), label: year.toString() };
  });


  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    // if (!data.degree.trim()) errors.degree = "Degree is required";
    // if (!data.field.trim()) errors.field = "Field is required";
    // if (!data.university.trim()) errors.university = "University is required";
    // if (!data.startYear.trim()) errors.startYear = "Start year is required";
    // if (!data.endYear.trim()) errors.endYear = "End year is required";

    return errors;
  };


  const validateForm1 = (quals: typeof qualifications) => {
    const errors = quals.map((q) => ({

      degree: !q.degree ? "Degree is required" : "",
      fieldOfStudy: !q.fieldOfStudy ? "Field is required" : "",
      university: !q.university ? "University is required" : "",
      startYear: !q.startYear ? "Start Year is required" : "",
      endYear: !q.endYear ? "End Year is required" : "",
    }));
    return errors;
  };

  // ✅ Function to add data
  const handleAddQualification = () => {
    setQualifications([...qualifications, { ...initialFormData }]);
    // ADDD Qualifications validtation msg 
    setFormErrors([
      ...formErrors,
      { degree: "", fieldOfStudy: "", university: "", startYear: "", endYear: "" }
    ]);
  };

  const handleRemoveQualification = (index: number) => {
    const updated = [...qualifications];
    updated.splice(index, 1);
    setQualifications(updated);
  };

  const handleSave = () => {
    // 🔹 Run validations
    const errors = validateForm(formData);          // single form
    const qualErrors = validateForm1(qualifications); // multi rows

    setFormError(errors);
    setFormErrors(qualErrors); // ✅ set array  

    const hasQualError = qualErrors.some((err) =>
      Object.values(err).some((msg) => msg !== "")
    );

    if (Object.keys(errors).length === 0 && !hasQualError) {
      // 🔹 Convert filled qualifications into display format
      const newItems = qualifications
        .filter(
          (q) =>
            q.degree && q.fieldOfStudy && q.university && q.startYear && q.endYear
        )
        .map((q) => ({
          title: `${q.degree} - ${q.fieldOfStudy}`,
          university: q.university,
          years: `${q.startYear} - ${q.endYear}`,
          degree: q.degree,
          fieldOfStudy: q.fieldOfStudy,
          startYear: q.startYear,
          endYear: q.endYear
        }));

      // if (newItems.length === 0) {
      //   alert("Please fill all fields before saving.");
      //   return;
      // }

      // 🔹 Update default qualifications
      setDefaultQualifications((prev) => [...prev, ...newItems]);

      console.log("Form submitted ✅", { formData, qualifications });

      // 🔹 Success → close modal + reset data



      const passData = qualifications.map((q) => ({
        degree: q.degree,
        fieldOfStudy: q.fieldOfStudy,
        university: q.university,
        startYear: Number(q.startYear),
        endYear: Number(q.endYear),
      }));

      console.log("Send data:", passData);


      addQualification(passData)
        .then((response) => {

          if (response.status == 200) {
            console.log("Qualification Added: ", response.data);
            setShowModal(false);
            setFormData(initialFormData);
            setFormError(initialFormError);
            setFormErrors([]);
            setQualifications([{ ...initialFormData }]);
            toast.success("Data saved successfully!", {
              position: "top-right",
              // autoClose: 3000,
            });
          } else {
            console.log("Error");
          }

        })
        .catch((err) => {
          console.log("Qualification adding error", err);
        });

    }
    else {
      console.log("Form has errors : ", { errors, qualErrors });
    }


  };


  // + add Qualification button diable data show after unable
  const isQualificationComplete = (q: any) => {
    return q.degree && q.fieldOfStudy && q.university && q.startYear && q.endYear;
  };



  // ===== Edit button click in modal open ================
  const openQualificationModal = (index: number) => {
    setEditIndex(index);
    setFormData(defaultQualifications[index]); // je data show thayu e prefill karo
    setShowQualificationModal(true); // modal open
  };

  const closeQualificationModal = () => setShowQualificationModal(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  const EditValidtation = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.degree.trim()) errors.degree = "Degree is required";
    if (!data.fieldOfStudy.trim()) errors.field = "Field is required";
    if (!data.university.trim()) errors.university = "University is required";
    if (!data.startYear.trim()) errors.startYear = "Start year is required";
    if (!data.endYear.trim()) errors.endYear = "End year is required";

    return errors;
  };


  const handleEditSave = () => {
    const errors = EditValidtation(formData);
    setFormError(errors);

    if (Object.keys(errors).length > 0) return; // ❌ don't save if errors

    if (editIndex !== null) {
      const updated = [...defaultQualifications];
      updated[editIndex] = {
        title: `${formData.degree} - ${formData.fieldOfStudy}`,
        university: formData.university,
        years: `${formData.startYear} - ${formData.endYear}`,
        degree: formData.degree,
        field: formData.fieldOfStudy,
        startYear: formData.startYear,
        endYear: formData.endYear
      };
      setDefaultQualifications(updated);
    }

    console.log("Form updated:", formData);

    closeQualificationModal();
    setEditIndex(null);
  };


  const [editIndex, setEditIndex] = useState<number | null>(null); // track current editing row















  

  interface OperationalHour {
    day: string;
    openTime: string;
    closeTime: string;
    _id: string;
  }

  interface Qualification {
    degree: string;
    fieldOfStudy: string;
    university: string;
    startYear: number;
    endYear: number;
    _id: string;
  }

  interface DoctorDataType {
    _id: string;
    name: string;
    profilePicture: string;
    specialty: string;
    yearsOfExperience: number;
    dob: string;
    gender: string;
    contactNumber: string;
    email: string;
    about: string;
    servicesOffered: string[];
    operationalHours: OperationalHour[];
    qualifications: Qualification[];
    fees: number;
    clinicIds: string[];
    doctorType: string;
    doctor_id_other: string;
    other_type_flag: string;
    memberSince: string;
    documents: any[];
  }


  const [user, setUser] = useState<DoctorDataType | null>(null)
  const getUser = () => {
    getLoggedInUser()
      .then((response) => {

        if (response.status == 200) {
          setUser(response.data.data)
          setDocuments(response.data.data.documents)
          setDefaultQualifications(response.data.data.qualifications)
        } else {
          console.log("Error");
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUser()
  }, [])














  return (
    // <Container fluid className="mt-3">
    <div>
      <Row>

        {/* =====LEFT COLUMN PART ======== */}


        <Col xl={8} md={7}>

          {/* Operational hours & Days */}
          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile m-3">Clinic Details</h5>
              <div className='treatment-steps-box mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex gap-2'>
                    <Image src={ClinicImg} width={58} height={58} alt='clinic-img' className='rounded-circle' />
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center gap-2'>

                        <h6 className='contact-details-heading m-0'>Sunrise Fertility</h6>
                        <Image src={MaiaVerified} width={120} height={20} alt='MaiaVerified' />
                      </div>

                      <div className='d-flex align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                          <path d="M17.482 12.7819L13.8016 11.1327L13.7914 11.128C13.6003 11.0462 13.3919 11.0134 13.185 11.0325C12.978 11.0516 12.7791 11.122 12.6063 11.2373C12.5859 11.2508 12.5663 11.2654 12.5477 11.2811L10.6461 12.9022C9.44141 12.317 8.19766 11.0827 7.61251 9.89359L9.23594 7.96312C9.25157 7.94359 9.26641 7.92406 9.28048 7.90297C9.39331 7.73055 9.46177 7.53291 9.47976 7.32763C9.49775 7.12236 9.46472 6.91582 9.3836 6.7264V6.71703L7.72969 3.03031C7.62246 2.78286 7.43807 2.57673 7.20406 2.44268C6.97005 2.30864 6.69895 2.25387 6.43126 2.28656C5.37264 2.42586 4.40093 2.94575 3.69761 3.74914C2.99429 4.55252 2.60747 5.58444 2.60938 6.65219C2.60938 12.8553 7.65626 17.9022 13.8594 17.9022C14.9271 17.9041 15.9591 17.5173 16.7624 16.814C17.5658 16.1106 18.0857 15.1389 18.225 14.0803C18.2578 13.8127 18.2031 13.5417 18.0692 13.3077C17.9353 13.0737 17.7293 12.8892 17.482 12.7819ZM13.8594 16.6522C11.2081 16.6493 8.66625 15.5948 6.79151 13.7201C4.91678 11.8453 3.86228 9.30346 3.85938 6.65219C3.85644 5.88929 4.1313 5.1514 4.63261 4.57633C5.13393 4.00126 5.82743 3.62833 6.5836 3.52719C6.58329 3.5303 6.58329 3.53344 6.5836 3.53656L8.22423 7.20844L6.60938 9.14125C6.59299 9.16011 6.5781 9.18022 6.56485 9.2014C6.44728 9.38181 6.37832 9.58953 6.36463 9.80442C6.35094 10.0193 6.393 10.2341 6.48673 10.428C7.19454 11.8756 8.65313 13.3233 10.1164 14.0303C10.3117 14.1232 10.5277 14.1638 10.7434 14.1482C10.9591 14.1325 11.167 14.0613 11.3469 13.9412C11.3669 13.9277 11.3862 13.9131 11.4047 13.8975L13.3039 12.2772L16.9758 13.9217C16.9758 13.9217 16.982 13.9217 16.9844 13.9217C16.8845 14.679 16.5121 15.3739 15.9369 15.8764C15.3617 16.379 14.6232 16.6548 13.8594 16.6522Z" fill="#8A8D93" />
                        </svg>
                        <span className='dashboard-treatment-success-patients'>+91 8987656874</span>
                      </div>
                    </div>
                  </div>

                  <div className="patient-journey-up-icon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                    </svg>
                  </div>

                </div>
                <Row className='mt-3'>
                  <Col md={6}>
                    <span className='patient-treatment-box-subtitle mb-2'>Address</span>
                    <p className='patient-treatment-box-subtitle-desc w-75' >2nd Floor, Lakeview Complex,
                      Hiranandani Gardens, Powai,
                      400072 Mumbai</p>
                  </Col>
                  <Col md={6}>
                    <span className='patient-treatment-box-subtitle '>Availability</span>
                    <p className='patient-treatment-box-subtitle-desc m-0' >Mon to Fri: 10 AM – 5 PM </p>
                    <p className='patient-treatment-box-subtitle-desc m-0'>Sat & Sun 10 AM – 2 PM</p>

                  </Col>
                </Row>
              </div>

              <div className='treatment-steps-box mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex gap-2'>
                    <Image src={ClinicImg2} width={58} height={58} alt='clinic-img' className='rounded-circle' />
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center gap-2'>

                        <h6 className='contact-details-heading m-0'>Fertility Clinic</h6>
                        {/* <Image src={MaiaVerified} width={120} height={20} alt='MaiaVerified' /> */}
                      </div>

                      <div className='d-flex align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                          <path d="M17.482 12.7819L13.8016 11.1327L13.7914 11.128C13.6003 11.0462 13.3919 11.0134 13.185 11.0325C12.978 11.0516 12.7791 11.122 12.6063 11.2373C12.5859 11.2508 12.5663 11.2654 12.5477 11.2811L10.6461 12.9022C9.44141 12.317 8.19766 11.0827 7.61251 9.89359L9.23594 7.96312C9.25157 7.94359 9.26641 7.92406 9.28048 7.90297C9.39331 7.73055 9.46177 7.53291 9.47976 7.32763C9.49775 7.12236 9.46472 6.91582 9.3836 6.7264V6.71703L7.72969 3.03031C7.62246 2.78286 7.43807 2.57673 7.20406 2.44268C6.97005 2.30864 6.69895 2.25387 6.43126 2.28656C5.37264 2.42586 4.40093 2.94575 3.69761 3.74914C2.99429 4.55252 2.60747 5.58444 2.60938 6.65219C2.60938 12.8553 7.65626 17.9022 13.8594 17.9022C14.9271 17.9041 15.9591 17.5173 16.7624 16.814C17.5658 16.1106 18.0857 15.1389 18.225 14.0803C18.2578 13.8127 18.2031 13.5417 18.0692 13.3077C17.9353 13.0737 17.7293 12.8892 17.482 12.7819ZM13.8594 16.6522C11.2081 16.6493 8.66625 15.5948 6.79151 13.7201C4.91678 11.8453 3.86228 9.30346 3.85938 6.65219C3.85644 5.88929 4.1313 5.1514 4.63261 4.57633C5.13393 4.00126 5.82743 3.62833 6.5836 3.52719C6.58329 3.5303 6.58329 3.53344 6.5836 3.53656L8.22423 7.20844L6.60938 9.14125C6.59299 9.16011 6.5781 9.18022 6.56485 9.2014C6.44728 9.38181 6.37832 9.58953 6.36463 9.80442C6.35094 10.0193 6.393 10.2341 6.48673 10.428C7.19454 11.8756 8.65313 13.3233 10.1164 14.0303C10.3117 14.1232 10.5277 14.1638 10.7434 14.1482C10.9591 14.1325 11.167 14.0613 11.3469 13.9412C11.3669 13.9277 11.3862 13.9131 11.4047 13.8975L13.3039 12.2772L16.9758 13.9217C16.9758 13.9217 16.982 13.9217 16.9844 13.9217C16.8845 14.679 16.5121 15.3739 15.9369 15.8764C15.3617 16.379 14.6232 16.6548 13.8594 16.6522Z" fill="#8A8D93" />
                        </svg>
                        <span className='dashboard-treatment-success-patients'>+91 8987656874</span>
                      </div>
                    </div>
                  </div>

                  <div className="patient-journey-up-icon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                      <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                    </svg>
                  </div>

                </div>
                <Row className='mt-3'>
                  <Col md={6}>
                    <span className='patient-treatment-box-subtitle mb-2'>Address</span>
                    <p className='patient-treatment-box-subtitle-desc w-75' >2nd Floor, Lakeview Complex,
                      Hiranandani Gardens, Powai,
                      400072 Mumbai</p>
                  </Col>
                  <Col md={6}>
                    <span className='patient-treatment-box-subtitle '>Availability</span>
                    <p className='patient-treatment-box-subtitle-desc m-0' >Mon to Fri: 10 AM – 5 PM </p>
                    <p className='patient-treatment-box-subtitle-desc m-0'>Sat & Sun 10 AM – 2 PM</p>

                  </Col>
                </Row>
              </div>
              <div className='treatment-steps-box clinic-details-box-background mb-3'>
                <div className='d-flex justify-content-between align-items-center'>
                  <div className='d-flex gap-2'>
                    {/* <Image src={ClinicImg} width={58} height={58} alt='clinic-img' className='rounded-circle' /> */}
                    <div className='d-flex flex-column'>
                      <div className='d-flex align-items-center gap-2'>

                        <h6 className='contact-details-heading m-0'>Sunrise Fertility</h6>
                        <span className='doctor-listing-modal-profile-subtitle '>Self</span>
                        {/* <Image src={MaiaVerified} width={120} height={20} alt='MaiaVerified' /> */}
                      </div>

                      <div className='d-flex align-items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                          <path d="M17.482 12.7819L13.8016 11.1327L13.7914 11.128C13.6003 11.0462 13.3919 11.0134 13.185 11.0325C12.978 11.0516 12.7791 11.122 12.6063 11.2373C12.5859 11.2508 12.5663 11.2654 12.5477 11.2811L10.6461 12.9022C9.44141 12.317 8.19766 11.0827 7.61251 9.89359L9.23594 7.96312C9.25157 7.94359 9.26641 7.92406 9.28048 7.90297C9.39331 7.73055 9.46177 7.53291 9.47976 7.32763C9.49775 7.12236 9.46472 6.91582 9.3836 6.7264V6.71703L7.72969 3.03031C7.62246 2.78286 7.43807 2.57673 7.20406 2.44268C6.97005 2.30864 6.69895 2.25387 6.43126 2.28656C5.37264 2.42586 4.40093 2.94575 3.69761 3.74914C2.99429 4.55252 2.60747 5.58444 2.60938 6.65219C2.60938 12.8553 7.65626 17.9022 13.8594 17.9022C14.9271 17.9041 15.9591 17.5173 16.7624 16.814C17.5658 16.1106 18.0857 15.1389 18.225 14.0803C18.2578 13.8127 18.2031 13.5417 18.0692 13.3077C17.9353 13.0737 17.7293 12.8892 17.482 12.7819ZM13.8594 16.6522C11.2081 16.6493 8.66625 15.5948 6.79151 13.7201C4.91678 11.8453 3.86228 9.30346 3.85938 6.65219C3.85644 5.88929 4.1313 5.1514 4.63261 4.57633C5.13393 4.00126 5.82743 3.62833 6.5836 3.52719C6.58329 3.5303 6.58329 3.53344 6.5836 3.53656L8.22423 7.20844L6.60938 9.14125C6.59299 9.16011 6.5781 9.18022 6.56485 9.2014C6.44728 9.38181 6.37832 9.58953 6.36463 9.80442C6.35094 10.0193 6.393 10.2341 6.48673 10.428C7.19454 11.8756 8.65313 13.3233 10.1164 14.0303C10.3117 14.1232 10.5277 14.1638 10.7434 14.1482C10.9591 14.1325 11.167 14.0613 11.3469 13.9412C11.3669 13.9277 11.3862 13.9131 11.4047 13.8975L13.3039 12.2772L16.9758 13.9217C16.9758 13.9217 16.982 13.9217 16.9844 13.9217C16.8845 14.679 16.5121 15.3739 15.9369 15.8764C15.3617 16.379 14.6232 16.6548 13.8594 16.6522Z" fill="#8A8D93" />
                        </svg>
                        <span className='dashboard-treatment-success-patients'>+91 8987656874</span>
                      </div>
                    </div>
                  </div>

                  <div className="patient-journey-up-icon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                      <path d="M21.3113 7.37845L17.1216 3.18971C16.9823 3.05038 16.8169 2.93986 16.6349 2.86446C16.4529 2.78905 16.2578 2.75024 16.0608 2.75024C15.8638 2.75024 15.6687 2.78905 15.4867 2.86446C15.3047 2.93986 15.1393 3.05038 15 3.18971L3.4397 14.75C3.2998 14.8888 3.18889 15.054 3.11341 15.236C3.03792 15.4181 2.99938 15.6133 3.00001 15.8103V20C3.00001 20.3978 3.15804 20.7794 3.43935 21.0607C3.72065 21.342 4.10218 21.5 4.50001 21.5H20.25C20.4489 21.5 20.6397 21.421 20.7803 21.2803C20.921 21.1397 21 20.9489 21 20.75C21 20.5511 20.921 20.3603 20.7803 20.2197C20.6397 20.079 20.4489 20 20.25 20H10.8113L21.3113 9.50002C21.4506 9.36072 21.5611 9.19535 21.6365 9.01334C21.7119 8.83133 21.7507 8.63625 21.7507 8.43924C21.7507 8.24222 21.7119 8.04714 21.6365 7.86513C21.5611 7.68312 21.4506 7.51775 21.3113 7.37845ZM8.6897 20H4.50001V15.8103L12.75 7.56033L16.9397 11.75L8.6897 20ZM18 10.6897L13.8113 6.50002L16.0613 4.25002L20.25 8.4397L18 10.6897Z" fill="#2B4360" />
                    </svg>
                  </div>

                </div>
                <Row className='mt-3'>
                  <Col md={6}>
                    <span className='patient-treatment-box-subtitle mb-2'>Address</span>
                    <p className='patient-treatment-box-subtitle-desc w-75' >2nd Floor, Lakeview Complex,
                      Hiranandani Gardens, Powai,
                      400072 Mumbai</p>
                  </Col>
                  <Col md={6}>
                    <span className='patient-treatment-box-subtitle '>Availability</span>
                    <p className='patient-treatment-box-subtitle-desc m-0' >Mon to Fri: 10 AM – 5 PM </p>
                    <p className='patient-treatment-box-subtitle-desc m-0'>Sat & Sun 10 AM – 2 PM</p>

                  </Col>
                </Row>
              </div>
            </ContentContainer>
          </div>


          {/* Qualification */}
          <div>
            <ContentContainer className='mt-4' >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="profile-card-main-titile">Qualification</h5>
                <Button onClick={handleOpen} className="profile-card-boeder profile-card-button bg-transparent" variant="outline">
                  {/* <Image src={Add} alt="Add" /> */}

                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 9C18 9.19891 17.921 9.38968 17.7803 9.53033C17.6397 9.67098 17.4489 9.75 17.25 9.75H9.75V17.25C9.75 17.4489 9.67098 17.6397 9.53033 17.7803C9.38968 17.921 9.19891 18 9 18C8.80109 18 8.61032 17.921 8.46967 17.7803C8.32902 17.6397 8.25 17.4489 8.25 17.25V9.75H0.75C0.551088 9.75 0.360322 9.67098 0.21967 9.53033C0.0790178 9.38968 0 9.19891 0 9C0 8.80109 0.0790178 8.61032 0.21967 8.46967C0.360322 8.32902 0.551088 8.25 0.75 8.25H8.25V0.75C8.25 0.551088 8.32902 0.360322 8.46967 0.21967C8.61032 0.0790178 8.80109 0 9 0C9.19891 0 9.38968 0.0790178 9.53033 0.21967C9.67098 0.360322 9.75 0.551088 9.75 0.75V8.25H17.25C17.4489 8.25 17.6397 8.32902 17.7803 8.46967C17.921 8.61032 18 8.80109 18 9Z" fill="#2B4360" />
                  </svg>

                </Button>


                <Modal
                  show={showModal}
                  onHide={handleClose}
                  dialogClassName="custom-modal-width"
                  header="Qualification Details"
                  centered
                >

                  <div>
                    {/* 🔁 Loop through all qualifications */}
                    <Accordion defaultActiveKey="0" alwaysOpen>
                      {qualifications.map((q, index) => (
                        <div key={index} className="mb-4"> {/* ← Add margin-bottom here for spacing */}
                          <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>
                              Qualification {index + 1}
                            </Accordion.Header>

                            <Accordion.Body>
                              <div className="position-relative pt-3 p-3 modal-border-dashed">

                                {/* ❌ Remove button - show only if NOT first item */}
                                {index !== 0 && (
                                  <button
                                    type="button"
                                    className="btn-close position-absolute profile-basic-details-remove-button"
                                    style={{ top: "10px", right: "10px" }}
                                    onClick={() => handleRemoveQualification(index)}
                                  />
                                )}

                                <Row>
                                  <Col md={6} className="mt-3">
                                    <InputFieldGroup
                                      label="Degree"
                                      name="degree"
                                      type="text"
                                      value={q.degree}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].degree = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].degree = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="Enter Degree"
                                      required={true}
                                      error={formErrors[index]?.degree}
                                    />
                                  </Col>

                                  <Col md={6} className="mt-3">
                                    <InputFieldGroup
                                      label="Field of study"
                                      name="field"
                                      type="text"
                                      value={q.fieldOfStudy}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].fieldOfStudy = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].fieldOfStudy = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="Select Field"
                                      required={true}
                                      error={formErrors[index]?.fieldOfStudy}
                                    />
                                  </Col>

                                  <Col md={12} className="mt-3">
                                    <InputFieldGroup
                                      label="University"
                                      name="university"
                                      type="text"
                                      value={q.university}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].university = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].university = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      placeholder="University"
                                      required={true}
                                      error={formErrors[index]?.university}
                                    />
                                  </Col>

                                  <Col md={6} className="mt-3">
                                    <InputSelect
                                      label="Start Year"
                                      name="startYear"
                                      value={q.startYear}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].startYear = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].startYear = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      required={true}
                                      error={formErrors[index]?.startYear}
                                      options={yearOptions}
                                    />
                                  </Col>

                                  <Col md={6} className="mt-3">
                                    <InputSelect
                                      label="End Year"
                                      name="endYear"
                                      value={q.endYear}
                                      onChange={(e) => {
                                        const updated = [...qualifications];
                                        updated[index].endYear = e.target.value;
                                        setQualifications(updated);

                                        const updatedErrors = [...formErrors];
                                        if (updatedErrors[index]) {
                                          updatedErrors[index].endYear = "";
                                        }
                                        setFormErrors(updatedErrors);
                                      }}
                                      required={true}
                                      error={formErrors[index]?.endYear}
                                      options={yearOptions.filter((year) => {
                                        if (!q.startYear) return true;
                                        return Number(year.value) >= Number(q.startYear) + 1;
                                      })}
                                    />
                                  </Col>
                                </Row>

                              </div>
                            </Accordion.Body>

                          </Accordion.Item>
                        </div>
                      ))}
                    </Accordion>


                  </div>

                  <div className="d-flex justify-content-between mt-4">
                    {/* Add Qualification Button */}
                    <Button onClick={handleAddQualification} variant='default'
                      disabled={
                        qualifications.length > 0 &&
                        !isQualificationComplete(qualifications[qualifications.length - 1])
                      }
                    >
                      + Add Qualification
                    </Button>

                    {/* Save Button */}
                    <Button onClick={handleSave} variant='default'>
                      Save
                    </Button>
                  </div>
                </Modal>



              </div>

              {defaultQualifications.length === 0 ? (
                <div className="text-center text-muted p-4 border rounded-4">
                  "Data not found. Please Add Data"
                </div>
              ) : (
                defaultQualifications.map((item, idx) => (

                  <div
                    key={idx}
                    className="d-flex justify-content-between align-items-start p-3 mb-3 bg-white border rounded-4 profile-card-boeder"
                  >
                    <div>
                      <div className="card-feild">{item.title}</div>
                      <div className="card-university-text">{item.university}</div>
                      <div className="card-year">{item.years}</div>
                    </div>


                    <div className="d-flex gap-2">

                      <Button onClick={() => openQualificationModal(idx)} className="border p-2 rounded-3 edit-del-btn  bg-transparent" variant='outline'>
                        <Image src={LightEditimg} alt="Specialization" width={18} height={18} />
                      </Button>


                      <Modal
                        show={showQualificationModal}
                        onHide={closeQualificationModal}
                        centered
                        dialogClassName="custom-modal-width"
                        header="Qualification Details"
                      >
                        <div>

                          <Row >
                            <Col md={6} className="mt-3">
                              <InputFieldGroup
                                label="Degree"
                                name="degree"
                                type="text"
                                value={formData.degree}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter degree"
                                required={true}
                                disabled={false}
                                readOnly={false}   // ✅ remove or set false
                                error={formError.degree}
                              />
                            </Col>


                            <Col md={6} className="mt-3">
                              <InputFieldGroup
                                label="Field of study"
                                name="field"
                                type="text"
                                value={formData.fieldOfStudy}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter field"
                                required={true}
                                disabled={false}
                                readOnly={false}   // ✅ remove or set false
                                error={formError.field}
                              />
                            </Col>

                            <Col md={12} className="mt-3">
                              <InputFieldGroup
                                label="University"
                                name="university"
                                type="text"
                                value={formData.university}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter university"
                                required={true}
                                disabled={false}
                                readOnly={false}   // ✅ remove or set false
                                error={formError.university}
                              />
                            </Col>


                            <Col md={6} className="mt-3">
                              <InputSelect
                                label="Start Year"
                                name="startYear"
                                value={formData.startYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                  handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.startYear}
                                options={yearOptions}
                              />
                            </Col>

                            <Col md={6} className="mt-3">
                              <InputSelect
                                label="End Year"
                                name="endYear"
                                value={formData.endYear}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                  handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.endYear}
                                options={yearOptions}
                              />
                            </Col>
                          </Row>


                          {/* Save Button */}
                          <Button onClick={handleEditSave} className="maiacare-button mt-4">
                            Save
                          </Button>

                        </div>

                      </Modal>






                      <Button className="border p-2 rounded-2 edit-del-btn  bg-transparent"
                        onClick={() => handleDelete(idx)} variant='outline' //click par delete
                      >
                        <Image src={Delete} alt="Specialization" width={18} height={18} />
                      </Button>

                    </div>
                  </div>
                ))
              )}


            </ContentContainer>

          </div>

        </Col>


        {/* ======RIGHT COLUMN =========== */}
        {/* About */}

        <Col xl={4} md={5}>
          <div>
            <ContentContainer className="mt-4">
              <h5 className="profile-card-main-titile">About</h5>
              <p className="mb-0 about-text" >
                I'm Dr. Riya Dharang, a fertility specialist with over 12 years of experience in reproductive medicine. I specialize in IVF, IUI, and fertility preservation, providing personalized, compassionate care to help individuals and couples achieve their parenthood dreams. Your well-being and trust are my top priorities.
              </p>
            </ContentContainer>
          </div>

          <ContentContainer className="mt-4">
            <h5 className="mb-4 profile-card-main-titile">Services Offered & Fee</h5>

            <span className="patient-treatment-box-subtitle">Services</span>
            <div className='d-flex gap-2 flex-wrap'>
              <div className='box-border-orange'>
                <span className='border-box-orange-font'>Fertility Support</span>
              </div>
              <div className='box-border-orange'>
                <span className='border-box-orange-font'>IUI</span>
              </div>
              <div className='box-border-orange'>
                <span className='border-box-orange-font'>IVF</span>
              </div>
              <div className='box-border-orange'>
                <span className='border-box-orange-font'>Egg Freezing</span>
              </div>
            </div>

          </ContentContainer>
          {/* Documents */}

          <ContentContainer className="mt-4">
            <div>
              <h5 className="mb-4 profile-card-main-titile">Documents</h5>

              {documents.map((doc, index) => (
                <div
                  className="d-flex justify-content-between align-items-center border profile-card-boeder p-3 mb-3 document-main-border"
                  key={index}
                >
                  <div className="d-flex align-items-center">
                    <Image
                      src={Pdfimg}
                      alt="pdf"
                      width="40"
                      className="me-3"
                    />
                    <div>
                      <div className="card-feild">{doc.name}</div>
                      <div className="card-year">{doc.date}</div>
                    </div>
                  </div>

                  <button
                    className="d-flex  bg-white justify-content-center align-items-center border profile-card-boeder rounded Download-border"
                    onClick={() => handleDownload(`/files/${doc.name}.pdf`, doc.name)}
                  >
                    <Image src={Download} alt="experience" width={25} height={25} />
                  </button>
                </div>
              ))}

            </div>

          </ContentContainer>

        </Col>
      </Row>
    </div>
    // </Container>
  );
};

export default ProfileBasicDetailsTabs;
