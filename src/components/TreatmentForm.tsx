"use client"

import { ProgressBar } from "react-bootstrap"
import { TreatmentPatientForm } from "./form/TreatmentAllForm"
import { useState } from "react";

export function TreatmentForm() {

    const [step, setStep] = useState<number | undefined>(1);
    const [stepper, setStepper] = useState<number | undefined>(1);
    const totalSteps = 3;
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

                <TreatmentPatientForm setStep={setStep} setStepper={setStepper} />
            )}

        </>
    )
}
