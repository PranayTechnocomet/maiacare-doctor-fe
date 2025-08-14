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


function SettingChangePassword() {
    return (
        <>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row className="g-3">
                    <Col md={4}>
                        <ContentContainer>
                            <Nav variant="pills" className="flex-column custom-nav">
                                <Nav.Item>
                                    <Nav.Link eventKey="first" className="custom-nav-link">
                                        <div className="setting-password-item d-flex gap-2 align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="currentColor"
                                                className="nav-icon" >
                                                <path d="M16.25 4.08594H3.75C3.41848 4.08594 3.10054 4.21763 2.86612 4.45205C2.6317 4.68647 2.5 5.00442 2.5 5.33594V9.71094C2.5 13.8297 4.49375 16.3258 6.16641 17.6945C7.96797 19.168 9.76016 19.6687 9.83828 19.6891C9.9457 19.7183 10.059 19.7183 10.1664 19.6891C10.2445 19.6687 12.0344 19.168 13.8383 17.6945C15.5063 16.3258 17.5 13.8297 17.5 9.71094V5.33594C17.5 5.00442 17.3683 4.68647 17.1339 4.45205C16.8995 4.21763 16.5815 4.08594 16.25 4.08594ZM16.25 9.71094C16.25 12.607 15.1828 14.9578 13.0781 16.6969C12.1619 17.4513 11.12 18.0384 10 18.4312C8.89469 18.0453 7.86558 17.4686 6.95938 16.7273C4.82969 14.9852 3.75 12.625 3.75 9.71094V5.33594H16.25V9.71094Z" />
                                            </svg>

                                            <span className="setting-password-item-name">Login & Security</span>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="second" className="custom-nav-link">
                                        <div className="setting-password-item d-flex gap-2 align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="currentColor"
                                                className="nav-icon" >
                                                <path d="M17.3281 14.7063C16.8945 13.9594 16.25 11.8461 16.25 9.08594C16.25 7.42833 15.5915 5.83862 14.4194 4.66652C13.2473 3.49442 11.6576 2.83594 10 2.83594C8.34241 2.83594 6.7527 3.49442 5.58059 4.66652C4.40849 5.83862 3.75001 7.42833 3.75001 9.08594C3.75001 11.8469 3.1047 13.9594 2.6711 14.7063C2.56038 14.8961 2.50168 15.1118 2.50092 15.3316C2.50017 15.5514 2.55739 15.7676 2.66681 15.9582C2.77623 16.1488 2.93398 16.3072 3.12415 16.4175C3.31433 16.5277 3.53021 16.5858 3.75001 16.5859H6.93829C7.08249 17.2915 7.46597 17.9257 8.02386 18.3811C8.58176 18.8365 9.27983 19.0852 10 19.0852C10.7202 19.0852 11.4183 18.8365 11.9762 18.3811C12.5341 17.9257 12.9175 17.2915 13.0617 16.5859H16.25C16.4697 16.5856 16.6855 16.5274 16.8756 16.4172C17.0657 16.3069 17.2233 16.1485 17.3326 15.9579C17.442 15.7672 17.4991 15.5512 17.4983 15.3315C17.4975 15.1117 17.4388 14.8961 17.3281 14.7063ZM10 17.8359C9.61237 17.8358 9.23429 17.7156 8.91782 17.4917C8.60135 17.2678 8.36204 16.9514 8.23282 16.5859H11.7672C11.638 16.9514 11.3987 17.2678 11.0822 17.4917C10.7657 17.7156 10.3877 17.8358 10 17.8359ZM3.75001 15.3359C4.35157 14.3016 5.00001 11.9047 5.00001 9.08594C5.00001 7.75985 5.52679 6.48809 6.46448 5.5504C7.40216 4.61272 8.67393 4.08594 10 4.08594C11.3261 4.08594 12.5979 4.61272 13.5355 5.5504C14.4732 6.48809 15 7.75985 15 9.08594C15 11.9023 15.6469 14.2992 16.25 15.3359H3.75001Z" />
                                            </svg>
                                            <span className="setting-password-item-name">Notification Settings</span>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="third" className="custom-nav-link">
                                        <div className="setting-password-item d-flex gap-2 align-items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="currentColor"
                                                className="nav-icon">
                                                <path d="M15.7727 5.23125C15.025 4.47608 14.1357 3.87579 13.1558 3.46477C12.1758 3.05375 11.1244 2.84006 10.0617 2.83594H10C7.84512 2.83594 5.77849 3.69196 4.25476 5.21569C2.73102 6.73943 1.875 8.80605 1.875 10.9609V15.3359C1.875 15.8332 2.07254 16.3101 2.42417 16.6618C2.77581 17.0134 3.25272 17.2109 3.75 17.2109H5C5.49728 17.2109 5.97419 17.0134 6.32583 16.6618C6.67746 16.3101 6.875 15.8332 6.875 15.3359V12.2109C6.875 11.7137 6.67746 11.2367 6.32583 10.8851C5.97419 10.5335 5.49728 10.3359 5 10.3359H3.15313C3.27366 9.03276 3.76315 7.79094 4.56424 6.75602C5.36532 5.7211 6.44481 4.93596 7.67617 4.49263C8.90753 4.0493 10.2398 3.96614 11.5167 4.2529C12.7936 4.53966 13.9624 5.18445 14.8859 6.11172C16.0148 7.24633 16.7091 8.74145 16.8477 10.3359H15C14.5027 10.3359 14.0258 10.5335 13.6742 10.8851C13.3225 11.2367 13.125 11.7137 13.125 12.2109V15.3359C13.125 15.8332 13.3225 16.3101 13.6742 16.6618C14.0258 17.0134 14.5027 17.2109 15 17.2109H16.875C16.875 17.7082 16.6775 18.1851 16.3258 18.5368C15.9742 18.8884 15.4973 19.0859 15 19.0859H10.625C10.4592 19.0859 10.3003 19.1518 10.1831 19.269C10.0658 19.3862 10 19.5452 10 19.7109C10 19.8767 10.0658 20.0357 10.1831 20.1529C10.3003 20.2701 10.4592 20.3359 10.625 20.3359H15C15.8288 20.3359 16.6237 20.0067 17.2097 19.4206C17.7958 18.8346 18.125 18.0397 18.125 17.2109V10.9609C18.1291 9.89811 17.9234 8.84491 17.5197 7.86171C17.1161 6.87851 16.5224 5.98461 15.7727 5.23125ZM5 11.5859C5.16576 11.5859 5.32473 11.6518 5.44194 11.769C5.55915 11.8862 5.625 12.0452 5.625 12.2109V15.3359C5.625 15.5017 5.55915 15.6607 5.44194 15.7779C5.32473 15.8951 5.16576 15.9609 5 15.9609H3.75C3.58424 15.9609 3.42527 15.8951 3.30806 15.7779C3.19085 15.6607 3.125 15.5017 3.125 15.3359V11.5859H5ZM15 15.9609C14.8342 15.9609 14.6753 15.8951 14.5581 15.7779C14.4408 15.6607 14.375 15.5017 14.375 15.3359V12.2109C14.375 12.0452 14.4408 11.8862 14.5581 11.769C14.6753 11.6518 14.8342 11.5859 15 11.5859H16.875V15.9609H15Z" />
                                            </svg>
                                            <span className="setting-password-item-name">Support</span>
                                        </div>
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </ContentContainer>
                    </Col>
                    <Col md={8}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">

                                <Accordion defaultActiveKey="0">
                                    <ContentContainer className="mb-3">

                                        <Accordion.Item eventKey="0" className="setting-accordion-item" >
                                            <Accordion.Header>
                                                <div className="d-flex justify-content-center align-items-center gap-3">
                                                    <Image src={passwordSettingImg} width={48} height={48} alt="password-img" />

                                                    <span className="accordion-title">Password Settings</span>

                                                </div>

                                            </Accordion.Header>
                                            <Accordion.Body className="p-0">

                                                <PasswordSettings />

                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </ContentContainer>
                                    <ContentContainer className="mb-3">
                                        <Accordion.Item eventKey="1" className="setting-accordion-item">
                                            <Accordion.Header>

                                                <div className="d-flex justify-content-center align-items-center gap-3">
                                                    <Image src={yourDeviceImg} width={48} height={48} alt="your-device-img" />

                                                    <span className="accordion-title">Your Devices</span>

                                                </div>

                                            </Accordion.Header>
                                            <Accordion.Body className="p-0">

                                                <SettingsDevices />

                                            </Accordion.Body>
                                        </Accordion.Item>

                                    </ContentContainer>


                                </Accordion>

                            </Tab.Pane>
                            <Tab.Pane eventKey="second">

                                <SettingsNotification />

                            </Tab.Pane>

                            <Tab.Pane eventKey="third">

                                <SettingsSupport />

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </>
    )
}

export default SettingChangePassword
