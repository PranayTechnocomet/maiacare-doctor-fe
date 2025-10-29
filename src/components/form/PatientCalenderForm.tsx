"use client"

import { ChangeEvent } from "react";
import { Col, Row } from "react-bootstrap"
import { InputFieldGroup } from "../ui/InputField";
import { MultiSelectWithCheckbox } from "../ui/InputSelect";

function PatientCalenderForm() {

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        // setFormData((prev) => ({ ...prev, [name]: value }));
        // setFormError((prev) => ({ ...prev, [name]: "" }));

        // console.log("formData : ", formData.status);
    };

    return (
        <>
            <form>
                <Row>
                    <Col md={12}>
                        <InputFieldGroup
                            name="searchTags"
                            type="text"
                            // value={formData.name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Search tags"
                            required={false}
                            disabled={false}
                            readOnly={false}
                        // error={formError.name}

                        />
                    </Col>

                    <Col md={6}>
                        <MultiSelectWithCheckbox
                            label="Tests"
                            name="tests"
                            placeholder="Select Tests"
                            values={[]}
                            options={[
                                { id: "1", value: "Ultrasound", label: "Ultrasound" },
                                { id: "2", value: "Blood test", label: "Blood test" },
                                { id: "3", value: "Start stimulation", label: "Start stimulation" },
                                { id: "4", value: "HCG Trigger shot", label: "HCG Trigger shot" },
                                { id: "5", value: "status 5", label: "Egg Freezing" },

                            ]}
                            required={true}

                            // onChange={setSelected}
                            onChange={(status: any) => {
                                handleChange({
                                    target: { name: "status", value: status },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}

                            dropdownHandle={false}
                            disabled={false}
                            // error={formError.status}
                            helperText="Select Status"

                        />
                    </Col>
                    <Col md={6}>
                        <MultiSelectWithCheckbox
                            label="Status"
                            name="status"
                            placeholder="Select Status"
                            values={[]}
                            options={[
                                { id: "1", value: "Ultrasound", label: "Medication changed" },
                                { id: "2", value: "Blood test", label: "Medication start" },
                                { id: "3", value: "Start stimulation", label: "Medication added" },
                                { id: "4", value: "HCG Trigger shot", label: "Medication completed" },
                                { id: "5", value: "status 5", label: "Medication reacted" },

                            ]}
                            required={true}

                            // onChange={setSelected}
                            onChange={(status: any) => {
                                handleChange({
                                    target: { name: "status", value: status },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}

                            dropdownHandle={false}
                            disabled={false}
                            // error={formError.status}
                            helperText="Select Status"

                        />
                    </Col>
                    <Col md={12}>
                         <MultiSelectWithCheckbox
                            label="Symptoms"
                            name="symptoms"
                            placeholder="Select Symptoms"
                            values={[]}
                            options={[
                                { id: "1", value: "Ultrasound", label: "Coughing" },
                                { id: "2", value: "Blood test", label: "Cramping" },
                                { id: "3", value: "Start stimulation", label: "Spotting" },
                                { id: "4", value: "HCG Trigger shot", label: "Discharge" },
                                { id: "5", value: "status 5", label: "Bloating" },

                            ]}
                            required={true}

                            // onChange={setSelected}
                            onChange={(status: any) => {
                                handleChange({
                                    target: { name: "status", value: status },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }}

                            dropdownHandle={false}
                            disabled={false}
                            // error={formError.status}
                            helperText="Select Status"

                        />
                    </Col>
                </Row>
            </form>
        </>
    )
}

export default PatientCalenderForm
