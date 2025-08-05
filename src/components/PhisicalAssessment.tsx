"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { InputFieldGroup } from "@/components/ui/InputField";
import { Col, Row } from "react-bootstrap";
import InputSelect from "@/components/ui/InputSelect";
import PhisicalAssessmentForm from "./form/PhisicalAssessmentForm";

// Types for form data and form error
type FormData = {
    height: string;
    weight: string;
    bmi: string;
    bloodGroup: string
    systolic: string;
    diastolic: string;
    heartRate: string;
};
type FormError = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
    height: "",
    weight: "",
    bmi: "",
    bloodGroup: "",
    systolic: "",
    diastolic: "",
    heartRate: "",
};

const initialFormError: FormError = {};


const PhisicalAssessment = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(setHeaderData({ title: "Patients", subtitle: "Patients List" }));
    }, []);

    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    }

    return <div>
        {/* <h1>Patients</h1> */}
        <Button variant="outline" disabled={false} onClick={handleShow}>
            physical Assement
        </Button>

        <Modal
            show={showModal}
            onHide={() => setShowModal(false)}
            header="Physical Assement"
            closeButton={true}
            size="md"
        >
            {/* <h2 className="mb-0 text-center">Form Submitted Successfully</h2> */}
            <PhisicalAssessmentForm />

        </Modal>
    </div>;
}

export default PhisicalAssessment