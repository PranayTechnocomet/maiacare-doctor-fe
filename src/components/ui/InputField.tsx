import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

export const InputFieldGroup = ({
    label = "",
    name,
    type = "text",
    value,
    onChange = () => { },
    onBlur = () => { },
    onClick = () => { },
    placeholder = "",
    required = false,
    disabled = false,
    readOnly = false,
    error = "",
    helperText = "",
    className = "",
    children,
    ...rest
}: {
    label?: string;
    name?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}) => {
    return (
        <>
            <div className={`maiacare-input-field-container ${className}`}>
                {label && (
                    <InputFieldLabel label={label} required={required} />
                )}
                <InputField
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onClick={onClick}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    children={children}
                    {...rest}
                />
                {helperText && <InputFieldHelperText helperText={helperText} />}
            </div>
            {error && <InputFieldError error={error} />}
        </>
    )
}

export const InputFieldLabel = ({ label = "", required = false, className = "" }: { label?: string; required?: boolean, className?: string }) => {
    return (
        <Form.Label className={`maiacare-input-field-label ${className}`}>{label} {required && <span className="text-danger">*</span>}</Form.Label>
    )
}

export const InputField = ({
    name,
    type = "text",
    value,
    onChange = () => { },
    onBlur = () => { },
    onClick = () => { },
    placeholder = "",
    required = false,
    disabled = false,
    readOnly = false,
    className = "",
    children,
    ...rest
}: {
    name?: string;
    type?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
    children?: React.ReactNode;
    [key: string]: any;
}) => {
    const [realValue, setRealValue] = useState("");
    const [maskedValue, setMaskedValue] = useState("");

    // Custom handler for password masking
    const handleMaskedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInput = e.target.value;

        if (newInput.length > maskedValue.length) {
            // User typed new character
            const newChar = newInput[newInput.length - 1];
            setRealValue((prev) => prev + newChar);
        } else {
            // User deleted character
            setRealValue((prev) => prev.slice(0, -1));
        }

        setMaskedValue("*".repeat(newInput.length));

        // still call parent onChange with actual value
        if (onChange) {
            const syntheticEvent = {
                ...e,
                target: { ...e.target, value: newInput.length > maskedValue.length ? realValue + newInput[newInput.length - 1] : realValue.slice(0, -1) }
            } as React.ChangeEvent<HTMLInputElement>;
            onChange(syntheticEvent);
        }
    };

    return (
        <>
            {type === "password" ? (
                <Form.Control
                    className={`maiacare-input-field ${className}`}
                    name={name}
                    type="text"
                    value={maskedValue}
                    onChange={handleMaskedChange}
                    onBlur={onBlur}
                    onClick={onClick}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...rest}
                />
            ) : (
                <Form.Control
                    className={`maiacare-input-field ${className}`}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    onClick={onClick}
                    placeholder={placeholder}
                    disabled={disabled}
                    readOnly={readOnly}
                    {...rest}
                />
            )}
            {children}
        </>
    )
}

export const InputFieldError = ({ error = "", className = "" }: { error?: string, className?: string }) => {
    return (
        <div className={`${className}`}>
            <Form.Text className="text-danger maiacare-input-field-error">{error}</Form.Text>
        </div>
    )
}

export const InputFieldHelperText = ({ helperText = "", className = "" }: { helperText?: string, className?: string }) => {
    return (
        <div className={`${className}`}>
            <Form.Text className="maiacare-input-field-helper-text">{helperText}</Form.Text>
        </div>
    )
}
