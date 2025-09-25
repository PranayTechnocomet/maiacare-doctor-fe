import React, { ChangeEvent, FormEvent, useState } from 'react'
import { RadioButtonGroup } from '../ui/RadioField'
import { InputFieldGroup } from '../ui/InputField';
import InputSelect from '../ui/InputSelect';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../ui/Button';
import { MdMailOutline } from 'react-icons/md';
import Textarea from '../ui/Textarea';
import toast from 'react-hot-toast';
import { BsInfoCircle } from 'react-icons/bs';

interface MedicalHistoryProps {
    setMedicalHistoryFormData: any;
    setShowModal: any;
    initialData?: any;
    onClose?: () => void;
}

export default function MedicalHistory({ setMedicalHistoryFormData, setShowModal, initialData, onClose }: MedicalHistoryProps) {

    type FormData = {
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

    type FormError = Partial<Record<keyof FormData, string>>;
    const initialFormData: FormData = {
        medication: initialData?.medication || "no",
        surgeries: initialData?.surgeries || "yes",
        surgeriesContent: initialData?.surgeriescontent || "",
        medicalCondition: initialData?.medicalCondition || "",
        familyMedicalHistory: initialData?.familyMedicalHistory || "",
        lifestyle: initialData?.lifestyle || "",
        stress: initialData?.stress || "high",
        exercise: initialData?.exercise || "rarely",
        medicationcontent: initialData?.medicationcontent || "",
        surgeriescontent: initialData?.surgeriescontent || "",
    };

    const initialFormError: FormError = {};

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};
        if (data.medication === 'yes' && !data.medicationcontent.trim()) errors.medicationcontent = "Medication Content is required";
        if (data.surgeries === 'yes' && !data.surgeriescontent.trim()) errors.surgeriescontent = "Surgeries Content is required";

        // if(data.surgeries === 'yes' && !data.surgeriescontent.trim()) errors.surgeriescontent = "Surgeries Content is required";
        // if (!data.medication.trim()) errors.medication = "Medication is required";
        if (!data.surgeries.trim()) errors.surgeries = "Surgeries is required";
        if (!data.medicalCondition.trim()) errors.medicalCondition = "Medical Condition is required";
        // if (!data.lifestyle.trim()) errors.lifestyle = "Lifestyle is required";
        // if (!data.exercise.trim()) errors.exercise = "Exercise is required";
        if (!data.stress.trim()) errors.stress = "Stress Level is required";



        return errors;
    };


    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));

    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        // Validate the formData and return any errors found
        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            setShowModal(false);
            setFormError(initialFormError);
            if (initialData) {
                // If editing, update the existing entry
                setMedicalHistoryFormData((prev: any) =>
                    prev.map((item: any) =>
                        item === initialData ? formData : item
                    )
                );
                toast.success('Medical history edited successfully', {
                    icon: <BsInfoCircle    size={22} color="white" />,  
                });
            } else {
                // If creating new, add to the arrayd
                setMedicalHistoryFormData((prev: any) => [...prev, formData]);
                toast.success('Medical history added successfully', {
                    icon: <BsInfoCircle    size={22} color="white" />,  
                  });
            }
            if (onClose) onClose();
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
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <Row className='g-3'>
                        <Col md={12}>
                            <RadioButtonGroup
                                label="Are you currently taking any medications?"
                                name="medication"
                                value={formData.medication || 'yes'}
                                onChange={(e) => handleChange(e)}
                                required={true}
                                error={formError.medication}
                                options={[
                                    { label: "Yes", value: "yes" },
                                    { label: "No", value: "no" },
                                ]}
                            />

                            {formData.medication === 'yes' && (
                                <InputFieldGroup
                                    type="text"
                                    value={formData.medicationcontent}
                                    name='medicationcontent'
                                    onChange={handleChange}
                                    error={formError.medicationcontent}

                                    placeholder="Enter medication"

                                    className={`mt-2`}
                                >

                                </InputFieldGroup>
                            )}

                        </Col>
                        <Col md={12}>
                            <div className=''>
                                <RadioButtonGroup
                                    label="Have you had any surgeries?"
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
                                        value={formData.surgeriescontent}
                                        name='surgeriescontent'
                                        onChange={handleChange}
                                        error={formError.surgeriescontent}

                                        placeholder="Enter surgeries"

                                        className={`mt-2`}
                                    >

                                    </InputFieldGroup>
                                )}
                            </div>
                        </Col>
                        <Col md={12} className=''>
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
                                className="position-relative "
                            ></InputFieldGroup>
                        </Col>
                        <Col md={12} className=''>
                            <InputFieldGroup
                                label="Family Medical History "
                                name="familyMedicalHistory"
                                value={formData.familyMedicalHistory}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                                placeholder="Enter family medical history"
                                required={false}
                                error={formError.familyMedicalHistory}
                                className="position-relative "
                            ></InputFieldGroup>
                        </Col>
                        {/* Button Section Start */}
                        {/* <Col md={12} className=''>
                            <label className="form-label">Lifestyle</label>

                            
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
                                <div className="">
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
                            )}
                        </Col> */}
                        {/* Button Section End */}
                        <Col md={12}>
                            <InputSelect
                                label="Lifestyle"
                                name="lifestyle"
                                placeholder='Select lifestyle'
                                value={formData.lifestyle}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={true}
                                disabled={false}
                                error={formError.lifestyle}
                                options={[
                                    { id: "1", value: "lifestyle 1", label: "lifestyle 1" },
                                    { id: "2", value: "lifestyle 2", label: "lifestyle 2" },
                                    { id: "3", value: "lifestyle 3", label: "lifestyle 3" },
                                ]}
                            />
                        </Col>

                        <Col lg={6}>
                            <RadioButtonGroup
                                label="How often do you exercise?"
                                name="exercise"
                                value={formData.exercise || 'never'}
                                onChange={(e) => handleChange(e)}
                                required={true}
                                error={formError.exercise}
                                options={[
                                    { label: "Never", value: "never" },
                                    { label: "Rarely", value: "rarely" },
                                    { label: "Regularly", value: "regularly" },
                                ]}
                            />
                        </Col>
                        <Col lg={6} >
                            <RadioButtonGroup
                                label="How would you rate your stress levels?"
                                name="stress"
                                value={formData.stress || 'low'}
                                onChange={(e) => handleChange(e)}
                                required={true}
                                error={formError.stress}
                                options={[
                                    { label: "Low", value: "low" },
                                    { label: "Moderate", value: "moderate" },
                                    { label: "High", value: "high" },
                                ]}
                            />
                        </Col>

                        <div className='d-flex gap-3'>
                            <Button className="w-100" variant="outline" disabled={false} onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button className="w-100" variant="default" disabled={false} type="submit">
                                Save
                            </Button>
                        </div>
                    </Row>
                </form>
            </div>
        </>
    )
}
