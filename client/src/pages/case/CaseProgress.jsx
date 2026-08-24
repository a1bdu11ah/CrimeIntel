import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Plus, CheckCircle, Circle, Clock } from "lucide-react";
import { mockCaseProgress, mockFIRs } from "../../data/mockData";

const statusIcon = (status) => {
  if (status === "Case Closed") return <CheckCircle size={16} className="text-emerald-400" />;
  if (status === "FIR Registered") return <Circle size={16} className="text-blue-400" />;
  return <Clock size={16} className="text-amber-400" />;
};

const CaseProgress = () => {
  const navigate = useNavigate();
  const [selectedFIR, setSelectedFIR] = useState("All");

  const firIds = ["All", ...new Set(mockCaseProgress.map((c) => c.firId))];

  const filtered = selectedFIR === "All"
    ? mockCaseProgress
    : mockCaseProgress.filter((c) => c.firId === selectedFIR);

  // Group by FIR
  const grouped = filtered.reduce((acc, item) => {
    if (!acc[item.firId]) acc[item.firId] = [];
    acc[item.firId].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <label className="text-steel-400 text-sm">Filter by FIR:</label>
          <select
            className="form-input py-2 w-48"
            value={selectedFIR}
            onChange={(e) => setSelectedFIR(e.target.value)}
          >
            {firIds.map((id) => <option key={id}>{id}</option>)}
          </select>
        </div>
        <button className="btn-primary flex-shrink-0" onClick={() => navigate("/case/update")}>
          <Plus size={15} /> Update Case
        </button>
      </div>

      {Object.entries(grouped).map(([firId, updates]) => {
        const fir = mockFIRs.find((f) => f.firNumber === firId);
        return (
          <div key={firId} className="card">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-navy-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp size={16} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-heading font-semibold">{firId}</p>
                  {fir && <p className="text-steel-400 text-xs">{fir.crimeType} · {fir.complainant}</p>}
                </div>
              </div>
              <span className={`badge ${updates[updates.length - 1]?.status === "Case Closed" ? "badge-closed" : "badge-active"}`}>
                {updates[updates.length - 1]?.status}
              </span>
            </div>

            {/* Timeline */}
            <div className="relative ml-2">
              {updates.map((item, idx) => (
                <div key={item.id} className="flex gap-4 mb-0">
                  {/* Line + dot */}
                  <div className="flex flex-col items-center">
                    <div className="flex-shrink-0 mt-1">{statusIcon(item.status)}</div>
                    {idx < updates.length - 1 && (
                      <div className="w-px bg-navy-700 flex-1 my-1" style={{ minHeight: "32px" }} />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`pb-5 ${idx === updates.length - 1 ? "" : ""}`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-white text-sm font-semibold">{item.status}</p>
                      <span className="text-steel-400/60 text-xs">·</span>
                      <span className="text-steel-400 text-xs">{item.date}</span>
                    </div>
                    <p className="text-steel-300 text-sm mt-0.5">{item.remarks}</p>
                    <p className="text-steel-400 text-xs mt-1">Officer: {item.officer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {Object.keys(grouped).length === 0 && (
        <div className="card text-center py-12 text-steel-400 text-sm">
          No case progress records found.
        </div>
      )}
    </div>
  );
};

export default CaseProgress;
