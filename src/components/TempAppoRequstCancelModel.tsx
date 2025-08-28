"use client";

import { useState } from "react";
import Button from "./ui/Button";
import Modal from "./ui/Modal";
import { RescheduleAppointment, SuccessModalReschedule } from "./form/RescheduleAppointment";
import { CancelAppointment, SuccessModalCancel } from "./form/CancelAppointment";

function TempAppoRequstCancelModel() {
  const [RescheduleModal, setRescheduleModal] = useState(false);
  const [CancelModal, setCancelModal] = useState(false);

  // independent success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showSuccessModalCancel, setShowSuccessModalCancel] = useState(false);

  return (
    <>
      <div className="d-flex gap-5">
        <Button onClick={() => setRescheduleModal(true)}>
          Reschedule Appointment
        </Button>
        <Button onClick={() => setCancelModal(true)}>
          Cancel Appointment
        </Button>
      </div>

      {/* Reschedule Modal */}
      <Modal
        show={RescheduleModal}
        onHide={() => setRescheduleModal(false)}
        header="Request to Reschedule Appointment"
        closeButton={true}
      >
        <RescheduleAppointment
          setRescheduleModal={setRescheduleModal}
          setShowSuccessModal={setShowSuccessModal}
        />
      </Modal>

      {/* Cancel Modal */}
      <Modal
        show={CancelModal}
        onHide={() => setCancelModal(false)}
        header="Request to Cancel Appointment"
        closeButton={true}
      >
        <CancelAppointment setCancelModal={setCancelModal} setShowSuccessModalCancel={setShowSuccessModalCancel} />
      </Modal>

      {/* Independent Success Modal */}
      <SuccessModalReschedule
        showSuccessModal={showSuccessModal}
        setShowSuccessModal={setShowSuccessModal}
      />
      <SuccessModalCancel
        showSuccessModalCancel={showSuccessModalCancel}
        setShowSuccessModalCancel={setShowSuccessModalCancel}
      />
    </>
  );
}

export default TempAppoRequstCancelModel;
