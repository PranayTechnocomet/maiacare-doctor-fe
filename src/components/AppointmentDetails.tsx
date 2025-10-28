"use client"

import ProfileImage from '@/assets/images/Profile_Image.png'
import { ProfileCard } from './ui/custom/ProfileCard';
import '@/style/patientProfile.css'
import { Accordion, Col, Row } from 'react-bootstrap';
import ContentContainer from './ui/ContentContainer';
import Button from './ui/Button';
import Image from 'next/image';
import { useState } from 'react';
import Modal from './ui/Modal';
import TreatmentPlan from './TreatmentPlan';
import '@/style/appointments.css'
import "@/style/settingsPassword.css";
import { AppointmentPaymentDetails } from './form/AppointmentPaymentDetails';
import { MedicationPrescriptionType, PaymentFormData } from '@/utils/types/interfaces';
import { MedicationPrescriptionForm } from './form/TreatmentPlanForm';
import MedicationAndTests from './MedicationAndTests';
import { AppointmentRequestCancelModel } from './TempAppoRequstCancelModel';

const profileData = {
    name: "Rani Desai",
    image: ProfileImage.src,

    gender: "Female",
    dob: "7 Jan 1999",
    age: 31,
    joinDate: "7 Jan 2025",
    status: "Active" as const,
};

function AppointmentDetails() {
    const [MedicationAndTestsModel, setMedicationAndTestsModel] = useState<boolean>(false);
    const [TreatmentPlanModel, setTreatmentPlanModel] = useState(false);
    // const [TreatmentPlanModelWithTests, setTreatmentPlanModelWithTests] = useState(false);

    const [TreatmentDetailsTempShow, setTreatmentDetailsTempShow] = useState<any[]>([]);
    const [medicalPrescriptionDataShowHide, setMedicalPrescriptionDataShowHide] = useState<boolean>(false);
    const [PaymentFormShow, setPaymentFormShow] = useState(false);
    const [showEditFormShowModel, setShowEditFormShowModel] = useState<boolean>(false);
    const [medicalPrescription, setMedicalPrescription] = useState<MedicationPrescriptionType[]>([]);

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


    const [editFormWithTests, setEditFormWithTests] = useState<MedicationPrescriptionType>({
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

    // only
    const [editMedicationModel, setEditMedicationModel] = useState<boolean>(false);
    const [AddNewMedicationModel, setAddNewMedicationModel] = useState<boolean>(false);

    const [medicalPrescriptionWithTests, setMedicalPrescriptionWithTests] = useState<MedicationPrescriptionType[]>([]);
    const [medicalPrescriptionWithTestsDataShowHide, setMedicalPrescriptionWithTestsDataShowHide] = useState<boolean>(false);
    const [showEditFormShowModelWithTests, setShowEditFormShowModelWithTests] = useState<boolean>(false);

    const [step, setStep] = useState<number | undefined>(1);
    const [stepper, setStepper] = useState<number | undefined>(1);
    const totalSteps = 3;

    const [MedicationAndTestsStep, setMedicationAndTestsStep] = useState<number | undefined>(1);
    const [MedicationAndTestsStepper, setMedicationAndTestsStepper] = useState<number | undefined>(1);
    const MedicationAndTestsTotalSteps = 2;

    const [PaymentFormData, setPaymentFormData] = useState<PaymentFormData>({
        amount: "",
        status: "",
        mode: "",
    });

    const [RescheduleModal, setRescheduleModal] = useState<boolean>(false);
    const [CancelModal, setCancelModal] = useState<boolean>(false);

    const [FinishAppointmentBtnShowHide, setFinishAppointmentBtnShowHide] = useState<boolean>(false);

    return (

        <>
            <ProfileCard
                name={profileData.name}
                image={profileData.image}
                // id={profileData.id}
                gender={profileData.gender}
                dob={profileData.dob}
                age={profileData.age}
                joinDate={profileData.joinDate}
                status={profileData.status}
            />

            <Row className='mt-1 g-3'>
                <Col md={7}>
                    <ContentContainer>
                        <div className='d-flex justify-content-between '>
                            <div>
                                <div className='d-flex gap-2'>
                                    <h6 className='accordion-title'>Appointment Details</h6>
                                    <span className='patient-journey-badge-InProgress'>New</span>
                                </div>
                                <p className='modal-custom-content m-0'>Appointment ID <span className='patient-treatment-box-subtitle-desc'>#123456</span></p>
                            </div>

                            <AppointmentRequestCancelModel
                                opcationShowDot={"appointmentDetails"}
                                RescheduleModal={RescheduleModal}
                                setRescheduleModal={setRescheduleModal}
                                setCancelModal={setCancelModal}
                                CancelModal={CancelModal}
                            />

                        </div>
                        <div className='d-flex justify-content-between mt-3 w-75'>
                            <div className='d-flex align-items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                                    <path d="M14.25 2.1875H12.6875V1.875C12.6875 1.62636 12.5887 1.3879 12.4129 1.21209C12.2371 1.03627 11.9986 0.9375 11.75 0.9375C11.5014 0.9375 11.2629 1.03627 11.0871 1.21209C10.9113 1.3879 10.8125 1.62636 10.8125 1.875V2.1875H5.1875V1.875C5.1875 1.62636 5.08873 1.3879 4.91291 1.21209C4.7371 1.03627 4.49864 0.9375 4.25 0.9375C4.00136 0.9375 3.7629 1.03627 3.58709 1.21209C3.41127 1.3879 3.3125 1.62636 3.3125 1.875V2.1875H1.75C1.3356 2.1875 0.938171 2.35212 0.645146 2.64515C0.35212 2.93817 0.1875 3.3356 0.1875 3.75V16.25C0.1875 16.6644 0.35212 17.0618 0.645146 17.3549C0.938171 17.6479 1.3356 17.8125 1.75 17.8125H14.25C14.6644 17.8125 15.0618 17.6479 15.3549 17.3549C15.6479 17.0618 15.8125 16.6644 15.8125 16.25V3.75C15.8125 3.3356 15.6479 2.93817 15.3549 2.64515C15.0618 2.35212 14.6644 2.1875 14.25 2.1875ZM3.3125 4.0625C3.3125 4.31114 3.41127 4.5496 3.58709 4.72541C3.7629 4.90123 4.00136 5 4.25 5C4.49864 5 4.7371 4.90123 4.91291 4.72541C5.08873 4.5496 5.1875 4.31114 5.1875 4.0625H10.8125C10.8125 4.31114 10.9113 4.5496 11.0871 4.72541C11.2629 4.90123 11.5014 5 11.75 5C11.9986 5 12.2371 4.90123 12.4129 4.72541C12.5887 4.5496 12.6875 4.31114 12.6875 4.0625H13.9375V5.9375H2.0625V4.0625H3.3125ZM2.0625 15.9375V7.8125H13.9375V15.9375H2.0625Z" fill="#2B4360" />
                                </svg>
                                <span className='patient-treatment-box-subtitle-desc mt-1'>26 Feb 2025</span>
                            </div>
                            <div className='d-flex align-items-center gap-2'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                    <path d="M8.875 1.5C7.58942 1.5 6.33272 1.88122 5.2638 2.59545C4.19488 3.30968 3.36176 4.32484 2.86979 5.51256C2.37782 6.70028 2.24909 8.00721 2.4999 9.26809C2.7507 10.529 3.36977 11.6872 4.27881 12.5962C5.18785 13.5052 6.34604 14.1243 7.60692 14.3751C8.86779 14.6259 10.1747 14.4972 11.3624 14.0052C12.5502 13.5132 13.5653 12.6801 14.2796 11.6112C14.9938 10.5423 15.375 9.28558 15.375 8C15.3732 6.27665 14.6878 4.62441 13.4692 3.40582C12.2506 2.18722 10.5984 1.50182 8.875 1.5ZM8.875 13.5C7.78721 13.5 6.72384 13.1774 5.81937 12.5731C4.9149 11.9687 4.20995 11.1098 3.79367 10.1048C3.37738 9.09977 3.26847 7.9939 3.48068 6.927C3.6929 5.86011 4.21673 4.8801 4.98592 4.11091C5.7551 3.34172 6.73511 2.8179 7.80201 2.60568C8.8689 2.39346 9.97477 2.50238 10.9798 2.91866C11.9848 3.33494 12.8437 4.03989 13.4481 4.94436C14.0524 5.84883 14.375 6.9122 14.375 8C14.3733 9.45818 13.7934 10.8562 12.7623 11.8873C11.7312 12.9184 10.3332 13.4983 8.875 13.5ZM12.875 8C12.875 8.13261 12.8223 8.25979 12.7286 8.35355C12.6348 8.44732 12.5076 8.5 12.375 8.5H8.875C8.74239 8.5 8.61522 8.44732 8.52145 8.35355C8.42768 8.25979 8.375 8.13261 8.375 8V4.5C8.375 4.36739 8.42768 4.24021 8.52145 4.14645C8.61522 4.05268 8.74239 4 8.875 4C9.00761 4 9.13479 4.05268 9.22856 4.14645C9.32232 4.24021 9.375 4.36739 9.375 4.5V7.5H12.375C12.5076 7.5 12.6348 7.55268 12.7286 7.64645C12.8223 7.74021 12.875 7.86739 12.875 8Z" fill="#8A8D93" />
                                </svg>
                                <span className='patient-treatment-box-subtitle-desc'>5:30 PM</span>
                            </div>
                        </div>
                        <div className='my-3'>
                            <p className='contact-details-emergency mb-2'>Concern / Treatment</p>
                            <div className='d-flex gap-2'>

                                <span className='box-border-orange border-box-orange-font'>PCOS</span>
                                <span className='box-border-orange border-box-orange-font'>Fertility Support</span>
                            </div>

                        </div>
                        <div className='my-3'>
                            <p className='contact-details-emergency mb-2'>Additional Comment</p>
                            <p className='patient-treatment-box-subtitle-desc m-0'>Experiencing irregular cycles and seeking guidance on fertility options.</p>
                        </div>

                        <Row className='g-3'>
                            {FinishAppointmentBtnShowHide
                                ?
                                <Col md={12}>
                                    <Button className='w-100' variant="default" disabled={false} type="submit">
                                        Finish Appointment
                                    </Button>
                                </Col>

                                :
                                <>
                                    <Col md={6} className='col-6'>
                                        <Button className='w-100' variant="outline" disabled={false} >
                                            No Show
                                        </Button>
                                    </Col>
                                    <Col md={6} className='col-6'>
                                        <Button className='w-100' variant="default" disabled={false} type="submit" onClick={() => setFinishAppointmentBtnShowHide(true)}>
                                            Check In
                                        </Button>
                                    </Col>
                                </>
                            }


                        </Row>
                    </ContentContainer>

                    <ContentContainer className='mt-3'>

                        <h6 className='accordion-title mb-0 pb-3'>Treatment Details</h6>

                        {TreatmentDetailsTempShow.length > 0 ?
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0" className='phisical-assessment-accordion-item mb-3' >
                                    <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                        <div className='d-flex align-items-center gap-3'>
                                            <h6 className='dashboard-treatment-success-title m-0'>IVF Cycle 1</h6>
                                            <span className='patient-journey-badge-InProgress'>Ongoing</span>
                                            <div className='patient-treatment-box-dot-btn'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                                    <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                                </svg>
                                            </div>

                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className='pt-0'>
                                        <Row className='g-3'>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Start Date</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>7 Feb 2025</p>

                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Start Date</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>7 Feb 2025</p>
                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Duration</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>3 Months</p>

                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Ongoing Step</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>1. Fertility Assessment</p>
                                            </Col>

                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Fees</p>
                                                <p className="patient-treatment-box-subtitle-desc-fees m-0">₹12000</p>

                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Amount Status</p>
                                                <span className="patient-treatment-box-subtitle-desc-half-paid m-0">Half Paid</span>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className='phisical-assessment-accordion-item mb-3'>
                                    <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                        <div className='d-flex align-items-center gap-3'>
                                            <h6 className='dashboard-treatment-success-title m-0'>Egg Freezing</h6>
                                            <span className='patient-journey-badge-InProgress'>Ongoing</span>
                                            <div className='patient-treatment-box-dot-btn'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 25 25" fill="none">
                                                    <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                                </svg>
                                            </div>

                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className='pt-0'>
                                        <Row className='g-3'>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Start Date</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>7 Feb 2025</p>

                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Start Date</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>7 Feb 2025</p>
                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Duration</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>3 Months</p>

                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Ongoing Step</p>
                                                <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>1. Fertility Assessment</p>
                                            </Col>

                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Fees</p>
                                                <p className="patient-treatment-box-subtitle-desc-fees m-0">₹12000</p>

                                            </Col>
                                            <Col sm={6} className='col-6'>
                                                <p className='contact-details-emergency mb-1'>Amount Status</p>
                                                <span className="patient-treatment-box-subtitle-desc-half-paid m-0">Half Paid</span>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            :
                            <div>
                                <div className='text-center mt-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="186" height="111" viewBox="0 0 186 111" fill="none">
                                        <path d="M114.583 33.9167V0H71.4167V33.9167H37.5V55.5V77.0833H71.4167V111H114.583V77.0833H148.5V55.5V33.9167H114.583Z" fill="#DDE1E8" />
                                        <path d="M80.6667 74H80.5063C79.8326 73.9655 79.1889 73.7109 78.6737 73.2754C78.1585 72.8399 77.8004 72.2474 77.6543 71.5889L73.3746 52.318L71.0929 56.8814C70.8364 57.3934 70.4423 57.8238 69.9549 58.1244C69.4675 58.425 68.906 58.5839 68.3333 58.5834H3.58334C1.88046 58.5834 0.5 57.2029 0.5 55.5C0.5 53.7972 1.88046 52.4167 3.58334 52.4167H66.4278L71.7404 41.7885C72.0211 41.2151 72.4748 40.7445 73.0375 40.4429C73.6002 40.1414 74.2433 40.0243 74.8762 40.108C75.5086 40.1852 76.1017 40.4563 76.5737 40.8842C77.0458 41.3121 77.3737 41.8758 77.5124 42.4976L81.2617 59.382L90.077 32.9424C90.2814 32.3287 90.6737 31.7948 91.1982 31.4163C91.7228 31.0378 92.3531 30.8339 93 30.8334H93.0493C93.7042 30.8438 94.3387 31.0625 94.8609 31.4578C95.3832 31.8531 95.7659 32.4044 95.9538 33.0318L103.32 57.5875L105.851 53.7888C106.133 53.3666 106.514 53.0205 106.962 52.7812C107.41 52.5418 107.909 52.4166 108.417 52.4167H182.417C184.12 52.4167 185.5 53.7972 185.5 55.5C185.5 57.2029 184.12 58.5834 182.417 58.5834H110.066L104.825 66.4613C104.497 66.9441 104.04 67.3253 103.507 67.5619C102.973 67.7984 102.384 67.8807 101.806 67.7995C101.227 67.7139 100.685 67.4656 100.242 67.0834C99.7995 66.7012 99.4746 66.201 99.3054 65.6411L92.8458 44.1287L83.5958 71.8787C83.3932 72.4957 83.0009 73.033 82.4749 73.4139C81.9489 73.7949 81.3161 74 80.6667 74Z" fill="#B0B4C1" />
                                    </svg>
                                    <p className="patient-accordion-content-subtitle my-3">No treatment plan</p>
                                    <Button variant="outline" disabled={false} onClick={() => { setTreatmentPlanModel(true) }}>
                                        <div className='d-flex justify-content-center align-items-center gap-2 '>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="#2B4360" />
                                            </svg>
                                            Start Treatment
                                        </div>
                                    </Button>
                                </div>

                                <Modal
                                    show={TreatmentPlanModel}
                                    onHide={() => { setTreatmentPlanModel(false); setStep(1); setStepper(1); setMedicalPrescription([]); }}
                                    header="Treatment Plan"
                                    closeButton={true}
                                >
                                    <TreatmentPlan
                                        setEditForm={setEditForm}
                                        editForm={editForm}
                                        setTreatmentPlanModel={setTreatmentPlanModel}
                                        setShowEditFormShowModel={setShowEditFormShowModel}
                                        showEditFormShowModel={showEditFormShowModel}
                                        setStep={setStep}
                                        setStepper={setStepper}
                                        step={step}
                                        stepper={stepper}
                                        totalSteps={totalSteps}
                                        setMedicalPrescription={setMedicalPrescription}
                                        medicalPrescription={medicalPrescription}
                                        setTreatmentDetailsTempShow={setTreatmentDetailsTempShow}
                                        setMedicalPrescriptionDataShowHide={setMedicalPrescriptionDataShowHide}
                                        medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
                                    />
                                </Modal>

                                {/* edit time show model for Medication & Tests */}
                                <Modal
                                    show={showEditFormShowModel}
                                    onHide={() => { setShowEditFormShowModel(false); setTreatmentPlanModel(true); setMedicalPrescriptionDataShowHide(false); }}
                                    header="Edit Medication Prescription"
                                    closeButton={true}
                                >
                                    <MedicationPrescriptionForm
                                        setShowEditFormShowModel={setShowEditFormShowModel}
                                        editForm={editForm}
                                        setTreatmentPlanModel={setTreatmentPlanModel}
                                        setMedicalPrescription={setMedicalPrescription}
                                        medicalPrescription={medicalPrescription}
                                        setMedicalPrescriptionDataShowHide={setMedicalPrescriptionDataShowHide}
                                        medicalPrescriptionDataShowHide={medicalPrescriptionDataShowHide}
                                    />
                                </Modal>
                            </div>
                        }

                    </ContentContainer>

                </Col>
                <Col md={5}>
                    <ContentContainer>
                        <div className='d-flex justify-content-between align-items-center'>
                            <h6 className='accordion-title'>Payment Details</h6>

                            {PaymentFormData.amount &&
                                (<div className='patient-journey-up-icon' onClick={() => setPaymentFormShow(true)} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
                                        <path d="M21.3113 7.37845L17.1216 3.18971C16.9823 3.05038 16.8169 2.93986 16.6349 2.86446C16.4529 2.78905 16.2578 2.75024 16.0608 2.75024C15.8638 2.75024 15.6687 2.78905 15.4867 2.86446C15.3047 2.93986 15.1393 3.05038 15 3.18971L3.4397 14.75C3.2998 14.8888 3.18889 15.054 3.11341 15.236C3.03792 15.4181 2.99938 15.6133 3.00001 15.8103V20C3.00001 20.3978 3.15804 20.7794 3.43935 21.0607C3.72065 21.342 4.10218 21.5 4.50001 21.5H20.25C20.4489 21.5 20.6397 21.421 20.7803 21.2803C20.921 21.1397 21 20.9489 21 20.75C21 20.5511 20.921 20.3603 20.7803 20.2197C20.6397 20.079 20.4489 20 20.25 20H10.8113L21.3113 9.50002C21.4506 9.36072 21.5611 9.19535 21.6365 9.01334C21.7119 8.83133 21.7507 8.63625 21.7507 8.43924C21.7507 8.24222 21.7119 8.04714 21.6365 7.86513C21.5611 7.68312 21.4506 7.51775 21.3113 7.37845ZM8.6897 20H4.50001V15.8103L12.75 7.56033L16.9397 11.75L8.6897 20ZM18 10.6897L13.8113 6.50002L16.0613 4.25002L20.25 8.4397L18 10.6897Z" fill="#2B4360" />
                                    </svg>
                                </div>)
                            }

                        </div>

                        {PaymentFormData.amount && PaymentFormShow == false ? <>

                            <Row className='g-sm-3 g-2'>
                                <Col sm={12} className='col-12'>
                                    <p className='contact-details-emergency mb-1'>Amount</p>
                                    <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>₹{PaymentFormData.amount}</p>
                                </Col>
                                <Col sm={6} className='col-6'>
                                    <p className='contact-details-emergency mb-1'>Status</p>

                                    <span
                                        className={
                                            PaymentFormData.status === "Paid"
                                                ? "patient-journey-badge-success"
                                                : PaymentFormData.status === "Unpaid"
                                                    ? "patient-journey-badge-pending"
                                                    : PaymentFormData.status === "other"
                                                        ? "patient-journey-badge-InProgress"
                                                        : ""
                                        }
                                    >
                                        {PaymentFormData.status}
                                    </span>
                                </Col>
                                <Col sm={6} className='col-6'>
                                    <p className='contact-details-emergency mb-1'>Mode</p>
                                    <p className='phisical-assessment-accordion-showData-box-subtitle m-0'>{PaymentFormData.mode}</p>
                                </Col>
                            </Row>

                        </> : <>
                            {PaymentFormShow == true ?
                                <AppointmentPaymentDetails
                                    setPaymentFormShow={setPaymentFormShow}
                                    setPaymentFormData={setPaymentFormData}
                                    PaymentFormData={PaymentFormData}
                                />
                                :
                                <div className='text-center mt-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M6.4044 14.4609C3.37476 14.4609 0.935669 16.9 0.935669 19.9297V21.9609C0.935669 24.9906 3.37476 27.4297 6.4044 27.4297H27.2775C27.2781 22.9762 27.2781 18.9542 27.2781 14.4609H6.4044Z" fill="#3E4A57" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M7.71579 21.1196C5.62501 21.1196 5.62501 24.6574 7.71579 24.6801H27.2782V21.1196H7.71579Z" fill="#292929" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.319 21.1196V58.7773C10.319 61.7527 13.0904 64.1481 16.5332 64.1481H20.5164C22.7829 64.1499 25.7129 61.6745 25.7129 58.8979C25.7129 46.3775 25.7129 32.3009 25.7129 21.1196H10.319Z" fill="#F3F4F6" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M10.319 21.1196V24.6801H20.4028V58.8979C20.4028 61.4598 17.9009 63.7651 15.7347 64.105C15.9946 64.1334 16.2666 64.1481 16.5357 64.1481H20.5188C22.7854 64.1499 25.7153 61.6745 25.7153 58.8979C25.7158 45.5194 25.7153 33.3331 25.7212 21.1197C20.5871 21.1195 15.4531 21.1198 10.319 21.1196Z" fill="#E5E7EB" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M30.3674 5.62036C26.9246 5.62036 24.1531 8.01573 24.1531 10.9911V21.1196C24.1531 32.3009 24.1472 46.3775 24.1472 58.8978C24.1472 61.6744 21.2172 64.1498 18.9507 64.148H38.9473C38.9473 46.2375 38.9414 30.1199 38.9414 10.8706C38.9414 8.09396 36.011 5.61859 33.7445 5.62036H30.3674Z" fill="#9CA3AF" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M30.3674 5.62036C32.049 5.63578 33.2388 8.69589 33.3096 10.8706C33.3096 30.1199 33.3155 46.2375 33.3155 64.148H38.9524C38.9524 46.2375 38.9465 30.1199 38.9465 10.8706C38.9465 8.09396 36.0162 5.61859 33.7497 5.62036H30.3674Z" fill="#858C97" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M32.8123 5.62036C35.0787 5.61859 38.0088 8.09412 38.0088 10.8707C38.0088 30.8519 38.0147 47.2972 38.0147 66.0499C38.0147 69.0692 37.9087 70.4968 39.719 72.3069L41.0433 73.6311C42.048 74.6357 43.6654 74.6357 44.67 73.6311L46.7782 71.5232L48.886 73.6311C49.8907 74.6357 51.5084 74.6357 52.513 73.6311L54.6208 71.5232L56.729 73.6311C57.7336 74.6357 59.351 74.6357 60.3557 73.6311L62.4638 71.5232L64.5717 73.6311C65.5764 74.6357 67.1941 74.6357 68.1987 73.6311L70.3066 71.5232L72.4147 73.6311C73.4193 74.6357 75.0367 74.6357 76.0414 73.6311L77.4653 72.2073C78.6982 70.8056 79.07 69.509 79.07 66.1671V10.9911C79.07 8.01573 76.2985 5.62036 72.8557 5.62036H32.8123Z" fill="#F3F4F6" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M40.8406 9.03467V9.65968H42.0909V9.03467H40.8406ZM43.9665 9.03467V9.65968H45.2168V9.03467H43.9665ZM47.0912 9.03467V9.65968H48.3415V9.03467H47.0912ZM50.2156 9.03467V9.65968H51.4659V9.03467H50.2156ZM53.3414 9.03467V9.65968H54.5918V9.03467H53.3414ZM56.4662 9.03467V9.65968H57.7161V9.03467H56.4662ZM59.5905 9.03467V9.65968H60.8408V9.03467H59.5905ZM62.7164 9.03467V9.65968H63.9667V9.03467H62.7164ZM65.8408 9.03467V9.65968H67.0911V9.03467H65.8408ZM68.9655 9.03467V9.65968H70.2158V9.03467H68.9655ZM72.0914 9.03467V9.65968H73.3417V9.03467H72.0914ZM75.2158 9.03467V9.65968H76.4661V9.03467H75.2158ZM40.8406 67.7064V68.3314H42.0909V67.7064H40.8406ZM43.9665 67.7064V68.3314H45.2168V67.7064H43.9665ZM47.0912 67.7064V68.3314H48.3415V67.7064H47.0912ZM50.2156 67.7064V68.3314H51.4659V67.7064H50.2156ZM53.3414 67.7064V68.3314H54.5918V67.7064H53.3414ZM56.4662 67.7064V68.3314H57.7161V67.7064H56.4662ZM59.5905 67.7064V68.3314H60.8408V67.7064H59.5905ZM62.7164 67.7064V68.3314H63.9667V67.7064H62.7164ZM65.8408 67.7064V68.3314H67.0911V67.7064H65.8408ZM68.9655 67.7064V68.3314H70.2158V67.7064H68.9655ZM72.0914 67.7064V68.3314H73.3417V67.7064H72.0914ZM75.2158 67.7064V68.3314H76.4661V67.7064H75.2158Z" fill="#CBD1E1" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M45.8644 15.0994C45.5193 15.0994 45.2394 15.3792 45.2394 15.7244C45.2393 16.0697 45.5191 16.3497 45.8644 16.3497H72.7195C73.0648 16.3497 73.3447 16.0697 73.3445 15.7244C73.3445 15.3792 73.0647 15.0994 72.7195 15.0994H45.8644ZM44.3212 25.8318C43.9759 25.8318 43.696 26.1118 43.6962 26.4571C43.6962 26.8022 43.976 27.0821 44.3212 27.0821H64.9269C65.2717 27.0816 65.551 26.8019 65.551 26.4571C65.5511 26.1121 65.2718 25.8323 64.9269 25.8318H44.3212ZM71.0032 25.8318C70.6578 25.8316 70.3778 26.1116 70.3779 26.4571C70.3779 26.8024 70.6579 27.0822 71.0032 27.0821H74.3736C74.7183 27.0815 74.9974 26.8018 74.9974 26.4571C74.9975 26.1123 74.7184 25.8324 74.3736 25.8318H71.0032ZM44.3212 30.9126C43.976 30.9126 43.6962 31.1924 43.6962 31.5376C43.696 31.8829 43.9759 32.1629 44.3212 32.1629H64.9269C65.2718 32.1625 65.5511 31.8826 65.551 31.5376C65.551 31.1928 65.2717 30.9131 64.9269 30.9126H44.3212ZM71.0032 30.9126C70.6579 30.9125 70.3779 31.1923 70.3779 31.5376C70.3778 31.883 70.6578 32.1631 71.0032 32.1629H74.3736C74.7184 32.1623 74.9975 31.8824 74.9974 31.5376C74.9974 31.1929 74.7183 30.9133 74.3736 30.9126H71.0032ZM44.3212 35.8827C43.976 35.8827 43.6962 36.1625 43.6962 36.5077C43.696 36.853 43.9759 37.133 44.3212 37.133H64.9269C65.2718 37.1325 65.5511 36.8526 65.551 36.5077C65.551 36.1629 65.2717 35.8832 64.9269 35.8827H44.3212ZM71.0032 35.8827C70.6579 35.8825 70.3779 36.1624 70.3779 36.5077C70.3778 36.8531 70.6578 37.1332 71.0032 37.133H74.3736C74.7184 37.1324 74.9975 36.8525 74.9974 36.5077C74.9974 36.163 74.7183 35.8834 74.3736 35.8827H71.0032ZM71.6676 45.4444C71.3222 45.4443 71.0421 45.7243 71.0423 46.0697C71.0423 46.415 71.3223 46.6949 71.6676 46.6947H74.3736C74.7183 46.6941 74.9974 46.4144 74.9974 46.0697C74.9975 45.7249 74.7184 45.4451 74.3736 45.4444H71.6676ZM71.6676 50.5253C71.3223 50.5251 71.0423 50.805 71.0423 51.1503C71.0421 51.4957 71.3222 51.7758 71.6676 51.7756H74.3736C74.7184 51.775 74.9975 51.4951 74.9974 51.1503C74.9974 50.8056 74.7183 50.526 74.3736 50.5253H71.6676ZM71.6676 55.4954C71.3223 55.4952 71.0423 55.7751 71.0423 56.1204C71.0421 56.4658 71.3222 56.7458 71.6676 56.7457H74.3736C74.7184 56.7451 74.9975 56.4652 74.9974 56.1204C74.9974 55.7757 74.7183 55.4961 74.3736 55.4954H71.6676Z" fill="#9CA3AF" />
                                        <path d="M43.6962 46.2452C43.696 45.8999 43.9759 45.6199 44.3212 45.6199H64.9269C65.2718 45.6204 65.5511 45.9002 65.551 46.2452C65.551 46.59 65.2717 46.8697 64.9269 46.8702H44.3212C43.976 46.8702 43.6962 46.5903 43.6962 46.2452Z" fill="#9CA3AF" />
                                        <path d="M43.6962 51.3257C43.6962 50.9805 43.976 50.7007 44.3212 50.7007H64.9269C65.2717 50.7012 65.551 50.9809 65.551 51.3257C65.5511 51.6707 65.2718 51.9506 64.9269 51.951H44.3212C43.9759 51.951 43.696 51.671 43.6962 51.3257Z" fill="#9CA3AF" />
                                        <path d="M43.6962 56.2958C43.6962 55.9506 43.976 55.6708 44.3212 55.6708H64.9269C65.2717 55.6713 65.551 55.951 65.551 56.2958C65.5511 56.6407 65.2718 56.9206 64.9269 56.9211H44.3212C43.9759 56.9211 43.696 56.6411 43.6962 56.2958Z" fill="#9CA3AF" />
                                    </svg>
                                    <p className="patient-accordion-content-subtitle my-3">No bills generated</p>
                                    <Button variant="outline" disabled={false} onClick={() => setPaymentFormShow(true)} >
                                        Generate Bill
                                    </Button>
                                </div>
                            }
                        </>
                        }

                    </ContentContainer>

                    <ContentContainer className='mt-3'>

                        <>
                            <div className='d-flex justify-content-between align-items-center mb-3'>
                                <h6 className='accordion-title m-0'>Medication & Tests </h6>
                                {medicalPrescriptionWithTests.length > 0 && (
                                    <Button variant="outline" disabled={false} className='addnew-btn' contentSize="small" onClick={() => { setAddNewMedicationModel(true); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="#2B4360" />
                                        </svg>
                                        Add New
                                    </Button>
                                )}
                            </div>

                            {medicalPrescriptionWithTests.length > 0 ?
                                <>
                                    <Accordion defaultActiveKey="0">
                                        {medicalPrescriptionWithTests.map((item, index) => {
                                            return (
                                                <Accordion.Item eventKey={index.toString()} className='medication-prescription-accordion-item-main mb-3' key={index}>
                                                    <Accordion.Header className='phisical-assessment-accordion-title-showData'>

                                                        <div className='d-flex align-items-center gap-3'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                                                <rect x="0.904297" width="44" height="44" rx="6" fill="#FBEFEB" />
                                                                <path d="M34.1114 11.2954C32.9019 10.0859 31.2615 9.40643 29.551 9.40643C27.8405 9.40643 26.2001 10.0859 24.9906 11.2954L12.6996 23.5852C11.5154 24.7998 10.8575 26.4322 10.8683 28.1285C10.8791 29.8249 11.5579 31.4486 12.7575 32.6481C13.9571 33.8475 15.5809 34.5261 17.2773 34.5367C18.9736 34.5473 20.6059 33.8891 21.8204 32.7048L34.1126 20.4149C35.3201 19.2045 35.9981 17.5646 35.9978 15.8549C35.9976 14.1452 35.3192 12.5055 34.1114 11.2954ZM20.4508 31.3352C19.6047 32.1814 18.4571 32.6569 17.2604 32.657C16.0637 32.6572 14.916 32.1819 14.0698 31.3358C13.2235 30.4897 12.748 29.3421 12.7479 28.1454C12.7478 26.9487 13.2231 25.801 14.0692 24.9547L19.5293 19.4946L25.9109 25.8751L20.4508 31.3352ZM32.7418 19.0454L27.2793 24.5055L20.9001 18.1251L26.3614 12.6649C27.2108 11.8351 28.3532 11.3736 29.5407 11.3806C30.7282 11.3875 31.8651 11.8623 32.7048 12.702C33.5445 13.5417 34.0193 14.6786 34.0262 15.8661C34.0331 17.0536 33.5717 18.1959 32.7418 19.0454ZM30.8734 16.4709C30.9634 16.5609 31.0349 16.6677 31.0836 16.7853C31.1324 16.9029 31.1575 17.029 31.1575 17.1563C31.1575 17.2836 31.1324 17.4097 31.0836 17.5273C31.0349 17.6449 30.9634 17.7517 30.8734 17.8417L27.9671 20.748C27.8771 20.8379 27.7703 20.9092 27.6527 20.9578C27.5351 21.0065 27.4091 21.0315 27.2819 21.0314C27.1547 21.0314 27.0287 21.0062 26.9112 20.9575C26.7936 20.9088 26.6869 20.8374 26.5969 20.7473C26.507 20.6573 26.4357 20.5505 26.387 20.4329C26.3384 20.3154 26.3134 20.1894 26.3135 20.0621C26.3135 19.9349 26.3386 19.8089 26.3874 19.6914C26.4361 19.5739 26.5075 19.4671 26.5975 19.3772L29.5038 16.4709C29.6854 16.2894 29.9317 16.1874 30.1886 16.1874C30.4454 16.1874 30.6917 16.2894 30.8734 16.4709Z" fill="#E29578" />
                                                            </svg>
                                                            <div className="d-flex flex-column hap-2">
                                                                <p className="treatment-steps-box-item m-0">{item.medicineName}</p>
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

                                                        <Button className='mt-3' variant="outline" disabled={false} contentSize="small" onClick={() => { setEditFormWithTests(item); setEditMedicationModel(true); }}>
                                                            <svg width="16" height="16" viewBox="0 0 14 14" className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                                            </svg>
                                                            Edit
                                                        </Button>

                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            )
                                        })}
                                    </Accordion>
                                    <Button variant="outline" className='w-100 mt-3' disabled={false} >
                                        <div className='d-flex justify-content-center align-items-center gap-2 '>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                                <path d="M21.875 13.5V19.5C21.875 19.7984 21.7565 20.0845 21.5455 20.2955C21.3345 20.5065 21.0484 20.625 20.75 20.625H4.25C3.95163 20.625 3.66548 20.5065 3.4545 20.2955C3.24353 20.0845 3.125 19.7984 3.125 19.5V13.5C3.125 13.2016 3.24353 12.9155 3.4545 12.7045C3.66548 12.4935 3.95163 12.375 4.25 12.375C4.54837 12.375 4.83452 12.4935 5.0455 12.7045C5.25647 12.9155 5.375 13.2016 5.375 13.5V18.375H19.625V13.5C19.625 13.2016 19.7435 12.9155 19.9545 12.7045C20.1655 12.4935 20.4516 12.375 20.75 12.375C21.0484 12.375 21.3345 12.4935 21.5455 12.7045C21.7565 12.9155 21.875 13.2016 21.875 13.5ZM11.7041 14.2959C11.8086 14.4008 11.9328 14.484 12.0695 14.5408C12.2063 14.5976 12.3529 14.6268 12.5009 14.6268C12.649 14.6268 12.7956 14.5976 12.9324 14.5408C13.0691 14.484 13.1933 14.4008 13.2978 14.2959L17.0478 10.5459C17.2592 10.3346 17.3779 10.0479 17.3779 9.74906C17.3779 9.45018 17.2592 9.16353 17.0478 8.95219C16.8365 8.74084 16.5498 8.62211 16.2509 8.62211C15.9521 8.62211 15.6654 8.74084 15.4541 8.95219L13.625 10.7812V3C13.625 2.70163 13.5065 2.41548 13.2955 2.2045C13.0845 1.99353 12.7984 1.875 12.5 1.875C12.2016 1.875 11.9155 1.99353 11.7045 2.2045C11.4935 2.41548 11.375 2.70163 11.375 3V10.7812L9.54594 8.95406C9.44129 8.84942 9.31706 8.7664 9.18033 8.70977C9.0436 8.65314 8.89706 8.62399 8.74906 8.62399C8.45018 8.62399 8.16353 8.74272 7.95219 8.95406C7.84754 9.05871 7.76453 9.18294 7.7079 9.31967C7.65126 9.4564 7.62211 9.60294 7.62211 9.75094C7.62211 10.0498 7.74084 10.3365 7.95219 10.5478L11.7041 14.2959Z" fill="#2B4360" />
                                            </svg>
                                            Download All Prescriptions
                                        </div>
                                    </Button>

                                </>
                                :
                                <div className='text-center mt-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                        <rect x="9.97522" y="5.6665" width="57.0109" height="68.0016" rx="2.86523" fill="#E5E7EB" />
                                        <rect x="0.000488281" width="57.0109" height="73.6684" rx="2.86523" fill="#F3F4F6" />
                                        <rect x="5.70288" y="5.66565" width="22.8044" height="22.5675" rx="1.43262" fill="#DDE1E8" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M17.1058 11.3075C16.3187 11.3075 15.6805 11.9456 15.6805 12.7328V15.5389H12.8144C12.0354 15.5389 11.4039 16.1704 11.4039 16.9494C11.4039 17.7284 12.0354 18.3598 12.8144 18.3598H15.6805V21.166C15.6805 21.9531 16.3187 22.5912 17.1058 22.5912C17.893 22.5912 18.5311 21.9531 18.5311 21.166V18.3598H21.3956C22.1746 18.3598 22.8061 17.7284 22.8061 16.9494C22.8061 16.1704 22.1746 15.5389 21.3956 15.5389H18.5311V12.7328C18.5311 11.9456 17.893 11.3075 17.1058 11.3075Z" fill="#B0B4C1" />
                                        <rect x="5.70288" y="42.401" width="12.8274" height="2.82093" rx="1.41047" fill="#B0B4C1" />
                                        <rect x="5.70288" y="50.9069" width="28.5054" height="2.82093" rx="1.41047" fill="#B0B4C1" />
                                        <rect x="5.70288" y="59.4133" width="34.2065" height="2.82093" rx="1.41047" fill="#B0B4C1" />
                                        <rect x="24.2065" y="42.4011" width="9.9769" height="2.82093" rx="1.41047" fill="#9CA3AF" />
                                        <rect x="52.3091" y="47.4647" width="27.0782" height="25.5006" fill="#DDE1E8" />
                                        <path fillRule="evenodd" clipRule="evenodd" d="M65.8458 53.1305C65.0587 53.1305 64.4206 53.7686 64.4206 54.5558V58.797H60.1361C59.3536 58.797 58.7194 59.4313 58.7194 60.2137C58.7194 60.9961 59.3536 61.6304 60.1361 61.6304H64.4206V65.8722C64.4206 66.6594 65.0587 67.2975 65.8458 67.2975C66.633 67.2975 67.2711 66.6594 67.2711 65.8722V61.6304H71.5554C72.3378 61.6304 72.9721 60.9961 72.9721 60.2137C72.9721 59.4313 72.3378 58.797 71.5554 58.797H67.2711V54.5558C67.2711 53.7686 66.633 53.1305 65.8458 53.1305Z" fill="#B0B4C1" />
                                        <path d="M51.494 33.1503C51.494 31.5678 52.7768 30.285 54.3593 30.285H77.1342C78.7166 30.285 79.9995 31.5678 79.9995 33.1503V37.3526C79.9995 38.1438 79.3581 38.7852 78.5668 38.7852H52.9266C52.1354 38.7852 51.494 38.1438 51.494 37.3526V33.1503Z" fill="#DDE1E8" />
                                        <path d="M52.3091 45.1208L55.2939 38.7852L76.5704 38.785L79.3873 45.1208V48.0006H52.3091V45.1208Z" fill="#B0B4C1" />
                                        <path d="M52.3091 71.3695H79.3873V77.1352C79.3873 78.7176 78.1045 80.0005 76.5221 80.0005H55.1743C53.5919 80.0005 52.3091 78.7176 52.3091 77.1352V71.3695Z" fill="#9CA3AF" />
                                    </svg>
                                    <p className="patient-accordion-content-subtitle my-3">No medication & tests</p>
                                    <Button variant="outline" disabled={false} onClick={() => setMedicationAndTestsModel(true)} >
                                        <div className='d-flex justify-content-center align-items-center gap-2 '>

                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M17.8125 10C17.8125 10.2486 17.7137 10.4871 17.5379 10.6629C17.3621 10.8387 17.1236 10.9375 16.875 10.9375H10.9375V16.875C10.9375 17.1236 10.8387 17.3621 10.6629 17.5379C10.4871 17.7137 10.2486 17.8125 10 17.8125C9.75136 17.8125 9.5129 17.7137 9.33709 17.5379C9.16127 17.3621 9.0625 17.1236 9.0625 16.875V10.9375H3.125C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 10C2.1875 9.75136 2.28627 9.5129 2.46209 9.33709C2.6379 9.16127 2.87636 9.0625 3.125 9.0625H9.0625V3.125C9.0625 2.87636 9.16127 2.6379 9.33709 2.46209C9.5129 2.28627 9.75136 2.1875 10 2.1875C10.2486 2.1875 10.4871 2.28627 10.6629 2.46209C10.8387 2.6379 10.9375 2.87636 10.9375 3.125V9.0625H16.875C17.1236 9.0625 17.3621 9.16127 17.5379 9.33709C17.7137 9.5129 17.8125 9.75136 17.8125 10Z" fill="#2B4360" />
                                            </svg>
                                            Add Medication
                                        </div>
                                    </Button>
                                </div>
                            }

                            <Modal
                                show={MedicationAndTestsModel}
                                onHide={() => setMedicationAndTestsModel(false)}
                                header="Medication & Tests"
                                closeButton={true}
                            >
                                <MedicationAndTests
                                    setStep={setMedicationAndTestsStep}
                                    setStepper={setMedicationAndTestsStepper}
                                    step={MedicationAndTestsStep}
                                    stepper={MedicationAndTestsStepper}
                                    totalSteps={MedicationAndTestsTotalSteps}
                                    setEditForm={setEditFormWithTests}
                                    editForm={editFormWithTests}
                                    setMedicalPrescription={setMedicalPrescriptionWithTests}
                                    medicalPrescription={medicalPrescriptionWithTests}
                                    setMedicalPrescriptionDataShowHide={setMedicalPrescriptionWithTestsDataShowHide}
                                    medicalPrescriptionDataShowHide={medicalPrescriptionWithTestsDataShowHide}
                                    showEditFormShowModel={showEditFormShowModelWithTests}
                                    setShowEditFormShowModel={setShowEditFormShowModelWithTests}
                                    setMedicalPrescriptionWithTests={setMedicalPrescriptionWithTests}
                                    medicalPrescriptionWithTests={medicalPrescriptionWithTests}
                                    setMedicalPrescriptionWithTestsDataShowHide={setMedicalPrescriptionWithTestsDataShowHide}
                                    medicalPrescriptionWithTestsDataShowHide={medicalPrescriptionWithTestsDataShowHide}
                                    setTreatmentPlanModel={setMedicationAndTestsModel}
                                />
                            </Modal>

                            {/* edit time show model for Medication & Tests */}
                            <Modal
                                show={showEditFormShowModelWithTests}
                                onHide={() => { setShowEditFormShowModelWithTests(false); setMedicationAndTestsModel(true); setMedicalPrescriptionWithTestsDataShowHide(false); }}
                                header="Edit Medication Prescription"
                                closeButton={true}
                            >
                                <MedicationPrescriptionForm
                                    setShowEditFormShowModel={setShowEditFormShowModelWithTests}
                                    editForm={editFormWithTests}
                                    setTreatmentPlanModel={setMedicationAndTestsModel}
                                    setMedicalPrescription={setMedicalPrescriptionWithTests}
                                    medicalPrescription={medicalPrescriptionWithTests}
                                    setMedicalPrescriptionDataShowHide={setMedicalPrescriptionWithTestsDataShowHide}
                                    medicalPrescriptionDataShowHide={medicalPrescriptionWithTestsDataShowHide}
                                />
                            </Modal>

                            {/* only edit time show model for Medication & Tests */}
                            <Modal
                                show={editMedicationModel}
                                onHide={() => { setEditMedicationModel(false); }}
                                header="Edit Medication Prescription"
                                closeButton={true}
                            >
                                <MedicationPrescriptionForm
                                    setShowEditFormShowModel={setEditMedicationModel}
                                    editForm={editFormWithTests}
                                    medicalPrescription={medicalPrescriptionWithTests}
                                    setMedicalPrescription={setMedicalPrescriptionWithTests}
                                    medicalPrescriptionDataShowHide={true}

                                />

                            </Modal>

                            {/* only add time show model for Medication */}
                            <Modal
                                show={AddNewMedicationModel}
                                onHide={() => { setAddNewMedicationModel(false); }}
                                header="Add New Medication Prescription"
                                closeButton={true}
                            >
                                <MedicationPrescriptionForm
                                    saveBtnShow={"addNewSave"}
                                    setShowEditFormShowModel={setAddNewMedicationModel}
                                    setMedicalPrescription={setMedicalPrescriptionWithTests}
                                    medicalPrescription={medicalPrescriptionWithTests}
                                    medicalPrescriptionDataShowHide={true}

                                />

                            </Modal>

                        </>
                    </ContentContainer>

                    <ContentContainer className='mt-3'>

                        <h6 className='accordion-title'>Reports</h6>
                        <div className='text-center mt-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
                                <rect x="9.97522" y="5.6665" width="57.0109" height="68.0016" rx="2.86523" fill="#E5E7EB" />
                                <rect x="0.000488281" width="57.0109" height="73.6684" rx="2.86523" fill="#F3F4F6" />
                                <rect x="5.70288" y="5.66565" width="22.8044" height="22.5675" rx="1.43262" fill="#DDE1E8" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M17.1058 11.3075C16.3187 11.3075 15.6805 11.9456 15.6805 12.7328V15.5389H12.8144C12.0354 15.5389 11.4039 16.1704 11.4039 16.9494C11.4039 17.7284 12.0354 18.3598 12.8144 18.3598H15.6805V21.166C15.6805 21.9531 16.3187 22.5912 17.1058 22.5912C17.893 22.5912 18.5311 21.9531 18.5311 21.166V18.3598H21.3956C22.1746 18.3598 22.8061 17.7284 22.8061 16.9494C22.8061 16.1704 22.1746 15.5389 21.3956 15.5389H18.5311V12.7328C18.5311 11.9456 17.893 11.3075 17.1058 11.3075Z" fill="#B0B4C1" />
                                <rect x="5.70288" y="42.401" width="12.8274" height="2.82093" rx="1.41047" fill="#B0B4C1" />
                                <rect x="5.70288" y="50.9069" width="28.5054" height="2.82093" rx="1.41047" fill="#B0B4C1" />
                                <rect x="5.70288" y="59.4133" width="34.2065" height="2.82093" rx="1.41047" fill="#B0B4C1" />
                                <rect x="24.2065" y="42.4011" width="9.9769" height="2.82093" rx="1.41047" fill="#9CA3AF" />
                                <rect x="52.3091" y="47.4647" width="27.0782" height="25.5006" fill="#DDE1E8" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M65.8458 53.1305C65.0587 53.1305 64.4206 53.7686 64.4206 54.5558V58.797H60.1361C59.3536 58.797 58.7194 59.4313 58.7194 60.2137C58.7194 60.9961 59.3536 61.6304 60.1361 61.6304H64.4206V65.8722C64.4206 66.6594 65.0587 67.2975 65.8458 67.2975C66.633 67.2975 67.2711 66.6594 67.2711 65.8722V61.6304H71.5554C72.3378 61.6304 72.9721 60.9961 72.9721 60.2137C72.9721 59.4313 72.3378 58.797 71.5554 58.797H67.2711V54.5558C67.2711 53.7686 66.633 53.1305 65.8458 53.1305Z" fill="#B0B4C1" />
                                <path d="M51.494 33.1503C51.494 31.5678 52.7768 30.285 54.3593 30.285H77.1342C78.7166 30.285 79.9995 31.5678 79.9995 33.1503V37.3526C79.9995 38.1438 79.3581 38.7852 78.5668 38.7852H52.9266C52.1354 38.7852 51.494 38.1438 51.494 37.3526V33.1503Z" fill="#DDE1E8" />
                                <path d="M52.3091 45.1208L55.2939 38.7852L76.5704 38.785L79.3873 45.1208V48.0006H52.3091V45.1208Z" fill="#B0B4C1" />
                                <path d="M52.3091 71.3695H79.3873V77.1352C79.3873 78.7176 78.1045 80.0005 76.5221 80.0005H55.1743C53.5919 80.0005 52.3091 78.7176 52.3091 77.1352V71.3695Z" fill="#9CA3AF" />
                            </svg>
                            <p className="patient-accordion-content-subtitle my-3">No reports</p>
                            <Button variant="outline" disabled={false} >
                                <div className='d-flex justify-content-center align-items-center gap-2 '>

                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M17.8125 11.2503V16.2503C17.8125 16.4989 17.7137 16.7373 17.5379 16.9132C17.3621 17.089 17.1236 17.1878 16.875 17.1878H3.125C2.87636 17.1878 2.6379 17.089 2.46209 16.9132C2.28627 16.7373 2.1875 16.4989 2.1875 16.2503V11.2503C2.1875 11.0016 2.28627 10.7632 2.46209 10.5873C2.6379 10.4115 2.87636 10.3128 3.125 10.3128C3.37364 10.3128 3.6121 10.4115 3.78791 10.5873C3.96373 10.7632 4.0625 11.0016 4.0625 11.2503V15.3128H15.9375V11.2503C15.9375 11.0016 16.0363 10.7632 16.2121 10.5873C16.3879 10.4115 16.6264 10.3128 16.875 10.3128C17.1236 10.3128 17.3621 10.4115 17.5379 10.5873C17.7137 10.7632 17.8125 11.0016 17.8125 11.2503ZM7.53828 6.28853L9.0625 4.76588V11.2503C9.0625 11.4989 9.16127 11.7373 9.33709 11.9132C9.5129 12.089 9.75136 12.1878 10 12.1878C10.2486 12.1878 10.4871 12.089 10.6629 11.9132C10.8387 11.7373 10.9375 11.4989 10.9375 11.2503V4.76588L12.4617 6.29088C12.5489 6.37808 12.6525 6.44726 12.7664 6.49445C12.8803 6.54165 13.0025 6.56594 13.1258 6.56594C13.2491 6.56594 13.3712 6.54165 13.4852 6.49445C13.5991 6.44726 13.7026 6.37808 13.7898 6.29088C13.8771 6.20367 13.9462 6.10014 13.9934 5.9862C14.0406 5.87226 14.0649 5.75014 14.0649 5.62681C14.0649 5.50349 14.0406 5.38137 13.9934 5.26743C13.9462 5.15349 13.8771 5.04996 13.7898 4.96275L10.6648 1.83775C10.5777 1.75035 10.4743 1.681 10.3603 1.63369C10.2463 1.58637 10.1242 1.56201 10.0008 1.56201C9.87739 1.56201 9.75522 1.58637 9.64126 1.63369C9.52731 1.681 9.42382 1.75035 9.33672 1.83775L6.21172 4.96275C6.12451 5.04996 6.05534 5.15349 6.00814 5.26743C5.96095 5.38137 5.93666 5.50349 5.93666 5.62681C5.93666 5.87589 6.0356 6.11476 6.21172 6.29088C6.38784 6.467 6.62671 6.56594 6.87578 6.56594C7.12485 6.56594 7.36372 6.467 7.53984 6.29088L7.53828 6.28853Z" fill="#2B4360" />
                                    </svg>
                                    Upload Report
                                </div>
                            </Button>
                        </div>

                    </ContentContainer>

                </Col>
            </Row>
        </>
    );
}

export default AppointmentDetails;
