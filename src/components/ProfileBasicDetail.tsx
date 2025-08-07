'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Badge } from 'react-bootstrap';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFolder2Open } from 'react-icons/bs';
import Image from 'next/image';
import ProfilePhone from '../assets/images/Phone.png'
import ProfileEmail from '../assets/images/Email.png'
import ProfileAddress from '../assets/images/Location.png'
import Modal from './ui/Modal';


import { IoAdd } from "react-icons/io5";
import { FertilityAssessmentForm } from './form/FertilityAssessmentForm';
import PhisicalAssessmentForm from './form/PhisicalAssessmentForm';
import { MedicalHistoryData } from '@/utils/StaticData';
import hiegthImg from '../assets/images/Physical-assement-hiegth-icons.png'
import weightImg from '../assets/images/Physical-assement-weight-icons.png'
import BMIIMG from '../assets/images/Physical-assement-bmi.png'
import BloodGroup from '../assets/images/Physical-assement-blod-group-icons.png'
import BloodPressure from '../assets/images/Physical-assement-presure-icons.png'
import HeartRate from '../assets/images/Physical-assement-heart-rate-icons.png'
import EditIcon from "../assets/images/EditIcon.png";
import MedicalHistory from './form/MedicalHistory';
import Button from './ui/Button';




// JSON data for accordion sections

const contactData = {
    phone: '+91 12345 67890',
    email: 'riyadharang@miacare.com',
    address: 'Opp Olympia Coffee House, Shahid Bhagat Singh Road, Colaba Causeway, Mumbai 400001, Maharashtra',
    emergencyContact: {
        name: 'Raj Desai',
        contact: '+91 12345 67890',
        relation: 'Husband'
    }
};

const patientJourneyData = [
    {
        id: 1,
        title: 'Online Consultation',
        date: 'on 09 Jul 2024',
        time: '12:11 PM',
        status: 'success' as const
    },
    {
        id: 2,
        title: 'Appointment Booked',
        date: 'on 09 Jul 2024',
        time: '12:11 PM',
        status: 'success' as const
    }
];

export interface PatientJourneyItem {
    id: string;
    title: string;
    date: string;
    time: string;
    status: 'Success' | "In Progress" | 'Pending' | 'Failed';
}

const journeyData: PatientJourneyItem[] = [
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

const ProfileBasicDetail = () => {
    const [activeAccordion, setActiveAccordion] = useState<string | null>('0');
    const [showPhisicalAssessment, setShowPhisicalAssessment] = useState(false);
    const [showFertilityAssessment, setShowFertilityAssessment] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [nedicalHistoryFormData, setNedicalHistoryFormData] = useState<any>([]);


    console.log("nedicalHistoryFormData", nedicalHistoryFormData);

    const accordionData = [
        {
            id: '0',
            title: 'Physical Assessment',
            content: (
                <>
                </>

            ),
        },
        {
            id: '1',
            title: 'Fertility Assessment',
            content: (
              <></>
            ),
        },
        {
            id: '2',
            title: 'Medical History',
            content: (

                <>
                {Object.keys(nedicalHistoryFormData).length === 0 &&(
                    <>
                      <div className="text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
                            <path d="M60.6072 15.509V57.2116C60.6072 59.5787 58.6882 61.4977 56.3211 61.4977H22.0085C19.6414 61.4977 17.7224 59.5787 17.7224 57.2116V6.70801C17.7224 4.34086 19.6414 2.42188 22.0085 2.42188H47.5739C51.0628 5.92883 54.5519 9.43579 58.0453 12.9382C58.8964 13.7937 59.7518 14.6491 60.6072 15.509Z" fill="#F3F4F6" />
                            <path d="M60.6072 15.509H51.511C49.3365 15.509 47.5737 13.7463 47.5737 11.5718V2.42188C51.0626 5.92883 54.5517 9.43579 58.0451 12.9382C58.8963 13.7937 59.7518 14.6491 60.6072 15.509Z" fill="#DDE1E8" />
                            <path d="M47.6833 28.1613V31.1021C47.6833 31.9213 47.0192 32.5854 46.2 32.5854H42.1186V36.6668C42.1186 37.486 41.4545 38.1501 40.6353 38.1501H37.6903C36.8712 38.1501 36.207 37.486 36.207 36.6668V32.5854H32.1298C31.3106 32.5854 30.6465 31.9213 30.6465 31.1021V28.1613C30.6465 27.3422 31.3106 26.678 32.1298 26.678H36.207V22.5966C36.207 21.7774 36.8712 21.1133 37.6903 21.1133H40.6353C41.4545 21.1133 42.1186 21.7774 42.1186 22.5966V26.678H46.2C47.0192 26.678 47.6833 27.3422 47.6833 28.1613Z" fill="#D2D6DE" />
                            <path d="M70.7355 44.5053L65.9498 70.7936C65.4789 73.3803 63.2258 75.2604 60.5965 75.2604H19.5071C16.8778 75.2604 14.6247 73.3803 14.1538 70.7936L7.59299 34.7558C6.98481 31.4153 9.55093 28.3398 12.9463 28.3398H26.3864C27.5838 28.3398 28.7477 28.7348 29.6979 29.4636L39.4797 36.9658C40.4299 37.6944 41.5938 38.0895 42.7912 38.0895H65.3821C68.7776 38.0894 71.3437 41.1649 70.7355 44.5053Z" fill="#9CA3AF" />
                            <path d="M60.3568 63.8798C60.3568 66.5187 58.2175 68.658 55.5786 68.658H48.1395C45.5006 68.658 43.3613 66.5187 43.3613 63.8798C43.3613 61.2409 45.5006 59.1016 48.1395 59.1016H55.5786C58.2175 59.1017 60.3568 61.2409 60.3568 63.8798Z" fill="#8D929C" />
                        </svg>

                       
                        <p className='patient-accordion-content-subtitle my-3' >No Medical History details</p>
                        <Button onClick={() => setShowModal(true)} variant="outline" disabled={false} contentSize="medium">
                            <IoAdd /> Addd Medical History
                        </Button>
                    </div>
                    </>
                )}
                  

                    {nedicalHistoryFormData.map((item: any, index: number) => {
                        console.log("item", item);


                        return (
                            <div key={index} className="medical-history-details text-start">
                                <div>
                                    <Button onClick={() => setShowModal(true) } className="medical-history-edit-btn medical-history-edit-btn-font mb-3">
                                      <Image src={EditIcon} alt="Edit" /> Edit
                                    </Button>
                                    {/* <p>{item.familyMedicalHistory}</p> */}
                                </div>
                                <Row>
                                    {/* Current Medications */}
                                    <Col lg={5} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Current Medications</h6>
                                            <p className="mb-2 accordion-title-detail">
                                                {item.medicationcontent || 'No medical conditions recorded'}
                                            </p>
                                        </div>
                                    </Col>

                                    {/* Surgeries */}
                                    <Col lg={7} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Surgeries</h6>
                                            <p className="mb-2 accordion-title-detail">
                                                {item.medical_surgeries === 'true' ? 'Yes' : 'No'}
                                            </p>
                                        </div>
                                    </Col>

                                    {/* Medical Conditions */}
                                    <Col lg={12} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Medical condition / Allergies</h6>
                                            {MedicalHistoryData.medical_medical_condition?.length > 0 ? (
                                                MedicalHistoryData.medical_medical_condition.map((cond: string, i: number) => (
                                                    <p key={i} className="mb-2 d-inline-block border-box-orange-font box-border-orange me-2">
                                                        {cond.trim()}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="mb-2 d-inline-block border-box-orange-font box-border-orange">
                                                    No medical conditions recorded
                                                </p>
                                            )}
                                        </div>
                                    </Col>

                                    {/* Family History */}
                                    <Col lg={5} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Family History</h6>
                                            {item.familyMedicalHistory?.length > 0 ? (
                                                <ul className="mb-2">
                                                    {typeof item.familyMedicalHistory === 'string' ? (
                                                        <li className="medical-emergency-fimily-history">{item.familyMedicalHistory.trim()}</li>
                                                    ) : (
                                                        item.familyMedicalHistory.map((fh: string, i: number) => (
                                                            <li key={i} className="medical-emergency-fimily-history">{fh.trim()}</li>
                                                        ))
                                                    )}
                                                </ul>
                                            ) : (
                                                <p className="mb-2 d-block">No medical conditions recorded</p>
                                            )}
                                        </div>
                                    </Col>

                                    {/* Lifestyle */}
                                    <Col lg={7} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Lifestyle</h6>
                                            {MedicalHistoryData.medical_lifestyle?.length > 0 ? (
                                                MedicalHistoryData.medical_lifestyle.map((lifestyle: string, i: number) => (
                                                    <p key={i} className="mb-2 d-inline-block border-box-blue-font box-border-blue me-2">
                                                        {lifestyle.trim()}
                                                    </p>
                                                ))
                                            ) : (
                                                <p className="mb-2 d-inline-block border-box-blue-font box-border-blue">
                                                    No medical conditions recorded
                                                </p>
                                            )}
                                        </div>
                                    </Col>

                                    {/* Physical Exercise */}
                                    <Col lg={5} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Physical Exercise</h6>
                                            <p className="mb-2 border-box-orange-font box-border-orange d-inline-block">
                                                {item.exercise || 'Not specified'}
                                            </p>
                                        </div>
                                    </Col>

                                    {/* Stress Level */}
                                    <Col lg={7} md={12}>
                                        <div className="mb-3">
                                            <h6 className="mb-1 contact-details-emergency">Stress Level</h6>
                                            <p className="mb-2 d-inline-block border-box-red-font box-border-red">
                                                {item.stress || 'Not specified'}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        );
                    })}


                </>
            ),
        },
    ];

    return (
        <Container fluid >
            <Row>
                {/* Left Side - Contact Details & Accordion */}
                <Col lg={8} md={12}>
                    {/* Contact Card */}
                    <Card className="mb-4 shadow-sm">
                        <Card.Body className="p-4">
                            <Row>
                            <h5 className="mb-3 contact-details-heading">Contact Details</h5>

                            
                                <Col lg={4} md={12}>
                                <div className="mb-3 d-flex align-items-center">
                                    <Image src={ProfilePhone} className="me-2 " width={20} height={20} alt="Phone" />
                                    <span className="contact-details-subheading">{contactData.phone}</span>
                                </div>
                                </Col>
                                <Col lg={8} md={12}>
                                <div className="mb-3 d-flex align-items-center contac-email-card">
                                    <Image src={ProfileEmail} className="me-2 " width={20} height={20} alt="Email" />
                                    <span className="contact-details-subheading">{contactData.email}</span>
                                </div>
                                </Col>
                            
                            <Col lg={12} md={12}>
                            <div className="mb-4 d-flex align-items-start">
                                <Image src={ProfileAddress} className="me-2 " width={20} height={20} alt="Address" />
                                <span className="contact-details-subheading contact-propfile-address">{contactData.address}</span>
                            </div>
                            </Col>
                            </Row>

                            <h6 className=" mb-4 contact-details-heading">Emergency Contact Details</h6>
                            <Row className="g-3">
                                <Col sm={4}>
                                    <div>
                                        <small className="contact-details-emergency d-block">Name</small>
                                        <span className="contact-details-emergency-subdetail">{contactData.emergencyContact.name}</span >
                                    </div>
                                </Col>
                                <Col sm={8}>
                                    <div className='d-flex gap-3'>
                                        <div>
                                            <small className="contact-details-emergency d-block">Emergency Contact</small>
                                            <span className="contact-details-emergency-subdetail">{contactData.emergencyContact.contact}</span >
                                        </div>
                                        <div className='contact-details-relation'>
                                            <small className="contact-details-emergency d-block">Relation</small>
                                            <span className="contact-details-emergency-subdetail">{contactData.emergencyContact.relation}</span >
                                        </div>
                                    </div>
                                </Col>

                            </Row>
                        </Card.Body>
                    </Card>

                    {/* Single Rendered Accordion using JSON */}
                    <Accordion activeKey={activeAccordion} className="mb-3">
                        {accordionData.map((item) => (
                            <Accordion.Item eventKey={item.id} key={item.id} className='patient-accordion-item mb-3'>
                                <Accordion.Header onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)} >
                                    <p className='contact-details-heading'>{item.title}</p>
                                </Accordion.Header>
                                <Accordion.Body>{item.content}</Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    <Modal
                        className=""
                        show={showPhisicalAssessment}
                        onHide={() => setShowPhisicalAssessment(false)}
                        header="Physical Assessment"
                        closeButton={true}
                        size="lg"
                    >
                        <div className="mb-0 ">
                            {/* <MedicalHistory /> */}
                            <PhisicalAssessmentForm />
                        </div>
                    </Modal>

                    <Modal
                        show={showFertilityAssessment}
                        onHide={() => setShowFertilityAssessment(false)}
                        header="Fertility Assessment"
                        closeButton={true}
                        size="lg"
                    >
                        <div className="mb-0 ">
                            {/* FertilityAssessment model */}
                            {/* <FertilityAssessment /> */}
                            <FertilityAssessmentForm setShowFertilityAssessment={setShowFertilityAssessment} />

                        </div>
                    </Modal>
                    <Modal
                        className="medical-history-modal custom-small-modal"
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        header="Add Medical History"
                        size="lg"
                        closeButton={true}
                    >
                        <div className="mb-0">
                            <MedicalHistory setNedicalHistoryFormData={setNedicalHistoryFormData } setShowModal={setShowModal} />
                        </div>
                    </Modal>


                </Col>

                {/* Right Side - Patient Journey */}
                <Col lg={4} md={12}>
                    <div className='d-flex justify-content-between align-items-center mb-5'>

                        <h6 className='patient-journey-heading'>Patient Journey</h6>
                        <div className='patient-journey-up-icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                            </svg>

                        </div>
                    </div>
                    {journeyData.map((item, index) => {
                        const isLastItem = index === journeyData.length - 1;
                        return (
                            <div
                                className={`position-relative ${!isLastItem ? 'patient-journey-box-wrapper' : ''}`}
                                key={item.id}>
                                <div className='patient-journey-box ms-5 mb-3 ' key={item.id}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="patient-journey-box-title mb-1">{item.title}</h6>
                                            <p className="patient-journey-box-subtitle mb-0">{item.date} , {item.time}</p>
                                        </div>
                                        <div>
                                            {/* <Button variant="primary" size="sm">View</Button> */}
                                            <span className={getStatusBadgeClass(item.status)}>{item.status}</span>
                                        </div>
                                    </div>

                                    <div className="position-absolute start-0 patient-journey-dot">
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
                                    </div>
                                </div>
                            </div>
                        )
                    })}


                    {/* {journeyData.map((item, index) => (

                        <div
                            key={item.id}
                            className={`timeline-item position-relative mt-3 ${item.id == '1' || item.id == '2' || item.id == '3' || item.id == '4' ? 'shadow-sm rounded bg-white' : ''}`}
                        >
                            <div className="d-flex align-items-start p-3">
                                <div className="timeline-marker me-3 position-relative">
                                    <div className="rounded-circle bg-success" style={{ width: '12px', height: '12px' }}></div>
                                    {index < journeyData.length - 1 && (
                                        <div className="timeline-line position-absolute bg-light"></div>
                                    )}
                                </div>

                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between align-items-start">
                                        <div>
                                            <h6 className="mb-1 fw-semibold text-dark">{item.title}</h6>
                                            <small className="text-muted">
                                                on {item.date}, {item.time}
                                            </small>
                                        </div>
                                        <span className={getStatusBadgeClass(item.status)}>{item.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))} */}

                </Col>

            </Row>

        </Container>
    );
};

export default ProfileBasicDetail;
