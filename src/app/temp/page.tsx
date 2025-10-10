"use client";

import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { AppDispatch } from "@/utils/redux/store";
import {
  InputFieldGroup,
  InputFieldHelperText,
} from "@/components/ui/InputField";
import { InputSelect, InputSelectMultiSelect } from "@/components/ui/InputSelect";
import { DatePickerFieldGroup } from "@/components/ui/CustomDatePicker";
import { RadioButtonGroup } from "@/components/ui/RadioField";

import Button from "@/components/ui/Button";
import ContentContainer from "@/components/ui/ContentContainer";
import { PhoneNumberInput } from "@/components/ui/PhoneNumberInput";
import Modal from "@/components/ui/Modal";
import BaseTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { IoIosEye } from "react-icons/io";
import { OptionType, Patient } from "@/utils/types/interfaces";
import { tableResponse } from "@/utils/StaticData";
import Textarea from "@/components/ui/Textarea";
import CustomTabs from "@/components/ui/CustomTabs";
import { TimePickerFieldGroup } from "@/components/ui/CustomTimePicker";
import toast from "react-hot-toast";
import { FaSmile } from "react-icons/fa";
import { BsInfoCircle } from "react-icons/bs";
import Select from "react-dropdown-select";


const data: Patient[] = [
  {
    id: 1,
    name: "Meera Joshi",
    mobile: "9092038491",
    email: "----",
    pincode: "400072",
    treatment: "Fertility Support +2",
    status: "Active",
  },
  {
    id: 2,
    name: "Anjali Kapoor",
    mobile: "9092038491",
    email: "ashok.kumar@gmail.com",
    pincode: "400072",
    treatment: "IVF",
    status: "Deactivated",
  },
  // ...add more rows
];

const columns: ColumnDef<Patient>[] = [
  {
    header: "#",
    accessorKey: "id",
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Mobile No",
    accessorKey: "mobile",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Pincode",
    accessorKey: "pincode",
  },
  {
    header: "Treatment Plan",
    accessorKey: "treatment",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => {
      const status = info.getValue() as string;
      return (
        <span
          className={`badge ${status === "Active"
            ? "bg-primary"
            : status === "Discontinued"
              ? "bg-warning"
              : "bg-danger"
            }`}
        >
          {status}
        </span>
      );
    },
  },
];

interface Option {
  value: string;
  label: string;
}

// Types for form data and form error
type FormData = {
  name: string;
  doctor: string;
  date: string;
  gender: string;
  description: string;
  phone: string;
  startTime: string;
  endTime: string;
  medicalCondition: OptionType[];
};

type FormError = Partial<Record<keyof FormData, string>>;

const initialFormData: FormData = {
  name: "",
  doctor: "",
  date: "",
  gender: "",
  description: "",
  phone: "",
  startTime: "",
  endTime: "",
  medicalCondition: [],
};

const initialFormError: FormError = {};

export default function Page() {
  const dispatch: AppDispatch = useDispatch();
  const [tableData, setTableData] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    dispatch(
      setHeaderData({
        title: "Sample Page",
        subtitle: "Sample Page for check common components",
      })
    );
    setTableData(tableResponse);
    setLoading(false);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [tempShowData, setTempShowData] = useState(
    {
      name: "test name",
      doctor: "test doc",
      date: "",
      gender: "male",
      description: "test desc",
      phone: "9898989898",
      startTime: "",
      endTime: "",
    }
  )

  const [selected, setSelected] = useState<Option[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formError, setFormError] = useState<FormError>(initialFormError);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "Non-smoker", label: "Non-smoker" },
    { value: "Occasional alcohol", label: "Occasional alcohol" },
    { value: "Vegetarian diet", label: "Vegetarian diet" },

  ];

  // console.log("selected", selected);

  const toggleOption = (value: string) => {
    setSelectedValues(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );

  };

  const removeOption = (value: string) => {
    setSelectedValues(prev => prev.filter(v => v !== value));
  };

  const getSelectedLabels = () => {
    return selectedValues.map(value => {
      const option = options.find(opt => opt.value === value);
      return option ? option.label : value;
    });
  };



  // Validation Function
  const validateForm = (data: FormData): FormError => {
    const errors: FormError = {};

    if (!data.name.trim()) errors.name = "Name is required";
    if (!data.doctor.trim()) errors.doctor = "Doctor name is required";
    if (!data.date) errors.date = "Date is required";
    if (!data.gender) errors.gender = "Gender is required";

    if (!data.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!data.description.trim())
      errors.description = "Description is required";

    if (!data.startTime.trim()) errors.startTime = "Start time is required";
    if (!data.endTime.trim()) errors.endTime = "End time is required";
    if (!data.medicalCondition?.length) errors.medicalCondition = "Medical Condition is required";

    return errors;
  };

  // Handle form field change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  // Submit Handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormError(errors);
    console.log("errors", errors);
    if (Object.keys(errors).length === 0) {
      setShowModal(true);
      setFormError(initialFormError);
    }
    setTempShowData(formData);
    setFormData(initialFormData);
    toast.success('Form Submitted Successfully', {
      icon: <BsInfoCircle size={22} color="white" />,
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [activeTab, setActiveTab] = useState<string>("basic");

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <ContentContainer className="mt-5">
          <h1>Basic Details</h1>
        </ContentContainer>
      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: (
        <ContentContainer className="mt-5">
          <h1>Leaves Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reviews Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "xyz",
      label: "Xyz",
      content: (
        <ContentContainer className="mt-5">
          <h1>XYZ</h1>
        </ContentContainer>
      ),
    },
    {
      key: "abc",
      label: "ABC",
      content: (
        <ContentContainer className="mt-5">
          <h1>ABC</h1>
        </ContentContainer>
      ),
    },
    {
      key: "de",
      label: "Reviews",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reviews Content</h1>
        </ContentContainer>
      ),
    },
  ];


  const [password, setPassword] = useState("");

  // State for masked input
  const [realValue, setRealValue] = useState("");
  const [maskedValue, setMaskedValue] = useState("");

  // Handle change for custom masked input
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
  };


  const [value, setValue] = useState<string>("");
  console.log("value1121212", value);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChang = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // only numbers
    const displayValue = input ? input + "(kg)" : "";

    setValue(displayValue);

    // Move cursor before " kg"
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.setSelectionRange(input.length, input.length);
      }
    }, 0);
  };


  return (
    <form onSubmit={handleSubmit}>
      <ContentContainer>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChang}
          placeholder="Enter weight"
          className="border rounded-md p-2 outline-none"
        />

        <InputFieldGroup
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
          placeholder="Enter name"
          required={false}
          disabled={false}
          readOnly={false}
          error={formError.name}
          helperText="Enter name"
          className="position-relative "
        >
          <div className="position-absolute abc">
            <IoIosEye size={25} />
          </div>

        </InputFieldGroup>

        <InputSelect
          label="Select Doctor"
          name="doctor"
          value={formData.doctor}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
          required={true}
          disabled={false}
          error={formError.doctor}
          helperText="Select doctor"
          options={[
            { id: "1", value: "1", label: "Doctor 1" },
            { id: "2", value: "2", label: "Doctor 2" },
            { id: "3", value: "3", label: "Doctor 3" },
          ]}
        />

        <DatePickerFieldGroup
          label="Select Date"
          name="date"
          placeholder="Select Date"
          value={formData.date}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
          required={true}
          disabled={false}
          error={formError.date}
          helperText="select date"
        // iconColor = "red"
        />

        <RadioButtonGroup
          label="Gender"
          name="gender"
          value={formData.gender}
          defaultValue="male"
          onChange={(e) => handleChange(e)}
          required
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />

        <Textarea
          label="Description"
          name="description"
          value={formData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange(e);
          }}
          onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => { }}
          required={true}
          disabled={false}
          error={formError.description}
          helperText="Enter description"
          maxLength={500}
        />

        <PhoneNumberInput
          label="Contact Number"
          value={formData.phone}
          onChange={(phone: any) => {
            // setFormData((prev) => ({ ...prev, phone }));
            // setFormError((prev) => ({ ...prev, phone: "" }));
            handleChange({
              target: { name: "phone", value: phone },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          placeholder="1212"
          required
          helperText="Enter a valid number including country code"
          error={formError.phone}
        />
        <TimePickerFieldGroup
          label="Start Time"
          name="startTime"
          placeholder="Select Start Time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          error={formError.startTime}
        />

        <TimePickerFieldGroup
          label="End Time"
          name="endTime"
          // placeholder="Select End Time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          helperText="Enter operational end time"
        />

        <div className="mt-3">
          <InputSelectMultiSelect
            label="Do you have any medical condition?"
            name="medicalCondition"
            values={formData.medicalCondition}
            onChange={(values) => { setFormData((prev) => ({ ...prev, medicalCondition: values })); setFormError((prev) => ({ ...prev, medicalCondition: "" })) }}
            options={[
              { id: "1", value: "Non-smoker", label: "Non-smoker" },
              { id: "2", value: "Occasional alcohol", label: "Occasional alcohol" },
              { id: "3", value: "Vegetarian diet", label: "Vegetarian diet" },

            ]}
            placeholder="Search Medical Condition or Allergies"
            addPlaceholder="Add Medical Condition or Allergies"
            required={true}
            dropdownHandle={true} // open close arrow icon show hide

            selectedOptionColor="blue"
            selectedOptionBorderColor="blue"
            error={formError.medicalCondition}
          />
        </div>

        <div className="d-flex gap-2 mt-3">
          <Button variant="default" disabled={false} type="submit">
            Submit
          </Button>
          <Button variant="outline" disabled={false} onClick={handleClose}>
            Cancel
          </Button>
        </div>
      </ContentContainer>

      <ContentContainer>
        {/* Button Section Start */}

        <label className="form-label">Lifestyle</label>

        <div className="dropdown">
          <button
            className="btn btn-outline-secondary dropdown-toggle w-100 text-start"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            {selectedValues.length === 0
              ? "Select lifestyle options..."
              : ` Selected`
            }
          </button>

          {isOpen && (
            <ul className="dropdown-menu d-flex show w-100">

              {options.map(option => (
                <li key={option.value}>
                  <label className="dropdown-item d-flex align-items-center mb-0">
                    <input
                      type="checkbox"
                      className="form-check-input me-2"
                      checked={selectedValues.includes(option.value)}
                      onChange={() => toggleOption(option.value)}
                    />
                    {option.label}
                  </label>
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedValues.length > 0 && (
          <div className="">
            <small className="text-muted mb-1 d-block">
              {selectedValues.length} Selected
            </small>
            <div className="d-flex flex-wrap gap-1">
              {getSelectedLabels().map((label, index) => (
                <span
                  key={selectedValues[index]}
                  className="badge  d-inline-block border-box-orange-font box-border-orange  d-flex align-items-center"
                >
                  {label}
                  <button
                    type="button"
                    className="btn-close btn-close-orange ms-2"
                    style={{ fontSize: '0.7rem' }}
                    onClick={() => removeOption(selectedValues[index])}
                  />
                </span>
              ))}
            </div>
          </div>
        )}


        {/* <div className="mt-3">
          <h3>test select 2</h3>
          <div className={`maiacare-input-field-container `}>

            <Select
              name="name"
              className="react-dropdown-select-custom maiacare-input-field"
              options={options}
              multi={true}
              values={selected}
              placeholder="Search Medical Condition or Allergies"
              onChange={(values) => setSelected(values)}
              required={true}
              addPlaceholder="Add Medical Condition or Allergies"
            />

            {selected.length > 0 && <span className="mt-3">{selected.length} selected</span>}

            <div className="mt-3 d-flex gap-2 flex-wrap" >
              {selected.map((item) => (
                <div
                  key={item.value}
                  className="input-select-item-box"
                >
                  {item.label}
                  <span className="ms-2"
                    onClick={() => setSelected(selected.filter((s) => s.value !== item.value))}
                  >
                    ✕
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        {/* Button Section End */}

        <div className="my-4 bg-warning">
          <div>{tempShowData.name}</div>
          <div>{tempShowData.description}</div>
          <div>{tempShowData.phone}</div>
          <div>{tempShowData.startTime}</div>
          <div>{tempShowData.endTime}</div>
        </div>
      </ContentContainer>

      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />

      <div className="my-4">
        <h4>Patient List</h4>
        <BaseTable data={tableData} columns={columns} />
      </div>
      <InputFieldHelperText helperText="Helper Text" />

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        header="Modal Header"
        closeButton={true}
      >
        <h2 className="mb-0 text-center">Form Submitted Successfully</h2>
      </Modal>
    </form>

  );
}