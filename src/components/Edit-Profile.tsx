"use client";
import React, { useEffect, useState } from 'react';

import "../style/editprofile.css";
import CustomTabs from './ui/CustomTabs';
import ContentContainer from './ui/ContentContainer';
import PersonalDetails from './form/Edit-Basic-Details';
import KYCDetails from './form/Edit-Kyc-Details';
import ClinicDetailsForm from './form/ClinicDetailsForm';
// import ContentContainer from './ui/ContentContainer';


const EditProfile = () => {
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
                   <ClinicDetailsForm />
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
export default EditProfile;