import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, FileText, Loader } from "lucide-react";
import { getCaseById, updateCase } from "../../services/api";

const caseTypes = ["Criminal", "Civil", "Traffic", "Cyber", "Domestic", "Property", "Other"];
const statuses = ["Open", "Under Investigation", "Pending", "Closed"];

const EditCase = () => {
  const { id } = useParams();       // MongoDB _id from the URL
  const navigate = useNavigate();

  const [form, setForm]           = useState(null);   // null until data is loaded
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [saveError, setSaveError]   = useState("");

  // ── On mount: fetch the case from backend ─────────────
  useEffect(() => {
    const loadCase = async () => {
      try {
        setLoading(true);
        const response = await getCaseById(id);  // GET /api/case/:id
        const data = response.data;

        // Map backend field names → form field names
        setForm({
          caseNumber:      data.caseNumber      || "",
          caseType:        data.caseType        || "",
          status:          data.status          || "Open",
          assignedOfficer: data.assignedOfficer || "",
          courtDate:       data.courtDate ? data.courtDate.split("T")[0] : "",  // trim time part
        });
      } catch (err) {
        setFetchError("Could not load case details. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadCase();
  }, [id]);

  // ── Submit handler: PUT to backend ───────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    try {
      setSaving(true);
      await updateCase(id, form);        // PUT /api/case/:id
      setSaved(true);
      setTimeout(() => navigate("/case/view"), 1500);
    } catch (err) {
      setSaveError(
        err.response?.data?.message || "Failed to update case. Please try again."
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
          <button className="btn-secondary mt-4 mx-auto" onClick={() => navigate("/case/view")}>
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
          <p className="text-emerald-700 text-sm font-medium">Case updated successfully! Redirecting...</p>
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
            <FileText size={17} className="text-amber-700" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-navy-900">Edit Case</h2>
            <p className="text-slate-500 text-xs font-mono">{form.caseNumber}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Case Number</label>
              <input
                className="form-input bg-slate-50 opacity-70 cursor-not-allowed"
                value={form.caseNumber}
                readOnly
              />
            </div>
            <div>
              <label className="form-label">Case Type</label>
              <select className="form-input" value={form.caseType} onChange={set("caseType")}>
                {caseTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Status</label>
              <select className="form-input" value={form.status} onChange={set("status")}>
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="form-label">Court Date</label>
              <input type="date" className="form-input" value={form.courtDate} onChange={set("courtDate")} />
            </div>
          </div>

          <div>
            <label className="form-label">Assigned Officer</label>
            <input className="form-input" value={form.assignedOfficer} onChange={set("assignedOfficer")} />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
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

export default EditCase;