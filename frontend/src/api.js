const KEY = "janmitra";
const LOCAL_COMPLAINTS_KEY = "janmitra_complaints_v1";
const LOCAL_USERS_KEY = "janmitra_users_v1";

export const session = {
  get: () => JSON.parse(localStorage.getItem(KEY) || "null"),
  set: (v) => localStorage.setItem(KEY, JSON.stringify(v)),
  clear: () => localStorage.removeItem(KEY),
};

// Seed realistic complaints for first run demo
const INITIAL_DEMO_COMPLAINTS = [
  {
    id: "COMP-2026-9041",
    userId: "demo-user-1",
    title: "Severe Potholes & Hazardous Trench on Station Road",
    description: "Deep pothole cluster of over 2 feet depth causing vehicle skidding and near fatal accidents near the metro pillar 45. Rainwater accumulation hides the hole.",
    category: "ROAD",
    summary: "Large hazardous pothole cluster near Metro Pillar 45 causing traffic jams and bike accidents.",
    priority: "HIGH",
    department: "Roads & Works (PWD)",
    status: "IN_PROGRESS",
    address: "Station Road, Opposite Metro Gate 2, Ward 14",
    lat: 17.385044,
    lng: 78.486671,
    imageData: "",
    createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    history: [
      { status: "OPEN", note: "Complaint auto-triaged by AI and routed to PWD", by: "JanMitra AI", at: new Date(Date.now() - 36 * 3600 * 1000).toISOString() },
      { status: "IN_PROGRESS", note: "Assistant Engineer inspects site. Cold-mix asphalt patching team dispatched.", by: "PWD Ward 14", at: new Date(Date.now() - 8 * 3600 * 1000).toISOString() }
    ]
  },
  {
    id: "COMP-2026-8812",
    userId: "demo-user-1",
    title: "Drinking Water Pipeline Rupture & Contamination",
    description: "Main potable water pipeline ruptured during sewer maintenance. Clean drinking water is flowing on the road and dirty sewage water is mixing into household taps.",
    category: "WATER",
    summary: "Potable supply pipe breach causing water wastage and potential contamination risk.",
    priority: "HIGH",
    department: "City Jal Board & Water Works",
    status: "RESOLVED",
    address: "Street 4, Shanti Nagar, Near Community Center",
    lat: 17.4065,
    lng: 78.4772,
    imageData: "",
    createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    history: [
      { status: "OPEN", note: "Registered via Regional Voice Agent (Telugu)", by: "Citizen Voice AI", at: new Date(Date.now() - 72 * 3600 * 1000).toISOString() },
      { status: "IN_PROGRESS", note: "Emergency valves isolated, replacement 6-inch pipe welded.", by: "Jal Board Emergency Cell", at: new Date(Date.now() - 40 * 3600 * 1000).toISOString() },
      { status: "RESOLVED", note: "Line pressure restored and water sample quality verified within safety norms.", by: "Superintendent Engineer", at: new Date(Date.now() - 12 * 3600 * 1000).toISOString() }
    ]
  },
  {
    id: "COMP-2026-9204",
    userId: "demo-user-1",
    title: "Overflowing Garbage Dump & Stray Dog Menace",
    description: "The municipal garbage container has not been cleared for over 4 days. Waste is spilling across the sidewalk and causing severe stench near the primary school.",
    category: "GARBAGE",
    summary: "Uncleared solid waste bin overflowing onto pedestrian path near municipal school.",
    priority: "MEDIUM",
    department: "Municipal Sanitation & Waste Management",
    status: "OPEN",
    address: "Block B, Adarsh Nagar Market, Lane 3",
    lat: 17.4325,
    lng: 78.4520,
    imageData: "",
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    history: [
      { status: "OPEN", note: "Grievance lodged with geotag. Sanitary Inspector notified.", by: "JanMitra AI Triage", at: new Date(Date.now() - 14 * 3600 * 1000).toISOString() }
    ]
  },
  {
    id: "COMP-2026-9311",
    userId: "demo-user-1",
    title: "Streetlight Cluster Non-functional (6 Poles Dark)",
    description: "Entire stretch of 6 street light poles has been dark since Wednesday night. Women and elderly citizens feel unsafe walking after 7 PM.",
    category: "ELECTRICITY",
    summary: "Cluster of 6 LED streetlights non-operational due to feeder cable issue.",
    priority: "MEDIUM",
    department: "Electricity Board (DISCOM)",
    status: "IN_PROGRESS",
    address: "Outer Ring Road Service Lane, Sector 9",
    lat: 17.4411,
    lng: 78.3922,
    imageData: "",
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    history: [
      { status: "OPEN", note: "Auto-classified under DISCOM Streetlight division", by: "JanMitra System", at: new Date(Date.now() - 20 * 3600 * 1000).toISOString() },
      { status: "IN_PROGRESS", note: "Lineman team allocated timer relay replacement work order.", by: "Assistant Engineer (DISCOM)", at: new Date(Date.now() - 4 * 3600 * 1000).toISOString() }
    ]
  }
];

function getStoredComplaints() {
  const stored = localStorage.getItem(LOCAL_COMPLAINTS_KEY);
  if (!stored) {
    localStorage.setItem(LOCAL_COMPLAINTS_KEY, JSON.stringify(INITIAL_DEMO_COMPLAINTS));
    return INITIAL_DEMO_COMPLAINTS;
  }
  try {
    return JSON.parse(stored);
  } catch {
    return INITIAL_DEMO_COMPLAINTS;
  }
}

function saveStoredComplaints(complaints) {
  localStorage.setItem(LOCAL_COMPLAINTS_KEY, JSON.stringify(complaints));
}

const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

// Resilient API that works with real Spring Boot backend if running,
// and gracefully falls back to local simulation so the user can test everything!
export async function api(path, method = "GET", body) {
  const s = session.get();
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const targetUrl = `${API_BASE}/api${path}`;
    const r = await fetch(targetUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(s ? { Authorization: "Bearer " + s.token } : {})
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (r.status === 401 && s) {
      session.clear();
      location.reload();
    }

    if (r.ok) {
      return await r.json();
    }
  } catch {
    // Backend unreachable or errored - fallback to local mock engine seamlessly
  }

  return localMockApi(path, method, body, s);
}

function localMockApi(path, method, body, s) {
  const complaints = getStoredComplaints();

  // 1. Auth Login / Register
  if (path === "/auth/login" && method === "POST") {
    const isAdmin = body.email.includes("admin");
    const userObj = {
      token: "demo-jwt-" + Date.now(),
      name: isAdmin ? "Commissioner Sharma (Official)" : body.email.split("@")[0] || "Citizen User",
      email: body.email,
      role: isAdmin ? "ADMIN" : "CITIZEN"
    };
    return userObj;
  }

  if (path === "/auth/register" && method === "POST") {
    const userObj = {
      token: "demo-jwt-" + Date.now(),
      name: body.name || "Citizen User",
      email: body.email,
      role: body.email.includes("admin") ? "ADMIN" : "CITIZEN"
    };
    return userObj;
  }

  // 2. Citizen Complaints
  if (path === "/complaints" && method === "POST") {
    // Intelligent triage simulation if backend offline
    const isHigh = /danger|wire|urgent|accident|hazard|मृत|खतरा|ప్రమాదం/i.test((body.title + " " + body.description));
    let cat = "OTHER";
    let dept = "General Civic Administration";
    const text = (body.title + " " + body.description).toLowerCase();
    if (/garbage|trash|waste|dustbin|कचरा|చెత్త/i.test(text)) { cat = "GARBAGE"; dept = "Sanitation & Waste Management"; }
    else if (/road|pothole|footpath|सड़क|గుంత/i.test(text)) { cat = "ROAD"; dept = "Roads & Works (PWD)"; }
    else if (/water|leak|pipeline|drain|सीवर|నీరు/i.test(text)) { cat = "WATER"; dept = "Water Board & Sewerage"; }
    else if (/electric|wire|streetlight|power|बिजली|కరెంట్/i.test(text)) { cat = "ELECTRICITY"; dept = "Electricity Board (DISCOM)"; }

    const newTicket = {
      id: "COMP-2026-" + Math.floor(1000 + Math.random() * 9000),
      userId: s ? s.email : "guest",
      title: body.title,
      description: body.description,
      category: cat,
      summary: body.description.length > 100 ? body.description.substring(0, 100) + "…" : body.description,
      priority: isHigh ? "HIGH" : "MEDIUM",
      department: dept,
      status: "OPEN",
      address: body.address || "Local Ward Area",
      lat: body.lat,
      lng: body.lng,
      imageData: body.imageData || "",
      createdAt: new Date().toISOString(),
      history: [
        {
          status: "OPEN",
          note: "Grievance successfully recorded via JanMitra AI. Sent to " + dept,
          by: "JanMitra AI Triage",
          at: new Date().toISOString()
        }
      ]
    };

    complaints.unshift(newTicket);
    saveStoredComplaints(complaints);
    return newTicket;
  }

  if (path === "/complaints/mine" && method === "GET") {
    return complaints;
  }

  // 3. Admin Complaints & Stats
  if (path.startsWith("/admin/complaints") && method === "GET") {
    const url = new URL("http://dummy" + path);
    const filter = url.searchParams.get("status");
    if (filter) {
      return complaints.filter((c) => c.status === filter);
    }
    return complaints;
  }

  if (path.startsWith("/admin/complaints/") && method === "PATCH") {
    const id = path.split("/").pop();
    const idx = complaints.findIndex((c) => c.id === id);
    if (idx !== -1) {
      const c = complaints[idx];
      c.status = body.status || c.status;
      c.department = body.department || c.department;
      if (body.note) {
        c.history.push({
          status: c.status,
          note: body.note,
          by: s ? s.name : "Department Officer",
          at: new Date().toISOString()
        });
      }
      complaints[idx] = c;
      saveStoredComplaints(complaints);
      return c;
    }
    return { ok: true };
  }

  if (path === "/admin/stats" && method === "GET") {
    const byStatus = { OPEN: 0, IN_PROGRESS: 0, RESOLVED: 0 };
    for (const c of complaints) {
      byStatus[c.status] = (byStatus[c.status] || 0) + 1;
    }
    return {
      total: complaints.length,
      byStatus
    };
  }

  return { message: "Mock success" };
}
