import React, { useState } from "react";
import {
  Landmark,
  ShieldAlert,
  FileText,
  Bot,
  Layers,
  PhoneCall,
  User,
  LogOut,
  Sparkles,
  Globe,
  CheckCircle2,
  ChevronDown
} from "lucide-react";
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from "../services/aiAgent";

export default function Navbar({
  activeTab,
  setActiveTab,
  currentLang,
  setCurrentLang,
  user,
  onSignOut,
  onOpenAuth,
  onOpenHelplines,
  onToggleRole
}) {
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS["en-IN"];
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="jm-navbar">
      <div className="jm-navbar-top">
        <div className="jm-container jm-top-row">
          <div className="jm-gov-badge">
            <span className="jm-flag-stripe"></span>
            <span className="jm-badge-text">
              🇮🇳 Government of India Civic Empowerment Initiative · Digital India
            </span>
          </div>

          <div className="jm-top-right">
            {/* Language Switcher */}
            <div className="jm-lang-picker">
              <button
                type="button"
                className="jm-lang-btn"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                aria-label="Select Language"
              >
                <Globe size={15} />
                <span>{currentLangObj.nativeName}</span>
                <ChevronDown size={14} className={langDropdownOpen ? "jm-rotate-180" : ""} />
              </button>

              {langDropdownOpen && (
                <div className="jm-lang-menu">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`jm-lang-option ${lang.code === currentLang ? "active" : ""}`}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setLangDropdownOpen(false);
                      }}
                    >
                      <span className="jm-lang-native">{lang.nativeName}</span>
                      <span className="jm-lang-english">{lang.name}</span>
                      {lang.code === currentLang && <CheckCircle2 size={14} className="jm-check" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Emergency Hotline Quick Link */}
            <button
              type="button"
              className="jm-emergency-pill"
              onClick={onOpenHelplines}
              title="Emergency Helplines"
            >
              <PhoneCall size={13} />
              <span>112 Helplines</span>
            </button>

            {/* Role Switcher Demo Button */}
            {user && (
              <button
                type="button"
                className={`jm-role-toggle ${user.role === "ADMIN" ? "admin" : "citizen"}`}
                onClick={onToggleRole}
                title="Toggle between Citizen View and Authority Dashboard"
              >
                <span>Mode: {user.role === "ADMIN" ? "Official" : "Citizen"}</span>
                <span className="jm-role-badge">Switch</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="jm-navbar-main">
        <div className="jm-container jm-nav-row">
          {/* Brand Logo */}
          <div className="jm-brand" onClick={() => setActiveTab("schemes")} role="button" tabIndex={0}>
            <div className="jm-logo-emblem">
              <div className="jm-chakra">⚙</div>
              <Landmark size={22} className="jm-emblem-icon" />
            </div>
            <div className="jm-brand-text">
              <div className="jm-title-row">
                <span className="jm-logo-main">JanMitra</span>
                <span className="jm-logo-sub">जनमित्र</span>
              </div>
              <span className="jm-logo-tagline">AI Civic Redressal & Welfare Portal</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="jm-nav-links">
            <button
              type="button"
              className={`jm-nav-item ${activeTab === "schemes" ? "active" : ""}`}
              onClick={() => setActiveTab("schemes")}
            >
              <Layers size={17} />
              <span>{t.browseSchemes}</span>
              <span className="jm-pill-count">12+</span>
            </button>

            <button
              type="button"
              className={`jm-nav-item ${activeTab === "complaints" ? "active" : ""}`}
              onClick={() => setActiveTab("complaints")}
            >
              <FileText size={17} />
              <span>{user?.role === "ADMIN" ? t.adminDashboard : t.fileComplaint}</span>
            </button>

            <button
              type="button"
              className={`jm-nav-item jm-ai-nav-item ${activeTab === "ai-agent" ? "active" : ""}`}
              onClick={() => setActiveTab("ai-agent")}
            >
              <Bot size={18} className="jm-ai-spark" />
              <span>{t.aiSaathi}</span>
              <span className="jm-badge-ai">AI Voice</span>
            </button>

            <button
              type="button"
              className={`jm-nav-item ${activeTab === "feed" ? "active" : ""}`}
              onClick={() => setActiveTab("feed")}
            >
              <Sparkles size={17} />
              <span>Civic Impact</span>
            </button>
          </nav>

          {/* User Account / Auth Actions */}
          <div className="jm-user-actions">
            {user ? (
              <div className="jm-user-profile">
                <div className="jm-avatar">
                  <User size={16} />
                </div>
                <div className="jm-user-info">
                  <span className="jm-user-name">{user.name}</span>
                  <span className="jm-user-role">{user.role === "ADMIN" ? "Dept Official" : "Verified Citizen"}</span>
                </div>
                <button
                  type="button"
                  className="jm-icon-btn jm-signout-btn"
                  onClick={onSignOut}
                  title="Sign Out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="jm-btn-primary jm-login-btn"
                onClick={onOpenAuth}
              >
                <User size={16} />
                <span>Citizen Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
