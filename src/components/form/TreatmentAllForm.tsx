"use client"

import { MedicationPrescriptionType, TreatmentForm } from "@/utils/types/interfaces";
import { ChangeEvent, useState } from "react";
import { Col, Dropdown, Form, Row } from "react-bootstrap";
import { InputSelect } from "../ui/InputSelect";
import { PatientsDetails, TempTreatmentSteps } from "@/utils/StaticData";
import Button from "../ui/Button";
import { InputFieldError, InputFieldLabel } from "../ui/InputField";
import Image from "next/image";
import temppatientImg1 from "@/assets/images/patient-img-1.png"
import Modal from "../ui/Modal";
import TreatmentSuccessImage from "@/assets/images/TreatmentAddedSuccess.png";


interface TreatmentPatientFormProps {
    setStep: React.Dispatch<React.SetStateAction<number | undefined>>;
    setStepper: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export function TreatmentPatientForm({
    setStep,
    setStepper }:

    TreatmentPatientFormProps) {

    const initialFormData: TreatmentForm = {
        patientName: [],
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

    const [txtPatinetName, setTxtPatinetName] = useState("");
    const [open, setOpen] = useState(false);

    const patientData = PatientsDetails;
    const filtered = (() => {
        if (txtPatinetName.trim().length === 0) return [];
        const matches = patientData.filter((item) =>
            item.name.toLowerCase().includes(txtPatinetName.toLowerCase())
        );
        return matches.length > 0 ? matches : patientData;
    })();

    const validateForm = (data: TreatmentForm): FormError => {
        const errors: FormError = {};

        // if (!data.patientName) {
        //     errors.patientName = "Patient Name is required";
        // }
        if (Object.keys(formData?.patientName).length == 0) {
            errors.patientName = "Patient is required";
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

                        {Object.keys(formData?.patientName).length > 0
                            ? (
                                <div className="show-patient-box d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center gap-2">
                                        <Image
                                            className="show-patient-img"
                                            src={formData.patientName?.ProfilePhoto?.src || temppatientImg1}
                                            alt="doctor"
                                            width={48}
                                            height={48}
                                        />
                                        <span className="patient-treatment-box-subtitle-desc">{formData.patientName?.name}</span>
                                    </div>
                                    <div onClick={() => { setFormData({ ...formData, patientName: {} }); setTxtPatinetName(""); }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="29" height="28" viewBox="0 0 29 28" fill="none">
                                            <path d="M23.3035 20.9465C23.5501 21.193 23.6886 21.5275 23.6886 21.8762C23.6886 22.2249 23.5501 22.5593 23.3035 22.8059C23.057 23.0524 22.7226 23.1909 22.3739 23.1909C22.0252 23.1909 21.6907 23.0524 21.4442 22.8059L14.5 15.8594L7.55355 22.8037C7.30698 23.0502 6.97256 23.1888 6.62386 23.1888C6.27516 23.1888 5.94074 23.0502 5.69417 22.8037C5.4476 22.5571 5.30908 22.2227 5.30908 21.874C5.30908 21.5253 5.4476 21.1909 5.69417 20.9443L12.6406 14.0001L5.69636 7.05366C5.44979 6.80709 5.31127 6.47268 5.31127 6.12398C5.31127 5.77528 5.44979 5.44086 5.69636 5.19429C5.94293 4.94772 6.27735 4.8092 6.62605 4.8092C6.97475 4.8092 7.30917 4.94772 7.55573 5.19429L14.5 12.1407L21.4464 5.19319C21.6929 4.94663 22.0273 4.80811 22.376 4.80811C22.7247 4.80811 23.0592 4.94663 23.3057 5.19319C23.5523 5.43976 23.6908 5.77418 23.6908 6.12288C23.6908 6.47158 23.5523 6.806 23.3057 7.05257L16.3593 14.0001L23.3035 20.9465Z" fill="#B0B4C1" />
                                        </svg>
                                    </div>
                                </div>
                            )
                            :
                            (
                                <div className={`maiacare-input-field-container`}>
                                    <InputFieldLabel label="Name" required={true} />
                                    <Form.Control
                                        type="text"
                                        name="patientName"
                                        className="maiacare-input-field w-100"
                                        placeholder="Type patient name"
                                        value={txtPatinetName}

                                        onChange={(e) => {
                                            setTxtPatinetName(e.target.value);
                                            setOpen(true);
                                            // onChange?.(null);
                                            setFormError((prev) => ({ ...prev, patientName: "" }));
                                        }}

                                        onFocus={() => {
                                            if (txtPatinetName.trim().length > 0) setOpen(true);
                                        }}
                                        onBlur={() => setTimeout(() => setOpen(false), 150)}

                                    />
                                    <InputFieldError error={formError.patientName} />

                                    <Dropdown className="custome-patient-dropdown" show={open && filtered.length > 0}>
                                        <Dropdown.Menu className="w-100 mt-1 shadow">
                                            {filtered.map((item) => (
                                                <Dropdown.Item
                                                    key={item.id}
                                                    onClick={() => {
                                                        setOpen(false);

                                                        // update formData using handleChange
                                                        handleChange({
                                                            target: { name: "patientName", value: item },
                                                        } as React.ChangeEvent<HTMLInputElement | any>);
                                                    }}
                                                    className="d-flex align-items-center gap-2"
                                                >
                                                    {item.ProfilePhoto && (
                                                        <Image
                                                            className="show-patient-img"
                                                            src={item.ProfilePhoto.src}
                                                            alt={item.name}
                                                            width={48}
                                                            height={48}
                                                        />
                                                    )}
                                                    <span className="settings-accordion-subtitle">{item.name}</span>
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            )
                        }
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

export function TreatmentSuccessModal({
    successModal,
    setSuccessModal,
    setStep,
    setStepper,
    setMedicalPrescription,
    setShowContent
}: {
    successModal: boolean;
    setSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
    setStep?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setStepper?: React.Dispatch<React.SetStateAction<number | undefined>>;
    setMedicalPrescription?: React.Dispatch<React.SetStateAction<MedicationPrescriptionType[]>>;
    setShowContent?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Modal
            show={successModal}
            onHide={() => {
                setSuccessModal(false);
                setStep?.(1);
                setStepper?.(1);
                setMedicalPrescription?.([]);
                setShowContent?.(true); // show patient content 

            }}
            header=""
            closeButton={true}
        >
            <div className="text-center">
                <Image src={TreatmentSuccessImage} alt="successImg" width={290} height={240} />
                <h3 className="modal-custom-header mt-4">
                    Treatment Added Submitted!
                </h3>
                <p className="modal-custom-content">
                    Manage treatment seamlesly
                </p>
            </div>

            <div className="d-flex justify-content-center gap-3">
                <Button
                    variant="outline"
                    className="w-100"
                    onClick={() => {
                        setSuccessModal(false);
                        setStep?.(1);
                        setStepper?.(1);
                        setMedicalPrescription?.([]);
                        setShowContent?.(true);  // show patient content 
                    }}
                >
                    Okay
                </Button>
                <Button
                    variant="default"
                    className="w-100"
                >
                    View Details
                </Button>
            </div>

        </Modal>
    )
}