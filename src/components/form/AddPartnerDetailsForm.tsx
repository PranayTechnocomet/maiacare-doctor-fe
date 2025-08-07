import React, { ChangeEvent, useState } from 'react'
import ContentContainer from '../ui/ContentContainer';
import CustomTabs from '../ui/CustomTabs';
import Image from 'next/image';
import Modal from '../ui/Modal';
import { InputFieldGroup } from '../ui/InputField';
import { Col, Row } from 'react-bootstrap';
import { RadioButtonGroup } from '../ui/RadioField';
import InputSelect from '../ui/InputSelect';
import { PhoneNumberInput } from '../ui/PhoneNumberInput';
import Button from '../ui/Button';

export function AddPartnerDetailsForm() {
    const [key, setKey] = useState<string>('basic');

    const [activeTab, setActiveTab] = useState<string>("basic");



    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <div>
                    <BasicDetailsForm />
                </div>
            ),
        },
        {
            key: "medical history",
            label: "Medical History",
            content: (
                <MedicalHistoryForm />
            ),
        },
        {
            key: "physical & fertility assessment",
            label: "Physical & Fertility Assessment",
            content: (
                <PhysicalFertilityAssessmentForm />
            ),
        },

    ];
    return (
        <>
            {/* <main className="bg-light min-vh-100 py-2"> */}
            <div className="">

                <CustomTabs
                    activeKey={activeTab}
                    setActiveKey={setActiveTab}
                    tabOptions={tabOptions}

                />
            </div>
            {/* </main> */}
        </>
    )
}


type FormData = {
    basic_detail_name: string;
    basic_detail_gender: string;
    basic_detail_age: string;
    basic_detail_phone: string;
    basic_detail_email: string;
};

type FormError = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
    basic_detail_name: "",
    basic_detail_gender: "",
    basic_detail_age: "",
    basic_detail_phone: "",
    basic_detail_email: ""

};
const initialFormError: FormError = {};

export function BasicDetailsForm() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);
    // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };
    return (
        <>
        <ContentContainer>
            <form>
                <Row>
                    <Col xs={12}>
                        <InputFieldGroup
                            label="Name"
                            name="basic_detail_name"
                            type="text"
                            value={formData.basic_detail_name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter name"
                            required={true}
                            error={formError.basic_detail_name}
                            className="position-relative "
                        ></InputFieldGroup>
                    </Col>
                    <Col xs={6}>
                        <RadioButtonGroup
                            label="Gender"
                            name="basic_detail_gender"
                            value={formData.basic_detail_gender}
                            defaultValue="male"
                            onChange={(e) => handleChange(e)}
                            required
                            options={[
                                { label: "Male", value: "male" },
                                { label: "Female", value: "female" },
                            ]}
                        />
                    </Col>

                    <Col xs={6}>
                        <InputSelect
                            label="age"
                            name="basic_detail_age"
                            value={formData.basic_detail_age}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.basic_detail_age}
                            options={[
                                { id: "1", value: "1", label: "1" },
                                { id: "2", value: "2", label: "2" },
                                { id: "3", value: "3", label: "3" },
                                { id: "4", value: "4", label: "4" },
                                { id: "5", value: "5", label: "5" },
                                { id: "6", value: "6", label: "6" },
                                { id: "7", value: "7", label: "7" },
                                { id: "8", value: "8", label: "8" },
                                { id: "9", value: "9", label: "9" },
                                { id: "10", value: "10", label: "10" },
                                { id: "11", value: "11", label: "11" },
                                { id: "12", value: "12", label: "12" },
                                { id: "13", value: "13", label: "13" },
                                { id: "14", value: "14", label: "14" },
                                { id: "15", value: "15", label: "15" },
                                { id: "16", value: "16", label: "16" },
                                { id: "17", value: "17", label: "17" },
                                { id: "18", value: "18", label: "18" },
                                { id: "19", value: "19", label: "19" },
                                { id: "20", value: "20", label: "20" },
                                { id: "21", value: "21", label: "21" },
                                { id: "22", value: "22", label: "22" },
                                { id: "23", value: "23", label: "23" },
                                { id: "24", value: "24", label: "24" },
                                { id: "25", value: "25", label: "25" },
                            ]}
                        />
                    </Col>


                    <Col xs={6}>
                        <PhoneNumberInput
                            label="Contact Number"
                            value={formData.basic_detail_phone}
                            onChange={(phone: any) => {
                                // setFormData((prev) => ({ ...prev, phone }));
                                // setFormError((prev) => ({ ...prev, phone: "" }));
                                handleChange({
                                    target: { name: "basic_detail_phone", value: phone },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}
                            required

                            error={formError.basic_detail_phone}
                        />
                    </Col>


                    <Col xs={6}>
                        <InputFieldGroup
                            label="Email ID"
                            name="basic_detail_email"
                            type="email"
                            value={formData.basic_detail_email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Enter Email ID"
                            required={true}

                            error={formError.basic_detail_email}
                            className="position-relative "
                        ></InputFieldGroup>
                    </Col>
                    <Col md={6} className='mt-2'>
                        <Button className="w-100" variant="outline" disabled={false} >
                            Cancel
                        </Button>
                    </Col>
                    <Col md={6} className='mt-2'>
                        <Button className="w-100" variant="default" disabled={false} type="submit">
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>
            </ContentContainer>
        </>
    )
}



export function MedicalHistoryForm() {
    return (
        <>
            <div>
                <h1>Medical History</h1>

            </div>
        </>
    )
}

export function PhysicalFertilityAssessmentForm() {
    return (
        <>
            <div>
                <h1>Physical & Fertility Assessment</h1>

            </div>
        </>
    )
}
