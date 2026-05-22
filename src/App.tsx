import { Routes, Route, Navigate } from 'react-router-dom';
import { PrivateRoute } from '@/components/PrivateRoute';
import { RoleRoute } from '@/components/RoleRoute';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { UsersPage } from '@/pages/UsersPage';
import { AuditPage } from '@/pages/AuditPage';
import { SessionsPage } from '@/pages/SessionsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
import { RegisterPage } from '@/pages/RegisterPage';

export default function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} /> 

            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/sessions" element={<SessionsPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route element={<RoleRoute allowedRoles={['administrator', 'god']}/>}>
                    <Route path="/users" element={<UsersPage />} />
                    <Route path="/audit" element={<AuditPage />} />
                </Route>
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}