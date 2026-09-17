import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell, ChevronDown, LogOut, Search, Shield, UserCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const routeTitles = {
  "/dashboard": "Dashboard Overview",
  "/fir/view": "FIR Management",
  "/fir/add": "Register New FIR",
  "/fir/edit": "Edit FIR",
  "/criminal/view": "Criminal Records",
  "/criminal/add": "Add Criminal",
  "/case/view": "Case Management",
  "/case/progress": "Case Progress",
  "/case/update": "Update Case",
  "/evidence/view": "Evidence Management",
  "/evidence/add": "Add Evidence",
  "/personnel/view": "Personnel Directory",
  "/personnel/add": "Add Personnel",
};

const Navbar = () => {
  const [dropOpen, setDropOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const title = routeTitles[location.pathname] || "Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="flex min-w-0 items-center gap-3">
        <div className="hidden h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 sm:flex">
          <Shield size={15} className="text-blue-600" />
        </div>
        <div className="min-w-0">
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block">CrimeIntel</p>
          <h1 className="truncate font-heading text-lg font-semibold tracking-wide text-navy-900 sm:text-xl">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="topbar-action hidden md:flex" title="Search records">
          <Search size={16} />
        </button>
        <button className="topbar-action relative" title="Notifications">
          <Bell size={17} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-blue-600 ring-2 ring-white" />
        </button>

        <div className="relative">
          <button onClick={() => setDropOpen(!dropOpen)} className="profile-trigger">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/15">
              <UserCircle size={15} className="text-blue-600" />
            </div>
            <div className="hidden text-left sm:block">
              <span className="block max-w-24 truncate text-xs font-semibold text-navy-900">{user?.name?.split(" ")[0] || "Officer"}</span>
              <span className="block text-[10px] text-slate-500">{user?.role || "Authorized user"}</span>
            </div>
            <ChevronDown size={12} className={`text-slate-500 transition-transform ${dropOpen ? "rotate-180" : ""}`} />
          </button>

          {dropOpen && (
            <div className="profile-menu">
              <div className="border-b border-slate-200 px-4 py-3">
                <p className="text-sm font-semibold text-navy-900">{user?.name || "Authorized Officer"}</p>
                <p className="mt-0.5 text-xs text-slate-500">{user?.email}</p>
                <span className="mt-2 inline-flex rounded-full border border-blue-600/20 bg-blue-600/10 px-2 py-0.5 text-[10px] font-semibold text-blue-600">
                  {user?.role || "Officer"}
                </span>
              </div>
              <button onClick={handleLogout} className="menu-logout">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
