"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import AddMedicalHistory from "@/components/AddMedicalHistory";


function Page() {
    const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Patients", subtitle: "Patients List" }));
  }, []);
  return <div>
    


    <AddMedicalHistory/>
  </div>;
}

export default Page;