"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import AddMedicalHistory from "@/components/AddMedicalHistory";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { InputFieldGroup } from "@/components/ui/InputField";
import { Col, Row } from "react-bootstrap";
import { InputSelect } from "@/components/ui/InputSelect";
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
      <AddMedicalHistory />
    </>

  );
}

export default Page;

