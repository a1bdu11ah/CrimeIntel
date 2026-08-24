import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Users, Pencil, Trash2, Loader } from "lucide-react";
import { getPersonnels, deletePersonnel } from "../../services/api";

const ViewPersonnel = () => {
  const navigate = useNavigate();

  const [personnels, setPersonnels] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState("");
  const [search, setSearch]       = useState("");

  // ── Load all personnels from backend on mount ──────────────
  const loadPersonnels = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getPersonnels();   // GET /api/personnel
      setPersonnels(response.data);
    } catch (err) {
      setError("Could not load personnels. Make sure the server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPersonnels();
  }, []);

  // ── Delete a personnel ──────────────────────────────────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this personnel record?")) return;
    try {
      await deletePersonnel(id);                // DELETE /api/personnel/:id
      loadPersonnels();                         // refresh the list
    } catch (err) {
      alert("Failed to delete personnel record.");
    }
  };

  // ── Filter by search text ─────────────────
  const filtered = personnels.filter((p) => {
    const matchSearch =
      (p.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.rank || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.department || "").toLowerCase().includes(search.toLowerCase()) ||
      (p.contactNumber || "").toLowerCase().includes(search.toLowerCase());
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
              placeholder="Search personnels..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => navigate("/personnel/add")}>
          <Plus size={15} /> Add Personnel
        </button>
      </div>

      {/* ── Table card ── */}
      <div className="card p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-navy-800">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-purple-400" />
            <h3 className="font-heading font-semibold text-white">Personnel Records</h3>
          </div>
          <span className="text-steel-400 text-xs bg-navy-800 px-2.5 py-1 rounded-full border border-navy-700">
            {filtered.length} records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-navy-950/60">
              <tr>
                {["Name", "Rank", "Department", "Contact Number", "Actions"].map((h) => (
                  <th key={h} className="table-header">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {/* Loading state */}
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <Loader size={20} className="animate-spin text-steel-400 mx-auto" />
                  </td>
                </tr>
              )}

              {/* Error state */}
              {(!loading && error) && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-red-400 text-sm">{error}</td>
                </tr>
              )}

              {/* Empty state */}
              {!loading && !error && filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-steel-400 text-sm">
                    No personnel records found
                  </td>
                </tr>
              )}

              {/* Data rows */}
              {!loading && !error && filtered.map((personnel) => (
                <tr key={personnel._id} className="table-row">
                  <td className="table-cell font-medium text-white">{personnel.name}</td>
                  <td className="table-cell">{personnel.rank}</td>
                  <td className="table-cell">{personnel.department}</td>
                  <td className="table-cell font-mono text-blue-400 text-xs">{personnel.contactNumber}</td>
                  <td className="table-cell">
                    <div className="flex items-center gap-2">
                      <button
                        className="btn-edit"
                        onClick={() => navigate(`/personnel/edit/${personnel._id}`)}
                      >
                        <Pencil size={11} /> Edit
                      </button>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(personnel._id)}
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

export default ViewPersonnel;


