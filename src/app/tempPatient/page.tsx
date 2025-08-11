"use client"

import { InputFieldGroup } from "@/components/ui/InputField";
import { ChangeEvent } from "react";
import '@/style/patientProfile.css'
import Image from "next/image";
import dummyPatientImg from "../../assets/images/dummpy-patient-list-img.png"
import InputSelect from "@/components/ui/InputSelect";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

    };
    const handleAddPatient = () => {

        // console.log("handleAddPatient");
        router.push("/addpatient");
    };

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex gap-3">
                    <form>
                        <InputFieldGroup
                            name="name"
                            type="text"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleChange(e);
                            }}
                            onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                            placeholder="search doctor"
                            required={false}
                            disabled={false}
                            readOnly={false}
                            className="position-relative "
                        />
                    </form>
                    <div className="patient-list-count-box d-flex gap-2 justify-content-center align-items-center">

                        <Image src={dummyPatientImg} width={40} height={40} alt="" />
                        <span className="patient-list-count-box-countShow">98 Patient</span>

                    </div>
                </div>
                <div className="d-flex gap-3">
                    <div className="d-flex justify-content-center align-items-center gap-2">
                        <p className="m-0">Sort by :</p>
                        <form>
                            <InputSelect
                                // label="Sort by:"
                                name="sortBy"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    handleChange(e);
                                }}
                                onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                                required={false}
                                disabled={false}
                                placeholder="All Time"
                                // style={{minWidth: "140px"}}
                                options={[
                                    { id: "1", value: "1", label: "1" },
                                    { id: "2", value: "2", label: "2" },
                                    { id: "3", value: "3", label: "3" },
                                ]}
                            />
                        </form>
                    </div>
                    <Button variant="default" disabled={false} contentSize="large" onClick={handleAddPatient} >
                        Add Patient
                    </Button>
                </div>
            </div>
        </>
    )

}