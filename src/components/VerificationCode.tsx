'use client'
import React from 'react'
import { VerifyOtp } from './form/LoginForms'
import Image from 'next/image'
import Logo from "../assets/images/Maia Logo.png";
import { Col, Container, Row } from 'react-bootstrap';

export default function VerificationCode() {
    return (
        <>
            <Container fluid className="d-flex align-items-center justify-content-center vh-100">
                <Row className='w-100'>
                    <Col  md={7} lg={8} xl={5} className="mx-auto">
                        <div className='verificationcode-main d-block align-items-center justify-content-center'>
                            <div className=''>
                                <div className='d-flex justify-content-center align-item-center'>
                                    <Image
                                        src={Logo}
                                        alt="MAIA Care Logo"
                                        width={145}
                                        height={45}
                                        className="mb-2"
                                    />
                                </div>

                                <h2 className="login-title text-center mt-3">Forgot Password</h2>
                                <p className="login-subtitle text-center">
                                    An email with a verification code was just sent to bm@gmail.com
                                </p>


                            </div>

                            <VerifyOtp />

                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}
