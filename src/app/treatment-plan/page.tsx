"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Treatment from "@/components/Treatment";
import '@/style/treatment.css'
import '@/style/appointments.css'
import '@/style/patientProfile.css';
import '@/style/fertilityassessment.css'

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Treatment Plan", subtitle: "Treatment Plan" }));
  }, []);
  return (
    <>
      <Treatment />
    </>
  )
}

export default Page

