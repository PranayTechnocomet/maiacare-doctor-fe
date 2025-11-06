'use client'
import { useState } from 'react';
import CustomTabs from './ui/CustomTabs';
import ContentContainer from './ui/ContentContainer';
import DoctorProfile from './ui/custom/DoctorProfile';
import ProfileBasicDetailsTabs from './Profile-Basic-Details';
import ManageLeave from './ManageLeave';

const ProfileTabes = () => {
    const [activeTab, setActiveTab] = useState<string>("basic");

    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <>
                    <ProfileBasicDetailsTabs />
                </>
            ),
        },
        {
            key: "leaves",
            label: "Manage Leaves",
            content: (
                <>
                    <ManageLeave />
                    
                </>
            ),
        },
        {
            key: "reviews",
            label: "Reviews",
            content: (
                <>
                    <ContentContainer className="mt-5">
                        <h1>Reviews Content</h1>
                    </ContentContainer>
                </>
            ),
        },

    ];


    return (
        <>
            <DoctorProfile />
            <div className='mt-4'>

                <CustomTabs
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                    tabOptions={tabOptions}
                />

                {/* {activeTab === 'basic' && (
          <div>

          </div>
        )}

        {activeTab === 'leaves' && (
          <div>
            
          </div>
        )}

        {activeTab === 'Reviews' && (
          <div>Reviews Content</div>
        )} */}

            </div>
        </>





    );
};

export default ProfileTabes;