import React, { FormEvent, useEffect, useState } from 'react'

import { IoAdd } from 'react-icons/io5'
import Modal from './ui/Modal';
import { AddPartnerDetailsForm, PhysicalAssessment } from './form/AddPartnerDetailsForm';
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
// import PhysicalAssessment from '../assets/images/Pluse Sine.png';
import Simpleeditpro from '@/assets/images/Simpleeditpro.png';
import { partnerDetailData } from '@/utils/StaticData';
import Button from './ui/Button';
import { AddPartnerDetails } from './AddPartnerDetails';
import { FertilityAssessmentType } from '@/utils/types/interfaces';

export default function PartnerDetail({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
    const [addPartner, setAddPartner] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [showPartnerDetail, setShowPartnerDetail] = useState(true);
    const [loading, setLoading] = useState({});
    const [eventKey, setEventKey] = useState(0);
    console.log("eventKey", eventKey);

    const [modalEditTab, setModalEditTab] = useState<string | null>("basic");
    const [AddPhysicalAssessment, setAddPhysicalAssessment] = useState(false);

    const initialFormData: FertilityAssessmentType = {
        height: "",
        weight: "",
        bmi: "",
        bloodGroup: "",
        systolic: "",
        diastolic: "",
        heartRate: "",
        semenAnalysis: "",
        semenAnalysisContent: "",
        fertilityIssues: "",
        fertilityIssuesContent: "",
        fertilityTreatment: "",
        fertilityTreatmentContent: "",
        surgeries: "",
        surgeriesContent: "",
    };

    const [formData, setFormData] = useState<FertilityAssessmentType>(initialFormData);
    type FormError = Partial<Record<keyof FertilityAssessmentType, string>>;

    const initialFormError: FormError = {};
    const [formError, setFormError] = useState<FormError>(initialFormError);

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

    const handleAddPhysicalAssessment = (e: FormEvent<HTMLFormElement>) => {
        console.log("click ");

        e.preventDefault();

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
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.1641 8C15.1641 8.16576 15.0982 8.32473 14.981 8.44194C14.8638 8.55915 14.7048 8.625 14.5391 8.625H8.28906V14.875C8.28906 15.0408 8.22322 15.1997 8.10601 15.3169C7.9888 15.4342 7.82982 15.5 7.66406 15.5C7.4983 15.5 7.33933 15.4342 7.22212 15.3169C7.10491 15.1997 7.03906 15.0408 7.03906 14.875V8.625H0.789063C0.623302 8.625 0.464331 8.55915 0.347121 8.44194C0.229911 8.32473 0.164062 8.16576 0.164062 8C0.164062 7.83424 0.229911 7.67527 0.347121 7.55806C0.464331 7.44085 0.623302 7.375 0.789063 7.375H7.03906V1.125C7.03906 0.95924 7.10491 0.800269 7.22212 0.683058C7.33933 0.565848 7.4983 0.5 7.66406 0.5C7.82982 0.5 7.9888 0.565848 8.10601 0.683058C8.22322 0.800269 8.28906 0.95924 8.28906 1.125V7.375H14.5391C14.7048 7.375 14.8638 7.44085 14.981 7.55806C15.0982 7.67527 15.1641 7.83424 15.1641 8Z" fill="#2B4360" />
                            </svg>
                            <span className='ms-1'>Add Partner Details</span>
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
                {/* <div className="mb-0">
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
                </div> */}
                <AddPartnerDetails
                    setAddPartner={setAddPartner}
                    setShowContent={setShowContent}
                    setShowPartnerDetail={setShowPartnerDetail}
                    setShowData={setShowData}
                    modalEditTab={modalEditTab}
                    setModalEditTab={setModalEditTab}
                    showData={showData}

                />

            </Modal>

            {showContent && (

                <Row className="mt-4">
                    <Col md={7}>
                        <ContentContainer>
                            <div className='d-flex justify-content-between align-items-start '>
                                <div className='d-flex align-items-start align-items-sm-center gap-3 flex-column flex-sm-row'>
                                    <div>
                                        <Image
                                            src={showData?.profile?.profileImage || Simpleeditpro}
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
                                            <div className='doctor-profile-subheading'><svg width="19" height="18" className='me-1' viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.5 7.31243C15.5 6.2239 15.1841 5.15875 14.5907 4.24617C13.9974 3.33359 13.1519 2.61279 12.157 2.17119C11.1621 1.72958 10.0604 1.58615 8.98553 1.75827C7.91069 1.9304 6.90888 2.4107 6.10161 3.14092C5.29434 3.87113 4.71628 4.81989 4.43754 5.87214C4.1588 6.92438 4.19137 8.03489 4.53128 9.06899C4.87119 10.1031 5.50385 11.0164 6.35252 11.698C7.20119 12.3797 8.22942 12.8005 9.3125 12.9093V16.3124C9.3125 16.4616 9.37176 16.6047 9.47725 16.7102C9.58274 16.8157 9.72582 16.8749 9.875 16.8749C10.0242 16.8749 10.1673 16.8157 10.2727 16.7102C10.3782 16.6047 10.4375 16.4616 10.4375 16.3124V12.9093C11.8243 12.7682 13.1095 12.1178 14.0446 11.084C14.9797 10.0502 15.4983 8.70641 15.5 7.31243ZM9.875 11.8124C8.98498 11.8124 8.11496 11.5485 7.37493 11.054C6.63491 10.5596 6.05814 9.85678 5.71754 9.03451C5.37695 8.21224 5.28783 7.30744 5.46147 6.43453C5.6351 5.56161 6.06368 4.75979 6.69302 4.13045C7.32236 3.50112 8.12418 3.07253 8.99709 2.8989C9.87001 2.72527 10.7748 2.81438 11.5971 3.15497C12.4193 3.49557 13.1221 4.07235 13.6166 4.81237C14.1111 5.55239 14.375 6.42242 14.375 7.31243C14.3737 8.50551 13.8992 9.64934 13.0555 10.493C12.2119 11.3366 11.0681 11.8111 9.875 11.8124Z" fill="#8A8D93" />
                                            </svg>
                                                {showData.profile.basic_detail_gender}</div>
                                            <div className='doctor-profile-subheading'><svg width="21" height="20" className='me-1' viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_2367_101200)">
                                                    <path d="M10.4141 19.7925C9.37242 19.7925 8.28909 19.6259 7.20576 19.2509C2.12242 17.5009 -0.585911 11.9175 1.16409 6.79255C2.91409 1.70921 8.49742 -0.999119 13.6224 0.750881C15.9974 1.58421 17.9558 3.25088 19.0808 5.45921C19.2474 5.75088 19.1224 6.12588 18.8308 6.25088C18.5391 6.41755 18.1641 6.29255 18.0391 6.00088C17.0391 4.04255 15.3308 2.58421 13.2474 1.87588C8.74742 0.334214 3.83076 2.70921 2.28909 7.20921C0.747422 11.7092 3.12242 16.5842 7.58076 18.1259C12.0391 19.6675 16.9558 17.2925 18.4974 12.8342C18.6224 12.5009 18.9558 12.3759 19.2474 12.4592C19.5808 12.5842 19.7058 12.9175 19.6224 13.2092C18.2891 17.2509 14.4558 19.7925 10.4141 19.7925Z" fill="#8A8D93" />
                                                    <path d="M18.7057 6.4987L15.2474 6.45703C14.9141 6.45703 14.6641 6.16536 14.6641 5.83203C14.6641 5.4987 14.9557 5.2487 15.2891 5.2487L18.1641 5.29036L18.2057 2.41536C18.2057 2.08203 18.4557 1.83203 18.8307 1.83203C19.1641 1.83203 19.4141 2.1237 19.4141 2.45703L19.3307 5.8737C19.3307 6.04036 19.2474 6.16536 19.1641 6.29036C19.0391 6.41536 18.8724 6.4987 18.7057 6.4987Z" fill="#8A8D93" />
                                                    <path d="M7.83075 11.375L7.45575 10.5H5.78908L5.41408 11.375H4.45575L6.20575 7.375H7.08075L8.83075 11.375H7.83075ZM6.62242 8.58333L6.12242 9.75H7.12242L6.62242 8.58333ZM11.4141 10.875C11.1224 11.1667 10.7891 11.3333 10.4141 11.3333C9.99742 11.3333 9.66408 11.2083 9.41408 10.9167C9.12242 10.625 8.99742 10.2917 8.99742 9.83333C8.99742 9.375 9.12242 9 9.41408 8.70833C9.70575 8.41667 10.0391 8.25 10.3724 8.25C10.7474 8.25 11.0391 8.41667 11.2891 8.70833V8.29167H12.1641V10.9583C12.1641 11.25 12.1224 11.4583 12.0391 11.7083C11.9557 11.9167 11.8307 12.0833 11.6641 12.2083C11.3307 12.4583 10.9557 12.5833 10.5391 12.5833C10.2891 12.5833 10.0807 12.5417 9.83075 12.4583C9.58075 12.375 9.37242 12.2917 9.20575 12.125L9.53908 11.4583C9.83075 11.6667 10.1224 11.7917 10.4557 11.7917C10.7891 11.7917 11.0391 11.7083 11.2057 11.5417C11.3307 11.4583 11.4141 11.2083 11.4141 10.875ZM11.2891 9.79167C11.2891 9.54167 11.2057 9.33333 11.0807 9.20833C10.9557 9.08333 10.7891 9 10.5807 9C10.3724 9 10.2057 9.08333 10.0391 9.20833C9.87242 9.33333 9.83075 9.54167 9.83075 9.79167C9.83075 10.0417 9.91408 10.25 10.0391 10.375C10.1641 10.5417 10.3724 10.5833 10.5807 10.5833C10.7891 10.5833 10.9557 10.5 11.0807 10.375C11.2474 10.25 11.2891 10.0417 11.2891 9.79167ZM15.6224 10.9583C15.2891 11.2917 14.8724 11.4583 14.4141 11.4583C13.9557 11.4583 13.5391 11.3333 13.2474 11.0417C12.9557 10.75 12.7891 10.375 12.7891 9.875C12.7891 9.375 12.9557 9 13.2474 8.70833C13.5391 8.41667 13.9141 8.29167 14.3307 8.29167C14.7474 8.29167 15.1224 8.41667 15.4141 8.66667C15.7057 8.91667 15.8724 9.29167 15.8724 9.70833V10.1667H13.6224C13.6641 10.3333 13.7474 10.4583 13.8724 10.5833C14.0391 10.7083 14.2057 10.75 14.3724 10.75C14.6641 10.75 14.9141 10.6667 15.1224 10.4583L15.6224 10.9583ZM14.8307 9.125C14.7057 9.04167 14.5807 8.95833 14.4141 8.95833C14.2474 8.95833 14.0807 9 13.9557 9.125C13.8307 9.20833 13.7474 9.375 13.7057 9.54167H15.0391C14.9974 9.375 14.9141 9.20833 14.8307 9.125Z" fill="#8A8D93" />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_2367_101200">
                                                        <rect width="20" height="20" fill="white" transform="translate(0.164062)" />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                                {showData.profile.basic_detail_age
                                                } Years</div>
                                        </div>
                                        <div className='pt-sm-2 p-0 d-flex gap-2 '>
                                            <div className='doctor-profile-subheading'><svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.482 12.7819L13.8016 11.1327L13.7914 11.128C13.6003 11.0462 13.3919 11.0134 13.185 11.0325C12.978 11.0516 12.7791 11.122 12.6063 11.2373C12.5859 11.2508 12.5663 11.2654 12.5477 11.2811L10.6461 12.9022C9.44141 12.317 8.19766 11.0827 7.61251 9.89359L9.23594 7.96312C9.25157 7.94359 9.26641 7.92406 9.28048 7.90297C9.39331 7.73055 9.46177 7.53291 9.47976 7.32763C9.49775 7.12236 9.46472 6.91582 9.3836 6.7264V6.71703L7.72969 3.03031C7.62246 2.78286 7.43807 2.57673 7.20406 2.44268C6.97005 2.30864 6.69895 2.25387 6.43126 2.28656C5.37264 2.42586 4.40093 2.94575 3.69761 3.74914C2.99429 4.55252 2.60747 5.58444 2.60938 6.65219C2.60938 12.8553 7.65626 17.9022 13.8594 17.9022C14.9271 17.9041 15.9591 17.5173 16.7624 16.814C17.5658 16.1106 18.0857 15.1389 18.225 14.0803C18.2578 13.8127 18.2031 13.5417 18.0692 13.3077C17.9353 13.0737 17.7293 12.8892 17.482 12.7819ZM13.8594 16.6522C11.2081 16.6493 8.66625 15.5948 6.79151 13.7201C4.91678 11.8453 3.86228 9.30346 3.85938 6.65219C3.85644 5.88929 4.1313 5.1514 4.63261 4.57633C5.13393 4.00126 5.82743 3.62833 6.5836 3.52719C6.58329 3.5303 6.58329 3.53344 6.5836 3.53656L8.22423 7.20844L6.60938 9.14125C6.59299 9.16011 6.5781 9.18022 6.56485 9.2014C6.44728 9.38181 6.37832 9.58953 6.36463 9.80442C6.35094 10.0193 6.393 10.2341 6.48673 10.428C7.19454 11.8756 8.65313 13.3233 10.1164 14.0303C10.3117 14.1232 10.5277 14.1638 10.7434 14.1482C10.9591 14.1325 11.167 14.0613 11.3469 13.9412C11.3669 13.9277 11.3862 13.9131 11.4047 13.8975L13.3039 12.2772L16.9758 13.9217C16.9758 13.9217 16.982 13.9217 16.9844 13.9217C16.8845 14.679 16.5121 15.3739 15.9369 15.8764C15.3617 16.379 14.6232 16.6548 13.8594 16.6522Z" fill="#8A8D93" />
                                            </svg>
                                                {showData.profile.basic_detail_phone}</div>
                                            <div className='doctor-profile-subheading'><svg width="21" height="21" viewBox="0 0 25 25" className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.39966 5.57422H21.3997V18.3242C21.3997 18.5231 21.3206 18.7139 21.18 18.8545C21.0393 18.9952 20.8486 19.0742 20.6497 19.0742H4.14966C3.95075 19.0742 3.75998 18.9952 3.61933 18.8545C3.47868 18.7139 3.39966 18.5231 3.39966 18.3242V5.57422Z" stroke="#8A8D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M21.3997 5.57422L12.3997 13.8242L3.39966 5.57422" stroke="#8A8D93" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                                {showData.profile.basic_detail_email}</div>
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
                                                <svg width="14" height="14" viewBox="0 0 14 14" className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                                </svg> Edit
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
                                            <div className='d-flex justify-content-between align-items-center'>
                                                <Col lg={5} md={12} sm={4}>
                                                    <div className="mb-3">
                                                        <h6 className="mb-1 contact-details-emergency">Physical Exercise</h6>
                                                        <p className="mb-2 border-box-orange-font box-border-orange d-inline-block">
                                                            {item.exercise || 'Not specified'}
                                                        </p>
                                                    </div>
                                                </Col>

                                                <Col lg={7} md={12} sm={8}>
                                                    <div className="mb-3 pe-md-3">
                                                        <h6 className="mb-1 contact-details-emergency">Stress Level</h6>
                                                        <p className="mb-2 d-inline-block border-box-red-font box-border-red">
                                                            {item.stress || 'Not specified'}
                                                        </p>
                                                    </div>

                                                </Col>
                                            </div>
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

                                {/* <Button className="medical-history-add-btn medical-history-edit-btn-font mb-3" onClick={() => { setAddPartner(true); setModalEditTab("physical & fertility assessment"); setEventKey(0); }}>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.7744 9.5C18.7744 9.69891 18.6954 9.88968 18.5547 10.0303C18.4141 10.171 18.2233 10.25 18.0244 10.25H10.5244V17.75C10.5244 17.9489 10.4454 18.1397 10.3047 18.2803C10.1641 18.421 9.97333 18.5 9.77441 18.5C9.5755 18.5 9.38474 18.421 9.24408 18.2803C9.10343 18.1397 9.02441 17.9489 9.02441 17.75V10.25H1.52441C1.3255 10.25 1.13474 10.171 0.994084 10.0303C0.853432 9.88968 0.774414 9.69891 0.774414 9.5C0.774414 9.30109 0.853432 9.11032 0.994084 8.96967C1.13474 8.82902 1.3255 8.75 1.52441 8.75H9.02441V1.25C9.02441 1.05109 9.10343 0.860322 9.24408 0.71967C9.38474 0.579018 9.5755 0.5 9.77441 0.5C9.97333 0.5 10.1641 0.579018 10.3047 0.71967C10.4454 0.860322 10.5244 1.05109 10.5244 1.25V8.75H18.0244C18.2233 8.75 18.4141 8.82902 18.5547 8.96967C18.6954 9.11032 18.7744 9.30109 18.7744 9.5Z" fill="#2B4360" />
                                    </svg>

                                </Button> */}
                                <Button className="medical-history-add-btn medical-history-edit-btn-font mb-3" onClick={() => {
                                    setAddPhysicalAssessment(true)
                                }}>

                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.7744 9.5C18.7744 9.69891 18.6954 9.88968 18.5547 10.0303C18.4141 10.171 18.2233 10.25 18.0244 10.25H10.5244V17.75C10.5244 17.9489 10.4454 18.1397 10.3047 18.2803C10.1641 18.421 9.97333 18.5 9.77441 18.5C9.5755 18.5 9.38474 18.421 9.24408 18.2803C9.10343 18.1397 9.02441 17.9489 9.02441 17.75V10.25H1.52441C1.3255 10.25 1.13474 10.171 0.994084 10.0303C0.853432 9.88968 0.774414 9.69891 0.774414 9.5C0.774414 9.30109 0.853432 9.11032 0.994084 8.96967C1.13474 8.82902 1.3255 8.75 1.52441 8.75H9.02441V1.25C9.02441 1.05109 9.10343 0.860322 9.24408 0.71967C9.38474 0.579018 9.5755 0.5 9.77441 0.5C9.97333 0.5 10.1641 0.579018 10.3047 0.71967C10.4454 0.860322 10.5244 1.05109 10.5244 1.25V8.75H18.0244C18.2233 8.75 18.4141 8.82902 18.5547 8.96967C18.6954 9.11032 18.7744 9.30109 18.7744 9.5Z" fill="#2B4360" />
                                    </svg>

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
                                        <Accordion.Body className='pt-0'>
                                            <Row className='g-3'>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={hiegthImg} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='contact-details-emergency'>Height</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>
                                                                {item.height} <span>({(item.height * 2.54).toFixed(0)} cm)</span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={weightImg} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='contact-details-emergency'>Weight</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.weight} kg</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={BMIIMG} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='contact-details-emergency'>BMI</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.bmi} (Normal)</span>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={BloodGroup} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='contact-details-emergency'>Blood Group</span>
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.bloodGroup}</span>
                                                        </div>
                                                    </div>
                                                </Col>

                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={BloodPressure} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='contact-details-emergency'>Blood Pressure</span>

                                                            {/* <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.systolic}/{item.diastolic} mmHg</span> */}
                                                            <span className='phisical-assessment-accordion-showData-box-subtitle'>
                                                                {item.systolic}
                                                                {item.systolic && item.diastolic && "/"}
                                                                {item.diastolic}
                                                                {(item.systolic || item.diastolic) && " mmHg"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col sm={6}>
                                                    <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                        <Image src={HeartRate} alt="Age" width={42} height={42} />
                                                        <div className='d-flex flex-column gap-1'>
                                                            <span className='contact-details-emergency'>Hearth Rate</span>
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
                                            <svg width="14" height="14" viewBox="0 0 14 14" className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                            </svg> Edit
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

            <Modal
                show={AddPhysicalAssessment}
                onHide={() => setAddPhysicalAssessment(false)}
                header="Physical Assessment"
                closeButton={true}
                size="lg"
            >
                {/* <h1>forms</h1> */}
                <PhysicalAssessment
                    formData={formData}
                    setFormData={setFormData}
                    setShowData={setShowData}
                    showData={showData}
                    initialData={initialData}
                    formError={formError}
                    setFormError={setFormError}
                />

                <div className='d-flex gap-2'>
                    <Button className="w-100 mt-3" variant="outline" disabled={false} >
                        Cancel
                    </Button>
                    <Button className="w-100 mt-3" variant="default" disabled={false} type="button" onClick={(e: any) => handleAddPhysicalAssessment(e)}
                    >
                        Save
                    </Button>
                </div>
            </Modal>

        </>
    )
}
