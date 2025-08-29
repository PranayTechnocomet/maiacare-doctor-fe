
"use client";

import Image from "next/image";
import { useState } from "react";
import { Form, Dropdown, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import temppatientImg1 from "../assets/images/patient-img-1.png"


type AutocompleteItem = {
    id: number | string;
    name: string;
    ProfilePhoto?: string | any;
};

type AutocompleteProps = {
    data: AutocompleteItem[];
    placeholder?: string;
    onChange?: (selected: AutocompleteItem | null) => void;
};

export function PatientAutocomplete({
    data,
    placeholder = "Search...",
    onChange,
}: AutocompleteProps) {

    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const filtered = (() => {
        if (query.trim().length === 0) return [];
        const matches = data.filter((item) =>
            item.name.toLowerCase().includes(query.toLowerCase())
        );
        return matches.length > 0 ? matches : data;
    })();

    const handleSelect = (item: AutocompleteItem) => {
        setQuery(item.name);
        setOpen(false);
        onChange?.(item);
    };

    return (
        <div className="position-relative" >
            <Form.Label className="maiacare-input-field-label  form-label">Name</Form.Label>
            <Form.Control
                type="text"
                className="maiacare-input-field w-100"
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setOpen(true);
                    onChange?.(null);
                }}
                onFocus={() => {
                    if (query.trim().length > 0) setOpen(true);
                }}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
            />

            <Dropdown show={open && filtered.length > 0}>
                <Dropdown.Menu className="w-100 mt-1 shadow">
                    {filtered.map((item) => (
                        <Dropdown.Item
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            className="d-flex align-items-center gap-2"
                        >
                            {item.ProfilePhoto && (
                                <Image
                                    className="show-patient-img"
                                    src={item.ProfilePhoto.src}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                />
                            )}
                            <span className="settings-accordion-subtitle">{item.name}</span>
                        </Dropdown.Item>

                    ))}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}


export function PatientShow() {
    return (
        <>
            <div className="show-patient-box">
                <div className="d-flex align-items-center gap-2">
                    <Image
                        className="show-patient-img"
                        src={temppatientImg1}
                        alt="doctor"
                        width={48}
                        height={48}
                    />
                    <span className="patient-treatment-box-subtitle-desc">Nisha S</span>
                </div>
            </div>
        </>
    );
}

export function SelecteAgeBox() {

    const [age, setAge] = useState<string>("");

    const handleChange = (val: string) => {
        setAge(val);

       console.log(val);
    };

    return (
        <>
            <Form.Label className="maiacare-input-field-label  form-label">Age</Form.Label>
            <ToggleButtonGroup
                type="radio"
                name="ageOptions"
                value={age}
                onChange={handleChange}
                className="d-flex gap-2 flex-wrap age-select-field"
            >
                <ToggleButton id="age-1" value="below18" variant="link" className="age-select-item">
                    Below 18
                </ToggleButton>
                <ToggleButton id="age-2" value="18-24" variant="link" className="age-select-item">
                    18 – 24
                </ToggleButton>
                <ToggleButton id="age-3" value="25-35" variant="link" className="age-select-item">
                    25 – 35
                </ToggleButton>
                <ToggleButton id="age-4" value="36-40" variant="link" className="age-select-item">
                    36 – 40
                </ToggleButton>
                <ToggleButton id="age-5" value="41-50" variant="link" className="age-select-item">
                    41 – 50
                </ToggleButton>
                <ToggleButton id="age-6" value="50+" variant="link" className="age-select-item">
                    50+
                </ToggleButton>
            </ToggleButtonGroup>

        </>
    );
}