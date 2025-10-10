import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
function AppointmentsMonth() {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });

    
    return (
        <>
            {/* <div className='custom-month-datepicker'>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />
            </div> */}

            <div className="custom-month-datepicker">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    
                    selectable={true}
                />

                {showTooltip && (
                    <div
                        className="calendar-tooltip"
                        style={{
                            top: tooltipPos.top + 10,
                            left: tooltipPos.left - 120,
                        }}
                    >
                        <p>Get started by clicking anywhere on the calendar to add your first appointment</p>
                        <span onClick={() => setShowTooltip(false)}>OK. GOT IT!</span>
                    </div>
                )}
            </div>
        </>
    )
}

export default AppointmentsMonth



// import React from 'react'
// import FullCalendar from "@fullcalendar/react";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";


// export default function AppointmentsMonth() {
//     return (
//         <>
//             <div>
//                 <div
//                     className="calendar-container"
//                     style={{
//                         maxWidth: "600px",
//                         margin: "2rem auto",
//                         background: "#fff",
//                         borderRadius: "16px",
//                         boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//                         padding: "1rem",
//                     }}
//                 >
//                     <FullCalendar
//                         plugins={[timeGridPlugin, interactionPlugin]}
//                         initialView="timeGridDay"
//                         slotMinTime="08:00:00"
//                         slotMaxTime="18:00:00"
//                         slotDuration="00:30:00"
//                         allDaySlot={false}
//                         headerToolbar={false}
//                         nowIndicator={true}
//                         selectable={true}
//                         selectMirror={true}

//                         events={[
//                             { title: "Morning Meeting", start: "2025-10-10T10:30:00" },
//                             { title: "Lunch Break", start: "2025-10-10T12:30:00" },
//                         ]}
//                     />
//                 </div>
//             </div>
//         </>
//     )
// }
