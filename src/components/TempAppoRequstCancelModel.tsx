"use client"

import { useState } from "react";
import Button from "./ui/Button"
import Modal from "./ui/Modal";
import { RescheduleAppointment } from "./form/RescheduleAppointment";
import CancelAppointment from "./form/CancelAppointment";
import AppointmentProfile from "./ui/Custom/AppointmentProfile";
import { tempAppointmentProfileData } from "@/utils/StaticData";

function TempAppoRequstCancelModel() {

    const [RescheduleModal, setRescheduleModal] = useState(false);
    const [CancelModal, setCancelModal] = useState(false);

    return (
        <>

            {/* <h1>TempAppoRequstCancelModel</h1> */}
            <div className="d-flex gap-5">

                <Button onClick={() => setRescheduleModal(true)}>Reschedule Appointment</Button>
                <Button onClick={() => setCancelModal(true)}>Cancel Appointment</Button>
            </div>

            <div>
                <Modal
                    show={RescheduleModal}
                    onHide={() => setRescheduleModal(false)}
                    header="Request to Reschedule Appointment"
                    closeButton={true}
                >
                    <RescheduleAppointment />
                </Modal>
            </div>

            <div>
                <Modal
                    show={CancelModal}
                    onHide={() => setCancelModal(false)}
                    header="Request to Cancel Appointment"
                    closeButton={true}
                >
                    <CancelAppointment />
                </Modal>
            </div>
        </>
    )
}

export default TempAppoRequstCancelModel

