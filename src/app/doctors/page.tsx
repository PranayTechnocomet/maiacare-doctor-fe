"use client";

import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/utils/redux/store";
import Dashboard from "@/components/Dashboard";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Doctors", subtitle: "Doctors List" }));
  }, []);

  return (
    <div>
      {/* <h1>Doctors</h1> */}
      <Dashboard />
    </div>
  );
}

export default Page;
