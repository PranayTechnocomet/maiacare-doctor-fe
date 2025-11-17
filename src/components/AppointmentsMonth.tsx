import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction";
import { AppointmentsMonthData } from '@/utils/StaticData';
type AppointmentDay = {
  date: string; // e.g. "2025-10-10"
  names: string[]; // list of names for that date
};

type AppointmentsMonthProps = {
  appointmentsData?: AppointmentDay[]; // optional: if not passed, demo data will be used
  selectedDate?: string | null; // selected date from DateCalendar
  AppointmentsMonthShow: any[];
  setBookAppointmentModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setClickDate?: React.Dispatch<React.SetStateAction<string>>;
};

function AppointmentsMonth({ appointmentsData,
  selectedDate: externalSelectedDate,
  AppointmentsMonthShow,
  setBookAppointmentModal,
  setClickDate,

}: AppointmentsMonthProps) {
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const [showTooltip, setShowTooltip] = useState(true);


  // CSS datasforcss that will be applied inline
  const datasforcss = {
    eventLine: { left: '5px', right: '0', height: '1px' },
    tooltipDot: { width: '12px', height: '12px', top: '-4px', left: '-4px' },
    pingAnimation: { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }
  };

  // Sync external selected date with internal state and navigate to month
  useEffect(() => {
    if (externalSelectedDate) {
      setSelectedDate(externalSelectedDate);

      // Navigate FullCalendar to the selected month
      if (calendarRef.current) {
        const calendarApi = calendarRef.current.getApi();
        const selectedDateObj = new Date(externalSelectedDate);
        calendarApi.gotoDate(selectedDateObj);
      }
    }
  }, [externalSelectedDate]);


  // Convert JSON → FullCalendar events
  const events = AppointmentsMonthShow?.map((item) => {
    const parsedDate = new Date(item.date);
    const y = parsedDate.getFullYear();
    const m = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const d = String(parsedDate.getDate()).padStart(2, "0");

    return {
      id: item.id,
      title: item.patient.name,
      date: `${y}-${m}-${d}`,
    };
  });

  const handleDateClick = (fullDate: string) => {
    // console.log("click date is : ", fullDate);

    setClickDate?.(fullDate)
    setBookAppointmentModal?.(true)
    setShowTooltip(false);

  }

  return (
    <>

      <div className="custom-month-datepicker ">
        <div className="calendar-wrapper position-relative">
          {showTooltip && AppointmentsMonthShow.length === 0 && (
            <div className="position-absolute tooltipCustom">
              <div
                className="position-absolute get-started-dot-bg-color rounded-circle"
                style={{ ...datasforcss.tooltipDot, ...datasforcss.pingAnimation }}
              ></div>

              <div className="position-absolute get-started-dot-bg-color rounded-circle tooltipDot"></div>

              <div className="get-started-box position-absolute">
                <p className="appointments-total-box-item">
                  Get started by clicking anywhere<br />
                  on the calendar to add your first<br />
                  appointment
                </p>

                <span
                  onClick={() => setShowTooltip(false)}
                  className="appointments-day-ok cursor-pointer-custom"
                >
                  OK, GOT IT!
                </span>
              </div>
            </div>
          )}


          {/* <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              firstDay={1} // Monday

              height="auto"
              contentHeight="auto"
              events={events}

              // Inject custom names into each day cell
              dayCellDidMount={(info) => {
                const cellDate = info.date;
                const y = cellDate.getFullYear();
                const m = String(cellDate.getMonth() + 1).padStart(2, "0");
                const d = String(cellDate.getDate()).padStart(2, "0");
                const fullDate = `${y}-${m}-${d}`;

                const todaysEvents = events.filter((ev) => ev.date === fullDate);

                if (todaysEvents.length > 0) {
                  const container = document.createElement("div");
                  container.style.marginTop = "4px";
                  container.style.display = "flex";
                  container.style.flexDirection = "column";
                  container.style.gap = "3px";

                  todaysEvents.forEach((ev) => {
                    const item = document.createElement("div");
                    item.textContent = ev.title;
                    item.style.background = "#E6F3F2";
                    item.style.padding = "4px 6px";
                    item.style.borderRadius = "48px";
                    item.style.fontSize = "12px";
                    item.style.color = "#292929";
                    container.appendChild(item);
                  });

                  const frame = info.el.querySelector(".fc-daygrid-day-frame");
                  frame?.appendChild(container);
                }
              }}

              // Custom date format for 1st of month
              dayCellContent={(arg) => {
                const date = arg.date;
                const day = date.getDate();
                const monthAbbr = date
                  .toLocaleString("default", { month: "short" })
                  .replace(".", "");

                if (day === 1) {
                  return {
                    html: `
                  <div style="display:flex; flex-direction:column; align-items:center;">
                    <div style="font-size:0.85rem; color:#6c757d;">
                      ${monthAbbr} ${day}
                    </div>
                  </div>
                `,
                  };
                }

                return {
                  html: `
                <div style="display:flex; flex-direction:column; align-items:center;">
                  <div style="font-size:0.85rem; color:#6c757d;">${day}</div>
                </div>
              `,
                };
              }}
            /> */}

          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            firstDay={1} // Monday
            height="auto"
            contentHeight="auto"
            events={events}

            dateClick={(info) => {
              const date = info.date;
              const y = date.getFullYear();
              const m = String(date.getMonth() + 1).padStart(2, "0");
              const d = String(date.getDate()).padStart(2, "0");
              const fullDate = `${y}-${m}-${d}`;

              // call your logic
              handleDateClick(fullDate);
            }}

            // Inject custom names into each day cell
            dayCellDidMount={(info) => {
              const cellDate = info.date;
              const y = cellDate.getFullYear();
              const m = String(cellDate.getMonth() + 1).padStart(2, "0");
              const d = String(cellDate.getDate()).padStart(2, "0");
              const fullDate = `${y}-${m}-${d}`;

              const todaysEvents = AppointmentsMonthShow.filter((item) => {
                const pd = new Date(item.date);
                const py = pd.getFullYear();
                const pm = String(pd.getMonth() + 1).padStart(2, "0");
                const pdStr = String(pd.getDate()).padStart(2, "0");
                return `${py}-${pm}-${pdStr}` === fullDate;
              });

              // if (todaysEvents.length > 0) {
              //   const container = document.createElement("div");
              //   container.className = "appt-container";

              //   // show first 4
              //   const visible = todaysEvents.slice(0, 4);

              //   visible.forEach((ev) => {
              //     const item = document.createElement("div");
              //     item.className = "appt-item";
              //     item.textContent = ev.patient.name;
              //     container.appendChild(item);
              //   });

              //   // "+X more"
              //   if (todaysEvents.length > 4) {
              //     const extra = todaysEvents.length - 4;
              //     const more = document.createElement("div");
              //     more.className = "more-count";
              //     more.textContent = `+${extra} more…`;
              //     container.appendChild(more);
              //   }

              //   const bottom = info.el.querySelector(".fc-daygrid-day-bottom");
              //   if (bottom) bottom.appendChild(container);
              // }

              if (todaysEvents.length > 0) {
                const container = document.createElement("div");
                container.className = "appt-container";

                // CASE 1: 1–4 items → show all normally
                if (todaysEvents.length <= 4) {
                  todaysEvents.forEach((ev) => {
                    const item = document.createElement("div");
                    item.className = "appt-item"; // normal box
                    item.textContent = ev.patient.name;
                    container.appendChild(item);
                  });
                }

                // CASE 2: 5+ → show 1,2,3 then 4th box = +N more…
                else {
                  const firstThree = todaysEvents.slice(0, 3);

                  firstThree.forEach((ev) => {
                    const item = document.createElement("div");
                    item.className = "appt-item"; // normal box
                    item.textContent = ev.patient.name;
                    container.appendChild(item);
                  });

                  const extra = todaysEvents.length - 3;

                  const more = document.createElement("div");
                  more.className = "appt-item more-count"; // same box design + extra class
                  more.textContent = `+${extra} more…`;
                  container.appendChild(more);
                }

                const bottom = info.el.querySelector(".fc-daygrid-day-bottom");
                if (bottom) bottom.appendChild(container);
              }
            }}

            // Custom date format for 1st of month
            dayCellContent={(arg) => {
              const date = arg.date;
              const day = date.getDate();
              const monthAbbr = date
                .toLocaleString("default", { month: "short" })
                .replace(".", "");

              if (day === 1) {
                return {
                  html: `
                    <div className="d-flex flex-column align-items-center">
                    <div className="appointment-details-invoice-title">
                      ${monthAbbr} ${day}
                    </div>
                  </div>
                `,
                };
              }

              return {
                html: `
                <div className="d-flex flex-column align-items-center">
                  <div className="appointment-details-invoice-title" >${day}</div>
                </div>
              `,
              };
            }}
          />

        </div>
      </div>
    </>
  )
}

export default AppointmentsMonth
