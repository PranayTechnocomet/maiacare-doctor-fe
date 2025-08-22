import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { AppDispatch } from "@/utils/redux/store";
import { appointmentData, tableResponse } from "@/utils/StaticData";
import { Patient } from "@/utils/types/interfaces";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import BaseTable from "@/components/ui/BaseTable";

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
    },
    {
        header: "Invoice",
        accessorKey: "invoice",
    },
    {
        header: "Actions",
        accessorKey: "actions",
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
        setTableData(appointmentData);
        setLoading(false);
    }, []);

    return (
        <div>
            <BaseTable data={tableData} columns={columns} />

        </div>
    );
};

export default PatientAppointment;