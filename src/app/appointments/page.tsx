"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Dashboard from "@/components/Dashboard";
import DoctorListing from "@/components/DoctorListing";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Appointments", subtitle: "Appointments List" }));
  }, []);
  return (
    <div>
      {/* <h1>Appointments</h1></div> */}
      <DoctorListing />

    </div>
  )
}

export default Page;