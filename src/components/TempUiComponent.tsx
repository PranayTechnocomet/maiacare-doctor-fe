import { ChangeEvent, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { IconType } from "react-icons";
import { WiSunrise, WiDaySunny, WiSunset, WiNightClear } from "react-icons/wi"; // weather icons
import { InputFieldLabel } from "./ui/InputField";

interface TimeSlot {
    label: string;
    value: string;
    color: string;
    icon: IconType;
}

const timeSlots: TimeSlot[] = [
    { label: "Morning", value: "morning", color: "#FFD54F", icon: WiSunrise },
    { label: "Afternoon", value: "afternoon", color: "#FF8A65", icon: WiDaySunny },
    { label: "Evening", value: "evening", color: "#7986CB", icon: WiSunset },
    { label: "Night", value: "night", color: "#BA68C8", icon: WiNightClear },
];

export function QuantityNumber({ name, label, required, value, onChange }: {
    name?: string;
    label?: string;
    required?: boolean;
    value?: number;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}) {

    const [qty, setQty] = useState<number>(0);

    const handleChange = (newValue: number) => {
        if (newValue >= 0) {
            setQty(newValue);
            // onChange?.(newValue);
        }
    };

    return (
        <>
            {label && <InputFieldLabel label={label} required={required} />}
            <div className="d-flex Quantity-box">
                <span className="Quantity-box-minues w-100 d-flex align-items-center justify-content-center" onClick={() => handleChange(qty - 1)}>-</span>
                <FormControl
                    type="number"
                    name={name}
                    value={qty}
                    readOnly
                    className="text-center w-100 rounded-0"
                />
                <span className="Quantity-box-plus w-100 d-flex align-items-center justify-content-center" onClick={() => handleChange(qty + 1)}>+</span>
            </div>

        </>
    )
}

export function TimeSlotCheckBox() {
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

    const handleToggle = (value: string) => {
        if (selectedSlots.includes(value)) {
            setSelectedSlots(selectedSlots.filter((v) => v !== value));
        } else {
            setSelectedSlots([...selectedSlots, value]);
        }
    };

    return (
        <>
            <div className="d-flex gap-3 flex-wrap">
                {timeSlots.map((slot) => {
                    const Icon = slot.icon;
                    return (
                        <>
                            <label
                                key={slot.value}
                                className={`timeslot-card d-flex gap-2 ${selectedSlots.includes(slot.value) ? "selected" : ""
                                    }`}
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <div
                                        className="timeslot-icon"
                                        style={{ backgroundColor: slot.color + "33", color: slot.color }}
                                    >
                                        <Icon size={28} />
                                    </div>
                                    <span className="ms-2">{slot.label}</span>
                                </div>
                                <Form.Check
                                    type="checkbox"
                                    checked={selectedSlots.includes(slot.value)}
                                    onChange={() => handleToggle(slot.value)}
                                    className="m-0"
                                />
                            </label>
                        </>
                    );
                })}
            </div>
        </>
    )
}
