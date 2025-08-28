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
import { physicalAssessmentData } from '@/utils/StaticData';
import MenstrualCycleIcon from '../assets/images/MenstrualCycle-icons.png'
import PregnancyIcon from '../assets/images/Pregnancy-icons.png'
import PencilEditIcons from '../assets/images/EditIcon.png'

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

type FormData = {
    ageAtFirstMenstruation: string;
    cycleLength: string;
    periodLength: string;
    date: string;
    isCycleRegular: string;
    menstrualIssues: string;
    pregnancy: string;
    timeduration: string;
    ectopicpregnancy: string;
};

const initialFormData: FormData = {
    ageAtFirstMenstruation: "",
    cycleLength: "",
    periodLength: "",
    date: "",
    isCycleRegular: "Regular",
    menstrualIssues: "yes",
    pregnancy: "yes",
    timeduration: "",
    ectopicpregnancy: "yes"
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
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [showModal, setShowModal] = useState(false);
    const [medicalHistoryFormData, setMedicalHistoryFormData] = useState<any>([]);
    const [editingMedicalHistory, setEditingMedicalHistory] = useState<any>(null);
    const [physicalAssessmentData, setPhysicalAssessmentData] = useState<any>([]);

    console.log("medicalHistoryFormData", medicalHistoryFormData);
    const [modalFormData, setModalFormData] = useState<any>([]);
    const [modalFormPhisicalData, setModalFormPhisicalData] = useState<any>([]);
    const [modalFormFertilityData, setModalFormFertilityData] = useState<any>([]);

    console.log("modalFormData", modalFormData);
    console.log("modalFormPhisicalData", modalFormPhisicalData);
    console.log("modalFormFertilityData", modalFormFertilityData);

    const handleEdit = (item: any) => {
        setFormData({
            ageAtFirstMenstruation: item.ageAtFirstMenstruation || "",
            cycleLength: item.cycleLength || "",
            periodLength: item.periodLength || "",
            date: item.date || "",
            isCycleRegular: item.isCycleRegular || "",
            menstrualIssues: item.menstrualIssues || "",
            pregnancy: item.pregnancy || "",
            timeduration: item.timeduration || "",
            ectopicpregnancy: item.ectopicpregnancy || ""
        });
        setShowFertilityAssessment(true);
    }

    const accordionData = [
        {
            id: '0',
            title: 'Physical Assessment',
            content: (
                <>

                    {modalFormPhisicalData.length === 0 ? (
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
                                <g clipPath="url(#clip0_3886_2587)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M17.6439 4.10156C18.1236 4.10156 18.5143 4.49044 18.5143 4.97191C18.5143 5.45153 18.1254 5.84226 17.6439 5.84226H14.9292C14.4496 5.84226 14.0588 5.45338 14.0588 4.97191C14.0588 4.49229 14.4477 4.10156 14.9292 4.10156H17.6439ZM17.6439 8.75701C18.1236 8.75701 18.5143 9.14589 18.5143 9.62736C18.5143 10.107 18.1254 10.4977 17.6439 10.4977H14.9292C14.4496 10.4977 14.0588 10.1088 14.0588 9.62736C14.0588 9.14774 14.4477 8.75701 14.9292 8.75701H17.6439ZM17.6439 13.4125C18.1236 13.4125 18.5143 13.8013 18.5143 14.2828C18.5143 14.7643 18.1254 15.1532 17.6439 15.1532H14.9292C14.4496 15.1532 14.0588 14.7643 14.0588 14.2828C14.0588 13.8013 14.4477 13.4125 14.9292 13.4125H17.6439ZM17.6439 18.0679C18.1236 18.0679 18.5143 18.4568 18.5143 18.9383C18.5143 19.4179 18.1254 19.8086 17.6439 19.8086H14.9292C14.4496 19.8086 14.0588 19.4197 14.0588 18.9383C14.0588 18.4586 14.4477 18.0679 14.9292 18.0679H17.6439ZM17.6439 22.7234C18.1236 22.7234 18.5143 23.1122 18.5143 23.5937C18.5143 24.0733 18.1254 24.4641 17.6439 24.4641H14.9292C14.4496 24.4641 14.0588 24.0752 14.0588 23.5937C14.0588 23.1141 14.4477 22.7234 14.9292 22.7234H17.6439ZM17.6439 27.3788C18.1236 27.3788 18.5143 27.7677 18.5143 28.2492C18.5143 28.7288 18.1254 29.1195 17.6439 29.1195H14.9292C14.4496 29.1195 14.0588 28.7306 14.0588 28.2492C14.0588 27.7695 14.4477 27.3788 14.9292 27.3788H17.6439ZM17.6439 32.0342C18.1236 32.0342 18.5143 32.4231 18.5143 32.9046C18.5143 33.3842 18.1254 33.7749 17.6439 33.7749H14.9292C14.4496 33.7749 14.0588 33.3861 14.0588 32.9046C14.0588 32.425 14.4477 32.0342 14.9292 32.0342H17.6439ZM17.6439 36.6897C18.1236 36.6897 18.5143 37.0786 18.5143 37.56C18.5143 38.0415 18.1254 38.4304 17.6439 38.4304H14.9292C14.4496 38.4304 14.0588 38.0415 14.0588 37.56C14.0588 37.0786 14.4477 36.6897 14.9292 36.6897H17.6439ZM17.6439 41.3451C18.1236 41.3451 18.5143 41.734 18.5143 42.2155C18.5143 42.6951 18.1254 43.0858 17.6439 43.0858H14.9292C14.4496 43.0858 14.0588 42.697 14.0588 42.2155C14.0588 41.7359 14.4477 41.3451 14.9292 41.3451H17.6439ZM17.6439 46.0006C18.1236 46.0006 18.5143 46.3895 18.5143 46.8709C18.5143 47.3506 18.1254 47.7413 17.6439 47.7413H14.9292C14.4496 47.7413 14.0588 47.3524 14.0588 46.8709C14.0588 46.3913 14.4477 46.0006 14.9292 46.0006H17.6439ZM17.6439 50.656C18.1236 50.656 18.5143 51.0449 18.5143 51.5264C18.5143 52.006 18.1254 52.3967 17.6439 52.3967H14.9292C14.4496 52.3967 14.0588 52.0079 14.0588 51.5264C14.0588 51.0468 14.4477 50.656 14.9292 50.656H17.6439ZM17.6439 55.3115C18.1236 55.3115 18.5143 55.7004 18.5143 56.1818C18.5143 56.6615 18.1254 57.0522 17.6439 57.0522H14.9292C14.4496 57.0522 14.0588 56.6633 14.0588 56.1818C14.0588 55.7022 14.4477 55.3115 14.9292 55.3115H17.6439ZM17.6439 59.9669C18.1236 59.9669 18.5143 60.3558 18.5143 60.8373C18.5143 61.3169 18.1254 61.7076 17.6439 61.7076H14.9292C14.4496 61.7076 14.0588 61.3188 14.0588 60.8373C14.0588 60.3577 14.4477 59.9669 14.9292 59.9669H17.6439ZM17.6439 64.6224C18.1236 64.6224 18.5143 65.0113 18.5143 65.4927C18.5143 65.9724 18.1254 66.3631 17.6439 66.3631H14.9292C14.4496 66.3631 14.0588 65.9742 14.0588 65.4927C14.0588 65.0131 14.4477 64.6224 14.9292 64.6224H17.6439ZM17.6439 69.2778C18.1236 69.2778 18.5143 69.6667 18.5143 70.1482C18.5143 70.6278 18.1254 71.0185 17.6439 71.0185H14.9292C14.4496 71.0185 14.0588 70.6297 14.0588 70.1482C14.0588 69.6686 14.4477 69.2778 14.9292 69.2778H17.6439ZM17.6439 73.9333C18.1236 73.9333 18.5143 74.3222 18.5143 74.8036C18.5143 75.2833 18.1254 75.674 17.6439 75.674H14.9292C14.4496 75.674 14.0588 75.2851 14.0588 74.8036C14.0588 74.324 14.4477 73.9333 14.9292 73.9333H17.6439Z" fill="#8D929C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.5141 79.4677C18.5141 79.9473 18.1253 80.338 17.6438 80.338C17.1642 80.338 16.7734 79.9491 16.7734 79.4677V1.21019C16.7734 0.730575 17.1623 0.339844 17.6438 0.339844C18.1234 0.339844 18.5141 0.728723 18.5141 1.21019V79.4677Z" fill="#8D929C" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M29.4528 42.6415C29.4565 42.173 30.1472 41.7971 30.5732 41.8008C40.684 41.886 36.1545 41.886 46.2654 41.8008C46.6913 41.7971 47.3802 42.173 47.382 42.6415L47.7857 71.3205C47.7987 72.1779 47.4228 73.5167 46.8376 74.1575C46.4709 74.5593 45.9691 74.8167 45.4136 74.8408C45.3839 74.8445 45.3562 74.8463 45.3265 74.8463H31.5083V74.8426H31.5046H31.4898H31.4861C30.9065 74.8352 30.3787 74.5741 29.9973 74.1556C29.3028 73.3945 29.038 72.0038 29.0528 70.9427L29.4528 42.6415Z" fill="#AFB6C3" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M36.9674 41.8582C39.2952 41.8767 39.6007 41.8564 46.2635 41.8008C46.6894 41.7971 47.3783 42.173 47.3801 42.6415L47.5968 57.9634C45.532 57.106 43.6358 55.8449 42.0173 54.2264C38.7729 50.9821 36.9656 46.6192 36.9656 42.0323C36.9674 41.9749 36.9674 41.9156 36.9674 41.8582Z" fill="#9DA4B0" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M39.2692 74.8468H37.5674V58.5453C37.5674 58.0749 37.9489 57.6953 38.4174 57.6953C38.8859 57.6953 39.2673 58.0768 39.2673 58.5453V74.8468H39.2692Z" fill="#9DA4B0" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M40.7155 21.2759C40.7192 21.2241 40.7266 21.1722 40.7395 21.1204C40.8525 20.6648 41.3154 20.3889 41.7691 20.5019L49.8578 22.5407C50.9004 22.8037 51.8837 23.2685 52.5856 23.9703C53.2392 24.624 53.6466 25.4647 53.6466 26.511V44.0495C53.6466 45.1494 53.1967 46.1476 52.4726 46.8716C51.7485 47.5957 50.7486 48.0457 49.6504 48.0457H48.6634H47.6764H29.1565H28.1713H27.1861C26.0862 48.0457 25.088 47.5957 24.364 46.8716C23.6399 46.1476 23.1899 45.1494 23.1899 44.0495V26.511C23.1899 25.4647 23.5973 24.624 24.251 23.9703C24.9529 23.2685 25.9362 22.8037 26.9787 22.5407L35.0674 20.5019C35.523 20.3889 35.9841 20.6648 36.097 21.1204C36.11 21.1722 36.1174 21.2241 36.1211 21.2759H40.7155Z" fill="#DDE1E8" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M53.2245 24.8125C53.4948 25.3032 53.6485 25.868 53.6485 26.5106V44.0491C53.6485 45.1491 53.1985 46.1472 52.4745 46.8712C51.7504 47.5953 50.7504 48.0453 49.6523 48.0453H48.6653H47.6783H38.0452C37.3378 46.1416 36.9656 44.1083 36.9656 42.0306C36.9656 37.4418 38.7729 33.079 42.0173 29.8365C45.0284 26.8254 49.0023 25.0532 53.2245 24.8125Z" fill="#D0D4DC" />
                                    <path d="M34.423 20.057C34.423 19.5867 34.8045 19.207 35.273 19.207C35.4748 19.207 41.3617 19.207 41.5636 19.207C42.0339 19.207 42.4136 19.5885 42.4136 20.057V22.3347C42.4136 24.5347 40.6173 26.3309 38.4173 26.3309C37.3174 26.3309 36.3174 25.881 35.5952 25.1569C34.8711 24.4328 34.4211 23.4329 34.4211 22.3347V20.057H34.423Z" fill="#F3F4F6" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M32.5861 73.1445H34.4565C35.275 73.1445 36.0175 73.4779 36.5564 74.0167C37.0953 74.5556 37.4286 75.2982 37.4286 76.1167V78.237C37.4286 78.7074 37.0471 79.087 36.5786 79.087H30.4677C29.9973 79.087 29.6177 78.7055 29.6177 78.237V76.1167C29.6177 75.2982 29.951 74.5556 30.4899 74.0167C31.0251 73.4779 31.7676 73.1445 32.5861 73.1445ZM42.3822 73.1445H44.2525C45.071 73.1445 45.8136 73.4779 46.3525 74.0167C46.8914 74.5556 47.2247 75.2982 47.2247 76.1167V78.237C47.2247 78.7074 46.8432 79.087 46.3747 79.087H40.2637C39.7934 79.087 39.4137 78.7055 39.4137 78.237V76.1167C39.4137 75.2982 39.7471 74.5556 40.2859 74.0167C40.8211 73.4779 41.5637 73.1445 42.3822 73.1445Z" fill="#9CA3AF" />
                                    <path d="M38.4173 4.97656C40.295 4.97656 42.0005 5.74321 43.2357 6.98022C44.4708 8.21723 45.2393 9.92274 45.2393 11.7986V14.9874C45.2393 16.8652 44.4727 18.5707 43.2357 19.8058C41.9987 21.0429 40.2932 21.8095 38.4173 21.8095C36.5395 21.8095 34.834 21.0429 33.5989 19.8058C32.3619 18.5707 31.5952 16.8633 31.5952 14.9874V11.7986C31.5952 9.92089 32.3619 8.21538 33.5989 6.98022C34.8359 5.74321 36.5414 4.97656 38.4173 4.97656Z" fill="#F3F4F6" />
                                    <path d="M34.6989 22.3467C37.3081 22.6041 39.3673 22.3374 40.9303 21.893C41.4858 21.7356 41.9802 21.5541 42.4136 21.3671V20.6652V20.5078C42.3598 20.5467 42.3043 20.5856 42.2487 20.6245C41.7765 20.9467 41.2636 21.2115 40.7173 21.4078C39.9988 21.667 39.2229 21.8078 38.4173 21.8078C37.6118 21.8078 36.8378 21.667 36.1174 21.4078C35.5711 21.2115 35.0582 20.9467 34.586 20.6245C34.5304 20.5874 34.4748 20.5486 34.4211 20.5078V20.6652V22.3189C34.5156 22.3281 34.6063 22.3393 34.6989 22.3467Z" fill="#E8E8EA" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M23.1882 26.5096V32.6835H29.3714V21.9375L26.9789 22.5412C25.9363 22.8041 24.9512 23.269 24.2512 23.9708C23.5956 24.6245 23.1882 25.4633 23.1882 26.5096Z" fill="#C5C9D0" />
                                    <path d="M23.1882 32.6875V44.0521C23.1882 45.152 23.6382 46.1502 24.3623 46.8742C25.0863 47.5983 26.0863 48.0483 27.1844 48.0483H28.1696H28.8603H29.1548H29.3696V41.9132V32.6875H23.1882Z" fill="#F3F4F6" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M53.6485 26.5096V32.6835H47.4653V21.9375L49.8579 22.5412C50.9004 22.8041 51.8856 23.269 52.5856 23.9708C53.2411 24.6245 53.6485 25.4633 53.6485 26.5096Z" fill="#C5C9D0" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M53.6485 26.5125V32.6864H47.4653V26.1551C49.2783 25.3847 51.2226 24.9273 53.2245 24.8125C53.4948 25.3069 53.6485 25.8699 53.6485 26.5125Z" fill="#B5B8BE" />
                                    <path d="M53.6486 32.6875V44.0521C53.6486 45.152 53.1986 46.1502 52.4746 46.8742C51.7505 47.5983 50.7505 48.0483 49.6524 48.0483H48.6673H47.9765H47.6821H47.4673V41.9132V32.6875H53.6486Z" fill="#F9C5B8" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M31.5952 12.6208C32.5767 11.5227 34.6488 10.6246 39.0043 12.0931C41.6913 12.9986 43.7246 13.369 45.2393 13.4653V11.7986C45.2393 9.92089 44.4727 8.21538 43.2357 6.98022C41.9987 5.74506 40.2932 4.97656 38.4173 4.97656C36.6988 4.97656 35.1229 5.62099 33.9211 6.67837C33.81 6.77652 33.7026 6.87652 33.5989 6.98022C32.3637 8.21723 31.5952 9.92274 31.5952 11.7986V12.6208Z" fill="#9CA3AF" />
                                    <path d="M70.0006 42.1403C70.0006 50.8391 62.9465 57.8899 54.2485 57.8899C45.5506 57.8899 38.5015 50.8391 38.5015 42.1403C38.5015 33.4414 45.5506 26.3906 54.2485 26.3906C62.9465 26.3906 70.0006 33.4414 70.0006 42.1403Z" fill="#DDE1E8" />
                                    <path d="M70.0009 42.1392C70.0009 50.838 62.9468 57.8888 54.2488 57.8888C49.1259 57.8888 44.5777 55.4444 41.7036 51.6595C44.4389 53.7433 47.7842 54.8697 51.2234 54.8649C59.9214 54.8649 66.9755 47.8141 66.9755 39.1152C66.9755 35.5369 65.7805 32.2358 63.7686 29.5898C67.5554 32.4676 70.0009 37.0186 70.0009 42.1392Z" fill="#C9CFD8" />
                                    <path d="M65.8811 31.5263C63.0826 28.9862 59.3715 27.4339 55.2923 27.4339C46.5943 27.4339 39.5452 34.4847 39.5452 43.1835C39.5452 47.2759 41.1033 51.0004 43.6597 53.7975C40.4932 50.9197 38.5015 46.7618 38.5015 42.1403C38.5015 33.4414 45.5506 26.3906 54.2485 26.3906C58.8572 26.3906 63.0019 28.3713 65.8811 31.5263Z" fill="#EEF2FB" />
                                    <path d="M62.9233 32.8412L56.8726 38.889C56.177 39.5837 55.2339 39.9739 54.2506 39.9739C53.2673 39.9739 52.3242 39.5837 51.6286 38.889L45.5779 32.8412C47.852 30.7144 50.9025 29.4141 54.2506 29.4141C57.5936 29.4141 60.6493 30.7144 62.9233 32.8412Z" fill="#E8EBF1" />
                                    <path d="M62.9214 32.8412L62.8457 32.9168C60.64 31.238 57.9438 30.3297 55.1714 30.3313C51.8233 30.3313 48.7727 31.6316 46.4987 33.7584L51.6267 38.889L45.5759 32.8412C47.85 30.7144 50.9006 29.4141 54.2487 29.4141C57.5917 29.4141 60.6473 30.7144 62.9214 32.8412Z" fill="#EEF2FB" />
                                    <mask id="mask0_3886_2587" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="45" y="29" width="18" height="11">
                                        <path d="M54.2507 29.9141C57.2764 29.9141 60.056 31.0236 62.1951 32.8613L56.5193 38.5352C55.9175 39.1362 55.1015 39.4736 54.2507 39.4736C53.3999 39.4736 52.584 39.1361 51.9822 38.5352L46.3054 32.8613C48.4442 31.0233 51.2202 29.9141 54.2507 29.9141Z" fill="#CBDFED" stroke="#C9CFD8" />
                                    </mask>
                                    <g mask="url(#mask0_3886_2587)">
                                        <path d="M60.5997 31.1797L59.6479 32.7571" stroke="#9CA2AA" strokeWidth="0.7" strokeLinecap="round" />
                                        <path d="M57.5674 29.8883L57.0682 31.6615" stroke="#9CA2AA" strokeWidth="0.7" strokeLinecap="round" />
                                        <path d="M54.2451 29.4643L54.2483 31.3063" stroke="#9CA2AA" strokeWidth="0.7" strokeLinecap="round" />
                                        <path d="M50.9521 29.8948L51.4659 31.6638" stroke="#9CA2AA" strokeWidth="0.7" strokeLinecap="round" />
                                        <path d="M47.9145 31.1849L48.8424 32.7764" stroke="#9CA2AA" strokeWidth="0.7" strokeLinecap="round" />
                                    </g>
                                    <path d="M54.2509 38.3205C54.8585 38.3205 55.3511 37.8281 55.3511 37.2208C55.3511 36.6134 54.8585 36.1211 54.2509 36.1211C53.6432 36.1211 53.1506 36.6134 53.1506 37.2208C53.1506 37.8281 53.6432 38.3205 54.2509 38.3205Z" fill="#5E636C" />
                                    <path d="M56.9016 32.9519C56.8595 32.9255 56.8126 32.9078 56.7636 32.8996C56.7146 32.8915 56.6645 32.8931 56.6161 32.9044C56.5677 32.9157 56.5221 32.9364 56.4818 32.9654C56.4415 32.9944 56.4073 33.0311 56.3812 33.0733L54.6799 35.814C54.5414 35.7692 54.3969 35.7454 54.2513 35.7435C53.436 35.7435 52.7729 36.4062 52.7729 37.2201C52.7729 38.0341 53.436 38.6978 54.2508 38.6978C55.0657 38.6978 55.7292 38.0351 55.7292 37.2206C55.7292 36.829 55.5729 36.4747 55.3238 36.2102L57.0236 33.4725C57.0498 33.4304 57.0675 33.3836 57.0756 33.3346C57.0837 33.2857 57.0821 33.2357 57.0709 33.1874C57.0597 33.1391 57.039 33.0935 57.0101 33.0531C56.9812 33.0128 56.9447 32.9786 56.9026 32.9524L56.9016 32.9519ZM54.9724 37.2201C54.9724 37.6183 54.6487 37.9419 54.2508 37.9419C53.853 37.9419 53.5288 37.6178 53.5288 37.2201C53.5288 36.1683 54.9724 36.378 54.9724 37.2201Z" fill="#9CA2AA" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M65.6391 78.5977C66.1187 78.5977 66.5094 78.9865 66.5094 79.468C66.5094 79.9476 66.1205 80.3384 65.6391 80.3384H11.1977C10.7181 80.3384 10.3274 79.9495 10.3274 79.468C10.3274 78.9884 10.7163 78.5977 11.1977 78.5977H65.6391Z" fill="#8D929C" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3886_2587">
                                        <rect width="80" height="80" fill="white" transform="translate(0.164062 0.339844)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <p className='patient-accordion-content-subtitle my-3' >No assessment details</p>
                            <Button onClick={() => setShowPhisicalAssessment(true)} variant="outline" disabled={false} contentSize="medium" >
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1641 8C15.1641 8.16576 15.0982 8.32473 14.981 8.44194C14.8638 8.55915 14.7048 8.625 14.5391 8.625H8.28906V14.875C8.28906 15.0408 8.22322 15.1997 8.10601 15.3169C7.9888 15.4342 7.82982 15.5 7.66406 15.5C7.4983 15.5 7.33933 15.4342 7.22212 15.3169C7.10491 15.1997 7.03906 15.0408 7.03906 14.875V8.625H0.789063C0.623302 8.625 0.464331 8.55915 0.347121 8.44194C0.229911 8.32473 0.164062 8.16576 0.164062 8C0.164062 7.83424 0.229911 7.67527 0.347121 7.55806C0.464331 7.44085 0.623302 7.375 0.789063 7.375H7.03906V1.125C7.03906 0.95924 7.10491 0.800269 7.22212 0.683058C7.33933 0.565848 7.4983 0.5 7.66406 0.5C7.82982 0.5 7.9888 0.565848 8.10601 0.683058C8.22322 0.800269 8.28906 0.95924 8.28906 1.125V7.375H14.5391C14.7048 7.375 14.8638 7.44085 14.981 7.55806C15.0982 7.67527 15.1641 7.83424 15.1641 8Z" fill="#2B4360" />
                                </svg>
                                <span className='ms-1'> Add Physical Assessment</span>
                            </Button>
                        </div>

                    ) : (
                        <div>
                            <Accordion defaultActiveKey="0">
                                <Button className='mb-3' onClick={() => setShowPhisicalAssessment(true)} variant="outline" disabled={false} contentSize="small" >
                                    <IoAdd /> Add new
                                </Button>
                                {modalFormPhisicalData?.map((item: any, index: any): any => {
                                    return (
                                        <Accordion.Item eventKey={index.toString()} className='phisical-assessment-accordion-item mb-3' key={index}>
                                            <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                                <div className='phisical-assessment-accordion-title-showData'>
                                                    {item.date}
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body >
                                                <Row className='g-3'>
                                                    <Col md={4} sm={6}>
                                                        <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                            <Image src={hiegthImg} alt="Age" width={42} height={42} />
                                                            <div className='d-flex flex-column gap-1'>
                                                                <span className='phisical-assessment-accordion-showData-box-title'>Height</span>
                                                                <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.height}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={4} sm={6}>
                                                        <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                            <Image src={weightImg} alt="Age" width={42} height={42} />
                                                            <div className='d-flex flex-column gap-1'>
                                                                <span className='phisical-assessment-accordion-showData-box-title'>Weight</span>
                                                                <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.weight}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={4} sm={6}>
                                                        <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                            <Image src={BMIIMG} alt="Age" width={42} height={42} />
                                                            <div className='d-flex flex-column gap-1'>
                                                                <span className='phisical-assessment-accordion-showData-box-title'>BMI</span>
                                                                <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.bmi}</span>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col md={4} sm={6}>
                                                        <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                            <Image src={BloodGroup} alt="Age" width={42} height={42} />
                                                            <div className='d-flex flex-column gap-1'>
                                                                <span className='phisical-assessment-accordion-showData-box-title'>Blood Group</span>
                                                                <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.bloodGroup}</span>
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col md={4} sm={6}>
                                                        <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                            <Image src={BloodPressure} alt="Age" width={42} height={42} />
                                                            <div className='d-flex flex-column gap-1'>
                                                                <span className='phisical-assessment-accordion-showData-box-title'>Blood Pressure</span>
                                                                <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.systolic}/{item.diastolic}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                    <Col md={4} sm={6}>
                                                        <div className='phisical-assessment-accordion-showData-box d-flex gap-3'>
                                                            <Image src={HeartRate} alt="Age" width={42} height={42} />
                                                            <div className='d-flex flex-column gap-1'>
                                                                <span className='phisical-assessment-accordion-showData-box-title'>Hearth Rate</span>
                                                                <span className='phisical-assessment-accordion-showData-box-subtitle'>{item.heartRate}</span>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )

                                })}

                            </Accordion>
                        </div>
                    )}
                </>

            ),
        },
        {
            id: '1',
            title: 'Fertility Assessment',
            content: (
                <>
                    {/* Object.keys(modalFormFertilityData).length === 0 && */}
                    {Object.keys(modalFormFertilityData).length === 0 ? (
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="81" height="81" viewBox="0 0 81 81" fill="none">
                                <path d="M16.8308 29.5077C16.5023 29.5092 16.1768 29.4452 15.8734 29.3192C15.5701 29.1933 15.2949 29.008 15.0641 28.7743L11.7308 25.441C9.06581 22.7926 7.55607 19.198 7.53076 15.441C7.53502 14.4301 7.74005 13.4301 8.13394 12.499C8.52784 11.568 9.10275 10.7244 9.8253 10.0174C10.5479 9.31032 11.4037 8.75384 12.343 8.38024C13.2824 8.00663 14.2866 7.82334 15.2974 7.84101C16.7924 7.83521 18.255 8.2763 19.4974 9.10768L28.2308 14.941C28.7395 15.3281 29.0806 15.8953 29.184 16.5262C29.2875 17.157 29.1453 17.8035 28.7868 18.3327C28.4282 18.862 27.8806 19.2338 27.2564 19.3717C26.6322 19.5096 25.9789 19.4032 25.4308 19.0743L16.8308 13.2743C16.4019 13.0009 15.906 12.851 15.3974 12.841C14.699 12.841 14.0292 13.1184 13.5354 13.6123C13.0415 14.1061 12.7641 14.7759 12.7641 15.4743C12.7496 16.712 12.9841 17.94 13.4536 19.0853C13.9232 20.2306 14.6182 21.2697 15.4974 22.141L18.8308 25.4743C19.2989 25.9431 19.5619 26.5785 19.5619 27.241C19.5619 27.9035 19.2989 28.5389 18.8308 29.0077C18.5532 29.2304 18.2307 29.3903 17.8855 29.4766C17.5403 29.5629 17.1805 29.5735 16.8308 29.5077Z" fill="#9CA3AF" />
                                <path d="M19.464 24.9755C19.0047 23.2922 17.9037 21.8562 16.3974 20.9755C15.8112 20.6122 15.1587 20.3691 14.4777 20.2604C13.7967 20.1516 13.1009 20.1794 12.4307 20.3422C10.947 20.8569 9.72783 21.939 9.04052 23.3511C8.3532 24.7632 8.25378 26.3902 8.76405 27.8755C9.17734 29.3454 10.0688 30.6356 11.2974 31.5422C12.2701 32.2329 13.4379 32.5949 14.6307 32.5755C15.0825 32.5742 15.5317 32.5068 15.964 32.3755C16.7084 32.1459 17.3931 31.7551 17.9692 31.2308C18.5453 30.7065 18.9988 30.0617 19.2974 29.3422C19.8419 27.9467 19.9007 26.4084 19.464 24.9755Z" fill="#DDE1E8" />
                                <path d="M63.4976 29.5066C63.1691 29.5081 62.8436 29.4441 62.5403 29.3181C62.2369 29.1922 61.9617 29.0069 61.7309 28.7732C61.2627 28.3045 60.9998 27.6691 60.9998 27.0066C60.9998 26.3441 61.2627 25.7087 61.7309 25.2399L65.0642 21.9066C65.9434 21.0353 66.6385 19.9961 67.108 18.8509C67.5776 17.7056 67.8121 16.4776 67.7976 15.2399C67.7976 14.5415 67.5201 13.8717 67.0263 13.3779C66.5324 12.884 65.8626 12.6066 65.1642 12.6066C64.6557 12.6165 64.1598 12.7664 63.7309 13.0399L54.8976 19.0732C54.6271 19.279 54.3175 19.4275 53.9877 19.5096C53.6578 19.5917 53.3148 19.6057 52.9794 19.5507C52.644 19.4957 52.3233 19.3729 52.0369 19.1898C51.7506 19.0067 51.5046 18.7672 51.314 18.4858C51.1234 18.2044 50.9921 17.8871 50.9283 17.5532C50.8644 17.2194 50.8693 16.8761 50.9427 16.5442C51.016 16.2123 51.1563 15.8989 51.3548 15.6231C51.5534 15.3472 51.8061 15.1148 52.0976 14.9399L60.8309 9.10657C62.0734 8.27519 63.536 7.8341 65.0309 7.8399C67.0554 7.8399 68.997 8.64412 70.4285 10.0757C71.86 11.5072 72.6642 13.4487 72.6642 15.4732C72.6389 19.2302 71.1292 22.8249 68.4642 25.4732L65.1309 28.8066C64.6923 29.2347 64.1101 29.4843 63.4976 29.5066Z" fill="#9CA3AF" />
                                <path d="M67.8974 20.3432C67.2338 20.1656 66.5415 20.1214 65.8607 20.2129C65.1799 20.3044 64.5239 20.53 63.9307 20.8765C62.4245 21.7571 61.3235 23.1932 60.8641 24.8765C60.4357 26.3516 60.5299 27.9294 61.1307 29.3432C61.4293 30.0627 61.8828 30.7075 62.4589 31.2318C63.0351 31.7561 63.7197 32.1469 64.4641 32.3765C64.8964 32.5078 65.3456 32.5752 65.7974 32.5765C66.9333 32.5612 68.0378 32.2008 68.9641 31.5431C70.1927 30.6366 71.0841 29.3464 71.4974 27.8765C72.0109 26.3998 71.9208 24.7801 71.2467 23.3695C70.5726 21.9588 69.3689 20.8713 67.8974 20.3432ZM55.5641 15.6098C55.4206 15.3714 55.2273 15.1667 54.9974 15.0098C50.7067 11.8274 45.5062 10.1094 40.1641 10.1094C34.822 10.1094 29.6215 11.8274 25.3307 15.0098C25.1009 15.1667 24.9076 15.3714 24.7641 15.6098C22.5264 18.9623 21.3826 22.9259 21.4901 26.9551C21.5975 30.9844 22.9509 34.8813 25.3641 38.1098L27.6641 41.1765V45.6432C27.6506 48.9475 28.8348 52.1448 30.9974 54.6432V67.0098C31.0062 68.5542 31.6235 70.0329 32.7156 71.1249C33.8077 72.217 35.2863 72.8344 36.8307 72.8432H43.4974C45.0418 72.8344 46.5205 72.217 47.6125 71.1249C48.7046 70.0329 49.322 68.5542 49.3307 67.0098V54.6432C51.4933 52.1448 52.6775 48.9475 52.6641 45.6432V41.1765L54.9641 38.1098C57.3772 34.8813 58.7306 30.9844 58.8381 26.9551C58.9455 22.9259 57.8017 18.9623 55.5641 15.6098Z" fill="#DDE1E8" />
                                <path d="M50.1641 22.84C47.3614 20.4907 43.8211 19.2031 40.1641 19.2031C36.507 19.2031 32.9667 20.4907 30.1641 22.84C29.9028 23.0442 29.6854 23.299 29.5249 23.5891C29.3643 23.8793 29.264 24.1988 29.2297 24.5287C29.1955 24.8585 29.2281 25.1919 29.3257 25.5088C29.4232 25.8257 29.5836 26.1198 29.7974 26.3733C32.2974 28.9078 34.2709 31.9123 35.6039 35.2133C36.9369 38.5144 37.6031 42.0468 37.5641 45.6066C37.5641 46.2697 37.8274 46.9055 38.2963 47.3744C38.7651 47.8432 39.401 48.1066 40.0641 48.1066C40.7271 48.1066 41.363 47.8432 41.8318 47.3744C42.3007 46.9055 42.5641 46.2697 42.5641 45.6066C42.525 42.0468 43.1912 38.5144 44.5242 35.2133C45.8572 31.9123 47.8307 28.9078 50.3307 26.3733C50.5561 26.1325 50.7309 25.849 50.8448 25.5395C50.9587 25.23 51.0093 24.9008 50.9938 24.5714C50.9783 24.242 50.8968 23.919 50.7543 23.6216C50.6118 23.3242 50.4111 23.0584 50.1641 22.84Z" fill="#9CA3AF" />
                            </svg>
                            <p className='patient-accordion-content-subtitle my-3'>No fertility assessment</p>
                            <Button onClick={() => setShowFertilityAssessment(true)} variant="outline" disabled={false} contentSize="medium" >
                            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1641 8C15.1641 8.16576 15.0982 8.32473 14.981 8.44194C14.8638 8.55915 14.7048 8.625 14.5391 8.625H8.28906V14.875C8.28906 15.0408 8.22322 15.1997 8.10601 15.3169C7.9888 15.4342 7.82982 15.5 7.66406 15.5C7.4983 15.5 7.33933 15.4342 7.22212 15.3169C7.10491 15.1997 7.03906 15.0408 7.03906 14.875V8.625H0.789063C0.623302 8.625 0.464331 8.55915 0.347121 8.44194C0.229911 8.32473 0.164062 8.16576 0.164062 8C0.164062 7.83424 0.229911 7.67527 0.347121 7.55806C0.464331 7.44085 0.623302 7.375 0.789063 7.375H7.03906V1.125C7.03906 0.95924 7.10491 0.800269 7.22212 0.683058C7.33933 0.565848 7.4983 0.5 7.66406 0.5C7.82982 0.5 7.9888 0.565848 8.10601 0.683058C8.22322 0.800269 8.28906 0.95924 8.28906 1.125V7.375H14.5391C14.7048 7.375 14.8638 7.44085 14.981 7.55806C15.0982 7.67527 15.1641 7.83424 15.1641 8Z" fill="#2B4360" />
                                </svg>
                                <span className='ms-1'> Add Fertility Assessment</span>
                            </Button>
                        </div>
                    ) : (
                        <div>
                            <Button className='mb-3' onClick={() => {
                                handleEdit(modalFormFertilityData)
                            }} variant="outline" disabled={false} contentSize="small">
                                <Image src={PencilEditIcons} width={16} height={16} alt="PencilEditIcons" /> Edit
                            </Button>

                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0" className='phisical-assessment-accordion-item mb-3' >
                                    <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                        <div className='d-flex justify-content-center align-items-center gap-2'>

                                            <Image src={PregnancyIcon} width={34} height={34} alt="" />
                                            <span className='fertilityAssessment-subAccordion-title'>
                                                Menstrual Cycle
                                            </span>

                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>

                                        <Row className='g-3'>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Age at first menstruation
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.ageAtFirstMenstruation}
                                                    </span>
                                                </div>

                                            </Col>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Cycle Length
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.cycleLength}
                                                    </span>
                                                </div>
                                            </Col>

                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Period Length
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.periodLength}
                                                    </span>
                                                </div>

                                            </Col>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Last Period Date
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.date}
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Is your cycle regular?
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.isCycleRegular}
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Do you experience menstrual issues?  *
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.menstrualIssues}
                                                    </span>
                                                </div>
                                            </Col>

                                        </Row>

                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1" className='phisical-assessment-accordion-item mb-3'>
                                    <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                        <div className='d-flex justify-content-center align-items-center gap-2'>

                                            <Image src={MenstrualCycleIcon} width={34} height={34} alt="" />
                                            <span className='fertilityAssessment-subAccordion-title'>
                                                Pregnancy
                                            </span>


                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <Row className='g-3'>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Have you been pregnant before?
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.pregnancy}
                                                    </span>
                                                </div>

                                            </Col>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        How long have you been trying to conceive?
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.timeduration}
                                                    </span>
                                                </div>
                                            </Col>
                                            <Col sm={6}>
                                                <div className="d-flex flex-column gap-1">
                                                    <span className="contact-details-emergency">
                                                        Any history of miscarriage or ectopic pregnancy?
                                                    </span>
                                                    <span className="accordion-title-detail">
                                                        {modalFormFertilityData.ectopicpregnancy}
                                                    </span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </div>
                    )}
                </>
            ),
        },
        {
            id: '2',
            title: 'Medical History',
            content: (

                <div>
                    {medicalHistoryFormData && medicalHistoryFormData.length > 0 ? (
                        <div className="mb-3">
                            <Button
                                onClick={() => {
                                    setEditingMedicalHistory(medicalHistoryFormData[0]);
                                    setShowModal(true);
                                }}
                                className="mb-3"
                                variant="outline"
                                contentSize="small"
                            >
                                <Image src={PencilEditIcons} width={16} height={16} alt="Edit" /> Edit
                            </Button>

                            <Row className="">
                                <Col lg={5} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Medications</h6>
                                        <p className=" accordion-title-detail">
                                            {medicalHistoryFormData[0]?.medicationcontent || 'No medications recorded'}
                                        </p>
                                    </div>
                                </Col>

                                <Col lg={7} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Surgeries</h6>
                                        <p className=" accordion-title-detail">
                                            {medicalHistoryFormData[0]?.surgeries === 'yes'
                                                ? medicalHistoryFormData[0]?.surgeriescontent || 'Yes'
                                                : 'No'}
                                        </p>
                                    </div>
                                </Col>

                                <Col lg={12} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Medical condition / Allergies</h6>
                                        <p className=" accordion-title-detail d-inline-block border-box-orange-font box-border-orange ">
                                            {medicalHistoryFormData[0]?.medicalCondition || 'No medical conditions recorded'}
                                        </p>
                                    </div>
                                </Col>

                                <Col lg={5} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Family History</h6>
                                        <p className=" accordion-title-detail">
                                            <ul>
                                                <li className='medical-emergency-fimily-history'>{medicalHistoryFormData[0]?.familyMedicalHistory || 'No family history recorded'}</li>
                                            </ul>
                                        </p>
                                    </div>
                                </Col>

                                <Col lg={7} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Lifestyle</h6>
                                        <p className=" accordion-title-detail d-inline-block border-box-blue-font box-border-blue me-2">
                                            {medicalHistoryFormData[0]?.lifestyle || 'No lifestyle information'}
                                        </p>
                                    </div>
                                </Col>

                                <Col lg={5} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Physical Exercise</h6>
                                        <p className="accordion-title-detail border-box-orange-font box-border-orange d-inline-block ">
                                            {medicalHistoryFormData[0]?.exercise ?
                                                medicalHistoryFormData[0].exercise.charAt(0).toUpperCase() + medicalHistoryFormData[0].exercise.slice(1)
                                                : 'Not specified'}
                                        </p>
                                    </div>
                                </Col>

                                <Col lg={7} md={12}>
                                    <div className="">
                                        <h6 className=" contact-details-emergency">Stress Level</h6>
                                        <p className="accordion-title-detail d-inline-block border-box-red-font box-border-red">
                                            {medicalHistoryFormData[0]?.stress ?
                                                medicalHistoryFormData[0].stress.charAt(0).toUpperCase() + medicalHistoryFormData[0].stress.slice(1)
                                                : 'Not specified'}
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ) : (
                        <div className="text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78" fill="none">
                                <path d="M60.6072 15.509V57.2116C60.6072 59.5787 58.6882 61.4977 56.3211 61.4977H22.0085C19.6414 61.4977 17.7224 59.5787 17.7224 57.2116V6.70801C17.7224 4.34086 19.6414 2.42188 22.0085 2.42188H47.5739C51.0628 5.92883 54.5519 9.43579 58.0453 12.9382C58.8964 13.7937 59.7518 14.6491 60.6072 15.509Z" fill="#F3F4F6" />
                                <path d="M60.6072 15.509H51.511C49.3365 15.509 47.5737 13.7463 47.5737 11.5718V2.42188C51.0626 5.92883 54.5517 9.43579 58.0451 12.9382C58.8963 13.7937 59.7518 14.6491 60.6072 15.509Z" fill="#DDE1E8" />
                                <path d="M47.6833 28.1613V31.1021C47.6833 31.9213 47.0192 32.5854 46.2 32.5854H42.1186V36.6668C42.1186 37.486 41.4545 38.1501 40.6353 38.1501H37.6903C36.8712 38.1501 36.207 37.486 36.207 36.6668V32.5854H32.1298C31.3106 32.5854 30.6465 31.9213 30.6465 31.1021V28.1613C30.6465 27.3422 31.3106 26.678 32.1298 26.678H36.207V22.5966C36.207 21.7774 36.8712 21.1133 37.6903 21.1133H40.6353C41.4545 21.1133 42.1186 21.7774 42.1186 22.5966V26.678H46.2C47.0192 26.678 47.6833 27.3422 47.6833 28.1613Z" fill="#D2D6DE" />
                                <path d="M70.7355 44.5053L65.9498 70.7936C65.4789 73.3803 63.2258 75.2604 60.5965 75.2604H19.5071C16.8778 75.2604 14.6247 73.3803 14.1538 70.7936L7.59299 34.7558C6.98481 31.4153 9.55093 28.3398 12.9463 28.3398H26.3864C27.5838 28.3398 28.7477 28.7348 29.6979 29.4636L39.4797 36.9658C40.4299 37.6944 41.5938 38.0895 42.7912 38.0895H65.3821C68.7776 38.0894 71.3437 41.1649 70.7355 44.5053Z" fill="#9CA3AF" />
                                <path d="M60.3568 63.8798C60.3568 66.5187 58.2175 68.658 55.5786 68.658H48.1395C45.5006 68.658 43.3613 66.5187 43.3613 63.8798C43.3613 61.2409 45.5006 59.1016 48.1395 59.1016H55.5786C58.2175 59.1017 60.3568 61.2409 60.3568 63.8798Z" fill="#8D929C" />
                            </svg>
                            <p className='patient-accordion-content-subtitle my-3'>No medical history</p>
                            <Button
                                onClick={() => {
                                    setEditingMedicalHistory(null);
                                    setShowModal(true);
                                }}
                                variant="outline"
                                contentSize="medium"
                            >
                                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.1641 8C15.1641 8.16576 15.0982 8.32473 14.981 8.44194C14.8638 8.55915 14.7048 8.625 14.5391 8.625H8.28906V14.875C8.28906 15.0408 8.22322 15.1997 8.10601 15.3169C7.9888 15.4342 7.82982 15.5 7.66406 15.5C7.4983 15.5 7.33933 15.4342 7.22212 15.3169C7.10491 15.1997 7.03906 15.0408 7.03906 14.875V8.625H0.789063C0.623302 8.625 0.464331 8.55915 0.347121 8.44194C0.229911 8.32473 0.164062 8.16576 0.164062 8C0.164062 7.83424 0.229911 7.67527 0.347121 7.55806C0.464331 7.44085 0.623302 7.375 0.789063 7.375H7.03906V1.125C7.03906 0.95924 7.10491 0.800269 7.22212 0.683058C7.33933 0.565848 7.4983 0.5 7.66406 0.5C7.82982 0.5 7.9888 0.565848 8.10601 0.683058C8.22322 0.800269 8.28906 0.95924 8.28906 1.125V7.375H14.5391C14.7048 7.375 14.8638 7.44085 14.981 7.55806C15.0982 7.67527 15.1641 7.83424 15.1641 8Z" fill="#2B4360" />
                                </svg>
                                <span className='ms-1'>Add Medical History</span>
                            </Button>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <Container fluid >
            <Row >
                {/* Left Side - Contact Details & Accordion */}
                <Col lg={8} md={12} className='ps-0'>
                    {/* Contact Card */}
                    <Card className="mb-4 shadow-sm">
                        <Card.Body className="p-4">
                            <Row>
                                <h6 className="mb-3 contact-details-heading">Contact Details</h6>
                                <Col lg={4} md={12}>
                                    <div className="mb-3 d-flex align-items-center">
                                        <Image src={ProfilePhone} className="me-2 " width={20} height={20} alt="Phone" />
                                        <span className="contact-details-subheading">{contactData.phone}</span>
                                    </div>
                                </Col>
                                <Col lg={8} md={12}>
                                    <div className="mb-4 d-flex align-items-center contac-email-card">
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

                            <h6 className=" mb-3 contact-details-heading">Emergency Contact Details</h6>
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
                                    <p className='contact-details-heading m-0'>{item.title}</p>
                                </Accordion.Header>
                                <Accordion.Body className='pt-0'>{item.content}</Accordion.Body>
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
                            <PhisicalAssessmentForm setModalFormPhisicalData={setModalFormPhisicalData} setShowPhisicalAssessment={setShowPhisicalAssessment} />
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
                            <FertilityAssessmentForm setShowFertilityAssessment={setShowFertilityAssessment} setModalFormFertilityData={setModalFormFertilityData} setFormData={setFormData} formData={formData} />

                        </div>
                    </Modal>
                    <Modal
                        className=""
                        show={showModal}
                        onHide={() => setShowModal(false)}
                        header="Add Medical History"
                        size="lg"
                        closeButton={true}
                    >
                        <div className="mb-0">
                            <MedicalHistory
                                setMedicalHistoryFormData={setMedicalHistoryFormData}
                                setShowModal={setShowModal}
                                initialData={editingMedicalHistory}
                                onClose={() => setEditingMedicalHistory(null)}
                            />
                        </div>
                    </Modal>


                </Col>

                {/* Right Side - Patient Journey */}
                <Col lg={4} md={12} className='pe-0'>
                    <div className='d-flex justify-content-between align-items-center mb-lg-4 mb-3 px-1'>

                        <h6 className='patient-journey-heading m-0'>Patient Journey</h6>
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
                                    <div className="patient-journey-box-item">
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

                </Col>

            </Row>

        </Container>
    );
};

export default ProfileBasicDetail;
