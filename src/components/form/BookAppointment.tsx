"use client"

import { Col, ProgressBar, Row } from "react-bootstrap";
import { InputFieldGroup } from "../ui/InputField";
import InputSelect from "../ui/InputSelect";
import { DatePickerFieldGroup } from "../ui/CustomDatePicker";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import Textarea from "../ui/Textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import Button from "../ui/Button";
import { BookAppointmentForm } from "@/utils/types/interfaces";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import { RadioButtonGroup } from "../ui/RadioField";
import Image from "next/image";
import Modal from "../ui/Modal";
import SuccessImageBookAppointment from "@/assets/images/Appointment-book.png";
import { PatientAutocomplete, PatientShow, SelecteAgeBox } from "../TempPatientAutocomplete";
import { PatientsDetails } from "@/utils/StaticData";

interface BookAppointmentProps {
    setBookAppointmentModal: React.Dispatch<React.SetStateAction<boolean>>;
    setShowSuccessModalBook: React.Dispatch<React.SetStateAction<boolean>>;
}

type FormError = Partial<Record<keyof BookAppointmentForm, string>>;

const initialFormData: BookAppointmentForm = {
    //Appointment Details
    appointmentId: "",
    type: "",
    concernsTreatment: "",
    appointmentDate: "",
    appointmentTime: "",
    forTime: "",
    additionalNote: "",

    //Patient Details
    patientName: "",
    phone: "",
    email: "",
    patientAge: "",
    gender: "male",
};

const initialFormError: FormError = {};

export function BookAppointment({
    setBookAppointmentModal,
    setShowSuccessModalBook,

}: BookAppointmentProps) {

    const [formData, setFormData] = useState<BookAppointmentForm>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);
    const [step, setStep] = useState<number>(1);
    const [stepper, setStepper] = useState(1);

    const totalSteps = 2;

    const handleChange = (
        e:
            | ChangeEvent<HTMLInputElement>
            | ChangeEvent<HTMLTextAreaElement>
            | ChangeEvent<HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };
    const validateForm = (data: BookAppointmentForm): FormError => {
        const errors: FormError = {};
        if (!data.appointmentId.trim()) errors.appointmentId = "Appointment ID is required";
        if (!data.type.trim()) errors.type = "Type is required";
        if (!data.concernsTreatment.trim()) errors.concernsTreatment = "Concerns / Treatment is required";
        if (!data.appointmentDate.trim()) errors.appointmentDate = "Appointment Date is required";
        if (!data.appointmentTime.trim()) errors.appointmentTime = "Appointment Time is required";

        return errors;
    };
    const validateForm2 = (data: BookAppointmentForm): FormError => {
        const errors: FormError = {};
        if (!data.patientName.trim()) errors.patientName = "Patient Name is required";
        if (!data.phone.trim()) errors.phone = "Phone is required";
        if (!data.email.trim()) errors.email = "Email is required";
        if (!data.patientAge.trim()) errors.patientAge = "Patient Age is required";

        return errors;
    };

    const handelNext = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            setStep(2);
            console.log("first form submit go to next");
            setStepper((prev) => Math.max(1, prev + 1));
        }
    };

    const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm2(formData);
        setFormError(errors);
        if (Object.keys(errors).length === 0) {
            console.log("form submit success", formData);

            // close main modal
            setBookAppointmentModal?.(false);
            setShowSuccessModalBook?.(true);

        }
    };

    return (
        <>

            {/* Progress */}
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

            {step === 1 && (
                <form onSubmit={handelNext}>
                    <Row className="g-3">
                        <h6 className="doctor-profile-heading m-0">Appointment Details</h6>
                        <Col md={12}>
                            <InputFieldGroup
                                label="Appointment ID"
                                name="appointmentId"
                                type="text"
                                value={formData.appointmentId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Appointment ID"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.appointmentId}

                            ></InputFieldGroup>
                        </Col>
                        <Col md={12}>
                            <InputSelect
                                label="Type"
                                name="type"
                                value={formData.type}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                required={true}
                                error={formError.type}
                                placeholder="Select Appointment Type"
                                options={[
                                    { id: "1", value: "Follow - Up", label: "Follow - Up" },
                                    { id: "2", value: "other", label: "other" },
                                ]}
                            />
                        </Col>
                        <Col md={12}>
                            <InputFieldGroup
                                label="Concerns / Treatment "
                                name="concernsTreatment"
                                type="text"
                                value={formData.concernsTreatment}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Concerns / Treament"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.concernsTreatment}

                            ></InputFieldGroup>
                        </Col>
                        <Col md={4}>
                            <DatePickerFieldGroup
                                label="Appointment Date"
                                name="appointmentDate"
                                value={formData.appointmentDate}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                required={true}
                                error={formError.appointmentDate}
                            />
                        </Col>
                        <Col md={4}>
                            <TimePickerFieldGroup
                                label="Appointment Time"
                                name="appointmentTime"
                                value={formData.appointmentTime}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                required={true}
                                error={formError.appointmentTime}
                            />
                        </Col>
                        <Col md={4}>
                            <InputSelect
                                label="For"
                                name="forTime"
                                value={formData.forTime}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                required={false}
                                placeholder="Select duration"
                                options={[
                                    { id: "1", value: "30minutes", label: "30minutes" },
                                    { id: "2", value: "1hour", label: "1hour" },
                                    { id: "3", value: "2hours", label: "2hours" },
                                ]}
                            />
                        </Col>
                        <Col md={12}>
                            <Textarea
                                label="Additional Note"
                                name="additionalNote"
                                value={formData.additionalNote}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => { }}
                                required={false}
                                error={formError.additionalNote}
                                maxLength={100}
                            />
                        </Col>

                        <Col md={12}>
                            <div className="d-flex justify-content-end">
                                <Button variant="default" type="submit" className="w-50">
                                    Next
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </form>
            )
            }

            {step === 2 && (
                <form onSubmit={handelSubmit}>
                    <Row className="g-3">
                        <h6 className="doctor-profile-heading m-0">Patient’s Details</h6>
                        <Col md={12}>

                            <PatientAutocomplete
                                data={PatientsDetails}
                                placeholder="Type patient name..."
                                onChange={(selected) => {
                                    console.log("Selected:", selected);
                                }}
                            />

                            <PatientShow />

                            {/* <InputFieldGroup
                                label="Name"
                                name="patientName"
                                type="text"
                                value={formData.patientName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Patient’s Name"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.patientName}

                            ></InputFieldGroup> */}

                            {/* <PatientAutocomplete data={patients} onSelect={(patient) => {
                                setFormData((prev) => ({ ...prev, patientName: patient.name }));
                                setFormError((prev) => ({ ...prev, patientName: "" }));
                                handleChange({
                                    target: { name: "patientName", value: patient.name },
                                } as React.ChangeEvent<HTMLInputElement>);
                            }} /> */}

                        </Col>
                        <Col md={6}>
                            <PhoneNumberInput
                                label="Phone"
                                value={formData.phone}
                                onChange={(phone: any) => {
                                    setFormData((prev) => ({ ...prev, phone }));
                                    setFormError((prev) => ({ ...prev, phone: "" }));
                                    handleChange({
                                        target: { name: "phone", value: phone },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                placeholder="1212"
                                required

                                error={formError.phone}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Email"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.email}

                            ></InputFieldGroup>
                        </Col>
                        <Col md={12}>

                            <SelecteAgeBox />

                            {/* <InputSelect
                                label="Age"
                                name="patientAge"
                                value={formData.patientAge}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={false}
                                disabled={false}
                                placeholder="Select Age"
                                error={formError.patientAge}

                                options={[
                                    { id: "1", value: "1", label: "Below 18" },
                                    { id: "2", value: "2", label: "18 - 24" },
                                    { id: "3", value: "3", label: "25 - 35" },
                                    { id: "4", value: "3", label: "36 - 40" },
                                    { id: "5", value: "3", label: "41 - 50" },
                                    { id: "6", value: "3", label: "50+" },
                                ]}
                            /> */}
                        </Col>
                        <Col md={12}>
                            <RadioButtonGroup
                                label="Gender"
                                name="gender"
                                value={formData.gender || ""}

                                onChange={(e) => handleChange(e)}
                                required
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                    { label: "Other", value: "Other" }
                                ]}
                            />

                        </Col>
                        <div className="d-flex gap-3 mt-3">
                            <Button
                                variant="outline"
                                className="w-100"
                                type="button"
                                onClick={() => { setStep(step - 1); setStepper((prev) => Math.max(1, prev - 1)); }}
                            >
                                Previous
                            </Button>
                            <Button variant="default" type="submit" className="w-100">
                                Submit
                            </Button>
                        </div>

                    </Row>
                </form>
            )}
        </>
    )
}

export function SuccessModalBookAppointment({
    showSuccessModalBook,
    setShowSuccessModalBook,
}: {
    showSuccessModalBook: boolean;
    setShowSuccessModalBook: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Modal
            show={showSuccessModalBook}
            onHide={() => setShowSuccessModalBook(false)}
            closeButton={true}
        >
            <div className="text-center">
                <Image src={SuccessImageBookAppointment} alt="successImg" width={200} height={240} />
                <h3 className="modal-custom-header mt-2">
                    Appointment Request Submitted!
                </h3>
                <p className="modal-custom-content">
                    Maicare will contact you shortly to confirm your request
                </p>
            </div>

            <div className="d-flex justify-content-center gap-3">
                <Button
                    variant="outline"
                    className="w-100"
                    onClick={() => setShowSuccessModalBook(false)}
                >
                    Okay
                </Button>
                <Button
                    variant="default"
                    className="w-100"
                    onClick={() => setShowSuccessModalBook(false)}
                >
                    View Details
                </Button>
            </div>
        </Modal>
    );
}
