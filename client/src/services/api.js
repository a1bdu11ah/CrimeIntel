import axios from "axios";

// ─────────────────────────────────────────────────────────
// Axios instance — uses the deployed API URL, with a local development fallback
// ─────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

// ─────────────────────────────────────────────────────────
// FIR API functions
// ─────────────────────────────────────────────────────────

// POST /api/fir — create a new FIR
export const createFIR = (data) => api.post("/fir", data);

// GET /api/fir — get all FIRs
export const getFIRs = () => api.get("/fir");

// GET /api/fir/:id — get one FIR by its record _id
export const getFIRById = (id) => api.get(`/fir/${id}`);

// PUT /api/fir/:id — update a FIR
export const updateFIR = (id, data) => api.put(`/fir/${id}`, data);

// DELETE /api/fir/:id — delete a FIR
export const deleteFIR = (id) => api.delete(`/fir/${id}`);

// ─────────────────────────────────────────────────────────
// Criminal API functions
// ─────────────────────────────────────────────────────────

// POST /api/criminal — create a new criminal
export const createCriminal = (data) => api.post("/criminal", data);

// GET /api/criminal — get all criminals
export const getCriminals = () => api.get("/criminal");

// GET /api/criminal/:id — get one criminal by its record _id
export const getCriminalById = (id) => api.get(`/criminal/${id}`);

// PUT /api/criminal/:id — update a criminal
export const updateCriminal = (id, data) => api.put(`/criminal/${id}`, data);

// DELETE /api/criminal/:id — delete a criminal
export const deleteCriminal = (id) => api.delete(`/criminal/${id}`);

// ─────────────────────────────────────────────────────────
// Case API functions
// ─────────────────────────────────────────────────────────

// POST /api/case — create a new case
export const createCase = (data) => api.post("/case", data);

// GET /api/case — get all cases
export const getCases = () => api.get("/case");

// GET /api/case/:id — get one case by its record _id
export const getCaseById = (id) => api.get(`/case/${id}`);

// PUT /api/case/:id — update a case
export const updateCase = (id, data) => api.put(`/case/${id}`, data);

// DELETE /api/case/:id — delete a case
export const deleteCase = (id) => api.delete(`/case/${id}`);

// ─────────────────────────────────────────────────────────
// Evidence API functions
// ─────────────────────────────────────────────────────────

// POST /api/evidence — create a new evidence
export const createEvidence = (data) => api.post("/evidence", data);

// GET /api/evidence — get all evidences
export const getEvidences = () => api.get("/evidence");

// GET /api/evidence/:id — get one evidence by its record _id
export const getEvidenceById = (id) => api.get(`/evidence/${id}`);

// PUT /api/evidence/:id — update a evidence
export const updateEvidence = (id, data) => api.put(`/evidence/${id}`, data);

// DELETE /api/evidence/:id — delete a evidence
export const deleteEvidence = (id) => api.delete(`/evidence/${id}`);

// ─────────────────────────────────────────────────────────
// Personnel API functions
// ─────────────────────────────────────────────────────────

// POST /api/personnel — create a new personnel
export const createPersonnel = (data) => api.post("/personnel", data);

// GET /api/personnel — get all personnels
export const getPersonnels = () => api.get("/personnel");

// GET /api/personnel/:id — get one personnel by its record _id
export const getPersonnelById = (id) => api.get(`/personnel/${id}`);

// PUT /api/personnel/:id — update a personnel
export const updatePersonnel = (id, data) => api.put(`/personnel/${id}`, data);

// DELETE /api/personnel/:id — delete a personnel
export const deletePersonnel = (id) => api.delete(`/personnel/${id}`);
