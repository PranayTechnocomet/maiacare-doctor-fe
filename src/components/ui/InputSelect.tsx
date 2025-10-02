"use client";
import React from 'react'
import { Form } from 'react-bootstrap'
import { InputFieldLabel, InputFieldError, InputFieldHelperText } from './InputField';
import Select from 'react-dropdown-select';

export function InputSelect({
    label="",
    name,
    defaultValue,
    value,
    onChange,
    onBlur,
    onClick,
    required,
    disabled,
    error,
    helperText,
    className,
    options = [],
    placeholder = "Select",
    ...rest
}: {
    label?: string;
    name?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    onClick?: (e: React.MouseEvent<HTMLSelectElement>) => void;   
    required?: boolean;
    disabled?: boolean;
    error?: string;
    helperText?: string;
    className?: string;
    options?: { id: string, value: string, label: string }[];
    placeholder?: string;
    [key: string]: any;
}) {
  return (
    <div className={`maiacare-input-field-container ${className}`}>
      {label && <InputFieldLabel label={label} required={required} />}
      <Form.Select
        name={name}
        value={value || defaultValue}
        onChange={onChange}
        onBlur={onBlur}
        onClick={onClick}
        // required={required}
        disabled={disabled}
        className={`maiacare-input-field ${className}`}
        {...rest}

      >
        <option value={""}>{placeholder}</option>
        {options.map(option => (
          <option key={option.id} value={option.value}>{option.label}</option>

        ))}
      </Form.Select>
      {error && <InputFieldError error={error} />}
      {helperText && <InputFieldHelperText helperText={helperText} />}
    </div>
  )
}

type OptionType = { value: string; label: string };

interface InputSelectMultiSelectProps {
  values: OptionType[];
  onChange: (values: OptionType[]) => void; // expose as full objects for flexibility
  options: { id: string, value: string, label: string }[];
  placeholder?: string;
  addPlaceholder?: string;
  label?: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  selectedOptionColor?: string;
  selectedOptionBorderColor?: string;
  [key: string]: any;
}

export function InputSelectMultiSelect({
  values,
  onChange,
  options,
  placeholder,
  addPlaceholder,
  label,
  name,
  required,
  disabled,
  error,
  helperText,
  className = "",
  selectedOptionColor= "var(--border-box)",
  selectedOptionBorderColor= "var(--border-box)",
  ...rest
}: InputSelectMultiSelectProps) {
  const handleRemove = (value: string) => {
    const newValues = values.filter((v) => v.value !== value);
    onChange(newValues);
  };

  return (
    <div className={`maiacare-input-field-container ${className}`}>
{label && <InputFieldLabel label={label} required={required} />}

      <Select
        {...rest}
        name={name}
        className="maiacare-input-field custom-react-dropdown"
        options={options}
        multi
        values={values}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(vals) => onChange(vals)}
        // required={required}
        addPlaceholder={addPlaceholder || placeholder}
      />

      {values.length > 0 && (
        <p className="my-2 maiacare-input-field-helper-text">
          {values.length} selected
        </p>
      )}

      <div className="my-2 d-flex gap-2 flex-wrap">
        {values.map((item) => (
          <div key={item.value} className="input-select-item-box" style={{color: selectedOptionColor, borderColor: selectedOptionBorderColor}}>
            {item.label}
            <span
              className="ms-2 cursor-pointer"
              onClick={() => handleRemove(item.value)}
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      {helperText && !error && (
        <div className="form-text">{helperText}</div>
      )}
      {error && <div className="text-danger mt-1">{error}</div>}
    </div>
  );
}


// "use client";
// import React, { useState, useRef, useEffect } from 'react';
// import { InputFieldLabel, InputFieldError, InputFieldHelperText } from './InputField';

// export default function InputSelect({
//     label="",
//     name,
//     defaultValue,
//     value,
//     onChange,
//     onBlur,
//     onClick,
//     required,
//     disabled,
//     error,
//     helperText,
//     className,
//     options = [],
//     placeholder = "Select",
//     ...rest
// }: {
//     label?: string;
//     name?: string;
//     defaultValue?: string;
//     value?: string;
//     onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
//     onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
//     onClick?: (e: React.MouseEvent<HTMLSelectElement>) => void;   
//     required?: boolean;
//     disabled?: boolean;
//     error?: string;
//     helperText?: string;
//     className?: string;
//     options?: { id: string, value: string, label: string }[];
//     placeholder?: string;
//     [key: string]: any;
// }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const [selectedValue, setSelectedValue] = useState(value || defaultValue || "");
//     const [hoveredOption, setHoveredOption] = useState("");
//     const selectRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleSelectClick = () => {
//         if (!disabled) {
//             setIsOpen(!isOpen);
//             if (onClick) {
//                 onClick({} as React.MouseEvent<HTMLSelectElement>);
//             }
//         }
//     };

//     const handleOptionClick = (optionValue: string) => {
//         setSelectedValue(optionValue);
//         setIsOpen(false);
        
//         if (onChange) {
//             const syntheticEvent = {
//                 target: { name, value: optionValue }
//             } as React.ChangeEvent<HTMLSelectElement>;
//             onChange(syntheticEvent);
//         }
//     };

//     const handleBlur = () => {
//         if (onBlur) {
//             const syntheticEvent = {
//                 target: { name, value: selectedValue }
//             } as React.FocusEvent<HTMLSelectElement>;
//             onBlur(syntheticEvent);
//         }
//     };

//     const getSelectedLabel = () => {
//         const selectedOption = options.find(option => option.value === selectedValue);
//         return selectedOption ? selectedOption.label : placeholder;
//     };

//     const styles = {
//         container: {
//             position: 'relative' as const,
//             width: '100%',
//             marginBottom: '16px'
//         },
//         trigger: {
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: '12px 16px',
//             // border: `2px solid ${error ? '#dc3545' : isOpen ? '#007bff' : '#e0e0e0'}` ,
//             borderRadius: '8px',
//             backgroundColor: disabled ? '#f5f5f5' : 'white',
//             cursor: disabled ? 'not-allowed' : 'pointer',
//             transition: 'all 0.3s ease',
//             fontSize: '16px',
//             minHeight: '48px',
//             opacity: disabled ? 0.6 : 1,
//             boxShadow: isOpen ? '0 0 0 3px rgba(0, 123, 255, 0.1)' : 'none'
//         },
//         arrow: {
//             width: 0,
//             height: 0,
//             borderLeft: '6px solid transparent',
//             borderRight: '6px solid transparent',
//             borderTop: '6px solid #666',
//             transition: 'transform 0.3s ease',
//             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
//         },
//         placeholder: {
//             color: '#999'
//         },
//         value: {
//             color: '#333',
//             fontWeight: '500'
//         },
//         dropdown: {
//             position: 'absolute' as const,
//             top: '100%',
//             left: 0,
//             right: 0,
//             background: 'white',
//             border: '2px solid #e0e0e0',
//             borderTop: 'none',
//             borderRadius: '0 0 8px 8px',
//             boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
//             zIndex: 1000,
//             maxHeight: '250px',
//             overflowY: 'auto' as const,
//             animation: 'slideDown 0.2s ease-out'
//         },
//         option: {
//             padding: '12px 16px',
//             cursor: 'pointer',
//             transition: 'all 0.2s ease',
//             borderBottom: '1px solid #f0f0f0',
//             fontSize: '16px',
//             backgroundColor: 'white'
//         }
//     };

//     return (
//         <div className={`maiacare-input-field-container ${className || ''}`} style={styles.container}>
//             {label && <InputFieldLabel label={label} required={required} />}
            
//             <div ref={selectRef} style={{ position: 'relative', width: '100%' }}>
//                 <div 
//                     style={styles.trigger}
//                     onClick={handleSelectClick}
//                     onBlur={handleBlur}
//                     tabIndex={disabled ? -1 : 0}
//                     onMouseEnter={(e) => {
//                         if (!disabled) {
//                             (e.target as HTMLElement).style.borderColor = '#2B4360';
//                         }
//                     }}
//                     onMouseLeave={(e) => {
//                         if (!disabled && !isOpen) {
//                             (e.target as HTMLElement).style.borderColor = error ? '#dc3545' : '#e0e0e0';
//                         }
//                     }}
//                 >
//                     <span style={selectedValue ? styles.value : styles.placeholder}>
//                         {getSelectedLabel()}
//                     </span>
//                     <div style={styles.arrow}></div>
//                 </div>

//                 {isOpen && !disabled && (
//                     <div style={styles.dropdown}>
//                         {options.map((option) => {
//                             const isSelected = selectedValue === option.value;
//                             const isHovered = hoveredOption === option.value;
                            
//                             return (
//                                 <div
//                                     key={option.id}
//                                     style={{
//                                         ...styles.option,
//                                         backgroundColor: isSelected ? '#2B4360' : (isHovered ? '#2B4360' : 'white'),
//                                         color: (isSelected || isHovered) ? 'white' : '#333',
//                                         fontWeight: isSelected ? '600' : 'normal',
//                                         borderBottom: option === options[options.length - 1] ? 'none' : '1px solid #f0f0f0'
//                                     }}
//                                     onClick={() => handleOptionClick(option.value)}
//                                     onMouseEnter={() => setHoveredOption(option.value)}
//                                     onMouseLeave={() => setHoveredOption("")}
//                                 >
//                                     {option.label}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 )}
//             </div>

//             {error && <InputFieldError error={error} />}
//             {helperText && <InputFieldHelperText helperText={helperText} />}
//         </div>
//     );
// }