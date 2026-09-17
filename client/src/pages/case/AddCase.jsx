import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Save, X } from "lucide-react";
import { createCase } from "../../services/api";

const caseTypes = ["Criminal", "Civil", "Traffic", "Cyber", "Domestic", "Property", "Other"];
const statuses = ["Open", "Under Investigation", "Pending", "Closed"];

const AddCase = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    caseNumber: `CASE-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
    caseType: "",
    status: "Open",
    assignedOfficer: "",
    courtDate: "",
  });

  const [errors, setErrors]     = useState({});
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  // Validate required fields
  const validate = () => {
    const e = {};
    if (!form.caseType) e.caseType = "Case type is required";
    if (!form.status) e.status = "Status is required";
    if (!form.assignedOfficer) e.assignedOfficer = "Assigned officer is required";
    if (!form.courtDate) e.courtDate = "Court date is required";
    return e;
  };

  // Submit handler — POST to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setLoading(true);
      await createCase(form);           // POST /api/case
      setSaved(true);
      setTimeout(() => navigate("/case/view"), 1500);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to add case. Is the server running?"
      );
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">✓</span>
          </div>
          <p className="text-emerald-700 text-sm font-medium">Case added successfully! Redirecting...</p>
        </div>
      )}

      {/* API error banner */}
      {apiError && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3.5">
          <span className="text-red-700 text-sm">{apiError}</span>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <FileText size={17} className="text-blue-700" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-navy-900">Add Case</h2>
            <p className="text-slate-500 text-xs">Register a new case</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Case Number</label>
              <input className="form-input bg-slate-50 cursor-not-allowed opacity-70" value={form.caseNumber} readOnly />
            </div>
            <div>
              <label className="form-label">Case Type</label>
              <select className="form-input" value={form.caseType} onChange={set("caseType")}>
                <option value="">Select Type...</option>
                {caseTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.caseType && <p className="text-red-700 text-xs mt-1">{errors.caseType}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status} onChange={set("status")}>
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
              {errors.status && <p className="text-red-700 text-xs mt-1">{errors.status}</p>}
            </div>
            <div>
              <label className="form-label">Court Date</label>
              <input type="date" className="form-input" value={form.courtDate} onChange={set("courtDate")} />
              {errors.courtDate && <p className="text-red-700 text-xs mt-1">{errors.courtDate}</p>}
            </div>
          </div>

          <div>
            <label className="form-label">Assigned Officer</label>
            <input className="form-input" placeholder="Officer name" value={form.assignedOfficer} onChange={set("assignedOfficer")} />
            {errors.assignedOfficer && <p className="text-red-700 text-xs mt-1">{errors.assignedOfficer}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={15} />
              {loading ? "Saving..." : "Add Case"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/case/view")}>
              <X size={15} /> Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCase;