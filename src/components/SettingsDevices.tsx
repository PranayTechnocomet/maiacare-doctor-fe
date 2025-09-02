import React from 'react'
import Button from './ui/Button'
import Image from 'next/image'
import { FiLogOut } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import deviceWindowsImg from "@/assets/images/device-windows.png";
import deviceMobileImg from "@/assets/images/device-mobile.png";

const SettingsDevices = () => {
    return (
        <>
            <p className="settings-accordion-subtitle my-4">Where you're signed in</p>
            <div className="d-flex flex-column gap-4 ">
                <div className="your-device-box d-flex flex-column flex-sm-row justify-content-between gap-3 align-items-start align-items-sm-center">
                    <div className="d-flex justify-content-center align-items-center gap-3 ">
                        <Image src={deviceWindowsImg} width={70} height={70} alt="device-window" />
                        <div>
                            <h6 className="your-device-box-title mb-1">Windows Computer</h6>
                            <p className="your-device-box-subtitle mb-0 ">Google Chrome | Mumbai Logged In</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-sm-column gap-2">
                        <Button variant="default" contentSize="small">
                            <div className='d-flex align-items-center justify-content-center gap-2'>

                            <FiLogOut /> Log Out
                            </div>
                        </Button>
                        <Button variant="outline" disabled={false} contentSize="small">
                            <div className='d-flex align-items-center justify-content-center gap-2'>

                            <RiDeleteBin6Line /> Delete Devices
                            </div>
                        </Button>

                    </div>

                </div>

                <div className="your-device-box d-flex flex-column flex-sm-row justify-content-between gap-3 align-items-start align-items-sm-center">
                    <div className="d-flex justify-content-center align-items-center gap-3 ">
                        <Image src={deviceMobileImg} width={70} height={70} alt="device-window" />
                        <div>
                            <h6 className="your-device-box-title mb-1">Redmi Note 13 Pro</h6>
                            <p className="your-device-box-subtitle mb-0">Google Chrome | Mumbai Logged In</p>
                        </div>
                    </div>
                    <div className="d-flex flex-row flex-sm-column gap-2">
                        <Button variant="default" contentSize="small" >
                            <FiLogOut /> Log Out
                        </Button>
                        <Button variant="outline" disabled={false} contentSize="small" >
                            <RiDeleteBin6Line /> Delete Devices
                        </Button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default SettingsDevices