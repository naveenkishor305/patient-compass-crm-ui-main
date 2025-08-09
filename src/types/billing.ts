
export interface Bill {
  id: string;
  patientId: string;
  serviceDate: string;
  services: BillService[];
  totalAmount: number;
  paidAmount: number;
  status: 'pending' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  insuranceClaim?: InsuranceClaim;
  createdDate: string;
  dueDate: string;
}

export interface BillService {
  id: string;
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  providerId: string;
}

export interface InsuranceClaim {
  id: string;
  billId: string;
  insuranceProvider: string;
  claimNumber: string;
  submittedDate: string;
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';
  approvedAmount?: number;
  denialReason?: string;
}

export interface Payment {
  id: string;
  billId: string;
  amount: number;
  method: 'cash' | 'card' | 'insurance' | 'check' | 'online';
  date: string;
  transactionId?: string;
  status: 'pending' | 'completed' | 'failed';
}
