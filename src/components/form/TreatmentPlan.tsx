"use client"

import { ChangeEvent, useState } from "react";
import { Col, ProgressBar, Row } from "react-bootstrap";
import InputSelect from "../ui/InputSelect";
import Button from "../ui/Button";
import '@/style/Appointment.css'
import { InputFieldGroup } from "../ui/InputField";
import { QuantityNumber, TimeSlotCheckBox } from "../TempUiComponent";
import { RadioButtonGroup } from "../ui/RadioField";
import Textarea from "../ui/Textarea";

function TreatmentPlan() {

    const [formData, setFormData] = useState({
        quantity: 0,

    });

    console.log("test", formData.quantity);
    

    const [step, setStep] = useState<number>(1);
    const [stepper, setStepper] = useState(1);
    const totalSteps = 3;

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        // setFormData((prev) => ({ ...prev, [name]: value }));
        // setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    const handelNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStep((prev) => prev + 1);
        setStepper((prev) => prev + 1);
    };

    const handelNextTwo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // setStep((prev) => prev + 1);
        // setStepper((prev) => prev + 1);
    };

    return (
        <>

            <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1 d-flex">
                    {[...Array(totalSteps)].map((_, index) => (
                        <div key={index} className="flex-fill mx-1">
                            <ProgressBar
                                now={100}
                                className={
                                    index < stepper
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
                <form onSubmit={handelNext}>
                    <Row className="g-3">
                        <h6 className="dashboard-chart-heading">Treatment Plan</h6>
                        <Col md={6}>
                            <InputSelect
                                label="Select Treatment"
                                name="treatment"
                                //   value={formData.doctor}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                placeholder="Select Treatment"
                                //   error={formError.doctor}
                                options={[
                                    { id: "1", value: "Treatment 1", label: "Treatment 1" },
                                    { id: "2", value: "Treatment 2", label: "Treatment 2" },
                                    { id: "3", value: "Treatment 3", label: "Treatment 3" },
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <InputSelect
                                label="Select Duration "
                                name="duration"
                                //   value={formData.doctor}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                //   error={formError.doctor}
                                placeholder="Select Duration"
                                options={[
                                    { id: "1", value: "1", label: "Duration 1" },
                                    { id: "2", value: "2", label: "Duration 2" },
                                    { id: "3", value: "3", label: "Duration 3" },
                                ]}
                            />
                        </Col>
                        <div className="d-flex justify-content-end">

                            <Button variant="default" type="submit" className="w-50">
                                <div className="d-flex justify-content-center align-items-center gap-2">

                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 20 16" fill="none">
                                        <path d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z" fill="white" />
                                    </svg>
                                </div>

                            </Button>
                        </div>
                    </Row>
                </form>
            )}

            {step == 2 && (
                <form onSubmit={handelNextTwo}>
                    <h6 className="dashboard-chart-heading pb-4">Medication Prescription</h6>

                    <Row className="g-3 Medication-form-Prescription-wrapper">
                        <Col md={12}>
                            <InputFieldGroup
                                label="Medicine Name"
                                name="medicineName"
                                type="text"
                                className=""
                                placeholder="Enter Medicine Name"
                                required
                                disabled={false}
                                readOnly={false}
                                // value={formData.timeduration}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            // error={formError.timeduration}
                            />
                        </Col>
                        <Col md={6}>
                            <InputSelect
                                label="Type"
                                name="type"
                                //   value={formData.doctor}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                placeholder="Select Type"
                                //   error={formError.doctor}
                                // helperText="Select Treatment"
                                options={[
                                    { id: "1", value: "Treatment 1", label: "Treatment 1" },
                                    { id: "2", value: "Treatment 2", label: "Treatment 2" },
                                    { id: "3", value: "Treatment 3", label: "Treatment 3" },
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Quantity"
                                name="typeQuantity"
                                type="text"
                                className=""
                                placeholder="Enter Quantity"
                                required
                                disabled={false}
                                readOnly={false}
                                // value={formData.timeduration}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            // error={formError.timeduration}
                            />
                        </Col>

                        <Col md={6}>
                            <InputSelect
                                label="Duration"
                                name="duration"
                                //   value={formData.doctor}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                placeholder="Select Duration"
                                //   error={formError.doctor}
                                // helperText="Select Treatment"
                                options={[
                                    { id: "1", value: "Treatment 1", label: "Treatment 1" },
                                    { id: "2", value: "Treatment 2", label: "Treatment 2" },
                                    { id: "3", value: "Treatment 3", label: "Treatment 3" },
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <QuantityNumber
                                label="Quantity"
                                name="quantity"
                                required={true}
                                value={formData.quantity}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                            />

                        </Col>
                        <Col md={12}>
                            <TimeSlotCheckBox />
                        </Col>

                        <Col md={6}>
                            <RadioButtonGroup
                                label="Meal"
                                name="meal"
                                value={"Before"}
                                defaultValue="Before"
                                onChange={(e) => handleChange(e)}
                                required
                                options={[
                                    { label: "Before", value: "Before" },
                                    { label: "After", value: "After" },
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Intake"
                                name="intake"
                                type="text"
                                className=""
                                placeholder="Enter Intake"
                                required
                                disabled={false}
                                readOnly={false}
                                // value={formData.timeduration}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            // error={formError.timeduration}
                            />
                        </Col>

                        <Col md={12}>
                            <Textarea
                                label="Description"
                                name="description"
                                value=""
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => { }}
                                required={true}
                                disabled={false}
                                // error={formError.description}
                                maxLength={100}

                            />
                        </Col>

                        <div className="d-flex gap-3">
                            <Button variant="outline" onClick={() => { setStep(step - 1); setStepper(stepper - 1); }} className="w-100">
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 20 16" fill="none">
                                        <path d="M19.1249 8.00001C19.1249 8.29838 19.0064 8.58452 18.7954 8.7955C18.5844 9.00648 18.2983 9.12501 17.9999 9.12501H4.21866L9.04866 13.9541C9.26 14.1654 9.37874 14.4521 9.37874 14.7509C9.37874 15.0498 9.26 15.3365 9.04866 15.5478C8.83732 15.7592 8.55067 15.8779 8.25179 15.8779C7.9529 15.8779 7.66625 15.7592 7.45491 15.5478L0.704911 8.79782C0.600031 8.6933 0.516814 8.56911 0.460033 8.43237C0.403252 8.29562 0.374023 8.14901 0.374023 8.00094C0.374023 7.85288 0.403252 7.70627 0.460033 7.56952C0.516814 7.43278 0.600031 7.30859 0.704911 7.20407L7.45491 0.454069C7.55956 0.349422 7.68379 0.266411 7.82052 0.209777C7.95725 0.153142 8.10379 0.123993 8.25179 0.123993C8.39978 0.123993 8.54632 0.153142 8.68305 0.209777C8.81978 0.266411 8.94401 0.349422 9.04866 0.454069C9.15331 0.558716 9.23632 0.68295 9.29295 0.819679C9.34959 0.956407 9.37874 1.10295 9.37874 1.25094C9.37874 1.39894 9.34959 1.54548 9.29295 1.68221C9.23632 1.81894 9.15331 1.94317 9.04866 2.04782L4.21866 6.87501H17.9999C18.2983 6.87501 18.5844 6.99353 18.7954 7.20451C19.0064 7.41549 19.1249 7.70164 19.1249 8.00001Z" fill="#2B4360" />
                                    </svg>
                                    Previous
                                </div>
                            </Button>
                            <Button variant="default" type="submit" className="w-100">
                                <div className="d-flex justify-content-center align-items-center gap-2">

                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 20 16" fill="none">
                                        <path d="M19.2959 8.79592L12.5459 15.5459C12.3346 15.7573 12.0479 15.876 11.7491 15.876C11.4502 15.876 11.1635 15.7573 10.9522 15.5459C10.7408 15.3346 10.6221 15.0479 10.6221 14.749C10.6221 14.4502 10.7408 14.1635 10.9522 13.9522L15.7812 9.12498H2C1.70163 9.12498 1.41548 9.00645 1.2045 8.79548C0.993526 8.5845 0.875 8.29835 0.875 7.99998C0.875 7.70161 0.993526 7.41546 1.2045 7.20449C1.41548 6.99351 1.70163 6.87498 2 6.87498H15.7812L10.9541 2.04498C10.7427 1.83364 10.624 1.54699 10.624 1.24811C10.624 0.94922 10.7427 0.662575 10.9541 0.451231C11.1654 0.239887 11.4521 0.121155 11.7509 0.121155C12.0498 0.121155 12.3365 0.239887 12.5478 0.451231L19.2978 7.20123C19.4027 7.30589 19.4859 7.43024 19.5426 7.56714C19.5993 7.70403 19.6284 7.85079 19.6282 7.99896C19.6281 8.14714 19.5986 8.29383 19.5416 8.43059C19.4846 8.56736 19.4011 8.69151 19.2959 8.79592Z" fill="white" />
                                    </svg>
                                </div>

                            </Button>
                        </div>
                    </Row>
                </form>
            )}
        </>
    )
}

export default TreatmentPlan;