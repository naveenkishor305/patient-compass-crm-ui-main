import React, { useState, useEffect, useCallback } from 'react';

// --- MOCK DATA ---
// In a real application, this data would come from an API
const mockPatients = {
  '919876543210': {
    id: 'P001',
    name: 'Anil Kumar',
    dob: '15 Aug 1975',
    gender: 'Male',
    mrn: 'RGH-84351',
    photoUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop',
    alerts: [
      { type: 'critical', text: 'Allergy: Penicillin' },
      { type: 'warning', text: 'High Fall Risk' },
    ],
    upcomingAppointments: [
      { id: 'A101', date: '2025-07-04', time: '11:00 AM', doctor: 'Dr. Sharma', department: 'Cardiology', status: 'Confirmed' },
    ],
    recentCases: [
      { id: 'C201', title: 'Billing Inquiry - May Invoice', status: 'Open', owner: 'Meena' },
    ]
  },
  '919123456789': {
    id: 'P002',
    name: 'Sunita Patel',
    dob: '22 Mar 1990',
    gender: 'Female',
    mrn: 'RGH-91276',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    alerts: [
       { type: 'info', text: 'Requires interpreter (Gujarati)' },
    ],
    upcomingAppointments: [],
    recentCases: [
        { id: 'C202', title: 'Follow-up appointment request', status: 'Resolved', owner: 'Priya' },
    ]
  },
};

const mockTasks = [
    { id: 'T01', title: 'Verify insurance for patient P003', priority: 'High', dueDate: '2025-07-03' },
    { id: 'T02', title: 'Follow-up call for appointment confirmation', priority: 'Medium', dueDate: '2025-07-03' },
    { id: 'T03', title: 'Process referral for Sunita Patel', priority: 'High', dueDate: '2025-07-04' },
];

const mockDispositions = [
    'Appointment Booked',
    'Appointment Rescheduled',
    'Inquiry Resolved',
    'Message Taken for Doctor',
    'Transferred to Billing',
    'Transferred to Clinical Staff',
    'Wrong Number',
];

const mockDoctors = [
    { id: 'D01', name: 'Dr. Sharma', department: 'Cardiology' },
    { id: 'D02', name: 'Dr. Verma', department: 'General Medicine' },
    { id: 'D03', name: 'Dr. Singh', department: 'Orthopedics' },
];

// --- ICONS (using inline SVGs for self-containment) ---
const PhoneIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const UserIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const AlertTriangleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line>
  </svg>
);

const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line>
  </svg>
);

const CheckSquareIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const BookIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
  </svg>
);

const MuteIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
);

const HoldIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="4" x2="6" y2="20"></line><line x1="18" y1="4" x2="18" y2="20"></line></svg>
);

const AddCallIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);

const TransferIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 17 20 12 15 7"></polyline><path d="M4 18v-2a4 4 0 0 1 4-4h12"></path></svg>
);


// --- SUB-COMPONENTS ---

const CallControlPanel = ({ status, onAnswer, onEnd, callerId, duration }) => {
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Call Control</h2>
      <div className="flex-grow flex flex-col items-center justify-center bg-slate-50 rounded-xl p-4">
        {status === 'idle' && (
          <div className="text-center">
            <PhoneIcon className="w-20 h-20 text-gray-300 mx-auto" />
            <p className="mt-4 text-gray-500 font-medium">Waiting for call</p>
          </div>
        )}
        {status === 'incoming' && (
          <div className="text-center w-full">
            <div className="relative w-24 h-24 mx-auto">
                <div className="absolute inset-0 bg-green-200 rounded-full animate-ping"></div>
                <div className="relative flex items-center justify-center w-full h-full bg-green-100 rounded-full">
                    <PhoneIcon className="w-12 h-12 text-green-600" />
                </div>
            </div>
            <p className="mt-4 text-xl font-bold text-gray-800">Incoming Call</p>
            <p className="text-gray-600 font-medium">{callerId}</p>
            <button
              onClick={onAnswer}
              className="mt-6 w-full bg-green-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-green-600 transition-all shadow-md hover:shadow-lg"
            >
              Answer
            </button>
          </div>
        )}
        {status === 'active' && (
          <div className="text-center w-full flex flex-col h-full">
            <PhoneIcon className="w-16 h-16 text-blue-500 mx-auto" />
            <p className="mt-2 text-xl font-bold text-gray-800">On Call</p>
            <p className="text-gray-600 font-medium">{callerId}</p>
            <p className="text-5xl font-mono text-gray-900 mt-4 flex-grow flex items-center justify-center">{formatDuration(duration)}</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-gray-600">
                <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 transition-colors"><MuteIcon className="w-6 h-6 mb-1"/>Mute</button>
                <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 transition-colors"><HoldIcon className="w-6 h-6 mb-1"/>Hold</button>
                <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 transition-colors"><AddCallIcon className="w-6 h-6 mb-1"/>Add</button>
                <button className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-200 transition-colors"><TransferIcon className="w-6 h-6 mb-1"/>Transfer</button>
            </div>
            <button
              onClick={onEnd}
              className="mt-6 w-full bg-red-500 text-white font-bold py-3 px-4 rounded-xl hover:bg-red-600 transition-all shadow-md hover:shadow-lg"
            >
              End Call
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const PatientInfoPanel = ({ patient, notes, setNotes }) => {
  if (!patient) {
     return (
      <div className="bg-white rounded-2xl shadow-sm p-6 h-full flex flex-col items-center justify-center text-center border border-gray-200">
        <UserIcon className="w-28 h-28 text-gray-300" />
        <h2 className="text-2xl font-bold text-gray-700 mt-4">Unknown Caller</h2>
        <p className="text-gray-500 mt-2 max-w-sm">No patient record found for this number. Please search for the patient or proceed with new registration.</p>
      </div>
    );
  }

  const Alert = ({ type, text }) => {
    const typeClasses = {
      critical: 'bg-red-100 text-red-800 border-red-200',
      warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      info: 'bg-blue-100 text-blue-800 border-blue-200',
    };
    return (
      <div className={`p-3 rounded-xl flex items-start mb-3 border ${typeClasses[type]}`}>
        <AlertTriangleIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
        <span className="font-semibold text-sm">{text}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full overflow-y-auto border border-gray-200">
      {/* Patient Header */}
      <div className="flex flex-col sm:flex-row sm:items-center text-center sm:text-left pb-5 border-b border-gray-200">
        <img src={patient.photoUrl} alt={patient.name} className="w-24 h-24 rounded-full mr-0 sm:mr-6 mb-4 sm:mb-0 object-cover mx-auto sm:mx-0" />
        <div>
          <h2 className="text-3xl font-bold text-gray-900">{patient.name}</h2>
          <p className="text-gray-500 font-medium">MRN: {patient.mrn} &bull; DOB: {patient.dob} &bull; {patient.gender}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6 mt-5">
        <div>
          {/* Alerts */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">Critical Alerts</h3>
            {patient.alerts.length > 0 ? patient.alerts.map((alert, i) => <Alert key={i} {...alert} />) : <p className="text-sm text-gray-500 bg-slate-50 rounded-lg p-3">No critical alerts.</p>}
          </div>
          
          {/* Upcoming Appointments */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-800 mb-3 text-base">Upcoming Appointments</h3>
            {patient.upcomingAppointments.length > 0 ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-200">
                    {patient.upcomingAppointments.map(app => (
                        <div key={app.id} className="text-sm">
                            <p className="font-bold text-gray-800">{app.date} @ {app.time}</p>
                            <p className="text-gray-600">{app.department} with {app.doctor}</p>
                        </div>
                    ))}
                </div>
            ) : <p className="text-sm text-gray-500 bg-slate-50 rounded-lg p-3">No upcoming appointments.</p>}
          </div>

          {/* Recent Cases */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3 text-base">Recent Cases</h3>
            {patient.recentCases.length > 0 ? (
                <div className="bg-slate-50 p-4 rounded-xl space-y-3 border border-gray-200">
                    {patient.recentCases.map(c => (
                         <div key={c.id} className="text-sm">
                            <p className="font-bold text-gray-800">{c.title}</p>
                            <p className="text-gray-600">Status: {c.status} (Owner: {c.owner})</p>
                        </div>
                    ))}
                </div>
            ) : <p className="text-sm text-gray-500 bg-slate-50 rounded-lg p-3">No recent cases.</p>}
          </div>
        </div>

        {/* Notes */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 text-base">Call Notes</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-[calc(100%-2.5rem)] p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
            placeholder="Start typing notes for this interaction..."
          />
        </div>
      </div>
    </div>
  );
};

const ActionPanel = ({ appointments, onAction }) => {
  const [activeTab, setActiveTab] = useState('scheduler');

  const Scheduler = () => {
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedApptToReschedule, setSelectedApptToReschedule] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleAction = (type) => {
        const message = type === 'book'
            ? `Booked new appointment at ${selectedTime}`
            : `Rescheduled appointment to ${selectedTime}`;
        
        onAction(message); // Pass message to parent for logging
        setSuccessMessage(message);
        setSelectedTime(null);
        setSelectedApptToReschedule(null);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
      <div className="p-1">
          <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Mini Scheduler</h3>
              <select className="text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                  {mockDoctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
              {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'].map((time, i) => (
                  <button 
                    key={time} 
                    onClick={() => setSelectedTime(time)}
                    className={`p-2.5 rounded-lg transition-all ${
                        selectedTime === time 
                        ? 'bg-blue-600 text-white font-semibold ring-2 ring-offset-2 ring-blue-600' 
                        : i === 4 
                        ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                        : 'bg-green-50 text-green-800 hover:bg-green-100 hover:text-green-900 font-medium'
                    }`}
                    disabled={i === 4}
                  >
                      {time}
                  </button>
              ))}
          </div>
          
          {successMessage && <div className="bg-green-100 text-green-800 p-3 rounded-lg text-center text-sm font-semibold mb-4">{successMessage}</div>}

          <div className="space-y-4">
              <button 
                onClick={() => handleAction('book')}
                disabled={!selectedTime}
                className="w-full bg-blue-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-all shadow-sm disabled:bg-blue-300 disabled:cursor-not-allowed"
              >
                Book New Appointment
              </button>

              {appointments && appointments.length > 0 && (
                  <div className="border-t pt-4">
                      <h4 className="font-semibold text-gray-700 text-sm mb-2">Reschedule Existing</h4>
                      <select 
                        onChange={(e) => setSelectedApptToReschedule(e.target.value)}
                        className="w-full text-sm border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-2"
                      >
                          <option value="">Select appointment...</option>
                          {appointments.map(app => (
                              <option key={app.id} value={app.id}>{app.date} @ {app.time} with {app.doctor}</option>
                          ))}
                      </select>
                      <button 
                        onClick={() => handleAction('reschedule')}
                        disabled={!selectedTime || !selectedApptToReschedule}
                        className="w-full bg-orange-500 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-orange-600 transition-all shadow-sm disabled:bg-orange-300 disabled:cursor-not-allowed"
                      >
                        Reschedule Appointment
                      </button>
                  </div>
              )}
          </div>
      </div>
    );
  };

  const Tasks = () => (
    <div className="p-1">
        <h3 className="font-semibold text-gray-800 mb-4">My Tasks</h3>
        <div className="space-y-3">
            {mockTasks.map(task => (
                <div key={task.id} className="bg-slate-50 p-3 rounded-xl border border-gray-200 text-sm">
                    <p className="font-semibold text-gray-800">{task.title}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                        <span>Due: {task.dueDate}</span>
                        <span className={`px-2 py-0.5 rounded-full font-medium ${task.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>{task.priority}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
  
  const KnowledgeBase = () => (
      <div className="p-1">
        <h3 className="font-semibold text-gray-800 mb-4">Knowledge Base</h3>
        <input type="text" placeholder="Search protocols, billing codes..." className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
      </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full border border-gray-200">
      <div className="flex border-b border-gray-200 mb-4 flex-wrap">
        <button onClick={() => setActiveTab('scheduler')} className={`px-4 py-2 text-sm font-semibold transition-all ${activeTab === 'scheduler' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}><CalendarIcon className="w-5 h-5 inline-block mr-1.5" />Scheduler</button>
        <button onClick={() => setActiveTab('tasks')} className={`px-4 py-2 text-sm font-semibold transition-all ${activeTab === 'tasks' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}><CheckSquareIcon className="w-5 h-5 inline-block mr-1.5" />Tasks</button>
        <button onClick={() => setActiveTab('kb')} className={`px-4 py-2 text-sm font-semibold transition-all ${activeTab === 'kb' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}><BookIcon className="w-5 h-5 inline-block mr-1.5" />KB</button>
      </div>
      <div>
        {activeTab === 'scheduler' && <Scheduler />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'kb' && <KnowledgeBase />}
      </div>
    </div>
  );
};

const DispositionModal = ({ isOpen, onClose, onSave }) => {
  const [disposition, setDisposition] = useState(mockDispositions[0]);
  const [finalNotes, setFinalNotes] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
      onSave({ disposition, finalNotes });
      setFinalNotes('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 transition-opacity">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg m-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Wrap Up & Disposition</h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="disposition" className="block text-sm font-medium text-gray-700 mb-1">Call Outcome</label>
            <select
              id="disposition"
              value={disposition}
              onChange={(e) => setDisposition(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2.5 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg"
            >
              {mockDispositions.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="finalNotes" className="block text-sm font-medium text-gray-700 mb-1">Final Notes</label>
            <textarea
              id="finalNotes"
              rows={4}
              value={finalNotes}
              onChange={(e) => setFinalNotes(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Add any final wrap-up notes here..."
            />
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button onClick={onClose} className="bg-gray-100 text-gray-800 font-bold py-2 px-5 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
          <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors shadow-sm">Save Interaction</button>
        </div>
      </div>
    </div>
  );
};


// --- MAIN APP COMPONENT ---

export default function App() {
  const [callStatus, setCallStatus] = useState('idle'); // 'idle', 'incoming', 'active', 'wrapup'
  const [activeCallerId, setActiveCallerId] = useState(null);
  const [activePatient, setActivePatient] = useState(null);
  const [callTimer, setCallTimer] = useState(null);
  const [callDuration, setCallDuration] = useState(0);
  const [notes, setNotes] = useState('');
  const [showDispositionModal, setShowDispositionModal] = useState(false);

  // Simulate an incoming call
  useEffect(() => {
    const randomCaller = Object.keys(mockPatients)[Math.floor(Math.random() * Object.keys(mockPatients).length)];
    const callTimeout = setTimeout(() => {
      if (callStatus === 'idle') {
        setActiveCallerId(randomCaller);
        setCallStatus('incoming');
      }
    }, 5000); // Call comes in after 5 seconds
    return () => clearTimeout(callTimeout);
  }, [callStatus]);

  // Handle call duration timer
  useEffect(() => {
    if (callStatus === 'active') {
      const timer = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      setCallTimer(timer);
    } else {
      clearInterval(callTimer);
      setCallDuration(0);
    }
    return () => clearInterval(callTimer);
  }, [callStatus]);

  const handleAnswer = useCallback(() => {
    setCallStatus('active');
    setActivePatient(mockPatients[activeCallerId] || null);
  }, [activeCallerId]);

  const handleEndCall = useCallback(() => {
    setCallStatus('wrapup');
    setShowDispositionModal(true);
  }, []);
  
  const resetSystem = useCallback(() => {
      setCallStatus('idle');
      setActiveCallerId(null);
      setActivePatient(null);
      setNotes('');
      setShowDispositionModal(false);
  }, []);

  const handleSaveDisposition = (data) => {
    console.log('Interaction Saved:', {
      patient: activePatient?.name,
      callerId: activeCallerId,
      callDuration: callDuration,
      notes: notes,
      disposition: data.disposition,
      finalNotes: data.finalNotes,
      timestamp: new Date().toISOString()
    });
    resetSystem();
  };
  
  const handleSchedulerAction = (message) => {
      console.log('Scheduler Action:', message);
      // Here you could trigger an API call to actually book/reschedule
  };
  
  const isCallActive = callStatus === 'active' || callStatus === 'wrapup';

  return (
    <div className="bg-slate-100 min-h-screen p-4 sm:p-6 font-sans antialiased">
      <div className={`grid grid-cols-1 ${isCallActive ? 'lg:grid-cols-12' : 'md:grid-cols-2'} gap-6 min-h-[calc(100vh-3rem)]`}>
        {/* Left Panel: Call Controls */}
        <div className={isCallActive ? "lg:col-span-3" : "md:col-span-1"}>
          <CallControlPanel 
            status={callStatus} 
            onAnswer={handleAnswer}
            onEnd={handleEndCall}
            callerId={activeCallerId}
            duration={callDuration}
          />
        </div>

        {/* Center Panel: Patient Information - RENDERED CONDITIONALLY */}
        {isCallActive && (
          <div className="lg:col-span-6">
            <PatientInfoPanel 
              patient={activePatient}
              notes={notes}
              setNotes={setNotes}
            />
          </div>
        )}

        {/* Right Panel: Actions */}
        <div className={isCallActive ? "lg:col-span-3" : "md:col-span-1"}>
          <ActionPanel 
            appointments={activePatient?.upcomingAppointments}
            onAction={handleSchedulerAction}
          />
        </div>
      </div>
      <DispositionModal 
        isOpen={showDispositionModal}
        onClose={resetSystem}
        onSave={handleSaveDisposition}
      />
    </div>
  );
}
