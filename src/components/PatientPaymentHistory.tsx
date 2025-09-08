"use client"

import { ColumnDef } from "@tanstack/react-table";
import PatientPaymentInvoice from "./PatientPaymentInvoice";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { PaymentHistoryData } from "@/utils/StaticData";
import BaseTable from "@/components/ui/BaseTable";

const columns: ColumnDef<any>[] = [
    {
        header: "Transaction ID",
        accessorKey: "transactionId",
    },
    {
        header: "Service Type",
        accessorKey: "serviceType",
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
        header: "Payment Mode",
        accessorKey: "paymentMode",
    },
    {
        header: "Amount",
        accessorKey: "amount",
    },
    {
        header: "Status",
        accessorKey: "status",
        cell: (info) => {
            const status = info.getValue() as string;
            return (
                <span
                    className={` ${status == "Refunded" ? "patient-journey-badge-InProgress" : status === "Pending"
                        ? "patient-journey-badge-pending"
                        : status === "Paid"
                        && "patient-journey-badge-success"

                        }`}
                >
                    {status}
                </span>
            );
        },
    },
    {
        header: "Actions",
        accessorKey: "actions",
    },
];

const PatientPaymentHistory = () => {

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
        setTableData(PaymentHistoryData);
        setLoading(false);
    }, []);

    return (
        <>
            <div className="mt-4">
                <BaseTable data={tableData} columns={columns} />

                {/* <PatientPaymentInvoice /> */}

            </div>

        </>
    );
};

export default PatientPaymentHistory;
