"use client";

import { ChangeEvent, useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import InputSelect from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { RadioButtonGroup } from "../ui/RadioField";
import { InputFieldGroup } from "../ui/InputField";
import Button from "../ui/Button";

// Types for form data and form error
type FormData = {
    ageAtFirstMenstruation: string;
    cycleLength: string;
    periodLength: string;
    date: string;
    isCycleRegular: string;
    menstrualIssues: string;
    pregnancy: string;
    timeduration: string;
    ectopicpregnancy: string;
};

const initialFormData: FormData = {
    ageAtFirstMenstruation: "",
    cycleLength: "",
    periodLength: "",
    date: "",
    isCycleRegular: "",
    menstrualIssues: "",
    pregnancy: "",
    timeduration: "",
    ectopicpregnancy: ""
};

type FormError = Partial<Record<keyof FormData, string>>;

const initialFormError: FormError = {};

export const FertilityAssessmentForm = () => {

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};

        if (!data.ageAtFirstMenstruation.trim()) errors.ageAtFirstMenstruation = "Age at first menstruation is required";
        if (!data.cycleLength.trim()) errors.cycleLength = "Cycle length is required";
        if (!data.periodLength.trim()) errors.periodLength = "Period length is required";
        if (!data.date) errors.date = "Date is required";
        if (!data.isCycleRegular) errors.isCycleRegular = "Is cycle regular is required";
        if (!data.menstrualIssues) errors.menstrualIssues = "Menstrual issues is required";
        if (!data.pregnancy) errors.pregnancy = "Pregnancy is required";
        if (!data.timeduration) errors.timeduration = "Duration is required";
        if (!data.ectopicpregnancy) errors.ectopicpregnancy = "Ectopic pregnancy is required";

        return errors;
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("clicked");

        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            //   setShowModal(true);
            setFormError(initialFormError);
        }
    };

    return (
        <>
            {/* <h1>Fertility Assessment Form</h1> */}

            <form onSubmit={handleSubmit}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="fertilitiy-assement-accodion-item mb-3">
                        <Accordion.Header>
                            <div className="fertilitiy-assement-accodion-title">
                                Menstrual Cycle
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            <Row className="g-3">
                                <Col md={6}>
                                    <InputSelect
                                        label="Age at first menstruation"
                                        name="ageAtFirstMenstruation"
                                        value={formData.ageAtFirstMenstruation}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handleChange(e);
                                        }}
                                        error={formError.ageAtFirstMenstruation}
                                        onBlur={() => { }}
                                        required
                                        disabled={false}
                                        options={[{ id: "1", value: "1", label: "1" }, { id: "2", value: "2", label: "2" } /* ... */]}
                                    />
                                </Col>

                                <Col md={6}>
                                    <InputSelect
                                        label="Cycle Length"
                                        name="cycleLength"
                                        value={formData.cycleLength}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handleChange(e);
                                        }}
                                        error={formError.cycleLength}
                                        onBlur={() => { }}
                                        required
                                        disabled={false}
                                        options={[{ id: "1", value: "1", label: "1" }, { id: "2", value: "2", label: "2" } /* ... */]}
                                    />
                                </Col>

                                <Col md={6}>
                                    <InputSelect
                                        label="Period Length"
                                        name="periodLength"
                                        value={formData.periodLength}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                            handleChange(e);
                                        }}
                                        error={formError.periodLength}
                                        onBlur={() => { }}
                                        required
                                        disabled={false}
                                        options={[{ id: "1", value: "1", label: "1" }, { id: "2", value: "2", label: "2" } /* ... */]}
                                    />
                                </Col>

                                <Col md={6}>
                                    <DatePickerFieldGroup
                                        label="Select Date"
                                        name="date"
                                        value={formData.date}
                                        placeholder="Enter last period date"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleChange(e);
                                        }}
                                        error={formError.date}
                                        onBlur={() => { }}
                                        required
                                        disabled={false}
                                        helperText=""
                                    />
                                </Col>

                                <Col md={12}>
                                    <RadioButtonGroup
                                        label="Is your cycle regular?"
                                        name="isCycleRegular"
                                        value={formData.isCycleRegular}
                                        defaultValue=""
                                        onChange={handleChange}
                                        required
                                        options={[
                                            { label: "Regular", value: "Regular" },
                                            { label: "Sometimes Irregular", value: "Sometimes Irregular" },
                                            { label: "Irregular", value: "Irregular" }
                                        ]}
                                    />

                                    <RadioButtonGroup
                                        label="Do you experience menstrual issues?"
                                        name="menstrualIssues"
                                        className="mt-2"
                                        value={formData.menstrualIssues}
                                        defaultValue=""
                                        onChange={handleChange}
                                        required
                                        options={[
                                            { label: "Yes", value: "yes" },
                                            { label: "No", value: "no" }
                                        ]}
                                    />
                                </Col>
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="fertilitiy-assement-accodion-title">
                                Pregnancy
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            <RadioButtonGroup
                                label="Have you been pregnant before?"
                                name="pregnancy"
                                className="mt-2"
                                value={formData.pregnancy}
                                defaultValue=""
                                onChange={handleChange}
                                required
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]}
                            />

                            <InputFieldGroup
                                label="How long have you been trying to conceive?"
                                name="timeduration"
                                type="text"
                                className="setting-password-input"
                                placeholder="Enter Duration"
                                required
                                disabled={false}
                                readOnly={false}
                                value={formData.timeduration}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                error={formError.timeduration}
                            />

                            <RadioButtonGroup
                                label="Any history of miscarriage or ectopic pregnancy?"
                                name="ectopicpregnancy"
                                className="mt-2"
                                value={formData.ectopicpregnancy}
                                defaultValue=""
                                onChange={handleChange}
                                required
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" }
                                ]}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>

                {/* Submit buttons */}
                <Row className="mt-4">
                    <Col md={6}>
                        <Button className="w-100" variant="outline" type="button">
                            Cancel
                        </Button>
                    </Col>
                    <Col md={6}>
                        <Button className="w-100" variant="default" type="submit">
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>

        </>
    )
}

export const MenstrualCycle = () => {

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        // const { name, value } = e.target;
        // setFormData((prev) => ({ ...prev, [name]: value }));
        // setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <>
            <form>
                <Row className="g-3">
                    <Col md={6}>
                        <InputSelect
                            label="Age at first menstruation"
                            name="ageAtFirstMenstruation"
                            // value={formData.bloodGroup}
                            // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            //     handleChange(e);
                            // }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            // error={formError.bloodGroup}
                            // helperText="Select doctor"
                            options={[
                                { id: "1", value: "1", label: "1" },
                                { id: "2", value: "2", label: "2" },
                                { id: "3", value: "3", label: "3" },
                                { id: "4", value: "4", label: "4" },
                                { id: "5", value: "5", label: "5" },
                                { id: "6", value: "6", label: "6" },
                                { id: "7", value: "7", label: "7" },
                                { id: "8", value: "8", label: "8" },
                            ]}
                        />
                    </Col>
                    <Col md={6}>

                        <InputSelect
                            label="Cycle Length"
                            name="cycleLength"
                            // value={formData.bloodGroup}
                            // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            //     handleChange(e);
                            // }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            // error={formError.bloodGroup}
                            // helperText="Select doctor"
                            options={[
                                { id: "1", value: "1", label: "1" },
                                { id: "2", value: "2", label: "2" },
                                { id: "3", value: "3", label: "3" },
                                { id: "4", value: "4", label: "4" },
                                { id: "5", value: "5", label: "5" },
                                { id: "6", value: "6", label: "6" },
                                { id: "7", value: "7", label: "7" },
                                { id: "8", value: "8", label: "8" },
                            ]}
                        />

                    </Col>
                    <Col md={6}>
                        <InputSelect
                            label="Period Length "
                            name="periodLength"
                            // value={formData.bloodGroup}
                            // onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            //     handleChange(e);
                            // }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            // error={formError.bloodGroup}
                            // helperText="Select doctor"
                            options={[
                                { id: "1", value: "1", label: "1" },
                                { id: "2", value: "2", label: "2" },
                                { id: "3", value: "3", label: "3" },
                                { id: "4", value: "4", label: "4" },
                                { id: "5", value: "5", label: "5" },
                                { id: "6", value: "6", label: "6" },
                                { id: "7", value: "7", label: "7" },
                                { id: "8", value: "8", label: "8" },
                            ]}
                        />
                    </Col>
                    <Col md={6}>
                        <DatePickerFieldGroup
                            label="Select Date"
                            name="date"
                            placeholder="Enter last period date"
                            // value={formData.date}
                            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            //     handleChange(e);
                            // }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            required={true}
                            disabled={false}
                            // error={formError.date}
                            helperText=""
                        />
                    </Col>
                    <Col md={12}>

                        <RadioButtonGroup
                            label="Is your cycle regular?"
                            name="IsCycleRegular"
                            value=""
                            defaultValue="male"
                            onChange={(e) => handleChange(e)}
                            required
                            options={[
                                { label: "Regular", value: "Regular" },
                                { label: "Sometimes Irregular", value: "Sometimes Irregular" },
                                { label: "Irregular", value: "Irregular" },
                            ]}
                        />

                        <RadioButtonGroup
                            label="Do you experience menstrual issues?"
                            name="menstrualIssues"
                            className="mt-2"
                            value=""
                            defaultValue="male"
                            onChange={(e) => handleChange(e)}
                            required
                            options={[
                                { label: "yes", value: "yes" },
                                { label: "No", value: "No" },

                            ]}
                        />
                    </Col>
                </Row>
            </form>
        </>
    );
}

export const Pregnancy = () => {
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        // const { name, value } = e.target;
        // setFormData((prev) => ({ ...prev, [name]: value }));
        // setFormError((prev) => ({ ...prev, [name]: "" }));
    };
    return (
        <>
            <form>

                <RadioButtonGroup
                    label="Have you been pregnant before?"
                    name="pregnancy"
                    className="mt-2"
                    value=""
                    defaultValue="male"
                    onChange={(e) => handleChange(e)}
                    required
                    options={[
                        { label: "yes", value: "yes" },
                        { label: "No", value: "No" },

                    ]}
                />

                <InputFieldGroup
                    label="How long have you been trying to conceive? *"
                    name="timeduration"
                    type="text"
                    className='setting-password-input'
                    // value={formData.weight}
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    //     handleChange(e);

                    // }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                    placeholder="Enter Duration"
                    required={true}
                    disabled={false}
                    readOnly={false}
                // error={formError.weight}
                />

                <RadioButtonGroup
                    label="Any history of miscarriage or ectopic pregnancy?"
                    name="ectopicpregnancy"
                    className="mt-2"
                    value=""
                    defaultValue="male"
                    onChange={(e) => handleChange(e)}
                    required
                    options={[
                        { label: "yes", value: "yes" },
                        { label: "No", value: "No" },

                    ]}
                />
            </form>

        </>
    );
}
