import React from 'react'
import Logo from "../../../assets/images/Maia Logo.png"
import Image from 'next/image';
import '../../../style/login.css'
import { IoIosArrowForward } from "react-icons/io";
import Individual from "../../../assets/images/Profile_Doctor.png"
export function LoginTitle({title,subtitle,className}: {title: string, subtitle: string, className?: string}) {
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


export function ProfileCard(){
    return(
        <>
            <div className='d-flex flex-column align-items-center'>
                <div className='profile-card d-flex justify-content-between '>
                     <div className='d-flex gap-3 align-items-center justify-content-center' >
                        <Image src={Individual} alt="MAIA Care Logo" width={70} height={70} className=" mb-2"/>
                        <div>
                            <h2>Individual</h2>
                            <p>Individual doctor login</p>
                        </div>
                        <IoIosArrowForward/>
                     </div>
                </div>
                
            </div>
        </>
    )
}
