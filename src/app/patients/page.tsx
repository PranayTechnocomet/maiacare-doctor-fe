"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { InputFieldGroup } from "@/components/ui/InputField";
import { Col, Row } from "react-bootstrap";
import InputSelect from "@/components/ui/InputSelect";
import PhisicalAssessment from "@/components/PhisicalAssessment";
import FertilityAssessment from "@/components/FertilityAssessment";
import "@/style/fertilityassessment.css";
import "@/style/settingsPassword.css";
import "@/style/patientProfile.css";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Patients", subtitle: "Patients List" }));
  }, []);

  return (
    <>
    

      <div>
        <h6>PhisicalAssessment and FertilityAssessment modal </h6>
        <div className="d-flex gap-5">

          <PhisicalAssessment />
          <FertilityAssessment />

        </div>
      </div>

    </>

  );
}

export default Page;