import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Badge,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Package,
  Shield,
  TrendingUp,
  UserX,
  Users,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/fir/view", icon: FileText, label: "FIR Management" },
  { to: "/criminal/view", icon: UserX, label: "Criminal Records" },
  { to: "/case/view", icon: TrendingUp, label: "Case Management" },
  { to: "/evidence/view", icon: Package, label: "Evidence" },
  { to: "/personnel/view", icon: Users, label: "Personnel" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className={`sidebar-shell ${collapsed ? "w-[76px]" : "w-64"}`}>
      <div className="sidebar-brand">
        <div className="brand-mark"><Shield size={19} /></div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="font-heading text-xl font-bold leading-none tracking-[0.08em] text-white">CRIMEINTEL</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-steel-400">Secure records portal</p>
          </div>
        )}
      </div>

      <button onClick={() => setCollapsed(!collapsed)} className="sidebar-toggle" aria-label="Toggle sidebar">
        {collapsed ? <ChevronRight size={13} /> : <ChevronLeft size={13} />}
      </button>

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        {!collapsed && <p className="nav-label">Workspace</p>}
        <div className="space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              title={collapsed ? label : ""}
              className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""} ${collapsed ? "justify-center px-2" : ""}`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        {!collapsed ? (
          <div className="flex items-center gap-2.5">
            <div className="officer-avatar"><Badge size={14} /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">{user?.name || "Authorized Officer"}</p>
              <p className="mt-0.5 truncate text-[10px] text-steel-400">{user?.badge || "Secure session"}</p>
            </div>
            <button onClick={handleLogout} title="Logout" className="sidebar-logout"><LogOut size={15} /></button>
          </div>
        ) : (
          <button onClick={handleLogout} title="Logout" className="sidebar-logout mx-auto"><LogOut size={17} /></button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
