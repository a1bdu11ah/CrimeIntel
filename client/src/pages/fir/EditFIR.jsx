import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X, FileText, Loader } from "lucide-react";
import { getFIRById, updateFIR } from "../../services/api";

const crimeTypes = ["Theft", "Assault", "Robbery", "Fraud", "Vandalism", "Cybercrime", "Murder", "Kidnapping", "Drug Trafficking", "Other"];
const stations   = ["Central Police Station", "North Division", "South Division", "East Zone", "West Zone", "Sector 17 Station", "Sector 26 Station"];
const statuses   = ["Active", "Open", "Under Investigation", "Pending", "Closed"];

const EditFIR = () => {
  const { id } = useParams();       // MongoDB _id from the URL
  const navigate = useNavigate();

  const [form, setForm]           = useState(null);   // null until data is loaded
  const [loading, setLoading]     = useState(true);
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [saveError, setSaveError]   = useState("");

  // ── On mount: fetch the FIR from backend ─────────────
  useEffect(() => {
    const loadFIR = async () => {
      try {
        setLoading(true);
        const response = await getFIRById(id);  // GET /api/fir/:id
        const data = response.data;

        // Map backend field names → form field names
        setForm({
          firNumber:   data.firNumber   || "",
          date:        data.date ? data.date.split("T")[0] : "",  // trim time part
          station:     data.policeStation   || "",   // policeStation → station
          complainant: data.complainantName || "",   // complainantName → complainant
          crimeType:   data.crimeType   || "",
          description: data.description || "",
          status:      data.status      || "Active",
        });
      } catch (err) {
        setFetchError("Could not load FIR details. Please go back and try again.");
      } finally {
        setLoading(false);
      }
    };

    loadFIR();
  }, [id]);

  // ── Submit handler: PUT to backend ───────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveError("");

    // Map form field names back → backend field names
    const payload = {
      firNumber:       form.firNumber,
      date:            form.date,
      policeStation:   form.station,       // station → policeStation
      complainantName: form.complainant,   // complainant → complainantName
      crimeType:       form.crimeType,
      description:     form.description,
      status:          form.status,
    };

    try {
      setSaving(true);
      await updateFIR(id, payload);        // PUT /api/fir/:id
      setSaved(true);
      setTimeout(() => navigate("/fir/view"), 1500);
    } catch (err) {
      setSaveError(
        err.response?.data?.message || "Failed to update FIR. Please try again."
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
          <button className="btn-secondary mt-4 mx-auto" onClick={() => navigate("/fir/view")}>
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
          <p className="text-emerald-700 text-sm font-medium">FIR updated successfully! Redirecting...</p>
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
            <h2 className="font-heading font-semibold text-xl text-navy-900">Edit FIR</h2>
            <p className="text-slate-500 text-xs font-mono">{form.firNumber}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">FIR Number</label>
              <input
                className="form-input bg-slate-50 opacity-70 cursor-not-allowed"
                value={form.firNumber}
                readOnly
              />
            </div>
            <div>
              <label className="form-label">Date</label>
              <input type="date" className="form-input" value={form.date} onChange={set("date")} />
            </div>
          </div>

          <div>
            <label className="form-label">Police Station</label>
            <select className="form-input" value={form.station} onChange={set("station")}>
              {stations.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="form-label">Complainant Name</label>
            <input className="form-input" value={form.complainant} onChange={set("complainant")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Crime Type</label>
              <select className="form-input" value={form.crimeType} onChange={set("crimeType")}>
                {crimeTypes.map((c) => <option key={c}>{c}</option>)}
              </select>
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
              value={form.description}
              onChange={set("description")}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={15} />
              {saving ? "Saving..." : "Save Changes"}
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

export default EditFIR;
