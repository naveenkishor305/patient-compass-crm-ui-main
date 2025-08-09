
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    groupNumber?: string;
  };
}

export interface ClinicalRecord {
  id: string;
  patientId: string;
  type: 'encounter' | 'medication' | 'allergy' | 'vital' | 'order' | 'result' | 'carePlan';
  date: string;
  providerId: string;
  description: string;
  details: any;
  status: 'active' | 'inactive' | 'completed';
}

export interface Appointment {
  id: string;
  patientId: string;
  providerId: string;
  date: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface LabResult {
  id: string;
  patientId: string;
  orderId: string;
  testName: string;
  result: string;
  normalRange: string;
  status: 'pending' | 'completed' | 'abnormal';
  date: string;
  technicianId: string;
}
