"use client"

import { useState } from "react";
import CustomTabs from "./ui/CustomTabs";
import { FertilityAssessmentForm } from "./form/FertilityAssessmentForm";
import { ProgressUpdatesType, TreatmentFertilityAssessmentFormType } from "@/utils/types/interfaces";
import { TreatmentFertilityAssessmentPartner, TreatmentFertilityAssessmentPatient } from "./form/TreatmentAllForm";

function TreatmentFertilityAssessment({
    setTreatmentFertilityAssessmentData,
    setTreatmentFertilityAssessmentModel
}: {
    setTreatmentFertilityAssessmentData: React.Dispatch<React.SetStateAction<ProgressUpdatesType>>;
    setTreatmentFertilityAssessmentModel: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const [activeTab, setActiveTab] = useState<string>("patient");

    const tabOptions = [
        {
            key: "patient",
            label: "Patient",
            content: (
                <>
                    <TreatmentFertilityAssessmentPatient
                        setShowFertilityAssessment={setTreatmentFertilityAssessmentModel}
                        setModalFormFertilityData={setTreatmentFertilityAssessmentData}
                        setActiveTab={setActiveTab}
                    />
                </>
            ),
        },
        {
            key: "partner",
            label: "Partner",
            content: (
                <>
                    <TreatmentFertilityAssessmentPartner
                        setShowFertilityAssessment={setTreatmentFertilityAssessmentModel}
                        setModalFormFertilityData={setTreatmentFertilityAssessmentData}
                    />
                </>
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
