"use client";

import { AppDispatch } from "@/utils/redux/store";
import { useDispatch } from "react-redux";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { setHeaderData } from "@/utils/redux/slices/headerSlice";
import { Accordion, Col, Nav, Row, Tab } from "react-bootstrap";
import ContentContainer from "@/components/ui/ContentContainer";
import Image from "next/image";
import { InputFieldGroup } from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import PasswordSettings from "@/components/form/PasswordSettings";
import SettingsDevices from "@/components/SettingsDevices";
import SettingsNotification from "@/components/SettingsNotification";
import SettingsSupport from "@/components/SettingsSupport";
import passwordSettingImg from "@/assets/images/password-setting.png";
import yourDeviceImg from "@/assets/images/your-device.png";
import '../../style/settingsPassword.css'
import SettingChangePassword from "@/components/SettingChangePassword";

function Page() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeaderData({ title: "Settings", subtitle: "Settings" }));
  }, []);

  return (
    <>
      <SettingChangePassword />

    </>
  );
}

export default Page;

