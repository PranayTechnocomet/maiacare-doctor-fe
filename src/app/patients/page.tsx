"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";


function Page() {
    const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Patients", subtitle: "Patients List" }));
  }, []);
  return <div>
    <h1>Patients</h1>
  </div>;
}

export default Page;