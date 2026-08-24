import {
  Activity,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  FileCheck,
  FileText,
  Package,
  ShieldCheck,
  TrendingUp,
  UserX,
  Users,
} from "lucide-react";
import { dashboardStats } from "../../data/mockData";
import { useNavigate } from "react-router-dom";

const StatCard = ({ label, value, icon: Icon, accent, change, helper, to }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="card stat-card group w-full text-left"
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`stat-icon ${accent}`}>
          <Icon size={19} />
        </div>
        <ArrowUpRight
          size={16}
          className="text-steel-400/70 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
        />
      </div>

      <div className="mt-6">
        <p className="font-heading text-4xl font-bold leading-none text-white">
          {value.toLocaleString()}
        </p>
        <p className="mt-2 text-sm font-medium text-steel-300">{label}</p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/5 pt-4 text-xs">
        <span className="text-steel-400">{helper}</span>
        {change && <span className="font-semibold text-emerald-400">+{change}%</span>}
      </div>
    </button>
  );
};

const activityIcons = {
  fir: <FileText size={14} className="text-sky-300" />,
  arrest: <UserX size={14} className="text-rose-300" />,
  evidence: <Package size={14} className="text-amber-300" />,
  closed: <FileCheck size={14} className="text-emerald-300" />,
  personnel: <Users size={14} className="text-violet-300" />,
};

const distribution = [
  { label: "Theft", count: 68, pct: 75 },
  { label: "Assault", count: 42, pct: 50 },
  { label: "Fraud", count: 35, pct: 38 },
  { label: "Robbery", count: 28, pct: 30 },
  { label: "Cybercrime", count: 19, pct: 20 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { totalFIRs, totalCriminals, activeCases, personnelCount, recentActivity } = dashboardStats;

  return (
    <div className="space-y-6">
      <section className="command-hero">
        <div className="relative z-10 max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="eyebrow-badge">
              <Activity size={13} /> Live operations overview
            </span>
            <span className="system-status"><span /> System operational</span>
          </div>
          <h2 className="font-heading text-3xl font-bold tracking-wide text-white sm:text-4xl">
            Crime Intelligence Command Center
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-steel-300 sm:text-base">
            Monitor active investigations, FIR activity, evidence records, and personnel from one secure workspace.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" onClick={() => navigate("/fir/add")}>
              <FileText size={16} /> Register FIR
            </button>
            <button className="btn-secondary" onClick={() => navigate("/case/view")}>
              View active cases <ArrowRight size={15} />
            </button>
          </div>
        </div>
        <div className="hero-watermark" aria-hidden="true">
          <ShieldCheck size={210} strokeWidth={1} />
        </div>
      </section>

      <div className="attention-banner">
        <div className="flex min-w-0 items-center gap-3">
          <div className="attention-icon"><AlertTriangle size={16} /></div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white">3 cases require immediate attention</p>
            <p className="text-xs text-steel-400">Review pending FIRs and investigation updates before end of day.</p>
          </div>
        </div>
        <button onClick={() => navigate("/case/progress")} className="hidden text-xs font-semibold text-amber-300 hover:text-amber-200 sm:block">
          Review cases →
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total FIRs" value={totalFIRs} icon={FileText} accent="stat-blue" change="12" helper="All registered records" to="/fir/view" />
        <StatCard label="Criminal Records" value={totalCriminals} icon={UserX} accent="stat-red" change="4" helper="Profiles in database" to="/criminal/view" />
        <StatCard label="Active Cases" value={activeCases} icon={TrendingUp} accent="stat-amber" helper="Currently in progress" to="/case/progress" />
        <StatCard label="Personnel" value={personnelCount} icon={Users} accent="stat-violet" change="2" helper="Registered officers" to="/personnel/view" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <section className="card xl:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="section-kicker">Operations feed</p>
              <h3 className="mt-1 font-heading text-xl font-semibold text-white">Recent Activity</h3>
            </div>
            <span className="soft-chip">Last 7 days</span>
          </div>

          <div className="divide-y divide-white/5">
            {recentActivity.map((item) => (
              <div key={item.id} className="activity-row">
                <div className="activity-icon">{activityIcons[item.type]}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">{item.action}</p>
                  <p className="mt-1 truncate text-xs text-steel-400">{item.detail}</p>
                </div>
                <span className="hidden flex-shrink-0 text-[11px] text-steel-400/70 sm:block">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="mb-5">
            <p className="section-kicker">Case analytics</p>
            <h3 className="mt-1 font-heading text-xl font-semibold text-white">Case Distribution</h3>
          </div>
          <div className="space-y-4">
            {distribution.map(({ label, count, pct }) => (
              <div key={label}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span className="font-medium text-steel-300">{label}</span>
                  <span className="font-mono text-steel-400">{count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-navy-800">
                  <div className="distribution-bar h-full rounded-full" style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
