import React, { useState } from 'react'
import { InputFieldGroup } from '../ui/InputField';
import { MdMailOutline } from 'react-icons/md';
import { BiHide, BiLockAlt, BiShow } from 'react-icons/bi';
import Button from '../ui/Button';
import "../../style/login.css"
import { useRouter } from 'next/navigation';

export function LoginForms() {

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

        if (formData.password.trim() === "") {
            errors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 8) {
            errors.password = "Minimum 8 characters";
            isValid = false;
        } else if (!/(?=.*[a-z])/.test(formData.password)) {
            errors.password = "At least one lowercase letter";
            isValid = false;
        } else if (!/(?=.*[A-Z])/.test(formData.password)) {
            errors.password = "At least one uppercase letter";
            isValid = false;
        } else if (!/(?=.*\d)/.test(formData.password)) {
            errors.password = "At least one number";
            isValid = false;
        } else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.password)) {
            errors.password = "At least one special character (e.g., !@#$%^&*)";
            isValid = false;
        } 

        setFormError(errors);
        return isValid;
    };
    const router = useRouter();
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            alert("Form Submitted");
            router.push("/");
            setFormError(defaultFormError);
        }
    };
    return (

        <div>
            <form onSubmit={handleFormSubmit}>
                <InputFieldGroup
                    type="email"
                    value={formData.email}
                    name='email'
                    onChange={handleChange}
                    error={formError.email}
                    label="Email Address"
                    placeholder="doctor@maiacare.com"
                    required={true}
                    className={`position-relative  input-email-login-data mt-4`}

                >
                    <MdMailOutline size={24} className='input-email-data' />
                </InputFieldGroup>
                <div className='pt-3'>
                    <InputFieldGroup
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        placeholder="********"
                        required={true}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        error={formError.password}
                        className="position-relative  input-email-login-data"
                    >
                        <BiLockAlt size={24} className="input-email-data" />

                        <span
                            onClick={togglePasswordVisibility}
                            className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
                            style={{ zIndex: 8 }}
                        >
                            {showPassword ? <BiShow size={20} /> : <BiHide size={20} />}

                        </span>
                    </InputFieldGroup>
                </div>

                <div className="d-flex justify-content-end mb-3">
                    <a onClick={() => router.push("/forgotppassword")} className="input-forrgot-password  mt-2" >
                        Forgot Password
                    </a>
                </div>

                <Button className='login-button p-2' type='submit'> Sign In</Button>
            </form>
        </div>
    )
}



export function ForgotPassword() {
    


    const defaultFormValue = {
        email: '',
        
    };

    const defaultFormError = {
        email: '',
        
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
        else if(formData.email !== "admin@gmail.com"){
            errors.email = "Invalid email";
            isValid = false;
        }

        

        setFormError(errors);
        return isValid;
    };
    const router = useRouter();
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            alert("Form Submitted");
            router.push("/verificationcode");
            setFormError(defaultFormError);
        }
    };
    return (

        <div>
            <form onSubmit={handleFormSubmit}>
                <InputFieldGroup
                    type="email"
                    value={formData.email}
                    name='email'
                    onChange={handleChange}
                    error={formError.email}
                    label="Email Address"
                    placeholder="doctor@maiacare.com"
                    required={true}
                    className={`position-relative  input-email-login-data mt-4`}

                >
                    <MdMailOutline size={24} className='input-email-data' />
                </InputFieldGroup>


                

                <Button className='login-button p-2 mt-4' type='submit'> Submit</Button>
            </form>
        </div>
    )

}




export function ResetPasswordScreen() {

    const [newshowPassword, setNewShowPassword] = useState(false);
    const [confirmshowPassword, setConfirmShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setNewShowPassword(prev => !prev);
        setConfirmShowPassword(prev => !prev);
    };


    const defaultFormValue = {
        newpassword: '',
        confirmpassword: '',
    };

    const defaultFormError = {
        newpassword: '',
        confirmpassword: '',
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

        if (formData.newpassword.trim() === "") {
            errors.newpassword = "New Password is required";
            isValid = false;
        } else if (formData.newpassword.length < 8) {
                errors.newpassword = "Minimum 8 characters";
                isValid = false;
            }
            else if (!/(?=.*[a-z])/.test(formData.newpassword)) {
                errors.newpassword = "At least one lowercase letter";
                isValid = false;
            }
            else if (!/(?=.*[A-Z])/.test(formData.newpassword)) {
                errors.newpassword = "At least one uppercase letter";
                isValid = false;
            }
            else if (!/(?=.*\d)/.test(formData.newpassword)) {
                errors.newpassword = "At least one number";
                isValid = false;
            }
            else if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(formData.newpassword)) {
                errors.newpassword = "At least one special character (e.g., !@#$%^&*)";
                isValid = false;
            } else if(formData.newpassword !== formData.confirmpassword){
            errors.confirmpassword = "New Password and Confirm Password do not match";
            isValid = false;
        }
        setFormError(errors);
        return isValid;
    };
    const router = useRouter();
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            alert("Form Submitted");
            router.push("/");
            setFormError(defaultFormError);
        }
    };
    return (

        <div>
            <form onSubmit={handleFormSubmit}>
               
                <div className='pt-3'>
                    <InputFieldGroup
                        type={newshowPassword ? 'text' : 'password'}
                        label="New Password"
                        placeholder="********"
                        required={true}
                        name="newpassword"
                        value={formData.newpassword}
                        onChange={handleChange}
                        error={formError.newpassword}
                        className="position-relative  input-email-login-data"
                    >
                        <BiLockAlt size={24} className="input-email-data" />

                        <span
                            onClick={() => setNewShowPassword(!newshowPassword)}
                            className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
                            style={{ zIndex: 8 }}
                        >
                            {newshowPassword ? <BiShow size={20} /> : <BiHide size={20} />}

                        </span>
                    </InputFieldGroup>
                </div>
                <div className='pt-3'>
                    <InputFieldGroup
                        type={confirmshowPassword ? 'text' : 'password'}
                        label="Confirm Password"
                        placeholder="********"
                        required={true}
                        name="confirmpassword"
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        error={formError.confirmpassword}
                        className="position-relative  input-email-login-data "
                    >
                        <BiLockAlt size={24} className="input-email-data" />

                        <span
                            onClick={() => setConfirmShowPassword(!confirmshowPassword)}
                            className="position-absolute  end-0 translate-middle-y me-3 cursor-pointer passwored-btn-icon"
                            style={{ zIndex: 8 }}
                        >
                            {confirmshowPassword ? <BiShow size={20} /> : <BiHide size={20} />}

                        </span>
                    </InputFieldGroup>
                </div>


                <Button className='login-button p-2 mt-4' type='submit'>Reset Password</Button>
            </form>
        </div>
    )
}


export function VerifyOtp() {
    const defaultFormValue = {
        number: '',
    };

    const defaultFormError = {
        number: '',
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

        if (formData.number.length !== 6) {
            errors.number = "Please enter valid code";
            isValid = false;
        }

        setFormError(errors);
        return isValid;
    };
    const router = useRouter();
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validateForm()) {
            if (formData.number !== "123456") {
                alert("Please enter valid code");
                return;
            }
            alert("Form Submitted");
            router.push("/resetpassword");
            setFormError(defaultFormError);
        }
    };
    return (

        <div>
            <form onSubmit={handleFormSubmit}>
                <InputFieldGroup
                    type="number"
                    value={formData.number}
                    name='number'
                    onChange={handleChange}
                    error={formError.number}
                    label="Verification Code "
                    placeholder="doctor@maiacare.com"
                    required={true}
                    className={`position-relative  input-email-login-data mt-4`}

                >
                    
                </InputFieldGroup>


                <Button className='login-button p-2 mt-4' type='submit'> Verify</Button>
            </form>
        </div>
    )

}