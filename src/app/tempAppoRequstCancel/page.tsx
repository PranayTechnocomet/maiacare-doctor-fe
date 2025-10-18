"use client"

import {  AppointmentRequestCancelModel, BookAppointmentModal } from "@/components/TempAppoRequstCancelModel"
import '../../style/Appointment.css'

function page() {
    return (
        <>
            {/* <AppointmentRequestCancelModel /> */}
            <div className="mt-3">

                <BookAppointmentModal />
            </div>
        </>
    )
}

export default page 