import React from 'react'
import Button from './ui/Button'
import Image from 'next/image'

const SettingsDevices = () => {
    return (
        <>
            <p className="settings-accordion-subtitle">Where you're signed in</p>
            <div className="d-flex flex-column gap-4 ">
                <div className="your-device-box d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-3 ">
                        <Image src="/images/device-windows.png" width={70} height={70} alt="device-window" />
                        <div>
                            <h6 className="your-device-box-title mb-1">Windows Computer</h6>
                            <p className="your-device-box-subtitle mb-0">Google Chrome | Mumbai Logged In</p>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <Button variant="default" >
                            Log Out
                        </Button>
                        <Button variant="default"  >
                            Delete Device
                        </Button>
                    </div>

                </div>

                <div className="your-device-box d-flex justify-content-between">
                    <div className="d-flex justify-content-center align-items-center gap-3 ">
                        <Image src="/images/device-mobile.png" width={70} height={70} alt="device-window" />
                        <div>
                            <h6 className="your-device-box-title mb-1">Redmi Note 13 Pro</h6>
                            <p className="your-device-box-subtitle mb-0">Google Chrome | Mumbai Logged In</p>
                        </div>
                    </div>
                    <div className="d-flex flex-column gap-2">
                        <Button variant="default" >
                            Log Out
                        </Button>
                        <Button variant="default"  >
                            Delete Device
                        </Button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SettingsDevices