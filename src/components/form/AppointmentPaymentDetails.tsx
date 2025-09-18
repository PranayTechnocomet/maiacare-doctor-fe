import { Col, Row } from "react-bootstrap";
import { InputFieldGroup } from "../ui/InputField";
import { ChangeEvent, useState } from "react";
import InputSelect from "../ui/InputSelect";
import Button from "../ui/Button";
import { PaymentFormData } from "@/utils/types/interfaces";

export function AppointmentPaymentDetails({ setPaymentFormShow, setPaymentFormData, PaymentFormData }: {
    setPaymentFormShow: React.Dispatch<React.SetStateAction<boolean>>;
    setPaymentFormData: React.Dispatch<React.SetStateAction<PaymentFormData>>;
    PaymentFormData: PaymentFormData;
}) {

    const initialFormData: PaymentFormData = {
        amount: PaymentFormData.amount || "",
        status: PaymentFormData.status || "",
        mode: PaymentFormData.mode || "",
    };

    const [statusClass, setStatusClass] = useState<string>("");

    type FormError = Partial<Record<keyof PaymentFormData, string>>;

    const initialFormError: FormError = {};
    const [formError, setFormError] = useState<FormError>(initialFormError);
    const [formData, setFormData] = useState<PaymentFormData>(initialFormData);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setFormError((prev) => ({ ...prev, [name]: "" }));

        if (name === "status") {
            const newClass =
                value === "Paid"
                    ? "patient-journey-badge-success"
                    : value === "Unpaid"
                        ? "patient-journey-badge-pending"
                        : value === "other"
                            ? "patient-journey-badge-InProgress"
                            : "";

            setStatusClass(newClass);
        }
    };

    const validateForm = (data: PaymentFormData): FormError => {
        const errors: FormError = {};
        if (!data.amount) {
            errors.amount = "Amount is required";
        }
        if (!data.status) {
            errors.status = "Status is required";
        }
        if (!data.mode) {
            errors.mode = "Mode is required";
        }
        return errors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormError(errors);
        // console.log("errors", errors);

        if (Object.keys(errors).length === 0) {
            console.log("payment details succesfully", formData);
            setPaymentFormData(formData);
            setFormError(initialFormError);
            setPaymentFormShow(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-sm-3 g-2">
                    <Col sm={12}>
                        <InputFieldGroup
                            label="Amount"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="Amount Text"
                            required={false}
                            disabled={false}
                            readOnly={false}
                            error={formError.amount}
                            className="position-relative input-Amount"
                        >
                            <div className="input-Amount-box">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                                    <path d="M16.5625 6.75C16.5625 6.99864 16.4637 7.2371 16.2879 7.41291C16.1121 7.58873 15.8737 7.6875 15.625 7.6875H13.4375C13.4361 9.01314 12.9088 10.2841 11.9715 11.2214C11.0341 12.1588 9.76315 12.6861 8.43752 12.6875H8.04689L13.125 17.3062C13.2178 17.3886 13.2934 17.4885 13.3473 17.6002C13.4012 17.712 13.4323 17.8333 13.439 17.9572C13.4457 18.0811 13.4277 18.205 13.3861 18.3219C13.3445 18.4388 13.2801 18.5463 13.1967 18.6381C13.1132 18.7299 13.0124 18.8042 12.9 18.8568C12.7876 18.9093 12.666 18.9391 12.542 18.9442C12.418 18.9494 12.2943 18.9299 12.1779 18.8869C12.0616 18.8439 11.9549 18.7783 11.8641 18.6938L4.98908 12.4438C4.8487 12.3162 4.75034 12.149 4.70696 11.9643C4.66359 11.7797 4.67726 11.5862 4.74616 11.4095C4.81506 11.2327 4.93595 11.0811 5.09286 10.9745C5.24977 10.8679 5.43533 10.8114 5.62501 10.8125H8.43752C9.26632 10.8125 10.0612 10.4833 10.6472 9.89721C11.2333 9.31116 11.5625 8.5163 11.5625 7.6875H5.62501C5.37637 7.6875 5.13792 7.58873 4.9621 7.41291C4.78629 7.2371 4.68751 6.99864 4.68751 6.75C4.68751 6.50136 4.78629 6.2629 4.9621 6.08709C5.13792 5.91127 5.37637 5.8125 5.62501 5.8125H10.9375C10.6464 5.42439 10.269 5.10938 9.83506 4.89242C9.40113 4.67545 8.92266 4.5625 8.43752 4.5625H5.62501C5.37637 4.5625 5.13792 4.46373 4.9621 4.28791C4.78629 4.1121 4.68751 3.87364 4.68751 3.625C4.68751 3.37636 4.78629 3.1379 4.9621 2.96209C5.13792 2.78627 5.37637 2.6875 5.62501 2.6875H15.625C15.8737 2.6875 16.1121 2.78627 16.2879 2.96209C16.4637 3.1379 16.5625 3.37636 16.5625 3.625C16.5625 3.87364 16.4637 4.1121 16.2879 4.28791C16.1121 4.46373 15.8737 4.5625 15.625 4.5625H12.3367C12.641 4.94128 12.8883 5.36237 13.0711 5.8125H15.625C15.8737 5.8125 16.1121 5.91127 16.2879 6.08709C16.4637 6.2629 16.5625 6.50136 16.5625 6.75Z" fill="#2B4360" />
                                </svg>
                            </div>
                        </InputFieldGroup>

                    </Col>
                    <Col sm={6} className="position-relative">

                        <InputSelect
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}

                            required={true}
                            disabled={false}
                            error={formError.status}
                            options={[
                                { id: "1", value: "Paid", label: "Paid" },
                                { id: "2", value: "Unpaid", label: "Unpaid" },
                                { id: "3", value: "other", label: "other" },
                            ]}
                        />
                        <span className={`payment-status ${statusClass}`}> {formData.status} </span>

                    </Col>
                    <Col sm={6}>
                        <InputSelect
                            label="Mode"
                            name="mode"
                            value={formData.mode}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            error={formError.mode}
                            options={[
                                { id: "1", value: "Cash", label: "Cash" },
                                { id: "2", value: "Online", label: "Online" },
                                { id: "3", value: "Wallet", label: "Wallet" },
                            ]}
                        />
                    </Col>

                    <div className='d-flex gap-2'>
                        <Button className="w-100" variant="outline" disabled={false} onClick={() => setPaymentFormShow(false)}>
                            Cancel
                        </Button>
                        <Button className="w-100" variant="default" disabled={false} type="submit">
                            Save
                        </Button>
                    </div>
                </Row>

            </form>
        </>
    )
}