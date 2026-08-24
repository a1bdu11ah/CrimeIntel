import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, FileText, Filter, Loader } from "lucide-react";
import { getFIRs, deleteFIR } from "../../services/api";

const statusClass = {
  "Active":             "badge-active",
  "Pending":            "badge-pending",
  "Closed":             "badge-closed",
  "Under Investigation":"badge-critical",
  "Open":               "badge-active",
};

const ViewFIR = () => {
  const navigate = useNavigate();

  const [firs, setFirs]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");
  const [filterStatus, setFilter]   = useState("All");

  // ── Load all FIRs from backend on mount ──────────────
  const loadFIRs = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getFIRs();   // GET /api/fir
      setFirs(response.data);
    } catch (err) {
      setError("Could not load FIRs. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFIRs();
  }, []);

  // ── Delete a FIR ──────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this FIR?")) return;
    try {
      await deleteFIR(id);                // DELETE /api/fir/:id
      loadFIRs();                         // refresh the list
    } catch (err) {
      alert("Failed to delete FIR.");
    }
  };

  // ── Filter by search text and status ─────────────────
  // Backend uses: firNumber, complainantName, crimeType, policeStation
  const filtered = firs.filter((f) => {
    const matchSearch =
      (f.firNumber       || "").toLowerCase().includes(search.toLowerCase()) ||
      (f.complainantName || "").toLowerCase().includes(search.toLowerCase()) ||
      (f.crimeType       || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5">

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex gap-3 flex-1 w-full">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
            <input
              className="form-input pl-9 py-2"
              placeholder="Search FIRs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-steel-400" />
            <select
              className="form-input pl-9 py-2 pr-8"
              value={filterStatus}
              onChange={(e) => setFilter(e.target.value)}
            >
              {["All", "Active", "Open", "Pending", "Under Investigation", "Closed"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => navigate("/fir/add")}>
          <Plus size={15} /> Register FIR
        </button>
      </div>

      {/* ── Table card ── */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-blue-400" />
            <h3 className="font-heading font-semibold text-white">FIR Records</h3>
          </div>
          <span className="text-steel-400 text-xs bg-navy-800 px-2.5 py-1 rounded-full border border-navy-700">
            {filtered.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-950/60">
              <tr>
                {["FIR Number", "Date", "Crime Type", "Complainant", "Station", "Status", "Actions"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Loading state */}
              {loading && (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <Loader size={20} className="animate-spin text-steel-400 mx-auto" />
                  </td>
                </tr>
              )}

              {/* Error state */}
              {!loading && error && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-red-400 text-sm">{error}</td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-steel-400 text-sm">
                    No FIRs found
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && filtered.map((fir) => (
                <tr key={fir._id} className="table-row">
                  <td className="table-cell font-mono text-blue-400 font-medium text-xs">
                    {fir.firNumber}
                  </td>
                  <td className="table-cell">
                    {/* Format ISO date to readable form */}
                    {fir.date ? new Date(fir.date).toLocaleDateString() : "—"}
                  </td>
                  <td className="table-cell">{fir.crimeType}</td>
                  <td className="table-cell text-white font-medium">{fir.complainantName}</td>
                  <td className="table-cell text-steel-400 text-xs">{fir.policeStation}</td>
                  <td className="table-cell">
                    <span className={statusClass[fir.status] || "badge-closed"}>{fir.status}</span>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/fir/edit/${fir._id}`)}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(fir._id)}
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

export default ViewFIR;
