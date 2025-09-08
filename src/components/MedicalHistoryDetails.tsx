import React from 'react';
import { Badge } from 'react-bootstrap';

interface MedicalHistoryDetailsProps {
  MedicalHistoryData: {
    medical_medications: string;
    medical_surgeries: string;
    medical_medical_condition: string[];
    medical_family_medical_history: string[];
    medical_lifestyle: string[];
    medical_exercise: string;
    medical_stress_level: string;
  };
}

const MedicalHistoryDetails: React.FC<MedicalHistoryDetailsProps> = ({ MedicalHistoryData }) => {
  const formatText = (text: string) => {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getExerciseLabel = (exercise: string) => {
    switch (exercise.toLowerCase()) {
      case 'never': return 'Never exercises';
      case 'rarely': return 'Rarely exercises';
      case 'sometimes': return 'Exercises sometimes';
      case 'often': return 'Exercises often';
      case 'daily': return 'Exercises daily';
      default: return `Exercise: ${exercise}`;
    }
  };

  const getStressLevelLabel = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low': return 'Low stress';
      case 'moderate': return 'Moderate stress';
      case 'high': return 'High stress';
      case 'very-high': return 'Very high stress';
      default: return `Stress level: ${level}`;
    }
  };

  return (
    <div className="medical-history-details">
      <div className="mb-4">
        <h6 className="fw-bold mb-3">Current Medications</h6>
        <p>{MedicalHistoryData.medical_medications === 'true' ? 'Yes' : 'No'}</p>
      </div>

      <div className="mb-4">
        <h6 className="fw-bold mb-3">Past Surgeries</h6>
        <p>{MedicalHistoryData.medical_surgeries === 'true' ? 'Yes' : 'No'}</p>
      </div>

      <div className="mb-4">
        <h6 className="fw-bold mb-3">Medical Conditions</h6>
        <div className="d-flex flex-wrap gap-2">
          {MedicalHistoryData.medical_medical_condition.length > 0 ? (
            MedicalHistoryData.medical_medical_condition.map((condition, index) => (
              <Badge key={index} bg="light" text="dark" className="border px-3 py-2">
                {condition}
              </Badge>
            ))
          ) : (
            <p>No medical conditions recorded</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h6 className="fw-bold mb-3">Family Medical History</h6>
        <div className="d-flex flex-wrap gap-2">
          {MedicalHistoryData.medical_family_medical_history.length > 0 ? (
            MedicalHistoryData.medical_family_medical_history.map((history, index) => (
              <Badge key={index} bg="light" text="dark" className="border px-3 py-2">
                {history}
              </Badge>
            ))
          ) : (
            <p>No family medical history recorded</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h6 className="fw-bold mb-3">Lifestyle</h6>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {MedicalHistoryData.medical_lifestyle.length > 0 ? (
            MedicalHistoryData.medical_lifestyle.map((item, index) => (
              <Badge key={index} bg="light" text="dark" className="border px-3 py-2">
                {item}
              </Badge>
            ))
          ) : (
            <p>No lifestyle information recorded</p>
          )}
        </div>
        <div className="d-flex gap-4 mt-3">
          <div>
            <span className="text-muted small">Exercise:</span>{' '}
            <span className="fw-medium">{getExerciseLabel(MedicalHistoryData.medical_exercise)}</span>
          </div>
          <div>
            <span className="text-muted small">Stress Level:</span>{' '}
            <span className="fw-medium">{getStressLevelLabel(MedicalHistoryData.medical_stress_level)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistoryDetails;
