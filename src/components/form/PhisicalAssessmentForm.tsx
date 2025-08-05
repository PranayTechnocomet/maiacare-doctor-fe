"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { InputFieldGroup } from "@/components/ui/InputField";
import { Col, Row } from "react-bootstrap";
import InputSelect from "@/components/ui/InputSelect";

// Types for form data and form error
type FormData = {
    height: string;
    weight: string;
    bmi: string;
    bloodGroup: string
    systolic: string;
    diastolic: string;
    heartRate: string;
};
type FormError = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
};

const initialFormError: FormError = {};


const PhisicalAssessmentForm = () => {

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);


    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};

        if (!data.height.trim()) errors.height = "Height is required";
        if (!data.weight.trim()) errors.weight = "Weight is required";
        if (!data.bmi.trim()) errors.bmi = "BMI is required";
        if (!data.bloodGroup.trim()) errors.bloodGroup = "Blood group is required";
        if (!data.systolic.trim()) errors.systolic = "Systolic is required";
        if (!data.diastolic.trim()) errors.diastolic = "Diastolic is required";
        if (!data.heartRate.trim()) errors.heartRate = "Heart rate is required";

        return errors;
    };

    // Handle form field change
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    // Submit Handler
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            // setShowModal(true);
            setFormError(initialFormError);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-4">
                    <Col md={6}>

                        <InputFieldGroup
                            label="Height"
                            name="height"
                            type="text"
                            className='setting-password-input'
                            value={formData.height}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter height(in)"
                            required={true}
                            disabled={false}
                            readOnly={false}
                            error={formError.height}
                        />
                    </Col>
                    <Col md={6}>

                        <InputFieldGroup
                            label="Weight"
                            name="weight"
                            type="text"
                            className='setting-password-input'
                            value={formData.weight}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter weight(kg)"
                            required={true}
                            disabled={false}
                            readOnly={false}
                            error={formError.weight}
                        />
                    </Col>

                    <Col md={6}>

                        <InputFieldGroup
                            label="BMI"
                            name="bmi"
                            type="text"
                            className='setting-password-input'
                            value={formData.bmi}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter BMI"
                            required={true}
                            disabled={false}
                            readOnly={false}
                            error={formError.bmi}
                        />
                    </Col>
                    <Col md={6}>
                        <InputSelect
                            label="Blood Group"
                            name="bloodGroup"
                            value={formData.bloodGroup}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.bloodGroup}
                            // helperText="Select doctor"
                            options={[
                                { id: "1", value: "1", label: "A+" },
                                { id: "2", value: "2", label: "A-" },
                                { id: "3", value: "3", label: "B+" },
                                { id: "4", value: "4", label: "B-" },
                                { id: "5", value: "5", label: "AB+" },
                                { id: "6", value: "6", label: "AB-" },
                                { id: "7", value: "7", label: "O+" },
                                { id: "8", value: "8", label: "O-" },
                            ]}
                        />

                    </Col>

                    <Col md={5}>
                        <InputFieldGroup
                            label="Blood Pressure"
                            name="systolic"
                            type="text"
                            className="setting-password-input"
                            placeholder="Systolic(mmHg)"
                            required={true}
                            disabled={false}
                            readOnly={false}
                            value={formData.systolic}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                            error={formError.systolic}
                        />
                    </Col>

                    <Col md={1} className="d-flex justify-content-center align-items-end ">
                        <span className="fs-1">/</span>
                    </Col>

                    <Col md={5}>
                        <InputFieldGroup
                            label="" // No label here to match the design
                            name="diastolic"
                            type="text"
                            className="setting-password-input"
                            placeholder="Diastolic(mmHg)"
                            required={true}
                            disabled={false}
                            readOnly={false}
                            value={formData.diastolic}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                            error={formError.diastolic}
                        />
                    </Col>

                    <Col md={12}>

                        <InputFieldGroup
                            label="Heart Rate"
                            name="heartRate"
                            type="text"
                            className='setting-password-input'
                            value={formData.heartRate}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter Rate(bpm)"
                            required={true}
                            disabled={false}
                            readOnly={false}
                            error={formError.heartRate}
                        />
                    </Col>
                    <Col md={6}>

                        <Button className="w-100" variant="outline" disabled={false}>
                            Cancel
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button className="w-100" variant="default" disabled={false} type="submit">
                            save
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    );

}

export default PhisicalAssessmentForm