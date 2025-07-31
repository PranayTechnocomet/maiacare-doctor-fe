'use client';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { MdMailOutline } from "react-icons/md";
import { BiHide, BiLockAlt, BiShow } from "react-icons/bi";
import Logo from "../assets/images/Maia Logo.png";
import FacebookIcon from "../assets/images/Facebook_Icon.png";
import GoogleIcon from "../assets/images/Google_Icon.png";
import PregnecyWomanLogin from "../assets/images/Pregnecy_Woman_Login.png";
import "../style/login.css"
import { Col, Container, Row } from 'react-bootstrap';
import { ForgotPassword, ResetPasswordScreen } from './form/LoginForms';


export default function ResetPassword() {

    return (
        <>
            <Container fluid>
                <Row className='min-vh-100 ' >

                    <Col md={6} className="d-flex align-items-center justify-content-center">
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
                            Reset Password

                            </h2>
                            <p className="login-subtitle text-start">Secure your account by setting a new password.</p>
                            {/* <LoginTitle className="login-title1" title="Sign In To Your Account." subtitle="Please enter details to access your dashboard" /> */}
                           
                           
                            <ResetPasswordScreen />

                           

                           
                                
                            
                            
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
                                <p className='login-image-contetnt m-0 '>Heal, Connect, & Lead-<br className="d-block md-none"/>
                                    The Future of Fertility Support Starts Here.</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>

    );
}
