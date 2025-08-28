import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import ContentContainer from './ui/ContentContainer';
import CustomTabs from './ui/CustomTabs';
import { Badge, Card, Col, Form, Nav, Row, Tab } from 'react-bootstrap';
import Button from './ui/Button';
import '../style/temp.css'


// Multi-Select DatePicker Component
const MultiSelectDatePicker: React.FC = () => {

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2024, 10)); // November 2024
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [lastSelectedDate, setLastSelectedDate] = useState<Date | null>(null);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);





  // Navigation functions
  const navigateMonth = (direction: number): void => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };




  return (
    <div className="card border-0 shadow-sm">
      {/* Calendar Header */}
      <div className="card-header bg-light border-0">
        <div className="d-flex justify-content-between align-items-center">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigateMonth(-1)}
          >
            ◀
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigateMonth(1)}
          >
            ▶
          </button>
        </div>
      </div>


    </div>
  );
};

export default function DoctorListing() {
  const [activeTab, setActiveTab] = useState<string>("calander");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);



  const tabOptions = [
    {
      key: "calander",
      label: (
        <div className='d-flex gap-2'>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.5 10C17.5 10.1658 17.4342 10.3247 17.3169 10.4419C17.1997 10.5592 17.0408 10.625 16.875 10.625H3.125C2.95924 10.625 2.80027 10.5592 2.68306 10.4419C2.56585 10.3247 2.5 10.1658 2.5 10C2.5 9.83424 2.56585 9.67527 2.68306 9.55806C2.80027 9.44085 2.95924 9.375 3.125 9.375H16.875C17.0408 9.375 17.1997 9.44085 17.3169 9.55806C17.4342 9.67527 17.5 9.83424 17.5 10ZM3.125 5.625H16.875C17.0408 5.625 17.1997 5.55915 17.3169 5.44194C17.4342 5.32473 17.5 5.16576 17.5 5C17.5 4.83424 17.4342 4.67527 17.3169 4.55806C17.1997 4.44085 17.0408 4.375 16.875 4.375H3.125C2.95924 4.375 2.80027 4.44085 2.68306 4.55806C2.56585 4.67527 2.5 4.83424 2.5 5C2.5 5.16576 2.56585 5.32473 2.68306 5.44194C2.80027 5.55915 2.95924 5.625 3.125 5.625ZM16.875 14.375H3.125C2.95924 14.375 2.80027 14.4408 2.68306 14.5581C2.56585 14.6753 2.5 14.8342 2.5 15C2.5 15.1658 2.56585 15.3247 2.68306 15.4419C2.80027 15.5592 2.95924 15.625 3.125 15.625H16.875C17.0408 15.625 17.1997 15.5592 17.3169 15.4419C17.4342 15.3247 17.5 15.1658 17.5 15C17.5 14.8342 17.4342 14.6753 17.3169 14.5581C17.1997 14.4408 17.0408 14.375 16.875 14.375Z" fill="#3E4A57" />
          </svg>


          <p className='m-0'>Calendar View</p>
        </div>
      ),
      content: (
        <CalendarView />
      ),
    },
    {
      key: "list",
      label: (
        <div className='d-flex gap-2'>
          <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.25 2.1875H12.6875V1.875C12.6875 1.62636 12.5887 1.3879 12.4129 1.21209C12.2371 1.03627 11.9986 0.9375 11.75 0.9375C11.5014 0.9375 11.2629 1.03627 11.0871 1.21209C10.9113 1.3879 10.8125 1.62636 10.8125 1.875V2.1875H5.1875V1.875C5.1875 1.62636 5.08873 1.3879 4.91291 1.21209C4.7371 1.03627 4.49864 0.9375 4.25 0.9375C4.00136 0.9375 3.7629 1.03627 3.58709 1.21209C3.41127 1.3879 3.3125 1.62636 3.3125 1.875V2.1875H1.75C1.3356 2.1875 0.938171 2.35212 0.645146 2.64515C0.35212 2.93817 0.1875 3.3356 0.1875 3.75V16.25C0.1875 16.6644 0.35212 17.0618 0.645146 17.3549C0.938171 17.6479 1.3356 17.8125 1.75 17.8125H14.25C14.6644 17.8125 15.0618 17.6479 15.3549 17.3549C15.6479 17.0618 15.8125 16.6644 15.8125 16.25V3.75C15.8125 3.3356 15.6479 2.93817 15.3549 2.64515C15.0618 2.35212 14.6644 2.1875 14.25 2.1875ZM3.3125 4.0625C3.3125 4.31114 3.41127 4.5496 3.58709 4.72541C3.7629 4.90123 4.00136 5 4.25 5C4.49864 5 4.7371 4.90123 4.91291 4.72541C5.08873 4.5496 5.1875 4.31114 5.1875 4.0625H10.8125C10.8125 4.31114 10.9113 4.5496 11.0871 4.72541C11.2629 4.90123 11.5014 5 11.75 5C11.9986 5 12.2371 4.90123 12.4129 4.72541C12.5887 4.5496 12.6875 4.31114 12.6875 4.0625H13.9375V5.9375H2.0625V4.0625H3.3125ZM2.0625 15.9375V7.8125H13.9375V15.9375H2.0625Z" fill="#2B4360" />
          </svg>

          <p className='m-0'>List View</p>
        </div>
      ),
      content: (
        <ContentContainer className="mt-5">
          <h1>List View</h1>
        </ContentContainer>
      ),
    },

  ];
  return (
    <>
      <CustomTabs
        activeKey={activeTab}
        setActiveKey={setActiveTab}
        tabOptions={tabOptions}
      />
    </>
  )
}


export function CalendarView() {
  const [filters, setFilters] = useState<string[]>([]);
  interface Appointment {
    id: string;
    time: string;
    title: string;
    startTime: number; // in minutes from midnight
    duration: number; // in minutes
  }

  const options = [
    "Upcoming",
    "Scheduled",
    "Re-scheduled",
    "Cancelled",
    "Re - Assigned",
  ];

  const handleChange = (option: string) => {
    setFilters((prev) =>
      prev.includes(option) ? prev.filter((f) => f !== option) : [...prev, option]
    );
  };

  const clearAll = () => {
    setFilters([]);
  };

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [selectedView, setSelectedView] = useState<string>("day");



  const [events, setEvents] = useState<Event[]>([]);
  const [showTooltip, setShowTooltip] = useState(true);

  // Refs for the scrollable areas
  const scheduleRef = useRef<HTMLDivElement>(null);
  const timeColumnRef = useRef<HTMLDivElement>(null);

  // Helper function to generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    // Extended hours to better fill the view
    for (let i = 9; i < 19; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const formatTime = (hour: number, minutes: number) => {
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHour}:${formattedMinutes} ${ampm}`;
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (showTooltip) {
      setShowTooltip(false);
    }

    if (scheduleRef.current) {
      const rect = scheduleRef.current.getBoundingClientRect();
      const scrollTop = scheduleRef.current.scrollTop;
      const clickY = e.clientY - rect.top + scrollTop;

      const totalHours = (18 - 9);
      const totalMinutes = (clickY / scheduleRef.current.scrollHeight) * totalHours * 60;
      const hour = Math.floor(totalMinutes / 60) + 9;
      const minutes = Math.floor(totalMinutes % 60);
      const roundedMinutes = Math.round(minutes / 15) * 15;

      const date = new Date();
      date.setHours(hour, roundedMinutes, 0, 0);

      const newEvent: Event = {
        id: Date.now(),
        top: clickY,
        time: formatTime(date.getHours(), date.getMinutes()),
      };
      setEvents([...events, newEvent]);
    }
  };

  // Effect to synchronize scrolling between the two columns
  useEffect(() => {
    const timeEl = timeColumnRef.current;
    const scheduleEl = scheduleRef.current;
    if (!timeEl || !scheduleEl) return;

    let activeScroller: 'time' | 'schedule' | null = null;
    let timer: number;

    const clearActiveScroller = () => {
      clearTimeout(timer);
      timer = window.setTimeout(() => {
        activeScroller = null;
      }, 100); // Reset after 100ms of inactivity
    };

    const handleTimeScroll = () => {
      if (activeScroller === 'schedule') return;
      activeScroller = 'time';
      scheduleEl.scrollTop = timeEl.scrollTop;
      clearActiveScroller();
    };

    const handleScheduleScroll = () => {
      if (activeScroller === 'time') return;
      activeScroller = 'schedule';
      timeEl.scrollTop = scheduleEl.scrollTop;
      clearActiveScroller();
    };

    timeEl.addEventListener('scroll', handleTimeScroll);
    scheduleEl.addEventListener('scroll', handleScheduleScroll);

    // Cleanup function to remove event listeners
    return () => {
      timeEl.removeEventListener('scroll', handleTimeScroll);
      scheduleEl.removeEventListener('scroll', handleScheduleScroll);
    };
  }, []); // Empty dependency array ensures this runs only once on mount


  // CSS styles that will be applied inline
  const styles = {
    timeColumn: { width: '120px', backgroundColor: '#fafafa', flexShrink: 0 },
    dateCircle: { width: '40px', height: '40px', backgroundColor: '#fce5d8', color: '#f57c00' },
    eventLine: { left: '5px', right: '0', height: '1px' }, // Adjusted left position
    eventDot: { width: '10px', height: '10px', left: '-5px', top: '-4.5px', zIndex: 1 },
    tooltipCustom: { top: '25%', left: '30%' },
    tooltipDot: { width: '12px', height: '12px', top: '-4px', left: '-4px' },
    pingAnimation: { animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }
  };

  // Calculate the position for the static 12:30 PM line
  // 12:30 PM is 3.5 hours after 9:00 AM. Each hour is 2 * 48px.
  // Add 24px (half the slot height) to center it.
  const staticLineTop = ((12.5 - 9) * 2 * 48) + 24;



  return (
    <>
      <Row className='mt-3'>
        <Col md={3}>
          <ContentContainer>
            <>
              <div>
                <div className='d-flex align-item-center justify-content-center '>
                  <Button variant="outline" disabled={false} >
                    <span><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M16.25 2.5H14.375V1.875C14.375 1.70924 14.3092 1.55027 14.1919 1.43306C14.0747 1.31585 13.9158 1.25 13.75 1.25C13.5842 1.25 13.4253 1.31585 13.3081 1.43306C13.1908 1.55027 13.125 1.70924 13.125 1.875V2.5H6.875V1.875C6.875 1.70924 6.80915 1.55027 6.69194 1.43306C6.57473 1.31585 6.41576 1.25 6.25 1.25C6.08424 1.25 5.92527 1.31585 5.80806 1.43306C5.69085 1.55027 5.625 1.70924 5.625 1.875V2.5H3.75C3.41848 2.5 3.10054 2.6317 2.86612 2.86612C2.6317 3.10054 2.5 3.41848 2.5 3.75V16.25C2.5 16.5815 2.6317 16.8995 2.86612 17.1339C3.10054 17.3683 3.41848 17.5 3.75 17.5H16.25C16.5815 17.5 16.8995 17.3683 17.1339 17.1339C17.3683 16.8995 17.5 16.5815 17.5 16.25V3.75C17.5 3.41848 17.3683 3.10054 17.1339 2.86612C16.8995 2.6317 16.5815 2.5 16.25 2.5ZM5.625 3.75V4.375C5.625 4.54076 5.69085 4.69973 5.80806 4.81694C5.92527 4.93415 6.08424 5 6.25 5C6.41576 5 6.57473 4.93415 6.69194 4.81694C6.80915 4.69973 6.875 4.54076 6.875 4.375V3.75H13.125V4.375C13.125 4.54076 13.1908 4.69973 13.3081 4.81694C13.4253 4.93415 13.5842 5 13.75 5C13.9158 5 14.0747 4.93415 14.1919 4.81694C14.3092 4.69973 14.375 4.54076 14.375 4.375V3.75H16.25V6.25H3.75V3.75H5.625ZM16.25 16.25H3.75V7.5H16.25V16.25ZM12.3172 10.4422L10.8836 11.875L12.3172 13.3078C12.3753 13.3659 12.4213 13.4348 12.4527 13.5107C12.4842 13.5866 12.5003 13.6679 12.5003 13.75C12.5003 13.8321 12.4842 13.9134 12.4527 13.9893C12.4213 14.0652 12.3753 14.1341 12.3172 14.1922C12.2591 14.2503 12.1902 14.2963 12.1143 14.3277C12.0384 14.3592 11.9571 14.3753 11.875 14.3753C11.7929 14.3753 11.7116 14.3592 11.6357 14.3277C11.5598 14.2963 11.4909 14.2503 11.4328 14.1922L10 12.7586L8.56719 14.1922C8.50912 14.2503 8.44018 14.2963 8.36431 14.3277C8.28844 14.3592 8.20712 14.3753 8.125 14.3753C8.04288 14.3753 7.96156 14.3592 7.88569 14.3277C7.80982 14.2963 7.74088 14.2503 7.68281 14.1922C7.62474 14.1341 7.57868 14.0652 7.54725 13.9893C7.51583 13.9134 7.49965 13.8321 7.49965 13.75C7.49965 13.6679 7.51583 13.5866 7.54725 13.5107C7.57868 13.4348 7.62474 13.3659 7.68281 13.3078L9.11641 11.875L7.68281 10.4422C7.56554 10.3249 7.49965 10.1659 7.49965 10C7.49965 9.83415 7.56554 9.67509 7.68281 9.55781C7.80009 9.44054 7.95915 9.37465 8.125 9.37465C8.29085 9.37465 8.44991 9.44054 8.56719 9.55781L10 10.9914L11.4328 9.55781C11.4909 9.49974 11.5598 9.45368 11.6357 9.42225C11.7116 9.39083 11.7929 9.37465 11.875 9.37465C11.9571 9.37465 12.0384 9.39083 12.1143 9.42225C12.1902 9.45368 12.2591 9.49974 12.3172 9.55781C12.3753 9.61588 12.4213 9.68482 12.4527 9.76069C12.4842 9.83656 12.5003 9.91788 12.5003 10C12.5003 10.0821 12.4842 10.1634 12.4527 10.2393C12.4213 10.3152 12.3753 10.3841 12.3172 10.4422Z" fill="#2B4360" />
                    </svg>
                    </span>   Block Calendar
                  </Button>
                </div>

                {/* Multi-Select DatePicker Component */}
                <div className="mt-3">
                  {/* <MultiDateSelector /> */}
                </div>


                <div className="p-3 " >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="mb-0 doctor-listing-calender-heading">Filter</h6>
                    <p className="mb-0 doctor-listing-calender-filter " onClick={clearAll}>Clear all</p>

                  </div>

                  <Form>
                    {options.map((option, idx) => (
                      <div className='doctor-listing-filter'>
                        <Form.Check
                          key={idx}
                          type="checkbox"
                          label={option}
                          checked={filters.includes(option)}
                          onChange={() => handleChange(option)}
                          className="mb-2  settings-accordion-subtitle cursor-pointer"
                        />
                      </div>
                    ))}
                  </Form>
                </div>

              </div>

            </>
          </ContentContainer>
        </Col>
        <Col md={9}>
          <Row>
            <div className="d-flex justify-content-between ">
              <div>
                <p className='doctor-listing-date-heading  m-0 '>November 2024</p>
                <p className='doctor-listing-date-subtitle '>0 Appointments</p>
              </div>
              <div className='doctor-listing-day-week-month-main'>

                <Nav
                  variant="pills"
                  activeKey={selectedView}
                  onSelect={(selectedKey) => {
                    if (selectedKey) setSelectedView(selectedKey);
                  }}
                >
                  <Nav.Item>
                    <Nav.Link eventKey="day" className={(selectedView === 'day' ? 'doctor-listing-day-week-month' : '') || 'doctor-listing-day-custom-active111 '}>Day</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="week" className={(selectedView === 'week' ? 'doctor-listing-day-week-month' : '') || 'doctor-listing-day-custom-active111'}>Week</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="month" className={(selectedView === 'month' ? 'doctor-listing-day-week-month' : '') || 'doctor-listing-day-custom-active111'}>Month</Nav.Link>
                  </Nav.Item>
                </Nav>

              </div>
            </div>
            <Col md={8}>
              {selectedView === 'day'
                &&
                <>


                  <div className=" min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="w-100 bg-white rounded shadow-lg d-flex" style={{ maxWidth: '64rem', height: '90vh' }}>
                      {/* Time Column with Icon and Times */}
                      <div className="border-end d-flex flex-column" style={styles.timeColumn}>
                        {/* Header with Icon */}
                        <div className="d-flex align-items-center justify-content-center border-bottom" style={{ height: '96px', flexShrink: 0 }}>
                          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgb(156 163 175)' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>

                        {/* Scrollable Time Slots */}
                        <div
                          className="text-center flex-grow-1 overflow-auto time-scroll"
                          ref={timeColumnRef}
                        >
                          {timeSlots.map((time, index) => {
                            const [hour, minute] = time.split(':');
                            const displayTime = parseInt(hour, 10);
                            const ampm = displayTime < 12 ? 'AM' : 'PM';
                            const formattedHour = displayTime > 12 ? displayTime - 12 : (displayTime === 0 ? 12 : displayTime);
                            return (
                              <div key={index} className="d-flex align-items-center justify-content-center border-top" style={{ height: '48px' }}>
                                <span className="small text-secondary">
                                  {`${formattedHour}:${minute} ${ampm}`}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="flex-grow-1 d-flex flex-column">
                        {/* Header with Day and Date */}
                        <div className="d-flex align-items-center border-bottom p-3" style={{ height: '96px', flexShrink: 0 }}>
                          <div className="d-flex align-items-center">
                            <p className="small fw-semibold mb-0 me-2" style={{ color: '#f57c00' }}>Monday</p>
                            <div className="rounded-circle d-flex align-items-center justify-content-center fs-5 fw-bold" style={styles.dateCircle}>
                              01
                            </div>
                          </div>
                        </div>

                        {/* Schedule Clickable Area */}
                        <div
                          className="flex-grow-1 position-relative overflow-auto"
                          ref={scheduleRef}
                          onClick={handleClick}
                        >
                          {/* Grid Lines Container */}
                          <div className="position-relative" style={{ height: `${timeSlots.length * 48}px` }}>
                            {timeSlots.map((_, index) => (
                              <div key={index} className="border-top" style={{ height: '48px' }}></div>
                            ))}

                            {/* Static 12:30 PM Line */}
                            <div
                              className="position-absolute bg-warning"
                              style={{ ...styles.eventLine, top: `${staticLineTop}px` }}
                            >
                              <div className="bg-warning rounded-circle position-absolute" style={styles.eventDot}></div>
                            </div>

                            {/* Dynamic Event Lines */}
                            {events.map(event => (
                              <div
                                key={event.id}
                                className="position-absolute bg-warning"
                                style={{ ...styles.eventLine, top: `${event.top}px` }}
                              >
                                <div className="bg-warning rounded-circle position-absolute" style={styles.eventDot}></div>
                              </div>
                            ))}
                          </div>

                          {/* Initial Tooltip */}
                          {showTooltip && (
                            <div className="position-absolute bg-white p-4 rounded shadow-lg" style={styles.tooltipCustom}>
                              <div className="position-absolute bg-warning rounded-circle" style={{ ...styles.tooltipDot, ...styles.pingAnimation }}></div>
                              <div className="position-absolute bg-warning rounded-circle" style={styles.tooltipDot}></div>
                              <p className="small text-secondary">Get started by clicking anywhere<br />on the calendar to add your first<br />appointment</p>
                              <button onClick={() => setShowTooltip(false)} className="btn btn-link p-0 mt-3 small fw-bold text-warning text-decoration-none">OK, GOT IT!</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
               

              }

              {selectedView === 'week'
                &&
                <h1>{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} Week View</h1>
               

              }

              {selectedView === 'month'
                &&
                <h1>{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} Month View</h1>
                

              }

              {/* <h1>{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)} View</h1> */}



            </Col>
            <Col md={4}>

              <div className='todays-schedule-main mt-3'>
                <div className='today-schedule'>
                  <p className='doctor-listing-heading mb-0 '>Today’s Schedule</p>
                </div>
                <div className='today-schedule-box-section h-100'>
                  <div className='d-flex justify-content-between align-items-center gap-1 p-0'>
                    <div className='doctor-listing-today-schedule-box d-flex flex-column  align-items-center'>
                      <p className='doctor-listing-today-schedule-boxs text-center'>Upcoming</p>
                      <div className='upcoming-box doctor-listing-all-box'>0</div>
                    </div>
                    <div className='doctor-listing-today-schedule-box d-flex flex-column  align-items-center'>
                      <p className='doctor-listing-today-schedule-boxs text-center'>Waiting</p>
                      <div className='waiting-box doctor-listing-all-box'>0</div>
                    </div>
                    <div className='doctor-listing-today-schedule-box d-flex flex-column  align-items-center'>
                      <p className='doctor-listing-today-schedule-boxs text-center'>Engaged</p>
                      <div className='engaged-box doctor-listing-all-box'>0</div>
                    </div>
                    <div className='doctor-listing-today-schedule-box d-flex flex-column  align-items-center'>
                      <p className='doctor-listing-today-schedule-boxs text-center'>Done</p>
                      <div className='done-box doctor-listing-all-box'>0</div>
                    </div>
                  </div>
                </div>
              </div>

            </Col>
          </Row>
        </Col>


      </Row >
    </>
  )
}


