import React, { useEffect, useState } from 'react'
import Button from './ui/Button'
import { IoAdd } from 'react-icons/io5'
import Modal from './ui/Modal';
import { AddPartnerDetailsForm } from './form/AddPartnerDetailsForm';
import { Accordion, Col, Dropdown, Row } from 'react-bootstrap';
import Image from 'next/image';
import PartnerImage from "../assets/images/Profile_Images.png";
import ContentContainer from './ui/ContentContainer';
import ProfileGender from '../assets/images/Profile_Gender.png'
import ProfileId from '../assets/images/Profile_Id.png'
import ProfileAge from '../assets/images/Profile_Age.png'
import ProfileDob from '../assets/images/Profile_Calendar.png'
import Phone from '../assets/images/Phone.png'
import Email from '../assets/images/Email.png'
import EditIcon from '../assets/images/EditIcon.png'
import { PartnerData, partnerData } from '@/data/partnerData';
import hiegthImg from '../assets/images/Physical-assement-hiegth-icons.png'
import weightImg from '../assets/images/Physical-assement-weight-icons.png'
import BMIIMG from '../assets/images/Physical-assement-bmi.png'
import BloodGroup from '../assets/images/Physical-assement-blod-group-icons.png'
import BloodPressure from '../assets/images/Physical-assement-presure-icons.png'
import HeartRate from '../assets/images/Physical-assement-heart-rate-icons.png'
import MedicalHistory from './form/MedicalHistory';
import PhysicalAssessment from '../assets/images/Pluse Sine.png';
import { partnerDetailData } from '@/utils/StaticData';



export default function PartnerDetail({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    const [addPartner, setAddPartner] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showPartnerDetail, setShowPartnerDetail] = useState(true);
    const [loading, setLoading] = useState({});
    const [eventKey, setEventKey] = useState(0);
    console.log("eventKey", eventKey);

    const [modalEditTab, setModalEditTab] = useState<string | null>("basic");
    console.log("modalEditTab11111", modalEditTab);
    console.log("addPartner", addPartner);


    const [showData, setShowData] = useState<any>(partnerDetailData);

    useEffect(() => {
        setLoading(true)
        setShowData(partnerDetailData);

    }, [])

    console.log("showData", showData);
    const formatDate = (dateString?: string) => {
        const date = dateString ? new Date(dateString) : new Date();
        return date.toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    const handelEdit = () => {

        setAddPartner(true);
        setModalEditTab("medical history");
    }
    return (
        <>
            {showPartnerDetail && (
                <div className='d-flex align-items-center justify-content-center vh-100'>
                    <div className="text-center">
                        <svg width="86" height="79" viewBox="0 0 86 79" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M34.387 52.6988L31.187 56.6988C29.587 58.5988 26.687 58.5988 25.087 56.6988L21.887 52.6988L23.4869 44.8984H32.7869L34.387 52.6988Z" fill="#F3F4F6" />
                            <path d="M22.7916 48.2969L23.5231 44.7734H32.7604L33.4557 48.1524C31.8557 49.7524 25.7916 50.2969 22.7916 48.2969Z" fill="#D7D7D7" fillOpacity="0.4" />
                            <path d="M42.787 29.8984V46.7984C42.787 51.0984 78.787 51.0984 78.787 46.7984V29.8984H42.787Z" fill="#9CA3AF" />
                            <path d="M67.025 52.9059L63.825 56.9059C62.225 58.8059 59.325 58.8059 57.725 56.9059L54.525 52.9059L56.125 45.1055H65.425L67.025 52.9059Z" fill="#F3F4F6" />
                            <path d="M55.4297 48.5039L56.1612 44.9805H65.3984L66.0938 48.3594C64.4937 49.9594 58.4297 50.5039 55.4297 48.5039Z" fill="#D7D7D7" fillOpacity="0.4" />
                            <path d="M85.6869 78.2992H35.9869V70.1992C35.9869 64.3992 39.6869 59.1992 45.1869 57.2992L54.5869 52.6992C57.7869 56.6992 63.7869 56.6992 66.9869 52.6992L76.3869 57.2992C81.8869 59.1992 85.5869 64.3992 85.5869 70.1992V78.2992H85.6869Z" fill="#9CA3AF" />
                            <path opacity="0.1" d="M62.3869 70.1992C62.3869 63.2992 58.9869 56.9992 53.4869 53.1992L45.1869 57.1992C39.6869 59.0992 35.9869 64.2992 35.9869 70.0992V78.1992H62.3869V70.1992Z" fill="#676767" />
                            <path opacity="0.1" d="M43.0869 29.8984H42.7869V46.9984C45.8869 43.5984 48.0869 39.4984 49.5869 36.1984C53.4869 34.5984 56.2869 30.9984 56.3869 26.4984C56.4869 22.9984 54.9869 19.8984 52.5869 17.8984C52.0869 13.0984 50.787 8.89844 48.787 5.39844C45.187 8.99844 43.0869 14.6984 43.0869 22.4984C38.1869 22.7984 38.4869 29.3984 43.0869 29.8984Z" fill="#926892" />
                            <path d="M78.487 22.3992C78.487 7.99922 71.287 0.699219 60.787 0.699219C50.287 0.699219 43.187 7.99922 43.187 22.3992C37.787 22.7992 38.587 30.5992 44.387 29.8992C49.287 43.5992 56.187 47.1992 60.787 47.1992C65.487 47.1992 72.287 43.5992 77.187 29.8992C83.087 30.5992 83.887 22.7992 78.487 22.3992Z" fill="#F3F4F6" />
                            <path d="M60.7869 0.699219C50.2869 0.699219 43.0869 8.09922 43.0869 22.3992C43.7869 20.4992 44.5869 19.0992 45.3869 17.9992C52.4869 8.49922 62.5869 27.0992 78.3869 22.3992C78.4869 7.99922 71.2869 0.699219 60.7869 0.699219Z" fill="#9CA3AF" />
                            <path opacity="0.1" d="M43.0869 29.8984H42.7869V46.9984C45.8869 43.5984 48.0869 39.4984 49.5869 36.1984C53.4869 34.5984 56.2869 30.9984 56.3869 26.4984C56.4869 22.9984 54.9869 19.8984 52.5869 17.8984C52.0869 13.0984 50.787 8.89844 48.787 5.39844C45.187 8.99844 43.0869 14.6984 43.0869 22.4984C38.1869 22.7984 38.4869 29.3984 43.0869 29.8984Z" fill="#676767" />
                            <path d="M55.2869 78.2992H0.986938V70.1992C0.986938 64.3992 4.68694 59.1992 10.1869 57.2992L21.8869 52.6992C25.0869 56.6992 31.0869 56.6992 34.2869 52.6992L45.9869 57.2992C51.4869 59.1992 55.1869 64.3992 55.1869 70.1992V78.2992H55.2869Z" fill="#DDE1E8" />
                            <path d="M45.7869 22.3992C45.7869 7.99922 38.5869 0.699219 28.0869 0.699219C17.5869 0.699219 10.4869 7.99922 10.4869 22.3992C5.08689 22.7992 5.88689 30.5992 11.6869 29.8992C16.5869 43.5992 23.4869 47.2992 28.0869 47.2992C32.6869 47.2992 39.5869 43.6992 44.4869 29.9992C50.3869 30.5992 51.1869 22.7992 45.7869 22.3992Z" fill="#F3F4F6" />
                            <path d="M28.0869 0.699219C38.5869 0.699219 45.7869 8.09922 45.7869 22.3992C38.5869 3.99922 28.0869 27.5992 10.4869 22.3992C10.4869 7.99922 17.6869 0.699219 28.0869 0.699219Z" fill="#AFB6C3" />
                            <path d="M42.3369 70.832C42.3369 70.2797 42.7846 69.832 43.3369 69.832C43.8892 69.832 44.3369 70.2797 44.3369 70.832V78.2979H42.3369V70.832Z" fill="#C5C9D0" />
                            <path d="M75.7197 70.832C75.7197 70.2797 76.1674 69.832 76.7197 69.832C77.272 69.832 77.7197 70.2797 77.7197 70.832V78.2979H75.7197V70.832Z" fill="#8D929C" />
                            <path d="M10.7008 70.832C10.7008 70.2797 11.1485 69.832 11.7008 69.832C12.2531 69.832 12.7008 70.2797 12.7008 70.832V78.2979H10.7008V70.832Z" fill="#C5C9D0" />
                        </svg>

                        <p className='patient-accordion-content-subtitle my-3'>No partner details</p>
                        <Button variant="outline" disabled={false} contentSize="medium" onClick={() => setAddPartner(true)}>
                            <IoAdd /> Add Partner Details
                        </Button>

                    </div>
                </div>
            )}

            <Modal
                show={addPartner}
                onHide={() => setAddPartner(false)}
                header="Add Partner "
                closeButton={true}
                size="lg"
            >
                <div className="mb-0">
                    <AddPartnerDetailsForm
                        setShowContent={setShowContent}
                        setShowPartnerDetail={setShowPartnerDetail}
                        setAddPartner={setAddPartner}
                        setShowData={setShowData}
                        modalEditTab={modalEditTab}
                        setModalEditTab={setModalEditTab}
                        showData={showData}
                        eventKey={eventKey === 1}
                    />
                </div>
            </Modal>


            {showContent && (

                <Row className="mt-4">
                    <Col md={7}>
                        <ContentContainer>


                            <div className='d-flex justify-content-between align-items-start '>
                                <div className='d-flex align-items-start align-items-sm-center gap-3 flex-column flex-sm-row'>
                                    <div>
                                        <Image
                                            src={PartnerImage}
                                            alt="PartnerImage"
                                            width={90}
                                            height={90}
                                            className="rounded-3"
                                        />
                                    </div>
                                    <div>
                                        <div className="d-flex align-items-center mb-1">
                                            <h6 className="mb-0 doctor-profile-heading me-2">{showData.profile.basic_detail_name}</h6>
                                        </div>

                                        <div className='pt-sm-1 p-0 d-flex gap-2 '>
                                            <span className='doctor-profile-subheading'><Image src={ProfileGender} alt="Gender" width={16} height={16} className="me-1" /> {showData.profile.basic_detail_gender}</span>
                                            <span className='doctor-profile-subheading'><Image src={ProfileAge} alt="Age" width={16} height={16} className="me-1" /> {showData.profile.basic_detail_age
                                            } Years</span>
                                        </div>
                                        <div className='pt-sm-1 p-0 d-flex gap-2 '>
                                            <span className='doctor-profile-subheading'><Image src={Phone} alt="contact number" width={16} height={16} className="me-1" />  {showData.profile.basic_detail_phone}</span>
                                            <span className='doctor-profile-subheading'><Image src={Email} alt="email" width={18} height={16} className="me-1" /> {showData.profile.basic_detail_email}</span>
                                        </div>




                                    </div>
                                </div>

                            </div>
                        </ContentContainer>
                        <ContentContainer className="mt-4">
                            {[
                                {
                                    ...showData.medicalHistory,
                                    familyMedicalHistory: showData.medicalHistory.familyMedicalHistory,
                                    medical_surgeries: showData.medicalHistory.surgeries,
                                    medical_medical_condition: showData.medicalHistory.medicalConditionAllergies,
                                    lifestyle: showData.medicalHistory.lifestyle,
                                    exercise: showData.medicalHistory.exercise,
                                    stress: showData.medicalHistory.stress,
                                    medicationContent: showData.medicalHistory.medicationContent,

                                },
                            ].map((item: any, index: number) => {
                                return (
                                    <div key={index} className="medical-history-details text-start">
                                        <div>

                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <p className="contact-details-heading mb-3">Medical History</p>
                                            <Button className="medical-history-edit-btn medical-history-edit-btn-font mb-3" onClick={() => handelEdit()}>
                                                <Image src={EditIcon} alt="Edit" /> Edit
                                            </Button>
                                        </div>

                                        <Row>

                                            <Col lg={5} md={12}>
                                                <div className="mb-3">
                                                    <h6 className="mb-1 contact-details-emergency">Current Medications</h6>
                                                    <p className="mb-2 accordion-title-detail">
                                                        {item.medication
                                                            === 'yes'
                                                            ? item.medicationcontent
                                                                ? `Yes, ${item.medicationcontent}`
                                                                : 'Yes'
                                                            : 'No'}
                                                    </p>
                                                </div>
                                            </Col>

                                            <Col lg={7} md={12}>
                                                <div className="mb-3">
                                                    <h6 className="mb-1 contact-details-emergency">Surgeries</h6>
                                                    <p className="mb-2 accordion-title-detail">
                                                        {item.surgeries
                                                            === 'yes'
                                                            ? item.surgeriescontent
                                                                ? `Yes, ${item.surgeriescontent}`
                                                                : 'Yes'
                                                            : 'No'}
                                                    </p>
                                                </div>
                                            </Col>

                                            <Col lg={12} md={12}>
                                                <div className="mb-3">
                                                    <h6 className="mb-1 contact-details-emergency">Medical condition / Allergies</h6>
                                                    {item.MedicalconditionAllergies?.length > 0 ? (
                                                        item.MedicalconditionAllergies.map((cond: string, i: number) => (
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

                                            <Col lg={12} md={12}>
                                                <div className="mb-3">
                                                    <h6 className="mb-1 contact-details-emergency">Family History</h6>
                                                    {item.familyMedicalHistory?.length > 0 ? (
                                                        <ul className="mb-2">
                                                            {typeof item.familyMedicalHistory === 'string' ? (
                                                                <li className="medical-emergency-fimily-history">
                                                                    {item.familyMedicalHistory.trim()}
                                                                </li>
                                                            ) : (
                                                                item.familyMedicalHistory.map((fh: string, i: number) => (
                                                                    <li key={i} className="medical-emergency-fimily-history">
                                                                        {fh.trim()}
                                                                    </li>
                                                                ))
                                                            )}
                                                        </ul>
                                                    ) : (
                                                        <p className="mb-2 d-block">
                                                            No medical conditions recorded
                                                        </p>
                                                    )}
                                                </div>
                                            </Col>

                                            <Col lg={12} md={12}>
                                                <div className="mb-3">
                                                    <h6 className="mb-1 contact-details-emergency">Lifestyle</h6>
                                                    {typeof item.lifestyle === 'string' ? (
                                                        <p className="mb-2 d-inline-block border-box-blue-font box-border-blue me-2">
                                                            {item.lifestyle.trim()}
                                                        </p>
                                                    ) : (
                                                        item.lifestyle?.map((lifestyle: string, i: number) => (
                                                            <p key={i} className="mb-2 d-inline-block border-box-blue-font box-border-blue me-2">
                                                                {lifestyle.trim()}
                                                            </p>
                                                        ))
                                                    )}
                                                </div>
                                            </Col>

                                            <Col lg={5} md={12}>
                                                <div className="mb-3">
                                                    <h6 className="mb-1 contact-details-emergency">Physical Exercise</h6>
                                                    <p className="mb-2 border-box-orange-font box-border-orange d-inline-block">
                                                        {item.exercise || 'Not specified'}
                                                    </p>
                                                </div>
                                            </Col>

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
                        </ContentContainer>
                    </Col>
                    <Col md={5}>
                        <ContentContainer>
                            <div className='d-flex justify-content-between align-items-center'>
                                <p className="contact-details-heading">Physical Assessment </p>
                                <Button className="medical-history-edit-btn medical-history-edit-btn-font mb-3">
                                    <Image src={PhysicalAssessment} alt="Edit" onClick={() => { setAddPartner(true); setModalEditTab("physical & fertility assessment"); setEventKey(0); }} />
                                </Button>
                            </div>
                            <Accordion defaultActiveKey="0">

                                {showData.PhysicalAssessmentData?.map((item: any, index: any) => (
                                    <Accordion.Item eventKey={index.toString()} className='phisical-assessment-accordion-item mb-3' key={index}>
                                        <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                            <div className='phisical-assessment-accordion-title-showData'>
                                                {formatDate(item.date)}
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <Row className='g-3'>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={hiegthImg} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='phisical-assessment-accordion-showData-box-title'>Height</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.height}</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={weightImg} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='phisical-assessment-accordion-showData-box-title'>Weight</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.weight} kg</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={BMIIMG} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='phisical-assessment-accordion-showData-box-title'>BMI</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.bmi} (Normal)</span>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={BloodGroup} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='phisical-assessment-accordion-showData-box-title'>Blood Group</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.bloodGroup}</span>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={BloodPressure} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='phisical-assessment-accordion-showData-box-title'>Blood Pressure</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.systolic}/{item.diastolic}</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={HeartRate} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='phisical-assessment-accordion-showData-box-title'>Hearth Rate</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.heartRate} bpm</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </ContentContainer>
                        <ContentContainer className="mt-4">
                            {[
                                {

                                    ...showData.fertilityAssessment,
                                    semenAnalysis: showData.fertilityAssessment.semenAnalysis,
                                    fertilityIssues: showData.fertilityAssessment.fertilityIssues,
                                    fertilityTreatment: showData.fertilityAssessment.fertilityTreatment,
                                    surgeries: showData.fertilityAssessment.surgeries,
                                    semenAnalysisContent: showData.fertilityAssessment.semenAnalysisContent,
                                    fertilityIssuesContent: showData.fertilityAssessment.fertilityIssuesContent,
                                    fertilityTreatmentContent: showData.fertilityAssessment.fertilityTreatmentContent,
                                    surgeriesContent: showData.fertilityAssessment.surgeriesContent,
                                },
                            ].map((item: any, index: number) => (
                                <div key={index} className="medical-history-details text-start">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className="contact-details-heading mb-3">Fertility Assessment</p>
                                        <Button className="medical-history-edit-btn medical-history-edit-btn-font mb-3" onClick={() => { setAddPartner(true); setModalEditTab("physical & fertility assessment"); setEventKey(1); }}>
                                            <Image src={EditIcon} alt="Edit" /> Edit
                                        </Button>
                                    </div>

                                    <Row>
                                        <Col lg={6} md={12}>
                                            <div className="mb-3">
                                                <h6 className="mb-1 contact-details-emergency">Semen Analysis</h6>
                                                <p className="mb-2 accordion-title-detail">
                                                    {item.semenAnalysis
                                                        === 'yes'
                                                        ? item.semenAnalysisContent
                                                            ? `Yes, ${item.semenAnalysisContent}`
                                                            : 'Yes'
                                                        : 'No'}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col lg={6} md={12}>
                                            <div className="mb-3">
                                                <h6 className="mb-1 contact-details-emergency">Fertility Issues</h6>
                                                <p className="mb-2 accordion-title-detail">
                                                    {item.fertilityIssues
                                                        === 'yes'
                                                        ? item.fertilityIssuesContent
                                                            ? `Yes, ${item.fertilityIssuesContent}`
                                                            : 'Yes'
                                                        : 'No'}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col lg={6} md={12}>
                                            <div className="mb-3">
                                                <h6 className="mb-1 contact-details-emergency">Fertility Treatment</h6>
                                                <p className="mb-2 accordion-title-detail">

                                                    {item.fertilityTreatment
                                                        === 'yes'
                                                        ? item.fertilityTreatmentContent
                                                            ? `Yes, ${item.fertilityTreatmentContent}`
                                                            : 'Yes'
                                                        : 'No'}
                                                </p>
                                            </div>
                                        </Col>

                                        <Col lg={6} md={12}>
                                            <div className="mb-3">
                                                <h6 className="mb-1 contact-details-emergency">Surgeries</h6>
                                                <p className="mb-2 accordion-title-detail">

                                                    {item.surgeries
                                                        === 'yes'
                                                        ? item.surgeriesContent
                                                            ? `Yes, ${item.surgeriesContent}`
                                                            : 'Yes'
                                                        : 'No'}
                                                </p>
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </ContentContainer>
                    </Col>


                </Row>
            )}
        </>
    )
}
