"use client"

import Image from "next/image"
import { Col, Row } from "react-bootstrap"
import dummyPdfImg from "../assets/images/dummy-pdf-img.png"
import dummyJpgImg from "../assets/images/dummy-jpg-img.png"
import { patientReportData } from "@/utils/StaticData"

const PatientReport = () => {
    return (
        <>
            {/* <h1>report</h1> */}
            <Row className="g-3">
                {patientReportData.map((item, index) => (
                    <Col md={3} key={index}>
                        {/* <h1>report</h1> */}
                        <div className="patient-report-box d-flex flex-column align-items-center">
                            <Image src={item.img} width={90} height={90} alt="report" />
                            <h6 className="patient-report-box-title mt-2 m-0">{item.title}</h6>
                        <p className="patient-report-box-subtitle m-0">{item.subtitle}</p>
                        <p className="patient-report-box-fileInfo m-0">{item.fileInfo}</p>
                    </div>
                </Col>
                ))}
            </Row>
        </>
    )
}

export default PatientReport
