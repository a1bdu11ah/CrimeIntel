import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Save, X, Loader } from "lucide-react";
import { createPersonnel } from "../../services/api";

const ranks = ["DGP", "IGP", "DIG", "SSP", "SP", "DSP", "Inspector", "Sub Inspector", "Asst. Sub Inspector", "Head Constable", "Constable"];
const departments = ["Central Police Station", "North Division", "South Division", "East Zone", "West Zone", "Sector 17 Station", "Sector 26 Station", "Cyber Cell", "Crime Branch"];

const AddPersonnel = () => {
  const navigate = useNavigate();

  const [form, setForm]           = useState({
    name: "",
    rank: "",
    department: "",
    contactNumber: "",
  });
  const [errors, setErrors]       = useState({});
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [saveError, setSaveError] = useState("");

  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Name is required";
    if (!form.rank) e.rank = "Rank is required";
    if (!form.department) e.department = "Department is required";
    if (!form.contactNumber) e.contactNumber = "Contact number is required";
    if (form.contactNumber && !/^\+?[\d\s\-]{10,14}$/.test(form.contactNumber)) e.contactNumber = "Enter a valid contact number";
    return e;
  };

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    try {
      setSaving(true);
      setSaveError("");
      await createPersonnel(form);        // POST /api/personnel
      setSaved(true);
      setTimeout(() => navigate("/personnel/view"), 1500);
    } catch (err) {
      setSaveError(
        err.response?.data?.message || "Failed to add personnel. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">✓</span>
          </div>
          <p className="text-emerald-400 text-sm font-medium">Personnel record added successfully! Redirecting...</p>
        </div>
      )}

      {/* Save error banner */}
      {saveError && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3.5">
          <span className="text-red-400 text-sm">{saveError}</span>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy-800">
          <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Users size={17} className="text-purple-400" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-white">Add Personnel</h2>
            <p className="text-steel-400 text-xs">Register a new officer or staff member</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="form-label">Full Name</label>
            <input className="form-input" placeholder="Officer's full name" value={form.name} onChange={set("name")} />
            {errors.name && <p className="text-crimson-400 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Rank</label>
              <select className="form-input" value={form.rank} onChange={set("rank")}>
                <option value="">Select Rank...</option>
                {ranks.map((r) => <option key={r}>{r}</option>)}
              </select>
              {errors.rank && <p className="text-crimson-400 text-xs mt-1">{errors.rank}</p>}
            </div>
            <div>
              <label className="form-label">Department</label>
              <select className="form-input" value={form.department} onChange={set("department")}>
                <option value="">Select Department...</option>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
              {errors.department && <p className="text-crimson-400 text-xs mt-1">{errors.department}</p>}
            </div>
          </div>

          <div>
            <label className="form-label">Contact Number</label>
            <input className="form-input" placeholder="+91-XXXXX-XXXXX" value={form.contactNumber} onChange={set("contactNumber")} />
            {errors.contactNumber && <p className="text-crimson-400 text-xs mt-1">{errors.contactNumber}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Add Personnel"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/personnel/view")}>
              <X size={15} /> Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddPersonnel;

