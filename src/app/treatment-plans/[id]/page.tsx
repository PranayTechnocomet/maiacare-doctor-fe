"use client";

import { useParams } from "next/navigation";
import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { consultationData, treatmentPlanData } from "@/utils/StaticData";
import AddMedicalHistory from "@/components/AddMedicalHistory";
import AppointmentsMonth from "@/components/AppointmentsMonth";
import TreatmentEditForm from "@/components/TreatmentEditForm";
import TreatmentTable from "@/components/TreatmentPatient"
import TreatmentPatient from "@/components/TreatmentPatient";



export default function PatientDetailPage() {
    const params = useParams();
    const treatmentplan = params?.id;
    const dispatch: AppDispatch = useDispatch();

    const treatment = useMemo(
        () => treatmentPlanData.find(p => String(p.id) === String(treatmentplan)),
        [treatmentplan]
    );

    useEffect(() => {
        dispatch(setHeaderData({ title: treatment ? treatment.patientName : "treatment-plan Not Found" }));

    }, [treatment, dispatch]);

    if (!treatmentplan) {
        return <div className="p-4">treatmentplan not found</div>;
    }

    return (
        <div>
            {/* Pass the data to the component */}
            <TreatmentPatient />
        </div>
    );
}
