'use client';

import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Button, Badge } from 'react-bootstrap';
import { FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { BsFolder2Open } from 'react-icons/bs';
import Image from 'next/image';
import ProfilePhone from '../assets/images/Phone.png'
import ProfileEmail from '../assets/images/Email.png'
import ProfileAddress from '../assets/images/Location.png'
import Modal from './ui/Modal';
import MedicalHistory from './form/MedicalHistory';


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
        date: '09 Jul 2024',
        time: '12:11 PM',
        status: 'success' as const
    },
    {
        id: 2,
        title: 'Appointment Booked',
        date: '09 Jul 2024',
        time: '12:11 PM',
        status: 'success' as const
    }
];

export interface PatientJourneyItem {
    id: string;
    title: string;
    date: string;
    time: string;
    status: 'Success' | 'Pending' | 'Failed';
}


const journeyData: PatientJourneyItem[] = [
    {
        id: "1",
        title: "Online Consultation",
        date: "09 Jul 2024",
        time: "12:11 PM",
        status: "Success"
    },
    {
        id: "2",
        title: "Appointment Booked",
        date: "09 Jul 2024",
        time: "12:11 PM",
        status: "Success"
    },
    {
        id: "3",
        title: "Lab Test Scheduled",
        date: "10 Jul 2024",
        time: "10:30 AM",
        status: "Pending"
    },
    {
        id: "4",
        title: "Follow-up Call",
        date: "11 Jul 2024",
        time: "02:15 PM",
        status: "Pending"
    }
];

const formatDateTime = (date: string, time: string) => {
    return `on ${date}, ${time}`;
};

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'Success':
            return 'badge bg-success';
        case 'Pending':
            return 'badge bg-warning';
        case 'Failed':
            return 'badge bg-danger';
        default:
            return 'badge bg-secondary';
        }
    };

    const getTimelineIconClass = (status: string) => {
        switch (status) {
            case 'Success':
                return 'bg-success';
                case 'Pending':
            return 'bg-warning';
        case 'Failed':
            return 'bg-danger';
            default:
                return 'bg-secondary';
            }
};


const ProfileBasicDetail = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeAccordion, setActiveAccordion] = useState<string | null>('0');

    // Accordion data with access to component state
    const accordionData = [
        {
            id: '0',
            title: 'Physical Assessment',
            content: <p>No data available yet.</p>,
        },
        {
            id: '1',
            title: 'Fertility Assessment',
            content: <div className="text-center text-muted">
            <BsFolder2Open size={40} className="mb-3" />
            <p>No medical history</p>
            <Button variant="outline-primary" >+ Add Medical History</Button>
        </div>,
        },
        {
            id: '2',
            title: 'Medical History',
            content: (
                <div className="text-center text-muted">
                    <BsFolder2Open size={40} className="mb-3" />
                    <p>No medical history</p>
                    <Button variant="outline-primary" onClick={() => setShowModal(true)}>+ Add Medical History</Button>
                </div>
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
                            <h5 className="mb-3 contact-details-heading">Contact Details</h5>

                            <div className="d-flex justify-content-between">
                                <div className="mb-3 d-flex align-items-center">
                                    <Image src={ProfilePhone} className="me-2 " width={20} height={20} alt="Phone" />
                                    <span className="contact-details-subheading">{contactData.phone}</span>
                                </div>

                                <div className="mb-3 d-flex align-items-center contac-email-card">
                                    <Image src={ProfileEmail} className="me-2 " width={20} height={20} alt="Email" />
                                    <span className="contact-details-subheading">{contactData.email}</span>
                                </div>
                            </div>
                            <div className="mb-4 d-flex align-items-start">
                                <Image src={ProfileAddress} className="me-2 " width={20} height={20} alt="Address" />
                                <span className="contact-details-subheading contact-propfile-address">{contactData.address}</span>
                            </div>



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
                            <Accordion.Item eventKey={item.id} key={item.id}>
                                <Accordion.Header onClick={() => setActiveAccordion(activeAccordion === item.id ? null : item.id)} >
                                    <p className='contact-details-heading'>   {item.title}</p>
                                </Accordion.Header>
                                <Accordion.Body>{item.content}</Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>

                    <Modal
                            show={showModal}
                            onHide={() => setShowModal(false)}
                            header="Add Medical History"
                            closeButton={true}
                            size = "lg"
                          >
                            <div className="mb-0 "><MedicalHistory /></div>
                          </Modal>
                          
                </Col>

                {/* Right Side - Patient Journey */}
                <Col lg={4} md={12}>
                    {journeyData.map((item, index) => (
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
                    ))}

                </Col>

                
            </Row>
        </Container>
    );
};

export default ProfileBasicDetail;
