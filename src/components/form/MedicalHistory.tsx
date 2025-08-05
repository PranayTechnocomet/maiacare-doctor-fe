import React, { ChangeEvent, useState } from 'react'
import { RadioButtonGroup } from '../ui/RadioField'
import { InputFieldGroup } from '../ui/InputField';
import InputSelect from '../ui/InputSelect';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../ui/Button';


type FormData = {
    name: string;
    doctor: string;
    date: string;
    gender: string;
    medication: string;
    description: string;
    phone: string;
    surgeries: string;
    medicalCondition: string;
    familyMedicalHistory: string;
    lifestyle: string;
    stress: string;
    exercise: string;
};

type FormError = Partial<Record<keyof FormData, string>>;
const initialFormData: FormData = {
    name: "",
    doctor: "",
    date: "",
    gender: "",
    medication: "",
    description: "",
    phone: "",
    surgeries: "",
    medicalCondition: "",
    familyMedicalHistory: "",
    lifestyle: "",
    stress: "",
    exercise: "",
};

const initialFormError: FormError = {};

export default function MedicalHistory() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };
    return (

        <>
            <div>
                <form>
                    <Row>
                        <Col md={12}>
                            <RadioButtonGroup
                                label="Are you currently taking any medications?"
                                name="Medication"
                                value={formData.medication}
                                defaultValue="yes"
                                onChange={(e) => handleChange(e)}
                                required={true}
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" },
                                ]}
                            />
                        </Col>
                        <Col md={12}>
                            <RadioButtonGroup
                                label="Have you had any surgeries?"
                                name="Surgeries"
                                value={formData.surgeries}
                                defaultValue="yes"
                                onChange={(e) => handleChange(e)}
                                required={true}
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" },
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <InputFieldGroup
                                label="Do you have any medical condition? "
                                name="medicalCondition"
                                type="text"
                                value={formData.medicalCondition}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Search Medical Condition or Allergies"
                                required={true}
                                error={formError.medicalCondition}
                                className="position-relative xyz"
                            ></InputFieldGroup>
                        </Col>
                        <Col md={12}>
                            <InputFieldGroup
                                label="Family Medical History "
                                name="familyMedicalHistory"
                                type="text"
                                value={formData.familyMedicalHistory}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter family medical history"
                                required={false}
                                error={formError.familyMedicalHistory}
                                className="position-relative xyz"
                            ></InputFieldGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <InputSelect
                                label="Lifestyle"
                                name="lifestyle"
                                value={formData.lifestyle}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.lifestyle}
                                options={[
                                    { id: "1", value: "1", label: "Non-smoker" },
                                    { id: "2", value: "2", label: "Occasional alcohol" },
                                    { id: "3", value: "3", label: "Vegetarian diet" },
                                ]}
                            />
                        </Col>
                        <Col md={6}>
                            <div className='d-flex gap-5'>
                                <RadioButtonGroup
                                    label="How often do you exercise?"
                                    name="exercise"
                                    value={formData.exercise}
                                    defaultValue="never"
                                    onChange={(e) => handleChange(e)}
                                    required={true}
                                    options={[
                                        { label: "Never", value: "never" },
                                        { label: "Rarely", value: "rarely" },
                                        { label: "Regularly", value: "regularly" },
                                    ]}
                                />

                                <RadioButtonGroup
                                    label="How would you rate your stress levels?"
                                    name="stress"
                                    value={formData.stress}
                                    defaultValue="low"
                                    onChange={(e) => handleChange(e)}
                                    required={true}
                                    options={[
                                        { label: "Low", value: "low" },
                                        { label: "Moderate", value: "moderate" },
                                        { label: "High", value: "high" },
                                    ]}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
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
            </div>
        </>
    )
}
