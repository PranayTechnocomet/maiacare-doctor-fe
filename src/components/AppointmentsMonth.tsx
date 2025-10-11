import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
type AppointmentDay = {
  date: string; // e.g. "2025-10-10"
  names: string[]; // list of names for that date
};

type AppointmentsMonthProps = {
  appointmentsData?: AppointmentDay[]; // optional: if not passed, demo data will be used
};

function AppointmentsMonth({ appointmentsData }: AppointmentsMonthProps) {
    const [showTooltip, setShowTooltip] = useState(false);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    const handleDateClick = (arg: any) => {
        const clickedDate = arg.dateStr;
        setSelectedDate(clickedDate === selectedDate ? null : clickedDate);
      };

    // Demo fallback data if none passed via props
    const fallbackData: AppointmentDay[] = [
      { date: '2025-10-10', names: ['Riya Kapoor', 'Ananya Sharma', 'Riya Kapoor'] },
      { date: '2025-10-12', names: ['Aarav Mehta', 'Sara Khan'] },
    ];

    const source = appointmentsData && appointmentsData.length ? appointmentsData : fallbackData;

    // Transform JSON to FullCalendar events
    const events = source.flatMap((d) =>
      d.names.map((n, idx) => ({
        title: n,
        start: d.date,
        allDay: true,
        // class for styling the pill
        classNames: ['appt-pill'],
        // unique id to avoid key collisions in FC internals
        id: `${d.date}-${idx}`,
        // ensure these show as individual stacked blocks
        display: 'block',
      }))
    );
    return (
        <>
            {/* <div className='custom-month-datepicker'>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                />
            </div> */}

            {/* <div className="custom-month-datepicker">
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
            </div> */}

            {/* <div className="custom-month-datepicker">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    // dateClick={handleDateClick}
                    height="auto" // ✅ important: prevents inner scroll
                    contentHeight="auto"
                    dayCellContent={(arg) => {
                        const date = arg.date;
                        const day = date.getDate();
                        const monthName = date.toLocaleString("default", { month: "long" });

                        // ✅ If it's the first day of the month, show month name too
                        if (day === 1) {
                            return {
                                html: `<div style="font-weight: bold;">${day} <span style="font-size: 0.75rem; color: #f57c00;">${monthName}</span></div>`,
                            };
                        }

                        // Otherwise, just show the date
                        return { html: `${day}` };
                    }}
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
            </div> */}

            {/* <div className="custom-month-datepicker position-relative">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    height="auto" // ✅ prevents inner scroll
                    contentHeight="auto"
                    dayCellContent={(arg) => {
                        const date = arg.date;
                        const day = date.getDate();
                        const monthAbbr = date
                            .toLocaleString("default", { month: "short" })
                            .replace(".", ""); // ensures e.g., 'Nov' not 'Nov.'

                        // ✅ Show "Nov 1" format on the first day of the month
                        if (day === 1) {
                            return {
                                html: `<div style="font-size: 0.85rem; color: #6c757d; font-weight: 500;">
                      ${monthAbbr} ${day}
                    </div>`,
                            };
                        }

                        // Otherwise, show only the day number
                        return {
                            html: `<div style="font-size: 0.85rem; color: #6c757d;">${day}</div>`,
                        };
                    }}
                />

                {showTooltip && (
                    <div
                        className="calendar-tooltip"
                        style={{
                            position: "absolute",
                            top: tooltipPos.top + 10,
                            left: tooltipPos.left - 120,
                            background: "#fff",
                            border: "1px solid #ddd",
                            borderRadius: "6px",
                            padding: "10px 12px",
                            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                            width: "250px",
                            zIndex: 10,
                        }}
                    >
                        <p style={{ margin: 0, fontSize: "0.85rem", color: "#555" }}>
                            Get started by clicking anywhere on the calendar to add your first appointment
                        </p>
                        <span
                            style={{
                                display: "block",
                                textAlign: "right",
                                marginTop: "6px",
                                color: "#f57c00",
                                fontWeight: "600",
                                cursor: "pointer",
                            }}
                            onClick={() => setShowTooltip(false)}
                        >
                            OK. GOT IT!
                        </span>
                    </div>
                )}
            </div> */}


            <div className="custom-month-datepicker">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    selectable={true}
                    dateClick={handleDateClick}
                    height="auto"
                    contentHeight="auto"
                    dayMaxEventRows={4}
                    events={events}
                    eventContent={(arg) => {
                        // Render pill like: <div class="pill">Name</div>
                        const title = arg.event.title || '';
                        return {
                            html: `<div class="pill pill-soft">${title}</div>`,
                        };
                    }}
                    dayCellContent={(arg) => {
                        const date = arg.date;
                        const day = date.getDate();
                        const monthAbbr = date
                            .toLocaleString("default", { month: "short" })
                            .replace(".", "");

                        const y = date.getFullYear();
                        const m = String(date.getMonth() + 1).padStart(2, "0");
                        const dStr = String(date.getDate()).padStart(2, "0");
                        const cellDate = `${y}-${m}-${dStr}`; 
                        const isSelected = selectedDate === cellDate;

                        
                        if (day === 1) {
                            return {
                                html: `
                <div style="display: flex; flex-direction: column; align-items: center;">
                  <div style="font-size: 0.85rem; color: #6c757d;">
                    ${monthAbbr} ${day}
                  </div>
                  ${isSelected ? '<div class="dot "></div>' : ""}
                </div>
              `,
                            };
                        }

                        return {
                            html: `
              <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="font-size: 0.85rem; color: #6c757d;">${day}</div>
                ${isSelected ? '<div class="dot"></div>' : ""}
              </div>
            `,
                        };
                    }}
                />
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
