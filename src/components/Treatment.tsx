"use client"

import { useState } from "react";
import ContentContainer from "./ui/ContentContainer";
import CustomTabs from "./ui/CustomTabs";
import { All, IVF } from "./TreatmentHeaderComponent";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { TreatmentForm } from "./TreatmentForm";
import { MedicationPrescriptionType, TreatmentFertilityAssessmentFormType } from "@/utils/types/interfaces";
import { MedicationPrescriptionForm } from "./form/TreatmentPlanForm";
import { TreatmentSuccessModal } from "./form/TreatmentAllForm";
import ProfileImage from '@/assets/images/Profile_Image.png'
import { ProfileCard } from "./ui/Custom/ProfileCard";
import { Accordion, Col, Dropdown, Row } from "react-bootstrap";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { InputFieldGroup } from "./ui/InputField";
import { IVFProgressData, medicationPrescriptionData } from "@/utils/StaticData";
import toast from "react-hot-toast";
import { BsInfoCircle } from "react-icons/bs";
import TreatmentFertilityAssessment from "./TreatmentFertilityAssessment";

function Treatment() {

    const [activeTab, setActiveTab] = useState<string>("all");
    const [treatmentModel, setTreatmentModel] = useState<boolean>(false);
    const [successModal, setSuccessModal] = useState<boolean>(false);
    const [ivfProgressData, setIvfProgressData] = useState(IVFProgressData);

    const tabOptions = [
        {
            key: "all",
            label: "All",
            content: (
                <div className="mt-3">
                    <All />
                </div>
            ),
        },
        {
            key: "ivf",
            label: "IVF",
            content: (
                <div className="mt-3">
                    <IVF />
                </div>
            ),
        },
        {
            key: "iui",
            label: "IUI",
            content: (
                <div className="mt-3">
                    IUI components
                </div>
            ),
        },
        {
            key: "icsi",
            label: "ICSI",
            content: (
                <div className="mt-3">
                    ICSI components
                </div>
            ),
        },
        {
            key: "gamete freezing",
            label: "Gamete Freezing",
            content: (
                <div className="mt-3">
                    Gamete Freezing components
                </div>
            ),
        }
    ];

    const profileData = {
        name: "Rani Desai",
        image: ProfileImage.src,
        id: "PTS-874562",
        gender: "Female",
        dob: "7 Jan 1999",
        age: 31,
        joinDate: "7 Jan 2025",
        status: "Active" as const,
    };

    const [step, setStep] = useState<number | undefined>(1);
    const [stepper, setStepper] = useState<number | undefined>(1);
    const totalSteps = 3;

    const [medicalPrescription, setMedicalPrescription] = useState<MedicationPrescriptionType[]>([]);
    const [medicalPrescriptionDataShowHide, setMedicalPrescriptionDataShowHide] = useState<boolean>(false);
    const [showEditFormShowModel, setShowEditFormShowModel] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<MedicationPrescriptionType>({
        id: "",
        medicineName: "",
        type: "",
        typeQuantity: "",
        duration: "",
        quantity: 0,
        timeslot: ["morning"],
        meal: "Before",
        intake: "",
        description: "",
    });
    const [showContent, setShowContent] = useState<boolean>(true); // for show content
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStepName, setNewStepName] = useState("");
    const [newStepError, setNewStepError] = useState("");
    const [medicationPrescriptionwithProgress, setMedicationPrescriptionwithProgress] = useState<MedicationPrescriptionType[]>(medicationPrescriptionData);

    const [treatmentFertilityAssessmentModel, setTreatmentFertilityAssessmentModel] = useState<boolean>(false);

    const [treatmentFertilityAssessmentData, setTreatmentFertilityAssessmentData] = useState<TreatmentFertilityAssessmentFormType>({
        Patient: {
            ageAtFirstMenstruation: "",
            cycleLength: "",
            periodLength: "",
            date: "",
            isCycleRegular: "Regular",
            menstrualIssues: "yes",
            pregnancy: "yes",
            timeduration: "",
            ectopicpregnancy: "yes"
        },

        Partner: {

        }
    });

    const getStatusBadgeClass = (status: string) => {
        switch (status) {
            case 'Success':
                return 'patient-journey-badge-success';
            case 'Pending':
                return 'patient-journey-badge-pending';
            case 'In Progress':
                return 'patient-journey-badge-InProgress';
            default:
                return 'badge bg-secondary';
        }
    };

    const handleSaveStep = () => {
        if (!newStepName.trim()) {
            setNewStepError("Step name is required");
            return;
        }

        const newStep = {
            id: ivfProgressData.length + 1,
            title: newStepName,
            status: "Pending" as const,
        };

        setIvfProgressData([...ivfProgressData, newStep]);
        setNewStepName("");
        setIsAddingStep(false);
        toast.success('Step added', {
            icon: <BsInfoCircle size={22} color="white" />,
        });
    };

    return (
        <>
            {showContent ? (
                <>
                    <ProfileCard
                        name={profileData.name}
                        image={profileData.image}
                        id={profileData.id}
                        gender={profileData.gender}
                        dob={profileData.dob}
                        age={profileData.age}
                        joinDate={profileData.joinDate}
                        status={profileData.status}
                    />

                    <Row className="g-3 mt-0">
                        <Col lg={5}>
                            <ContentContainer>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h6 className="accordion-title m-0">IVF progress</h6>
                                    <Dropdown align="end" className="d-flex align-items-center">
                                        <Dropdown.Toggle
                                            as="button"
                                            id="dropdown-basic"
                                            className="bg-transparent border-0 p-1 no-caret"
                                        >
                                            <div className='patient-profile-dot'>

                                                <HiOutlineDotsHorizontal />
                                            </div>
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className="dots-open">
                                            <Dropdown.Item className="no-hover">
                                                <div className="d-flex align-items-center gap-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 14 14" fill="none">
                                                        <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                                    </svg>
                                                    <span className="settings-accordion-subtitle m-0" onClick={() => { console.log("call model") }}>Edit</span>
                                                </div>
                                            </Dropdown.Item>
                                            <Dropdown.Item className="no-hover">
                                                <div className="d-flex align-items-center gap-2 ">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                        <path d="M11.4018 10.4735C11.5251 10.5968 11.5943 10.764 11.5943 10.9383C11.5943 11.1127 11.5251 11.2799 11.4018 11.4032C11.2785 11.5265 11.1113 11.5957 10.9369 11.5957C10.7626 11.5957 10.5954 11.5265 10.4721 11.4032L6.99998 7.92997L3.52677 11.4021C3.40349 11.5254 3.23628 11.5946 3.06193 11.5946C2.88758 11.5946 2.72037 11.5254 2.59709 11.4021C2.4738 11.2788 2.40454 11.1116 2.40454 10.9372C2.40454 10.7629 2.4738 10.5957 2.59709 10.4724L6.07029 7.00028L2.59818 3.52708C2.4749 3.40379 2.40563 3.23658 2.40563 3.06223C2.40563 2.88788 2.4749 2.72067 2.59818 2.59739C2.72146 2.4741 2.88867 2.40484 3.06302 2.40484C3.23737 2.40484 3.40458 2.4741 3.52787 2.59739L6.99998 6.07059L10.4732 2.59684C10.5965 2.47356 10.7637 2.4043 10.938 2.4043C11.1124 2.4043 11.2796 2.47356 11.4029 2.59684C11.5262 2.72013 11.5954 2.88733 11.5954 3.06169C11.5954 3.23604 11.5262 3.40324 11.4029 3.52653L7.92966 7.00028L11.4018 10.4735Z" fill="#E85966" />
                                                    </svg>
                                                    <span className="appoiment-dots-open-danger m-0" onClick={() => { console.log("call model") }}>Terminate</span>
                                                </div>
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>

                                {ivfProgressData.map((item, index) => {
                                    const isLastItem = index === ivfProgressData.length - 1;

                                    return (
                                        <>
                                            <div
                                                className={`position-relative ${!isLastItem ? 'patient-journey-box-wrapper' : ''}`}
                                                key={item.id}>
                                                <div className={`patient-journey-box shadow-sm ms-5 mb-3  ${item.status == "Success" ? 'patient-journey-success-box' : 'patient-journey-other-box'} `} key={item.id}>
                                                    <div className="patient-journey-box-item d-flex align-items-start justify-content-between">
                                                        <div>
                                                            <h6 className="doctor-listing-modal-patient-name mb-1">{item.title}</h6>
                                                            {(item.date || item.time) && <p className="patient-journey-box-subtitle mb-0">{item.date} , {item.time}</p>}
                                                            {item.Complete && <span className="ivf-progress-completed">{item.Complete}% Completed</span>}

                                                        </div>
                                                        <div>
                                                            <span className={getStatusBadgeClass(item.status)}>{item.status}</span>
                                                        </div>
                                                    </div>

                                                    <div className="position-absolute start-0 patient-journey-dot">
                                                        {item.status == "Success" ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <g filter="url(#filter0_d_2106_90109)">
                                                                    <rect x="2.16406" y="1.33984" width="24" height="24" rx="12" fill="white" />
                                                                    <rect x="2.66406" y="1.83984" width="23" height="23" rx="11.5" stroke="#DDE1E8" />
                                                                    <circle cx="14.1641" cy="13.3398" r="4" fill="#2ECF98" />
                                                                </g>
                                                                <defs>
                                                                    <filter id="filter0_d_2106_90109" x="0.164062" y="0.339844" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                        <feOffset dy="1" />
                                                                        <feGaussianBlur stdDeviation="1" />
                                                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
                                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2106_90109" />
                                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2106_90109" result="shape" />
                                                                    </filter>
                                                                </defs>
                                                            </svg>
                                                        ) : item.status == "In Progress" ? (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <g filter="url(#filter0_d_2290_224549)">
                                                                    <rect x="2.50317" y="1.70312" width="24" height="24" rx="12" fill="white" />
                                                                    <rect x="3.00317" y="2.20312" width="23" height="23" rx="11.5" stroke="#DDE1E8" />
                                                                    <circle cx="14.5032" cy="13.7031" r="4" fill="#F4C47E" />
                                                                </g>
                                                                <defs>
                                                                    <filter id="filter0_d_2290_224549" x="0.503174" y="0.703125" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                        <feOffset dy="1" />
                                                                        <feGaussianBlur stdDeviation="1" />
                                                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
                                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2290_224549" />
                                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2290_224549" result="shape" />
                                                                    </filter>
                                                                </defs>
                                                            </svg>
                                                        ) : (
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                                                                <g filter="url(#filter0_d_2290_224554)">
                                                                    <rect x="2.50317" y="1.70312" width="24" height="24" rx="12" fill="white" />
                                                                    <rect x="3.00317" y="2.20312" width="23" height="23" rx="11.5" stroke="#DDE1E8" />
                                                                    <circle cx="14.5032" cy="13.7031" r="4" fill="#DDE1E8" />
                                                                </g>
                                                                <defs>
                                                                    <filter id="filter0_d_2290_224554" x="0.503174" y="0.703125" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                                        <feOffset dy="1" />
                                                                        <feGaussianBlur stdDeviation="1" />
                                                                        <feColorMatrix type="matrix" values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0" />
                                                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2290_224554" />
                                                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2290_224554" result="shape" />
                                                                    </filter>
                                                                </defs>
                                                            </svg>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })}

                                {/* Add new step form */}
                                {isAddingStep ? (
                                    <div className="position-relative patient-journey-add-steps-box-wrapper">
                                        <div className="patient-journey-box shadow-sm ms-5 mb-3 patient-journey-other-box">

                                            <InputFieldGroup
                                                label="Treatment Steps"
                                                name="treatmentSteps"
                                                type="text"
                                                value={newStepName}
                                                onChange={(e) => { setNewStepName(e.target.value); setNewStepError("") }}
                                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                                placeholder="Enter treament steps"
                                                required={true}
                                                disabled={false}
                                                readOnly={false}
                                                error={newStepError}
                                            />

                                            <div className="d-flex gap-2 mt-3">
                                                <Button variant="outline" className="w-100" onClick={() => { setIsAddingStep(false); setNewStepName(""); setNewStepError(""); }} >
                                                    Cancel
                                                </Button>
                                                <Button variant="default" className="w-100" type="submit" onClick={handleSaveStep} >
                                                    Save
                                                </Button>
                                            </div>

                                            <div className="position-absolute start-0 patient-journey-dot-add-steps">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="29"
                                                    height="29"
                                                    viewBox="0 0 29 29"
                                                    fill="none"
                                                >
                                                    <g filter="url(#filter0_d_2290_224554)">
                                                        <rect
                                                            x="2.50317"
                                                            y="1.70312"
                                                            width="24"
                                                            height="24"
                                                            rx="12"
                                                            fill="white"
                                                        />
                                                        <rect
                                                            x="3.00317"
                                                            y="2.20312"
                                                            width="23"
                                                            height="23"
                                                            rx="11.5"
                                                            stroke="#DDE1E8"
                                                        />
                                                        <circle cx="14.5032" cy="13.7031" r="4" fill="#DDE1E8" />
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Button variant="default" type="submit" className="mt-3" onClick={() => setIsAddingStep(true)}>
                                        <div className="d-flex justify-content-center align-items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                    fill="#FFFFFF" />
                                            </svg>
                                            Add New Step
                                        </div>
                                    </Button>
                                )}

                            </ContentContainer>
                        </Col>
                        <Col lg={7}>
                            <ContentContainer>
                                <h6 className="accordion-title m-0">Progress Updates</h6>
                                <div className="progressUpdates-border-box mt-3">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <div className="d-flex gap-2">
                                                <h6 className="doctor-listing-modal-profile-title m-0">Fertility Assessment</h6>
                                                <span className="patient-journey-badge-InProgress">In Progress</span>
                                            </div>
                                            <p className="patient-journey-box-subtitle m-0">09 Jul 2024 , 12:11 PM</p>
                                        </div>
                                        <Button variant="outline" contentSize="small" onClick={() => { }}>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                    <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                                </svg>
                                                Edit
                                            </div>
                                        </Button>
                                    </div>

                                    <div className="progressUpdates-border-box text-center mt-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="64" viewBox="0 0 65 64" fill="none">
                                            <path d="M59.748 31.7903C58.778 30.3103 58.768 28.3903 59.728 26.9003L59.758 26.8603C61.918 23.5103 60.438 19.0203 56.708 17.6103H56.678C55.008 16.9703 53.878 15.4103 53.788 13.6303V13.5803C53.588 9.58029 49.738 6.80029 45.878 7.86029C44.168 8.33029 42.338 7.74029 41.218 6.37029L41.168 6.31029C38.658 3.22029 33.938 3.23029 31.448 6.33029L31.408 6.39029C30.298 7.77029 28.478 8.36029 26.768 7.90029L26.708 7.88029C22.848 6.84029 19.018 9.64029 18.838 13.6303V13.6603C18.758 15.4403 17.628 17.0003 15.958 17.6403H15.928C12.198 19.0803 10.738 23.5903 12.928 26.9303C13.898 28.4103 13.908 30.3303 12.948 31.8203L12.918 31.8603C10.758 35.2103 12.238 39.7003 15.968 41.1103H15.998C17.668 41.7503 18.798 43.3103 18.888 45.0903V45.1403C19.088 49.1403 22.938 51.9203 26.798 50.8603C28.508 50.3903 30.338 50.9803 31.458 52.3503L31.508 52.4103C34.018 55.5003 38.738 55.4903 41.228 52.3903L41.268 52.3303C42.378 50.9503 44.198 50.3603 45.908 50.8203L45.968 50.8403C49.828 51.8803 53.658 49.0803 53.838 45.0903V45.0603C53.918 43.2803 55.048 41.7203 56.718 41.0803H56.748C60.478 39.6403 61.938 35.1303 59.748 31.7903Z" fill="#B0B4C1" />
                                            <path d="M36.3279 47.0499C46.0979 47.0499 54.0179 39.1298 54.0179 29.3599C54.0179 19.59 46.0979 11.6699 36.3279 11.6699C26.558 11.6699 18.6379 19.59 18.6379 29.3599C18.6379 39.1298 26.558 47.0499 36.3279 47.0499Z" fill="#DDE1E8" />
                                            <path d="M41.7479 28.5096C44.4265 28.5096 46.5979 26.3382 46.5979 23.6596C46.5979 20.981 44.4265 18.8096 41.7479 18.8096C39.0694 18.8096 36.8979 20.981 36.8979 23.6596C36.8979 26.3382 39.0694 28.5096 41.7479 28.5096Z" fill="#B0B4C1" />
                                            <path d="M35.6381 17.1904H34.2481C33.6981 17.1904 33.2481 16.7404 33.2481 16.1904C33.2481 15.6404 33.6981 15.1904 34.2481 15.1904H35.6381C36.1881 15.1904 36.6381 15.6404 36.6381 16.1904C36.6381 16.7404 36.1881 17.1904 35.6381 17.1904ZM28.7581 21.0504H27.3681C26.8181 21.0504 26.3681 20.6004 26.3681 20.0504C26.3681 19.5004 26.8181 19.0504 27.3681 19.0504H28.7581C29.3081 19.0504 29.7581 19.5004 29.7581 20.0504C29.7581 20.6004 29.3081 21.0504 28.7581 21.0504ZM32.7481 26.8104H31.3581C30.8081 26.8104 30.3581 26.3604 30.3581 25.8104C30.3581 25.2604 30.8081 24.8104 31.3581 24.8104H32.7481C33.2981 24.8104 33.7481 25.2604 33.7481 25.8104C33.7481 26.3604 33.2981 26.8104 32.7481 26.8104ZM24.4281 29.5204H23.0381C22.4881 29.5204 22.0381 29.0704 22.0381 28.5204C22.0381 27.9704 22.4881 27.5204 23.0381 27.5204H24.4281C24.9781 27.5204 25.4281 27.9704 25.4281 28.5204C25.4281 29.0704 24.9781 29.5204 24.4281 29.5204ZM41.2381 42.8604H39.8481C39.2981 42.8604 38.8481 42.4104 38.8481 41.8604C38.8481 41.3104 39.2981 40.8604 39.8481 40.8604H41.2381C41.7881 40.8604 42.2381 41.3104 42.2381 41.8604C42.2381 42.4104 41.7881 42.8604 41.2381 42.8604ZM43.5281 35.6404H42.1381C41.5881 35.6404 41.1381 35.1904 41.1381 34.6404C41.1381 34.0904 41.5881 33.6404 42.1381 33.6404H43.5281C44.0781 33.6404 44.5281 34.0904 44.5281 34.6404C44.5281 35.1904 44.0781 35.6404 43.5281 35.6404ZM50.7081 30.3604H49.3181C48.7681 30.3604 48.3181 29.9104 48.3181 29.3604C48.3181 28.8104 48.7681 28.3604 49.3181 28.3604H50.7081C51.2581 28.3604 51.7081 28.8104 51.7081 29.3604C51.7081 29.9104 51.2581 30.3604 50.7081 30.3604Z" fill="#B0B4C1" />
                                            <path d="M35.1381 31.3099C33.0181 29.1899 26.7481 32.0399 24.6281 34.1499C23.0881 35.6899 22.6881 37.9199 23.3781 39.8299H23.2881C23.0281 40.5099 22.6581 41.1299 22.0981 41.5999C20.8081 42.6799 19.3681 43.3399 18.0881 43.9199C16.4881 44.6399 15.1081 45.2699 14.5681 46.4799C14.3581 46.9499 13.9581 48.1799 13.5581 49.3599C12.8781 51.3999 12.1881 53.4999 11.7281 54.2599C11.1081 55.2899 9.67807 56.0199 8.16807 56.7899C6.84807 57.4599 4.62807 58.5899 4.73807 59.5099C4.73807 59.5399 4.74807 59.5999 4.85807 59.7499C7.79807 60.6799 13.2381 58.9299 14.7081 57.3699C15.2781 56.7599 16.1481 54.4799 16.8381 52.6399C17.5381 50.7899 18.1381 49.1999 18.6781 48.4499C19.4281 47.3999 20.9681 46.7799 22.5881 46.1299C23.7581 45.6599 24.9481 45.1899 25.8781 44.5399C26.2681 44.2699 26.5381 43.8199 26.7381 43.2799L26.7081 43.0999C28.5981 43.7399 30.7781 43.3299 32.2781 41.8199C34.3981 39.6999 37.2381 33.4299 35.1181 31.3199L35.1381 31.3099Z" fill="#9296A3" />
                                        </svg>
                                        <p className="medication-prescription-accordion-subtitle mb-2">No fertility assessment</p>
                                        <Button variant="default" type="submit" contentSize="small" onClick={() => { setTreatmentFertilityAssessmentModel(true); }}>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                        fill="#FFFFFF" />
                                                </svg>
                                                Start Assesment
                                            </div>
                                        </Button>

                                        <Modal
                                            show={treatmentFertilityAssessmentModel}
                                            onHide={() => { setTreatmentFertilityAssessmentModel(false); }}
                                            header="Fertility Assessment"
                                            closeButton={true}
                                        >
                                            <TreatmentFertilityAssessment setTreatmentFertilityAssessmentData={setTreatmentFertilityAssessmentData} />

                                        </Modal>
                                    </div>
                                    <div>
                                        <h6 className="patient-treatment-box-subtitle my-2">Medication</h6>
                                        <Accordion >
                                            <Row className="g-3">
                                                {medicationPrescriptionwithProgress?.map((item, index) => {

                                                    return (
                                                        <Col md={6}>
                                                            <Accordion.Item eventKey={index.toString()} className='medication-prescription-accordion-item-main mb-3' key={index}>
                                                                <Accordion.Header className='phisical-assessment-accordion-title-showData'>

                                                                    <div className='d-flex align-items-center gap-3'>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                                                            <rect x="0.904297" width="44" height="44" rx="6" fill="#FBEFEB" />
                                                                            <path d="M34.1114 11.2954C32.9019 10.0859 31.2615 9.40643 29.551 9.40643C27.8405 9.40643 26.2001 10.0859 24.9906 11.2954L12.6996 23.5852C11.5154 24.7998 10.8575 26.4322 10.8683 28.1285C10.8791 29.8249 11.5579 31.4486 12.7575 32.6481C13.9571 33.8475 15.5809 34.5261 17.2773 34.5367C18.9736 34.5473 20.6059 33.8891 21.8204 32.7048L34.1126 20.4149C35.3201 19.2045 35.9981 17.5646 35.9978 15.8549C35.9976 14.1452 35.3192 12.5055 34.1114 11.2954ZM20.4508 31.3352C19.6047 32.1814 18.4571 32.6569 17.2604 32.657C16.0637 32.6572 14.916 32.1819 14.0698 31.3358C13.2235 30.4897 12.748 29.3421 12.7479 28.1454C12.7478 26.9487 13.2231 25.801 14.0692 24.9547L19.5293 19.4946L25.9109 25.8751L20.4508 31.3352ZM32.7418 19.0454L27.2793 24.5055L20.9001 18.1251L26.3614 12.6649C27.2108 11.8351 28.3532 11.3736 29.5407 11.3806C30.7282 11.3875 31.8651 11.8623 32.7048 12.702C33.5445 13.5417 34.0193 14.6786 34.0262 15.8661C34.0331 17.0536 33.5717 18.1959 32.7418 19.0454ZM30.8734 16.4709C30.9634 16.5609 31.0349 16.6677 31.0836 16.7853C31.1324 16.9029 31.1575 17.029 31.1575 17.1563C31.1575 17.2836 31.1324 17.4097 31.0836 17.5273C31.0349 17.6449 30.9634 17.7517 30.8734 17.8417L27.9671 20.748C27.8771 20.8379 27.7703 20.9092 27.6527 20.9578C27.5351 21.0065 27.4091 21.0315 27.2819 21.0314C27.1547 21.0314 27.0287 21.0062 26.9112 20.9575C26.7936 20.9088 26.6869 20.8374 26.5969 20.7473C26.507 20.6573 26.4357 20.5505 26.387 20.4329C26.3384 20.3154 26.3134 20.1894 26.3135 20.0621C26.3135 19.9349 26.3386 19.8089 26.3874 19.6914C26.4361 19.5739 26.5075 19.4671 26.5975 19.3772L29.5038 16.4709C29.6854 16.2894 29.9317 16.1874 30.1886 16.1874C30.4454 16.1874 30.6917 16.2894 30.8734 16.4709Z" fill="#E29578" />
                                                                        </svg>
                                                                        <div className="d-flex flex-column hap-2">
                                                                            <p className=".treatment-steps-box-item m-0">{item.medicineName}</p>
                                                                            <p className="medication-prescription-accordion-subtitle m-0">
                                                                                {item.typeQuantity} | {item.type} | Twice a day

                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </Accordion.Header>
                                                                <Accordion.Body className='pt-0'>
                                                                    <div className="d-flex flex-column gap-3">
                                                                        <div className="d-flex gap-3">
                                                                            <p className="medication-prescription-accordion-item m-0">Duration - {item.duration} Days </p>
                                                                            <p className="medication-prescription-accordion-item m-0">Meal - {item.meal} </p>

                                                                        </div>
                                                                        <div className="medication-prescription-accordion-hr-row"></div>
                                                                        <div className="d-flex align-items-center gap-3">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                <path d="M8.4043 2.5V1C8.4043 0.867392 8.45698 0.740215 8.55074 0.646447C8.64451 0.552678 8.77169 0.5 8.9043 0.5C9.03691 0.5 9.16408 0.552678 9.25785 0.646447C9.35162 0.740215 9.4043 0.867392 9.4043 1V2.5C9.4043 2.63261 9.35162 2.75979 9.25785 2.85355C9.16408 2.94732 9.03691 3 8.9043 3C8.77169 3 8.64451 2.94732 8.55074 2.85355C8.45698 2.75979 8.4043 2.63261 8.4043 2.5ZM8.9043 4C8.11317 4 7.33981 4.2346 6.68202 4.67412C6.02422 5.11365 5.51153 5.73836 5.20878 6.46927C4.90603 7.20017 4.82681 8.00444 4.98116 8.78036C5.1355 9.55628 5.51646 10.269 6.07587 10.8284C6.63528 11.3878 7.34801 11.7688 8.12394 11.9231C8.89986 12.0775 9.70413 11.9983 10.435 11.6955C11.1659 11.3928 11.7906 10.8801 12.2302 10.2223C12.6697 9.56448 12.9043 8.79113 12.9043 8C12.9031 6.93949 12.4813 5.92275 11.7314 5.17285C10.9816 4.42296 9.96481 4.00116 8.9043 4ZM4.55055 4.35375C4.64437 4.44757 4.77161 4.50028 4.9043 4.50028C5.03698 4.50028 5.16423 4.44757 5.25805 4.35375C5.35187 4.25993 5.40457 4.13268 5.40457 4C5.40457 3.86732 5.35187 3.74007 5.25805 3.64625L4.25805 2.64625C4.16423 2.55243 4.03698 2.49972 3.9043 2.49972C3.77161 2.49972 3.64437 2.55243 3.55055 2.64625C3.45673 2.74007 3.40402 2.86732 3.40402 3C3.40402 3.13268 3.45673 3.25993 3.55055 3.35375L4.55055 4.35375ZM4.55055 11.6462L3.55055 12.6462C3.45673 12.7401 3.40402 12.8673 3.40402 13C3.40402 13.1327 3.45673 13.2599 3.55055 13.3538C3.64437 13.4476 3.77161 13.5003 3.9043 13.5003C4.03698 13.5003 4.16423 13.4476 4.25805 13.3538L5.25805 12.3538C5.3045 12.3073 5.34135 12.2521 5.36649 12.1914C5.39163 12.1308 5.40457 12.0657 5.40457 12C5.40457 11.9343 5.39163 11.8692 5.36649 11.8086C5.34135 11.7479 5.3045 11.6927 5.25805 11.6462C5.21159 11.5998 5.15644 11.5629 5.09575 11.5378C5.03505 11.5127 4.96999 11.4997 4.9043 11.4997C4.8386 11.4997 4.77355 11.5127 4.71285 11.5378C4.65215 11.5629 4.597 11.5998 4.55055 11.6462ZM12.9043 4.5C12.97 4.50005 13.035 4.48716 13.0957 4.46207C13.1564 4.43697 13.2116 4.40017 13.258 4.35375L14.258 3.35375C14.3519 3.25993 14.4046 3.13268 14.4046 3C14.4046 2.86732 14.3519 2.74007 14.258 2.64625C14.1642 2.55243 14.037 2.49972 13.9043 2.49972C13.7716 2.49972 13.6444 2.55243 13.5505 2.64625L12.5505 3.64625C12.4805 3.71618 12.4329 3.8053 12.4135 3.90235C12.3942 3.99939 12.4041 4.09998 12.442 4.1914C12.4799 4.28281 12.544 4.36092 12.6263 4.41586C12.7086 4.4708 12.8053 4.50008 12.9043 4.5ZM13.258 11.6462C13.1642 11.5524 13.037 11.4997 12.9043 11.4997C12.7716 11.4997 12.6444 11.5524 12.5505 11.6462C12.4567 11.7401 12.404 11.8673 12.404 12C12.404 12.1327 12.4567 12.2599 12.5505 12.3538L13.5505 13.3538C13.597 13.4002 13.6522 13.4371 13.7128 13.4622C13.7735 13.4873 13.8386 13.5003 13.9043 13.5003C13.97 13.5003 14.035 13.4873 14.0957 13.4622C14.1564 13.4371 14.2116 13.4002 14.258 13.3538C14.3045 13.3073 14.3414 13.2521 14.3665 13.1914C14.3916 13.1308 14.4046 13.0657 14.4046 13C14.4046 12.9343 14.3916 12.8692 14.3665 12.8086C14.3414 12.7479 14.3045 12.6927 14.258 12.6462L13.258 11.6462ZM3.9043 8C3.9043 7.86739 3.85162 7.74021 3.75785 7.64645C3.66408 7.55268 3.53691 7.5 3.4043 7.5H1.9043C1.77169 7.5 1.64451 7.55268 1.55074 7.64645C1.45698 7.74021 1.4043 7.86739 1.4043 8C1.4043 8.13261 1.45698 8.25979 1.55074 8.35355C1.64451 8.44732 1.77169 8.5 1.9043 8.5H3.4043C3.53691 8.5 3.66408 8.44732 3.75785 8.35355C3.85162 8.25979 3.9043 8.13261 3.9043 8ZM8.9043 13C8.77169 13 8.64451 13.0527 8.55074 13.1464C8.45698 13.2402 8.4043 13.3674 8.4043 13.5V15C8.4043 15.1326 8.45698 15.2598 8.55074 15.3536C8.64451 15.4473 8.77169 15.5 8.9043 15.5C9.03691 15.5 9.16408 15.4473 9.25785 15.3536C9.35162 15.2598 9.4043 15.1326 9.4043 15V13.5C9.4043 13.3674 9.35162 13.2402 9.25785 13.1464C9.16408 13.0527 9.03691 13 8.9043 13ZM15.9043 7.5H14.4043C14.2717 7.5 14.1445 7.55268 14.0507 7.64645C13.957 7.74021 13.9043 7.86739 13.9043 8C13.9043 8.13261 13.957 8.25979 14.0507 8.35355C14.1445 8.44732 14.2717 8.5 14.4043 8.5H15.9043C16.0369 8.5 16.1641 8.44732 16.2579 8.35355C16.3516 8.25979 16.4043 8.13261 16.4043 8C16.4043 7.86739 16.3516 7.74021 16.2579 7.64645C16.1641 7.55268 16.0369 7.5 15.9043 7.5Z" fill="#B0B4C1" />
                                                                            </svg>
                                                                            <p className="medication-prescription-accordion-item m-0">Morning - 1 Tab</p>
                                                                        </div>
                                                                        <div className="medication-prescription-accordion-hr-row"></div>
                                                                        <div className="d-flex align-items-center gap-3">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                                <path d="M15.6256 9.38814C15.2218 10.7062 14.4126 11.8634 13.3131 12.695C12.3477 13.4216 11.199 13.8647 9.99585 13.9746C8.79267 14.0846 7.58266 13.857 6.50163 13.3175C5.4206 12.7779 4.51134 11.9478 3.87591 10.9202C3.24049 9.89257 2.90403 8.70821 2.90433 7.50001C2.89998 6.0898 3.35843 4.7171 4.20933 3.59251C5.04091 2.49301 6.19809 1.68379 7.5162 1.28001C7.60308 1.25326 7.6956 1.2507 7.78382 1.27261C7.87204 1.29451 7.95262 1.34004 8.0169 1.40432C8.08117 1.4686 8.12671 1.54918 8.14861 1.6374C8.17051 1.72562 8.16795 1.81814 8.1412 1.90501C7.85298 2.85841 7.82881 3.87214 8.07128 4.83818C8.31375 5.80422 8.81376 6.68639 9.51805 7.39067C10.2223 8.09496 11.1045 8.59497 12.0705 8.83744C13.0366 9.0799 14.0503 9.05574 15.0037 8.76751C15.0906 8.74076 15.1831 8.7382 15.2713 8.76011C15.3595 8.78201 15.4401 8.82754 15.5044 8.89182C15.5687 8.9561 15.6142 9.03668 15.6361 9.1249C15.658 9.21312 15.6555 9.30564 15.6287 9.39251L15.6256 9.38814Z" fill="#B0B4C1" />
                                                                            </svg>
                                                                            <p className="medication-prescription-accordion-item m-0">Night - 1 Tab</p>
                                                                        </div>
                                                                    </div>

                                                                    <Button className='mt-3' variant="outline" disabled={false} contentSize="small" onClick={() => { }}>
                                                                        <svg width="16" height="16" viewBox="0 0 14 14" className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                                                        </svg>
                                                                        Edit
                                                                    </Button>

                                                                </Accordion.Body>
                                                            </Accordion.Item>

                                                        </Col>
                                                    )
                                                })}
                                            </Row>
                                        </Accordion>
                                    </div>

                                    <div>
                                        <h6 className="patient-treatment-box-subtitle my-2">Test Reports</h6>
                                        <Button variant="outline" type="submit" contentSize="small" onClick={() => { }}>
                                            <div className="d-flex justify-content-center align-items-center gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                    <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                                        fill="#2B4360" />
                                                </svg>
                                                Add Reports
                                            </div>
                                        </Button>
                                    </div>

                                    <div>
                                        <h6 className="patient-treatment-box-subtitle mt-3 mb-2">Test Reports</h6>

                                        <p className="patient-treatment-box-subtitle-desc m-0">Cycle is normal, no fertility related issue</p>
                                    </div>
                                </div>
                            </ContentContainer>
                        </Col>
                    </Row>
                </>

            ) : (

                <>
                    <div className="position-relative">
                        <CustomTabs
                            className="w-50"
                            activeKey={activeTab}
                            setActiveKey={setActiveTab}
                            tabOptions={tabOptions}
                        />

                        <div className="position-absolute top-0 end-0">
                            <Button variant="default" type="submit" onClick={() => {
                                setTreatmentModel(true);
                            }}>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z"
                                            fill="#FFFFFF" />
                                    </svg>
                                    Add Treatment
                                </div>
                            </Button>
                        </div>
                    </div>

                    <Modal
                        show={treatmentModel}
                        onHide={() => { setTreatmentModel(false); setStep(1); setStepper(1); setMedicalPrescription([]); }}
                        header="Treatment Plan"
                        closeButton={true}
                    >
                        <TreatmentForm
                            setStep={setStep}
                            setStepper={setStepper}
                            step={step}
                            stepper={stepper}
                            totalSteps={totalSteps}

                            medicalPrescription={medicalPrescription}
                            setMedicalPrescription={setMedicalPrescription}
                            medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
                            setMedicalPrescriptionDataShowHide={setMedicalPrescriptionDataShowHide}
                            showEditFormShowModel={showEditFormShowModel}
                            setShowEditFormShowModel={setShowEditFormShowModel}

                            setTreatmentPlanModel={setTreatmentModel}
                            setEditForm={setEditForm}
                            editForm={editForm}
                            setSuccessModal={setSuccessModal}
                        />

                    </Modal>

                    {/* edittime show model for Medication & Tests */}
                    <Modal
                        show={showEditFormShowModel}
                        onHide={() => { setShowEditFormShowModel(false); setTreatmentModel(true); setMedicalPrescriptionDataShowHide(false); }}
                        header="Edit Medication Prescription"
                        closeButton={true}
                    >
                        <MedicationPrescriptionForm
                            setShowEditFormShowModel={setShowEditFormShowModel}
                            editForm={editForm}
                            setTreatmentPlanModel={setTreatmentModel}
                            setMedicalPrescription={setMedicalPrescription}
                            medicalPrescription={medicalPrescription}
                            setMedicalPrescriptionDataShowHide={setMedicalPrescriptionDataShowHide}
                            medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
                        />
                    </Modal>

                    {/* success modal */}
                    <TreatmentSuccessModal
                        successModal={successModal}
                        setSuccessModal={setSuccessModal}
                        setStep={setStep}
                        setStepper={setStepper}
                        setMedicalPrescription={setMedicalPrescription}
                        setShowContent={setShowContent}
                    />
                </>
            )}

        </>
    )
}

export default Treatment
