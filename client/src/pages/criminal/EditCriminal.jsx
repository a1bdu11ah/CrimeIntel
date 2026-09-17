import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, UserX, Loader } from "lucide-react";
import { getCriminalById, updateCriminal } from "../../services/api";

const genders = ["Male", "Female", "Other"];
const crimeTypes = ["Theft", "Assault", "Robbery", "Fraud", "Vandalism", "Cybercrime", "Murder", "Kidnapping", "Drug Trafficking", "Other"];

const EditCriminal = () => {
  const { id } = useParams();       // MongoDB _id from the URL
  const navigate = useNavigate();

  const [form, setForm]           = useState(null);   // null until data is loaded
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [saveError, setSaveError]   = useState("");

  // ── On mount: fetch the criminal from backend ─────────────
  useEffect(() => {
    const loadCriminal = async () => {
      try {
        setLoading(true);
        const response = await getCriminalById(id);  // GET /api/criminal/:id
        const data = response.data;

        // Map backend field names → form field names
        setForm({
          name:       data.name       || "",
          age:        data.age        || "",
          gender:     data.gender     || "",
          address:    data.address    || "",
          crimeType:  data.crimeType  || "",
          arrestDate: data.arrestDate ? data.arrestDate.split("T")[0] : "",  // trim time part
        });
      } catch (err) {
        setFetchError("Could not load criminal details. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCriminal();
  }, [id]);

  // ── Submit handler: PUT to backend ───────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    try {
      setSaving(true);
      await updateCriminal(id, form);        // PUT /api/criminal/:id
      setSaved(true);
      setTimeout(() => navigate("/criminal/view"), 1500);
    } catch (err) {
      setSaveError(
        err.response?.data?.message || "Failed to update criminal record. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  // ── Loading state ─────────────────────────────────────
  if (loading) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card flex items-center justify-center py-16">
          <Loader size={24} className="animate-spin text-slate-500" />
        </div>
      </div>
    );
  }

  // ── Fetch error state ─────────────────────────────────
  if (fetchError) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card text-center py-12">
          <p className="text-red-700 text-sm">{fetchError}</p>
          <button className="btn-secondary mt-4 mx-auto" onClick={() => navigate("/criminal/view")}>
            <X size={14} /> Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-5">

      {/* Success banner */}
      {saved && (
        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">✓</span>
          </div>
          <p className="text-emerald-700 text-sm font-medium">Criminal record updated successfully! Redirecting...</p>
        </div>
      )}

      {/* Save error banner */}
      {saveError && (
        <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/30 rounded-xl px-5 py-3.5">
          <span className="text-red-700 text-sm">{saveError}</span>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <UserX size={17} className="text-amber-700" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-navy-900">Edit Criminal Record</h2>
            <p className="text-slate-500 text-xs font-mono">{form.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Full Name</label>
              <input className="form-input" value={form.name} onChange={set("name")} />
            </div>
            <div>
              <label className="form-label">Age</label>
              <input type="number" min="1" max="120" className="form-input" value={form.age} onChange={set("age")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Gender</label>
              <select className="form-input" value={form.gender} onChange={set("gender")}>
                {genders.map((g) => <option key={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Crime Type</label>
              <select className="form-input" value={form.crimeType} onChange={set("crimeType")}>
                {crimeTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Address</label>
            <input className="form-input" value={form.address} onChange={set("address")} />
          </div>

          <div>
            <label className="form-label">Arrest Date</label>
            <input type="date" className="form-input" value={form.arrestDate} onChange={set("arrestDate")} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
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

export default EditCriminal;