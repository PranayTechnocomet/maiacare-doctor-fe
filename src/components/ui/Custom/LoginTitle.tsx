import React from 'react'
import Logo from "../../../assets/images/Maia Logo.png"
import Image from 'next/image';
export default function LoginTitle({title,subtitle,className}: {title: string, subtitle: string, className?: string}) {
    return (
        <div>
            <div className={`d-flex justify-content-center align-item-center main-login-title ${className}`}>


                <Image
                    src={Logo} // Logo should be in /public/Images/
                    alt="MAIA Care Logo"
                    width={150}
                    height={50}
                    className=" mb-2"
                />
            </div>
            <h2 className="login-title  " >
                {title}
            </h2>
            <p className="login-subtitle ">{subtitle}</p>
        </div>
    )
}
