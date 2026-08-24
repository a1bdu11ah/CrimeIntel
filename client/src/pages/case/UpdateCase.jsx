import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Save, X } from "lucide-react";
import { mockFIRs } from "../../data/mockData";

const caseStatuses = [
  "FIR Registered",
  "Investigation Started",
  "Suspect Identified",
  "Arrest Made",
  "Chargesheet Filed",
  "Trial in Progress",
  "Case Closed",
];

const UpdateCase = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firId: "", status: "", remarks: "", officer: "" });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.firId) e.firId = "FIR ID is required";
    if (!form.status) e.status = "Status is required";
    if (!form.remarks) e.remarks = "Remarks are required";
    if (!form.officer) e.officer = "Officer name is required";
    return e;
  };

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => navigate("/case/progress"), 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-5">
      {saved && (
        <div className="flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3.5">
          <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white">✓</div>
          <p className="text-emerald-400 text-sm font-medium">Case status updated successfully!</p>
        </div>
      )}

      <div className="card">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-navy-800">
          <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp size={17} className="text-amber-400" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-xl text-white">Update Case Status</h2>
            <p className="text-steel-400 text-xs">Add progress update to an existing case</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="form-label">FIR ID</label>
            <select className="form-input" value={form.firId} onChange={set("firId")}>
              <option value="">Select FIR...</option>
              {mockFIRs.map((f) => (
                <option key={f.id} value={f.firNumber}>
                  {f.firNumber} — {f.crimeType} ({f.complainant})
                </option>
              ))}
            </select>
            {errors.firId && <p className="text-crimson-400 text-xs mt-1">{errors.firId}</p>}
          </div>

          <div>
            <label className="form-label">New Status</label>
            <select className="form-input" value={form.status} onChange={set("status")}>
              <option value="">Select Status...</option>
              {caseStatuses.map((s) => <option key={s}>{s}</option>)}
            </select>
            {errors.status && <p className="text-crimson-400 text-xs mt-1">{errors.status}</p>}
          </div>

          <div>
            <label className="form-label">Investigating Officer</label>
            <input className="form-input" placeholder="Officer name and rank" value={form.officer} onChange={set("officer")} />
            {errors.officer && <p className="text-crimson-400 text-xs mt-1">{errors.officer}</p>}
          </div>

          <div>
            <label className="form-label">Remarks / Notes</label>
            <textarea
              className="form-input min-h-[120px] resize-none"
              placeholder="Describe the progress update in detail..."
              value={form.remarks}
              onChange={set("remarks")}
            />
            {errors.remarks && <p className="text-crimson-400 text-xs mt-1">{errors.remarks}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary"><Save size={15} /> Update Case</button>
            <button type="button" className="btn-secondary" onClick={() => navigate("/case/progress")}><X size={15} /> Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCase;
