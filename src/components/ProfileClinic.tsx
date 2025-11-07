"use client"

import { useState } from "react";
import { ClinicReviews, ManageLeave, Reviews } from "./ManageLeave";
import DoctorProfile from "./ui/custom/DoctorProfile";
import CustomTabs from "./ui/CustomTabs";
import ProfileBasicDetailsTabs from "./Profile-Basic-Details";
import { useRouter } from "next/navigation";

export default function ProfileClinic() {
    const [activeTab, setActiveTab] = useState<string>("basic");

    const router = useRouter();

    const handleEditProfile = () => {
        router.push('/edit-ProfileClinic');
    };

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
                    <ClinicReviews />
                </>
            ),
        },

    ];

    return (
        <>
            <DoctorProfile handleEditProfile={handleEditProfile}/>
            <div className='mt-4'>

                <CustomTabs
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                    tabOptions={tabOptions}
                />

            </div>
        </>

    );
}
