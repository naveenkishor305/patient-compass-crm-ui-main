
export interface Drug {
  id: string;
  name: string;
  genericName?: string;
  strength: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'ointment' | 'inhaler';
  unitOfMeasure: string;
  manufacturer: string;
  supplier: string;
  purchasePrice: number;
  sellingPrice: number;
  currentStock: number;
  reorderLevel: number;
  expiryDate: string;
  batchNumber: string;
  location: string;
  category: string;
  storageConditions: string;
  status: 'in-stock' | 'low-stock' | 'expired' | 'out-of-stock';
}

export interface Prescription {
  id: string;
  patientId: string;
  patientName: string;
  patientMRN: string;
  doctorId: string;
  doctorName: string;
  dateOrdered: string;
  status: 'new' | 'in-progress' | 'completed' | 'ready-for-pickup' | 'dispensed' | 'on-hold';
  medications: PrescribedMedication[];
  instructions?: string;
  notes?: string;
}

export interface PrescribedMedication {
  drugId: string;
  drugName: string;
  strength: string;
  dosage: string;
  frequency: string;
  route: string;
  duration: string;
  quantityOrdered: number;
  quantityDispensed?: number;
}

export interface PatientMedicationHistory {
  id: string;
  patientId: string;
  drugName: string;
  strength: string;
  form: string;
  quantityDispensed: number;
  dispenseDate: string;
  prescribingDoctor: string;
  dispensedBy: string;
  prescriptionId: string;
}

export interface PharmacyAlert {
  id: string;
  type: 'low-stock' | 'expired-drug' | 'drug-interaction' | 'pending-reorder' | 'allergy-conflict' | 'dosage-warning';
  drugId?: string;
  patientId?: string;
  title: string;
  message: string;
  dateTime: string;
  status: 'new' | 'acknowledged' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export interface DispenseAction {
  prescriptionId: string;
  drugId: string;
  quantityDispensed: number;
  pharmacistId: string;
  dispenseDate: string;
  patientInstructions: string;
  overrideReasons?: string[];
}
