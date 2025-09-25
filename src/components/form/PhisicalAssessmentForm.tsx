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
import { PhysicalAssessmentDataModel } from "@/utils/types/interfaces";

// Types for form data and form error
// type FormData = {
//     height: string;
//     weight: string;
//     bmi: string;
//     bloodGroup: string
//     systolic: string;
//     diastolic: string;
//     heartRate: string;
// };
type FormError = Partial<Record<keyof PhysicalAssessmentDataModel, string>>;

const initialFormData: PhysicalAssessmentDataModel = {
    height: "",
    weight: "(kg)",
    bmi: "",
    bloodGroup: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
};

const initialFormError: FormError = {};

const PhisicalAssessmentForm = ({ setShowPhisicalAssessment, setModalFormPhisicalData }: any) => {

    const [formData, setFormData] = useState<PhysicalAssessmentDataModel>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);


    const validateForm = (data: PhysicalAssessmentDataModel): FormError => {
        const errors: FormError = {};

        if (!data.height.trim()) errors.height = "Height is required";
        if (!data.weight.trim()) errors.weight = "Weight is required";
        if (!data.bmi.trim()) errors.bmi = "BMI is required";
        if (!data.bloodGroup.trim()) errors.bloodGroup = "Blood group is required";
        if (!data.systolic.trim() && !data.diastolic.trim()) {
            errors.systolic = "At least one of systolic or diastolic is required";

            // errors.diastolic = "At least one of systolic or diastolic is required";
        }
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
            const formattedDate = new Date().toLocaleDateString('en-GB', {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }).replace(/^(\w+)/, '$1'); // Adds comma after weekday

            const updatedFormData = {
                ...formData,
                date: formattedDate
            };

            setModalFormPhisicalData((prev: any) => [...prev, updatedFormData]);
            setShowPhisicalAssessment(false);
            setFormError(initialFormError);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-md-4 g-2 accordion-form-physical-assessment" >
                    <Col md={6}>

                        <InputFieldGroup
                            label="Height"
                            name="height"
                            type="number"
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
                            type="number"
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
                            type="number"
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
                            placeholder="Select Blood Group"
                            // helperText="Select doctor"
                            options={[
                                { id: "1", value: "A+", label: "A+" },
                                { id: "2", value: "A-", label: "A-" },
                                { id: "3", value: "B+", label: "B+" },
                                { id: "4", value: "B-", label: "B-" },
                                { id: "5", value: "AB+", label: "AB+" },
                                { id: "6", value: "AB-", label: "AB-" },
                                { id: "7", value: "O+", label: "O+" },
                                { id: "8", value: "O-", label: "O-" },
                            ]}
                        />

                    </Col>

                    <Col md={5} className="input-custom-width">
                        <InputFieldGroup
                            label="Blood Pressure"
                            name="systolic"
                            type="number"
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


                    <Col md={1} className={formError.systolic ? "or-custom-width d-flex justify-content-center align-items-center mt-4" : "or-custom-width d-flex justify-content-center align-items-center mt-5"}>
                        {/* <span className="or-custom-slash">/</span> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="28" viewBox="0 0 10 28" fill="none">
                            <path d="M9.45417 0.843998L2.92617 27.7H0.23817L6.74217 0.843998H9.45417Z" fill="#3E4A57" />
                        </svg>

                    </Col>

                    <Col md={5} className="input-custom-width ">
                        <InputFieldGroup
                            label="" // No label here to match the design
                            name="diastolic"
                            type="number"
                            className="setting-password-input input-custom-data "
                            placeholder="Diastolic(mmHg)"
                            required={false}
                            disabled={false}
                            readOnly={false}
                            value={formData.diastolic}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);

                            }}
                        // error={formError.diastolic}
                        />
                    </Col>

                    <Col md={12}>

                        <InputFieldGroup
                            label="Heart Rate"
                            name="heartRate"
                            type="number"
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

                    <div className='d-flex gap-2'>
                        <Button className="w-100" variant="outline" disabled={false} onClick={() => setShowPhisicalAssessment(false)}>
                            Cancel
                        </Button>
                        <Button className="w-100" variant="default" disabled={false} type="submit">
                            Save
                        </Button>
                    </div>

                </Row>
            </form>
        </>
    );

}

export default PhisicalAssessmentForm