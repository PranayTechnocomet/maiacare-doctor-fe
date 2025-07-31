'use client';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { MdMailOutline } from "react-icons/md";
import { BiHide, BiLockAlt, BiShow } from "react-icons/bi";
import LoginForms from './form/LoginForms';
import Logo from "../assets/images/Maia Logo.png";
import FacebookIcon from "../assets/images/Facebook_Icon.png";
import GoogleIcon from "../assets/images/Google_Icon.png";
import PregnecyWomanLogin from "../assets/images/Pregnecy_Woman_Login.png";
import LoginTitle from './ui/Custom/LoginTitle';
import "../style/login.css"


export default function LoginScreenContainer() {




    return (
        <div className="container-fluid  d-flex p-0">
            {/* Left Side - Form */}
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-light ">
                <div >
                    <div className='d-flex justify-content-center align-item-center'>


                        <Image
                            src={Logo} // Logo should be in /public/Images/
                            alt="MAIA Care Logo"
                            width={150}
                            height={50}
                            className=" mb-2"
                        />
                    </div>
                    <h2 className="login-title text-center " >
                        Sign In To Your Account.
                        
                    </h2>
                    <p className="login-subtitle text-center">Please enter details to access your dashboard</p>
                    {/* <LoginTitle className="login-title1" title="Sign In To Your Account." subtitle="Please enter details to access your dashboard" /> */}
                    <LoginForms />

                    <div className="text-center mt-3">
                        <span className='login-dont'>Don't have an account? </span>
                        <a href="#" className="input-forrgot-password">Sign Up</a>
                    </div>

                    <div className='d-flex justify-content-center align-items-center '>
                        <hr className="my-4" />
                        <p>OR</p>
                        <hr className="my-4" />
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn login-google-button d-flex align-items-center justify-content-center gap-3">
                            <Image src={FacebookIcon} alt="Facebook Icon" height={22} width={22} /> Sign In With Facebook
                        </button>
                        <button className="btn login-google-button d-flex align-items-center justify-content-center gap-3">
                            <Image src={GoogleIcon} alt='Google Icon' height={22} width={22} /> Sign In With Google
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="col-md-6 p-0 d-none d-md-block ">
                <div className="h-100 w-100 position-relative main-pregnancy-img">
                    <Image
                        src={PregnecyWomanLogin} // Image should be in /public/Images/
                        alt="Login Image"
                        height={300}
                        width={1200}
                        className=" pregnecy-image w-100 h-100"
                    

                    />
                    <div className="position-absolute bottom-0 start-0  text-center p-4 " >
                        <p className='login-image-contetnt '>Heal, Connect, & Lead-
                            The Future of Fertility Support Starts Here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
