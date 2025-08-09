import React, { useState } from 'react';
import { Search, Plus, X, ArrowLeft, Home, User, Briefcase, ClipboardList, Stethoscope, Users, FileText, Sliders, Cog, ChevronsUpDown, Edit2, Trash2, Clock } from 'lucide-react';

// --- MOCK DATA (Updated Structure) ---
const initialSlaRules = [
    { id: 1, name: 'High Priority Emergencies', conditions: [{field: 'Priority', operator: 'is', value: 'High'}, {field: 'Case Type', operator: 'is', value: 'Medical Emergency'}], responseTime: '15 mins', resolutionTime: '1 hour', status: 'Active' },
    { id: 2, name: 'Standard Appointments', conditions: [{field: 'Case Type', operator: 'is', value: 'Appointment Request'}], responseTime: '2 hours', resolutionTime: '24 hours', status: 'Active' },
    { id: 3, name: 'Billing Issues', conditions: [{field: 'Case Type', operator: 'is', value: 'Billing Issue'}], responseTime: '8 hours', resolutionTime: '3 days', status: 'Inactive' },
];

const initialEscalationRules = [
    { id: 1, slaRuleId: 1, name: 'Pre-Breach Warning', conditions: [{field: 'SLA Response Time %', operator: '>', value: '75'}], target: 'Team Lead', method: 'Email', status: 'Active' },
    { id: 2, slaRuleId: 2, name: 'VIP Escalation', conditions: [{field: 'Case Tag', operator: 'contains', value: 'VIP'}], target: 'Hospital Director', method: 'Email & Phone Call', status: 'Active' },
    { id: 3, slaRuleId: 2, name: 'Stagnant Surgery Case', conditions: [{field: 'Case Type', operator: 'is', value: 'Surgery'}, {field: 'Time Since Last Update', operator: '>', value: '2 hours'}], target: 'Doctor Management', method: 'SMS', status: 'Active' },
    { id: 4, slaRuleId: 3, name: 'Resolution Time Warning', conditions: [{field: 'SLA Resolution Time %', operator: '>', value: '90'}], target: 'Team Lead', method: 'Internal Note', status: 'Inactive' },
];


// --- LAYOUT COMPONENTS ---
const NavItem = ({ icon, label, active = false }) => (
    <a href="#" className={`flex items-center px-4 py-2 text-sm rounded-md transition-colors ${active ? 'bg-[#4A5D6A] text-white' : 'text-gray-300 hover:bg-gray-700'}`}>
        {icon}
        <span className="ml-3">{label}</span>
    </a>
);


// --- MAIN APP COMPONENT ---
export default function SLARules() {
    return (
        <SlaRulesPage />
    );
}


// --- SLA RULES PAGE COMPONENT ---
const SlaRulesPage = () => {
    const [activeTab, setActiveTab] = useState('SLA Rules');
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [slaRules, setSlaRules] = useState(initialSlaRules);
    const [escalationRules, setEscalationRules] = useState(initialEscalationRules);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemToProcess, setItemToProcess] = useState(null);

    const handleAddSlaRule = (newRule) => { setSlaRules(prev => [...prev, { ...newRule, id: Date.now(), status: 'Active' }]); closeModal(); };
    const handleAddEscalationRule = (newRule) => { setEscalationRules(prev => [...prev, { ...newRule, id: Date.now(), status: 'Active' }]); closeModal(); };
    const requestDelete = (item, type) => { setItemToProcess({ ...item, type }); setModalContent('confirmDelete'); setShowModal(true); };
    const confirmDelete = () => {
        if(itemToProcess.type === 'sla'){ setSlaRules(prev => prev.filter(rule => rule.id !== itemToProcess.id)); } 
        else { setEscalationRules(prev => prev.filter(rule => rule.id !== itemToProcess.id)); }
        closeModal();
    };
    const toggleSlaStatus = (id) => setSlaRules(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
    const toggleEscalationStatus = (id) => setEscalationRules(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'Active' ? 'Inactive' : 'Active' } : r));
    const openCreateModal = () => { setModalContent(activeTab === 'SLA Rules' ? 'createSla' : 'createEscalation'); setShowModal(true); };
    const openHistoryModal = (rule) => { setItemToProcess(rule); setModalContent('history'); setShowModal(true); };
    const closeModal = () => { setShowModal(false); setItemToProcess(null); setModalContent(null); };

    const filteredSlaRules = slaRules.filter(rule => rule.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredEscalationRules = escalationRules.filter(rule => rule.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return (
        <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
                <a href="#" className="flex items-center text-sm text-gray-500 hover:text-gray-700 mb-2"><ArrowLeft className="w-4 h-4 mr-2" /> / admin / sla-rules</a>
                <h1 className="text-3xl font-bold text-gray-900">SLA Configuration</h1>
                <p className="text-gray-600 mt-1">Manage service level agreements and escalation rules</p>
            </div>

            <div className="flex border-b border-gray-200 mb-6">
                <TabButton name="SLA Rules" active={activeTab === 'SLA Rules'} onClick={() => setActiveTab('SLA Rules')} />
                <TabButton name="Escalation Rules" active={activeTab === 'Escalation Rules'} onClick={() => setActiveTab('Escalation Rules')} />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <div className="relative w-full sm:w-auto">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input type="text" placeholder={`Search ${activeTab.toLowerCase()}...`} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-80 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none" />
                </div>
                <button onClick={openCreateModal} className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-700 transition-colors w-full sm:w-auto">
                    <Plus className="w-5 h-5" /> {activeTab === 'SLA Rules' ? 'Add SLA Rule' : 'Add Escalation Rule'}
                </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                {activeTab === 'SLA Rules' 
                    ? <SlaTable rules={filteredSlaRules} onDelete={requestDelete} onStatusToggle={toggleSlaStatus} onShowHistory={openHistoryModal} />
                    : <EscalationTable rules={filteredEscalationRules} onDelete={requestDelete} onStatusToggle={toggleEscalationStatus} onShowHistory={openHistoryModal} slaRules={slaRules} />
                }
            </div>

            {showModal && (
                <Modal onClose={closeModal}>
                    {modalContent === 'createSla' && <CreateSlaRuleForm onCancel={closeModal} onCreate={handleAddSlaRule} />}
                    {modalContent === 'createEscalation' && <CreateEscalationRuleForm onCancel={closeModal} onCreate={handleAddEscalationRule} slaRules={slaRules} />}
                    {modalContent === 'history' && <HistoryModal rule={itemToProcess} onCancel={closeModal} />}
                    {modalContent === 'confirmDelete' && <ConfirmationModal item={itemToProcess} onCancel={closeModal} onConfirm={confirmDelete} />}
                </Modal>
            )}
        </main>
    );
};


// --- REUSABLE UI COMPONENTS ---
const TabButton = ({ name, active, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 -mb-px text-sm font-semibold border-b-2 transition-colors ${active ? 'border-green-600 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
        {name}
    </button>
);

const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-16 p-4" onClick={onClose}>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>{children}</div>
    </div>
);

const ToggleSwitch = ({ enabled, onChange }) => (
  <div onClick={onChange} className={`cursor-pointer w-14 h-7 flex items-center rounded-full p-1 duration-300 ${enabled ? 'bg-green-600' : 'bg-gray-300'}`}>
    <div className={`bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ${enabled ? 'translate-x-7' : ''}`} />
  </div>
);

const ConditionPills = ({ conditions = [] }) => (
    <div className="flex flex-wrap gap-2">
        {conditions.map((cond, index) => (
            <span key={index} className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                <strong>{cond.field}</strong> {cond.operator} <strong>{cond.value}{cond.field.includes('%') ? '%' : ''}</strong>
            </span>
        ))}
    </div>
);


// --- TABLE COMPONENTS ---
const SlaTable = ({ rules, onDelete, onStatusToggle, onShowHistory }) => (
    <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wider">
            <tr>
                <th className="px-6 py-3">Rule Name</th>
                <th className="px-6 py-3">Conditions</th>
                <th className="px-6 py-3">Response Time</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {rules.map(rule => (
                <tr key={rule.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{rule.name}</td>
                    <td className="px-6 py-4"><ConditionPills conditions={rule.conditions} /></td>
                    <td className="px-6 py-4">{rule.responseTime}</td>
                    <td className="px-6 py-4"><ToggleSwitch enabled={rule.status === 'Active'} onChange={() => onStatusToggle(rule.id)} /></td>
                    <td className="px-6 py-4 flex items-center gap-3">
                        <button onClick={() => onShowHistory(rule)} className="text-gray-500 hover:text-blue-700" title="History"><Clock className="w-4 h-4"/></button>
                        <button className="text-gray-500 hover:text-green-700" title="Edit"><Edit2 className="w-4 h-4"/></button>
                        <button onClick={() => onDelete(rule, 'sla')} className="text-gray-500 hover:text-red-700" title="Delete"><Trash2 className="w-4 h-4"/></button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

const EscalationTable = ({ rules, onDelete, onStatusToggle, onShowHistory, slaRules }) => (
    <table className="w-full text-sm text-left text-gray-600">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase tracking-wider">
            <tr>
                <th className="px-6 py-3">Rule Name</th>
                <th className="px-6 py-3">Applied to SLA</th>
                <th className="px-6 py-3">Triggers</th>
                <th className="px-6 py-3">Escalation Target</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
            </tr>
        </thead>
        <tbody>
            {rules.map(rule => {
                const appliedSla = slaRules.find(sla => sla.id === rule.slaRuleId);
                return (
                    <tr key={rule.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium text-gray-900">{rule.name}</td>
                        <td className="px-6 py-4 text-gray-500">{appliedSla ? appliedSla.name : 'N/A'}</td>
                        <td className="px-6 py-4"><ConditionPills conditions={rule.conditions} /></td>
                        <td className="px-6 py-4">{rule.target}</td>
                        <td className="px-6 py-4"><ToggleSwitch enabled={rule.status === 'Active'} onChange={() => onStatusToggle(rule.id)} /></td>
                        <td className="px-6 py-4 flex items-center gap-3">
                            <button onClick={() => onShowHistory(rule)} className="text-gray-500 hover:text-blue-700" title="History"><Clock className="w-4 h-4"/></button>
                            <button className="text-gray-500 hover:text-green-700" title="Edit"><Edit2 className="w-4 h-4"/></button>
                            <button onClick={() => onDelete(rule, 'escalation')} className="text-gray-500 hover:text-red-700" title="Delete"><Trash2 className="w-4 h-4"/></button>
                        </td>
                    </tr>
                );
            })}
        </tbody>
    </table>
);

// --- MODAL & FORM COMPONENTS ---

const ConfirmationModal = ({ item, onCancel, onConfirm }) => (
    <div className="p-6">
        <h2 className="text-xl font-semibold">Confirm Deletion</h2>
        <p className="my-4 text-gray-600">Are you sure you want to delete the rule: <strong className="text-gray-800">{item.name}</strong>? This action cannot be undone.</p>
        <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50">Cancel</button>
            <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-md bg-red-600 text-white font-semibold hover:bg-red-700">Delete</button>
        </div>
    </div>
);

const HistoryModal = ({ rule, onCancel }) => (
    <div className="p-6">
        <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-semibold">History for: <span className="text-green-600">{rule.name}</span></h2><button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X /></button></div>
        <div className="space-y-4 max-h-96 overflow-y-auto"><div className="p-3 border rounded-md bg-gray-50"><p className="text-sm"><strong>Action:</strong> Rule Created</p><p className="text-xs text-gray-500 mt-1"><strong>User:</strong> admin@hospital.com | <strong>Date:</strong> 2025-05-01 09:00 AM</p></div></div>
        <div className="flex justify-end gap-3 mt-8"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50">Close</button></div>
    </div>
);

const FormSection = ({ title, children }) => (
    <div className="border-t border-gray-200 pt-4 mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
    </div>
);

const ConditionRow = ({ condition, onChange, onRemove, fieldOptions, operatorOptions }) => {
    const valueType = condition.field.includes('%') ? 'percentage' : condition.field.includes('Time') ? 'time' : 'text';

    const handleValueChange = (e) => {
        const event = { target: { name: 'value', value: e.target.value } };
        onChange(event);
    };

    const handleUnitChange = (e) => {
        const timeValue = condition.value.split(' ')[0] || '';
        const event = { target: { name: 'value', value: `${timeValue} ${e.target.value}` } };
        onChange(event);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 items-center">
            <FormSelect name="field" value={condition.field} onChange={onChange} options={fieldOptions} wrapperClass="md:col-span-1" />
            <FormSelect name="operator" value={condition.operator} onChange={onChange} options={operatorOptions[condition.field] || []} wrapperClass="md:col-span-1" />
            <ValueInput type={valueType} value={condition.value} onValueChange={handleValueChange} onUnitChange={handleUnitChange} />
            <button type="button" onClick={onRemove} className="text-red-500 hover:text-red-700 justify-self-start md:justify-self-center">Remove</button>
        </div>
    );
};

const ValueInput = ({ type, value, onValueChange, onUnitChange }) => {
    if (type === 'time') {
        const [timeVal = '', unitVal = 'hours'] = typeof value === 'string' ? value.split(' ') : [];
        return (
            <div className="flex md:col-span-1">
                <FormInput value={timeVal} onChange={onValueChange} type="number" placeholder="Value" wrapperClass="flex-grow" />
                <FormSelect value={unitVal} onChange={onUnitChange} options={['minutes', 'hours', 'days']} wrapperClass="w-24"/>
            </div>
        );
    }
     if (type === 'percentage') {
        return (
             <div className="relative md:col-span-1">
                <FormInput value={value} onChange={onValueChange} type="number" placeholder="Value" />
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">%</span>
            </div>
        );
    }
    return <FormInput value={value} onChange={onValueChange} placeholder="Value" wrapperClass="md:col-span-1" />;
};


const CreateSlaRuleForm = ({ onCancel, onCreate }) => {
    const [name, setName] = useState('');
    const [conditions, setConditions] = useState([{ field: 'Priority', operator: 'is', value: '' }]);
    const [responseTime, setResponseTime] = useState({ time: '', unit: 'hours' });
    const [resolutionTime, setResolutionTime] = useState({ time: '', unit: 'hours' });

    const fieldOptions = ['Priority', 'Case Type', 'Case Tag'];
    const operatorOptions = { Priority: ['is', 'is not'], 'Case Type': ['is', 'is not'], 'Case Tag': ['contains', 'does not contain'] };

    const handleConditionChange = (index, e) => {
        const { name, value } = e.target;
        const newConditions = [...conditions];
        newConditions[index][name] = value;
        if (name === 'field') { newConditions[index]['operator'] = operatorOptions[value][0]; newConditions[index]['value'] = ''; }
        setConditions(newConditions);
    };
    
    const addCondition = () => setConditions([...conditions, { field: 'Priority', operator: 'is', value: '' }]);
    const removeCondition = (index) => setConditions(conditions.filter((_, i) => i !== index));

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate({ name, conditions, responseTime: `${responseTime.time} ${responseTime.unit}`, resolutionTime: `${resolutionTime.time} ${resolutionTime.unit}` });
    };
    
    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-semibold">Create New SLA Rule</h2><button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X /></button></div>
            <FormInput label="Rule Name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., High Priority Emergencies" wrapperClass="mb-4"/>
            <FormSection title="Conditions"><p className="text-sm text-gray-500 -mt-2">This SLA will apply if ALL of these conditions are met.</p>{conditions.map((cond, index) => <ConditionRow key={index} condition={cond} onChange={(e) => handleConditionChange(index, e)} onRemove={() => removeCondition(index)} fieldOptions={fieldOptions} operatorOptions={operatorOptions} />)}<button type="button" onClick={addCondition} className="text-sm font-semibold text-green-600 hover:text-green-800">+ Add Condition</button></FormSection>
            <FormSection title="Timelines"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><FormTimeInput label="Response Time" timeValue={responseTime.time} unitValue={responseTime.unit} onTimeChange={e => setResponseTime({...responseTime, time: e.target.value})} onUnitChange={e => setResponseTime({...responseTime, unit: e.target.value})} /><FormTimeInput label="Resolution Time" timeValue={resolutionTime.time} unitValue={resolutionTime.unit} onTimeChange={e => setResolutionTime({...resolutionTime, time: e.target.value})} onUnitChange={e => setResolutionTime({...resolutionTime, unit: e.target.value})} /></div></FormSection>
            <div className="flex justify-end gap-3 mt-8"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">Create</button></div>
        </form>
    );
};

const CreateEscalationRuleForm = ({ onCancel, onCreate, slaRules }) => {
    const [name, setName] = useState('');
    const [slaRuleId, setSlaRuleId] = useState('');
    const [conditions, setConditions] = useState([{ field: 'SLA Response Time %', operator: '>', value: '' }]);
    const [target, setTarget] = useState('');
    const [method, setMethod] = useState('');

    const fieldOptions = ['SLA Response Time %', 'SLA Resolution Time %', 'Time Since Last Update', 'Priority', 'Case Type', 'Case Tag'];
    const operatorOptions = {
        'SLA Response Time %': ['>', '<', '='],
        'SLA Resolution Time %': ['>', '<', '='],
        'Time Since Last Update': ['>', '<', '='],
        'Priority': ['is', 'is not'],
        'Case Type': ['is', 'is not'],
        'Case Tag': ['contains', 'does not contain']
    };

    const handleConditionChange = (index, e) => {
        const { name, value } = e.target;
        const newConditions = [...conditions];
        newConditions[index][name] = value;
        if (name === 'field') { newConditions[index]['operator'] = operatorOptions[value][0]; newConditions[index]['value'] = '';}
        setConditions(newConditions);
    };

    const addCondition = () => setConditions([...conditions, { field: 'Priority', operator: 'is', value: '' }]);
    const removeCondition = (index) => setConditions(conditions.filter((_, i) => i !== index));
    const handleSubmit = (e) => { e.preventDefault(); onCreate({ name, slaRuleId, conditions, target, method }); };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <div className="flex justify-between items-center mb-6"><h2 className="text-xl font-semibold">Create Escalation Rule</h2><button type="button" onClick={onCancel} className="text-gray-400 hover:text-gray-600"><X /></button></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInput label="Rule Name" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Pre-Breach Warning" wrapperClass="w-full" />
                <FormSelect label="Applied to SLA" value={slaRuleId} onChange={e => setSlaRuleId(e.target.value)} options={slaRules.map(r => ({value: r.id, label: r.name}))} placeholder="Select SLA Rule..." required wrapperClass="w-full"/>
            </div>
             <FormSection title="Triggers"><p className="text-sm text-gray-500 -mt-2">This escalation will trigger if ALL of these conditions are met.</p>{conditions.map((cond, index) => {
                 return <ConditionRow key={index} condition={cond} onChange={(e) => handleConditionChange(index, e)} onRemove={() => removeCondition(index)} fieldOptions={fieldOptions} operatorOptions={operatorOptions} />
             })}<button type="button" onClick={addCondition} className="text-sm font-semibold text-green-600 hover:text-green-800">+ Add Trigger</button></FormSection>
             <FormSection title="Action">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormSelect label="Escalation Target" value={target} onChange={e => setTarget(e.target.value)} options={['Team Lead', 'Hospital Director', 'Customer Service Manager', 'Doctor Management']} placeholder="Select who to notify" wrapperClass="w-full" />
                    <FormInput label="Notification Method" value={method} onChange={e => setMethod(e.target.value)} placeholder="e.g., Email, SMS, Phone Call" wrapperClass="w-full" />
                </div>
            </FormSection>
            <div className="flex justify-end gap-3 mt-8"><button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-white border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50">Cancel</button><button type="submit" className="px-4 py-2 rounded-md bg-green-600 text-white font-semibold hover:bg-green-700">Create</button></div>
        </form>
    );
};


// --- REUSABLE FORM FIELD COMPONENTS ---
const FormInput = ({ label, wrapperClass, ...props }: {label?: string, wrapperClass?: string, [key: string]: any}) => (
    <div className={wrapperClass}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <input {...props} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
    </div>
);
const FormSelect = ({ label, wrapperClass, options, ...props }: {label?: string, wrapperClass?: string, options?: (string | {value: any, label: string})[], [key: string]: any}) => (
    <div className={wrapperClass}>
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <select {...props} className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">
            <option value="">{props.placeholder || 'Select...'}</option>
            {(options || []).map(opt =>
                typeof opt === 'string'
                ? <option key={opt} value={opt}>{opt}</option>
                : <option key={opt.value} value={opt.value}>{opt.label}</option>
            )}
        </select>
    </div>
);
const FormTimeInput = ({ label, timeValue, unitValue, onTimeChange, onUnitChange }) => (<div><label className="block text-sm font-medium text-gray-700 mb-1">{label}</label><div className="flex"><input type="number" value={timeValue} onChange={onTimeChange} placeholder="Time" className="flex-grow w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" /><select value={unitValue} onChange={onUnitChange} className="px-3 py-2 border border-l-0 border-gray-300 bg-gray-50 rounded-r-md focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm">{['mins', 'hours', 'days'].map(unit => <option key={unit}>{unit}</option>)}</select></div></div>);
