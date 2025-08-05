import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Head from 'next/head';
import ProfileImage from '../assets/images/Profile_Image.png'
import { ProfileCard, TabsSection } from './ui/Custom/ProfileCard';

const AddMedicalHistory = () => {
  return (
    <>
      {/* <Head>
        <title>Patient Profile</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </Head> */}

      {/* <div className=" py-2"> */}
        
        <ProfileCard
          name="Rani Desai"
          image="../assets/images/Profile_Image.png"
          id="PTS-874562"
          gender="Female"
          dob="7 Jan 1999"
          age={31}
          joinDate="7 Jan 2025"
          status="Active"
        />
      {/* </div> */}


      <main className="bg-light min-vh-100 py-2">
        <div className="">
          <TabsSection />
        </div>
      </main>
    </>
  );
};

export default AddMedicalHistory;
