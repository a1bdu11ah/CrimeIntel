import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, Users, Loader } from "lucide-react";
import { getPersonnelById, updatePersonnel } from "../../services/api";

const ranks = ["DGP", "IGP", "DIG", "SSP", "SP", "DSP", "Inspector", "Sub Inspector", "Asst. Sub Inspector", "Head Constable", "Constable"];
const departments = ["Central Police Station", "North Division", "South Division", "East Zone", "West Zone", "Sector 17 Station", "Sector 26 Station", "Cyber Cell", "Crime Branch"];

const EditPersonnel = () => {
  const { id } = useParams();       // MongoDB _id from the URL
  const navigate = useNavigate();

  const [form, setForm]           = useState(null);   // null until data is loaded
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [saveError, setSaveError]   = useState("");

  // ── On mount: fetch the personnel from backend ─────────────
  useEffect(() => {
    const loadPersonnel = async () => {
      try {
        setLoading(true);
        const response = await getPersonnelById(id);  // GET /api/personnel/:id
        const data = response.data;

        // Map backend field names → form field names
        setForm({
          name:          data.name          || "",
          rank:          data.rank          || "",
          department:    data.department    || "",
          contactNumber: data.contactNumber || "",
        });
      } catch (err) {
        setFetchError("Could not load personnel details. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadPersonnel();
  }, [id]);

  // ── Submit handler: PUT to backend ───────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    try {
      setSaving(true);
      await updatePersonnel(id, form);        // PUT /api/personnel/:id
      setSaved(true);
      setTimeout(() => navigate("/personnel/view"), 1500);
    } catch (err) {
      setSaveError(
        err.response?.data?.message || "Failed to update personnel. Please try again."
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
          <button className="btn-secondary mt-4 mx-auto" onClick={() => navigate("/personnel/view")}>
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
          <p className="text-emerald-700 text-sm font-medium">Personnel updated successfully! Redirecting...</p>
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
          <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Users size={17} className="text-purple-700" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-navy-900">Edit Personnel</h2>
            <p className="text-slate-500 text-xs font-mono">{form.name}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="form-label">Full Name</label>
            <input className="form-input" value={form.name} onChange={set("name")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Rank</label>
              <select className="form-input" value={form.rank} onChange={set("rank")}>
                {ranks.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Department</label>
              <select className="form-input" value={form.department} onChange={set("department")}>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="form-label">Contact Number</label>
            <input className="form-input" value={form.contactNumber} onChange={set("contactNumber")} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
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

export default EditPersonnel;