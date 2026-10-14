import React, { useState } from "react";
import {
  Search,
  Mic,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  HelpCircle,
  AlertTriangle
} from "lucide-react";
import { UI_TRANSLATIONS } from "../services/aiAgent";

export default function HeroBanner({
  currentLang,
  onSearch,
  onOpenAiSaathi,
  onOpenEligibilityQuiz,
  onFileComplaint,
  onOpenHelplines
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS["en-IN"];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="jm-hero">
      <div className="jm-hero-glow"></div>
      <div className="jm-container jm-hero-content">
        {/* Ticker Pill */}
        <div className="jm-hero-pill">
          <span className="jm-pulse-dot"></span>
          <span className="jm-pill-txt">JanMitra 2.0 Live: AI Voice Assistant in 8 Indian Languages</span>
          <TrendingUp size={14} className="jm-pill-icon" />
        </div>

        {/* Main Headline */}
        <h1 className="jm-hero-title">
          {t.welcome} — <span className="jm-hero-highlight">Empowering Citizens</span> Across India
        </h1>
        <p className="jm-hero-desc">
          {t.tagline} Report municipal issues with voice in your native language, track resolution timelines under the Citizen Charter, and unlock eligible Central & State welfare benefits.
        </p>

        {/* Universal Search Bar */}
        <form className="jm-search-box" onSubmit={handleSearchSubmit}>
          <div className="jm-search-input-wrap">
            <Search size={20} className="jm-search-icon" />
            <input
              type="text"
              className="jm-search-input"
              placeholder={t.placeholderChat}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button type="submit" className="jm-search-btn">
            <span>Search</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Quick Action Chips */}
        <div className="jm-hero-actions">
          <button
            type="button"
            className="jm-action-card jm-action-ai"
            onClick={onOpenAiSaathi}
          >
            <div className="jm-action-icon">
              <Mic size={20} />
            </div>
            <div className="jm-action-meta">
              <strong>Talk to AI Saathi</strong>
              <span>Speak in Hindi, Telugu or English</span>
            </div>
            <Sparkles size={16} className="jm-sparkle-tag" />
          </button>

          <button
            type="button"
            className="jm-action-card jm-action-schemes"
            onClick={onOpenEligibilityQuiz}
          >
            <div className="jm-action-icon">
              <ShieldCheck size={20} />
            </div>
            <div className="jm-action-meta">
              <strong>Check Scheme Eligibility</strong>
              <span>30-second personalized quiz</span>
            </div>
            <ArrowRight size={16} className="jm-arrow-tag" />
          </button>

          <button
            type="button"
            className="jm-action-card jm-action-report"
            onClick={onFileComplaint}
          >
            <div className="jm-action-icon">
              <AlertTriangle size={20} />
            </div>
            <div className="jm-action-meta">
              <strong>Report a Civic Hazard</strong>
              <span>Pothole, water leak, power outage</span>
            </div>
            <ArrowRight size={16} className="jm-arrow-tag" />
          </button>
        </div>

        {/* Live Civic Metric Badges */}
        <div className="jm-metrics-bar">
          <div className="jm-metric-item">
            <div className="jm-metric-num">14,820+</div>
            <div className="jm-metric-lbl">
              <CheckCircle2 size={13} className="jm-icon-resolved" />
              <span>Grievances Resolved</span>
            </div>
          </div>
          <div className="jm-metric-sep"></div>
          <div className="jm-metric-item">
            <div className="jm-metric-num">98.4%</div>
            <div className="jm-metric-lbl">
              <Sparkles size={13} className="jm-icon-ai" />
              <span>AI Triage Accuracy</span>
            </div>
          </div>
          <div className="jm-metric-sep"></div>
          <div className="jm-metric-item">
            <div className="jm-metric-num">24-48 Hrs</div>
            <div className="jm-metric-lbl">
              <Clock size={13} className="jm-icon-clock" />
              <span>Citizen Charter SLA</span>
            </div>
          </div>
          <div className="jm-metric-sep"></div>
          <div className="jm-metric-item">
            <div className="jm-metric-num">₹1,240 Cr+</div>
            <div className="jm-metric-lbl">
              <ShieldCheck size={13} className="jm-icon-welfare" />
              <span>Welfare Benefits Mapped</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
