import React, { useState, useEffect } from "react";
import {
  FileText,
  Mic,
  MicOff,
  MapPin,
  Camera,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  Sparkles,
  Share2,
  ExternalLink,
  Search,
  Filter,
  Check,
  Star,
  RefreshCw,
  Send,
  Layers,
  ChevronRight
} from "lucide-react";
import { api } from "../api";
import { triageComplaintLocally, SUPPORTED_LANGUAGES } from "../services/aiAgent";

const pretty = (s) => (s ? s.replace("_", " ").toLowerCase() : "");
const when = (t) =>
  t
    ? new Date(t).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "";

function shrink(file, cb) {
  const img = new Image();
  img.onload = () => {
    const k = Math.min(1, 800 / Math.max(img.width, img.height));
    const c = document.createElement("canvas");
    c.width = img.width * k;
    c.height = img.height * k;
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    cb(c.toDataURL("image/jpeg", 0.7));
  };
  img.src = URL.createObjectURL(file);
}

export default function ComplaintPortal({
  currentLang,
  prefilledComplaint,
  onClearPrefilled,
  onOpenAiSaathi
}) {
  const emptyForm = {
    title: "",
    description: "",
    address: "",
    lat: null,
    lng: null,
    imageData: "",
    isUrgent: false,
  };

  const [form, setForm] = useState(emptyForm);
  const [lang, setLang] = useState(currentLang || "en-IN");
  const [listening, setListening] = useState(false);
  const [list, setList] = useState([]);
  const [err, setErr] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [ticketSearch, setTicketSearch] = useState("");
  const [ratings, setRatings] = useState({});

  // Sync prefilled data from AI Saathi if available
  useEffect(() => {
    if (prefilledComplaint) {
      setForm((prev) => ({
        ...prev,
        title: prefilledComplaint.title || prev.title,
        description: prefilledComplaint.description || prev.description,
        isUrgent: prefilledComplaint.priority === "HIGH",
      }));
      setSuccessMsg("Grievance details successfully populated from JanMitra AI Saathi!");
      if (onClearPrefilled) onClearPrefilled();
    }
  }, [prefilledComplaint]);

  // Load complaints
  const load = () => {
    setBusy(true);
    api("/complaints/mine")
      .then((data) => {
        setList(Array.isArray(data) ? data : []);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setBusy(false));
  };

  useEffect(() => {
    load();
  }, []);

  // Real-time AI preview of current input
  const liveTriage = triageComplaintLocally(
    form.title + " " + form.description + (form.isUrgent ? " danger urgent" : "")
  );

  // Speech Recognition
  function handleSpeak() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return setErr("Voice input requires Google Chrome, Edge or Safari.");
    const r = new SR();
    r.lang = lang;
    r.onstart = () => setListening(true);
    r.onend = () => setListening(false);
    r.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setForm((p) => {
        const nextDesc = (p.description + " " + transcript).trim();
        const auto = triageComplaintLocally(nextDesc);
        return {
          ...p,
          description: nextDesc,
          title: p.title || auto.title,
        };
      });
    };
    r.start();
  }

  // Geolocation
  const handleLocate = () => {
    if (!navigator.geolocation) {
      setErr("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setForm((x) => ({
          ...x,
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          address: x.address || `GPS: ${p.coords.latitude.toFixed(4)}, ${p.coords.longitude.toFixed(4)}`,
        }));
        setSuccessMsg("Accurate GPS location tagged successfully.");
      },
      () => setErr("Location permission denied. Please enter your street landmark manually.")
    );
  };

  // Submit Complaint
  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setSuccessMsg("");
    setBusy(true);

    try {
      const payload = {
        title: form.title,
        description: form.description,
        address: form.address,
        lat: form.lat,
        lng: form.lng,
        imageData: form.imageData,
      };

      const res = await api("/complaints", "POST", payload);
      setForm(emptyForm);
      setSuccessMsg(`Complaint successfully registered! Tracking ID: ${res.id || "COMP-REG"}. Assigned to ${res.department || "Field Authority"}.`);
      await load();
    } catch (x) {
      setErr(x.message || "Failed to submit grievance.");
    } finally {
      setBusy(false);
    }
  }

  // Filter complaints
  const filteredList = list.filter((c) => {
    if (filterStatus !== "ALL" && c.status !== filterStatus) return false;
    if (filterCategory !== "ALL" && c.category !== filterCategory) return false;
    if (ticketSearch.trim()) {
      const q = ticketSearch.toLowerCase();
      const matchId = (c.id || "").toLowerCase().includes(q);
      const matchTitle = (c.title || "").toLowerCase().includes(q);
      const matchDept = (c.department || "").toLowerCase().includes(q);
      return matchId || matchTitle || matchDept;
    }
    return true;
  });

  const setRatingFor = (id, rating) => {
    setRatings((p) => ({ ...p, [id]: rating }));
  };

  return (
    <div className="jm-complaints-page">
      <div className="jm-complaints-layout">
        {/* Left: Interactive Complaint Registration Form */}
        <div className="jm-form-column">
          <form className="jm-card jm-report-form" onSubmit={handleSubmit}>
            <div className="jm-form-head">
              <div className="jm-badge-red">
                <AlertTriangle size={14} /> Redressal Portal
              </div>
              <h2 className="jm-form-title">Lodge Civic Grievance</h2>
              <p className="jm-form-sub">
                Official grievance lodging with instant AI triage, GPS geotagging, and department routing.
              </p>
            </div>

            {successMsg && (
              <div className="jm-alert-success">
                <CheckCircle2 size={16} />
                <span>{successMsg}</span>
              </div>
            )}

            {err && (
              <div className="jm-alert-err">
                <AlertCircle size={16} />
                <span>{err}</span>
              </div>
            )}

            {/* Quick Suggestions */}
            <div className="jm-quick-issues">
              <span className="lbl">Quick Select Issue:</span>
              <div className="chips">
                {[
                  "Hazardous Pothole on Road",
                  "Drinking Water Pipeline Leak",
                  "Streetlight Outage",
                  "Garbage Bin Overflowing"
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="chip"
                    onClick={() => {
                      setForm((p) => ({
                        ...p,
                        title: item,
                        description: p.description || `${item} reported by citizen at locality. Needs inspection.`,
                      }));
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div className="jm-field">
              <label>Grievance Subject / Title *</label>
              <input
                type="text"
                placeholder="e.g. Deep pothole causing bike skidding near bus stop"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>

            {/* Description with Voice Recording */}
            <div className="jm-field">
              <div className="jm-label-with-voice">
                <label>Problem Description (Type or Speak) *</label>
                <div className="jm-voice-controls">
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value)}
                    aria-label="Voice Language"
                  >
                    {SUPPORTED_LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code}>
                        {l.nativeName}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className={`jm-btn-record ${listening ? "listening" : ""}`}
                    onClick={handleSpeak}
                    title="Speak in your language"
                  >
                    {listening ? <MicOff size={14} /> : <Mic size={14} />}
                    <span>{listening ? "Listening…" : "Speak"}</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={4}
                placeholder="Describe what is broken, for how many days, and any immediate hazard…"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>

            {/* Live AI Triage Feedback Banner */}
            {(form.title || form.description) && (
              <div className="jm-ai-triage-preview">
                <div className="preview-top">
                  <span className="ai-tag">
                    <Sparkles size={13} /> Live AI Triage
                  </span>
                  <span className={`priority-tag ${liveTriage.priority}`}>
                    Priority: {liveTriage.priority}
                  </span>
                </div>
                <div className="preview-grid">
                  <div>
                    <span className="lbl">Category:</span>
                    <strong>{liveTriage.category}</strong>
                  </div>
                  <div>
                    <span className="lbl">Target Dept:</span>
                    <strong>{liveTriage.department}</strong>
                  </div>
                  <div>
                    <span className="lbl">SLA:</span>
                    <strong className="sla-txt">{liveTriage.sla}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* Address & GPS */}
            <div className="jm-field">
              <label>Street Address / Landmark</label>
              <div className="jm-location-row">
                <input
                  type="text"
                  placeholder="Ward number, landmark, street name"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
                <button
                  type="button"
                  className={`jm-btn-gps ${form.lat ? "located" : ""}`}
                  onClick={handleLocate}
                  title="Tag current GPS location"
                >
                  <MapPin size={16} />
                  <span>{form.lat ? "GPS Tagged" : "Auto GPS"}</span>
                </button>
              </div>
              {form.lat && (
                <div className="jm-gps-coords">
                  <span>
                    Lat: {form.lat.toFixed(4)}, Lng: {form.lng.toFixed(4)}
                  </span>
                  <a
                    href={`https://www.google.com/maps?q=${form.lat},${form.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Map <ExternalLink size={11} />
                  </a>
                </div>
              )}
            </div>

            {/* Photo Upload */}
            <div className="jm-field">
              <label>Attach Evidence Photo (Optional)</label>
              <div className="jm-photo-uploader">
                <label className="jm-upload-btn">
                  <Camera size={18} />
                  <span>Choose Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      e.target.files[0] &&
                      shrink(e.target.files[0], (d) => setForm((p) => ({ ...p, imageData: d })))
                    }
                  />
                </label>
                {form.imageData && (
                  <div className="jm-image-preview-wrap">
                    <img className="thumb-preview" src={form.imageData} alt="Evidence" />
                    <button
                      type="button"
                      className="remove-img"
                      onClick={() => setForm({ ...form, imageData: "" })}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="jm-form-actions">
              <button
                type="submit"
                className="jm-btn-submit-complaint"
                disabled={busy}
              >
                {busy ? (
                  <>
                    <RefreshCw size={16} className="spin" />
                    <span>Transmitting to Authority…</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Submit Official Grievance</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="jm-btn-ask-saathi-form"
                onClick={onOpenAiSaathi}
              >
                <Sparkles size={15} />
                <span>Need help? Talk to AI Saathi</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right: Complaints List and Multi-Step Progress Tracker */}
        <div className="jm-list-column">
          <div className="jm-list-header">
            <div>
              <h2 className="jm-list-title">My Tracked Grievances ({list.length})</h2>
              <p className="jm-list-sub">
                Real-time tracking of civic inspection, department dispatch, and resolution status.
              </p>
            </div>
            <button type="button" className="jm-btn-refresh" onClick={load} title="Refresh Complaints">
              <RefreshCw size={15} className={busy ? "spin" : ""} />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="jm-tickets-filter-bar">
            <div className="jm-ticket-search">
              <Search size={15} />
              <input
                type="text"
                placeholder="Search by ticket ID, title, or department…"
                value={ticketSearch}
                onChange={(e) => setTicketSearch(e.target.value)}
              />
            </div>

            <div className="jm-status-filters">
              {["ALL", "OPEN", "IN_PROGRESS", "RESOLVED"].map((st) => (
                <button
                  key={st}
                  type="button"
                  className={`status-btn ${filterStatus === st ? "active" : ""}`}
                  onClick={() => setFilterStatus(st)}
                >
                  {st === "ALL" ? "All" : pretty(st)}
                </button>
              ))}
            </div>
          </div>

          {/* Tickets Stream */}
          <div className="jm-tickets-stream">
            {filteredList.map((ticket) => {
              const currentStep =
                ticket.status === "RESOLVED"
                  ? 4
                  : ticket.status === "IN_PROGRESS"
                  ? 3
                  : 2;

              return (
                <article key={ticket.id} className="jm-ticket-card">
                  {/* Top line: ID and Status */}
                  <div className="jm-ticket-top">
                    <div className="ticket-id-tag">
                      <strong>{ticket.id || "COMP-REG"}</strong>
                      <span className="ticket-date">{when(ticket.createdAt)}</span>
                    </div>
                    <span className={`jm-status-pill ${ticket.status}`}>
                      {pretty(ticket.status)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="jm-ticket-title">{ticket.title}</h3>
                  <p className="jm-ticket-desc">{ticket.description || ticket.summary}</p>

                  {/* Category & Department Meta */}
                  <div className="jm-ticket-meta-row">
                    <span className="cat-chip">{pretty(ticket.category)}</span>
                    <span className="dept-chip">{ticket.department}</span>
                    <span className={`prio-chip ${ticket.priority}`}>
                      Priority: {ticket.priority}
                    </span>
                    {ticket.address && (
                      <span className="addr-chip">
                        <MapPin size={12} /> {ticket.address}
                      </span>
                    )}
                  </div>

                  {/* Image if available */}
                  {ticket.imageData && (
                    <div className="jm-ticket-img-wrap">
                      <img className="jm-ticket-img" src={ticket.imageData} alt="Ticket evidence" />
                    </div>
                  )}

                  {/* 4-Stage Stepper Progress Tracker */}
                  <div className="jm-stepper">
                    <div className="stepper-title">Citizen Charter Resolution Progress</div>
                    <div className="steps-row">
                      <div className={`step-node ${currentStep >= 1 ? "done" : ""}`}>
                        <div className="circle">{currentStep > 1 ? "✓" : "1"}</div>
                        <span className="txt">Lodged</span>
                      </div>
                      <div className={`step-line ${currentStep >= 2 ? "done" : ""}`}></div>
                      <div className={`step-node ${currentStep >= 2 ? "done" : ""}`}>
                        <div className="circle">{currentStep > 2 ? "✓" : "2"}</div>
                        <span className="txt">AI Triage</span>
                      </div>
                      <div className={`step-line ${currentStep >= 3 ? "done" : ""}`}></div>
                      <div className={`step-node ${currentStep >= 3 ? "done" : ""}`}>
                        <div className="circle">{currentStep > 3 ? "✓" : "3"}</div>
                        <span className="txt">Dispatched</span>
                      </div>
                      <div className={`step-line ${currentStep >= 4 ? "done" : ""}`}></div>
                      <div className={`step-node ${currentStep >= 4 ? "done" : ""}`}>
                        <div className="circle">{currentStep >= 4 ? "✓" : "4"}</div>
                        <span className="txt">Resolved</span>
                      </div>
                    </div>
                  </div>

                  {/* Audit History Timeline */}
                  {ticket.history && ticket.history.length > 0 && (
                    <div className="jm-ticket-audit">
                      <span className="audit-lbl">Official Remarks & Activity Log:</span>
                      <ol className="jm-timeline-list">
                        {ticket.history.map((h, i) => (
                          <li key={i} className="timeline-item">
                            <div className="timeline-point"></div>
                            <div className="timeline-content">
                              <span className="stat bold">{pretty(h.status)}:</span>
                              <span className="note">{h.note}</span>
                              <span className="by-time">
                                — {h.by || "Authority"} at {when(h.at)}
                              </span>
                            </div>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Resolution Rating for resolved tickets */}
                  {ticket.status === "RESOLVED" && (
                    <div className="jm-resolution-rating-box">
                      <span>Rate Municipal Redressal:</span>
                      <div className="star-row">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className={`star-btn ${(ratings[ticket.id] || 5) >= star ? "active" : ""}`}
                            onClick={() => setRatingFor(ticket.id, star)}
                          >
                            <Star size={16} />
                          </button>
                        ))}
                      </div>
                      {ratings[ticket.id] && (
                        <span className="rated-txt">Thanks for your feedback!</span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}

            {filteredList.length === 0 && (
              <div className="jm-no-complaints">
                <FileText size={40} className="icon" />
                <h3>No complaints found</h3>
                <p>You haven't reported any civic issues matching this filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
