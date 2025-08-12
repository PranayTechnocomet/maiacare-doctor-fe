"use client"

import { Col, Row } from "react-bootstrap"
import ContentContainer from "../ui/ContentContainer"
import Image from "next/image"
import Modal from "../ui/Modal"
import Simpleeditpro from '../../assets/images/Simpleeditpro.png'
import cameraicon from '../../assets/images/cameraicon.png'
import LightEditimg from '../../assets/images/PencilSimpleLine.png'
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import Camera from '../../assets/images/Camera.png'
import Trash from '../../assets/images/Trash.png'
import ImageSquare from '../../assets/images/ImageSquare.png'
import Button from "../ui/Button"
import { InputFieldGroup } from "../ui/InputField"
import { RadioButtonGroup } from "../ui/RadioField"
import { DatePickerFieldGroup } from "../ui/CustomDatePicker"
import InputSelect from "../ui/InputSelect"
import { PhoneNumberInput } from "../ui/PhoneNumberInput"
import { AddPatientFormData } from "@/utils/types/interfaces"
import dummyPatientImg from '../../assets/images/dummy-patient-sucess.png'


type FormError = Partial<Record<keyof AddPatientFormData, string>>;

const initialFormData: AddPatientFormData = {


    name: "",
    patientId: "",
    gender: "male", // default to male if you want
    date: "",
    age: "",
    phone: "",
    email: "",
    address: "",
    pincode: "",
    city: "",
    state: "",

    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelation: "",
};

const initialFormError: FormError = {};

function AddPatientForm() {

    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [formData, setFormData] = useState<AddPatientFormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);

    // Handle form field change
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    //********* EDIT PROFILE MODAL *********//
    const fileInputRef = useRef<HTMLInputElement>(null);  // file input programmatically open 

    const [previewImage, setPreviewImage] = useState<string | null>(null);  //previewImage 
    const [selectedImage, setSelectedImage] = useState<string | null>(null);//selectedImage 

    const handleOpenModal = () => {
        setPreviewImage(selectedImage || Simpleeditpro.src); // show image in modal
        setShowModal(true);
    };

    const handleEditClick = () => {
        fileInputRef.current?.click();   //Edit btn click in file chhose
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]; //previewImage chnages
        if (selectedFile) {
            const imageURL = URL.createObjectURL(selectedFile);
            setPreviewImage(imageURL);
        }
    };

    const handleSave = () => {
        if (previewImage) {
            setSelectedImage(previewImage); // ✅ set image in parent
        }
        setShowModal(false); // Close modal
    };

    const handleDelete = () => {
        setSelectedImage(null); // remove selected image
        setPreviewImage(Simpleeditpro.src); // reset to default image in modal
    };

    const validateForm = (data: AddPatientFormData): FormError => {
        const errors: FormError = {};

        // if(!previewImage){
        //     errors.previewImage = "Profile image is required";
        // }

        if (!data.name.trim()) errors.name = "Name is required";
        if (!data.patientId.trim()) errors.patientId = "Patient ID is required";
        if (!data.date) errors.date = "Date of birth is required";

        if (!data.phone.trim()) {
            errors.phone = "Phone number is required";
        }

        if (!data.email.trim())
            errors.email = "Email is required";

        if (!data.address.trim())
            errors.address = "Address is required";

        if (!data.city.trim()) errors.city = "City is required";
        if (!data.state.trim()) errors.state = "State is required";
        if (!data.pincode.trim()) errors.pincode = "Pincode is required";

        if (!data.emergencyContactName.trim()) errors.emergencyContactName = "Emergency Contact Name is required";
        if (!data.emergencyContactPhone.trim()) errors.emergencyContactPhone = "Emergency Contact Phone is required";
        if (!data.emergencyContactRelation.trim()) errors.emergencyContactRelation = "Emergency Contact Relation is required";

        return errors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            setShowSuccessModal(true)
            console.log("patient add sucessfully ... ", formData);
            setFormError(initialFormError);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ContentContainer>

                    <h3 className="add-patient-form-title">Personal Details</h3>
                    <Row className="mt-1 g-3" >
                        <Col md={12} sm={12}>

                            <div className="d-flex align-items-center gap-4 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
                                <div className="profile-wrapper position-relative">
                                    {/* Profile image */}
                                    <Image
                                        src={selectedImage ? selectedImage : Simpleeditpro}
                                        alt="Profile"
                                        className="patient-profile-image"
                                        width={100}
                                        height={100}
                                    />
                                    {/* Camera Icon */}
                                    <div
                                        className="camera-icon position-absolute"
                                        onClick={handleOpenModal}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <Image
                                            src={cameraicon}
                                            alt="Upload"
                                            width={48}
                                            height={48}
                                        />
                                    </div>
                                </div>

                                {/* Edit Profile click in Modal */}
                                <Modal
                                    show={showModal}
                                    onHide={() => setShowModal(false)}
                                    header="Profile Photo"
                                    closeButton={true}
                                    className="text-pink"
                                    dialogClassName="custom-modal-width"
                                >
                                    <div className="d-flex flex-column align-items-center p-4">
                                        <div
                                            className="rounded overflow-hidden mb-2 mx-auto position-relative"
                                            style={{ width: 160, height: 160, borderRadius: "16px" }}>

                                            {/* Defult Profile Image */}
                                            <Image
                                                src={previewImage ? previewImage : Simpleeditpro}
                                                alt="Simpleeditpro"
                                                width={160}
                                                height={160}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>

                                        <div className="w-100 border-top pt-3 d-flex justify-content-between align-items-center flex-wrap">
                                            <div className="d-flex gap-4 align-items-center flex-wrap">
                                                <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                                                    <Image src={LightEditimg} alt="Edit" width={28} height={28} />
                                                    <div className="small">Edit</div>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>

                                                <div className="text-center" style={{ cursor: 'pointer' }} onClick={handleEditClick}>
                                                    <Image src={ImageSquare} alt="Add Photo" width={28} height={28} />
                                                    <div className="small">Add Photo</div>

                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        ref={fileInputRef}
                                                        onChange={handleFileChange}
                                                        style={{ display: 'none' }}
                                                    />
                                                </div>

                                                <div className="text-center">
                                                    <Image src={Camera} alt="Take Photo" width={28} height={28} />
                                                    <div className="small">Take Photo</div>
                                                </div>
                                            </div>

                                            <div className="d-flex gap-3 mt-md-0 align-items-center">

                                                <button className="btn p-0" onClick={handleDelete}>
                                                    <Image src={Trash} alt="Trash" width={28} height={28} />
                                                    <div className="small">Delete</div>
                                                </button>

                                                <Button variant="default" disabled={false} contentSize="large" onClick={handleSave} >
                                                    save
                                                </Button>

                                            </div>
                                        </div>
                                    </div>
                                </Modal>


                                <div>
                                    <div className="fw-semibold">Add Profile Picture</div>
                                    <div className="text-muted small">
                                        Allowed Jpg, png of max size 5MB
                                    </div>
                                </div>



                            </div>

                        </Col>
                        <Col md={12} sm={12}>
                            <InputFieldGroup
                                label="Name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Name"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.name}

                            />
                        </Col>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Patient ID"
                                name="patientId"
                                type="text"
                                value={formData.patientId}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter patientId"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.patientId}

                            />
                        </Col>
                        <Col md={6}>
                            <RadioButtonGroup
                                label="Gender"
                                name="gender"
                                value={formData.gender || ""}
                                defaultValue="Male"
                                onChange={(e) => handleChange(e)}
                                required
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                ]}
                            />
                        </Col>

                        <Col md={6}>
                            <DatePickerFieldGroup
                                label="Select Date"
                                name="date"
                                value={formData.date}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.date}

                            />
                        </Col>
                        <Col md={6}>
                            <InputSelect
                                label="Age"
                                name="age"
                                value={formData.age}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.age}
                                placeholder="Select Age"
                                options={[
                                    { id: "1", value: "1", label: "1" },
                                    { id: "2", value: "2", label: "2" },
                                    { id: "3", value: "3", label: "3" },
                                ]}
                            />
                        </Col>

                        <Col md={6}>
                            <PhoneNumberInput
                                label="Contact Number"
                                name="phone"
                                value={formData.phone}
                                onChange={(phone: any) => {
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
                                label="Email ID"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Email ID"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.email}

                            />
                        </Col>

                        <Col md={6}>
                            <InputFieldGroup
                                label="Address"
                                name="address"
                                type="text"
                                value={formData.address}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Address"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.address}

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
                                placeholder="Enter Pincode"
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
                                placeholder="Enter City"
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
                                placeholder="Enter State"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.state}

                            />
                        </Col>

                    </Row>

                </ContentContainer>

                <ContentContainer className="mt-3">

                    <Row className="g-3">
                        <h3 className="add-patient-form-title">Emergency Contact Details</h3>
                        <Col md={6}>
                            <InputFieldGroup
                                label="Name"
                                name="emergencyContactName"
                                type="text"
                                value={formData.emergencyContactName}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter Name"
                                required={true}
                                disabled={false}
                                readOnly={false}
                                error={formError.emergencyContactName}

                            />

                        </Col>
                        <Col md={6}>
                            <PhoneNumberInput
                                label="Contact Number"
                                value={formData.emergencyContactPhone}
                                onChange={(phone: any) => {
                                    handleChange({
                                        target: { name: "emergencyContactPhone", value: phone },
                                    } as React.ChangeEvent<HTMLInputElement>);
                                }}
                                placeholder="1212"
                                required
                                error={formError.emergencyContactPhone}
                            />

                        </Col>
                        <Col md={6}>
                            <InputSelect
                                label="Relation"
                                name="emergencyContactRelation"
                                value={formData.emergencyContactRelation}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.emergencyContactRelation}
                                placeholder="Select Relation"
                                options={[
                                    { id: "1", value: "1", label: "Father" },
                                    { id: "2", value: "2", label: "Mother" },
                                    { id: "3", value: "3", label: "Brother" },
                                ]}
                            />
                        </Col>
                    </Row>
                </ContentContainer>

                <div className="d-flex justify-content-end gap-3 my-4">

                    <Button variant="default" disabled={false} type="submit">
                        Add Patient
                    </Button>

                    {/* <Button variant="outline" disabled={false} onClick={() => setShowSuccessModal(true)}>
                        sucess Msg
                    </Button> */}

                    <Modal

                        show={showSuccessModal}
                        onHide={() => setShowSuccessModal(false)}
                        closeButton={true}
                    >
                        <div className="text-center">

                            <Image src={dummyPatientImg} alt="dummyPatientImg" width={200} height={200} />
                            <h3 className="modal-custom-header mt-2">Form Submitted Successfully</h3>
                            <p className="modal-custom-content">You can now view their profile & manage
                                consultations seamlessly.</p>
                        </div>

                        <div className="d-flex justify-content-center gap-3">
                            <Button variant="outline" disabled={false} className="w-100" >
                                Okay
                            </Button>
                            <Button variant="default" disabled={false} className="w-100" >
                                View Details
                            </Button>
                        </div>
                    </Modal>
                </div>

            </form>

        </>
    )
}

export default AddPatientForm
