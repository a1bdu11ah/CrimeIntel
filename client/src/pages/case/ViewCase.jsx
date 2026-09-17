import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, FileText, Filter, Loader } from "lucide-react";
import { getCases, deleteCase } from "../../services/api";

const statusClass = {
  "Open": "badge-active",
  "Under Investigation": "badge-pending",
  "Pending": "badge-pending",
  "Closed": "badge-closed",
};

const ViewCase = () => {
  const navigate = useNavigate();

  const [cases, setCases]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilter]   = useState("All");

  // ── Load all cases from backend on mount ──────────────
  const loadCases = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getCases();   // GET /api/case
      setCases(response.data);
    } catch (err) {
      setError("Could not load cases. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCases();
  }, []);

  // ── Delete a case ──────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this case?")) return;
    try {
      await deleteCase(id);                // DELETE /api/case/:id
      loadCases();                         // refresh the list
    } catch (err) {
      alert("Failed to delete case.");
    }
  };

  // ── Filter by search text and status ─────────────────
  const filtered = cases.filter((c) => {
    const matchSearch =
      (c.caseNumber       || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.caseType         || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.assignedOfficer  || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || c.status === filterStatus;
    return matchSearch && matchStatus;
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
              placeholder="Search cases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <select
              className="form-input pl-9 py-2 pr-8"
              value={filterStatus}
              onChange={(e) => setFilter(e.target.value)}
            >
              {["All", "Open", "Under Investigation", "Pending", "Closed"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => navigate("/case/add")}>
          <Plus size={15} /> Add Case
        </button>
      </div>

      {/* ── Table card ── */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-blue-700" />
            <h3 className="font-heading font-semibold text-navy-900">Case Records</h3>
          </div>
          <span className="text-slate-500 text-xs bg-blue-50 px-2.5 py-1 rounded-full border border-slate-200">
            {filtered.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                {["Case Number", "Case Type", "Status", "Assigned Officer", "Court Date", "Actions"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Loading state */}
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Loader size={20} className="animate-spin text-slate-500 mx-auto" />
                  </td>
                </tr>
              )}

              {/* Error state */}
              {!loading && error && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-red-700 text-sm">{error}</td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-500 text-sm">
                    No cases found
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && filtered.map((caseItem) => (
                <tr key={caseItem._id} className="table-row">
                  <td className="table-cell font-mono text-blue-700 font-medium text-xs">
                    {caseItem.caseNumber}
                  </td>
                  <td className="table-cell">{caseItem.caseType}</td>
                  <td className="table-cell">
                    <span className={statusClass[caseItem.status] || "badge-closed"}>{caseItem.status}</span>
                  </td>
                  <td className="table-cell text-navy-900 font-medium">{caseItem.assignedOfficer}</td>
                  <td className="table-cell">
                    {/* Format ISO date to readable form */}
                    {caseItem.courtDate ? new Date(caseItem.courtDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/case/edit/${caseItem._id}`)}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(caseItem._id)}
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

export default ViewCase;