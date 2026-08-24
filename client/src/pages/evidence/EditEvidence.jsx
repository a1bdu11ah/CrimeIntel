import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, Package, Loader } from "lucide-react";
import { getEvidenceById, updateEvidence } from "../../services/api";

const evidenceTypes = ["Physical", "Digital", "Forensic", "Documentary", "Testimonial", "Biological", "Other"];

const EditEvidence = () => {
  const { id } = useParams();       // MongoDB _id from the URL
  const navigate = useNavigate();

  const [form, setForm]           = useState(null);   // null until data is loaded
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [saveError, setSaveError]   = useState("");

  // ── On mount: fetch the evidence from backend ─────────────
  useEffect(() => {
    const loadEvidence = async () => {
      try {
        setLoading(true);
        const response = await getEvidenceById(id);  // GET /api/evidence/:id
        const data = response.data;

        // Map backend field names → form field names
        setForm({
          evidenceName:  data.evidenceName  || "",
          evidenceType:  data.evidenceType  || "",
          collectedDate: data.collectedDate ? data.collectedDate.split("T")[0] : "",  // trim time part
          caseNumber:    data.caseNumber    || "",
        });
      } catch (err) {
        setFetchError("Could not load evidence details. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadEvidence();
  }, [id]);

  // ── Submit handler: PUT to backend ───────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    try {
      setSaving(true);
      await updateEvidence(id, form);        // PUT /api/evidence/:id
      setSaved(true);
      setTimeout(() => navigate("/evidence/view"), 1500);
    } catch (err) {
      setSaveError(
        err.response?.data?.message || "Failed to update evidence. Please try again."
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
          <Loader size={24} className="animate-spin text-steel-400" />
        </div>
      </div>
    );
  }

  // ── Fetch error state ─────────────────────────────────
  if (fetchError) {
    return (
      <div className="max-w-3xl mx-auto">
        <div className="card text-center py-12">
          <p className="text-red-400 text-sm">{fetchError}</p>
          <button className="btn-secondary mt-4 mx-auto" onClick={() => navigate("/evidence/view")}>
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
          <p className="text-emerald-400 text-sm font-medium">Evidence updated successfully! Redirecting...</p>
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
          <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <Package size={17} className="text-amber-400" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-white">Edit Evidence</h2>
            <p className="text-steel-400 text-xs font-mono">{form.evidenceName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Evidence Name</label>
              <input className="form-input" value={form.evidenceName} onChange={set("evidenceName")} />
            </div>
            <div>
              <label className="form-label">Evidence Type</label>
              <select className="form-input" value={form.evidenceType} onChange={set("evidenceType")}>
                {evidenceTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Collected Date</label>
              <input type="date" className="form-input" value={form.collectedDate} onChange={set("collectedDate")} />
            </div>
            <div>
              <label className="form-label">Case Number</label>
              <input className="form-input" value={form.caseNumber} onChange={set("caseNumber")} />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/evidence/view")}>
              <X size={15} /> Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditEvidence;