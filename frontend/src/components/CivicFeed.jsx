import React, { useState } from "react";
import {
  Sparkles,
  ThumbsUp,
  CheckCircle2,
  MapPin,
  Clock,
  Building,
  TrendingUp,
  Award,
  ShieldCheck
} from "lucide-react";

const INITIAL_STORIES = [
  {
    id: "story-1",
    ward: "Ward 14, Station Road",
    title: "15-Meter Hazardous Pothole Cluster Resurfaced in 18 Hours",
    dept: "Roads & Works (PWD)",
    resolvedAt: "Yesterday, 4:30 PM",
    sla: "Completed 6 hours ahead of SLA",
    impact: "Over 8,000 commuters and two-wheeler riders safeguarded from skidding accidents.",
    upvotes: 142,
    hasUpvoted: false,
    tag: "High Urgency Hazard Fixed",
    summary: "After citizen voice report via JanMitra AI, PWD mobile patching unit used rapid-curing bitumen asphalt to level the entire lane."
  },
  {
    id: "story-2",
    ward: "Ward 8, Shanti Nagar",
    title: "Drinking Water Main Pipeline Burst Repaired & Chlorinated",
    dept: "City Jal Board & Water Works",
    resolvedAt: "2 days ago",
    sla: "Completed in 22 Hours",
    impact: "Uninterrupted safe drinking water restored to 1,200 residential households.",
    upvotes: 98,
    hasUpvoted: false,
    tag: "Potable Water Restored",
    summary: "Emergency welding team replaced cracked 6-inch conduit. Water quality tested and verified with zero bacterial contamination."
  },
  {
    id: "story-3",
    ward: "Ward 21, Sector 9",
    title: "Cluster of 6 LED Streetlights Reconnected with Auto-Timer",
    dept: "Electricity Board (DISCOM)",
    resolvedAt: "3 days ago",
    sla: "Completed in 14 Hours",
    impact: "Dark service corridor now well-lit, ensuring safe night transit for women & senior citizens.",
    upvotes: 76,
    hasUpvoted: false,
    tag: "Women Safety & Lighting",
    summary: "Discom lineman crew replaced moisture-damaged relay switch and faulty breaker box."
  },
  {
    id: "story-4",
    ward: "Ward 5, Adarsh Market",
    title: "Decade-Old Open Garbage Dump Cleared & Converted to Green Verge",
    dept: "Municipal Sanitation & Waste Management",
    resolvedAt: "4 days ago",
    sla: "Completed in 48 Hours",
    impact: "Stench eliminated for 40 shopkeepers and primary school children; 12 saplings planted.",
    upvotes: 215,
    hasUpvoted: false,
    tag: "Swachh Bharat Cleanliness",
    summary: "Heavy backhoe JCB cleared 4 tons of accumulated debris, followed by disinfectant spraying and boundary fencing."
  }
];

export default function CivicFeed() {
  const [stories, setStories] = useState(INITIAL_STORIES);

  const handleUpvote = (id) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          return {
            ...s,
            upvotes: s.hasUpvoted ? s.upvotes - 1 : s.upvotes + 1,
            hasUpvoted: !s.hasUpvoted
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="jm-feed-page">
      {/* Header */}
      <div className="jm-feed-header">
        <div className="jm-section-pill">
          <Award size={14} />
          <span>Civic Transparency & Social Audit</span>
        </div>
        <h2 className="jm-feed-title">Public Resolution Feed & Neighborhood Impact</h2>
        <p className="jm-feed-desc">
          Verified civic improvements, speed-of-resolution audits, and citizen appreciation across municipal wards.
        </p>

        {/* City Transparency Scorecard */}
        <div className="jm-transparency-card">
          <div className="score-item">
            <span className="num">94.2%</span>
            <span className="lbl">SLA Compliance Rate</span>
          </div>
          <div className="score-sep"></div>
          <div className="score-item">
            <span className="num">31.4 Hrs</span>
            <span className="lbl">Average Resolution Speed</span>
          </div>
          <div className="score-sep"></div>
          <div className="score-item">
            <span className="num">16</span>
            <span className="lbl">Municipal Wards Monitored</span>
          </div>
          <div className="score-sep"></div>
          <div className="score-item">
            <span className="num">4.8 / 5</span>
            <span className="lbl">Citizen Satisfaction Score</span>
          </div>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="jm-stories-grid">
        {stories.map((story) => (
          <article key={story.id} className="jm-story-card">
            <div className="jm-story-top">
              <span className="jm-story-tag">
                <CheckCircle2 size={13} /> {story.tag}
              </span>
              <span className="jm-story-ward">
                <MapPin size={13} /> {story.ward}
              </span>
            </div>

            <h3 className="jm-story-title">{story.title}</h3>
            <p className="jm-story-summary">{story.summary}</p>

            <div className="jm-story-impact-box">
              <span className="impact-lbl">Verified Impact:</span>
              <p className="impact-txt">{story.impact}</p>
            </div>

            <div className="jm-story-meta">
              <span className="dept-tag">
                <Building size={12} /> {story.dept}
              </span>
              <span className="sla-tag">
                <Clock size={12} /> {story.sla}
              </span>
            </div>

            <div className="jm-story-footer">
              <span className="resolved-date">Resolved: {story.resolvedAt}</span>
              <button
                type="button"
                className={`jm-upvote-btn ${story.hasUpvoted ? "voted" : ""}`}
                onClick={() => handleUpvote(story.id)}
              >
                <ThumbsUp size={15} />
                <span>{story.hasUpvoted ? "Applauded" : "Applaud Work"}</span>
                <span className="count">({story.upvotes})</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
