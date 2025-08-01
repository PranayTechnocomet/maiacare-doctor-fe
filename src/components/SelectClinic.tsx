'use client';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from 'next/navigation';

import Logo from "../assets/images/Maia Logo.png";
import PregnecyWomanLogin from "../assets/images/Pregnecy_Woman_Login.png";
import FertilityClinic from "../assets/images/Fertility Clinic.png";
import GoodHealthClinic from "../assets/images/GoodHealth Clinic.png";
import RightArrow from "../assets/icons/RightArrow.svg";
import "../style/login.css";

export default function SelectClinic() {
  // ✅ JSON-style data defined inside the same file
  const profileData = [
    {
      id: 1,
      image: GoodHealthClinic,
      title: "GoodHealth Clinic",
      route: "/"
    },
    {
      id: 2,
      image: FertilityClinic,
      title: "Fertility Clinic",
      route: "/"
    },
    
  ];

  const router = useRouter();

  return (
    <Container fluid>
      <Row className='min-vh-100'>
        {/* Left Section */}
        <Col md={6} className="d-flex align-items-center justify-content-center">
          <div>
            <div className='d-flex justify-content-center align-item-center'>
              <Image
                src={Logo}
                alt="MAIA Care Logo"
                width={145}
                height={45}
                className="mb-2"
              />
            </div>

            <h2 className="login-title text-center mt-3">Select Clinic.</h2>
            <p className="login-subtitle text-center">
              Select clinic you want to sign in
            </p>

            <div className='d-flex flex-column align-items-center select-profile-main'>
              {profileData.map((profile) => (
                <div key={profile.id} className='profile-card d-flex justify-content-between align-items-center my-2 w-100' onClick={() => router.push(profile.route)}>
                {/* Left side: image + title + subtitle */}
                <div className='d-flex gap-3 align-items-center'>
                  <div className='select-profile-img-wrapeer'>
                  <Image
                    src={profile.image}
                    alt={`${profile.title} Logo`}
                    width={70}
                    height={70}
                    className="mb-2 select-clinic-image"
                  />
                  </div>
                  <div>
                    <h2 className='select-profile-title'>{profile.title}</h2>
                  </div>
                </div>
              
                
                <Image
                  src={RightArrow}
                  alt="Right Arrow"
                  width={24}
                  height={24}
                />
              </div>
              ))}
            </div>
          </div>
        </Col>

        
        <Col md={6} className='p-0 d-none d-md-block'>
          <div className="h-100 w-100 position-relative main-pregnancy-img">
            <Image
              src={PregnecyWomanLogin}
              alt="Login Image"
              fill
              className="pregnecy-image w-100 h-100"
            />
            <div className="position-absolute bottom-0 start-0 text-center p-2">
              <p className='login-image-contetnt m-0'>
                Heal, Connect, & Lead -<br className="d-block md-none" />
                The Future of Fertility Support Starts Here.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
