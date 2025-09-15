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
            console.log("payment details succesfully" ,formData);
            setPaymentFormData(formData);
            setFormError(initialFormError);
            setPaymentFormShow(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-3">
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

                        />

                    </Col>
                    <Col sm={6}>
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
                                { id: "3", value: "Partially Paid", label: "Partially Paid" },
                            ]}
                        />
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