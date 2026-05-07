import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Admin
import Dashboard from './pages/Dashboard';
import PrivateAdminRoute from './components/PrivateAdminRoute';
import PrivateStudentRoute from './components/PrivateStudentRoute';
import Layout from './components/Layout/Layout';
import AdminBooks from './pages/admin/AdminBooks';
import AdminCategories from './pages/admin/AdminCategories';

// Student
import StudentRegister from './pages/students/Register.jsx';
import StudentBooks from './pages/Books';

// Public
import Home from './pages/Home';
import UnifiedLogin from './pages/UnifiedLogin';
import PublicBooks from './pages/PublicBooks';
import PublicCategories from './pages/PublicCategories';
import BooksByCategory from './pages/BooksByCategory';
import BookDetails from './pages/BookDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Public ───────────────────────────────────────── */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UnifiedLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/books" element={<PublicBooks />} />
        <Route path="/categories" element={<PublicCategories />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/categories/:id" element={<BooksByCategory />} />

        {/* ── Student (protected) ──────────────────────────── */}
        <Route path="/student/books" element={
          <PrivateStudentRoute>
            <StudentBooks />
          </PrivateStudentRoute>
        } />

        {/* ── Admin (protected) ────────────────────────────── */}
        <Route path="/admin" element={
          <PrivateAdminRoute>
            <Layout />
          </PrivateAdminRoute>
        }>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="books" element={<AdminBooks />} />
          <Route path="categories" element={<AdminCategories />} />
        </Route>

        {/* ── Fallback ─────────────────────────────────────── */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;