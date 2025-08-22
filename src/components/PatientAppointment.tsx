import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { AppDispatch } from "@/utils/redux/store";
import { AppointmentData, tableResponse } from "@/utils/StaticData";
import { Patient } from "@/utils/types/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BaseTable from "@/components/ui/BaseTable";
import uploadIcon from "@/assets/images/upload-icon-table.png";
import ViewIcon from "@/assets/images/view-icon-table.png";
import fileIcon from "@/assets/images/file-icon-table.png";
import dotsIcon from "../assets/images/three-dot-icon-table.png"
import Image from "next/image";

const columns: ColumnDef<Patient>[] = [
    {
        header: "#",
        accessorKey: "id",
    },
    {
        header: "Reason",
        accessorKey: "reason",
    },
    {
        header: "Date",
        accessorKey: "date",
    },
    {
        header: "Time",
        accessorKey: "time",
    },
    {
        header: "Payment",
        accessorKey: "payment",
        cell: (info) => {
            const payment = info.getValue() as string;
            return (
                <span
                    className={` ${payment === "Pending"
                        ? "patient-journey-badge-pending"
                        : payment === "Done"
                        && "patient-journey-badge-success"

                        }`}
                >
                    {payment}
                </span>
            );
        },
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: (info) => {
            const status = info.getValue() as string;
            return (
                <span
                    className={` ${status === "Upcoming"
                        ? "patient-journey-badge-InProgress"
                        : status === "Completed"
                        && "patient-journey-badge-success"

                        }`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        header: "Prescription",
        accessorKey: "prescription",
        cell: (info) => {
            const prescription = info.getValue() as string;
            return (
                <>
                    {prescription === "N/A" && <span>{prescription}</span>}
                    {prescription === "file" && <Image src={uploadIcon} width={40} height={40} alt="uploadIcon" onClick={() => { alert(`${info.row.original.id}`) }} />}
                    {prescription === "viewfile" && <Image src={ViewIcon} width={40} height={40} alt="ViewIcon" />}
                </>

            );
        },
    },
    {
        header: "Invoice",
        accessorKey: "invoice",
        cell: (info) => {
            const Invoice = info.getValue() as string;
            return (
                <>
                    {Invoice === "N/A" && <span>{Invoice}</span>}
                    {Invoice === "file" && <Image src={uploadIcon} width={40} height={40} alt="uploadIcon" />}
                    {Invoice === "viewfile" && <Image src={fileIcon} width={40} height={40} alt="ViewIcon" />}
                </>

            );
        },
    },
    {
        header: "Actions",
        accessorKey: "actions",
        cell: (info) => {
            const Actions = info.getValue() as string;
            return (
                <>
                    {Actions === "View" && <Image src={dotsIcon} width={40} height={40} alt="ViewIcon" />}
                </>

            );
        },
    },
];

const PatientAppointment = () => {

    const dispatch: AppDispatch = useDispatch();
    const [tableData, setTableData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        dispatch(
            setHeaderData({
                title: "Sample Page",
                subtitle: "Sample Page for check common components",
            })
        );
        setTableData(AppointmentData);
        setLoading(false);
    }, []);

    return (
        <div>
            <BaseTable data={tableData} columns={columns} />

        </div>
    );
};

export default PatientAppointment;