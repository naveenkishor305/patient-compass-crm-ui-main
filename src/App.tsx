import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import PatientManagement from '@/pages/PatientManagement';
import PatientProfile from '@/pages/PatientProfile';
import CaseManagement from '@/pages/CaseManagement';
import CaseDetail from '@/pages/CaseDetail';
import TaskManagement from '@/pages/TaskManagement';
import CreateTask from '@/pages/task/CreateTask';
import ViewTask from '@/pages/task/ViewTask';
import EditTask from '@/pages/task/EditTask';
import Messages from '@/pages/Messages';
import Email from '@/pages/Email';
import BillingDashboard from '@/pages/BillingDashboard';
import HRMDashboard from '@/pages/HRMDashboard';
import PharmacyManagement from '@/pages/ehr/PharmacyManagement';
import Reporting from '@/pages/Reporting';
import PowerBIReporting from '@/pages/PowerBIReporting';
import UserManagement from '@/pages/admin/UserManagement';
import TeamManagement from '@/pages/admin/TeamManagement';
import DoctorManagement from '@/pages/admin/DoctorManagement';
import RolePermissionManager from '@/pages/admin/RolePermissionManager';
import CaseConfig from '@/pages/admin/CaseConfig';
import SLARules from '@/pages/admin/SLARules';
import NotificationTemplates from '@/pages/admin/NotificationTemplates';
import SystemSettings from '@/pages/admin/SystemSettings';
import NotFound from '@/pages/NotFound';
import { AppLayout } from '@/components/layout/AppLayout';
import { UserProvider } from '@/contexts/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster"
import { RoleGuard } from '@/components/auth/RoleGuard';
import ScheduleManagement from "@/pages/ScheduleManagement";
import FrontDeskDashboard from '@/components/dashboard/FrontDeskDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={
                <AppLayout>
                  <Dashboard />
                </AppLayout>
              } />
              <Route path="/patients" element={
                <AppLayout>
                  <PatientManagement />
                </AppLayout>
              } />
              <Route path="/patients/:id" element={
                <AppLayout>
                  <PatientProfile />
                </AppLayout>
              } />
              <Route path="/cases" element={
                <AppLayout>
                  <CaseManagement />
                </AppLayout>
              } />
              <Route path="/cases/:id" element={
                <AppLayout>
                  <CaseDetail />
                </AppLayout>
              } />
              <Route path="/tasks" element={
                <AppLayout>
                  <TaskManagement />
                </AppLayout>
              } />
              <Route path="/tasks/create" element={
                <AppLayout>
                  <CreateTask />
                </AppLayout>
              } />
              <Route path="/tasks/:id" element={
                <AppLayout>
                  <ViewTask />
                </AppLayout>
              } />
              <Route path="/tasks/:id/edit" element={
                <AppLayout>
                  <EditTask />
                </AppLayout>
              } />
              <Route path="/schedule" element={
                <AppLayout>
                  <ScheduleManagement />
                </AppLayout>
              } />
              <Route path="/messages" element={
                <AppLayout>
                  <Messages />
                </AppLayout>
              } />
              <Route path="/email" element={
                <AppLayout>
                  <Email />
                </AppLayout>
              } />
              <Route path="/billing" element={
                <AppLayout>
                  <BillingDashboard />
                </AppLayout>
              } />
              <Route path="/hrm" element={
                <AppLayout>
                  <HRMDashboard />
                </AppLayout>
              } />
              <Route path="/pharmacy" element={
                <AppLayout>
                  <PharmacyManagement />
                </AppLayout>
              } />
              <Route path="/reporting" element={
                <AppLayout>
                  <Reporting />
                </AppLayout>
              } />
              <Route path="/powerbi" element={
                <AppLayout>
                  <PowerBIReporting />
                </AppLayout>
              } />
              <Route path="/frontdesk" element={
                <AppLayout>
                  <FrontDeskDashboard />
                </AppLayout>
              } />

              {/* Admin Routes */}
              <Route path="/admin/users" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <UserManagement />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/teams" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <TeamManagement />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/doctors" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <DoctorManagement />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/permissions" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <RolePermissionManager />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/case-config" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <CaseConfig />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/sla-rules" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <SLARules />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/notifications" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <NotificationTemplates />
                  </RoleGuard>
                </AppLayout>
              } />
              <Route path="/admin/settings" element={
                <AppLayout>
                  <RoleGuard allowedRoles={["admin"]}>
                    <SystemSettings />
                  </RoleGuard>
                </AppLayout>
              } />

              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </QueryClientProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
