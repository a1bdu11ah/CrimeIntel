import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";

// Auth
import Login from "../pages/auth/Login";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// FIR
import AddFIR from "../pages/fir/AddFIR";
import ViewFIR from "../pages/fir/ViewFIR";
import EditFIR from "../pages/fir/EditFIR";

// Criminal
import AddCriminal from "../pages/criminal/AddCriminal";
import ViewCriminal from "../pages/criminal/ViewCriminal";
import EditCriminal from "../pages/criminal/EditCriminal";

// Case
import AddCase from "../pages/case/AddCase";
import ViewCase from "../pages/case/ViewCase";
import EditCase from "../pages/case/EditCase";

// Evidence
import AddEvidence from "../pages/evidence/AddEvidence";
import ViewEvidence from "../pages/evidence/ViewEvidence";
import EditEvidence from "../pages/evidence/EditEvidence";

// Personnel
import AddPersonnel from "../pages/personnel/AddPersonnel";
import ViewPersonnel from "../pages/personnel/ViewPersonnel";
import EditPersonnel from "../pages/personnel/EditPersonnel";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected — all inside DashboardLayout */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="fir/add" element={<AddFIR />} />
        <Route path="fir/view" element={<ViewFIR />} />
        <Route path="fir/edit/:id" element={<EditFIR />} />

        <Route path="criminal/add" element={<AddCriminal />} />
        <Route path="criminal/view" element={<ViewCriminal />} />
        <Route path="criminal/edit/:id" element={<EditCriminal />} />

        <Route path="case/add" element={<AddCase />} />
        <Route path="case/view" element={<ViewCase />} />
        <Route path="case/edit/:id" element={<EditCase />} />

        <Route path="evidence/add" element={<AddEvidence />} />
        <Route path="evidence/view" element={<ViewEvidence />} />
        <Route path="evidence/edit/:id" element={<EditEvidence />} />

        <Route path="personnel/add" element={<AddPersonnel />} />
        <Route path="personnel/view" element={<ViewPersonnel />} />
        <Route path="personnel/edit/:id" element={<EditPersonnel />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
