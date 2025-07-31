import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { InputFieldGroup } from '../ui/InputField';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { setHeaderData } from '@/utils/redux/slices/headerSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/utils/redux/store';

type FormError = Partial<Record<keyof FormData, string>>;
type FormData = {
    currentpassword: string;
    newpassword: string;
    confirmpassword: string;
};

function PasswordSettings() {

    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(setHeaderData({ title: "Settings", subtitle: "Settings" }));
    }, []);

    const initialFormError: FormError = {};

    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState<FormError>(initialFormError);
    const [formData, setFormData] = useState<FormData>({
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",

    });

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = (data: FormData): FormError => {
        const errors: FormError = {};

        if (!data.currentpassword.trim()) errors.currentpassword = "Current Password is required";
        if (!data.newpassword.trim()) errors.newpassword = "New Password is required";
        if (!data.confirmpassword.trim()) errors.confirmpassword = "Confirm Password is required";

        // Enhanced password validation for new password
        if (data.newpassword) {
            const password = data.newpassword;
            const passwordErrors = [];

            if (password.length < 8) {
                passwordErrors.push("Minimum 8 characters");
            }
            if (!/(?=.*[a-z])/.test(password)) {
                passwordErrors.push("At least one lowercase letter");
            }
            if (!/(?=.*[A-Z])/.test(password)) {
                passwordErrors.push("At least one uppercase letter");
            }
            if (!/(?=.*\d)/.test(password)) {
                passwordErrors.push("At least one number");
            }
            if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
                passwordErrors.push("At least one special character (e.g., !@#$%^&*)");
            }

            if (passwordErrors.length > 0) {
                errors.newpassword = passwordErrors.join(", ");
            }
        }

        if (data.newpassword && data.confirmpassword && data.newpassword !== data.confirmpassword) {
            errors.confirmpassword = "Passwords do not match";
        }

        return errors;
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = validateForm(formData);
        setFormError(errors);
        console.log("errors", errors);
        if (Object.keys(errors).length === 0) {
            setShowModal(true);
            setFormError(initialFormError);
        }
    };

    return (
        <>
            <p className="settings-accordion-subtitle">For your security, please enter your current password followed by your new password.</p>
            <form onSubmit={handleSubmit}>
                <InputFieldGroup
                    label="Current Password"
                    name="currentpassword"
                    type="password"
                    className='setting-password-input'
                    value={formData.currentpassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                    placeholder="Enter Current password"
                    required={true}
                    disabled={false}
                    readOnly={false}
                    error={formError.currentpassword}
                />

                <InputFieldGroup
                    label="New Password"
                    name="newpassword"
                    type="password"
                    className='setting-password-input mt-3'
                    value={formData.newpassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                    placeholder="Enter new password"
                    required={true}
                    disabled={false}
                    readOnly={false}
                    error={formError.newpassword}
                />

                <div className="my-3">
                    <p className="settings-accordion-subtitle mb-2">Your password must meet the following requirements:</p>
                    <div className="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <circle cx="5.5" cy="5.96094" r="2" fill="#3E4A57" />
                        </svg>

                        <span className="password-requirements">At least one number</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <path d="M1.71875 6.64844L4.125 9.05469L9.625 3.55469" stroke="#AFDC81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="password-requirements">Minimum 8 characters</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <circle cx="5.5" cy="5.96094" r="2" fill="#3E4A57" />
                        </svg>

                        <span className="password-requirements">At least one lowercase letter</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <path d="M1.71875 6.64844L4.125 9.05469L9.625 3.55469" stroke="#AFDC81" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>

                        <span className="password-requirements">At least one uppercase letter</span>
                    </div>
                    <div className="d-flex align-items-center  gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="12" viewBox="0 0 11 12" fill="none">
                            <circle cx="5.5" cy="5.96094" r="2" fill="#3E4A57" />
                        </svg>

                        <span className="password-requirements">At least one special character (e.g., !@#$%^&*)</span>
                    </div>
                </div>

                <InputFieldGroup
                    label="Confirm Password"
                    name="confirmpassword"
                    type="password"
                    className='setting-password-input'
                    value={formData.confirmpassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                    placeholder="Re-enter password"
                    required={true}
                    disabled={false}
                    readOnly={false}
                    error={formError.confirmpassword}
                />
                <div className="d-flex justify-content-end align-items-center gap-3 mt-3">

                    <a className="forgate-password">Forgot Password?</a>

                    <Button variant="default" disabled={false} type="submit" className={`setting-button`}>
                        Save Password
                    </Button>
                </div>

                <Modal
                    show={showModal}
                    onHide={() => setShowModal(false)}
                    header="Modal Header"
                    closeButton={true}
                >
                    <h2 className="mb-0 text-center">Form Submitted Successfully</h2>
                </Modal>

            </form>
        </>
    )
}

export default PasswordSettings