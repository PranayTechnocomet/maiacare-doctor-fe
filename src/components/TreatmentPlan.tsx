"use client"

import { ChangeEvent, useState } from "react";
import { Accordion, Col, ProgressBar, Row } from "react-bootstrap";
import InputSelect from "./ui/InputSelect";
import Button from "./ui/Button";
import '@/style/Appointment.css'
import "@/style/settingsPassword.css";
import { InputFieldGroup } from "./ui/InputField";
import { QuantityNumber, TimeSlotCheckBox } from "./TempUiComponent";
import { RadioButtonGroup } from "./ui/RadioField";
import Textarea from "./ui/Textarea";
import { TempTreatmentSteps } from "@/utils/StaticData";
import { MedicationPrescriptionType, TreatmentPlanFormData } from "@/utils/types/interfaces";
import { MedicationPrescriptionForm, TreatmentPlanForm } from "./form/TreatmentPlanForm";

function TreatmentPlan() {

    const [step, setStep] = useState<number>(1);
    const [stepper, setStepper] = useState(1);
    const totalSteps = 3;
    const [showEditForm, setShowEditForm] = useState<boolean>(false);
    const [editForm, setEditForm] = useState<MedicationPrescriptionType>({
        medicineName: "",
        type: "",
        typeQuantity: "",
        duration: "",
        quantity: 0,
        timeslot: ["morning"],
        meal: "Before",
        intake: "",
        description: "",
    });

    const [medicalPrescription, setMedicalPrescription] = useState<MedicationPrescriptionType[]>([]);

    console.log("showEditForm", editForm);
    
    return (
        <>
            <div className="d-flex align-items-center mb-4">
                <div className="flex-grow-1 d-flex">
                    {[...Array(totalSteps)].map((_, index) => (
                        <div key={index} className="flex-fill mx-1">
                            <ProgressBar
                                now={100}
                                className={
                                    index < stepper
                                        ? "progress-bar progressbar-step-success"
                                        : "progress-bar progressbar-step-secondary"
                                }
                            />
                        </div>
                    ))}
                </div>
                <span className="ms-2 progressbar-step">
                    {step} of {totalSteps}
                </span>
            </div>

            {step == 1 && (
                <TreatmentPlanForm setStep={setStep} setStepper={setStepper} />

            )}

            {step == 2 && (

                <>
                    {medicalPrescription.length > 0 && (
                        <>
                            <Accordion defaultActiveKey="0">
                                {medicalPrescription.map((item, index) => {
                                    return (
                                        <Accordion.Item eventKey={index.toString()} className='medication-prescription-accordion-item-main mb-3' key={index}>
                                            <Accordion.Header className='phisical-assessment-accordion-title-showData'>
                                                <div className='d-flex align-items-center gap-3'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="45" height="44" viewBox="0 0 45 44" fill="none">
                                                        <rect x="0.904297" width="44" height="44" rx="6" fill="#FBEFEB" />
                                                        <path d="M34.1114 11.2954C32.9019 10.0859 31.2615 9.40643 29.551 9.40643C27.8405 9.40643 26.2001 10.0859 24.9906 11.2954L12.6996 23.5852C11.5154 24.7998 10.8575 26.4322 10.8683 28.1285C10.8791 29.8249 11.5579 31.4486 12.7575 32.6481C13.9571 33.8475 15.5809 34.5261 17.2773 34.5367C18.9736 34.5473 20.6059 33.8891 21.8204 32.7048L34.1126 20.4149C35.3201 19.2045 35.9981 17.5646 35.9978 15.8549C35.9976 14.1452 35.3192 12.5055 34.1114 11.2954ZM20.4508 31.3352C19.6047 32.1814 18.4571 32.6569 17.2604 32.657C16.0637 32.6572 14.916 32.1819 14.0698 31.3358C13.2235 30.4897 12.748 29.3421 12.7479 28.1454C12.7478 26.9487 13.2231 25.801 14.0692 24.9547L19.5293 19.4946L25.9109 25.8751L20.4508 31.3352ZM32.7418 19.0454L27.2793 24.5055L20.9001 18.1251L26.3614 12.6649C27.2108 11.8351 28.3532 11.3736 29.5407 11.3806C30.7282 11.3875 31.8651 11.8623 32.7048 12.702C33.5445 13.5417 34.0193 14.6786 34.0262 15.8661C34.0331 17.0536 33.5717 18.1959 32.7418 19.0454ZM30.8734 16.4709C30.9634 16.5609 31.0349 16.6677 31.0836 16.7853C31.1324 16.9029 31.1575 17.029 31.1575 17.1563C31.1575 17.2836 31.1324 17.4097 31.0836 17.5273C31.0349 17.6449 30.9634 17.7517 30.8734 17.8417L27.9671 20.748C27.8771 20.8379 27.7703 20.9092 27.6527 20.9578C27.5351 21.0065 27.4091 21.0315 27.2819 21.0314C27.1547 21.0314 27.0287 21.0062 26.9112 20.9575C26.7936 20.9088 26.6869 20.8374 26.5969 20.7473C26.507 20.6573 26.4357 20.5505 26.387 20.4329C26.3384 20.3154 26.3134 20.1894 26.3135 20.0621C26.3135 19.9349 26.3386 19.8089 26.3874 19.6914C26.4361 19.5739 26.5075 19.4671 26.5975 19.3772L29.5038 16.4709C29.6854 16.2894 29.9317 16.1874 30.1886 16.1874C30.4454 16.1874 30.6917 16.2894 30.8734 16.4709Z" fill="#E29578" />
                                                    </svg>
                                                    <div className="d-flex flex-column hap-2">
                                                        <p className=".treatment-steps-box-item m-0">{item.medicineName}</p>
                                                        <p className="medication-prescription-accordion-subtitle m-0">
                                                            {item.typeQuantity} | {item.type} | Twice a day

                                                        </p>
                                                    </div>
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body className='pt-0'>
                                                <div className="d-flex flex-column gap-3">
                                                    <div className="d-flex gap-3">
                                                        <p className="medication-prescription-accordion-item m-0">Duration - {item.duration} Days </p>
                                                        <p className="medication-prescription-accordion-item m-0">Meal - {item.meal} </p>

                                                    </div>
                                                    <div className="medication-prescription-accordion-hr-row"></div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                            <path d="M8.4043 2.5V1C8.4043 0.867392 8.45698 0.740215 8.55074 0.646447C8.64451 0.552678 8.77169 0.5 8.9043 0.5C9.03691 0.5 9.16408 0.552678 9.25785 0.646447C9.35162 0.740215 9.4043 0.867392 9.4043 1V2.5C9.4043 2.63261 9.35162 2.75979 9.25785 2.85355C9.16408 2.94732 9.03691 3 8.9043 3C8.77169 3 8.64451 2.94732 8.55074 2.85355C8.45698 2.75979 8.4043 2.63261 8.4043 2.5ZM8.9043 4C8.11317 4 7.33981 4.2346 6.68202 4.67412C6.02422 5.11365 5.51153 5.73836 5.20878 6.46927C4.90603 7.20017 4.82681 8.00444 4.98116 8.78036C5.1355 9.55628 5.51646 10.269 6.07587 10.8284C6.63528 11.3878 7.34801 11.7688 8.12394 11.9231C8.89986 12.0775 9.70413 11.9983 10.435 11.6955C11.1659 11.3928 11.7906 10.8801 12.2302 10.2223C12.6697 9.56448 12.9043 8.79113 12.9043 8C12.9031 6.93949 12.4813 5.92275 11.7314 5.17285C10.9816 4.42296 9.96481 4.00116 8.9043 4ZM4.55055 4.35375C4.64437 4.44757 4.77161 4.50028 4.9043 4.50028C5.03698 4.50028 5.16423 4.44757 5.25805 4.35375C5.35187 4.25993 5.40457 4.13268 5.40457 4C5.40457 3.86732 5.35187 3.74007 5.25805 3.64625L4.25805 2.64625C4.16423 2.55243 4.03698 2.49972 3.9043 2.49972C3.77161 2.49972 3.64437 2.55243 3.55055 2.64625C3.45673 2.74007 3.40402 2.86732 3.40402 3C3.40402 3.13268 3.45673 3.25993 3.55055 3.35375L4.55055 4.35375ZM4.55055 11.6462L3.55055 12.6462C3.45673 12.7401 3.40402 12.8673 3.40402 13C3.40402 13.1327 3.45673 13.2599 3.55055 13.3538C3.64437 13.4476 3.77161 13.5003 3.9043 13.5003C4.03698 13.5003 4.16423 13.4476 4.25805 13.3538L5.25805 12.3538C5.3045 12.3073 5.34135 12.2521 5.36649 12.1914C5.39163 12.1308 5.40457 12.0657 5.40457 12C5.40457 11.9343 5.39163 11.8692 5.36649 11.8086C5.34135 11.7479 5.3045 11.6927 5.25805 11.6462C5.21159 11.5998 5.15644 11.5629 5.09575 11.5378C5.03505 11.5127 4.96999 11.4997 4.9043 11.4997C4.8386 11.4997 4.77355 11.5127 4.71285 11.5378C4.65215 11.5629 4.597 11.5998 4.55055 11.6462ZM12.9043 4.5C12.97 4.50005 13.035 4.48716 13.0957 4.46207C13.1564 4.43697 13.2116 4.40017 13.258 4.35375L14.258 3.35375C14.3519 3.25993 14.4046 3.13268 14.4046 3C14.4046 2.86732 14.3519 2.74007 14.258 2.64625C14.1642 2.55243 14.037 2.49972 13.9043 2.49972C13.7716 2.49972 13.6444 2.55243 13.5505 2.64625L12.5505 3.64625C12.4805 3.71618 12.4329 3.8053 12.4135 3.90235C12.3942 3.99939 12.4041 4.09998 12.442 4.1914C12.4799 4.28281 12.544 4.36092 12.6263 4.41586C12.7086 4.4708 12.8053 4.50008 12.9043 4.5ZM13.258 11.6462C13.1642 11.5524 13.037 11.4997 12.9043 11.4997C12.7716 11.4997 12.6444 11.5524 12.5505 11.6462C12.4567 11.7401 12.404 11.8673 12.404 12C12.404 12.1327 12.4567 12.2599 12.5505 12.3538L13.5505 13.3538C13.597 13.4002 13.6522 13.4371 13.7128 13.4622C13.7735 13.4873 13.8386 13.5003 13.9043 13.5003C13.97 13.5003 14.035 13.4873 14.0957 13.4622C14.1564 13.4371 14.2116 13.4002 14.258 13.3538C14.3045 13.3073 14.3414 13.2521 14.3665 13.1914C14.3916 13.1308 14.4046 13.0657 14.4046 13C14.4046 12.9343 14.3916 12.8692 14.3665 12.8086C14.3414 12.7479 14.3045 12.6927 14.258 12.6462L13.258 11.6462ZM3.9043 8C3.9043 7.86739 3.85162 7.74021 3.75785 7.64645C3.66408 7.55268 3.53691 7.5 3.4043 7.5H1.9043C1.77169 7.5 1.64451 7.55268 1.55074 7.64645C1.45698 7.74021 1.4043 7.86739 1.4043 8C1.4043 8.13261 1.45698 8.25979 1.55074 8.35355C1.64451 8.44732 1.77169 8.5 1.9043 8.5H3.4043C3.53691 8.5 3.66408 8.44732 3.75785 8.35355C3.85162 8.25979 3.9043 8.13261 3.9043 8ZM8.9043 13C8.77169 13 8.64451 13.0527 8.55074 13.1464C8.45698 13.2402 8.4043 13.3674 8.4043 13.5V15C8.4043 15.1326 8.45698 15.2598 8.55074 15.3536C8.64451 15.4473 8.77169 15.5 8.9043 15.5C9.03691 15.5 9.16408 15.4473 9.25785 15.3536C9.35162 15.2598 9.4043 15.1326 9.4043 15V13.5C9.4043 13.3674 9.35162 13.2402 9.25785 13.1464C9.16408 13.0527 9.03691 13 8.9043 13ZM15.9043 7.5H14.4043C14.2717 7.5 14.1445 7.55268 14.0507 7.64645C13.957 7.74021 13.9043 7.86739 13.9043 8C13.9043 8.13261 13.957 8.25979 14.0507 8.35355C14.1445 8.44732 14.2717 8.5 14.4043 8.5H15.9043C16.0369 8.5 16.1641 8.44732 16.2579 8.35355C16.3516 8.25979 16.4043 8.13261 16.4043 8C16.4043 7.86739 16.3516 7.74021 16.2579 7.64645C16.1641 7.55268 16.0369 7.5 15.9043 7.5Z" fill="#B0B4C1" />
                                                        </svg>
                                                        <p className="medication-prescription-accordion-item m-0">Morning - 1 Tab</p>
                                                    </div>
                                                    <div className="medication-prescription-accordion-hr-row"></div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                            <path d="M15.6256 9.38814C15.2218 10.7062 14.4126 11.8634 13.3131 12.695C12.3477 13.4216 11.199 13.8647 9.99585 13.9746C8.79267 14.0846 7.58266 13.857 6.50163 13.3175C5.4206 12.7779 4.51134 11.9478 3.87591 10.9202C3.24049 9.89257 2.90403 8.70821 2.90433 7.50001C2.89998 6.0898 3.35843 4.7171 4.20933 3.59251C5.04091 2.49301 6.19809 1.68379 7.5162 1.28001C7.60308 1.25326 7.6956 1.2507 7.78382 1.27261C7.87204 1.29451 7.95262 1.34004 8.0169 1.40432C8.08117 1.4686 8.12671 1.54918 8.14861 1.6374C8.17051 1.72562 8.16795 1.81814 8.1412 1.90501C7.85298 2.85841 7.82881 3.87214 8.07128 4.83818C8.31375 5.80422 8.81376 6.68639 9.51805 7.39067C10.2223 8.09496 11.1045 8.59497 12.0705 8.83744C13.0366 9.0799 14.0503 9.05574 15.0037 8.76751C15.0906 8.74076 15.1831 8.7382 15.2713 8.76011C15.3595 8.78201 15.4401 8.82754 15.5044 8.89182C15.5687 8.9561 15.6142 9.03668 15.6361 9.1249C15.658 9.21312 15.6555 9.30564 15.6287 9.39251L15.6256 9.38814Z" fill="#B0B4C1" />
                                                        </svg>
                                                        <p className="medication-prescription-accordion-item m-0">Night - 1 Tab</p>
                                                    </div>

                                                </div>
                                                <Button className='mt-3' variant="outline" disabled={false} contentSize="small" onClick={() => {setEditForm(item); setShowEditForm(true)} }>
                                                    <svg width="16" height="16" viewBox="0 0 14 14" className='me-1' fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M13.5484 3.40848L10.7553 0.615983C10.5209 0.381644 10.203 0.25 9.87157 0.25C9.54011 0.25 9.22223 0.381644 8.98782 0.615983L1.28032 8.32286C1.16385 8.43861 1.0715 8.57633 1.00863 8.72803C0.945765 8.87973 0.913622 9.0424 0.914067 9.20661V11.9997C0.914067 12.3313 1.04576 12.6492 1.28018 12.8836C1.5146 13.118 1.83255 13.2497 2.16407 13.2497H12.6641C12.863 13.2497 13.0537 13.1707 13.1944 13.0301C13.3351 12.8894 13.4141 12.6986 13.4141 12.4997C13.4141 12.3008 13.3351 12.1101 13.1944 11.9694C13.0537 11.8288 12.863 11.7497 12.6641 11.7497H6.97657L13.5484 5.17661C13.6646 5.06053 13.7567 4.92271 13.8195 4.77102C13.8824 4.61933 13.9147 4.45674 13.9147 4.29255C13.9147 4.12835 13.8824 3.96576 13.8195 3.81407C13.7567 3.66238 13.6646 3.52456 13.5484 3.40848ZM4.85157 11.7497H2.41407V9.31223L7.66407 4.06223L10.1016 6.49973L4.85157 11.7497ZM11.1641 5.43723L8.72657 2.99973L9.87282 1.85348L12.3103 4.29098L11.1641 5.43723Z" fill="#2B4360" />
                                                    </svg>
                                                    Edit
                                                </Button>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>

                        </>
                    )}
                    {/* <MedicationPrescriptionForm setMedicalPrescription={setMedicalPrescription} setStep={setStep} setStepper={setStepper} step={step} stepper={stepper} /> */}

                    {showEditForm == true ? (
                        <MedicationPrescriptionForm editForm={editForm} setMedicalPrescription={setMedicalPrescription} setStep={setStep} setStepper={setStepper} step={step} stepper={stepper} />
                    ) : (
                        <MedicationPrescriptionForm setMedicalPrescription={setMedicalPrescription} setStep={setStep} setStepper={setStepper} step={step} stepper={stepper} />
                    )}

                </>
            )}
        </>
    )
}

export default TreatmentPlan;