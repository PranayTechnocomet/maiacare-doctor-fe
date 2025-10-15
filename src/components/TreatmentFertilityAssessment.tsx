"use client"

import { useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import { FertilityAssessmentForm } from "./form/FertilityAssessmentForm";
import { TreatmentFertilityAssessmentFormType } from "@/utils/types/interfaces";

function TreatmentFertilityAssessment({
    setTreatmentFertilityAssessmentData
}: {
    setTreatmentFertilityAssessmentData: React.Dispatch<React.SetStateAction<TreatmentFertilityAssessmentFormType>>; 
}) {

    const [activeTab, setActiveTab] = useState<string>("patient");

    const tabOptions = [
        {
            key: "patient",
            label: "Patient",
            content: (
                <div>

                    <FertilityAssessmentForm
                        // setModalFormFertilityData={setTreatmentFertilityAssessmentData}
                        setActiveTab={setActiveTab}
                    />
                </div>
            ),
        },
        {
            key: "partner",
            label: "Partner",
            content: (
                <div>
                    <h6>Partner</h6>
                </div>
            ),
        }
    ];

    return (
        <>
           <CustomTabs
                tabOptions={tabOptions}
                className="mb-3"
                activeKey={activeTab}
                setActiveKey={setActiveTab}
            />
        </>
    )
}

export default TreatmentFertilityAssessment
