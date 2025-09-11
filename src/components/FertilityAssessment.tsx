import { ChangeEvent, useState } from "react";
import Modal from "./ui/Modal"
import Button from "./ui/Button";
import { Accordion, Col, Row } from "react-bootstrap";
import InputSelect from "./ui/InputSelect";
import { DatePickerFieldGroup } from "./ui/CustomDatePicker";
import { RadioButtonGroup } from "./ui/RadioField";
import { InputFieldGroup } from "./ui/InputField";
// import { MenstrualCycle, Pregnancy } from "./form/FertilityAssessmentForm";

const FertilityAssessment = () => {

    const [showModal, setShowModal] = useState<boolean>(false);
    // const [formData, setFormData] = useState<FormData>(initialFormData);
    // const [formError, setFormError] = useState<FormError>(initialFormError);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleShow = () => {
        setShowModal(true);
    }

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        // const { name, value } = e.target;
        // setFormData((prev) => ({ ...prev, [name]: value }));
        // setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    return (
        <>
            {/* <h1>Fertility Assessment</h1> */}
            <Button variant="outline" disabled={false} onClick={handleShow}>
                Fertility Assement
            </Button>
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                header=" Fertility Assement"
                closeButton={true}
                size="lg"
            >

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0" className="fertilitiy-assement-accodion-item mb-3">
                        <Accordion.Header>
                            <div className="fertilitiy-assement-accodion-title">
                                Menstrual Cycle
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">

                            {/* <MenstrualCycle /> */}
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <div className="fertilitiy-assement-accodion-title">
                                Pregnancy
                            </div>
                        </Accordion.Header>
                        <Accordion.Body className="custom-accordion-body">
                            {/* <Pregnancy /> */}
                        </Accordion.Body>
                    </Accordion.Item>

                    <Row className="mt-4">
                        <Col md={6}>

                            <Button className="w-100" variant="outline" disabled={false} onClick={handleClose}>
                                Cancel
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Button className="w-100" variant="default" disabled={false} type="submit">
                            Save
                            </Button>
                        </Col>

                    </Row>
                </Accordion>

            </Modal>
        </>
    )
}

export default FertilityAssessment