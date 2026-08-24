import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Save, X } from "lucide-react";
import { createFIR } from "../../services/api";

const crimeTypes = ["Theft", "Assault", "Robbery", "Fraud", "Vandalism", "Cybercrime", "Murder", "Kidnapping", "Drug Trafficking", "Other"];
const stations = ["Central Police Station", "North Division", "South Division", "East Zone", "West Zone", "Sector 17 Station", "Sector 26 Station"];
const statuses = ["Active", "Under Investigation", "Pending", "Closed"];

const AddFIR = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firNumber: `FIR-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
    date: new Date().toISOString().split("T")[0],
    station: "",
    complainant: "",
    crimeType: "",
    description: "",
    status: "Active",
  });

  const [errors, setErrors]     = useState({});
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  // Validate required fields
  const validate = () => {
    const e = {};
    if (!form.station)     e.station     = "Police station is required";
    if (!form.complainant) e.complainant = "Complainant name is required";
    if (!form.crimeType)   e.crimeType   = "Crime type is required";
    if (!form.description) e.description = "Description is required";
    return e;
  };

  // Submit handler — POST to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Map frontend field names to backend field names
    const payload = {
      firNumber:       form.firNumber,
      date:            form.date,
      policeStation:   form.station,      // station → policeStation
      complainantName: form.complainant,  // complainant → complainantName
      crimeType:       form.crimeType,
      description:     form.description,
      status:          form.status,
    };

    try {
      setLoading(true);
      await createFIR(payload);           // POST /api/fir
      setSaved(true);
      setTimeout(() => navigate("/fir/view"), 1500);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to register FIR. Is the server running?"
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
          <p className="text-emerald-400 text-sm font-medium">FIR registered successfully! Redirecting...</p>
        </div>
      )}

      {/* API error banner */}
      {apiError && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3.5">
          <span className="text-red-400 text-sm">{apiError}</span>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy-800">
          <div className="w-9 h-9 bg-blue-600/20 rounded-lg flex items-center justify-center">
            <FileText size={17} className="text-blue-400" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-white">Register FIR</h2>
            <p className="text-steel-400 text-xs">First Information Report</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">FIR Number</label>
              <input className="form-input bg-navy-950 cursor-not-allowed opacity-70" value={form.firNumber} readOnly />
            </div>
            <div>
              <label className="form-label">Date of Filing</label>
              <input type="date" className="form-input" value={form.date} onChange={set("date")} />
            </div>
          </div>

          <div>
            <label className="form-label">Police Station</label>
            <select className="form-input" value={form.station} onChange={set("station")}>
              <option value="">Select Station...</option>
              {stations.map((s) => <option key={s}>{s}</option>)}
            </select>
            {errors.station && <p className="text-crimson-400 text-xs mt-1">{errors.station}</p>}
          </div>

          <div>
            <label className="form-label">Complainant Name</label>
            <input className="form-input" placeholder="Full name of complainant" value={form.complainant} onChange={set("complainant")} />
            {errors.complainant && <p className="text-crimson-400 text-xs mt-1">{errors.complainant}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Crime Type</label>
              <select className="form-input" value={form.crimeType} onChange={set("crimeType")}>
                <option value="">Select Type...</option>
                {crimeTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.crimeType && <p className="text-crimson-400 text-xs mt-1">{errors.crimeType}</p>}
            </div>
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status} onChange={set("status")}>
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input min-h-[120px] resize-none"
              placeholder="Detailed description of the incident..."
              value={form.description}
              onChange={set("description")}
            />
            {errors.description && <p className="text-crimson-400 text-xs mt-1">{errors.description}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={15} />
              {loading ? "Saving..." : "Register FIR"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/fir/view")}>
              <X size={15} /> Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddFIR;
