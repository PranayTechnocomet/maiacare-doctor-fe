"use client"

import { useState } from "react";
import ContentContainer from "./ui/ContentContainer";
import CustomTabs from "./ui/CustomTabs";
import { All, IVF } from "./TreatmentHeaderComponent";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { TreatmentForm } from "./TreatmentForm";
import { MedicationPrescriptionType } from "@/utils/types/interfaces";
import { MedicationPrescriptionForm } from "./form/TreatmentPlanForm";
import { TreatmentSuccessModal } from "./form/TreatmentAllForm";
import ProfileImage from '@/assets/images/Profile_Image.png'
import { ProfileCard } from "./ui/Custom/ProfileCard";
import { Col, Dropdown, Row } from "react-bootstrap";
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { InputFieldGroup } from "./ui/InputField";

const IVFProgressData = [
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
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [newStep, setNewStep] = useState<string>("");

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
                                                            {/* <Button variant="primary" size="sm">View</Button> */}
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

                                {showAddForm ? (
                                    <form>
                                        <InputFieldGroup
                                            label="Treatment Steps"
                                            name="treatmentSteps"
                                            type="text"
                                            // value={formData.name}
                                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            //     handleChange(e);
                                            // }}
                                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                            placeholder="Enter treament steps"
                                            required={true}
                                            disabled={false}
                                            readOnly={false}
                                        // error={formError.name}

                                        />

                                        <div className="d-flex gap-2 mt-3">
                                            <Button variant="outline" className="w-100" onClick={() => setShowAddForm(false)} >
                                                Cancel
                                            </Button>
                                            <Button variant="default" className="w-100" type="submit" >
                                                Save
                                            </Button>
                                        </div>
                                    </form>
                                ) : (

                                    <Button variant="default" type="submit" className="mt-3" onClick={() => setShowAddForm(true)}>
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
                            <Button variant="default" type="submit" className="patient-header-button" onClick={() => {
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
