'use client';
import React, { useState, useEffect, MouseEvent, useRef } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import '../style/appointments.css'
import Image from "next/image";

interface AppointmentsWeekProps {
  CalnderAppointmentsWeek?: any[];
  selectedDate?: string | null;
  setBookAppointmentModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setClickDate: React.Dispatch<React.SetStateAction<string>>;
  setClickTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function AppointmentsWeek(
  {
    CalnderAppointmentsWeek,
    selectedDate,
    setBookAppointmentModal,
    setClickDate,
    setClickTime
  }: AppointmentsWeekProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i < 19; i++) {
      const hour12 = i > 12 ? i - 12 : i;
      const ampm = i < 12 ? "AM" : "PM";
      slots.push({ time: `${hour12}:00 ${ampm}` });
      slots.push({ time: `${hour12}:30 ${ampm}` });
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  const formatTime24 = (hour: number, minutes: number) => {
    return `${hour.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  const [selectedSlot, setSelectedSlot] = useState<{ day: string; time: string } | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [weekDates, setWeekDates] = useState<Date[]>([]);
  const [highlightedDay, setHighlightedDay] = useState<string | null>(null);
  const [currentMonthYear, setCurrentMonthYear] = useState<string>('');
  const [weekDateRange, setWeekDateRange] = useState<string>('');

  const [showTooltip, setShowTooltip] = useState(true);
  const [staticLineTop, setStaticLineTop] = useState(0);

  // console.log("selectedDate", selectedDate);


  // Calculate week dates based on selected date
  useEffect(() => {
    const calculateWeekDates = (date: Date) => {
      const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Calculate offset to get Monday

      const monday = new Date(date);
      monday.setDate(date.getDate() + mondayOffset);

      const weekDates = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        weekDates.push(day);
      }
      return weekDates;
    };

    if (selectedDate) {
      const date = new Date(selectedDate);
      const dates = calculateWeekDates(date);
      setWeekDates(dates);

      // Set month and year based on selected date
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      setCurrentMonthYear(`${monthNames[date.getMonth()]} ${date.getFullYear()}`);

      // Set week date range
      if (dates.length > 0) {
        const startDate = dates[0];
        const endDate = dates[6];
        const startMonth = monthNames[startDate.getMonth()];
        const endMonth = monthNames[endDate.getMonth()];

        if (startDate.getMonth() === endDate.getMonth()) {
          setWeekDateRange(`${startDate.getDate()} - ${endDate.getDate()} ${startMonth}`);
        } else {
          setWeekDateRange(`${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth}`);
        }
      }

      // Find which day of the week the selected date is
      const selectedDayOfWeek = date.getDay();
      const dayIndex = selectedDayOfWeek === 0 ? 6 : selectedDayOfWeek - 1; // Convert to Monday-first index
      setHighlightedDay(days[dayIndex]);
    } else {
      // Default to current week
      const today = new Date();
      const dates = calculateWeekDates(today);
      setWeekDates(dates);

      // Set current month and year
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      setCurrentMonthYear(`${monthNames[today.getMonth()]} ${today.getFullYear()}`);

      // Set week date range
      if (dates.length > 0) {
        const startDate = dates[0];
        const endDate = dates[6];
        const startMonth = monthNames[startDate.getMonth()];
        const endMonth = monthNames[endDate.getMonth()];

        if (startDate.getMonth() === endDate.getMonth()) {
          setWeekDateRange(`${startDate.getDate()} - ${endDate.getDate()} ${startMonth}`);
        } else {
          setWeekDateRange(`${startDate.getDate()} ${startMonth} - ${endDate.getDate()} ${endMonth}`);
        }
      }

      setHighlightedDay(null);
    }
  }, [selectedDate]);

  // CSS datasforcss that will be applied inline
  const datasforcss = {
    eventLine: { left: '5px', right: '0', height: '1px' },
    tooltipDot: { width: '12px', height: '12px', top: '-4px', left: '-4px' },
    pingAnimation: { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }
  };

  const scheduleRef = useRef<HTMLDivElement>(null);
  const timeColumnRef = useRef<HTMLDivElement>(null);



  // const handleClick = (e: MouseEvent<HTMLDivElement>) => {
  //   console.log("click");

  //   // setClickTime(formatTime24(date.getHours(), date.getMinutes()));
  //   setClickDate(selectedDate || "")
  //   setBookAppointmentModal?.(true)
  // };

  const to24Hour = (time12h: string) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");
  let h = parseInt(hours, 10);

  if (modifier === "PM" && h !== 12) h += 12;
  if (modifier === "AM" && h === 12) h = 0;

  return `${String(h).padStart(2, "0")}:${minutes}`;
};

  const handleClick = (time: string) => {
    console.log("click", time);

     const time24 = to24Hour(time);  // convert before setting

  console.log("click", time, "=>", time24);

  setClickTime(time24);

    setClickTime(time24);
    setClickDate(selectedDate || "");
    setBookAppointmentModal?.(true);
  };


  const [multiPatientShow, setMultiPatientShow] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setMultiPatientShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // console.log("times" , times);

  //   const getTimeSlot = (time: string) => {
  //   let [hh, mm] = time.split(":").map(Number);

  //   if (hh < 8) hh += 12;

  //   const minutes = mm < 15 ? 0 : mm < 45 ? 30 : 0;

  //   return `${hh.toString().padStart(2, "0")}:${minutes === 0 ? "00" : "30"}`;
  // };

  // const groupedAppointments = React.useMemo(() => {
  //   const groups: Record<string, Record<string, any[]>> = {};

  //   CalnderAppointmentsWeek?.forEach(appt => {
  //     const date = appt.appointmentDate;            // "11 Nov 2025"
  //     const slot = getTimeSlot(appt.appointmentTime); // "10:00"

  //     if (!groups[date]) groups[date] = {};
  //     if (!groups[date][slot]) groups[date][slot] = [];

  //     groups[date][slot].push(appt);
  //   });

  //   return groups;
  // }, [CalnderAppointmentsWeek]);

  // const getTimeSlot = (time: string) => {
  //   let [hh, mm] = time.split(":").map(Number);

  //   // Convert 1 to 7 → afternoon (13-19)
  //   if (hh >= 1 && hh <= 7) hh += 12;

  //   let minutes = 0;
  //   if (mm >= 15 && mm < 45) minutes = 30;

  //   return `${hh.toString().padStart(2, "0")}:${minutes === 0 ? "00" : "30"}`;
  // };

  const getTimeSlot = (time: string) => {
    let [hh, mm] = time.split(":").map(Number);

    // Slot minutes: 00–29 → 00, 30–59 → 30
    const mins = mm < 30 ? "00" : "30";

    return `${hh.toString().padStart(2, "0")}:${mins}`;
  };
  const groupedAppointments = React.useMemo(() => {
    const groups: Record<string, Record<string, any[]>> = {};

    CalnderAppointmentsWeek?.forEach((appt) => {
      const date = appt.date;                // "11 Nov 2025"
      const slot = getTimeSlot(appt.time);   // "09:00", "09:30"

      if (!groups[date]) groups[date] = {};
      if (!groups[date][slot]) groups[date][slot] = [];

      groups[date][slot].push(appt);
    });

    return groups;
  }, [CalnderAppointmentsWeek]);


  // const groupedAppointments = React.useMemo(() => {
  //   const groups: Record<string, Record<string, any[]>> = {};

  //   CalnderAppointmentsWeek?.map(appt => {
  //     const date = appt.date;
  //     const slot = getTimeSlot(appt.time);

  //     if (!groups[date]) groups[date] = {};
  //     if (!groups[date][slot]) groups[date][slot] = [];

  //     groups[date][slot].push(appt);
  //   });

  //   return groups;
  // }, [CalnderAppointmentsWeek]);

  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).replace(/ /g, " ");


  return (
    <div className="container mt-3">
      <div className="border rounded shadow-sm bg-white aw-card">
        <div className="aw-scroll">
          {/* Header (sticky) */}
          <div className="row border-bottom text-center fw-semibold text-muted small aw-header">
            <div className="col-2 border-end d-flex align-items-center justify-content-center aw-time-header aw-sticky-col">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg" className="header-icon-day-color"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <div className="col p-0">
              <div className="row g-0 flex-nowrap aw-days-row text-center">
                {days.map((day, i) => {
                  const isHighlighted = highlightedDay === day;
                  const currentDate = weekDates[i];
                  const dateNumber = currentDate ? currentDate.getDate() : i + 1;

                  return (
                    <div className="aw-day-col py-3 border-end" key={day}>
                      <div className={isHighlighted ? "day-text-color " : ""}>{day}</div>
                      <div className={`mt-1 mx-auto rounded-circle d-flex align-items-center justify-content-center aw-date-circle ${isHighlighted ? 'aw-date-circle-active' : 'text-secondary'}`}>
                        {dateNumber < 10 ? `0${dateNumber}` : dateNumber}

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Body (scrolls vertically & horizontally together) */}
          <div className="row aw-body">
            {/* Time Column (sticky left) */}
            <div className="col-2 border-end text-center small text-muted p-0 aw-time-col aw-sticky-col">
              {timeSlots.map((time, i) => (
                <div key={i} className="border-bottom appointments-week-time time-cell">{time.time}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="col p-0">
              <div className="row g-0 flex-nowrap position-relative overflow-auto">
                {days.map((day) => (
                  <div className="aw-day-col border-end p-0" key={day}>
                    {timeSlots.map((item) => (

                      // <div
                      //   className="border-bottom aw-slot"
                      //   onClick={() => {

                      //   }}
                      // >
                      //   <span>data</span>

                      // </div>

                      <div className="border-bottom aw-slot position-relative d-flex flex-wrap" onClick={() => handleClick(item.time)}>

                        {(() => {
                          const dayIndex = days.indexOf(day);
                          const currentDate = weekDates[dayIndex];
                          if (!currentDate) return null;

                          const dateString = formatDate(currentDate); // "11 Nov 2025"

                          // 24hr slot for grouping
                          const time24 = getTimeSlot(item.time.replace(" AM", "").replace(" PM", ""));

                          // appointments of this day + this exact time slot
                          const slotAppointments =
                            groupedAppointments[dateString]?.[time24] || []; // method for replace data

                          if (slotAppointments.length === 0) return null;

                          // show only first 2 appointments
                          const visible = slotAppointments.slice(0, 3);

                          return (
                            <>
                              {visible.map((appt, i) => {
                                if (slotAppointments.length > 3 && i >= 2) {
                                  const extradata = slotAppointments.slice(3)
                                  console.log("true");

                                  return (
                                    <div className="p-1 w-100" key={`extra-${i}`}>
                                      <div className="appointment-box d-flex align-items-center gap-3 " >
                                        <div className='position-relative'    >
                                          <div className='d-flex position-relative cursor-pointer-custom' onClick={() => { setMultiPatientShow(true) }} >
                                            <Image
                                              src={extradata[0].patient.profileImage}
                                              alt={extradata[0].patient.name}
                                              width={20}
                                              height={20}
                                              className="rounded-circle"
                                            />
                                            <Image
                                              src={extradata[1]?.patient.profileImage}
                                              alt={extradata[1]?.patient.name}
                                              width={20}
                                              height={20}
                                              className="rounded-circle position-absolute start-50"
                                            />

                                            {multiPatientShow && (
                                              <div ref={boxRef} className='position-absolute multi-patient-show-box'>
                                                <div className='d-flex flex-wrap'>
                                                  {extradata.map((appt: any, i: any) => {
                                                    const isLastOdd =
                                                      extradata.length % 2 !== 0 && i === extradata.length - 1;
                                                    return (

                                                      <div className={`${isLastOdd ? "col-12" : "col-6"} p-1`} key={i}>
                                                        <div className="appointment-box ">
                                                          <div className="d-flex align-items-center text-nowrap">
                                                            <Image
                                                              src={appt.patient.profileImage}
                                                              alt={appt.patient.name}
                                                              width={20}
                                                              height={20}
                                                              className="rounded-1 me-2"
                                                            />
                                                            <div className='d-flex flex-column'>
                                                              <span className="patient-calendar-modal-subtitle">{appt.patient.name}</span>
                                                              <div className='d-flex align-items-center gap-1'>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                                                  <path d="M8.875 1.5C7.58942 1.5 6.33272 1.88122 5.2638 2.59545C4.19488 3.30968 3.36176 4.32484 2.86979 5.51256C2.37782 6.70028 2.24909 8.00721 2.4999 9.26809C2.7507 10.529 3.36977 11.6872 4.27881 12.5962C5.18785 13.5052 6.34604 14.1243 7.60692 14.3751C8.86779 14.6259 10.1747 14.4972 11.3624 14.0052C12.5502 13.5132 13.5653 12.6801 14.2796 11.6112C14.9938 10.5423 15.375 9.28558 15.375 8C15.3732 6.27665 14.6878 4.62441 13.4692 3.40582C12.2506 2.18722 10.5984 1.50182 8.875 1.5ZM8.875 13.5C7.78721 13.5 6.72384 13.1774 5.81937 12.5731C4.9149 11.9687 4.20995 11.1098 3.79367 10.1048C3.37738 9.09977 3.26847 7.9939 3.48068 6.927C3.6929 5.86011 4.21673 4.8801 4.98592 4.11091C5.7551 3.34172 6.73511 2.8179 7.80201 2.60568C8.8689 2.39346 9.97477 2.50238 10.9798 2.91866C11.9848 3.33494 12.8437 4.03989 13.4481 4.94436C14.0524 5.84883 14.375 6.9122 14.375 8C14.3733 9.45818 13.7934 10.8562 12.7623 11.8873C11.7312 12.9184 10.3332 13.4983 8.875 13.5ZM12.875 8C12.875 8.13261 12.8223 8.25979 12.7286 8.35355C12.6348 8.44732 12.5076 8.5 12.375 8.5H8.875C8.74239 8.5 8.61522 8.44732 8.52145 8.35355C8.42768 8.25979 8.375 8.13261 8.375 8V4.5C8.375 4.36739 8.42768 4.24021 8.52145 4.14645C8.61522 4.05268 8.74239 4 8.875 4C9.00761 4 9.13479 4.05268 9.22856 4.14645C9.32232 4.24021 9.375 4.36739 9.375 4.5V7.5H12.375C12.5076 7.5 12.6348 7.55268 12.7286 7.64645C12.8223 7.74021 12.875 7.86739 12.875 8Z" fill="#8A8D93" />
                                                                </svg>
                                                                <span className="appointment-reschedule-profile-schedule-detail">
                                                                  {appt.time}
                                                                </span>
                                                                {/* <span className="appointment-reschedule-profile-schedule-detail">
                                                            {`${slot.time} - ${timeSlots[slotIndex + 1] ? timeSlots[slotIndex + 1].time : toNextTime(slot.time)}`}
                                                          </span> */}
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className="d-flex align-items-center gap-1 mt-3">
                                                            {appt.reason.slice(0, 1).map((item: string, index: number) => (
                                                              <span
                                                                key={index}
                                                                className="appointment-reason-vist-box appointment-reason-vist-box-content"
                                                              >
                                                                {item}
                                                              </span>
                                                            ))}
                                                            {appt.reason.length > 1 && (
                                                              <span className="patient-calendar-modal-subtitle">
                                                                +{appt.reason.length - 1}
                                                              </span>
                                                            )}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              </div>

                                            )}
                                          </div>
                                        </div>

                                        <span className="patient-calendar-modal-subtitle">
                                          +{extradata.length}
                                        </span>
                                      </div>

                                    </div>
                                  );
                                }
                                else {
                                  return (
                                    <div className={`p-1 w-100`}

                                      key={i}>
                                      <div className="appointment-box">
                                        <div className="d-flex align-items-center">
                                          <Image
                                            src={appt.patient.profileImage}
                                            alt={appt.patient.name}
                                            width={20}
                                            height={20}
                                            className="rounded-1 me-2"
                                          />
                                          <div className='d-flex flex-column'>
                                            <div className="appoiment-patient-wprap">
                                              <span className="patient-calendar-modal-subtitle  ">{appt.patient.name}</span>
                                            </div>

                                          </div>
                                        </div>
                                        {visible.length == 1 && (
                                          <div className='d-flex align-items-center gap-1 mt-1'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                                              <path d="M8.875 1.5C7.58942 1.5 6.33272 1.88122 5.2638 2.59545C4.19488 3.30968 3.36176 4.32484 2.86979 5.51256C2.37782 6.70028 2.24909 8.00721 2.4999 9.26809C2.7507 10.529 3.36977 11.6872 4.27881 12.5962C5.18785 13.5052 6.34604 14.1243 7.60692 14.3751C8.86779 14.6259 10.1747 14.4972 11.3624 14.0052C12.5502 13.5132 13.5653 12.6801 14.2796 11.6112C14.9938 10.5423 15.375 9.28558 15.375 8C15.3732 6.27665 14.6878 4.62441 13.4692 3.40582C12.2506 2.18722 10.5984 1.50182 8.875 1.5ZM8.875 13.5C7.78721 13.5 6.72384 13.1774 5.81937 12.5731C4.9149 11.9687 4.20995 11.1098 3.79367 10.1048C3.37738 9.09977 3.26847 7.9939 3.48068 6.927C3.6929 5.86011 4.21673 4.8801 4.98592 4.11091C5.7551 3.34172 6.73511 2.8179 7.80201 2.60568C8.8689 2.39346 9.97477 2.50238 10.9798 2.91866C11.9848 3.33494 12.8437 4.03989 13.4481 4.94436C14.0524 5.84883 14.375 6.9122 14.375 8C14.3733 9.45818 13.7934 10.8562 12.7623 11.8873C11.7312 12.9184 10.3332 13.4983 8.875 13.5ZM12.875 8C12.875 8.13261 12.8223 8.25979 12.7286 8.35355C12.6348 8.44732 12.5076 8.5 12.375 8.5H8.875C8.74239 8.5 8.61522 8.44732 8.52145 8.35355C8.42768 8.25979 8.375 8.13261 8.375 8V4.5C8.375 4.36739 8.42768 4.24021 8.52145 4.14645C8.61522 4.05268 8.74239 4 8.875 4C9.00761 4 9.13479 4.05268 9.22856 4.14645C9.32232 4.24021 9.375 4.36739 9.375 4.5V7.5H12.375C12.5076 7.5 12.6348 7.55268 12.7286 7.64645C12.8223 7.74021 12.875 7.86739 12.875 8Z" fill="#8A8D93" />
                                            </svg>

                                            <span className="appointment-reschedule-profile-schedule-detail">
                                              {appt.time}
                                            </span>


                                          </div>
                                        )}

                                        {visible.length == 1 && (
                                          <div className="d-flex flex-wrap align-items-center gap-1 mt-1">

                                            {appt.reason.slice(0, 2).map((item: string, index: number) => (
                                              <>
                                                <div
                                                  key={index}
                                                  className="appointment-reason-vist-box appointment-reason-vist-box-content "
                                                >
                                                  <span className="appointment-reason-vist-box-wrap">
                                                    {item}
                                                  </span>
                                                </div>

                                              </>
                                            ))}

                                            {appt.reason.length > 2 && (
                                              <span className="patient-calendar-modal-subtitle">
                                                +{appt.reason.length - 2}
                                              </span>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )
                                }

                              }
                              )}

                              {/* {extra > 0 && (
                                <div className="small fw-semibold text-primary">
                                  +{extra}
                                </div>
                              )} */}

                            </>
                          );

                        })()}

                      </div>



                    ))}
                  </div>
                ))}


                {(showTooltip && CalnderAppointmentsWeek?.length) == 0 && (
                  <div className="position-absolute tooltipCustom-week" >
                    <div className="position-absolute get-started-dot-bg-color rounded-circle" style={{ ...datasforcss.tooltipDot, ...datasforcss.pingAnimation }}></div>
                    <div className="position-absolute get-started-dot-bg-color rounded-circle tooltipDot" ></div>
                    <div className=' get-started-box position-absolute'>
                      <p className="appointments-total-box-item">Get started by clicking anywhere<br />on the calendar to add your first<br />appointment</p>
                      <span onClick={() => setShowTooltip(false)} className="appointments-day-ok">OK, GOT IT!</span>
                    </div>
                  </div>
                )}
                {/* {showTooltip && (
                  <div
                    className="position-absolute get-started-dot-bg-color"
                    style={{ ...datasforcss.eventLine, top: `${staticLineTop}px` }}
                  >
                    <div className="get-started-dot-bg-color rounded-circle position-absolute eventDot-days-colum"></div>
                  </div>

                )} */}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
