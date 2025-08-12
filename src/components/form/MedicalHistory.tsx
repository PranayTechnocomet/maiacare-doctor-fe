import React, { ChangeEvent, FormEvent, useState } from 'react'
import { RadioButtonGroup } from '../ui/RadioField'
import { InputFieldGroup } from '../ui/InputField';
import InputSelect from '../ui/InputSelect';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from '../ui/Button';
import { MdMailOutline } from 'react-icons/md';
import Textarea from '../ui/Textarea';


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
};

type FormError = Partial<Record<keyof FormData, string>>;
const initialFormData: FormData = {
   
    medication: "yes",
    surgeries: "yes",
    surgeriesContent: "",
    medicalCondition: "",
    familyMedicalHistory: "",
    lifestyle: "",
    stress: "low",
    exercise: "never",
    medicationcontent: "",
};

const initialFormError: FormError = {};

export default function MedicalHistory({ setNedicalHistoryFormData, setShowModal }: any) {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormError>(initialFormError);

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};
        if(data.medication === 'yes' && !data.medicationcontent.trim()) errors.medicationcontent = "Medication Content is required";
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
            setNedicalHistoryFormData((prev: any) => [...prev, formData]);
            console.log("formData", formData);

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
                    <Row>
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

                                    className={` `}
                                >

                                </InputFieldGroup>
                            )}

                        </Col>
                        <Col md={12}>
                            <div className='mt-2'>
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

                            </div>
                        </Col>
                        <Col md={12} className='mt-2'>
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
                        <Col md={12} className='mt-2'>
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
                        <Col md={12} className='mt-2'>
                            <label className="form-label">Lifestyle</label>

                            {/* Custom dropdown */}
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

                            {/* Display badges */}
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
                            )}
                        </Col>

                        <Col md={6} className='mt-2'>
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
                        <Col md={6} className='mt-2'>
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


                        <Col md={6} className='mt-2'>
                            <Button className="w-100" variant="outline" disabled={false} onClick={() => setShowModal(false)}>
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
            </div>
        </>
    )
}
