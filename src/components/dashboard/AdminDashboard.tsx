import React, { useState, useMemo, useCallback } from 'react';
import { Search, Bell, UserCircle, Users, Briefcase, Calendar, MessageSquare, Mail, HeartPulse, Stethoscope, FileText, DollarSign, BarChart2, Shield, BellRing, Settings, SlidersHorizontal, Clock, Share2, Database, MessageCircle, MailWarning, Wifi, Lock, UserCog, KeyRound, BellPlus, FileCog, ShieldCheck, Settings2, Menu, ZapOff, UserPlus, Voicemail, Workflow, PhoneForwarded, Mic, Bot, GitBranch, Megaphone, LayoutDashboard, ChevronDown, Activity, AlertTriangle, FileClock, Cog } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// --- MOCK DATA ---

const statsCardsData = [
  { icon: Users, title: 'Total Users', value: '127', change: '+3%', changeType: 'increase' as const, accentColor: 'blue' as const },
  { icon: Lock, title: 'Failed Logins', value: '12', change: '-5%', changeType: 'decrease' as const, accentColor: 'red' as const, filterTarget: 'security', actionable: true },
  { icon: FileClock, title: 'Audit Events', value: '1,432', change: '+12%', changeType: 'increase' as const, accentColor: 'yellow' as const },
  { icon: AlertTriangle, title: 'API/EMR Errors', value: '8', change: '-3%', changeType: 'decrease' as const, accentColor: 'orange' as const },
];

const systemHealthData = [
  { icon: Database, name: 'Database', status: 'Healthy', color: 'bg-green-100 text-green-800' },
  { icon: MessageCircle, name: 'Message Queue', status: 'Healthy', color: 'bg-green-100 text-green-800' },
  { icon: MailWarning, name: 'Email Gateway', status: 'Degraded', color: 'bg-orange-100 text-orange-800' },
  { icon: Wifi, name: 'Telephony Integration', status: 'Healthy', color: 'bg-green-100 text-green-800' },
];

const contactCenterHealthData = [
    { icon: Voicemail, name: 'IVR Service', status: 'Healthy', color: 'bg-green-100 text-green-800' },
    { icon: Workflow, name: 'ACD Queue Engine', status: 'Healthy', color: 'bg-green-100 text-green-800' },
    { icon: PhoneForwarded, name: 'Outbound Dialer', status: 'Active', color: 'bg-blue-100 text-blue-800' },
    { icon: Mic, name: 'Call Recording Service', status: 'Error', color: 'bg-red-100 text-red-800' },
];

const configSummaryData = [
  { name: 'Case Types Configured', value: 12 },
  { name: 'SLA Rules Configured', value: 8 },
  { name: 'User Roles Defined', value: 6 },
  { name: 'Notification Templates', value: 15 },
];

const recentActivityData = [
  { title: "User 'john.doe' locked after failed logins", category: 'security', time: 'Today, 10:23 AM', icon: ShieldCheck },
  { title: "SLA rule 'Urgent Care' modified by admin", category: 'config', time: 'Today, 9:15 AM', icon: Cog },
  { title: "EMR sync completed - 234 records", category: 'integration', time: 'Today, 8:30 AM', icon: Share2 },
  { title: "Role permission 'Case-Delete' added", category: 'security', time: 'Yesterday, 4:45 PM', icon: ShieldCheck },
  { title: "System backup completed successfully", category: 'system', time: 'Yesterday, 2:00 AM', icon: Database },
];

const quickAccessData = [
    { icon: UserCog, name: 'User Management' },
    { icon: KeyRound, name: 'Role Permissions' },
    { icon: BellPlus, name: 'Notifications' },
    { icon: Bot, name: 'IVR Studio' },
    { icon: GitBranch, name: 'Call Routing' },
    { icon: Megaphone, name: 'Campaigns' },
];


// --- REUSABLE & MODIFIED COMPONENTS ---

const SparkLine = ({ type = 'increase' }) => {
    const color = type === 'increase' ? '#16a34a' : '#dc2626';
    const points = type === 'increase' ? "0,20 20,10 40,15 60,0 80,5" : "0,5 20,15 40,10 60,20 80,15";
    return (
        <svg width="80" height="20" viewBox="0 0 80 20" className="opacity-70">
            <polyline points={points} fill="none" stroke={color} strokeWidth="2" />
        </svg>
    );
};

const StatCard = ({
    icon: Icon,
    title,
    value,
    change,
    changeType = 'increase',
    accentColor = 'blue',
    actionable = false,
    onClick,
    style
}: {
    icon: any;
    title: any;
    value: any;
    change: any;
    changeType?: 'increase' | 'decrease';
    accentColor?: 'blue' | 'red' | 'yellow' | 'orange';
    actionable?: boolean;
    onClick?: () => void;
    style?: React.CSSProperties;
}) => {
    const accentClasses = {
        blue: { text: 'text-blue-500', bg: 'bg-blue-500/10', ring: 'ring-blue-500' },
        red: { text: 'text-red-500', bg: 'bg-red-500/10', ring: 'ring-red-500' },
        yellow: { text: 'text-yellow-500', bg: 'bg-yellow-500/10', ring: 'ring-yellow-500' },
        orange: { text: 'text-orange-500', bg: 'bg-orange-500/10', ring: 'ring-orange-500' },
    };
    const classes = accentClasses[accentColor] || accentClasses.blue;
    const changeColor = changeType === 'increase' ? 'text-green-600' : 'text-red-600';

    return (
        <div 
            style={style}
            className={`bg-white/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex flex-col justify-between border border-white/30 ${actionable ? `cursor-pointer hover:ring-2 ${classes.ring}` : ''} transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 ${classes.ring} animate-fadeInUp`}
            onClick={onClick}
            tabIndex={actionable ? 0 : undefined}
            role={actionable ? 'button' : undefined}
            aria-label={title}
        >
            <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${classes.bg}`}>
                    <Icon className={`w-6 h-6 ${classes.text}`} />
                </div>
                <span className={`text-sm font-bold ${changeColor}`}>{change}</span>
            </div>
            <div>
                <p className="text-3xl font-bold text-gray-900 mt-4">{value}</p>
                <p className="text-sm font-medium text-gray-500">{title}</p>
            </div>
            <div className="mt-4">
                <SparkLine type={changeType} />
            </div>
        </div>
    );
};

const SystemHealth = () => (
    <div className="space-y-4">
        {systemHealthData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-base font-medium text-gray-800">{item.name}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.color}`}>{item.status}</span>
            </div>
        ))}
    </div>
);

const ContactCenterHealth = () => (
    <div className="space-y-4">
        {contactCenterHealthData.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3 text-gray-500" />
                    <span className="text-base font-medium text-gray-800">{item.name}</span>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${item.color}`}>{item.status}</span>
            </div>
        ))}
    </div>
);

const ConfigurationSummary = () => (
    <div className="space-y-4">
        {configSummaryData.map((item, index) => (
            <div key={index} className="flex justify-between items-center text-base">
                <span className="text-gray-700 font-medium">{item.name}</span>
                <span className="font-bold text-emerald-800">{item.value}</span>
            </div>
        ))}
    </div>
);

const RecentSystemActivity = ({ activityFilter, setActivityFilter }) => {
    const categoryColors = {
        security: 'bg-red-100 text-red-800',
        config: 'bg-blue-100 text-blue-800',
        integration: 'bg-green-100 text-green-800',
        system: 'bg-gray-100 text-gray-800',
    };
    
    const filters = ['all', 'security', 'config', 'system', 'integration'];

    const filteredActivities = useMemo(() => {
        if (activityFilter === 'all') {
            return recentActivityData;
        }
        return recentActivityData.filter(activity => activity.category === activityFilter);
    }, [activityFilter]);

    return (
        <div>
            <div className="flex items-center space-x-1 mb-6 p-1 rounded-xl bg-gray-100/80 backdrop-blur-sm overflow-x-auto scrollbar-thin">
                {filters.map(filter => (
                    <button 
                        key={filter}
                        onClick={() => setActivityFilter(filter)}
                        className={`w-full px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 ${activityFilter === filter ? 'bg-white text-emerald-700 shadow-sm' : 'bg-transparent text-gray-600 hover:bg-white/50'}`}
                    >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                ))}
            </div>

            <div className="space-y-0.5">
                {filteredActivities.length > 0 ? filteredActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start animate-fadeInUp"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`p-2 rounded-full mr-4 ${categoryColors[activity.category]} shadow-sm`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 border-b border-gray-100 pb-4 mb-2">
                        <p className="text-base font-semibold text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                )) : (
                    <p className="text-base text-gray-500 text-center py-4 animate-fadeInUp">
                      No activities match the current filter.
                    </p>
                )}
            </div>
        </div>
    );
};

const QuickAccess = () => (
    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-lg ring-1 ring-white/20 animate-fadeInUp">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {quickAccessData.map((item, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center text-center group hover:bg-white/100 px-4 py-2 rounded-xl transition-all duration-300 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    tabIndex={0}
                    role="button"
                    aria-label={item.name}
                    title={item.name}
                >
                    <div className="bg-emerald-100 text-emerald-600 rounded-lg p-3 mb-2 transition-colors duration-300 group-hover:bg-emerald-200">
                        <item.icon className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-semibold text-gray-800 whitespace-nowrap">{item.name}</p>
                </div>
            ))}
        </div>
    </div>
);

const Dashboard = () => {
    const [activityFilter, setActivityFilter] = useState('all');

    return (
        <div className="flex-1 p-8 bg-transparent">
            {/* Stats Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statsCardsData.map((card, index) => 
                    <StatCard 
                        key={index} 
                        {...card} 
                        onClick={card.actionable ? () => setActivityFilter(card.filterTarget) : undefined}
                        style={{animationDelay: `${200 + index * 100}ms`}}
                    />
                )}
            </div>
            <main>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
                    <SectionCard title="System Health" style={{animationDelay: '600ms'}}>
                        <SystemHealth />
                    </SectionCard>
                    <SectionCard title="Contact Center Health" style={{animationDelay: '700ms'}}>
                        <ContactCenterHealth />
                    </SectionCard>
                </div>
                <div className="mb-12">
                    <SectionCard title="Quick Actions" style={{animationDelay: '800ms'}}>
                        <QuickAccess />
                    </SectionCard>
                </div>
                <SectionCard title="Recent System Activity" className="mb-12" style={{animationDelay: '900ms'}}>
                    <RecentSystemActivity activityFilter={activityFilter} setActivityFilter={setActivityFilter} />
                </SectionCard>
            </main>
        </div>
    );
};

const SectionCard = ({ title, children, className = "", style }) => (
    <section style={style} className={`bg-white/50 backdrop-blur-lg shadow-xl rounded-2xl p-6 border border-white/20 animate-fadeInUp ${className}`}>
        <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        {children}
    </section>
);

const Background = () => (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10rem] right-[-10rem] w-[30rem] h-[30rem] bg-emerald-200/50 rounded-full filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-[-5rem] left-[-5rem] w-[30rem] h-[30rem] bg-blue-200/50 rounded-full filter blur-3xl opacity-50"></div>
    </div>
);

export default function App() {
  return (
    <>
      {/* To use the "Inter" font, add this to your project's <head>:
      <link rel="stylesheet" href="https://rsms.me/inter/inter.css"> */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <div className="relative bg-gray-50 font-['Inter',_sans-serif] min-h-screen w-full">
        <Background />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Dashboard />
        </div>
      </div>
    </>
  )
}
