
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

      <Row >
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

            <div className="profile-card-btn-status">
              <Badge className="profile-active-btn">
                {status}
              </Badge>
            </div>
          </div>


          <div className=''>
            <span className='me-2 doctor-profile-subheading'><Image src={ProfileId} alt="Age" width={14} height={16} className="me-1" /> {id}</span>
            <span className='doctor-profile-subheading'><Image src={ProfileGender} alt="Age" width={14} height={16} className="me-1" /> {gender}</span>
          </div>
          <span className='me-2 doctor-profile-subheading'><Image src={Cacke} alt="Age" width={15} height={15} className="me-1" /> {dob}</span>
          <span className='doctor-profile-subheading'><Image src={ProfileAge} alt="Age" width={15} height={15} className="me-1" /> {age} Years</span>

          <div className="pt-1 doctor-profile-subheading">
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
      </Row>

    </Card>
  );
};



