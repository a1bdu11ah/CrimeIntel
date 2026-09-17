import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Save, X } from "lucide-react";
import { createEvidence } from "../../services/api";

const evidenceTypes = ["Physical", "Digital", "Forensic", "Documentary", "Testimonial", "Biological", "Other"];

const AddEvidence = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    evidenceName: "",
    evidenceType: "",
    collectedDate: new Date().toISOString().split("T")[0],
    caseNumber: "",
  });

  const [errors, setErrors]     = useState({});
  const [saved, setSaved]       = useState(false);
  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  // Validate required fields
  const validate = () => {
    const e = {};
    if (!form.evidenceName) e.evidenceName = "Evidence name is required";
    if (!form.evidenceType) e.evidenceType = "Evidence type is required";
    if (!form.collectedDate) e.collectedDate = "Collected date is required";
    if (!form.caseNumber) e.caseNumber = "Case number is required";
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
      await createEvidence(form);           // POST /api/evidence
      setSaved(true);
      setTimeout(() => navigate("/evidence/view"), 1500);
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Failed to add evidence. Is the server running?"
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
          <p className="text-emerald-700 text-sm font-medium">Evidence added successfully! Redirecting...</p>
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
          <div className="w-9 h-9 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <Package size={17} className="text-purple-700" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-navy-900">Add Evidence</h2>
            <p className="text-slate-500 text-xs">Record evidence for a case</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Evidence Name</label>
              <input className="form-input" placeholder="Name of the evidence" value={form.evidenceName} onChange={set("evidenceName")} />
              {errors.evidenceName && <p className="text-red-700 text-xs mt-1">{errors.evidenceName}</p>}
            </div>
            <div>
              <label className="form-label">Evidence Type</label>
              <select className="form-input" value={form.evidenceType} onChange={set("evidenceType")}>
                <option value="">Select Type...</option>
                {evidenceTypes.map((t) => <option key={t}>{t}</option>)}
              </select>
              {errors.evidenceType && <p className="text-red-700 text-xs mt-1">{errors.evidenceType}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Collected Date</label>
              <input type="date" className="form-input" value={form.collectedDate} onChange={set("collectedDate")} />
              {errors.collectedDate && <p className="text-red-700 text-xs mt-1">{errors.collectedDate}</p>}
            </div>
            <div>
              <label className="form-label">Case Number</label>
              <input className="form-input" placeholder="Associated case number" value={form.caseNumber} onChange={set("caseNumber")} />
              {errors.caseNumber && <p className="text-red-700 text-xs mt-1">{errors.caseNumber}</p>}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={loading}>
              <Save size={15} />
              {loading ? "Saving..." : "Add Evidence"}
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

export default AddEvidence;
