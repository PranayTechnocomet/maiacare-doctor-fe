"use client";

import { useDispatch } from "react-redux";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { useEffect } from "react";
import { AppDispatch } from "@/utils/redux/store";
import Dashboard from "@/components/Dashboard";
import EditProfile from "@/components/Edit-Profile";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "EditProfile", subtitle: "profile > EditProfile" }));
  }, []);

  return (
    <div>
     
      <EditProfile />
    </div>
  );
}

export default Page;
