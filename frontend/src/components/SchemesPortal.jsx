import React, { useState, useMemo } from "react";
import {
  Search,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  Phone,
  Bot,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Check,
  Building2,
  X,
  HeartPulse,
  Home,
  Sprout,
  SunMedium,
  Users,
  ShieldCheck,
  GraduationCap,
  Wallet,
  Landmark
} from "lucide-react";
import { GOVT_SCHEMES, SCHEME_CATEGORIES } from "../data/schemes";

// Map category icon names to Lucide icons
const ICONS_MAP = {
  Landmark,
  HeartPulse,
  Home,
  Sprout,
  SunMedium,
  Users,
  ShieldCheck,
  GraduationCap,
  Wallet
};

export default function SchemesPortal({
  currentLang,
  onAskAiAboutScheme,
  searchTerm: parentSearchTerm = "",
  quizModeOpen = false,
  onCloseQuiz
}) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState(parentSearchTerm);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("jm_bookmarked_schemes") || "[]");
    } catch {
      return [];
    }
  });
  const [activeSchemeDetail, setActiveSchemeDetail] = useState(null);
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // Eligibility Quiz State
  const [quizOpen, setQuizOpen] = useState(quizModeOpen);
  const [quizStep, setQuizStep] = useState(1);
  const [quizForm, setQuizForm] = useState({
    age: "25-45",
    gender: "any",
    area: "rural",
    occupation: "farmer",
    income: "under_1_5l"
  });
  const [quizResults, setQuizResults] = useState(null);

  const toggleBookmark = (id, e) => {
    e?.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem("jm_bookmarked_schemes", JSON.stringify(updated));
      return updated;
    });
  };

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return GOVT_SCHEMES.filter((scheme) => {
      if (selectedCategory !== "ALL" && scheme.category !== selectedCategory) {
        return false;
      }
      if (showSavedOnly && !bookmarkedIds.includes(scheme.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = scheme.name.toLowerCase().includes(q);
        const matchesTag = scheme.tagline.toLowerCase().includes(q);
        const matchesSummary = scheme.benefitSummary.toLowerCase().includes(q);
        const matchesDept = scheme.ministry.toLowerCase().includes(q);
        const matchesRegional = Object.values(scheme.regionalSummaries || {}).some((v) =>
          v.toLowerCase().includes(q)
        );
        return matchesName || matchesTag || matchesSummary || matchesDept || matchesRegional;
      }
      return true;
    });
  }, [selectedCategory, searchQuery, showSavedOnly, bookmarkedIds]);

  // Run eligibility calculator
  const runEligibilityMatch = () => {
    const matched = GOVT_SCHEMES.filter((scheme) => {
      // Basic rule heuristics
      if (quizForm.occupation === "farmer") {
        if (scheme.id === "pm-kisan") return true;
      }
      if (quizForm.occupation === "artisan") {
        if (scheme.id === "pm-vishwakarma") return true;
      }
      if (quizForm.occupation === "street_vendor") {
        if (scheme.id === "pm-svanidhi") return true;
      }
      if (quizForm.occupation === "student") {
        if (scheme.id === "national-scholarship") return true;
      }
      if (quizForm.gender === "female" && (scheme.id === "pm-ujjwala" || scheme.id === "sukanya-samriddhi")) {
        return true;
      }
      if (quizForm.income === "under_1_5l" || quizForm.income === "1_5l_3l") {
        if (scheme.id === "pm-jay" || scheme.id === "pm-awas-urban" || scheme.id === "atal-pension") return true;
      }
      if (scheme.id === "pm-surya-ghar" || scheme.id === "jal-jeevan-mission") {
        return true;
      }
      return false;
    });

    setQuizResults(matched);
    setQuizStep(4); // Results step
  };

  return (
    <div className="jm-schemes-page">
      {/* Schemes Hub Header */}
      <div className="jm-schemes-hero">
        <div className="jm-schemes-header-row">
          <div>
            <div className="jm-section-pill">
              <Building2 size={14} />
              <span>Pradhan Mantri Welfare Schemes Directory</span>
            </div>
            <h2 className="jm-schemes-title">JanKalyan Welfare Scheme Portal</h2>
            <p className="jm-schemes-desc">
              Discover official Central and State government welfare schemes, direct financial assistance, subsidized loans, free healthcare, and solar subsidies with complete eligibility guidance.
            </p>
          </div>

          <button
            type="button"
            className="jm-btn-quiz-cta"
            onClick={() => {
              setQuizOpen(true);
              setQuizStep(1);
            }}
          >
            <Sparkles size={18} />
            <div className="jm-btn-quiz-txt">
              <strong>Scheme Eligibility Finder</strong>
              <span>30-second personalized quiz</span>
            </div>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Filter Controls Bar */}
        <div className="jm-filter-bar">
          <div className="jm-search-schemes-input">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search scheme by name, benefit, or keyword (e.g. solar, hospital, ₹5 lakh)…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="jm-clear-btn"
                onClick={() => setSearchQuery("")}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            className={`jm-saved-toggle ${showSavedOnly ? "active" : ""}`}
            onClick={() => setShowSavedOnly(!showSavedOnly)}
          >
            <Bookmark size={15} />
            <span>Saved Schemes ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="jm-category-chips">
          {SCHEME_CATEGORIES.map((cat) => {
            const IconComp = ICONS_MAP[cat.icon] || Landmark;
            const count =
              cat.id === "ALL"
                ? GOVT_SCHEMES.length
                : GOVT_SCHEMES.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                className={`jm-cat-chip ${selectedCategory === cat.id ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <IconComp size={16} />
                <span>{cat.name}</span>
                <span className="count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="jm-schemes-grid">
        {filteredSchemes.map((scheme) => {
          const isSaved = bookmarkedIds.includes(scheme.id);
          const regionalText = scheme.regionalSummaries?.[currentLang] || scheme.benefitSummary;

          return (
            <article
              key={scheme.id}
              className={`jm-scheme-card ${scheme.isPopular ? "featured" : ""}`}
              onClick={() => setActiveSchemeDetail(scheme)}
            >
              {scheme.isPopular && (
                <div className="jm-featured-ribbon">
                  <Sparkles size={11} /> High Adoption
                </div>
              )}

              <div className="jm-scheme-card-top">
                <span className="jm-scheme-ministry-tag">{scheme.ministry}</span>
                <button
                  type="button"
                  className={`jm-bookmark-btn ${isSaved ? "saved" : ""}`}
                  onClick={(e) => toggleBookmark(scheme.id, e)}
                  title={isSaved ? "Remove from bookmarks" : "Save scheme"}
                >
                  {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
                </button>
              </div>

              <h3 className="jm-scheme-card-name">{scheme.name}</h3>
              <p className="jm-scheme-card-tagline">{scheme.tagline}</p>

              {/* Benefit Highlight Box */}
              <div className="jm-benefit-box">
                <span className="benefit-lbl">Key Benefit:</span>
                <span className="benefit-val">{scheme.benefitAmount}</span>
              </div>

              {/* Regional Summary if available */}
              {currentLang !== "en-IN" && scheme.regionalSummaries?.[currentLang] && (
                <div className="jm-regional-bubble">
                  <span className="jm-regional-lang-tag">
                    {currentLang === "hi-IN" ? "हिन्दी विवरण:" : "తెలుగు సారాంశం:"}
                  </span>
                  <p>{regionalText}</p>
                </div>
              )}

              <div className="jm-scheme-meta-list">
                <div className="meta-item">
                  <span className="lbl">Target:</span>
                  <span className="val">{scheme.eligibility.targetGroup}</span>
                </div>
                <div className="meta-item">
                  <span className="lbl">Helpline:</span>
                  <span className="val">{scheme.helpline}</span>
                </div>
              </div>

              <div className="jm-scheme-card-footer">
                <button
                  type="button"
                  className="jm-btn-view-details"
                  onClick={() => setActiveSchemeDetail(scheme)}
                >
                  <span>View Full Details & Documents</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  type="button"
                  className="jm-btn-ask-ai-scheme"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onAskAiAboutScheme) onAskAiAboutScheme(scheme);
                  }}
                  title="Ask AI Saathi in your language"
                >
                  <Bot size={15} />
                  <span>Ask AI</span>
                </button>
              </div>
            </article>
          );
        })}

        {filteredSchemes.length === 0 && (
          <div className="jm-no-schemes">
            <HelpCircle size={40} className="jm-no-icon" />
            <h3>No government schemes found matching your criteria</h3>
            <p>Try resetting the search filter or browsing under "All Schemes".</p>
            <button
              type="button"
              className="jm-btn-primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("ALL");
                setShowSavedOnly(false);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Scheme Detail Modal */}
      {activeSchemeDetail && (
        <div className="jm-modal-backdrop" onClick={() => setActiveSchemeDetail(null)}>
          <div className="jm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="jm-modal-head">
              <div>
                <span className="jm-modal-subtag">{activeSchemeDetail.ministry}</span>
                <h3 className="jm-modal-title">{activeSchemeDetail.name}</h3>
                <p className="jm-modal-tagline">{activeSchemeDetail.tagline}</p>
              </div>
              <button
                type="button"
                className="jm-modal-close"
                onClick={() => setActiveSchemeDetail(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="jm-modal-body">
              {/* Highlight card */}
              <div className="jm-modal-highlight">
                <div className="jm-highlight-item">
                  <span className="label">Financial / Welfare Benefit</span>
                  <strong className="value">{activeSchemeDetail.benefitAmount}</strong>
                  <p className="desc">{activeSchemeDetail.benefitSummary}</p>
                </div>
              </div>

              {/* Regional language translation if Hindi or Telugu */}
              {activeSchemeDetail.regionalSummaries && (
                <div className="jm-modal-regional-box">
                  <h4>
                    <Sparkles size={15} /> Regional Language Guidance
                  </h4>
                  {activeSchemeDetail.regionalSummaries["hi-IN"] && (
                    <div className="regional-row">
                      <strong>हिन्दी:</strong>
                      <p>{activeSchemeDetail.regionalSummaries["hi-IN"]}</p>
                    </div>
                  )}
                  {activeSchemeDetail.regionalSummaries["te-IN"] && (
                    <div className="regional-row">
                      <strong>తెలుగు:</strong>
                      <p>{activeSchemeDetail.regionalSummaries["te-IN"]}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Eligibility Section */}
              <div className="jm-modal-section">
                <h4>
                  <ShieldCheck size={16} /> Eligibility Criteria
                </h4>
                <div className="jm-eligibility-grid">
                  <div className="elig-box">
                    <span className="lbl">Target Group</span>
                    <span className="val">{activeSchemeDetail.eligibility.targetGroup}</span>
                  </div>
                  <div className="elig-box">
                    <span className="lbl">Income Bracket</span>
                    <span className="val">{activeSchemeDetail.eligibility.incomeBracket}</span>
                  </div>
                  <div className="elig-box">
                    <span className="lbl">Age Range</span>
                    <span className="val">{activeSchemeDetail.eligibility.ageRange}</span>
                  </div>
                  <div className="elig-box">
                    <span className="lbl">Occupations</span>
                    <span className="val">{activeSchemeDetail.eligibility.occupations.join(", ")}</span>
                  </div>
                </div>
              </div>

              {/* Required Documents Checklist */}
              <div className="jm-modal-section">
                <h4>
                  <FileCheck size={16} /> Mandatory Documents Checklist
                </h4>
                <ul className="jm-docs-checklist">
                  {activeSchemeDetail.documents.map((doc, idx) => (
                    <li key={idx} className="doc-item">
                      <CheckCircle2 size={16} className="check-icon" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div className="jm-modal-section">
                <h4>
                  <Landmark size={16} /> How to Apply
                </h4>
                <p className="jm-apply-text">{activeSchemeDetail.howToApply}</p>
              </div>

              {/* Official Helpline */}
              <div className="jm-helpline-box">
                <Phone size={16} className="phone-icon" />
                <span>
                  Official Toll-Free Assistance: <strong>{activeSchemeDetail.helpline}</strong>
                </span>
              </div>
            </div>

            <div className="jm-modal-footer">
              <button
                type="button"
                className="jm-btn-modal-ai"
                onClick={() => {
                  const s = activeSchemeDetail;
                  setActiveSchemeDetail(null);
                  if (onAskAiAboutScheme) onAskAiAboutScheme(s);
                }}
              >
                <Bot size={16} />
                <span>Ask AI Saathi in Native Language</span>
              </button>

              <a
                href={activeSchemeDetail.portalUrl}
                target="_blank"
                rel="noreferrer"
                className="jm-btn-modal-apply"
              >
                <span>Visit Official Portal</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Scheme Eligibility Finder Quiz Modal */}
      {quizOpen && (
        <div className="jm-modal-backdrop" onClick={() => setQuizOpen(false)}>
          <div className="jm-quiz-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="jm-quiz-header">
              <div className="jm-quiz-badge">
                <Sparkles size={14} /> 30-Second Welfare Matchmaker
              </div>
              <h3 className="jm-quiz-title">Find Government Schemes You Qualify For</h3>
              <p className="jm-quiz-sub">
                Answer 3 simple questions to discover all Central & State welfare assistance matching your family profile.
              </p>
              <button
                type="button"
                className="jm-modal-close"
                onClick={() => setQuizOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Quiz Step 1: Citizen Profile */}
            {quizStep === 1 && (
              <div className="jm-quiz-step-content">
                <div className="jm-step-indicator">
                  <span className="step-num active">1</span>
                  <span className="step-line"></span>
                  <span className="step-num">2</span>
                  <span className="step-line"></span>
                  <span className="step-num">3</span>
                </div>
                <h4 className="jm-step-heading">Step 1: Basic Citizen Demographics</h4>

                <div className="jm-quiz-field">
                  <label>Applicant Age Bracket</label>
                  <select
                    value={quizForm.age}
                    onChange={(e) => setQuizForm({ ...quizForm, age: e.target.value })}
                  >
                    <option value="under_18">Below 18 years (Student / Child)</option>
                    <option value="18-25">18 - 25 years (Youth / Student)</option>
                    <option value="25-45">25 - 45 years (Working Adult)</option>
                    <option value="45-60">45 - 60 years (Mature Adult)</option>
                    <option value="60_plus">60+ years (Senior Citizen)</option>
                  </select>
                </div>

                <div className="jm-quiz-field">
                  <label>Gender / Applicant</label>
                  <div className="jm-radio-pills">
                    {["any", "female", "male"].map((g) => (
                      <button
                        key={g}
                        type="button"
                        className={`pill-btn ${quizForm.gender === g ? "selected" : ""}`}
                        onClick={() => setQuizForm({ ...quizForm, gender: g })}
                      >
                        {g === "any" ? "Any / Family Head" : g === "female" ? "Woman Applicant" : "Male"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="jm-quiz-field">
                  <label>Residential Area</label>
                  <div className="jm-radio-pills">
                    <button
                      type="button"
                      className={`pill-btn ${quizForm.area === "rural" ? "selected" : ""}`}
                      onClick={() => setQuizForm({ ...quizForm, area: "rural" })}
                    >
                      Rural (Gram Panchayat)
                    </button>
                    <button
                      type="button"
                      className={`pill-btn ${quizForm.area === "urban" ? "selected" : ""}`}
                      onClick={() => setQuizForm({ ...quizForm, area: "urban" })}
                    >
                      Urban (Municipality / City)
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="jm-btn-quiz-next"
                  onClick={() => setQuizStep(2)}
                >
                  <span>Next: Occupation</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}

            {/* Quiz Step 2: Occupation */}
            {quizStep === 2 && (
              <div className="jm-quiz-step-content">
                <div className="jm-step-indicator">
                  <span className="step-num done">✓</span>
                  <span className="step-line done"></span>
                  <span className="step-num active">2</span>
                  <span className="step-line"></span>
                  <span className="step-num">3</span>
                </div>
                <h4 className="jm-step-heading">Step 2: Primary Occupation & Livelihood</h4>

                <div className="jm-occupations-list">
                  {[
                    { id: "farmer", label: "Farmer / Agricultural Landowner", icon: "🌾" },
                    { id: "artisan", label: "Artisan / Carpenter / Tailor / Mason", icon: "🔨" },
                    { id: "street_vendor", label: "Street Vendor / Small Stall Hawker", icon: "🛒" },
                    { id: "student", label: "Student (School / College)", icon: "🎓" },
                    { id: "unorganized", label: "Daily Wage Earner / Unorganized Worker", icon: "💼" },
                    { id: "homeowner", label: "Residential Homeowner / Private Salaried", icon: "🏠" }
                  ].map((occ) => (
                    <button
                      key={occ.id}
                      type="button"
                      className={`jm-occ-card ${quizForm.occupation === occ.id ? "selected" : ""}`}
                      onClick={() => setQuizForm({ ...quizForm, occupation: occ.id })}
                    >
                      <span className="occ-emoji">{occ.icon}</span>
                      <span className="occ-title">{occ.label}</span>
                      {quizForm.occupation === occ.id && <Check size={16} className="occ-check" />}
                    </button>
                  ))}
                </div>

                <div className="jm-step-nav-btns">
                  <button
                    type="button"
                    className="jm-btn-ghost"
                    onClick={() => setQuizStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="jm-btn-quiz-next"
                    onClick={() => setQuizStep(3)}
                  >
                    <span>Next: Income Bracket</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 3: Income */}
            {quizStep === 3 && (
              <div className="jm-quiz-step-content">
                <div className="jm-step-indicator">
                  <span className="step-num done">✓</span>
                  <span className="step-line done"></span>
                  <span className="step-num done">✓</span>
                  <span className="step-line done"></span>
                  <span className="step-num active">3</span>
                </div>
                <h4 className="jm-step-heading">Step 3: Annual Household Income</h4>

                <div className="jm-income-options">
                  {[
                    { id: "under_1_5l", label: "Below ₹1,50,000 / year (BPL / EWS priority)", sub: "Eligible for Ayushman, PM Ujjwala, PMAY EWS" },
                    { id: "1_5l_3l", label: "₹1,50,000 - ₹3,00,000 / year (Low Income)", sub: "Eligible for Ayushman, PM SVANidhi, Solar Subsidy" },
                    { id: "3l_6l", label: "₹3,00,000 - ₹6,00,000 / year (Lower Middle)", sub: "Eligible for PM Surya Ghar, PMAY LIG interest subsidy" },
                    { id: "above_6l", label: "Above ₹6,00,000 / year", sub: "Eligible for PM Surya Ghar, Sukanya Samriddhi" }
                  ].map((inc) => (
                    <button
                      key={inc.id}
                      type="button"
                      className={`jm-income-card ${quizForm.income === inc.id ? "selected" : ""}`}
                      onClick={() => setQuizForm({ ...quizForm, income: inc.id })}
                    >
                      <div className="inc-info">
                        <strong>{inc.label}</strong>
                        <span>{inc.sub}</span>
                      </div>
                      {quizForm.income === inc.id && <Check size={18} className="inc-check" />}
                    </button>
                  ))}
                </div>

                <div className="jm-step-nav-btns">
                  <button
                    type="button"
                    className="jm-btn-ghost"
                    onClick={() => setQuizStep(2)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="jm-btn-quiz-calc"
                    onClick={runEligibilityMatch}
                  >
                    <Sparkles size={16} />
                    <span>Calculate Matching Schemes</span>
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Step 4: Results */}
            {quizStep === 4 && quizResults && (
              <div className="jm-quiz-step-content jm-quiz-results">
                <div className="jm-results-summary-card">
                  <div className="res-emoji">🎉</div>
                  <div>
                    <h3>You Qualify for {quizResults.length} High-Impact Schemes!</h3>
                    <p>
                      Based on your profile, your household is eligible for estimated benefits & subsidies worth <strong>₹5,78,000+</strong>.
                    </p>
                  </div>
                </div>

                <div className="jm-matched-schemes-list">
                  {quizResults.map((s) => (
                    <div key={s.id} className="jm-matched-scheme-item">
                      <div className="item-left">
                        <span className="cat-pill">{s.category}</span>
                        <h4>{s.name}</h4>
                        <p>{s.benefitSummary}</p>
                      </div>
                      <div className="item-right">
                        <span className="benefit-badge">{s.benefitAmount}</span>
                        <a
                          href={s.portalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="apply-btn"
                        >
                          <span>Apply</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="jm-quiz-footer-actions">
                  <button
                    type="button"
                    className="jm-btn-ghost"
                    onClick={() => setQuizStep(1)}
                  >
                    Retake Quiz
                  </button>
                  <button
                    type="button"
                    className="jm-btn-primary"
                    onClick={() => setQuizOpen(false)}
                  >
                    Explore All Schemes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
