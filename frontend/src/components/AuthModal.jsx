import React, { useState } from "react";
import { User, Lock, Mail, CheckCircle2, AlertCircle, X, Shield, Sparkles } from "lucide-react";
import { api, session } from "../api";

export default function AuthModal({ isOpen, onClose, onDone }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!isOpen) return null;

  const setVal = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);

    try {
      const res = await api("/auth/" + mode, "POST", form);
      session.set(res);
      onDone(res);
      onClose();
    } catch (x) {
      setErr(x.message || "Authentication failed.");
    } finally {
      setBusy(false);
    }
  }

  // Quick Demo Logins for instant frictionless testing
  const handleQuickDemo = (role) => {
    const demoUser =
      role === "ADMIN"
        ? {
            token: "demo-jwt-admin",
            name: "Commissioner Sharma (Authority)",
            email: "admin@janmitra.in",
            role: "ADMIN"
          }
        : {
            token: "demo-jwt-citizen",
            name: "Rajesh Kumar (Citizen)",
            email: "citizen@janmitra.in",
            role: "CITIZEN"
          };
    session.set(demoUser);
    onDone(demoUser);
    onClose();
  };

  return (
    <div className="jm-modal-backdrop" onClick={onClose}>
      <div className="jm-auth-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="jm-auth-header">
          <div className="jm-auth-avatar">
            <User size={24} />
          </div>
          <h3 className="jm-auth-title">
            {mode === "login" ? "Sign In to JanMitra" : "Create Citizen Account"}
          </h3>
          <p className="jm-auth-sub">
            {mode === "login"
              ? "Access tracked grievances, citizen feedback, and personalized scheme alerts."
              : "Register to lodge verified civic complaints and track resolution SLAs."}
          </p>
          <button type="button" className="jm-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {err && (
          <div className="jm-alert-err">
            <AlertCircle size={15} />
            <span>{err}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="jm-auth-form">
          {mode === "register" && (
            <div className="jm-field">
              <label>Full Name</label>
              <div className="input-icon-wrap">
                <User size={16} />
                <input
                  type="text"
                  placeholder="e.g. Ramesh Chandra"
                  value={form.name}
                  onChange={setVal("name")}
                  required
                />
              </div>
            </div>
          )}

          <div className="jm-field">
            <label>Email Address</label>
            <div className="input-icon-wrap">
              <Mail size={16} />
              <input
                type="email"
                placeholder="citizen@example.com"
                value={form.email}
                onChange={setVal("email")}
                required
              />
            </div>
          </div>

          <div className="jm-field">
            <label>Password</label>
            <div className="input-icon-wrap">
              <Lock size={16} />
              <input
                type="password"
                placeholder="6+ characters"
                value={form.password}
                onChange={setVal("password")}
                required
              />
            </div>
          </div>

          <button type="submit" className="jm-btn-auth-submit" disabled={busy}>
            {busy ? "Authenticating…" : mode === "login" ? "Sign In" : "Register Account"}
          </button>

          <button
            type="button"
            className="jm-btn-auth-switch"
            onClick={() => setMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "New citizen? Create an account here"
              : "Already have an account? Sign in"}
          </button>
        </form>

        {/* Quick Demo Switcher */}
        <div className="jm-demo-logins-box">
          <div className="demo-lbl">
            <Sparkles size={13} /> Quick Instant Demo Logins:
          </div>
          <div className="demo-btns">
            <button
              type="button"
              className="demo-btn citizen"
              onClick={() => handleQuickDemo("CITIZEN")}
            >
              <span>Login as Citizen (Rajesh Kumar)</span>
            </button>
            <button
              type="button"
              className="demo-btn admin"
              onClick={() => handleQuickDemo("ADMIN")}
            >
              <Shield size={13} />
              <span>Login as Department Official (Admin)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
