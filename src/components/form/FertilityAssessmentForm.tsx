"use client";

import { ChangeEvent } from "react";
import { Col, Row } from "react-bootstrap";
import InputSelect from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { RadioButtonGroup } from "../ui/RadioField";
import { InputFieldGroup } from "../ui/InputField";



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
