"use client"

import { ProgressUpdatesType } from "@/utils/types/interfaces";
import { ProgressBar } from "react-bootstrap";
import { TreatmentFertilityAssessmentPartner, TreatmentFertilityAssessmentPatient } from "./form/TreatmentAllForm";
import { useState } from "react";
import CustomTabs from "./ui/CustomTabs";

export function ProgressUpdatesEditForm({
    setStep,
    setStepper,
    step,
    stepper,
    totalSteps,
    editProgressUpdatesData,
    setModalFormFertilityData
}: {
    setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
    setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
    step: number | undefined;
    stepper: number | undefined;
    totalSteps: number;
    editProgressUpdatesData: ProgressUpdatesType;
    setModalFormFertilityData: React.Dispatch<React.SetStateAction<ProgressUpdatesType>>;
}) {

    const [activeTab, setActiveTab] = useState<string>("patient");

    const tabOptions = [
        {
            key: "patient",
            label: "Patient",
            content: (
                <>
                    <TreatmentFertilityAssessmentPatient
                        setModalFormFertilityData={setModalFormFertilityData}
                        setActiveTab={setActiveTab}
                        editProgressUpdatesData={editProgressUpdatesData}

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
                        setModalFormFertilityData={setModalFormFertilityData}
                        editProgressUpdatesData={editProgressUpdatesData}
                        setStep={setStep}
                        setStepper={setStepper}

                    />
                </>
            ),
        }
    ];

    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1 d-flex">
                    {[...Array(totalSteps)].map((_, index) => (
                        <div key={index} className="flex-fill mx-1">
                            <ProgressBar
                                now={100}
                                className={
                                    index < (stepper || 0)
                                        ? "progress-bar progressbar-step-success"
                                        : "progress-bar progressbar-step-secondary"
                                }
                            />
                        </div>
                    ))}
                </div>
                <span className="ms-2 progressbar-step">
                    {step} of {totalSteps}
                </span>
            </div>

            {step == 1 && (

                <CustomTabs
                    tabOptions={tabOptions}
                    className="mb-3"
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                />

            )}


        </>
    )
}