import React, { useState, useEffect } from "react";
import { session } from "./api";
import Navbar from "./components/Navbar";
import HeroBanner from "./components/HeroBanner";
import SchemesPortal from "./components/SchemesPortal";
import ComplaintPortal from "./components/ComplaintPortal";
import AdminPortal from "./components/AdminPortal";
import CivicFeed from "./components/CivicFeed";
import AiSaathiModal from "./components/AiSaathiModal";
import HelplinesModal from "./components/HelplinesModal";
import AuthModal from "./components/AuthModal";
import {
  Bot,
  Sparkles,
  PhoneCall,
  Landmark,
  ShieldCheck,
  Heart,
  Globe,
  FileText,
  Layers,
  ArrowUp
} from "lucide-react";
import { UI_TRANSLATIONS } from "./services/aiAgent";

export default function App() {
  const [user, setUser] = useState(() => {
    // If no user saved yet, initialize a default citizen session for seamless instant demo
    const saved = session.get();
    if (saved) return saved;
    const defaultCitizen = {
      token: "demo-jwt-default",
      name: "Rajesh Kumar (Citizen)",
      email: "citizen@janmitra.in",
      role: "CITIZEN",
    };
    session.set(defaultCitizen);
    return defaultCitizen;
  });

  const [activeTab, setActiveTab] = useState("schemes");
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem("jm_current_lang") || "en-IN";
  });
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHelplinesModalOpen, setIsHelplinesModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const [prefilledComplaint, setPrefilledComplaint] = useState(null);
  const [initialAiQuery, setInitialAiQuery] = useState("");
  const [heroSearchTerm, setHeroSearchTerm] = useState("");

  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS["en-IN"];

  useEffect(() => {
    localStorage.setItem("jm_current_lang", currentLang);
  }, [currentLang]);

  // Sign out
  const handleSignOut = () => {
    session.clear();
    setUser(null);
  };

  // Toggle role between CITIZEN and ADMIN
  const handleToggleRole = () => {
    if (!user) return;
    const newRole = user.role === "ADMIN" ? "CITIZEN" : "ADMIN";
    const updated = {
      ...user,
      role: newRole,
      name: newRole === "ADMIN" ? "Commissioner Sharma (Authority)" : "Rajesh Kumar (Citizen)",
      email: newRole === "ADMIN" ? "admin@janmitra.in" : "citizen@janmitra.in",
    };
    session.set(updated);
    setUser(updated);
  };

  // When AI Saathi triggers "Autofill into complaint form"
  const handleAutofillComplaint = (triageData) => {
    setPrefilledComplaint(triageData);
    setIsAiModalOpen(false);
    setActiveTab("complaints");
    window.scrollTo({ top: 350, behavior: "smooth" });
  };

  // When user clicks "Ask AI about this scheme"
  const handleAskAiAboutScheme = (scheme) => {
    setInitialAiQuery(
      `Tell me all about ${scheme.name} (${scheme.tagline}). What are the benefits, documents needed and how do I apply?`
    );
    setIsAiModalOpen(true);
  };

  // Search from hero banner
  const handleHeroSearch = (term) => {
    setHeroSearchTerm(term);
    setActiveTab("schemes");
  };

  return (
    <div className="jm-app-root">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        user={user}
        onSignOut={handleSignOut}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenHelplines={() => setIsHelplinesModalOpen(true)}
        onToggleRole={handleToggleRole}
      />

      {/* Hero Banner (visible on schemes & overview tabs) */}
      <HeroBanner
        currentLang={currentLang}
        onSearch={handleHeroSearch}
        onOpenAiSaathi={() => {
          setInitialAiQuery("");
          setIsAiModalOpen(true);
        }}
        onOpenEligibilityQuiz={() => {
          setActiveTab("schemes");
          setIsQuizModalOpen(true);
        }}
        onFileComplaint={() => {
          setActiveTab("complaints");
        }}
        onOpenHelplines={() => setIsHelplinesModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="jm-main-container">
        {activeTab === "schemes" && (
          <SchemesPortal
            currentLang={currentLang}
            onAskAiAboutScheme={handleAskAiAboutScheme}
            searchTerm={heroSearchTerm}
            quizModeOpen={isQuizModalOpen}
            onCloseQuiz={() => setIsQuizModalOpen(false)}
          />
        )}

        {activeTab === "complaints" && (
          user?.role === "ADMIN" ? (
            <AdminPortal />
          ) : (
            <ComplaintPortal
              currentLang={currentLang}
              prefilledComplaint={prefilledComplaint}
              onClearPrefilled={() => setPrefilledComplaint(null)}
              onOpenAiSaathi={() => {
                setInitialAiQuery("");
                setIsAiModalOpen(true);
              }}
            />
          )
        )}

        {activeTab === "ai-agent" && (
          <div className="jm-dedicated-ai-view">
            <div className="jm-ai-page-intro">
              <span className="jm-badge-ai">
                <Sparkles size={14} /> Multilingual Conversational Civic Intelligence
              </span>
              <h2>JanMitra AI Saathi — Voice & Text Grievance Assistant</h2>
              <p>
                Speak or type in your native regional language (Hindi, Telugu, Tamil, Bengali, Marathi, etc.).
                The AI Saathi triages your grievance, assigns the right municipal department, checks Citizen Charter SLAs, and guides you to welfare schemes.
              </p>
            </div>
            {/* Inline AI Saathi View */}
            <div className="jm-inline-ai-wrapper">
              <AiSaathiModal
                isOpen={true}
                onClose={() => setActiveTab("schemes")}
                currentLang={currentLang}
                setCurrentLang={setCurrentLang}
                onAutofillComplaint={handleAutofillComplaint}
                initialQuery={initialAiQuery}
              />
            </div>
          </div>
        )}

        {activeTab === "feed" && <CivicFeed />}
      </main>

      {/* Floating Persistent AI Assistant Launcher (Bottom-Right) */}
      <div className="jm-floating-ai-launcher">
        <button
          type="button"
          className="jm-floating-ai-btn"
          onClick={() => {
            setInitialAiQuery("");
            setIsAiModalOpen(!isAiModalOpen);
          }}
          title="Open JanMitra AI Saathi (Regional Language Voice Assistant)"
        >
          <div className="jm-fab-pulse"></div>
          <Bot size={24} className="jm-fab-icon" />
          <div className="jm-fab-text">
            <strong>AI Saathi</strong>
            <span>बोलकर बताएं</span>
          </div>
        </button>
      </div>

      {/* AI Saathi Floating Drawer Modal */}
      {activeTab !== "ai-agent" && (
        <AiSaathiModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onAutofillComplaint={handleAutofillComplaint}
          initialQuery={initialAiQuery}
        />
      )}

      {/* Helplines Modal */}
      <HelplinesModal
        isOpen={isHelplinesModalOpen}
        onClose={() => setIsHelplinesModalOpen(false)}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onDone={(u) => setUser(u)}
      />

      {/* Official Civic Footer */}
      <footer className="jm-footer">
        <div className="jm-container jm-footer-content">
          <div className="jm-footer-col brand">
            <div className="jm-brand">
              <div className="jm-logo-emblem">⚙</div>
              <div>
                <span className="jm-logo-main">JanMitra</span>
                <span className="jm-logo-sub">जनमित्र</span>
              </div>
            </div>
            <p className="jm-footer-tagline">
              Digital India Initiative for Citizen Empowerment, Transparent Municipal Redressal & Pan-India Welfare Access.
            </p>
            <div className="jm-footer-emblem-badge">
              <span>🇮🇳 Powered by AI for Bharat · Digital India Mission</span>
            </div>
          </div>

          <div className="jm-footer-col">
            <h4>Welfare Schemes</h4>
            <ul>
              <li><button onClick={() => { setActiveTab("schemes"); handleHeroSearch("Ayushman"); }}>Ayushman Bharat (PM-JAY)</button></li>
              <li><button onClick={() => { setActiveTab("schemes"); handleHeroSearch("Surya Ghar"); }}>PM Surya Ghar Muft Bijli</button></li>
              <li><button onClick={() => { setActiveTab("schemes"); handleHeroSearch("Kisan"); }}>PM Kisan Samman Nidhi</button></li>
              <li><button onClick={() => { setActiveTab("schemes"); handleHeroSearch("Awas"); }}>PM Awas Yojana (PMAY)</button></li>
              <li><button onClick={() => { setActiveTab("schemes"); handleHeroSearch("Vishwakarma"); }}>PM Vishwakarma Toolkit</button></li>
            </ul>
          </div>

          <div className="jm-footer-col">
            <h4>Civic Services</h4>
            <ul>
              <li><button onClick={() => setActiveTab("complaints")}>Lodge Civic Grievance</button></li>
              <li><button onClick={() => setActiveTab("complaints")}>Track Ticket Status</button></li>
              <li><button onClick={() => setIsAiModalOpen(true)}>Multilingual Voice Assistant</button></li>
              <li><button onClick={() => setActiveTab("feed")}>Ward Impact & Social Audit</button></li>
              <li><button onClick={() => setIsHelplinesModalOpen(true)}>Emergency Helplines Directory</button></li>
            </ul>
          </div>

          <div className="jm-footer-col">
            <h4>Emergency Contacts</h4>
            <div className="jm-footer-helplines">
              <div className="hl-item">
                <span className="badge red">112</span>
                <span>National Emergency</span>
              </div>
              <div className="hl-item">
                <span className="badge amber">1912</span>
                <span>Electricity Breakdown</span>
              </div>
              <div className="hl-item">
                <span className="badge blue">1916</span>
                <span>Water Supply Rupture</span>
              </div>
              <div className="hl-item">
                <span className="badge green">14555</span>
                <span>Ayushman Bharat Help</span>
              </div>
            </div>
          </div>
        </div>

        <div className="jm-footer-bottom">
          <div className="jm-container jm-bottom-flex">
            <span>© 2026 JanMitra — Citizen Empowerment Platform. Designed for Accessibility & Regional Inclusivity.</span>
            <span>Citizen Charter SLA: 24 to 48 Hours Guaranteed Response</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
