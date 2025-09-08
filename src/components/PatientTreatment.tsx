"use client"

import { patientTreatmentData } from "@/utils/StaticData";
import { Col, Row } from "react-bootstrap"
import { BsThreeDots } from "react-icons/bs";

const PatientTreatment = () => {
    return (
        <>
            <div className="mt-4">
                <Row className="g-3">
                    {patientTreatmentData.map((item, index) => (
                        <Col lg={4} md={6} key={index}>
                            <div className={item.status === "Ongoing" ? "patient-treatment-box" : "patient-treatment-status-completed-box"}>
                                <div className="d-flex align-items-center justify-content-between">
                                    <div className="d-flex gap-3">
                                        <h6 className="patient-treatment-box-title">{item.title}</h6>
                                        <span className={item.status === "Ongoing" ? "patient-treatment-status-Ongoing" : "patient-treatment-status-Completed"}>{item.status}</span>
                                    </div>

                                    <div className="patient-treatment-box-dot-btn">
                                        <BsThreeDots />
                                    </div>

                                </div>
                                <Row className="mt-1 g-3 ">
                                  
                                    <Col sm={6} className="col-6 col-sm-6">
                                        <div>
                                            <p className="patient-treatment-box-subtitle m-0 mb-1">Start Date</p>
                                            <p className="patient-treatment-box-subtitle-desc m-0">{item.startDate}</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="patient-treatment-box-subtitle m-0 mt-2 mb-1">Fees</p>
                                            <p className="patient-treatment-box-subtitle-desc-fees m-0">{item.fees}</p>
                                        </div>
                                    </Col>
                                    <Col sm={6} className="col-6 col-sm-6">
                                        <div>
                                            <p className="patient-treatment-box-subtitle m-0 mb-1">Expected End Date</p>
                                            <p className="patient-treatment-box-subtitle-desc m-0">{item.endDate}</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="patient-treatment-box-subtitle m-0 mb-1">Amount Status</p>
                                            <span className={item.amountStatus === "Half Paid" ? "patient-treatment-box-subtitle-desc-half-paid m-0" : "patient-treatment-box-subtitle-desc-paid m-0"}>{item.amountStatus}</span>
                                        </div>
                                    </Col>
                                    
                                </Row>
                            </div>
                        </Col>
                    ))}
                </Row>


            </div>
        </>
    )
}

export default PatientTreatment