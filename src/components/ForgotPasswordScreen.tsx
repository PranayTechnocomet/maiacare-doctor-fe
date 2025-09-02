'use client';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import Logo from "../assets/images/Maia Logo.png";

import PregnecyWomanLogin from "../assets/images/Pregnecy_Woman_Login.png";
import "../style/login.css"
import { Col, Container, Row } from 'react-bootstrap';
import { ForgotPassword } from './form/LoginForms';


export default function ForgotPasswordScreen() {

    return (
        <>
            <Container fluid>
                <Row className='min-vh-100 ' >

                    <Col md={6} className="d-flex align-items-center justify-content-center forgot-password-screen">
                        <div className='' >
                            <div className='d-flex justify-content-start align-item-start'>


                                <Image
                                    src={Logo}
                                    alt="MAIA Care Logo"
                                    width={145}
                                    height={45}
                                    className=" mb-2"
                                />
                            </div>
                            <h2 className="login-title text-start mt-3" >
                                Forgot Password

                            </h2>
                            <p className="login-subtitle text-start">Enter the email address associated with your account and we'll send you instructions to reset your password.</p>
                            {/* <LoginTitle className="login-title1" title="Sign In To Your Account." subtitle="Please enter details to access your dashboard" /> */}
                           
                           
                            <ForgotPassword />

                           

                           
                                
                            
                            
                        </div>
                    </Col>




                    <Col md={6} className=' p-0 d-none d-md-block '>
                        <div className="h-100 w-100 position-relative main-pregnancy-img">
                            <Image
                                src={PregnecyWomanLogin}
                                alt="Login Image"
                                fill
                                className=" pregnecy-image w-100 h-100"


                            />
                            <div className="position-absolute bottom-0 start-0  text-center p-2 " >
                                <p className='login-image-contetnt'>Heal, Connect, & Lead-<br className="d-block md-none"/>
                                    The Future of Fertility Support Starts Here.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>

    );
}
