import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import ProfileImage from '../assets/images/Profile_Image.png'
import { ProfileCard } from './ui/Custom/ProfileCard';
import ContentContainer from './ui/ContentContainer';
import CustomTabs from './ui/CustomTabs';
import ProfileBasicDetail from './ProfileBasicDetail';

const AddMedicalHistory = () => {
  const [key, setKey] = useState<string>('basic');

  const [activeTab, setActiveTab] = useState<string>("basic");

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

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <div className='mt-4'><ProfileBasicDetail /></div>
      ),
    },
    {
      key: "partner",
      label: "Partner Details",
      content: (
        <ContentContainer className="mt-5">
          <h1>Partner Details Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "appointment",
      label: "Appointment",
      content: (
        <ContentContainer className="mt-5">
          <h1>Appointment Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "reports",
      label: "Reports",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reports Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "payment history",
      label: "Payment History",
      content: (
        <ContentContainer className="mt-5">
          <h1>Payment History Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "treatment",
      label: "Treatment",
      content: (
        <ContentContainer className="mt-5">
          <h1>Treatment Content</h1>
        </ContentContainer>
      ),
    },
  ];
  return (

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
      {/* </div> */}


      <main className="bg-light min-vh-100 py-2">
        <div className="">

          <CustomTabs
            activeKey={activeTab}
            setActiveKey={setActiveTab}
            tabOptions={tabOptions}
          />
        </div>
      </main>
    </>
  );
};

export default AddMedicalHistory;




