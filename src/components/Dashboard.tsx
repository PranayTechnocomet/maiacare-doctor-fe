"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import Appointments from "../assets/images/Appointments.png";
import ActivePatients from "../assets/images/Active Patients.png";
import NewPatients from "../assets/images/New Patients.png";
import NoShowRate from "../assets/images/No Show Rate.png";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
  ChartOptions,
  ChartData,
} from "chart.js";
import Image from "next/image";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
);
interface TreatmentData {
  id: string;
  name: string;
  patients: number;
  successRate: number;
  color: string;
  iconColor: string;
}



// ---------- Interfaces ----------
interface DashboardData {
  appointments: number;
  appointmentsChange: number;
  activePatients: number;
  activePatientsChange: number;
  newPatients: number;
  newPatientsChange: number;
  noShowRate: number;
  noShowRateChange: number;
  patientOverview: { male: number; female: number };
  appointmentData: {
    months: string[];
    ivfTreatment: number[];
    kitTreatment: number[];
    icsiTreatment: number[];
    gametefreezing: number[];
    pgtTesting: number[];
  };
  dropoutData: { labels: string[]; values: number[] };
}

interface WaveChartProps {
  width?: number;
  height?: number;
}

// ---------- WaveChart Component ----------
const WaveChart: React.FC<WaveChartProps> = ({ width = 800, height = 400 }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  const ivfStages = [
    "Fertility  Assessment",
    "Stimulation",
    "Egg Retrieval",
    "Fertilisation",
    "IVF",
    "Embryo Culture",
    "Embryo Transfer",
    "Pregnancy Test",
  ];

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (chartInstanceRef.current) chartInstanceRef.current.destroy();

    // Generate wave-like values
    const generateWaveData = (): number[] => {
      const points = [];
      const numPoints = 200; // smooth line mate vadhu points

      for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * 8 * Math.PI; // 8 stage mate

        // Fertility Assessment → Stimulation
        const wave1 = 20 * Math.sin(x * 0.5) + 20;

        // Stimulation → Egg Retrieval
        const wave2 = 30 * Math.sin(x * 0.6 + 1) + 30;

        // Egg Retrieval → Fertilisation
        const wave3 = 40 * Math.sin(x * 0.7 + 2) + 40;

        // Fertilisation → IVF
        const wave4 = 25 * Math.sin(x * 0.9 + 2) + 20;

        // IVF → Embryo Culture
        const wave5 = 35 * Math.sin(x * 0.8 + 3) + 30;

        // Embryo Culture → Embryo Transfer
        const wave6 = 30 * Math.sin(x * 0.7 + 4) + 25;

        // Embryo Transfer → Pregnancy Test
        const wave7 = 20 * Math.sin(x * 0.5 + 5) + 20;

        points.push(Math.max(0, (wave1 + wave2 + wave3 + wave4 + wave5 + wave6 + wave7) / 7));
      }

      console.log(points);

      return points;
    };

    const waveData = generateWaveData();
    const labels = Array.from({ length: waveData.length }, () => "");

    const chartData: ChartData<"line"> = {

      datasets: [
        {
          label: "IVF Process Journey",
          data: waveData,
          borderColor: "#2c3e50",
          backgroundColor: "rgba(174, 204, 237, 0.6)",
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
      labels,
    };

    const chartOptions: ChartOptions<"line"> = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false, grid: { display: false } }, // hide axis, use bottom labels
        y: {
          beginAtZero: true,
          max: 140,
          ticks: { stepSize: 20, color: "#6c757d", font: { size: 12 } },
          grid: { color: "rgba(0,0,0,0.1)", lineWidth: 1 },
          border: { display: false },
        },
      },
      animation: { duration: 2000, easing: "easeInOutQuart" },
    };

    chartInstanceRef.current = new ChartJS(ctx, { type: "line", data: chartData, options: chartOptions });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };
  }, [width, height]);

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light text-center">
        <h6 className="mb-0 d-flex align-items-start justify-content-start">IVF Process Journey</h6>

      </div>

      <div className="card-body p-3">
        <div style={{ height: `${height}px`, width: "100%" }}>
          <canvas ref={chartRef} style={{ width: "100%", height: "100%" }} />
        </div>

        {/* IVF Stages below chart */}
        <div
          className="d-flex justify-content-between flex-wrap mt-3 "
          style={{ fontSize: "12px", color: "#495057", fontWeight: 500 }}
        >
          {ivfStages.map((stage, idx) => (
            <span key={idx} className="text-center flex-fill" style={{ width: "5px" }}>
              {stage}
            </span>
          ))}
        </div>
      </div>


    </div>
  );
};

// ---------- Dashboard Component ----------
const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    appointments: 18,
    appointmentsChange: 40,
    activePatients: 131,
    activePatientsChange: 25,
    newPatients: 32,
    newPatientsChange: 55,
    noShowRate: 24,
    noShowRateChange: -10,
    patientOverview: { male: 45, female: 55 },
    appointmentData: {
      months: ["Jan", "Feb", "Mar", "Apr"],
      ivfTreatment: [3800, 2600, 3300, 3500],
      kitTreatment: [1900, 3200, 2200, 1600],
      icsiTreatment: [3200, 2400, 1400, 2400],
      gametefreezing: [800, 1200, 800, 1000],
      pgtTesting: [600, 800, 400, 800],
    },
    dropoutData: {
      labels: [
        "Fertility Assessment ",
        "Stimulation",
        "Egg Retrieval",
        "Fertilisation",
        "IVF",
        "Embryo Culture",
        "Embryo Transfer",
        "Pregnancy Test",
      ],
      values: [20, 35, 25, 45, 40, 35, 30, 25],
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        appointments: Math.floor(Math.random() * 50) + 10,
        activePatients: Math.floor(Math.random() * 200) + 100,
        newPatients: Math.floor(Math.random() * 60) + 20,
        noShowRate: Math.floor(Math.random() * 40) + 10,
        appointmentsChange: Math.floor(Math.random() * 100) - 50,
        activePatientsChange: Math.floor(Math.random() * 60) - 30,
        newPatientsChange: Math.floor(Math.random() * 80) - 40,
        noShowRateChange: Math.floor(Math.random() * 40) - 20,
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    const color = isPositive ? "text-success" : "text-danger";
    const icon = isPositive ? "↗" : "↘";
    return (
      <span className={color}>
        {icon} {Math.abs(change)}% <span className="dashboard-card-subtitle">last month</span>
      </span>
    );
  };

  const appointmentChartData = {
    labels: data.appointmentData.months,
    datasets: [
      { label: "IVF Treatment", data: data.appointmentData.ivfTreatment, backgroundColor: "#D45F35" },
      { label: "Kit Treatment", data: data.appointmentData.kitTreatment, backgroundColor: "#DB7A57" },
      { label: "ICSI Treatment", data: data.appointmentData.icsiTreatment, backgroundColor: "#E29578" },
      { label: "Gamete Freezing", data: data.appointmentData.gametefreezing, backgroundColor: "#EAAF9A" },
      { label: "PGT Testing", data: data.appointmentData.pgtTesting, backgroundColor: "#F1CABB" },
    ],
  };
  
  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // ✅ this is allowed
        labels: {
          padding: 20,
          boxWidth: 20,
          usePointStyle: true,
          pointStyle: 'rectRounded',
        },
      },
      title: {
        display: true,
        text: "Appointment Overview",
        align: "start", // ✅ "start" | "center" | "end"
      },
    },
  };

  const patientChartData = {
    labels: ["Female", "Male"],
    datasets: [
      {
        data: [data.patientOverview.female, data.patientOverview.male],
        backgroundColor: ["#E29578", "#2B4360"],
        cutout: "70%",
      },
    ],
  };


  const treatmentData: TreatmentData[] = [
    {
      id: 'ivf',
      name: 'IVF',
      patients: 650,
      successRate: 55,
      color: '#5A94D9',
      iconColor: '#5A94D9'
    },
    {
      id: 'gamete',
      name: 'Gamete Freezing',
      patients: 300,
      successRate: 87,
      color: '#F4C47E',
      iconColor: '#F4C47E'
    },
    {
      id: 'icsi',
      name: 'ICSI',
      patients: 450,
      successRate: 66,
      color: '#869BB5',
      iconColor: '#869BB5'
    },
    {
      id: 'pgt',
      name: 'PGT Testing',
      patients: 280,
      successRate: 96,
      color: '#1CB384',
      iconColor: '#1CB384'
    }
  ];

  // 🔹 Instead of patients, now based on successRate
  const totalSuccessRate = treatmentData.reduce((sum, treatment) => sum + treatment.successRate, 0);

  const generateProgressSegments = () => {
    return treatmentData.map((treatment) => {
      const percentage = (treatment.successRate / totalSuccessRate) * 100;
      return {
        ...treatment,
        percentage
      };
    });
  };

  const progressSegments = generateProgressSegments();


  return (
    <>
      <div className="py-2">
        {/* Top Stats */}
        <Row className="mb-3">
          <Col md={3}>
            <Card className="">
              <Card.Body >
                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={Appointments} alt="Appointments" width={38} height={38} className="me-3"></Image>Appointments</Card.Title>
                <h2 className="dashboard-subheader">{data.appointments}</h2>
                {formatChange(data.appointmentsChange)}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={ActivePatients} alt="Active Patients" width={38} height={38} className="me-3"></Image>Active Patients</Card.Title>
                <h2 className="dashboard-subheader">{data.activePatients}</h2>
                {formatChange(data.activePatientsChange)}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={NewPatients} alt="New Patients" width={38} height={38} className="me-3"></Image> New Patients</Card.Title>
                <h2 className="dashboard-subheader">{data.newPatients}</h2>
                {formatChange(data.newPatientsChange)}
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="">
              <Card.Body>
                <Card.Title className="phisical-assessment-accordion-title-showData"><Image src={NoShowRate} alt="No Show Rate" width={38} height={38} className="me-3"></Image>No Show Rate</Card.Title>
                <h2 className="dashboard-subheader">{data.noShowRate}%</h2>
                {formatChange(data.noShowRateChange)}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row className="mb-4">
          <Col lg={8}>
            <WaveChart height={400} />
          </Col>
          <Col lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>Patient Overview</Card.Title>
                <div style={{ height: 440 }}>
                  <Doughnut data={patientChartData} options={{ responsive: true }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            <Card>
              <Card.Body>
                <Card.Title>Appointment Overview</Card.Title>
                <div style={{ height: 400 }}>
                  <Bar data={appointmentChartData} options={options} />
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4}>
            <div style={{ backgroundColor: '#f5f5f5', }}>



              <div
                className="card border-0"
                style={{
                  borderRadius: '16px',
                  boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
                  backgroundColor: 'white'
                }}
              >
                <div className="card-body" style={{ padding: '24px' }}>
                  {/* Header */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mb-0" style={{
                      fontWeight: '600',
                      fontSize: '18px',
                      color: '#333333',
                      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                    }}>
                      Treatment Success Rate
                    </h4>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: '#f0f0f0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#666', fontWeight: 'bold' }}>i</span>
                    </div>
                  </div>

                  {/* Total Count */}
                  <div className="mb-3">
                    <div className="d-flex align-items-center">
                      <div className="me-2">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                          <path d="M7 17l9.2-9.2M17 17H7V7"></path>
                        </svg>
                      </div>
                      <div>
                        <span style={{
                          fontSize: '32px',
                          fontWeight: '700',
                          color: '#333',
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}>
                          {totalSuccessRate}%
                        </span>
                        <span style={{
                          fontSize: '14px',
                          color: '#4caf50',
                          fontWeight: '500',
                          marginLeft: '12px'
                        }}>
                          Total Success Contribution
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div style={{
                      height: '36px',
                      display: 'flex',
                      gap: '1px',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      {progressSegments.map((segment) => {
                        const numBars = Math.max(1, Math.round(segment.percentage / 2));
                        const bars = [];

                        for (let i = 0; i < numBars; i++) {
                          bars.push(
                            <div
                              key={`${segment.id}-${i}`}
                              style={{
                                width: '6px',
                                height: '36px',
                                backgroundColor: segment.color,
                                marginRight: i === numBars - 1 ? '0' : '1px'
                              }}
                            />
                          );
                        }

                        return (
                          <div
                            key={segment.id}
                            style={{
                              display: 'flex',
                              gap: '1px',
                              marginRight: '2px'
                            }}
                          >
                            {bars}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Treatment Items */}
                  <div>
                    {treatmentData.map((treatment) => (
                      <div key={treatment.id} className="mb-3">
                        <div className="d-flex align-items-center">
                          <div className="me-3">
                            <div
                              style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: treatment.color
                              }}
                            />
                          </div>
                          <div className="flex-grow-1">
                            <div style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#333',
                              marginBottom: '2px',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}>
                              {treatment.name}
                            </div>
                            <div style={{
                              fontSize: '14px',
                              color: '#999',
                              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}>
                              {treatment.patients} Patients
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="d-flex align-items-center">
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#4caf50"
                                strokeWidth="2"
                                style={{ marginRight: '4px' }}
                              >
                                <path d="M7 17l9.2-9.2M17 17H7V7"></path>
                              </svg>
                              <span style={{
                                fontSize: '16px',
                                fontWeight: '600',
                                color: '#4caf50',
                                marginRight: '4px',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                              }}>
                                {treatment.successRate}%
                              </span>
                              <span style={{
                                fontSize: '14px',
                                color: '#666',
                                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                              }}>
                                Success
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>


            </div>
          </Col>
        </Row>
      </div>






    </>
  );
};

export default Dashboard;
