"use client"

import "../style/editprofile.css";
import { useState } from "react";
import PersonalDetails from "./form/Edit-Basic-Details";
import KYCDetails from "./form/Edit-Kyc-Details";
import CustomTabs from "./ui/CustomTabs";
import ContentContainer from "./ui/ContentContainer";
import Image from "next/image";
import { Col, Row } from "react-bootstrap";
import ClinicImg from '@/assets/images/GoodHealth Clinic.png';
import ClinicImg2 from '@/assets/images/Fertility Clinic.png';
import MaiaVerified from '@/assets/images/Maia Verified.png';

function EditProfileClinic() {
    const [activeTab, setActiveTab] = useState<string>("basic");

    const handleNextClick = () => {
        setActiveTab("KYC");
    };

    const handlePrevious = () => {
        setActiveTab("basic");
    };

    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <>
                    <PersonalDetails onNext={handleNextClick} />
                </>
            ),
        },
        {
            key: "Clinic",
            label: "Clinic Details",
            content: (
                <>
                    <ContentContainer className="mt-4">
                        <h5 className="mb-5 mb-xxl-2 profile-card-main-titile">Clinic Details</h5>

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

                                {/* <div className="patient-journey-up-icon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                    </svg>
                                </div> */}

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

                                {/* <div className="patient-journey-up-icon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                        <path d="M18.914 6.33984V16.0898C18.914 16.2888 18.835 16.4795 18.6943 16.6202C18.5537 16.7608 18.3629 16.8398 18.164 16.8398C17.9651 16.8398 17.7743 16.7608 17.6337 16.6202C17.493 16.4795 17.414 16.2888 17.414 16.0898V8.15016L6.69462 18.8705C6.55389 19.0112 6.36301 19.0903 6.16399 19.0903C5.96497 19.0903 5.7741 19.0112 5.63337 18.8705C5.49264 18.7297 5.41357 18.5389 5.41357 18.3398C5.41357 18.1408 5.49264 17.9499 5.63337 17.8092L16.3537 7.08984H8.41399C8.21508 7.08984 8.02431 7.01083 7.88366 6.87017C7.74301 6.72952 7.66399 6.53876 7.66399 6.33984C7.66399 6.14093 7.74301 5.95017 7.88366 5.80951C8.02431 5.66886 8.21508 5.58984 8.41399 5.58984H18.164C18.3629 5.58984 18.5537 5.66886 18.6943 5.80951C18.835 5.95017 18.914 6.14093 18.914 6.33984Z" fill="#2B4360" />
                                    </svg>
                                </div> */}

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
                </>
            ),
        },
        {
            key: "KYC",
            label: "KYC Details",
            content: (
                <>
                    <KYCDetails
                        onNext={handleNextClick}
                        onPrevious={handlePrevious}
                    />

                </>
            ),
        },

    ];

    return (
        <>
            <div>

                <CustomTabs
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                    tabOptions={tabOptions}
                />
            </div>

        </>

    )
}

export default EditProfileClinic