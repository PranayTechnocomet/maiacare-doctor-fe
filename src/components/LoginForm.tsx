
'use client';
import { FaEnvelope, FaLock, FaFacebookF, FaGoogle } from 'react-icons/fa';
import Image from 'next/image';
import { MdMailOutline } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { InputFieldGroup } from './ui/InputField';
import Button from './ui/Button';
import { useState } from 'react';

export default function LoginForm() {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev);
    };
    

    const defaultFormValue = {
        email: '',
        password: '',
    };

    const defaultFormError = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(defaultFormValue);
    const [formError, setFormError] = useState(defaultFormError);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormError({ ...formError, [name]: '' });
    };

    const validateForm = () => {
        const errors: typeof defaultFormError = { ...defaultFormError };
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (formData.email.trim() === "") {
            errors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            errors.email = "Invalid email format";
            isValid = false;
        }

        if (formData.password.trim() === "") {
            errors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
            isValid = false;
        }

        setFormError(errors);
        return isValid;
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            alert("Form Submitted");
            setFormError(defaultFormError);
        }
    };


    return (
        <div className="container-fluid min-vh-100 d-flex p-0">
            {/* Left Side - Form */}
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-light px-5">
                <div >
                    <div className='d-flex justify-content-center align-item-center'>


                        <Image
                            src="/Images/Maia Logo.png" // Logo should be in /public/Images/
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

                    <InputFieldGroup
                        type="email"
                        value={formData.email}
                        name='email'
                        onChange={handleChange}
                        error={formError.email}
                        label="Email Address"
                        placeholder="doctor@maiacare.com"
                        required={true}
                        className={`position-relative  input-email-login-data`}

                    >
                        <MdMailOutline size={24} className='input-email-data' />
                    </InputFieldGroup>

                    {/* <InputFieldGroup
                        type="password"
                        label="Password"
                        placeholder="*********"
                        required={true}
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        error={formError.password}
                        className='position-relative pt-3'

                    >
                        <BiLockAlt size={24} className='input-email-data' />
                    </InputFieldGroup> */}

                    <InputFieldGroup
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="*********"
                        required={true}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={formError.password}
                        className="position-relative pt-3"
                    >
                        {/* Lock icon on left */}
                        <BiLockAlt size={24} className="input-email-data" />

                        {/* Eye icon on right */}
                        <span
                            onClick={togglePasswordVisibility}
                            className="position-absolute top-50 end-0 translate-middle-y me-3 cursor-pointer"
                            style={{ zIndex: 10 }}
                        >
                            {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
                        </span>
                    </InputFieldGroup>


                    <div className="d-flex justify-content-end mb-3">
                        <a href="#" className="input-forrgot-password  mt-2" >
                            Forgot Password
                        </a>
                    </div>

                    <Button className='login-button p-2' onClick={handleFormSubmit}> Sign In</Button>

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
                            <Image src={"/Images/Facebook_Icon.png"} alt="Facebook Icon" height={22} width={22} /> Sign In With Facebook
                        </button>
                        <button className="btn login-google-button d-flex align-items-center justify-content-center gap-3">
                            <Image src={"/Images/Google_Icon.png"} alt='Google Icon' height={22} width={22} /> Sign In With Google
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="col-md-6 p-0 d-none d-md-block">
                <div className="h-100 w-100 position-relative">
                    <Image
                        src="/Images/Pregnecy_Woman_Login.png" // Image should be in /public/Images/
                        alt="Login Image"
                        height={1000}
                        width={730}

                    />
                    <div className="position-absolute bottom-0 start-0 text-white text-center p-4" style={{ width: '100%' }}>
                        <p style={{ fontSize: '44px', alignItems: 'center' }}>Heal, Connect, & Lead
                            The Future of Fertility Support Starts Here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
