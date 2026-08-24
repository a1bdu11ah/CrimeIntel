import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserX, Save, X } from "lucide-react";
import { createCriminal } from "../../services/api";

const genders = ["Male", "Female", "Other"];
const crimeTypes = ["Theft", "Assault", "Robbery", "Fraud", "Vandalism", "Cybercrime", "Murder", "Kidnapping", "Drug Trafficking", "Other"];

const AddCriminal = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    crimeType: "",
    arrestDate: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors]     = useState({});
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  // Validate required fields
  const validate = () => {
    const e = {};
    if (!form.name)     e.name     = "Name is required";
    if (!form.age || isNaN(form.age) || form.age < 1) e.age = "Valid age is required";
    if (!form.gender)   e.gender   = "Gender is required";
    if (!form.address)  e.address  = "Address is required";
    if (!form.crimeType) e.crimeType = "Crime type is required";
    if (!form.arrestDate) e.arrestDate = "Arrest date is required";
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
      await createCriminal(form);           // POST /api/criminal
      setSaved(true);
      setTimeout(() => navigate("/criminal/view"), 1500);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to add criminal record. Is the server running?"
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
          <p className="text-emerald-400 text-sm font-medium">Criminal record added successfully! Redirecting...</p>
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
          <div className="w-9 h-9 bg-crimson-500/20 rounded-lg flex items-center justify-center">
            <UserX size={17} className="text-crimson-400" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-white">Add Criminal Record</h2>
            <p className="text-steel-400 text-xs">Register a new criminal profile</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name</label>
              <input className="form-input" placeholder="Criminal's full name" value={form.name} onChange={set("name")} />
              {errors.name && <p className="text-crimson-400 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label className="form-label">Age</label>
              <input type="number" min="1" max="120" className="form-input" placeholder="Age" value={form.age} onChange={set("age")} />
              {errors.age && <p className="text-crimson-400 text-xs mt-1">{errors.age}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Gender</label>
              <select className="form-input" value={form.gender} onChange={set("gender")}>
                <option value="">Select Gender...</option>
                {genders.map((g) => <option key={g}>{g}</option>)}
              </select>
              {errors.gender && <p className="text-crimson-400 text-xs mt-1">{errors.gender}</p>}
            </div>
            <div>
              <label className="form-label">Crime Type</label>
              <select className="form-input" value={form.crimeType} onChange={set("crimeType")}>
                <option value="">Select Type...</option>
                {crimeTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
              {errors.crimeType && <p className="text-crimson-400 text-xs mt-1">{errors.crimeType}</p>}
            </div>
          </div>

          <div>
            <label className="form-label">Address</label>
            <input className="form-input" placeholder="Complete address" value={form.address} onChange={set("address")} />
            {errors.address && <p className="text-crimson-400 text-xs mt-1">{errors.address}</p>}
          </div>

          <div>
            <label className="form-label">Arrest Date</label>
            <input type="date" className="form-input" value={form.arrestDate} onChange={set("arrestDate")} />
            {errors.arrestDate && <p className="text-crimson-400 text-xs mt-1">{errors.arrestDate}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={15} />
              {loading ? "Saving..." : "Add Criminal"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/criminal/view")}>
              <X size={15} /> Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddCriminal;
