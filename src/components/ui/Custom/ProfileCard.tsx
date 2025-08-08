
import React, { useState } from 'react';

import { Nav, Tab } from 'react-bootstrap';
import Image from 'next/image';
import { Card, Row, Col, Badge, Dropdown } from 'react-bootstrap';
import {
  BsPersonBadge,
  BsGenderFemale,
  BsCalendar2Check,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import PrfileImage from '../../../assets/images/Profile_Image.png'
import ProfileAge from '../../../assets/images/Profile_Age.png'
import ProfileId from '../../../assets/images/Profile_Id.png'
import ProfileGender from '../../../assets/images/Profile_Gender.png'
import ProfileDob from '../../../assets/images/Profile_Calendar.png'
import Cacke from '../../../assets/images/Cake.png'
import '../../../style/profile.css';
import ProfileBasicDetail from '@/components/ProfileBasicDetail';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import ContentContainer from '../ContentContainer';
import CustomTabs from '../CustomTabs';


type ProfileProps = {
  name: string;
  image: string;
  id: string;
  gender: string;
  dob: string;
  age: number;
  joinDate: string;
  status: 'Active' | 'Inactive';
};

export const ProfileCard: React.FC<ProfileProps> = ({
  name,
  image,
  id,
  gender,
  dob,
  age,
  joinDate,
  status,
}) => {
  return (
    <Card className={`shadow-sm rounded-4 p-3`}>
      {/* <Row >
        <Col xs="auto">
          <Image
            src={PrfileImage}
            alt={name}
            width={90}
            height={90}
            className="rounded-3"
          />
        </Col>
        <Col>
          <div className="d-flex align-items-center mb-1">
            <h6 className="mb-0 doctor-profile-heading me-2">{name}</h6>

            <span className='patient-journey-badge-InProgress'> {status}</span>
          </div>

          <div className='pt-sm-1 p-0 d-flex  '>
            <span className='me-2 doctor-profile-subheading'><Image src={ProfileId} alt="Age" width={14} height={16} className="me-1" /> {id}</span>
            <span className='doctor-profile-subheading'><Image src={ProfileGender} alt="Age" width={14} height={16} className="me-1" /> {gender}</span>
          </div>
          <div className='pt-sm-1 p-0 d-flex '>
            <span className='me-2 doctor-profile-subheading'><Image src={Cacke} alt="Age" width={15} height={15} className="me-1" /> {dob}</span>
            <span className='doctor-profile-subheading'><Image src={ProfileAge} alt="Age" width={15} height={15} className="me-1" /> {age} Years</span>
          </div>
          <div className="pt-sm-1 p-0 doctor-profile-subheading">
            <Image src={ProfileDob} alt="Age" width={15} height={15} className="me-1" /> Joined Date: {joinDate}
          </div>


        </Col>
        <Col xs="auto">
          <Dropdown align="end" className="d-flex align-items-center">
            <Dropdown.Toggle
              as="button"
              id="dropdown-basic"
              className="bg-transparent border-0 p-1 no-caret"
            >
              <div className='patient-profile-dot'>

                <HiOutlineDotsHorizontal />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>View</Dropdown.Item>
              <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row> */}

    <div className='d-flex justify-content-between align-items-start  '>
      <div className='d-flex align-items-start align-items-sm-center gap-3 flex-column flex-sm-row'>
        <div>
        <Image
            src={PrfileImage}
            alt={name}
            width={90}
            height={90}
            className="rounded-3"
          />
        </div>
        <div>
        <div className="d-flex align-items-center mb-1">
            <h6 className="mb-0 doctor-profile-heading me-2">{name}</h6>

            <span className='patient-journey-badge-InProgress'> {status}</span>
          </div>

          <div className='pt-sm-1 p-0 d-flex  '>
            <span className='me-2 doctor-profile-subheading'><Image src={ProfileId} alt="Age" width={14} height={16} className="me-1" /> {id}</span>
            <span className='doctor-profile-subheading'><Image src={ProfileGender} alt="Age" width={14} height={16} className="me-1" /> {gender}</span>
          </div>
          <div className='pt-sm-1 p-0 d-flex '>
            <span className='me-2 doctor-profile-subheading'><Image src={Cacke} alt="Age" width={15} height={15} className="me-1" /> {dob}</span>
            <span className='doctor-profile-subheading'><Image src={ProfileAge} alt="Age" width={15} height={15} className="me-1" /> {age} Years</span>
          </div>
          <div className="pt-sm-1 p-0 doctor-profile-subheading">
            <Image src={ProfileDob} alt="Age" width={15} height={15} className="me-1" /> Joined Date: {joinDate}
          </div>


        </div>
      </div>
      <div>
      <Dropdown align="end" className="d-flex align-items-center">
            <Dropdown.Toggle
              as="button"
              id="dropdown-basic"
              className="bg-transparent border-0 p-1 no-caret"
            >
              <div className='patient-profile-dot'>

                <HiOutlineDotsHorizontal />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu-end">
              <Dropdown.Item>Edit</Dropdown.Item>
              <Dropdown.Item>View</Dropdown.Item>
              <Dropdown.Item className="text-danger">Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
      </div>
    </div>

    </Card>
  );
};

export const TabsSection = () => {
  // const [key, setKey] = useState<string>('basic');
  const [activeTab, setActiveTab] = useState<string>("basic");

  const tabOptions = [
    {
      key: "basic",
      label: "Basic Details",
      content: (
        <div className='mt-5'>
          <ProfileBasicDetail />
        </div>

      ),
    },
    {
      key: "leaves",
      label: "Manage Leaves",
      content: (
        <ContentContainer className="mt-5">
          <h1>Leaves Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "reviews",
      label: "Reviews",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reviews Content</h1>
        </ContentContainer>
      ),
    },
    {
      key: "xyz",
      label: "Xyz",
      content: (
        <ContentContainer className="mt-5">
          <h1>XYZ</h1>
        </ContentContainer>
      ),
    },
    {
      key: "abc",
      label: "ABC",
      content: (
        <ContentContainer className="mt-5">
          <h1>ABC</h1>
        </ContentContainer>
      ),
    },
    {
      key: "de",
      label: "Reviews",
      content: (
        <ContentContainer className="mt-5">
          <h1>Reviews Content</h1>
        </ContentContainer>
      ),
    },
  ];

  return (
    <CustomTabs
      activeKey={activeTab}
      setActiveKey={setActiveTab}
      tabOptions={tabOptions}
    />

    // <Tab.Container activeKey={key} onSelect={(k) => k && setKey(k)}>
    //   <Nav variant="tabs" className="customTabs">
    //     <Nav.Item>
    //       <Nav.Link eventKey="basic">Basic Details</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="partner">Partner Details</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="appointment">Appointment</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="reports">Reports</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="payment">Payment History</Nav.Link>
    //     </Nav.Item>
    //     <Nav.Item>
    //       <Nav.Link eventKey="treatment">Treatment</Nav.Link>
    //     </Nav.Item>
    //   </Nav>

    //   <Tab.Content className="pt-3">
    //     <Tab.Pane eventKey="basic">
    //       <ProfileBasicDetail />
    //     </Tab.Pane>
    //     <Tab.Pane eventKey="partner">
    //       <p>Partner Details content here.</p>
    //     </Tab.Pane>
    //     <Tab.Pane eventKey="appointment">
    //       <p>Appointment info goes here.</p>
    //     </Tab.Pane>
    //     <Tab.Pane eventKey="reports">
    //       <p>Reports content.</p>
    //     </Tab.Pane>
    //     <Tab.Pane eventKey="payment">
    //       <p>Payment History section.</p>
    //     </Tab.Pane>
    //     <Tab.Pane eventKey="treatment">
    //       <p>Treatment information.</p>
    //     </Tab.Pane>
    //   </Tab.Content>
    // </Tab.Container>
  );
};

