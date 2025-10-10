"use client"

import { TreatmentForm, TreatmentPlan } from "@/utils/types/interfaces";
import { ChangeEvent, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { InputSelect } from "../ui/InputSelect";
import { TempTreatmentSteps } from "@/utils/StaticData";
import Button from "../ui/Button";

interface TreatmentPatientFormProps {
    setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
    setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function TreatmentPatientForm({
    setStep,
    setStepper }:

    TreatmentPatientFormProps) {

    const initialFormData: TreatmentForm = {
        patientName: "",
        treatment: "",
        duration: "",

    };

    type FormError = Partial<Record<keyof TreatmentForm, string>>;

    const initialFormError: FormError = {};
    const [formError, setFormError] = useState<FormError>(initialFormError);
    const [formData, setFormData] = useState<TreatmentForm>(initialFormData);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = (data: TreatmentForm): FormError => {
        const errors: FormError = {};
        if (!data.patientName) {
            errors.patientName = "Patient Name is required";
        }
        if (!data.treatment) {
            errors.treatment = "Treatment is required";
        }
        if (!data.duration) {
            errors.duration = "Duration is required";
        }
        return errors;
    };

    const handelNext = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormError(errors);
        // console.log("errors", errors);

        if (Object.keys(errors).length === 0) {
            setStep((prev: any) => prev + 1);
            setStepper((prev: any) => prev + 1);
            setFormError(initialFormError);
        }
    };

    return (
        <>
            <form onSubmit={handelNext}>
                <Row className="g-3">
                    <h6 className="dashboard-chart-heading mb-0">Treatment Plan</h6>

                    <Col md={12}>
                        select profile
                    </Col>
                    <Col md={6}>
                        <InputSelect
                            label="Select Treatment"
                            name="treatment"
                            value={formData.treatment}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            placeholder="Select Treatment"
                            error={formError.treatment}
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
                            value={formData.duration}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.duration}
                            placeholder="Select Duration"
                            options={[
                                { id: "1", value: "1", label: "Duration 1" },
                                { id: "2", value: "2", label: "Duration 2" },
                                { id: "3", value: "3", label: "Duration 3" },
                            ]}
                        />
                    </Col>
                    <Col md={12}>

                        {formData.treatment &&
                            <Row className="g-2">
                                {TempTreatmentSteps.map((item) => (
                                    <Col md={6} key={item.id}>
                                        <div className="treatment-steps-box d-flex gap-2 ps-4">
                                            <span className="treatment-steps-box-item ">{item.id}.</span>
                                            <p className="treatment-steps-box-item m-0">{item.step}</p>
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        }

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
        </>
    )
}

