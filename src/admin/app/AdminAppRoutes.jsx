import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import '../../index.css';

import AdminLayout from '../../layouts/AdminLayout';
import Dashboard from './Dashboard';
import Login from '../features/auth/Login';
import NotFound from './NotFound';

// Dummy Ticket Routes
import DummyTickets from '../features/dummy-tickets/DummyTickets';
import DummyTicketDetail from '../features/dummy-tickets/DummyTicketDetail';
import SendEmail from '../features/dummy-tickets/SendEmail';

// Protection Routes
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

// Users
import Users from '../features/users/Users';
import CreateUser from '../features/users/CreateUser';
import UpdateUser from '../features/users/UpdateUser';
import MyAccount from '../features/account/MyAccount';

// Blog
import Blogs from '../features/blog/Blogs';
import CreateBlogPost from '../features/blog/CreateBlogPost';
import UpdateBlogPost from '../features/blog/UpdateBlogPost';
import InsuranceApplications from '../features/insurance/InsuranceApplications';
import InsuranceApplicationDetail from '../features/insurance/InsuranceApplicationDetail';
import Affiliates from '../features/affiliates/Affiliates';
import CreateAffiliate from '../features/affiliates/CreateAffiliate';
import UpdateAffiliate from '../features/affiliates/UpdateAffiliate';
import { AuthProvider } from '../../context/AuthContext';

export default function AdminAppRoutes() {
  return (
    <BrowserRouter basename="/admin">
      <AuthProvider>
        <Helmet>
          <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        </Helmet>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route element={<AdminRoute />}>
                <Route path="dummy-tickets" element={<DummyTickets />} />
                <Route path="dummy-tickets/:sessionId" element={<DummyTicketDetail />} />
                <Route path="send-email" element={<SendEmail />} />
                <Route path="users" element={<Users />} />
                <Route path="users/create" element={<CreateUser />} />
                <Route path="users/:username" element={<UpdateUser />} />
                <Route path="insurance" element={<InsuranceApplications />} />
                <Route path="insurance/:sessionId" element={<InsuranceApplicationDetail />} />
                <Route path="affiliates" element={<Affiliates />} />
                <Route path="affiliates/create" element={<CreateAffiliate />} />
                <Route path="affiliates/:id" element={<UpdateAffiliate />} />
              </Route>

              <Route path="account" element={<MyAccount />} />
              <Route path="blogs" element={<Blogs />} />
              <Route path="blogs/create" element={<CreateBlogPost />} />
              <Route path="blogs/:id" element={<UpdateBlogPost />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
