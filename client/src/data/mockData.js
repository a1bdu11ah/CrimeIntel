// Mock Data for CRMS

export const mockFIRs = [
  { id: 1, firNumber: "FIR-2024-001", date: "2024-01-15", station: "Central Police Station", complainant: "Rajesh Kumar", crimeType: "Theft", description: "Mobile phone stolen from market area", status: "Active" },
  { id: 2, firNumber: "FIR-2024-002", date: "2024-01-18", station: "North Division", complainant: "Priya Sharma", crimeType: "Assault", description: "Physical assault near park", status: "Under Investigation" },
  { id: 3, firNumber: "FIR-2024-003", date: "2024-01-22", station: "East Zone", complainant: "Amit Singh", crimeType: "Robbery", description: "Armed robbery at jewelry shop", status: "Closed" },
  { id: 4, firNumber: "FIR-2024-004", date: "2024-02-01", station: "South Division", complainant: "Sunita Devi", crimeType: "Fraud", description: "Online banking fraud", status: "Active" },
  { id: 5, firNumber: "FIR-2024-005", date: "2024-02-10", station: "West Zone", complainant: "Vikram Patel", crimeType: "Vandalism", description: "Property damage reported", status: "Pending" },
  { id: 6, firNumber: "FIR-2024-006", date: "2024-02-15", station: "Central Police Station", complainant: "Deepak Joshi", crimeType: "Cybercrime", description: "Social media harassment", status: "Under Investigation" },
];

export const mockCriminals = [
  { id: 1, name: "Arjun Mehta", age: 34, address: "15 Sector 7, Chandigarh", crimeHistory: "Theft (2019), Robbery (2022)", status: "In Custody", linkedFIR: "FIR-2024-003" },
  { id: 2, name: "Ravi Kumar", age: 28, address: "Mohali Phase 5", crimeHistory: "Assault (2021)", status: "Released", linkedFIR: "FIR-2024-002" },
  { id: 3, name: "Suresh Yadav", age: 42, address: "Panchkula Sector 11", crimeHistory: "Fraud (2018), Cybercrime (2023)", status: "Wanted", linkedFIR: "FIR-2024-004" },
  { id: 4, name: "Kamal Singh", age: 31, address: "Zirakpur Main Road", crimeHistory: "Vandalism (2022)", status: "Released", linkedFIR: "FIR-2024-005" },
  { id: 5, name: "Deepak Chandra", age: 25, address: "Sector 22, Chandigarh", crimeHistory: "First Offense", status: "In Custody", linkedFIR: "FIR-2024-001" },
];

export const mockCaseProgress = [
  { id: 1, firId: "FIR-2024-001", date: "2024-01-15", status: "FIR Registered", remarks: "Complaint received and FIR filed", officer: "SI Rajinder Singh" },
  { id: 2, firId: "FIR-2024-001", date: "2024-01-17", status: "Investigation Started", remarks: "CCTV footage collected from area", officer: "ASI Kavita Devi" },
  { id: 3, firId: "FIR-2024-001", date: "2024-01-20", status: "Suspect Identified", remarks: "Suspect tracked via mobile location", officer: "SI Rajinder Singh" },
  { id: 4, firId: "FIR-2024-003", date: "2024-01-22", status: "FIR Registered", remarks: "Armed robbery complaint registered", officer: "DSP Harpreet Kaur" },
  { id: 5, firId: "FIR-2024-003", date: "2024-01-25", status: "Arrest Made", remarks: "Suspect Arjun Mehta arrested from Ambala", officer: "DSP Harpreet Kaur" },
  { id: 6, firId: "FIR-2024-003", date: "2024-02-01", status: "Chargesheet Filed", remarks: "Chargesheet submitted to court", officer: "SI Mandeep Singh" },
  { id: 7, firId: "FIR-2024-003", date: "2024-02-10", status: "Case Closed", remarks: "Court proceedings completed", officer: "DSP Harpreet Kaur" },
];

export const mockEvidence = [
  { id: 1, firId: "FIR-2024-001", evidenceType: "Digital", description: "CCTV footage from market area", collectedDate: "2024-01-17", collectedBy: "ASI Kavita Devi", status: "In Custody" },
  { id: 2, firId: "FIR-2024-001", evidenceType: "Physical", description: "Witness statement from shopkeeper", collectedDate: "2024-01-16", collectedBy: "SI Rajinder Singh", status: "Documented" },
  { id: 3, firId: "FIR-2024-003", evidenceType: "Forensic", description: "Fingerprints collected from scene", collectedDate: "2024-01-22", collectedBy: "Forensic Team", status: "Lab Analysis" },
  { id: 4, firId: "FIR-2024-003", evidenceType: "Physical", description: "Stolen jewelry recovered", collectedDate: "2024-01-26", collectedBy: "DSP Harpreet Kaur", status: "In Custody" },
  { id: 5, firId: "FIR-2024-004", evidenceType: "Digital", description: "Bank transaction logs", collectedDate: "2024-02-03", collectedBy: "Cyber Cell", status: "Analysis Pending" },
];

export const mockPersonnel = [
  { id: 1, name: "DSP Harpreet Kaur", rank: "DSP", station: "Central Police Station", contact: "+91-98765-43210", status: "Active", badge: "CHD-001" },
  { id: 2, name: "SI Rajinder Singh", rank: "Sub Inspector", station: "North Division", contact: "+91-98765-43211", status: "Active", badge: "CHD-002" },
  { id: 3, name: "ASI Kavita Devi", rank: "Asst. Sub Inspector", station: "East Zone", contact: "+91-98765-43212", status: "Active", badge: "CHD-003" },
  { id: 4, name: "Const. Mandeep Singh", rank: "Constable", station: "South Division", contact: "+91-98765-43213", status: "On Leave", badge: "CHD-004" },
  { id: 5, name: "HC Suresh Kumar", rank: "Head Constable", station: "West Zone", contact: "+91-98765-43214", status: "Active", badge: "CHD-005" },
  { id: 6, name: "SI Priya Sharma", rank: "Sub Inspector", station: "Central Police Station", contact: "+91-98765-43215", status: "Active", badge: "CHD-006" },
];

export const dashboardStats = {
  totalFIRs: 248,
  totalCriminals: 134,
  activeCases: 87,
  personnelCount: 312,
  recentActivity: [
    { id: 1, action: "New FIR Registered", detail: "FIR-2024-006 filed at Central Station", time: "2 hours ago", type: "fir" },
    { id: 2, action: "Arrest Made", detail: "Suspect arrested in FIR-2024-003 case", time: "5 hours ago", type: "arrest" },
    { id: 3, action: "Evidence Added", detail: "Forensic report added to FIR-2024-004", time: "1 day ago", type: "evidence" },
    { id: 4, action: "Case Closed", detail: "FIR-2024-003 case resolved", time: "2 days ago", type: "closed" },
    { id: 5, action: "Personnel Added", detail: "SI Priya Sharma assigned to Central Station", time: "3 days ago", type: "personnel" },
  ]
};
