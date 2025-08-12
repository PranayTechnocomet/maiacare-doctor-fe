import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import ContentContainer from '../ui/ContentContainer';
import CustomTabs from '../ui/CustomTabs';
import Image from 'next/image';
import Modal from '../ui/Modal';
import { InputFieldGroup } from '../ui/InputField';
import { Accordion, Col, Row } from 'react-bootstrap';
import { RadioButtonGroup } from '../ui/RadioField';
import InputSelect from '../ui/InputSelect';
import { PhoneNumberInput } from '../ui/PhoneNumberInput';
import Button from '../ui/Button';
import Simpleeditpro from '../../assets/images/Simpleeditpro.png';
import cameraicon from '../../assets/images/cameraicon.png';
import { log } from 'console';
// import '../../style/PartnerDetails.css'

export function AddPartnerDetailsForm( {setAddPartner}: {setAddPartner: (value: boolean) => void}) {
    const [key, setKey] = useState<string>('basic');

    const [activeTab, setActiveTab] = useState<string>("basic");



    const tabOptions = [
        {
            key: "basic",
            label: "Basic Details",
            content: (
                <div>
                    <BasicDetailsForm setAddPartner={setAddPartner} setActiveTab={setActiveTab}/>
                </div>
            ),
        },
        {
            key: "medical history",
            label: "Medical History",
            content: (
                <MedicalHistoryForm  setAddPartner={setAddPartner} setActiveTab={setActiveTab}/>
            ),
        },
        {
            key: "physical & fertility assessment",
            label: "Physical & Fertility Assessment",
            content: (
                <PhysicalFertilityAssessmentForm setAddPartner={setAddPartner} />
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
    basic_detail_gender: "male",
    basic_detail_age: "",
    basic_detail_phone: "",
    basic_detail_email: ""

};
const initialFormError: FormError = {};

export function BasicDetailsForm({setAddPartner, setActiveTab}: {setAddPartner: (value: boolean) => void, setActiveTab: (tab: string) => void}) {
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

    const [profileImage, setProfileImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert("File size must be less than 5MB");
                return;
            }
            const reader = new FileReader();
            reader.onload = () => {
                setProfileImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};

        if (!data.basic_detail_name.trim()) errors.basic_detail_name = "Name is required";
        if (!data.basic_detail_age.trim()) errors.basic_detail_age = "Age is required";
        if (!data.basic_detail_phone.trim()) errors.basic_detail_phone = "Phone number is required";

        if (!data.basic_detail_email.trim())
            errors.basic_detail_email = "Email is required";

        return errors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            console.log("patient add successfully ... ", formData);
            setFormError(initialFormError);
            setActiveTab("medical history");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }
    };
    return (
        <>
            
                <form onSubmit={handleSubmit}>
                    <Row className="g-3">
                        <Col md={12}>
                            <div className="d-flex align-items-center gap-4  mt-4 flex-wrap justify-content-center justify-content-sm-start text-center text-md-start">
                                <div className="profile-wrapper position-relative" >
                                    <Image
                                        src={profileImage || Simpleeditpro}
                                        alt="Profile"
                                        className="object-fit-cover rounded-2"
                                        width={100}
                                        height={100}

                                    />
                                    <div
                                        className="camera-icon position-absolute bottom-0 end-0 cursor-pointer"
                                        onClick={handleImageClick}
                                    >
                                        <Image src={cameraicon} alt="Upload" width={48} height={48} />
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg"
                                        ref={fileInputRef}
                                        className="image-formate"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <div>
                                    <div className="accordion-title-detail">Add Profile Picture</div>
                                    <div className="select-profile-subtitle">
                                        Allowed Jpg, png of max size 5MB
                                    </div>
                                </div>
                            </div>

                        </Col>
                        <Col md={12}>

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
                        <Col md={6}>
                            <RadioButtonGroup
                                label="Gender"
                                name="basic_detail_gender"
                                value={formData.basic_detail_gender || ''}
                                // defaultValue="male"
                                onChange={(e) => handleChange(e)}
                                required
                                options={[
                                    { label: "Male", value: "male" },
                                    { label: "Female", value: "female" },
                                ]}
                            />
                        </Col>

                        <Col md={6}>
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


                        <Col md={6}>
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
                                placeholder='(000) 000-0000'
                                required

                                error={formError.basic_detail_phone}
                            />
                        </Col>


                        <Col md={6}>
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
                        <Col md={6} >
                            <Button className="w-100" variant="outline" disabled={false}  onClick={()=>setAddPartner(false)}>
                                Cancel
                            </Button>
                        </Col>
                        <Col md={6} >
                            <Button className="w-100" variant="default" disabled={false} type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </form>
            
        </>
    )
}

type MedicalHistoryFormData = {
    medication: string;
    surgeries: string;
    surgeriesContent: string;
    medicalCondition: string;
    familyMedicalHistory: string;
    lifestyle: string;
    stress: string;
    exercise: string;
    medicationcontent: string;
    surgeriescontent: string;
};

type MedicalHistoryFormError = Partial<Record<keyof MedicalHistoryFormData, string>>;

const initialMedicalHistoryFormData: MedicalHistoryFormData = {
    medication: "yes",
    surgeries: "yes",
    surgeriesContent: "",
    medicalCondition: "",
    familyMedicalHistory: "",
    lifestyle: "",
    stress: "low",
    exercise: "never",
    medicationcontent: "",
    surgeriescontent: "",
};

const MedicalHistoryFormError: MedicalHistoryFormError = {};

export function MedicalHistoryForm({setAddPartner, setActiveTab}: {setAddPartner: (value: boolean) => void, setActiveTab: (tab: string) => void}) {
    const [medicalHistoryFormData, setMedicalHistoryFormData] = useState<MedicalHistoryFormData>(initialMedicalHistoryFormData);
    const [medicalHistoryFormError, setMedicalHistoryFormError] = useState<MedicalHistoryFormError>(MedicalHistoryFormError);

    const validateForm = (data: MedicalHistoryFormData): MedicalHistoryFormError => {
        const errors: MedicalHistoryFormError = {};

        if(data.medication === 'yes' && !data.medicationcontent.trim()) errors.medicationcontent = "Medication Content is required";
        if(data.surgeries === 'yes' && !data.surgeriescontent.trim()) errors.surgeriescontent = "Surgeries Content is required";
        if (!data.medicalCondition.trim()) errors.medicalCondition = "Medical Condition is required";
        if (!data.lifestyle.trim()) errors.lifestyle = "Lifestyle is required";
        // if (!data.medicationcontent.trim()) errors.medicationcontent = "Medication Content is required";
        


        return errors;
    };
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setMedicalHistoryFormData((prev) => ({ ...prev, [name]: value }));
        setMedicalHistoryFormError((prev) => ({ ...prev, [name]: "" }));

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const errors = validateForm(medicalHistoryFormData);
        setMedicalHistoryFormError(errors);

        if (Object.keys(errors).length === 0) {
            // setShowModal(false);
            setMedicalHistoryFormError(medicalHistoryFormError);
            // setNedicalHistoryFormData((prev: any) => [...prev, formData]);
            console.log("formData", medicalHistoryFormData);
            setActiveTab("physical & fertility assessment");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };


    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const options = [
        { value: "1", label: "Non-smoker" },
        { value: "2", label: "Occasional alcohol" },
        { value: "3", label: "Vegetarian diet" },
    ];

    const toggleOption = (value: string) => {
        setSelectedValues(prev =>
            prev.includes(value)
                ? prev.filter(v => v !== value)
                : [...prev, value]
        );
    };

    const removeOption = (value: string) => {
        setSelectedValues(prev => prev.filter(v => v !== value));
    };

    const getSelectedLabels = () => {
        return selectedValues.map(value => {
            const option = options.find(opt => opt.value === value);
            return option ? option.label : value;
        });
    };
    return (
        <>
            <div className='mt-3'>
                <form onSubmit={handleSubmit}>
                    <Row className="g-2">
                        <Col md={12}>
                            <RadioButtonGroup
                                label="Are you currently taking any medications?"
                                name="medication"
                                value={medicalHistoryFormData.medication || 'yes'}
                                onChange={(e) => handleChange(e)}
                                required={true}
                                error={medicalHistoryFormError.medication}
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" },
                                ]}
                            />

                            {medicalHistoryFormData.medication === 'yes' && (
                                <InputFieldGroup
                                    type="text"
                                    value={medicalHistoryFormData.medicationcontent}
                                    name='medicationcontent'
                                    onChange={handleChange}
                                    error={medicalHistoryFormError.medicationcontent}

                                    placeholder="Enter medication"

                                    className={` `}
                                >

                                </InputFieldGroup>
                            )}

                        </Col>
                        <Col md={12}>
                            <div >
                                {/* <RadioButtonGroup
                                    label="Have you had any surgeries?"
                                    name="surgeries"
                                    value={medicalHistoryFormData.surgeries || 'yes'}
                                    onChange={(e) => handleChange(e)}
                                    required={true}
                                    error={medicalHistoryFormError.surgeries}
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                /> */}
                                <RadioButtonGroup
                                    label="Have you had any surgeries?"
                                    name="surgeries"
                                    value={medicalHistoryFormData.surgeries || 'yes'}
                                    onChange={(e) => handleChange(e)}
                                    required={true}
                                    error={medicalHistoryFormError.surgeries}
                                    options={[
                                        { label: "Yes", value: "yes" },
                                        { label: "No", value: "no" },
                                    ]}
                                />

                                {medicalHistoryFormData.surgeries === 'yes' && (
                                    <InputFieldGroup
                                        type="text"
                                        value={medicalHistoryFormData.surgeriescontent}
                                        name='surgeriescontent'
                                        onChange={handleChange}
                                        error={medicalHistoryFormError.surgeriescontent}

                                        placeholder="Enter surgeries"

                                        className={` `}
                                    >

                                    </InputFieldGroup>
                                )}
                            </div>
                        </Col>
                        <Col md={12} >
                            <InputFieldGroup
                                label="Do you have any medical condition? "
                                name="medicalCondition"
                                type="text"
                                value={medicalHistoryFormData.medicalCondition}

                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Search Medical Condition or Allergies"
                                required={true}
                                error={medicalHistoryFormError.medicalCondition}
                                className="position-relative "
                            ></InputFieldGroup>
                        </Col>
                        <Col md={12} >
                            <InputFieldGroup
                                label="Family Medical History "
                                name="familyMedicalHistory"
                                value={medicalHistoryFormData.familyMedicalHistory}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter family medical history"
                                required={false}
                                error={medicalHistoryFormError.familyMedicalHistory}
                                className="position-relative "
                            ></InputFieldGroup>
                        </Col>
                        <Col md={12} >
                            <InputSelect
                                label="Lifestyle"
                                name="lifestyle"
                                value={medicalHistoryFormData.lifestyle}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={medicalHistoryFormError.lifestyle}
                                options={[
                                    { id: "1", value: "1", label: "PCOS" },
                                    { id: "2", value: "2", label: "Thyroid Disorder" },
                                    { id: "3", value: "3", label: "Diabetes" },
                                    { id: "4", value: "4", label: "Obstructive Sleep Apnea" },
                                    { id: "5", value: "5", label: "Chronic Stress" },
                                    { id: "6", value: "6", label: "Chronic Stress" },
                                ]}
                            />
                            {/* <label className="form-label">Lifestyle</label>
                           
                            <div className="dropdown">
                                <button
                                    className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
                                    type="button"
                                    onClick={() => setIsOpen(!isOpen)}
                                    aria-expanded={isOpen}
                                >
                                    {selectedValues.length === 0
                                        ? "Select lifestyle options..."
                                        : ` selected`
                                    }
                                </button>

                                {isOpen && (
                                    <ul className="dropdown-menu show w-100">
                                        {options.map(option => (
                                            <li key={option.value}>
                                                <label className="dropdown-item d-flex align-items-center mb-0">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                        checked={selectedValues.includes(option.value)}
                                                        onChange={() => toggleOption(option.value)}
                                                    />
                                                    {option.label}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            
                            {selectedValues.length > 0 && (
                                <div className="mt-2">
                                    <small className="text-muted mb-1 d-block">
                                        Selected ({selectedValues.length}):
                                    </small>
                                    <div className="d-flex flex-wrap gap-1">
                                        {getSelectedLabels().map((label, index) => (
                                            <span
                                                key={selectedValues[index]}
                                                className="badge bg-success d-flex align-items-center"
                                            >
                                                {label}
                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white ms-2"
                                                    style={{ fontSize: '0.7rem' }}
                                                    onClick={() => removeOption(selectedValues[index])}
                                                />
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )} */}
                        </Col>

                        <Col md={6} >
                            <RadioButtonGroup
                                label="How often do you exercise?"
                                name="exercise"
                                value={medicalHistoryFormData.exercise || 'never'}
                                onChange={(e) => handleChange(e)}
                                required={true}
                                error={medicalHistoryFormError.exercise}
                                options={[
                                    { label: "Never", value: "never" },
                                    { label: "Rarely", value: "rarely" },
                                    { label: "Regularly", value: "regularly" },
                                ]}
                            />
                        </Col>
                        <Col md={6} >
                            <RadioButtonGroup
                                label="How would you rate your stress levels?"
                                name="stress"
                                value={medicalHistoryFormData.stress || 'low'}
                                onChange={(e) => handleChange(e)}
                                required={true}
                                error={medicalHistoryFormError.stress}
                                options={[
                                    { label: "Low", value: "low" },
                                    { label: "Moderate", value: "moderate" },
                                    { label: "High", value: "high" },
                                ]}
                            />
                        </Col>


                        <Col md={6} >
                            <Button className="w-100" variant="outline" disabled={false} onClick={()=>setAddPartner(false)}>
                                Cancel
                            </Button>
                        </Col>
                        <Col md={6} >
                            <Button className="w-100" variant="default" disabled={false} type="submit">
                                Save
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
        </>
    )
}


type PhysicalFertilityAssessmentFormData = {
    semenAnalysis: string;
    semenAnalysisContent: string;
    fertilityIssues: string;
    fertilityIssuesContent: string;
    fertilityTreatment: string;
    fertilityTreatmentContent: string;
    surgeries: string;
    surgeriesContent: string;
    height: string;
    weight: string;
    bmi: string;
    bloodGroup: string;
    systolic: string;
    diastolic: string;
    heartRate: string;
};

type PhysicalFertilityAssessmentFormError = Partial<Record<keyof PhysicalFertilityAssessmentFormData, string>>;
const initialPhysicalFertilityAssessmentFormData: PhysicalFertilityAssessmentFormData = {

    semenAnalysis: "yes",
    semenAnalysisContent: "",
    fertilityIssues: "no",
    fertilityIssuesContent: "",
    fertilityTreatment: "no",
    fertilityTreatmentContent: "",
    surgeries: "no",
    surgeriesContent: "",
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
};
const initialPhysicalFertilityAssessmentFormError: PhysicalFertilityAssessmentFormError = {};

export function PhysicalFertilityAssessmentForm({setAddPartner}: {setAddPartner: (value: boolean) => void}) {

    const [formData, setFormData] = useState<PhysicalFertilityAssessmentFormData>(initialPhysicalFertilityAssessmentFormData);
    const [formError, setFormError] = useState<PhysicalFertilityAssessmentFormError>(initialPhysicalFertilityAssessmentFormError);

    const validateForm = (data: PhysicalFertilityAssessmentFormData): PhysicalFertilityAssessmentFormError => {
        const errors: PhysicalFertilityAssessmentFormError = {};

        if (!data.semenAnalysis.trim()) errors.semenAnalysis = "Seminal Analysis is required";
        if(data.semenAnalysis === 'yes' && !data.semenAnalysisContent.trim()) errors.semenAnalysisContent = "Seminal Analysis Content is required";
        if (!data.fertilityIssues.trim()) errors.fertilityIssues = "Fertility Issues is required";
        if(data.fertilityIssues === 'yes' && !data.fertilityIssuesContent.trim()) errors.fertilityIssuesContent = "Fertility Issues Content is required";
        if (!data.fertilityTreatment.trim()) errors.fertilityTreatment = "Fertility Treatment is required";
        if(data.fertilityTreatment === 'yes' && !data.fertilityTreatmentContent.trim()) errors.fertilityTreatmentContent = "Fertility Treatment Content is required";
        if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";
        if(data.surgeries === 'yes' && !data.surgeriesContent.trim()) errors.surgeriesContent = "Surgeries Content is required";

        if (!data.height.trim()) errors.height = "Height is required";
        if (!data.weight.trim()) errors.weight = "Weight is required";
        if (!data.bmi.trim()) errors.bmi = "BMI is required";
        if (!data.bloodGroup.trim()) errors.bloodGroup = "Blood group is required";
        if (!data.systolic.trim()) errors.systolic = "Systolic is required";
        // if (!data.diastolic.trim()) errors.diastolic = "Diastolic is required";
        if (!data.heartRate.trim()) errors.heartRate = "Heart rate is required";
        return errors;
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormError(errors);

        if (Object.keys(errors).length === 0) {
            console.log("Form submitted successfully", formData);
            // Handle form submission
            setAddPartner(false);
        }
    };
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));

    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="fertilitiy-assement-accodion-item mb-3 mt-3">
                        <Accordion.Header>
                            <div className="fertilitiy-assement-accodion-title">
                                Physical Assessment
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>
                            <Row className="g-4">
                                <Col md={6}>

                                    <InputFieldGroup
                                        label="Height"
                                        name="height"
                                        type="text"
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
                                        type="text"
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
                                        type="text"
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
                                            { id: "1", value: "1", label: "A+" },
                                            { id: "2", value: "2", label: "A-" },
                                            { id: "3", value: "3", label: "B+" },
                                            { id: "4", value: "4", label: "B-" },
                                            { id: "5", value: "5", label: "AB+" },
                                            { id: "6", value: "6", label: "AB-" },
                                            { id: "7", value: "7", label: "O+" },
                                            { id: "8", value: "8", label: "O-" },
                                        ]}
                                    />

                                </Col>

                                <Col md={5}>
                                    <InputFieldGroup
                                        label="Blood Pressure"
                                        name="systolic"
                                        type="text"
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

                                <Col md={1} className="d-flex justify-content-center align-items-end ">
                                    <span className="fs-1">/</span>
                                </Col>

                                <Col md={5}>
                                    <InputFieldGroup
                                        label="" // No label here to match the design
                                        name="diastolic"
                                        type="text"
                                        className="setting-password-input"
                                        placeholder="Diastolic(mmHg)"
                                        required={false}
                                        disabled={false}
                                        readOnly={false}
                                        value={formData.diastolic}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            handleChange(e);

                                        }}
                                    //    error={formError.diastolic}
                                    />
                                </Col>

                                <Col md={12}>

                                    <InputFieldGroup
                                        label="Heart Rate"
                                        name="heartRate"
                                        type="text"
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
                                {/* <Col md={6}>

                                    <Button className="w-100" variant="outline" disabled={false} >
                                        Cancel
                                    </Button>
                                </Col>
                                <Col md={6}>
                                    <Button className="w-100" variant="default" disabled={false} type="submit">
                                        save
                                    </Button>
                                </Col> */}
                            </Row>
                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1" className="fertilitiy-assement-accodion-item mb-3">
                        <Accordion.Header>
                            <div className="fertilitiy-assement-accodion-title">
                                Fertility Assessment
                            </div>
                        </Accordion.Header>
                        <Accordion.Body>


                            <>

                                <Row className='g-2'>
                                    <Col md={12} >
                                        <RadioButtonGroup
                                            label="Have you ever had a semen analysis?"
                                            name="semenAnalysis"
                                            value={formData.semenAnalysis || 'yes'}
                                            onChange={(e) => handleChange(e)}
                                            required={true}
                                            error={formError.semenAnalysis}
                                            options={[
                                                { label: "Yes", value: "yes" },
                                                { label: "No", value: "no" },
                                            ]}
                                        />

                                        {formData.semenAnalysis === 'yes' && (
                                            <InputFieldGroup
                                                type="text"
                                                value={formData.semenAnalysisContent}
                                                name='semenAnalysisContent'
                                                onChange={handleChange}
                                                error={formError.semenAnalysisContent}

                                                placeholder="If yes, provide details if available"

                                                className={` `}
                                            >

                                            </InputFieldGroup>
                                        )}

                                    </Col>
                                    <Col md={12} >
                                        <RadioButtonGroup
                                            label="Have you experienced any fertility issues?"
                                            name="fertilityIssues"
                                            value={formData.fertilityIssues || 'yes'}
                                            onChange={(e) => handleChange(e)}
                                            required={true}
                                            error={formError.fertilityIssues}
                                            options={[
                                                { label: "Yes", value: "yes" },
                                                { label: "No", value: "no" },
                                            ]}
                                        />

                                        {formData.fertilityIssues === 'yes' && (
                                            <InputFieldGroup
                                                type="text"
                                                value={formData.fertilityIssuesContent}
                                                name='fertilityIssuesContent'
                                                onChange={handleChange}
                                                error={formError.semenAnalysisContent}

                                                placeholder="If yes, provide details if available"

                                                className={` `}
                                            >

                                            </InputFieldGroup>
                                        )}

                                    </Col>
                                    <Col md={12} >
                                        <RadioButtonGroup
                                            label="Have you previously undergone fertility treatments?"
                                            name="fertilityTreatment"
                                            value={formData.fertilityTreatment || 'yes'}
                                            onChange={(e) => handleChange(e)}
                                            required={true}
                                            error={formError.fertilityTreatment}
                                            options={[
                                                { label: "Yes", value: "yes" },
                                                { label: "No", value: "no" },
                                            ]}
                                        />

                                        {formData.fertilityTreatment === 'yes' && (
                                            <InputFieldGroup
                                                type="text"
                                                value={formData.fertilityTreatmentContent}
                                                name='fertilityTreatmentContent'
                                                onChange={handleChange}
                                                error={formError.fertilityTreatmentContent}

                                                placeholder="If yes, provide details if available"

                                                className={` `}
                                            >

                                            </InputFieldGroup>
                                        )}

                                    </Col>
                                    <Col md={12} >
                                        <RadioButtonGroup
                                            label="Any history of surgeries?"
                                            name="surgeries"
                                            value={formData.surgeries || 'yes'}
                                            onChange={(e) => handleChange(e)}
                                            required={true}
                                            error={formError.surgeries}
                                            options={[
                                                { label: "Yes", value: "yes" },
                                                { label: "No", value: "no" },
                                            ]}
                                        />

                                        {formData.surgeries === 'yes' && (
                                            <InputFieldGroup
                                                type="text"
                                                value={formData.surgeriesContent}
                                                name='surgeriesContent'
                                                onChange={handleChange}
                                                error={formError.surgeriesContent}

                                                placeholder="If yes, provide details if available"

                                                className={` `}
                                            >

                                            </InputFieldGroup>
                                        )}

                                    </Col>


                                </Row>
                            </>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Row className='g-2'>
                    <Col md={6}  >
                        <Button className="w-100" variant="outline" disabled={false} onClick={()=>setAddPartner(false)}>
                            Cancel
                        </Button>
                    </Col>
                    <Col md={6} >
                        <Button className="w-100" variant="default" disabled={false} type="submit">
                            Save
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    )
}
