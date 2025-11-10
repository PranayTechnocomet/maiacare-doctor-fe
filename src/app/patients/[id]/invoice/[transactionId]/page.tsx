"use client";

import { useParams } from "next/navigation";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { PaymentHistoryData } from "@/utils/StaticData";
import PatientPaymentInvoice from "@/components/PatientPaymentInvoice";

export default function PatientDetailPage() {
 const params = useParams();
const PatientPaymentHistoryId = params?.transactionId;

    const dispatch: AppDispatch = useDispatch();

    const PaymentHistory = useMemo(
        () => PaymentHistoryData.find(p => String(p.transactionId) === String(PatientPaymentHistoryId)),
        [PatientPaymentHistoryId]
    );

    useEffect(() => {
        dispatch(setHeaderData({ title: PaymentHistory ? PaymentHistory.actions : "Payment History Not Found" }));
    }, [PaymentHistory, dispatch]);

    if (!PaymentHistory) {
        return <div className="p-4">PaymentHistory not found</div>;
    }

    return (
        <div>
            <PatientPaymentInvoice />
        </div>
    );
}
