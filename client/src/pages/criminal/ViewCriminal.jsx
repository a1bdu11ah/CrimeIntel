import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Pencil, Trash2, UserX, Filter, Loader } from "lucide-react";
import { getCriminals, deleteCriminal } from "../../services/api";

const ViewCriminal = () => {
  const navigate = useNavigate();

  const [criminals, setCriminals]             = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState("");
  const [search, setSearch]         = useState("");

  // ── Load all criminals from backend on mount ──────────────
  const loadCriminals = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getCriminals();   // GET /api/criminal
      setCriminals(response.data);
    } catch (err) {
      setError("Could not load criminals. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCriminals();
  }, []);

  // ── Delete a criminal ──────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this criminal record?")) return;
    try {
      await deleteCriminal(id);                // DELETE /api/criminal/:id
      loadCriminals();                         // refresh the list
    } catch (err) {
      alert("Failed to delete criminal record.");
    }
  };

  // ── Filter by search text ─────────────────
  const filtered = criminals.filter((c) => {
    const matchSearch =
      (c.name       || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.crimeType  || "").toLowerCase().includes(search.toLowerCase()) ||
      (c.gender     || "").toLowerCase().includes(search.toLowerCase());
    return matchSearch;
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
              placeholder="Search criminals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => navigate("/criminal/add")}>
          <Plus size={15} /> Add Criminal
        </button>
      </div>

      {/* ── Table card ── */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <UserX size={16} className="text-crimson-400" />
            <h3 className="font-heading font-semibold text-white">Criminal Records</h3>
          </div>
          <span className="text-steel-400 text-xs bg-navy-800 px-2.5 py-1 rounded-full border border-navy-700">
            {filtered.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-950/60">
              <tr>
                {["Name", "Age", "Gender", "Crime Type", "Arrest Date", "Actions"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Loading state */}
              {loading && (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <Loader size={20} className="animate-spin text-steel-400 mx-auto" />
                  </td>
                </tr>
              )}

              {/* Error state */}
              {!loading && error && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-red-400 text-sm">{error}</td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-steel-400 text-sm">
                    No criminal records found
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && filtered.map((criminal) => (
                <tr key={criminal._id} className="table-row">
                  <td className="table-cell font-medium text-white">{criminal.name}</td>
                  <td className="table-cell">{criminal.age}</td>
                  <td className="table-cell">{criminal.gender}</td>
                  <td className="table-cell">{criminal.crimeType}</td>
                  <td className="table-cell">
                    {/* Format ISO date to readable form */}
                    {criminal.arrestDate ? new Date(criminal.arrestDate).toLocaleDateString() : "—"}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/criminal/edit/${criminal._id}`)}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(criminal._id)}
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

export default ViewCriminal;
