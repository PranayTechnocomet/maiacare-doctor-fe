"use client"

import { Col, Form, Row } from "react-bootstrap"
import ContentContainer from "../ui/ContentContainer"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { InputFieldGroup } from "../ui/InputField";
import { PhoneNumberInput } from "../ui/PhoneNumberInput";
import { TimePickerFieldGroup } from "../ui/CustomTimePicker";
import Button from "../ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Modal from "../ui/Modal";
import Image from "next/image";
import Simpleeditpro from "@/assets/images/Simpleeditpro1.png";
import cameraicon from "../../assets/images/Cameraicon1.png";
import LightTrush from "../../assets/images/LightTrush1.png";
import ImageSquare from "../../assets/images/ImageSquare1.png";
import Camera from "../../assets/images/Camera1.png";

export default function ClinicDetailsForm() {

    type FormData = {
        clinicName: string;
        contactNumber: string;
        emailId: string;
        address: string;
        mapLink: string;
        pincode: string;
        city: string;
        state: string;

        MF: string;
        SS: string;
        Time: string;
        Timer: string;

        nameDatails: string;
        contactNumberDatails: string;
        emailIdDetails: string;
        aadharCardNumber: string,
    };

    type FormError = Partial<Record<keyof FormData, string>>;

    const initialFormData: FormData = {
        clinicName: "",
        contactNumber: "",
        emailId: "",
        address: "",
        mapLink: "",
        pincode: "",
        city: "",
        state: "",

        MF: "",
        SS: "",
        Time: "",
        Timer: "",

        nameDatails: "",
        contactNumberDatails: "",
        emailIdDetails: "",
        aadharCardNumber: "",

    };
    const initialFormError: FormError = {};

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));

        // console.log("formData : ", formData);
    };

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const fileInputRef = useRef<HTMLInputElement>(null);  // file input programmatically open 
    const cameraInputRef = useRef<HTMLInputElement>(null); // camera image select 
    const [previewImage, setPreviewImage] = useState<string | null>(null);  //previewImage 
    const [selectedImage, setSelectedImage] = useState<string | null>(null);//selectedImage 

    const handleOpenModal = () => {
        setPreviewImage(selectedImage || Simpleeditpro.src); // show image in modal
        setShowModal(true);
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();   //Edit btn click in file chhose
    };

    const openCamera = () => {
        cameraInputRef.current?.click();
    };

    // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   const selectedFile = event.target.files?.[0]; //previewImage chnages
    //   if (selectedFile) {
    //     const imageURL = URL.createObjectURL(selectedFile);
    //     setPreviewImage(imageURL);
    //   }
    // };


    //  modal open and seletc image jpg/png image allow 

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        // ✅ 1. Only allow JPG and PNG
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(selectedFile.type)) {
            setErrorMessage("Only JPG and PNG images are allowed.");
            event.target.value = ""; // reset input
            return;
        }

        // ✅ 2. Max size 5MB check
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (selectedFile.size > maxSize) {
            setErrorMessage("File size must be less than 5MB.");
            event.target.value = ""; // reset input
            return;
        }

        // ✅ 3. If valid → set preview & clear error
        const imageURL = URL.createObjectURL(selectedFile);
        setPreviewImage(imageURL);
        setErrorMessage(""); // clear previous error
    };


    // camera image select 
    const handleFileCamera = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Allowed image types
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

            if (!allowedTypes.includes(file.type)) {
                setErrorMessage("Only JPG and PNG images are allowed.");
                setPreviewImage(null);
                event.target.value = ""; // Reset input
                return;
            }

            setErrorMessage(""); // clear error if valid
            const imageURL = URL.createObjectURL(file);
            setPreviewImage(imageURL); // show preview
        }
    };



    const handleSave = () => {
        setSelectedImage(previewImage); // save modal preview to actual profile
        setShowModal(false);

    };



    const handleDelete = () => {
        setPreviewImage(null); // delete only in modal
    };
    //modal  image delete click in save btn click image set.
    useEffect(() => {
        if (showModal) {
            setPreviewImage(selectedImage);
        }
    }, [showModal]);

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};

        // --- Basic Info ---
        if (!data.clinicName.trim()) errors.clinicName = "Clinic Name is required";

        if (!data.contactNumber.trim()) {
            errors.contactNumber = "Contact Number is required";
        } else if (!/^[6-9]\d{9}$/.test(data.contactNumber)) {
            errors.contactNumber = "Enter a valid 10-digit mobile number";
        }

        if (!data.emailId.trim()) {
            errors.emailId = "Email ID is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId)) {
            errors.emailId = "Enter a valid email address";
        }

        if (!data.address.trim()) errors.address = "Address is required";
        if (!data.mapLink.trim()) errors.mapLink = "Map Link is required";

        if (!data.pincode.trim()) {
            errors.pincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(data.pincode)) {
            errors.pincode = "Enter a valid 6-digit pincode";
        }

        if (!data.city.trim()) errors.city = "City is required";
        if (!data.state.trim()) errors.state = "State is required";

        // --- Clinic Settings ---
        if (!data.MF.trim()) errors.MF = "MF is required";

        if (!data.SS.trim()) errors.SS = "SS is required";

        if (!data.Time.trim()) errors.Time = "Time is required";

        if (!data.Timer.trim()) errors.Timer = "Timer is required";

        // --- Owner/Doctor Details ---
        if (!data.nameDatails.trim()) errors.nameDatails = "Name Details are required";

        if (!data.contactNumberDatails.trim()) {
            errors.contactNumberDatails = "Contact Number (Details) is required";
        } else if (!/^[6-9]\d{9}$/.test(data.contactNumberDatails)) {
            errors.contactNumberDatails = "Enter a valid 10-digit mobile number";
        }

        if (!data.emailIdDetails.trim()) {
            errors.emailIdDetails = "Email ID (Details) is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailIdDetails)) {
            errors.emailIdDetails = "Enter a valid email address";
        }

        if (!data.aadharCardNumber.trim()) {
            errors.aadharCardNumber = "Aadhar Card Number is required";
        } else if (!/^\d{12}$/.test(data.aadharCardNumber)) {
            errors.aadharCardNumber = "Enter a valid 12-digit Aadhar number";
        }

        return errors;
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            setShowModal(true);
            setFormError(initialFormError);
        }


        setFormData(initialFormData);

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ContentContainer>
                    <Row className="g-3">
                        <Col md={12}>
                            <h5 className="profile-card-main-titile">Personal Details</h5>
                            <div className="d-flex align-items-center gap-4 mt-3 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
                                <div className="profile-wrapper">
                                    {/* Profile image */}
                                    <Image
                                        src={selectedImage ? selectedImage : Simpleeditpro}
                                        alt="Profile"
                                        className="profile-image rounded-circle"
                                        width={160}
                                        height={160}

                                    />
                                    {/* Camera Icon */}
                                    <div
                                        className="camera-icon"
                                        // onClick={() => setShowModal(true)}  onClick={handleOpenModal} style={{ cursor: "pointer" }}
                                        onClick={handleOpenModal}

                                    >
                                        <Image
                                            src={cameraicon}
                                            alt="Upload"
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                </div>

                                {/* Edit Profile click in Modal */}

                                <Modal
                                    show={showModal}
                                    onHide={() => {
                                        setShowModal(false);
                                        setErrorMessage(""); //🔹Reset error msg on modal close
                                    }}
                                    size="md"
                                    header="Profile Photo"
                                    closeButton={true}
                                    className="text-pink"
                                    dialogClassName="custom-modal-width"
                                >

                                    <div className="d-flex flex-column align-items-center" >
                                        <div
                                            className="rounded overflow-hidden mb-3 mx-auto position-relative edit-basic-details-modal">

                                            {/* Defult Profile Image */}
                                            <Image
                                                src={previewImage ? previewImage : Simpleeditpro}
                                                alt="Simpleeditpro"
                                                width={160}
                                                height={160}
                                                className="edit-basic-details-image "
                                            />

                                        </div>
                                        {errorMessage && (   // error msg only jpg/png image allow
                                            <div className="text-danger mb-2 edit-basic-details-error-font">
                                                {errorMessage}
                                            </div>
                                        )}

                                        <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                                            <div className="d-flex gap-3 align-items-center flex-wrap">

                                                {/* Edit button  */}

                                                {/* <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                                                      <Image src={EditProfile} alt="Edit" width={18} height={18} />
                                                      <div className="kyc-details">Edit</div>
                                                      <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                      />
                                                    </div> */}

                                                <div className="text-center edit-basic-details-edit-button" onClick={handleEditClick}>
                                                    <Image src={ImageSquare} alt="Add Photo" width={21} height={21} />
                                                    <div className="small">Add Photo</div>

                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        className="edit-basic-details-edit-input"
                                                    />
                                                </div>

                                                <div className="text-center edit-basic-camera-icon" >
                                                    {/* Camera button */}
                                                    <Image src={Camera} alt="Take Photo" width={21} height={21} onClick={openCamera} />
                                                    <div className="small">Take Photo</div>

                                                    {/* Hidden input for camera */}
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        capture="user" // front camera
                                                        ref={cameraInputRef}
                                                        className="edit-basic-details-edit-input"
                                                        onChange={handleFileCamera}
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex gap-3 mt-md-0 align-items-center">
                                                <button className="btn p-0" onClick={handleDelete}>
                                                    <Image src={LightTrush} alt="Trash" width={21} height={21} />
                                                    <div className="maiacare-input-field-helper-text">Delete</div>
                                                </button>

                                                <Button variant="default" className="btn px-4 py-2" onClick={handleSave}>
                                                    Save
                                                </Button>
                                            </div>
                                        </div>


                                    </div>
                                </Modal>


                                <div>
                                    <div className="fw-semibold">Add Clinic Logo</div>
                                    <div className="text-muted small">
                                        Allowed Jpg, png of max size 5MB
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col md={12}>
                            <InputFieldGroup
                                label="Clinic Name"
                                name="clinicName"
                                type="text"
                                value={formData.clinicName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Clinic Name"
                                required={false}
                                disabled={false}
                                readOnly={false}
                                error={formError.clinicName}
                            />
                        </Col>
                        <Col md={6}>
                            <PhoneNumberInput
                                label="Contact Number"
                                value={formData.contactNumber}
                                onChange={(phone: any) => {
                                    // setFormData((prev) => ({ ...prev, phone }));
                                    // setFormError((prev) => ({ ...prev, phone: "" }));
                                    handleChange({
                                        target: { name: "contactNumber", value: phone },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                placeholder="1212"
                                required
                                error={formError.contactNumber}
                            />
                        </Col>

                        <Col md={6}>
                            <InputFieldGroup
                                label="Email ID "
                                name="emailId"
                                type="email"
                                value={formData.emailId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Email ID"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.emailId}
                            />
                        </Col>

                        <Col md={12}>
                            <InputFieldGroup
                                label="Address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Address"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.address}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Map Link"
                                name="mapLink"
                                type="text"
                                value={formData.mapLink}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Map Link"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.mapLink}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Pincode"
                                name="pincode"
                                type="text"
                                value={formData.pincode}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Pincode"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.pincode}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="City"
                                name="city"
                                type="text"
                                value={formData.city}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="City"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.city}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="State"
                                name="state"
                                type="text"
                                value={formData.state}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="State"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.state}
                            />
                        </Col>

                    </Row>

                </ContentContainer>

                <ContentContainer className="mt-4">
                    <div className="d-flex flex-column flex-md-row justify-content-md-between  text-md-start mb-3">
                        <h5 className="profile-card-main-titile mb-2 mb-md-0">
                            Operational hours & Days
                        </h5>
                        <Form.Check
                            type="checkbox"
                            label="Select custom Hours and Days?"
                            className="text-nowrap check-box input"
                        />
                    </div>

                    <Row className="mb-3  ">
                        <Col md={6} className="edit-basic-detail-timepicker">
                            <TimePickerFieldGroup
                                label="Monday-Friday"
                                name="MF"
                                placeholder="Select Time"
                                value={formData.MF}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                            />
                        </Col>

                        <Col md={6} className="mt-2 edit-basic-detail-timepicker">
                            <TimePickerFieldGroup
                                name="Time"
                                placeholder="Select Time"
                                value={formData.Time}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3 edit-basic-detail-timepicker">
                        <Col md={6} className="edit-basic-detailsat-sun">
                            <TimePickerFieldGroup
                                label="Saturday-Sunday"
                                name="SS"
                                placeholder="Select Time"
                                value={formData.SS}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                            />
                        </Col>

                        <Col md={6} className="mt-2 edit-basic-detail-timepicker">
                            <TimePickerFieldGroup
                                name="Timer"
                                placeholder="Select Time"
                                value={formData.Timer}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                            />
                        </Col>
                    </Row>
                </ContentContainer>

                <ContentContainer className="mt-4">
                    <h5 className="profile-card-main-titile mb-3 ">
                        Contact Person Details
                    </h5>
                    <Row className="g-3">
                        <Col md={6}>
                            <InputFieldGroup
                                label="Name"
                                name="nameDatails"
                                type="text"
                                value={formData.nameDatails}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Name"
                                required={false}
                                disabled={false}
                                readOnly={false}
                                error={formError.nameDatails}
                            />
                        </Col>
                        <Col md={6}>
                            <PhoneNumberInput
                                label="Contact Number"
                                value={formData.contactNumberDatails}
                                onChange={(phone: any) => {
                                    // setFormData((prev) => ({ ...prev, phone }));
                                    // setFormError((prev) => ({ ...prev, phone: "" }));
                                    handleChange({
                                        target: { name: "contactNumberDatails", value: phone },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                placeholder="1212"
                                required
                                error={formError.contactNumberDatails}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Email ID "
                                name="emailIdDetails"
                                type="email"
                                value={formData.emailIdDetails}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Email ID"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.emailIdDetails}
                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Aadhar Card Number"
                                name="aadharCardNumber"
                                type="text"
                                value={formData.aadharCardNumber}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Aadhar Card Number"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.aadharCardNumber}
                            />
                        </Col>

                    </Row>
                </ContentContainer>

                <div className="d-flex justify-content-end gap-3 mt-4">
                    {/* Previous Button */}
                    <Button
                        variant="outline"

                    >
                        <ArrowLeft size={16} className="me-2" />
                        Previous
                    </Button>

                    <Button
                        variant="default"
                        className="maiacare-button"
                        type="submit"
                    >
                        Next <ArrowRight size={16} />
                    </Button>

                </div>
            </form>
        </>
    )
}