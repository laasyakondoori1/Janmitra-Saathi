import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  Filter,
  Save,
  MapPin,
  ExternalLink,
  RefreshCw,
  Search,
  Building,
  AlertTriangle,
  FileCheck
} from "lucide-react";
import { api } from "../api";

const pretty = (s) => (s ? s.replace("_", " ").toLowerCase() : "");
const when = (t) =>
  t
    ? new Date(t).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

export default function AdminPortal() {
  const [list, setList] = useState([]);
  const [stats, setStats] = useState(null);
  const [filter, setFilter] = useState("");
  const [deptFilter, setDeptFilter] = useState("");
  const [search, setSearch] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    setBusy(true);
    api("/admin/complaints" + (filter ? "?status=" + filter : ""))
      .then((data) => setList(Array.isArray(data) ? data : []))
      .catch((e) => setErr(e.message))
      .finally(() => setBusy(false));

    api("/admin/stats")
      .then(setStats)
      .catch(() => {});
  };

  useEffect(() => {
    load();
  }, [filter]);

  // Filtered list
  const filtered = list.filter((c) => {
    if (deptFilter && c.department !== deptFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        (c.id || "").toLowerCase().includes(q) ||
        (c.title || "").toLowerCase().includes(q) ||
        (c.address || "").toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="jm-admin-page">
      {/* Admin KPI Cards */}
      <div className="jm-admin-head">
        <div>
          <span className="jm-badge-official">
            <Building size={14} /> Official Municipal Dashboard
          </span>
          <h2 className="jm-admin-title">City Redressal Operations Control</h2>
          <p className="jm-admin-sub">
            Monitor incoming AI-triaged grievances, assign field crews, enforce Citizen Charter SLAs, and publish resolution proofs.
          </p>
        </div>
        <button
          type="button"
          className="jm-btn-refresh"
          onClick={load}
          title="Refresh Data"
        >
          <RefreshCw size={16} className={busy ? "spin" : ""} />
        </button>
      </div>

      {stats && (
        <div className="jm-admin-stats-grid">
          <div className="jm-stat-card total">
            <div className="stat-num">{stats.total}</div>
            <div className="stat-label">Total Complaints Logged</div>
          </div>
          <div className="jm-stat-card open">
            <div className="stat-num">{stats.byStatus?.OPEN || 0}</div>
            <div className="stat-label">Pending / Unassigned</div>
          </div>
          <div className="jm-stat-card progress">
            <div className="stat-num">{stats.byStatus?.IN_PROGRESS || 0}</div>
            <div className="stat-label">In Progress / Field Crew</div>
          </div>
          <div className="jm-stat-card resolved">
            <div className="stat-num">{stats.byStatus?.RESOLVED || 0}</div>
            <div className="stat-label">Resolved & Audited</div>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="jm-admin-filters-bar">
        <div className="jm-admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search complaints by ID, title, or ward…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="jm-admin-selects">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="OPEN">Open Only</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved Only</option>
          </select>

          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
            <option value="">All Departments</option>
            <option value="Roads & Works (PWD)">Roads & Works (PWD)</option>
            <option value="City Jal Board & Water Works">City Jal Board</option>
            <option value="Municipal Sanitation & Waste Management">Sanitation & Waste</option>
            <option value="Electricity Board (DISCOM)">Electricity (DISCOM)</option>
          </select>
        </div>
      </div>

      {err && <div className="jm-alert-err">{err}</div>}

      {/* Complaints Stream */}
      <div className="jm-admin-complaints-list">
        {filtered.map((ticket) => (
          <AdminTicketRow key={ticket.id} c={ticket} onSaved={load} />
        ))}

        {filtered.length === 0 && (
          <div className="jm-no-complaints">
            <FileCheck size={40} className="icon" />
            <h3>No complaints match the selected department or status filters</h3>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminTicketRow({ c, onSaved }) {
  const [status, setStatus] = useState(c.status);
  const [department, setDepartment] = useState(c.department || "General Administration");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");

  async function handleSave() {
    setSaving(true);
    setFeedback("");
    try {
      await api("/admin/complaints/" + c.id, "PATCH", {
        status,
        department,
        note: note.trim() || `Status updated to ${pretty(status)} by department official`,
      });
      setNote("");
      setFeedback("Updated successfully!");
      setTimeout(() => setFeedback(""), 2500);
      onSaved();
    } catch (x) {
      setFeedback("Error: " + x.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="jm-admin-ticket-card">
      <div className="jm-admin-ticket-header">
        <div>
          <span className="ticket-id">{c.id || "COMP-REG"}</span>
          <span className="ticket-created">{when(c.createdAt)}</span>
        </div>
        <div className="jm-ticket-badges">
          <span className={`jm-priority-badge ${c.priority}`}>{c.priority} Priority</span>
          <span className={`jm-status-pill ${c.status}`}>{pretty(c.status)}</span>
        </div>
      </div>

      <h3 className="jm-admin-ticket-title">{c.title}</h3>
      <p className="jm-admin-ticket-desc">{c.description || c.summary}</p>

      <div className="jm-admin-meta-row">
        <span>
          <strong>Category:</strong> {pretty(c.category)}
        </span>
        <span>
          <strong>Address:</strong> {c.address || "Ward Area"}
        </span>
        {c.lat && (
          <a
            href={`https://www.google.com/maps?q=${c.lat},${c.lng}`}
            target="_blank"
            rel="noreferrer"
            className="jm-map-link"
          >
            <MapPin size={13} />
            <span>Map Coordinates</span>
            <ExternalLink size={11} />
          </a>
        )}
      </div>

      {c.imageData && (
        <div className="jm-admin-photo">
          <img src={c.imageData} alt="Reported issue" className="thumb" />
        </div>
      )}

      {/* Action and Resolution Control Panel */}
      <div className="jm-admin-actions-box">
        <div className="action-inputs">
          <div className="input-group">
            <label>Update Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="OPEN">Open (Pending Inspection)</option>
              <option value="IN_PROGRESS">In Progress (Crew Dispatched)</option>
              <option value="RESOLVED">Resolved (Work Completed)</option>
            </select>
          </div>

          <div className="input-group">
            <label>Assigned Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Department Name"
            />
          </div>

          <div className="input-group flex-1">
            <label>Official Note for Citizen Timeline</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Field inspection completed. Asphalt repair team dispatched."
            />
          </div>
        </div>

        <div className="action-btn-row">
          {feedback && <span className="action-feedback">{feedback}</span>}
          <button
            type="button"
            className="jm-btn-save-admin"
            disabled={saving}
            onClick={handleSave}
          >
            <Save size={15} />
            <span>{saving ? "Saving…" : "Save Official Update"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
