import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';
import BookCalendar from "../assets/images/BookCalendar.png";
import Image from 'next/image';
import {
  leaveData as defaultLeaveData,
  leaveColumns as defaultLeaveColumns,
  LeaveEntry,
  tableResponse,
  ClinicReviewsTable,
} from "@/utils/StaticData";
import BaseTable from "@/components/ui/BaseTable";
import Trash from "../assets/images/Trash.png";
import LightEditimg from "../assets/images/LightEditimg.png";
import Button from './ui/Button';
import ContentContainer from './ui/ContentContainer';
import ReviewsImg from "@/assets/images/Reviews-img.png";
import { ColumnDef } from '@tanstack/react-table';
import { Patient } from '@/utils/types/interfaces';
import { AppDispatch } from '@/utils/redux/store';
import { useDispatch } from 'react-redux';
import { IoSearch } from 'react-icons/io5';
import woman from "@/assets/images/woman.png";
import { InputFieldGroup } from './ui/InputField';
import { InputSelect } from './ui/InputSelect';

export const ManageLeave = () => {

  const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);

  // delete function
  const handleDelete = (id: string) => {
    const updated = leaveData.filter((item) => item.id !== id);
    setLeaveData(updated);
  };


  const leaveColumns = [
    ...defaultLeaveColumns,
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="d-flex gap-2 profile-icon-border">
          {/* Edit Button */}
          <Button className="btn btn-sm profile-card-boeder " variant='outline' contentSize="small">
            <Image src={LightEditimg} alt="Edit" width={18} height={20} />
          </Button>

          {/* Delete Button */}
          <Button className="btn btn-sm profile-card-boeder " variant='outline' contentSize="small" onClick={() => handleDelete(row.original.id)}>
            <Image src={Trash} alt="Delete" width={18} height={20} />
          </Button>
        </div>
      ),
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    // }));
    // setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (

    <div className="mt-4">

      {/* Header Row */}
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h4 className="mb-2 mb-md-0 profile-card-main-titile">Leave History</h4>
        <div className="d-flex align-items-center flex-wrap gap-2 maiacare-button-large">
          <span className="sort-by-lable">Sort by:</span>
          <InputSelect
            label=""
            name="tests"
            // value={formData.tests}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
            required={true}
            disabled={false}
            placeholder="All Time"
            className="patient-header-select-filter"
            // error={formError.tests}
            options={[
              { id: "1", value: "Today", label: "Today" },
              { id: "2", value: "Yesterday", label: "Yesterday" },
              { id: "3", value: "tomorrow", label: "tomorrow" },
            ]}
          />

          <Button className="d-flex align-items-center gap-2 " variant="default" >
            <Image src={BookCalendar} alt="Specialization" width={20} height={20} />
            Block Calendar
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="mt-4">
        <BaseTable data={leaveData} columns={leaveColumns} />
      </div>
    </div>

  );
};

export const ClinicManageLeave = () => {

  const [leaveData, setLeaveData] = useState<LeaveEntry[]>(defaultLeaveData);

  // delete function
  const handleDelete = (id: string) => {
    const updated = leaveData.filter((item) => item.id !== id);
    setLeaveData(updated);
  };


  const leaveColumns = [
    ...defaultLeaveColumns,
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="d-flex gap-2 profile-icon-border">
          {/* Edit Button */}
          <Button className="btn btn-sm profile-card-boeder " variant='outline' contentSize="small">
            <Image src={LightEditimg} alt="Edit" width={18} height={20} />
          </Button>

          {/* Delete Button */}
          <Button className="btn btn-sm profile-card-boeder " variant='outline' contentSize="small" onClick={() => handleDelete(row.original.id)}>
            <Image src={Trash} alt="Delete" width={18} height={20} />
          </Button>
        </div>
      ),
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    // }));
    // setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (

    <div className="mt-4">

      {/* leptop show header */}
      <div className="d-md-flex d-sm-none justify-content-between  my-4">
        <InputFieldGroup
          name="search"
          type="text"
          // value={formData.name}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //     setSearchTerm(e.target.value); /
          // }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
          placeholder="search"
          required={false}
          disabled={false}
          readOnly={false}
          // error={formError.name}
          className="position-relative profile-search patient-header-search patient-header-search-width "
        >
          <div className="profile-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#2B4360" />
            </svg>
          </div>
        </InputFieldGroup>

        <div className="d-flex flex-sm-row align-items-center gap-sm-3 gap-2 flex-column flex-column-revserse mt-sm-0 mt-2">
          <div className="d-flex align-items-center gap-2">

            <span className="sort-by-lable">Sort by:</span>
            <InputSelect
              label=""
              name="tests"
              // value={formData.tests}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
              required={true}
              disabled={false}
              placeholder="All Time"
              className="patient-header-select-filter"
              // error={formError.tests}
              options={[
                { id: "1", value: "Today", label: "Today" },
                { id: "2", value: "Yesterday", label: "Yesterday" },
                { id: "3", value: "tomorrow", label: "tomorrow" },
              ]}
            />

            <Button className="d-flex align-items-center gap-2 " variant="default" >
              <Image src={BookCalendar} alt="Specialization" width={20} height={20} />
              Block Calendar
            </Button>

          </div>

        </div>
      </div>
      {/* tablet show header */}
      <div className="d-md-none d-sm-flex d-none flex-column align-items-sm-start align-items-center gap-3 my-3">
        <div className="d-flex align-items-center justify-content-sm-start justify-content-center flex-wrap gap-3 w-100">
          <div className="patient-header-search-width">
            <InputFieldGroup
              name="search"
              type="text"
              // value={formData.name}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //     setSearchTerm(e.target.value); /
              // }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="search"
              required={false}
              disabled={false}
              readOnly={false}
              // error={formError.name}
              className="position-relative profile-search patient-header-search patient-header-search-width w-100"
            >
              <div className="profile-search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#2B4360" />
                </svg>
              </div>
            </InputFieldGroup>
          </div>

        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <span className="sort-by-lable">Sort by:</span>
          <InputSelect
            label=""
            name="tests"
            // value={formData.tests}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
            required={true}
            disabled={false}
            placeholder="All Time"
            className="patient-header-select-filter"
            // error={formError.tests}
            options={[
              { id: "1", value: "Today", label: "Today" },
              { id: "2", value: "Yesterday", label: "Yesterday" },
              { id: "3", value: "tomorrow", label: "tomorrow" },
            ]}
          />

          <Button className="d-flex align-items-center gap-2 " variant="default" >
            <Image src={BookCalendar} alt="Specialization" width={20} height={20} />
            Block Calendar
          </Button>

        </div>

      </div>

      {/* Table Section */}
      <div className="mt-4">
        <BaseTable data={leaveData} columns={leaveColumns} />
      </div>
    </div>

  );
}


export const Reviews = () => {
  return (
    <>
      <ContentContainer>
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center gap-2'>
              <Image src={ReviewsImg} width={32} height={32} alt='reviews-img' />
              <h6 className='reviews-heading-title m-0'>Samriddhi Singh </h6>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.1871 10.0087C20.8623 9.8199 20.5705 9.57941 20.3231 9.29671C20.3481 8.90312 20.4418 8.51696 20.6001 8.15571C20.8911 7.33471 21.2201 6.40471 20.6921 5.68171C20.1641 4.95871 19.1671 4.98171 18.2921 5.00171C17.9054 5.04149 17.5148 5.01511 17.1371 4.92371C16.9358 4.59622 16.7921 4.23669 16.7121 3.86071C16.4641 3.01571 16.1811 2.06071 15.3121 1.77471C14.4741 1.50471 13.6981 2.09871 13.0121 2.62071C12.7161 2.89103 12.3731 3.10488 12.0001 3.25171C11.6232 3.10608 11.2764 2.89217 10.9771 2.62071C10.2931 2.10171 9.52007 1.50171 8.67807 1.77571C7.81107 2.05771 7.52807 3.01571 7.27807 3.86071C7.1982 4.23547 7.05588 4.59414 6.85707 4.92171C6.47859 5.01287 6.0875 5.03991 5.70007 5.00171C4.82207 4.97771 3.83307 4.95171 3.30007 5.68171C2.76707 6.41171 3.10007 7.33471 3.39207 8.15471C3.55251 8.51542 3.64765 8.90174 3.67307 9.29571C3.42615 9.57878 3.13464 9.81962 2.81007 10.0087C2.07807 10.5087 1.24707 11.0777 1.24707 12.0017C1.24707 12.9257 2.07807 13.4927 2.81007 13.9947C3.13457 14.1835 3.42607 14.424 3.67307 14.7067C3.65033 15.1005 3.55789 15.4872 3.40007 15.8487C3.11007 16.6687 2.78207 17.5987 3.30907 18.3217C3.83607 19.0447 4.83007 19.0217 5.70907 19.0017C6.09604 18.9619 6.48696 18.9883 6.86507 19.0797C7.06545 19.4075 7.20881 19.767 7.28907 20.1427C7.53707 20.9877 7.82007 21.9427 8.68907 22.2287C8.82839 22.2734 8.97376 22.2963 9.12007 22.2967C9.82328 22.1958 10.4769 21.876 10.9881 21.3827C11.2841 21.1124 11.6271 20.8985 12.0001 20.7517C12.377 20.8973 12.7238 21.1112 13.0231 21.3827C13.7081 21.9057 14.4841 22.5027 15.3231 22.2277C16.1901 21.9457 16.4731 20.9877 16.7231 20.1437C16.8032 19.7682 16.9466 19.4091 17.1471 19.0817C17.5241 18.9899 17.914 18.9629 18.3001 19.0017C19.1781 19.0227 20.1671 19.0517 20.7001 18.3217C21.2331 17.5917 20.9001 16.6687 20.6081 15.8477C20.4487 15.4873 20.3536 15.1019 20.3271 14.7087C20.5741 14.4254 20.866 14.1845 21.1911 13.9957C21.9231 13.4957 22.7541 12.9257 22.7541 12.0017C22.7541 11.0777 21.9201 10.5097 21.1871 10.0087Z" fill="#E29578" />
                <path d="M11.0001 14.75C10.9016 14.7502 10.804 14.7308 10.7131 14.6931C10.6221 14.6553 10.5395 14.5999 10.4701 14.53L8.47009 12.53C8.33761 12.3878 8.26549 12.1998 8.26892 12.0055C8.27234 11.8112 8.35106 11.6258 8.48847 11.4884C8.62588 11.351 8.81127 11.2723 9.00557 11.2688C9.19987 11.2654 9.38792 11.3375 9.53009 11.47L11.0701 13.01L14.5501 10.4C14.7092 10.2807 14.9092 10.2294 15.1062 10.2575C15.3031 10.2857 15.4807 10.3909 15.6001 10.55C15.7194 10.7091 15.7707 10.9092 15.7426 11.1061C15.7144 11.303 15.6092 11.4807 15.4501 11.6L11.4501 14.6C11.3202 14.6973 11.1624 14.7499 11.0001 14.75Z" fill="white" />
              </svg>
            </div>
            <p className='reviews-heading-subtitle'>9 months ago</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="98" height="18" viewBox="0 0 98 18" fill="none">
            <path d="M16.4884 8.0422L13.3173 10.8097L14.2672 14.93C14.3175 15.1454 14.3031 15.3709 14.226 15.5781C14.1488 15.7854 14.0123 15.9654 13.8334 16.0955C13.6545 16.2256 13.4413 16.3001 13.2203 16.3096C12.9993 16.3192 12.7804 16.2634 12.591 16.1492L8.9973 13.9695L5.41136 16.1492C5.22192 16.2634 5.00303 16.3192 4.78205 16.3096C4.56107 16.3001 4.34781 16.2256 4.16894 16.0955C3.99006 15.9654 3.85351 15.7854 3.77635 15.5781C3.69919 15.3709 3.68485 15.1454 3.73511 14.93L4.68363 10.8139L1.51183 8.0422C1.34407 7.89752 1.22276 7.70652 1.16312 7.49317C1.10348 7.27981 1.10815 7.0536 1.17656 6.84289C1.24497 6.63218 1.37407 6.44636 1.54766 6.30873C1.72126 6.1711 1.93162 6.08779 2.15238 6.06924L6.33316 5.70713L7.96511 1.81463C8.05034 1.61038 8.19409 1.43591 8.37826 1.3132C8.56243 1.19048 8.7788 1.125 9.00011 1.125C9.22143 1.125 9.43779 1.19048 9.62197 1.3132C9.80614 1.43591 9.94989 1.61038 10.0351 1.81463L11.672 5.70713L15.8514 6.06924C16.0721 6.08779 16.2825 6.1711 16.4561 6.30873C16.6297 6.44636 16.7588 6.63218 16.8272 6.84289C16.8956 7.0536 16.9003 7.27981 16.8406 7.49317C16.781 7.70652 16.6597 7.89752 16.4919 8.0422H16.4884Z" fill="#FFC700" />
            <path d="M36.4884 8.0422L33.3173 10.8097L34.2672 14.93C34.3175 15.1454 34.3031 15.3709 34.226 15.5781C34.1488 15.7854 34.0123 15.9654 33.8334 16.0955C33.6545 16.2256 33.4413 16.3001 33.2203 16.3096C32.9993 16.3192 32.7804 16.2634 32.591 16.1492L28.9973 13.9695L25.4114 16.1492C25.2219 16.2634 25.003 16.3192 24.782 16.3096C24.5611 16.3001 24.3478 16.2256 24.1689 16.0955C23.9901 15.9654 23.8535 15.7854 23.7764 15.5781C23.6992 15.3709 23.6848 15.1454 23.7351 14.93L24.6836 10.8139L21.5118 8.0422C21.3441 7.89752 21.2228 7.70652 21.1631 7.49317C21.1035 7.27981 21.1082 7.0536 21.1766 6.84289C21.245 6.63218 21.3741 6.44636 21.5477 6.30873C21.7213 6.1711 21.9316 6.08779 22.1524 6.06924L26.3332 5.70713L27.9651 1.81463C28.0503 1.61038 28.1941 1.43591 28.3783 1.3132C28.5624 1.19048 28.7788 1.125 29.0001 1.125C29.2214 1.125 29.4378 1.19048 29.622 1.3132C29.8061 1.43591 29.9499 1.61038 30.0351 1.81463L31.672 5.70713L35.8514 6.06924C36.0721 6.08779 36.2825 6.1711 36.4561 6.30873C36.6297 6.44636 36.7588 6.63218 36.8272 6.84289C36.8956 7.0536 36.9003 7.27981 36.8406 7.49317C36.781 7.70652 36.6597 7.89752 36.4919 8.0422H36.4884Z" fill="#FFC700" />
            <path d="M56.4884 8.0422L53.3173 10.8097L54.2672 14.93C54.3175 15.1454 54.3031 15.3709 54.226 15.5781C54.1488 15.7854 54.0123 15.9654 53.8334 16.0955C53.6545 16.2256 53.4413 16.3001 53.2203 16.3096C52.9993 16.3192 52.7804 16.2634 52.591 16.1492L48.9973 13.9695L45.4114 16.1492C45.2219 16.2634 45.003 16.3192 44.782 16.3096C44.5611 16.3001 44.3478 16.2256 44.1689 16.0955C43.9901 15.9654 43.8535 15.7854 43.7764 15.5781C43.6992 15.3709 43.6848 15.1454 43.7351 14.93L44.6836 10.8139L41.5118 8.0422C41.3441 7.89752 41.2228 7.70652 41.1631 7.49317C41.1035 7.27981 41.1082 7.0536 41.1766 6.84289C41.245 6.63218 41.3741 6.44636 41.5477 6.30873C41.7213 6.1711 41.9316 6.08779 42.1524 6.06924L46.3332 5.70713L47.9651 1.81463C48.0503 1.61038 48.1941 1.43591 48.3783 1.3132C48.5624 1.19048 48.7788 1.125 49.0001 1.125C49.2214 1.125 49.4378 1.19048 49.622 1.3132C49.8061 1.43591 49.9499 1.61038 50.0351 1.81463L51.672 5.70713L55.8514 6.06924C56.0721 6.08779 56.2825 6.1711 56.4561 6.30873C56.6297 6.44636 56.7588 6.63218 56.8272 6.84289C56.8956 7.0536 56.9003 7.27981 56.8406 7.49317C56.781 7.70652 56.6597 7.89752 56.4919 8.0422H56.4884Z" fill="#FFC700" />
            <path d="M76.4884 8.0422L73.3173 10.8097L74.2672 14.93C74.3175 15.1454 74.3031 15.3709 74.226 15.5781C74.1488 15.7854 74.0123 15.9654 73.8334 16.0955C73.6545 16.2256 73.4413 16.3001 73.2203 16.3096C72.9993 16.3192 72.7804 16.2634 72.591 16.1492L68.9973 13.9695L65.4114 16.1492C65.2219 16.2634 65.003 16.3192 64.782 16.3096C64.5611 16.3001 64.3478 16.2256 64.1689 16.0955C63.9901 15.9654 63.8535 15.7854 63.7764 15.5781C63.6992 15.3709 63.6848 15.1454 63.7351 14.93L64.6836 10.8139L61.5118 8.0422C61.3441 7.89752 61.2228 7.70652 61.1631 7.49317C61.1035 7.27981 61.1082 7.0536 61.1766 6.84289C61.245 6.63218 61.3741 6.44636 61.5477 6.30873C61.7213 6.1711 61.9316 6.08779 62.1524 6.06924L66.3332 5.70713L67.9651 1.81463C68.0503 1.61038 68.1941 1.43591 68.3783 1.3132C68.5624 1.19048 68.7788 1.125 69.0001 1.125C69.2214 1.125 69.4378 1.19048 69.622 1.3132C69.8061 1.43591 69.9499 1.61038 70.0351 1.81463L71.672 5.70713L75.8514 6.06924C76.0721 6.08779 76.2825 6.1711 76.4561 6.30873C76.6297 6.44636 76.7588 6.63218 76.8272 6.84289C76.8956 7.0536 76.9003 7.27981 76.8406 7.49317C76.781 7.70652 76.6597 7.89752 76.4919 8.0422H76.4884Z" fill="#FFC700" />
            <path d="M96.4884 8.0422L93.3173 10.8097L94.2672 14.93C94.3175 15.1454 94.3031 15.3709 94.226 15.5781C94.1488 15.7854 94.0123 15.9654 93.8334 16.0955C93.6545 16.2256 93.4413 16.3001 93.2203 16.3096C92.9993 16.3192 92.7804 16.2634 92.591 16.1492L88.9973 13.9695L85.4114 16.1492C85.2219 16.2634 85.003 16.3192 84.782 16.3096C84.5611 16.3001 84.3478 16.2256 84.1689 16.0955C83.9901 15.9654 83.8535 15.7854 83.7764 15.5781C83.6992 15.3709 83.6848 15.1454 83.7351 14.93L84.6836 10.8139L81.5118 8.0422C81.3441 7.89752 81.2228 7.70652 81.1631 7.49317C81.1035 7.27981 81.1082 7.0536 81.1766 6.84289C81.245 6.63218 81.3741 6.44636 81.5477 6.30873C81.7213 6.1711 81.9316 6.08779 82.1524 6.06924L86.3332 5.70713L87.9651 1.81463C88.0503 1.61038 88.1941 1.43591 88.3783 1.3132C88.5624 1.19048 88.7788 1.125 89.0001 1.125C89.2214 1.125 89.4378 1.19048 89.622 1.3132C89.8061 1.43591 89.9499 1.61038 90.0351 1.81463L91.672 5.70713L95.8514 6.06924C96.0721 6.08779 96.2825 6.1711 96.4561 6.30873C96.6297 6.44636 96.7588 6.63218 96.8272 6.84289C96.8956 7.0536 96.9003 7.27981 96.8406 7.49317C96.781 7.70652 96.6597 7.89752 96.4919 8.0422H96.4884Z" fill="#DEDEDE" />
          </svg>
          <span className='ms-2 reviews-subtitle'>December 30, 2024</span>
          <p className='login-dont my-1'>Visited For High-Risk Pregnancy Care</p>

          <div className='d-flex align-items-center flex-wrap gap-2 my-2'>
            <p className='login-dont m-0'>Happy with :</p>
            <span className='reviews-Happy-box'>Fertility Support</span>
            <span className='reviews-Happy-box'>IVF</span>
          </div>

          <p className='doctor-listing-aditional-commit my-2'>Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.</p>
          <div className="medication-prescription-accordion-hr-row my-4"></div>
        </div>
        <div>
          <div className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center gap-2'>
              <Image src={ReviewsImg} width={32} height={32} alt='reviews-img' />
              <h6 className='reviews-heading-title m-0'>Samriddhi Singh </h6>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M21.1871 10.0087C20.8623 9.8199 20.5705 9.57941 20.3231 9.29671C20.3481 8.90312 20.4418 8.51696 20.6001 8.15571C20.8911 7.33471 21.2201 6.40471 20.6921 5.68171C20.1641 4.95871 19.1671 4.98171 18.2921 5.00171C17.9054 5.04149 17.5148 5.01511 17.1371 4.92371C16.9358 4.59622 16.7921 4.23669 16.7121 3.86071C16.4641 3.01571 16.1811 2.06071 15.3121 1.77471C14.4741 1.50471 13.6981 2.09871 13.0121 2.62071C12.7161 2.89103 12.3731 3.10488 12.0001 3.25171C11.6232 3.10608 11.2764 2.89217 10.9771 2.62071C10.2931 2.10171 9.52007 1.50171 8.67807 1.77571C7.81107 2.05771 7.52807 3.01571 7.27807 3.86071C7.1982 4.23547 7.05588 4.59414 6.85707 4.92171C6.47859 5.01287 6.0875 5.03991 5.70007 5.00171C4.82207 4.97771 3.83307 4.95171 3.30007 5.68171C2.76707 6.41171 3.10007 7.33471 3.39207 8.15471C3.55251 8.51542 3.64765 8.90174 3.67307 9.29571C3.42615 9.57878 3.13464 9.81962 2.81007 10.0087C2.07807 10.5087 1.24707 11.0777 1.24707 12.0017C1.24707 12.9257 2.07807 13.4927 2.81007 13.9947C3.13457 14.1835 3.42607 14.424 3.67307 14.7067C3.65033 15.1005 3.55789 15.4872 3.40007 15.8487C3.11007 16.6687 2.78207 17.5987 3.30907 18.3217C3.83607 19.0447 4.83007 19.0217 5.70907 19.0017C6.09604 18.9619 6.48696 18.9883 6.86507 19.0797C7.06545 19.4075 7.20881 19.767 7.28907 20.1427C7.53707 20.9877 7.82007 21.9427 8.68907 22.2287C8.82839 22.2734 8.97376 22.2963 9.12007 22.2967C9.82328 22.1958 10.4769 21.876 10.9881 21.3827C11.2841 21.1124 11.6271 20.8985 12.0001 20.7517C12.377 20.8973 12.7238 21.1112 13.0231 21.3827C13.7081 21.9057 14.4841 22.5027 15.3231 22.2277C16.1901 21.9457 16.4731 20.9877 16.7231 20.1437C16.8032 19.7682 16.9466 19.4091 17.1471 19.0817C17.5241 18.9899 17.914 18.9629 18.3001 19.0017C19.1781 19.0227 20.1671 19.0517 20.7001 18.3217C21.2331 17.5917 20.9001 16.6687 20.6081 15.8477C20.4487 15.4873 20.3536 15.1019 20.3271 14.7087C20.5741 14.4254 20.866 14.1845 21.1911 13.9957C21.9231 13.4957 22.7541 12.9257 22.7541 12.0017C22.7541 11.0777 21.9201 10.5097 21.1871 10.0087Z" fill="#E29578" />
                <path d="M11.0001 14.75C10.9016 14.7502 10.804 14.7308 10.7131 14.6931C10.6221 14.6553 10.5395 14.5999 10.4701 14.53L8.47009 12.53C8.33761 12.3878 8.26549 12.1998 8.26892 12.0055C8.27234 11.8112 8.35106 11.6258 8.48847 11.4884C8.62588 11.351 8.81127 11.2723 9.00557 11.2688C9.19987 11.2654 9.38792 11.3375 9.53009 11.47L11.0701 13.01L14.5501 10.4C14.7092 10.2807 14.9092 10.2294 15.1062 10.2575C15.3031 10.2857 15.4807 10.3909 15.6001 10.55C15.7194 10.7091 15.7707 10.9092 15.7426 11.1061C15.7144 11.303 15.6092 11.4807 15.4501 11.6L11.4501 14.6C11.3202 14.6973 11.1624 14.7499 11.0001 14.75Z" fill="white" />
              </svg>
            </div>
            <p className='reviews-heading-subtitle'>9 months ago</p>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="98" height="18" viewBox="0 0 98 18" fill="none">
            <path d="M16.4884 8.0422L13.3173 10.8097L14.2672 14.93C14.3175 15.1454 14.3031 15.3709 14.226 15.5781C14.1488 15.7854 14.0123 15.9654 13.8334 16.0955C13.6545 16.2256 13.4413 16.3001 13.2203 16.3096C12.9993 16.3192 12.7804 16.2634 12.591 16.1492L8.9973 13.9695L5.41136 16.1492C5.22192 16.2634 5.00303 16.3192 4.78205 16.3096C4.56107 16.3001 4.34781 16.2256 4.16894 16.0955C3.99006 15.9654 3.85351 15.7854 3.77635 15.5781C3.69919 15.3709 3.68485 15.1454 3.73511 14.93L4.68363 10.8139L1.51183 8.0422C1.34407 7.89752 1.22276 7.70652 1.16312 7.49317C1.10348 7.27981 1.10815 7.0536 1.17656 6.84289C1.24497 6.63218 1.37407 6.44636 1.54766 6.30873C1.72126 6.1711 1.93162 6.08779 2.15238 6.06924L6.33316 5.70713L7.96511 1.81463C8.05034 1.61038 8.19409 1.43591 8.37826 1.3132C8.56243 1.19048 8.7788 1.125 9.00011 1.125C9.22143 1.125 9.43779 1.19048 9.62197 1.3132C9.80614 1.43591 9.94989 1.61038 10.0351 1.81463L11.672 5.70713L15.8514 6.06924C16.0721 6.08779 16.2825 6.1711 16.4561 6.30873C16.6297 6.44636 16.7588 6.63218 16.8272 6.84289C16.8956 7.0536 16.9003 7.27981 16.8406 7.49317C16.781 7.70652 16.6597 7.89752 16.4919 8.0422H16.4884Z" fill="#FFC700" />
            <path d="M36.4884 8.0422L33.3173 10.8097L34.2672 14.93C34.3175 15.1454 34.3031 15.3709 34.226 15.5781C34.1488 15.7854 34.0123 15.9654 33.8334 16.0955C33.6545 16.2256 33.4413 16.3001 33.2203 16.3096C32.9993 16.3192 32.7804 16.2634 32.591 16.1492L28.9973 13.9695L25.4114 16.1492C25.2219 16.2634 25.003 16.3192 24.782 16.3096C24.5611 16.3001 24.3478 16.2256 24.1689 16.0955C23.9901 15.9654 23.8535 15.7854 23.7764 15.5781C23.6992 15.3709 23.6848 15.1454 23.7351 14.93L24.6836 10.8139L21.5118 8.0422C21.3441 7.89752 21.2228 7.70652 21.1631 7.49317C21.1035 7.27981 21.1082 7.0536 21.1766 6.84289C21.245 6.63218 21.3741 6.44636 21.5477 6.30873C21.7213 6.1711 21.9316 6.08779 22.1524 6.06924L26.3332 5.70713L27.9651 1.81463C28.0503 1.61038 28.1941 1.43591 28.3783 1.3132C28.5624 1.19048 28.7788 1.125 29.0001 1.125C29.2214 1.125 29.4378 1.19048 29.622 1.3132C29.8061 1.43591 29.9499 1.61038 30.0351 1.81463L31.672 5.70713L35.8514 6.06924C36.0721 6.08779 36.2825 6.1711 36.4561 6.30873C36.6297 6.44636 36.7588 6.63218 36.8272 6.84289C36.8956 7.0536 36.9003 7.27981 36.8406 7.49317C36.781 7.70652 36.6597 7.89752 36.4919 8.0422H36.4884Z" fill="#FFC700" />
            <path d="M56.4884 8.0422L53.3173 10.8097L54.2672 14.93C54.3175 15.1454 54.3031 15.3709 54.226 15.5781C54.1488 15.7854 54.0123 15.9654 53.8334 16.0955C53.6545 16.2256 53.4413 16.3001 53.2203 16.3096C52.9993 16.3192 52.7804 16.2634 52.591 16.1492L48.9973 13.9695L45.4114 16.1492C45.2219 16.2634 45.003 16.3192 44.782 16.3096C44.5611 16.3001 44.3478 16.2256 44.1689 16.0955C43.9901 15.9654 43.8535 15.7854 43.7764 15.5781C43.6992 15.3709 43.6848 15.1454 43.7351 14.93L44.6836 10.8139L41.5118 8.0422C41.3441 7.89752 41.2228 7.70652 41.1631 7.49317C41.1035 7.27981 41.1082 7.0536 41.1766 6.84289C41.245 6.63218 41.3741 6.44636 41.5477 6.30873C41.7213 6.1711 41.9316 6.08779 42.1524 6.06924L46.3332 5.70713L47.9651 1.81463C48.0503 1.61038 48.1941 1.43591 48.3783 1.3132C48.5624 1.19048 48.7788 1.125 49.0001 1.125C49.2214 1.125 49.4378 1.19048 49.622 1.3132C49.8061 1.43591 49.9499 1.61038 50.0351 1.81463L51.672 5.70713L55.8514 6.06924C56.0721 6.08779 56.2825 6.1711 56.4561 6.30873C56.6297 6.44636 56.7588 6.63218 56.8272 6.84289C56.8956 7.0536 56.9003 7.27981 56.8406 7.49317C56.781 7.70652 56.6597 7.89752 56.4919 8.0422H56.4884Z" fill="#FFC700" />
            <path d="M76.4884 8.0422L73.3173 10.8097L74.2672 14.93C74.3175 15.1454 74.3031 15.3709 74.226 15.5781C74.1488 15.7854 74.0123 15.9654 73.8334 16.0955C73.6545 16.2256 73.4413 16.3001 73.2203 16.3096C72.9993 16.3192 72.7804 16.2634 72.591 16.1492L68.9973 13.9695L65.4114 16.1492C65.2219 16.2634 65.003 16.3192 64.782 16.3096C64.5611 16.3001 64.3478 16.2256 64.1689 16.0955C63.9901 15.9654 63.8535 15.7854 63.7764 15.5781C63.6992 15.3709 63.6848 15.1454 63.7351 14.93L64.6836 10.8139L61.5118 8.0422C61.3441 7.89752 61.2228 7.70652 61.1631 7.49317C61.1035 7.27981 61.1082 7.0536 61.1766 6.84289C61.245 6.63218 61.3741 6.44636 61.5477 6.30873C61.7213 6.1711 61.9316 6.08779 62.1524 6.06924L66.3332 5.70713L67.9651 1.81463C68.0503 1.61038 68.1941 1.43591 68.3783 1.3132C68.5624 1.19048 68.7788 1.125 69.0001 1.125C69.2214 1.125 69.4378 1.19048 69.622 1.3132C69.8061 1.43591 69.9499 1.61038 70.0351 1.81463L71.672 5.70713L75.8514 6.06924C76.0721 6.08779 76.2825 6.1711 76.4561 6.30873C76.6297 6.44636 76.7588 6.63218 76.8272 6.84289C76.8956 7.0536 76.9003 7.27981 76.8406 7.49317C76.781 7.70652 76.6597 7.89752 76.4919 8.0422H76.4884Z" fill="#FFC700" />
            <path d="M96.4884 8.0422L93.3173 10.8097L94.2672 14.93C94.3175 15.1454 94.3031 15.3709 94.226 15.5781C94.1488 15.7854 94.0123 15.9654 93.8334 16.0955C93.6545 16.2256 93.4413 16.3001 93.2203 16.3096C92.9993 16.3192 92.7804 16.2634 92.591 16.1492L88.9973 13.9695L85.4114 16.1492C85.2219 16.2634 85.003 16.3192 84.782 16.3096C84.5611 16.3001 84.3478 16.2256 84.1689 16.0955C83.9901 15.9654 83.8535 15.7854 83.7764 15.5781C83.6992 15.3709 83.6848 15.1454 83.7351 14.93L84.6836 10.8139L81.5118 8.0422C81.3441 7.89752 81.2228 7.70652 81.1631 7.49317C81.1035 7.27981 81.1082 7.0536 81.1766 6.84289C81.245 6.63218 81.3741 6.44636 81.5477 6.30873C81.7213 6.1711 81.9316 6.08779 82.1524 6.06924L86.3332 5.70713L87.9651 1.81463C88.0503 1.61038 88.1941 1.43591 88.3783 1.3132C88.5624 1.19048 88.7788 1.125 89.0001 1.125C89.2214 1.125 89.4378 1.19048 89.622 1.3132C89.8061 1.43591 89.9499 1.61038 90.0351 1.81463L91.672 5.70713L95.8514 6.06924C96.0721 6.08779 96.2825 6.1711 96.4561 6.30873C96.6297 6.44636 96.7588 6.63218 96.8272 6.84289C96.8956 7.0536 96.9003 7.27981 96.8406 7.49317C96.781 7.70652 96.6597 7.89752 96.4919 8.0422H96.4884Z" fill="#DEDEDE" />
          </svg>
          <span className='ms-2 reviews-subtitle'>December 30, 2024</span>
          <p className='login-dont my-1'>Visited For High-Risk Pregnancy Care</p>

          <div className='d-flex align-items-center flex-wrap gap-2 my-2'>
            <p className='login-dont m-0'>Happy with :</p>
            <span className='reviews-Happy-box'>Fertility Support</span>
            <span className='reviews-Happy-box'>IVF</span>
          </div>

          <p className='doctor-listing-aditional-commit my-2'>Dr. Kort practices the exact opposite of a "one size fits all" approach to medicine. He took my fears seriously - primarily about the hormone injections - and worked with me to create a schedule that I was comfortable with, but that also got great results. He's one of the kindest and most knowledgeable doctors I've ever had.</p>
          <div className="medication-prescription-accordion-hr-row my-4"></div>
        </div>

        <span className="reviews-show-all">Show All Reviews (32)</span>
      </ContentContainer>
    </>
  )
}


export const ClinicReviews = () => {

  const dispatch: AppDispatch = useDispatch();
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    // dispatch(
    //   setHeaderData({
    //     title: "Sample Page",
    //     subtitle: "Sample Page for check common components",
    //   })
    // );
    setTableData(ClinicReviewsTable);
    setLoading(false);
  }, []);

  const columns: ColumnDef<any>[] = [
    {
      header: "#",
      cell: (info) => {
        const index = info.row.index + 1; // row number start from 1
        return index < 10 ? `0${index}` : index; // format 01,02,03
      },
    },
    {
      header: "Review By",
      cell: (info) => {
        const imgSrc = info.row.original.image;
        const name = info.row.original.name;
        const id = info.row.original.id; // <-- Make sure you have an `id`

        return (

          <div className="d-flex align-items-center gap-2">
            {typeof imgSrc === "string" ? (
              <img
                src={imgSrc}
                alt={name}
                className="rounded-circle border"
                width="36"
                height="36"
              />
            ) : (
              <Image
                src={imgSrc}
                alt={name}
                width={36}
                height={36}
                className="rounded"
              />
            )}
            {name}
          </div>

        );
      },
    },
    {
      header: "Rating",
      accessorKey: "rating",
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Time",
      accessorKey: "time",
    },
    {
      header: "Comment",
      accessorKey: "comment",
    },
    {
      header: "Action",
      // accessorKey: "status",
      cell: () => {

        return (
          <div className='custome-switch'>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Visible"
            />
          </div>
        );
      },
    },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // setFormData((prev) => ({
    //     ...prev,
    //     [name]: value,
    // }));
    // setFormError((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <>
      {/* leptop show header */}
      <div className="d-md-flex d-sm-none justify-content-between  my-4">
        <InputFieldGroup
          name="search"
          type="text"
          // value={formData.name}
          // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          //     setSearchTerm(e.target.value); /
          // }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
          placeholder="search"
          required={false}
          disabled={false}
          readOnly={false}
          // error={formError.name}
          className="position-relative profile-search patient-header-search patient-header-search-width "
        >
          <div className="profile-search-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
              <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#2B4360" />
            </svg>
          </div>
        </InputFieldGroup>

        <div className="d-flex flex-sm-row align-items-center gap-sm-3 gap-2 flex-column flex-column-revserse mt-sm-0 mt-2">
          <div className="d-flex align-items-center gap-2">

            <span className="sort-by-lable">Sort by:</span>
            <InputSelect
              label=""
              name="tests"
              // value={formData.tests}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                handleChange(e);
              }}
              onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
              required={true}
              disabled={false}
              placeholder="All Time"
              className="patient-header-select-filter"
              // error={formError.tests}
              options={[
                { id: "1", value: "Today", label: "Today" },
                { id: "2", value: "Yesterday", label: "Yesterday" },
                { id: "3", value: "tomorrow", label: "tomorrow" },
              ]}
            />
            <div className="patient-header-filter-icon-box ">
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
              </svg>
            </div>
          </div>

        </div>
      </div>
      {/* tablet show header */}
      <div className="d-md-none d-sm-flex d-none flex-column align-items-sm-start align-items-center gap-3 my-3">
        <div className="d-flex align-items-center justify-content-sm-start justify-content-center flex-wrap gap-3 w-100">
          <div className="patient-header-search-width">
            <InputFieldGroup
              name="search"
              type="text"
              // value={formData.name}
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              //     setSearchTerm(e.target.value); /
              // }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => { }}
              placeholder="search"
              required={false}
              disabled={false}
              readOnly={false}
              // error={formError.name}
              className="position-relative profile-search patient-header-search patient-header-search-width w-100"
            >
              <div className="profile-search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                  <path d="M18.5677 16.8364L14.8576 13.1246C15.97 11.675 16.4893 9.85652 16.3103 8.03804C16.1312 6.21956 15.2672 4.53728 13.8934 3.33245C12.5196 2.12762 10.7389 1.49047 8.91264 1.55024C7.08635 1.61001 5.35117 2.36223 4.05909 3.65431C2.76702 4.94638 2.0148 6.68156 1.95503 8.50785C1.89526 10.3341 2.53241 12.1148 3.73724 13.4886C4.94207 14.8624 6.62435 15.7264 8.44283 15.9055C10.2613 16.0846 12.0798 15.5652 13.5294 14.4528L17.2427 18.1668C17.3299 18.254 17.4335 18.3232 17.5474 18.3704C17.6613 18.4176 17.7835 18.4419 17.9068 18.4419C18.0301 18.4419 18.1522 18.4176 18.2662 18.3704C18.3801 18.3232 18.4836 18.254 18.5708 18.1668C18.658 18.0796 18.7272 17.9761 18.7744 17.8622C18.8216 17.7482 18.8459 17.6261 18.8459 17.5028C18.8459 17.3794 18.8216 17.2573 18.7744 17.1434C18.7272 17.0294 18.658 16.9259 18.5708 16.8387L18.5677 16.8364ZM3.84193 8.74965C3.84193 7.69894 4.15351 6.67182 4.73725 5.79818C5.321 4.92455 6.1507 4.24363 7.12143 3.84154C8.09216 3.43945 9.16033 3.33424 10.1909 3.53923C11.2214 3.74421 12.168 4.25018 12.9109 4.99314C13.6539 5.73611 14.1599 6.68271 14.3649 7.71323C14.5698 8.74376 14.4646 9.81192 14.0625 10.7827C13.6605 11.7534 12.9795 12.5831 12.1059 13.1668C11.2323 13.7506 10.2051 14.0621 9.15444 14.0621C7.74592 14.0607 6.3955 13.5005 5.39953 12.5046C4.40356 11.5086 3.84338 10.1582 3.84193 8.74965Z" fill="#2B4360" />
                </svg>
              </div>
            </InputFieldGroup>
          </div>

        </div>
        <div className="d-flex flex-wrap align-items-center gap-3">
          <span className="sort-by-lable">Sort by:</span>
          <InputSelect
            label=""
            name="tests"
            // value={formData.tests}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            onBlur={(e: React.FocusEvent<HTMLSelectElement>) => { }}
            required={true}
            disabled={false}
            placeholder="All Time"
            className="patient-header-select-filter"
            // error={formError.tests}
            options={[
              { id: "1", value: "Today", label: "Today" },
              { id: "2", value: "Yesterday", label: "Yesterday" },
              { id: "3", value: "tomorrow", label: "tomorrow" },
            ]}
          />

          <div className="patient-header-filter-icon-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M6.30166 10.6484V4.55469C6.30166 4.35578 6.22264 4.16501 6.08199 4.02436C5.94134 3.88371 5.75057 3.80469 5.55166 3.80469C5.35275 3.80469 5.16198 3.88371 5.02133 4.02436C4.88068 4.16501 4.80166 4.35578 4.80166 4.55469V10.6484C4.15635 10.8137 3.58438 11.189 3.17593 11.7152C2.76748 12.2414 2.54578 12.8886 2.54578 13.5547C2.54578 14.2208 2.76748 14.868 3.17593 15.3942C3.58438 15.9204 4.15635 16.2957 4.80166 16.4609V21.0547C4.80166 21.2536 4.88068 21.4444 5.02133 21.585C5.16198 21.7257 5.35275 21.8047 5.55166 21.8047C5.75057 21.8047 5.94134 21.7257 6.08199 21.585C6.22264 21.4444 6.30166 21.2536 6.30166 21.0547V16.4609C6.94697 16.2957 7.51894 15.9204 7.92739 15.3942C8.33584 14.868 8.55754 14.2208 8.55754 13.5547C8.55754 12.8886 8.33584 12.2414 7.92739 11.7152C7.51894 11.189 6.94697 10.8137 6.30166 10.6484ZM5.55166 15.0547C5.25499 15.0547 4.96498 14.9667 4.7183 14.8019C4.47163 14.6371 4.27937 14.4028 4.16584 14.1287C4.05231 13.8546 4.0226 13.553 4.08048 13.2621C4.13836 12.9711 4.28122 12.7038 4.491 12.494C4.70078 12.2842 4.96805 12.1414 5.25902 12.0835C5.54999 12.0256 5.8516 12.0553 6.12568 12.1689C6.39977 12.2824 6.63404 12.4747 6.79886 12.7213C6.96369 12.968 7.05166 13.258 7.05166 13.5547C7.05166 13.9525 6.89362 14.334 6.61232 14.6153C6.33101 14.8967 5.94948 15.0547 5.55166 15.0547ZM13.0517 6.14844V4.55469C13.0517 4.35578 12.9726 4.16501 12.832 4.02436C12.6913 3.88371 12.5006 3.80469 12.3017 3.80469C12.1027 3.80469 11.912 3.88371 11.7713 4.02436C11.6307 4.16501 11.5517 4.35578 11.5517 4.55469V6.14844C10.9063 6.31366 10.3344 6.68896 9.92593 7.21517C9.51748 7.74138 9.29578 8.38856 9.29578 9.05469C9.29578 9.72082 9.51748 10.368 9.92593 10.8942C10.3344 11.4204 10.9063 11.7957 11.5517 11.9609V21.0547C11.5517 21.2536 11.6307 21.4444 11.7713 21.585C11.912 21.7257 12.1027 21.8047 12.3017 21.8047C12.5006 21.8047 12.6913 21.7257 12.832 21.585C12.9726 21.4444 13.0517 21.2536 13.0517 21.0547V11.9609C13.697 11.7957 14.2689 11.4204 14.6774 10.8942C15.0858 10.368 15.3075 9.72082 15.3075 9.05469C15.3075 8.38856 15.0858 7.74138 14.6774 7.21517C14.2689 6.68896 13.697 6.31366 13.0517 6.14844ZM12.3017 10.5547C12.005 10.5547 11.715 10.4667 11.4683 10.3019C11.2216 10.1371 11.0294 9.9028 10.9158 9.62871C10.8023 9.35462 10.7726 9.05302 10.8305 8.76205C10.8884 8.47108 11.0312 8.20381 11.241 7.99403C11.4508 7.78425 11.7181 7.64139 12.009 7.58351C12.3 7.52563 12.6016 7.55534 12.8757 7.66887C13.1498 7.7824 13.384 7.97466 13.5489 8.22133C13.7137 8.46801 13.8017 8.75802 13.8017 9.05469C13.8017 9.45251 13.6436 9.83404 13.3623 10.1153C13.081 10.3967 12.6995 10.5547 12.3017 10.5547ZM22.0517 16.5547C22.051 15.8896 21.8298 15.2435 21.4227 14.7176C21.0155 14.1917 20.4454 13.8156 19.8017 13.6484V4.55469C19.8017 4.35578 19.7226 4.16501 19.582 4.02436C19.4413 3.88371 19.2506 3.80469 19.0517 3.80469C18.8527 3.80469 18.662 3.88371 18.5213 4.02436C18.3807 4.16501 18.3017 4.35578 18.3017 4.55469V13.6484C17.6563 13.8137 17.0844 14.189 16.6759 14.7152C16.2675 15.2414 16.0458 15.8886 16.0458 16.5547C16.0458 17.2208 16.2675 17.868 16.6759 18.3942C17.0844 18.9204 17.6563 19.2957 18.3017 19.4609V21.0547C18.3017 21.2536 18.3807 21.4444 18.5213 21.585C18.662 21.7257 18.8527 21.8047 19.0517 21.8047C19.2506 21.8047 19.4413 21.7257 19.582 21.585C19.7226 21.4444 19.8017 21.2536 19.8017 21.0547V19.4609C20.4454 19.2937 21.0155 18.9177 21.4227 18.3918C21.8298 17.8659 22.051 17.2198 22.0517 16.5547ZM19.0517 18.0547C18.755 18.0547 18.465 17.9667 18.2183 17.8019C17.9716 17.6371 17.7794 17.4028 17.6658 17.1287C17.5523 16.8546 17.5226 16.553 17.5805 16.2621C17.6384 15.9711 17.7812 15.7038 17.991 15.494C18.2008 15.2842 18.4681 15.1414 18.759 15.0835C19.05 15.0256 19.3516 15.0553 19.6257 15.1689C19.8998 15.2824 20.134 15.4747 20.2989 15.7213C20.4637 15.968 20.5517 16.258 20.5517 16.5547C20.5517 16.9525 20.3936 17.334 20.1123 17.6153C19.831 17.8967 19.4495 18.0547 19.0517 18.0547Z" fill="#2B4360" />
            </svg>
          </div>

        </div>

      </div>

      <BaseTable data={tableData} columns={columns} />
      {/* table clinin */}
    </>
  )
}