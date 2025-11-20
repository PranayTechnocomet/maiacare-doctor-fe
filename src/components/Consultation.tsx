"use client";

import React, { useEffect, useState } from "react";
import {
    Form,
    InputGroup,

    Pagination,
} from "react-bootstrap";
import { consultationData } from "@/utils/StaticData";
import Image from "next/image";
import CommonTable from "@/components/ui/BaseTable";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { PiSlidersDuotone } from "react-icons/pi";
import "@/style/consultation.css";
import { LuTrash2, LuArrowDown } from "react-icons/lu";
// import AppointmentSummaryCards from "@/components/layout/AppointmentSummaryCards";
import Link from "next/link";
// import woman from "@/assets/images/woman.png";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { InputSelect } from "./ui/InputSelect";
import { InputFieldGroup } from "./ui/InputField";
import dummpyPatientList from '@/assets/images/dummpy-patient-list-img.png'
import { getAll } from "@/utils/apis/apiHelper";
import { GetAllPatient } from "@/utils/types/interfaces";

// const statusColor: Record<string, string> = {
//     Completed: "success",
//     Pending: "primary",
//     Scheduled: "info",
//     "No Response": "danger",
//     Rescheduled: "warning",
// };

export type ConsultationStatus =
    | "Completed"
    | "Pending"
    | "Scheduled"
    | "No Response"
    | "Rescheduled"
    | "Cancelled";

export default function Consultation() {
    const searchParams = useSearchParams();
    const filter = searchParams.get("filter");

    const [filteredData, setFilteredData] = useState(consultationData);
    const [searchQuery, setSearchQuery] = useState("");
    const [timeFilter, setTimeFilter] = useState("All Time");
    const [getAllPatients, setGetAllPatients] = useState<GetAllPatient[]>([]);
    const [patientCoute, setPatientCoute] = useState<number>(0);



    // const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);
    const handleDownload = (url: string, name: string) => {
        const link = document.createElement("a");
        link.href = url;
        link.download = name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const router = useRouter();

    const handleAddPatient = () => {
        router.push("/addpatient"); // navigate to /addpatient page
    };

    // delete function
    const handleDelete = (id: number) => {
        const updated = filteredData.filter((item) => item.id !== id);
        setFilteredData(updated);
    };


    // useEffect(() => {
    //     if (filter === "completed") {
    //         setFilteredData(consultationData.filter(item => item.status === "Completed"));
    //     } else if (filter === "cancelled") {
    //         setFilteredData(consultationData.filter(item => item.status === "Cancelled"));
    //     } else {
    //         setFilteredData(consultationData);
    //     }
    // }, [filter]);

    useEffect(() => {
        let data = consultationData;

        // 🔹 filter by status (query param)
        if (filter === "completed") {
            data = data.filter((item) => item.status === "Completed");
        } else if (filter === "cancelled") {
            data = data.filter((item) => item.status === "Cancelled");
        }

        // 🔹 filter by search
        if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            data = data.filter(
                (item) =>
                    item.name.toLowerCase().includes(q) ||
                    item.treatment.toLowerCase().includes(q) ||
                    item.mobile.toLowerCase().includes(q)
            );
        }

        // 🔹 filter by time
        if (timeFilter !== "All Time") {
            const now = new Date();

            data = data.filter((item) => {
                if (!item.date) return false; // skip if no date
                const itemDate = new Date(item.date);
                if (isNaN(itemDate.getTime())) return false;

                if (timeFilter === "Today") {
                    return itemDate.toDateString() === now.toDateString();
                }

                if (timeFilter === "This Week") {
                    const weekStart = new Date(now);
                    weekStart.setDate(now.getDate() - now.getDay()); // Sunday
                    weekStart.setHours(0, 0, 0, 0);

                    const weekEnd = new Date(weekStart);
                    weekEnd.setDate(weekStart.getDate() + 7); // Next Sunday

                    return itemDate >= weekStart && itemDate < weekEnd;
                }

                if (timeFilter === "This Month") {
                    return (
                        itemDate.getMonth() === now.getMonth() &&
                        itemDate.getFullYear() === now.getFullYear()
                    );
                }

                return true;
            });
        }

        setFilteredData(data);
    }, [filter, searchQuery, timeFilter]);

    useEffect(() => {
        getAll().then((response) => {
            // console.log("response: ", response.data);
            setGetAllPatients(response.data.data);
            setPatientCoute(response.data.total)

        }).catch((err) => {
            console.error("Error fetching patient data:", err);
        });
    }, [])

    // console.log("getAllPatients : ", getAllPatients);
    // console.log("patientCoute : ", patientCoute);

    // const columns: ColumnDef<any>[] = [
    //     {
    //         header: "#",
    //         cell: (info) => {
    //             const index = info.row.index + 1; // row number start from 1
    //             return index < 10 ? `0${index}` : index; // format 01,02,03
    //         },
    //     },
    //     {
    //         header: "Name",
    //         cell: (info) => {
    //             const imgSrc = info.row.original.image;
    //             const name = info.row.original.name;
    //             const id = info.row.original.id; // <-- Make sure you have an `id`

    //             return (
    //                 <Link href={`/patients/${id}`} className="text-decoration-none text-dark">
    //                     <div className="d-flex align-items-center gap-2">
    //                         {typeof imgSrc === "string" ? (
    //                             <img
    //                                 src={imgSrc}
    //                                 alt={name}
    //                                 className="rounded-circle border"
    //                                 width="36"
    //                                 height="36"
    //                             />
    //                         ) : (
    //                             <Image
    //                                 src={imgSrc}
    //                                 alt={name}
    //                                 width={36}
    //                                 height={36}
    //                                 className="rounded"
    //                             />
    //                         )}
    //                         {name}
    //                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    //                             <path d="M16.6167 6.91806C16.346 6.76072 16.1028 6.56032 15.8967 6.32473C15.9175 5.99674 15.9956 5.67494 16.1275 5.3739C16.37 4.68973 16.6442 3.91473 16.2042 3.31223C15.7642 2.70973 14.9333 2.7289 14.2042 2.74556C13.882 2.77872 13.5565 2.75673 13.2417 2.68056C13.0739 2.40765 12.9542 2.10805 12.8875 1.79473C12.6808 1.09056 12.445 0.294731 11.7208 0.0563974C11.0225 -0.168603 10.3758 0.326397 9.80417 0.761397C9.55749 0.986663 9.27167 1.16488 8.96083 1.28723C8.64674 1.16587 8.35774 0.987613 8.10833 0.761397C7.53833 0.328897 6.89417 -0.171103 6.1925 0.0572308C5.47 0.292231 5.23417 1.09056 5.02583 1.79473C4.95928 2.10703 4.84068 2.40592 4.675 2.6789C4.3596 2.75486 4.03369 2.7774 3.71083 2.74556C2.97917 2.72556 2.155 2.7039 1.71083 3.31223C1.26667 3.92056 1.54417 4.68973 1.7875 5.37306C1.9212 5.67366 2.00049 5.99559 2.02167 6.3239C1.8159 6.55979 1.57298 6.76049 1.3025 6.91806C0.6925 7.33473 0 7.8089 0 8.5789C0 9.3489 0.6925 9.8214 1.3025 10.2397C1.57292 10.3971 1.81583 10.5975 2.02167 10.8331C2.00271 11.1612 1.92569 11.4835 1.79417 11.7847C1.5525 12.4681 1.27917 13.2431 1.71833 13.8456C2.1575 14.4481 2.98583 14.4289 3.71833 14.4122C4.04081 14.3791 4.36657 14.401 4.68167 14.4772C4.84865 14.7504 4.96812 15.0499 5.035 15.3631C5.24167 16.0672 5.4775 16.8631 6.20167 17.1014C6.31777 17.1386 6.43891 17.1577 6.56083 17.1581C7.14684 17.074 7.69149 16.8075 8.1175 16.3964C8.36417 16.1711 8.64999 15.9929 8.96083 15.8706C9.27492 15.9919 9.56392 16.1702 9.81333 16.3964C10.3842 16.8322 11.0308 17.3297 11.73 17.1006C12.4525 16.8656 12.6883 16.0672 12.8967 15.3639C12.9634 15.051 13.0829 14.7517 13.25 14.4789C13.5642 14.4024 13.8891 14.3799 14.2108 14.4122C14.9425 14.4297 15.7667 14.4539 16.2108 13.8456C16.655 13.2372 16.3775 12.4681 16.1342 11.7839C16.0014 11.4836 15.9221 11.1624 15.9 10.8347C16.1059 10.5986 16.3491 10.3979 16.62 10.2406C17.23 9.8239 17.9225 9.3489 17.9225 8.5789C17.9225 7.8089 17.2275 7.33556 16.6167 6.91806Z" fill="#E29578" />
    //                             <path d="M8.12752 10.8711C8.04543 10.8713 7.96414 10.8551 7.88832 10.8237C7.81251 10.7922 7.74369 10.746 7.68585 10.6878L6.01918 9.0211C5.90878 8.90262 5.84868 8.74591 5.85154 8.58399C5.85439 8.42208 5.91999 8.26759 6.0345 8.15308C6.14901 8.03857 6.3035 7.97297 6.46542 7.97012C6.62733 7.96726 6.78404 8.02736 6.90252 8.13776L8.18585 9.4211L11.0859 7.2461C11.2185 7.14664 11.3851 7.10394 11.5492 7.12738C11.7133 7.15082 11.8614 7.23849 11.9609 7.3711C12.0603 7.5037 12.103 7.67039 12.0796 7.83448C12.0561 7.99858 11.9685 8.14664 11.8359 8.2461L8.50252 10.7461C8.3943 10.8272 8.26274 10.871 8.12752 10.8711Z" fill="white" />
    //                         </svg>
    //                     </div>
    //                 </Link>
    //             );
    //         },
    //     },
    //     {
    //         header: "Mobile No",
    //         accessorKey: "mobile",
    //     },
    //     {
    //         header: "Pin Code",
    //         accessorKey: "pin",
    //     },
    //     {
    //         header: "Treatment",
    //         cell: (info) => (
    //             <span className="box-border-orange ">
    //                 {info.row.original.treatment}
    //             </span>
    //         ),
    //     },
    //     {
    //         header: "Doctor",
    //         cell: (info) => {
    //             const imgSrc = info.row.original.image;
    //             const name = info.row.original.name;
    //             const id = info.row.original.id;

    //             return (
    //                 <div className="d-flex align-items-center gap-2">
    //                     {typeof imgSrc === "string" ? (
    //                         <img
    //                             src={imgSrc}
    //                             alt={name}
    //                             className="rounded-circle border"
    //                             width="36"
    //                             height="36"
    //                         />
    //                     ) : (
    //                         <Image
    //                             src={imgSrc}
    //                             alt={name}
    //                             width={36}
    //                             height={36}
    //                             className="rounded"
    //                         />
    //                     )}
    //                     Meera Joshi
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    //                         <path d="M16.6167 6.91806C16.346 6.76072 16.1028 6.56032 15.8967 6.32473C15.9175 5.99674 15.9956 5.67494 16.1275 5.3739C16.37 4.68973 16.6442 3.91473 16.2042 3.31223C15.7642 2.70973 14.9333 2.7289 14.2042 2.74556C13.882 2.77872 13.5565 2.75673 13.2417 2.68056C13.0739 2.40765 12.9542 2.10805 12.8875 1.79473C12.6808 1.09056 12.445 0.294731 11.7208 0.0563974C11.0225 -0.168603 10.3758 0.326397 9.80417 0.761397C9.55749 0.986663 9.27167 1.16488 8.96083 1.28723C8.64674 1.16587 8.35774 0.987613 8.10833 0.761397C7.53833 0.328897 6.89417 -0.171103 6.1925 0.0572308C5.47 0.292231 5.23417 1.09056 5.02583 1.79473C4.95928 2.10703 4.84068 2.40592 4.675 2.6789C4.3596 2.75486 4.03369 2.7774 3.71083 2.74556C2.97917 2.72556 2.155 2.7039 1.71083 3.31223C1.26667 3.92056 1.54417 4.68973 1.7875 5.37306C1.9212 5.67366 2.00049 5.99559 2.02167 6.3239C1.8159 6.55979 1.57298 6.76049 1.3025 6.91806C0.6925 7.33473 0 7.8089 0 8.5789C0 9.3489 0.6925 9.8214 1.3025 10.2397C1.57292 10.3971 1.81583 10.5975 2.02167 10.8331C2.00271 11.1612 1.92569 11.4835 1.79417 11.7847C1.5525 12.4681 1.27917 13.2431 1.71833 13.8456C2.1575 14.4481 2.98583 14.4289 3.71833 14.4122C4.04081 14.3791 4.36657 14.401 4.68167 14.4772C4.84865 14.7504 4.96812 15.0499 5.035 15.3631C5.24167 16.0672 5.4775 16.8631 6.20167 17.1014C6.31777 17.1386 6.43891 17.1577 6.56083 17.1581C7.14684 17.074 7.69149 16.8075 8.1175 16.3964C8.36417 16.1711 8.64999 15.9929 8.96083 15.8706C9.27492 15.9919 9.56392 16.1702 9.81333 16.3964C10.3842 16.8322 11.0308 17.3297 11.73 17.1006C12.4525 16.8656 12.6883 16.0672 12.8967 15.3639C12.9634 15.051 13.0829 14.7517 13.25 14.4789C13.5642 14.4024 13.8891 14.3799 14.2108 14.4122C14.9425 14.4297 15.7667 14.4539 16.2108 13.8456C16.655 13.2372 16.3775 12.4681 16.1342 11.7839C16.0014 11.4836 15.9221 11.1624 15.9 10.8347C16.1059 10.5986 16.3491 10.3979 16.62 10.2406C17.23 9.8239 17.9225 9.3489 17.9225 8.5789C17.9225 7.8089 17.2275 7.33556 16.6167 6.91806Z" fill="#E29578" />
    //                         <path d="M8.12752 10.8711C8.04543 10.8713 7.96414 10.8551 7.88832 10.8237C7.81251 10.7922 7.74369 10.746 7.68585 10.6878L6.01918 9.0211C5.90878 8.90262 5.84868 8.74591 5.85154 8.58399C5.85439 8.42208 5.91999 8.26759 6.0345 8.15308C6.14901 8.03857 6.3035 7.97297 6.46542 7.97012C6.62733 7.96726 6.78404 8.02736 6.90252 8.13776L8.18585 9.4211L11.0859 7.2461C11.2185 7.14664 11.3851 7.10394 11.5492 7.12738C11.7133 7.15082 11.8614 7.23849 11.9609 7.3711C12.0603 7.5037 12.103 7.67039 12.0796 7.83448C12.0561 7.99858 11.9685 8.14664 11.8359 8.2461L8.50252 10.7461C8.3943 10.8272 8.26274 10.871 8.12752 10.8711Z" fill="white" />
    //                     </svg>
    //                 </div>
    //             );
    //         },
    //     },

    //     {
    //         header: "Status",
    //         cell: (info) => {
    //             const status = info.row.original.status;
    //             const statusClass = `status-${status.toLowerCase().replace(/\s/g, "")}`;
    //             return (
    //                 <span className={`status-pill ${statusClass}`}>
    //                     {status}
    //                 </span>
    //             );
    //         },
    //     },
    //     {
    //         header: "Actions",
    //         cell: (info) => {
    //             const id = info.row.original.id; 
    //             return (
    //                 <div className="dot-image rounded border p-1">
    //                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    //                         <path d="M10.9375 10C10.9375 10.1854 10.8825 10.3667 10.7795 10.5208C10.6765 10.675 10.5301 10.7952 10.3588 10.8661C10.1875 10.9371 9.99896 10.9557 9.8171 10.9195C9.63525 10.8833 9.4682 10.794 9.33709 10.6629C9.20598 10.5318 9.11669 10.3648 9.08051 10.1829C9.04434 10.001 9.06291 9.81254 9.13386 9.64123C9.20482 9.46993 9.32498 9.32351 9.47915 9.2205C9.63332 9.11748 9.81458 9.0625 10 9.0625C10.2486 9.0625 10.4871 9.16127 10.6629 9.33709C10.8387 9.5129 10.9375 9.75136 10.9375 10ZM10 5.625C10.1854 5.625 10.3667 5.57002 10.5208 5.467C10.675 5.36399 10.7952 5.21757 10.8661 5.04627C10.9371 4.87496 10.9557 4.68646 10.9195 4.5046C10.8833 4.32275 10.794 4.1557 10.6629 4.02459C10.5318 3.89348 10.3648 3.80419 10.1829 3.76801C10.001 3.73184 9.81254 3.75041 9.64123 3.82136C9.46993 3.89232 9.32351 4.01248 9.2205 4.16665C9.11748 4.32082 9.0625 4.50208 9.0625 4.6875C9.0625 4.93614 9.16127 5.1746 9.33709 5.35041C9.5129 5.52623 9.75136 5.625 10 5.625ZM10 14.375C9.81458 14.375 9.63332 14.43 9.47915 14.533C9.32498 14.636 9.20482 14.7824 9.13386 14.9537C9.06291 15.125 9.04434 15.3135 9.08051 15.4954C9.11669 15.6773 9.20598 15.8443 9.33709 15.9754C9.4682 16.1065 9.63525 16.1958 9.8171 16.232C9.99896 16.2682 10.1875 16.2496 10.3588 16.1786C10.5301 16.1077 10.6765 15.9875 10.7795 15.8333C10.8825 15.6792 10.9375 15.4979 10.9375 15.3125C10.9375 15.0639 10.8387 14.8254 10.6629 14.6496C10.4871 14.4738 10.2486 14.375 10 14.375Z" fill="#2B4360" />
    //                     </svg>
    //                 </div>
    //             );
    //         },
    //     }
    // ];

    const columns: ColumnDef<GetAllPatient>[] = [
        {
            header: "#",
            cell: (info) => {
                const index = info.row.index + 1; // row number start from 1
                return index < 10 ? `0${index}` : index; // format 01,02,03
            },
        },
        {
            header: "Name",
            cell: (info) => {
                const imgSrc = info.row.original.profileImage;
                const name = info.row.original.name;
                const id = info.row.original._id; // <-- Make sure you have an `id`
                const verified = info.row.original.verified; // <-- Make sure you have a `verified` field
                return (
                    <Link href={`/patients/${id}`} className="text-decoration-none text-dark">
                        <div className="d-flex align-items-center gap-2">
                            {typeof imgSrc === "string" ? (
                                <img
                                    src={imgSrc}
                                    alt={name}
                                    className="rounded"
                                    width="36"
                                    height="36"
                                />
                            ) : (
                                <Image
                                    src={imgSrc}
                                    alt={name}
                                    width={36}
                                    height={36}
                                    className="rounded"
                                />
                            )}
                            {name}

                            {verified &&
                                (<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M16.6167 6.91806C16.346 6.76072 16.1028 6.56032 15.8967 6.32473C15.9175 5.99674 15.9956 5.67494 16.1275 5.3739C16.37 4.68973 16.6442 3.91473 16.2042 3.31223C15.7642 2.70973 14.9333 2.7289 14.2042 2.74556C13.882 2.77872 13.5565 2.75673 13.2417 2.68056C13.0739 2.40765 12.9542 2.10805 12.8875 1.79473C12.6808 1.09056 12.445 0.294731 11.7208 0.0563974C11.0225 -0.168603 10.3758 0.326397 9.80417 0.761397C9.55749 0.986663 9.27167 1.16488 8.96083 1.28723C8.64674 1.16587 8.35774 0.987613 8.10833 0.761397C7.53833 0.328897 6.89417 -0.171103 6.1925 0.0572308C5.47 0.292231 5.23417 1.09056 5.02583 1.79473C4.95928 2.10703 4.84068 2.40592 4.675 2.6789C4.3596 2.75486 4.03369 2.7774 3.71083 2.74556C2.97917 2.72556 2.155 2.7039 1.71083 3.31223C1.26667 3.92056 1.54417 4.68973 1.7875 5.37306C1.9212 5.67366 2.00049 5.99559 2.02167 6.3239C1.8159 6.55979 1.57298 6.76049 1.3025 6.91806C0.6925 7.33473 0 7.8089 0 8.5789C0 9.3489 0.6925 9.8214 1.3025 10.2397C1.57292 10.3971 1.81583 10.5975 2.02167 10.8331C2.00271 11.1612 1.92569 11.4835 1.79417 11.7847C1.5525 12.4681 1.27917 13.2431 1.71833 13.8456C2.1575 14.4481 2.98583 14.4289 3.71833 14.4122C4.04081 14.3791 4.36657 14.401 4.68167 14.4772C4.84865 14.7504 4.96812 15.0499 5.035 15.3631C5.24167 16.0672 5.4775 16.8631 6.20167 17.1014C6.31777 17.1386 6.43891 17.1577 6.56083 17.1581C7.14684 17.074 7.69149 16.8075 8.1175 16.3964C8.36417 16.1711 8.64999 15.9929 8.96083 15.8706C9.27492 15.9919 9.56392 16.1702 9.81333 16.3964C10.3842 16.8322 11.0308 17.3297 11.73 17.1006C12.4525 16.8656 12.6883 16.0672 12.8967 15.3639C12.9634 15.051 13.0829 14.7517 13.25 14.4789C13.5642 14.4024 13.8891 14.3799 14.2108 14.4122C14.9425 14.4297 15.7667 14.4539 16.2108 13.8456C16.655 13.2372 16.3775 12.4681 16.1342 11.7839C16.0014 11.4836 15.9221 11.1624 15.9 10.8347C16.1059 10.5986 16.3491 10.3979 16.62 10.2406C17.23 9.8239 17.9225 9.3489 17.9225 8.5789C17.9225 7.8089 17.2275 7.33556 16.6167 6.91806Z" fill="#E29578" />
                                    <path d="M8.12752 10.8711C8.04543 10.8713 7.96414 10.8551 7.88832 10.8237C7.81251 10.7922 7.74369 10.746 7.68585 10.6878L6.01918 9.0211C5.90878 8.90262 5.84868 8.74591 5.85154 8.58399C5.85439 8.42208 5.91999 8.26759 6.0345 8.15308C6.14901 8.03857 6.3035 7.97297 6.46542 7.97012C6.62733 7.96726 6.78404 8.02736 6.90252 8.13776L8.18585 9.4211L11.0859 7.2461C11.2185 7.14664 11.3851 7.10394 11.5492 7.12738C11.7133 7.15082 11.8614 7.23849 11.9609 7.3711C12.0603 7.5037 12.103 7.67039 12.0796 7.83448C12.0561 7.99858 11.9685 8.14664 11.8359 8.2461L8.50252 10.7461C8.3943 10.8272 8.26274 10.871 8.12752 10.8711Z" fill="white" />
                                </svg>
                                )}

                        </div>
                    </Link>
                );
            },
        },
        {
            header: "Mobile No",
            accessorKey: "contactNumber",
        },
        {
            header: "Pincode",
            accessorKey: "pincode",
        },
        {
            header: "Treatment",
            cell: (info) => (
                <span> - </span>
            ),
        },

        {
            header: "Doctor",
            cell: (info) => {

                return (
                    <span> - </span>
                );
            },
        },

        {
            header: "Status",
            cell: (info) => {
                return (
                    <span> - </span>
                );
            },
        },
        {
            header: "Actions",
            cell: (info) => {
                return (
                    <div className="dot-image rounded border p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M10.9375 10C10.9375 10.1854 10.8825 10.3667 10.7795 10.5208C10.6765 10.675 10.5301 10.7952 10.3588 10.8661C10.1875 10.9371 9.99896 10.9557 9.8171 10.9195C9.63525 10.8833 9.4682 10.794 9.33709 10.6629C9.20598 10.5318 9.11669 10.3648 9.08051 10.1829C9.04434 10.001 9.06291 9.81254 9.13386 9.64123C9.20482 9.46993 9.32498 9.32351 9.47915 9.2205C9.63332 9.11748 9.81458 9.0625 10 9.0625C10.2486 9.0625 10.4871 9.16127 10.6629 9.33709C10.8387 9.5129 10.9375 9.75136 10.9375 10ZM10 5.625C10.1854 5.625 10.3667 5.57002 10.5208 5.467C10.675 5.36399 10.7952 5.21757 10.8661 5.04627C10.9371 4.87496 10.9557 4.68646 10.9195 4.5046C10.8833 4.32275 10.794 4.1557 10.6629 4.02459C10.5318 3.89348 10.3648 3.80419 10.1829 3.76801C10.001 3.73184 9.81254 3.75041 9.64123 3.82136C9.46993 3.89232 9.32351 4.01248 9.2205 4.16665C9.11748 4.32082 9.0625 4.50208 9.0625 4.6875C9.0625 4.93614 9.16127 5.1746 9.33709 5.35041C9.5129 5.52623 9.75136 5.625 10 5.625ZM10 14.375C9.81458 14.375 9.63332 14.43 9.47915 14.533C9.32498 14.636 9.20482 14.7824 9.13386 14.9537C9.06291 15.125 9.04434 15.3135 9.08051 15.4954C9.11669 15.6773 9.20598 15.8443 9.33709 15.9754C9.4682 16.1065 9.63525 16.1958 9.8171 16.232C9.99896 16.2682 10.1875 16.2496 10.3588 16.1786C10.5301 16.1077 10.6765 15.9875 10.7795 15.8333C10.8825 15.6792 10.9375 15.4979 10.9375 15.3125C10.9375 15.0639 10.8387 14.8254 10.6629 14.6496C10.4871 14.4738 10.2486 14.375 10 14.375Z" fill="#2B4360" />
                        </svg>
                    </div>
                );
            },
        }

    ];


    return (
        <div className="">
            {/* Summary Cards */}
            {/* <AppointmentSummaryCards target="patients" /> */}

            {/* Search and Filter */}

            {/* <div className="d-flex justify-content-between align-items-center flex-wrap mb-3 searchbar-content">
                
                <div className="d-flex align-items-center gap-2 mb-1 Consultations-image">
                    
                    <InputGroup className="custom-search-group">
                        <Form.Control
                            placeholder="Search"
                            className="custom-search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <InputGroup.Text className="custom-search-icon">
                            <IoSearch className="search-icon" />
                        </InputGroup.Text>
                    </InputGroup>

                    <div className="border custom-filter-button p-2 consultations-image-summary-cards">
                        
                        <div className="consultations-image-book">
                            <div className="Consultations-book">98 Consultations</div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-2 mb-2">
                    <span className="text-muted small short-by">Sort by:</span>
                    <Form.Select
                        className="custom-sort-select"
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)} // ✅ update state
                    >
                        <option>All Time</option>
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </Form.Select>
                    <Button variant="light" className="border custom-filter-button">
                        <PiSlidersDuotone />
                    </Button>

                        <Button variant="default" onClick={handleAddPatient}>
                        <div className="d-flex justify-content-center align-items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                <path d="M18.75 9.375C18.75 9.67337 18.6315 9.95952 18.4205 10.1705C18.2095 10.3815 17.9234 10.5 17.625 10.5H10.5V17.625C10.5 17.9234 10.3815 18.2095 10.1705 18.4205C9.95952 18.6315 9.67337 18.75 9.375 18.75C9.07663 18.75 8.79048 18.6315 8.5795 18.4205C8.36853 18.2095 8.25 17.9234 8.25 17.625V10.5H1.125C0.826631 10.5 0.540483 10.3815 0.329505 10.1705C0.118526 9.95952 0 9.67337 0 9.375C0 9.07663 0.118526 8.79048 0.329505 8.5795C0.540483 8.36853 0.826631 8.25 1.125 8.25H8.25V1.125C8.25 0.826631 8.36853 0.540483 8.5795 0.329505C8.79048 0.118526 9.07663 0 9.375 0C9.67337 0 9.95952 0.118526 10.1705 0.329505C10.3815 0.540483 10.5 0.826631 10.5 1.125V8.25H17.625C17.9234 8.25 18.2095 8.36853 18.4205 8.5795C18.6315 8.79048 18.75 9.07663 18.75 9.375Z" fill="white" />
                            </svg>
                            Add Patient
                        </div>
                    </Button>


                </div>
            </div> */}

            <div className=" d-flex justify-content-between flex-xl-row flex-column gap-xl-0 gap-sm-2 gap-0 mb-3">
                <div className='d-flex align-items-center flex-sm-row flex-column gap-2 '>

                    <InputFieldGroup
                        name="search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
                        placeholder="search"
                        required={false}
                        disabled={false}
                        readOnly={false}

                        className="position-relative blood-test-search patient-header-search patient-header-search-width-doctor-list"
                    >
                        <div className="blood-test-search-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#B0B4C1" />
                            </svg>
                        </div>
                    </InputFieldGroup>

                    <div className='appointments-total-box d-flex align-items-center gap-2'>
                        <Image src={dummpyPatientList} width={31} height={31} alt="dummpyPatientList" />
                        <p className='appointments-total-box-item m-0'>{patientCoute} Patients</p>

                    </div>
                </div>

                <div className="d-flex align-items-center justify-content-sm-between justify-content-center gap-sm-3 gap-2 mt-sm-0 mt-2">
                    <div className="d-flex align-items-center gap-2">

                        <span className="sort-by-lable">Sort by:</span>
                        <InputSelect
                            label=""
                            name="tests"

                            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
                            required={true}
                            disabled={false}
                            placeholder="All Time"
                            className="patient-header-select-filter"

                            options={[
                                { id: "1", value: "Today", label: "Today" },
                                { id: "2", value: "Yesterday", label: "Yesterday" },
                                { id: "3", value: "tomorrow", label: "tomorrow" },
                            ]}
                        />
                        <div className="patient-header-filter-icon-box">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                                <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
                            </svg>
                        </div>

                        <Button variant="default" onClick={handleAddPatient}>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                    <path d="M18.75 9.375C18.75 9.67337 18.6315 9.95952 18.4205 10.1705C18.2095 10.3815 17.9234 10.5 17.625 10.5H10.5V17.625C10.5 17.9234 10.3815 18.2095 10.1705 18.4205C9.95952 18.6315 9.67337 18.75 9.375 18.75C9.07663 18.75 8.79048 18.6315 8.5795 18.4205C8.36853 18.2095 8.25 17.9234 8.25 17.625V10.5H1.125C0.826631 10.5 0.540483 10.3815 0.329505 10.1705C0.118526 9.95952 0 9.67337 0 9.375C0 9.07663 0.118526 8.79048 0.329505 8.5795C0.540483 8.36853 0.826631 8.25 1.125 8.25H8.25V1.125C8.25 0.826631 8.36853 0.540483 8.5795 0.329505C8.79048 0.118526 9.07663 0 9.375 0C9.67337 0 9.95952 0.118526 10.1705 0.329505C10.3815 0.540483 10.5 0.826631 10.5 1.125V8.25H17.625C17.9234 8.25 18.2095 8.36853 18.4205 8.5795C18.6315 8.79048 18.75 9.07663 18.75 9.375Z" fill="white" />
                                </svg>
                                Add Patient
                            </div>
                        </Button>

                    </div>
                </div>

            </div>


            {/* <CommonTable data={filteredData} columns={columns} /> */}

            <CommonTable data={getAllPatients} columns={columns} />

        </div>
    );
}