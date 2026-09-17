import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, Package, Filter, Loader } from "lucide-react";
import { getEvidences, deleteEvidence } from "../../services/api";

const ViewEvidence = () => {
  const navigate = useNavigate();

  const [evidences, setEvidences]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");

  // ── Load all evidences from backend on mount ──────────────
  const loadEvidences = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getEvidences();   // GET /api/evidence
      setEvidences(response.data);
    } catch (err) {
      setError("Could not load evidences. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvidences();
  }, []);

  // ── Delete a evidence ──────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this evidence record?")) return;
    try {
      await deleteEvidence(id);                // DELETE /api/evidence/:id
      loadEvidences();                         // refresh the list
    } catch (err) {
      alert("Failed to delete evidence record.");
    }
  };

  // ── Filter by search text ─────────────────
  const filtered = evidences.filter((e) => {
    const matchSearch =
      (e.evidenceName || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.evidenceType || "").toLowerCase().includes(search.toLowerCase()) ||
      (e.caseNumber   || "").toLowerCase().includes(search.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              className="form-input pl-9 py-2"
              placeholder="Search evidences..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => navigate("/evidence/add")}>
          <Plus size={15} /> Add Evidence
        </button>
      </div>

      {/* ── Table card ── */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-purple-700" />
            <h3 className="font-heading font-semibold text-navy-900">Evidence Records</h3>
          </div>
          <span className="text-slate-500 text-xs bg-blue-50 px-2.5 py-1 rounded-full border border-slate-200">
            {filtered.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Evidence Name", "Evidence Type", "Case Number", "Collected Date", "Actions"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Loading state */}
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <Loader size={20} className="animate-spin text-slate-500 mx-auto" />
                  </td>
                </tr>
              )}

              {/* Error state */}
              {!loading && error && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-red-700 text-sm">{error}</td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-slate-500 text-sm">
                    No evidence records found
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && filtered.map((evidence) => (
                <tr key={evidence._id} className="table-row">
                  <td className="table-cell font-medium text-navy-900">{evidence.evidenceName}</td>
                  <td className="table-cell">{evidence.evidenceType}</td>
                  <td className="table-cell font-mono text-blue-700 text-xs">{evidence.caseNumber}</td>
                  <td className="table-cell">
                    {/* Format ISO date to readable form */}
                    {evidence.collectedDate ? new Date(evidence.collectedDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/evidence/edit/${evidence._id}`)}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(evidence._id)}
                      >
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEvidence;
//   );
// };

// export default ViewEvidence;
