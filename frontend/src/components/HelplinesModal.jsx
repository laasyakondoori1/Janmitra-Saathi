import React, { useState } from "react";
import {
  PhoneCall,
  Search,
  Copy,
  Check,
  X,
  Phone,
  ShieldAlert,
  Zap,
  Droplets,
  Trash2,
  Activity,
  HeartHandshake,
  UserCheck,
  Flame,
  Ambulance,
  Lock,
  LifeBuoy
} from "lucide-react";
import { EMERGENCY_HELPLINES } from "../data/helplines";

const ICON_MAP = {
  PhoneCall,
  ShieldAlert,
  Flame,
  Ambulance,
  UserCheck,
  HeartHandshake,
  Zap,
  Droplets,
  Trash2,
  Activity,
  Lock,
  LifeBuoy
};

export default function HelplinesModal({ isOpen, onClose }) {
  const [copiedNum, setCopiedNum] = useState(null);
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedNum(num);
    setTimeout(() => setCopiedNum(null), 2000);
  };

  const filtered = EMERGENCY_HELPLINES.filter((h) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      h.name.toLowerCase().includes(q) ||
      h.subtitle.toLowerCase().includes(q) ||
      h.number.includes(q)
    );
  });

  return (
    <div className="jm-modal-backdrop" onClick={onClose}>
      <div className="jm-helplines-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="jm-modal-head">
          <div>
            <span className="jm-badge-red">24/7 Toll-Free Citizen Assistance</span>
            <h3 className="jm-modal-title">National Emergency & Municipal Helplines</h3>
            <p className="jm-modal-tagline">
              Immediate distress assistance, disaster response, and essential public utilities helpline numbers.
            </p>
          </div>
          <button type="button" className="jm-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="jm-helpline-search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search helpline (e.g. 112, electricity, ambulance, water, cyber)…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="jm-helplines-grid">
          {filtered.map((item) => {
            const IconComp = ICON_MAP[item.icon] || Phone;
            const isCopied = copiedNum === item.number;

            return (
              <div
                key={item.number}
                className="jm-helpline-item"
                style={{ "--accent": item.color }}
              >
                <div className="helpline-icon-wrap" style={{ color: item.color, background: `${item.color}15` }}>
                  <IconComp size={22} />
                </div>

                <div className="helpline-content">
                  <div className="helpline-num-row">
                    <span className="num" style={{ color: item.color }}>
                      {item.number}
                    </span>
                    <button
                      type="button"
                      className="copy-btn"
                      onClick={() => handleCopy(item.number)}
                      title="Copy phone number"
                    >
                      {isCopied ? <Check size={13} className="text-green" /> : <Copy size={13} />}
                      <span>{isCopied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <h4 className="title">{item.name}</h4>
                  <p className="sub">{item.subtitle}</p>

                  <a
                    href={`tel:${item.number}`}
                    className="call-btn"
                    style={{ background: item.color }}
                  >
                    <Phone size={13} />
                    <span>Call Now ({item.number})</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
