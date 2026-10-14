import React, { useState, useEffect, useRef } from "react";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  FileText,
  Landmark,
  Languages,
  X,
  Minimize2,
  Maximize2
} from "lucide-react";
import {
  SUPPORTED_LANGUAGES,
  UI_TRANSLATIONS,
  generateAiAssistantResponse,
  speakText,
  stopSpeaking
} from "../services/aiAgent";

export default function AiSaathiModal({
  isOpen,
  onClose,
  currentLang,
  setCurrentLang,
  onAutofillComplaint,
  onDirectSubmitComplaint,
  initialQuery = ""
}) {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSpeechIdx, setActiveSpeechIdx] = useState(null);
  const [speechError, setSpeechError] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS["en-IN"];

  // Initialize greeting whenever modal opens or language changes
  useEffect(() => {
    if (messages.length === 0 || messages[0]?.id === "welcome") {
      setMessages([
        {
          id: "welcome",
          sender: "ai",
          text: t.chatGreeting,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "WELCOME"
        }
      ]);
    }
  }, [currentLang, t.chatGreeting]);

  // Handle incoming initialQuery
  useEffect(() => {
    if (initialQuery && initialQuery.trim()) {
      handleUserSubmit(initialQuery.trim());
    }
  }, [initialQuery]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isListening]);

  // Cleanup speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
      if (recognitionRef.current) {
        try { recognitionRef.current.abort(); } catch {}
      }
    };
  }, []);

  // Voice Recognition (Speech-to-Text)
  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechError("Speech recognition is supported in Chrome, Edge & Safari. You can also type!");
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    setSpeechError("");
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = currentLang;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      setInputText(transcript);
    };

    recognition.onerror = (event) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
      if (event.error === "not-allowed") {
        setSpeechError("Microphone permission was denied. Please allow microphone access.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (e) {
      console.warn(e);
      setIsListening(false);
    }
  };

  // Text-to-Speech (TTS)
  const handleToggleSpeak = (text, idx) => {
    if (activeSpeechIdx === idx) {
      stopSpeaking();
      setActiveSpeechIdx(null);
      setIsSpeaking(false);
    } else {
      stopSpeaking();
      setActiveSpeechIdx(idx);
      setIsSpeaking(true);
      speakText(text, currentLang);
    }
  };

  const handleUserSubmit = (overrideText) => {
    const query = (overrideText || inputText).trim();
    if (!query) return;

    // Add user message
    const userMsg = {
      id: "usr-" + Date.now(),
      sender: "user",
      text: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInputText("");

    // Simulate AI thinking and response
    setTimeout(() => {
      const response = generateAiAssistantResponse(query, currentLang);
      const aiMsg = {
        id: "ai-" + Date.now(),
        sender: "ai",
        text: response.message,
        payload: response,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      setMessages([...nextMessages, aiMsg]);

      // Speak automatically if user used voice
      if (isListening || overrideText) {
        speakText(response.message, currentLang);
        setActiveSpeechIdx(nextMessages.length);
      }
    }, 450);
  };

  const handleAutofill = (triageData) => {
    if (onAutofillComplaint) {
      onAutofillComplaint(triageData);
    }
  };

  const QUICK_PROMPTS = [
    { label: "🚰 पानी की पाइप लाइन टूट गई है", text: "हमारे इलाके में मुख्य पेयजल पाइपलाइन फूट गई है और बहुत सारा पानी सड़क पर बह रहा है।" },
    { label: "⚡ రోడ్డుపై కరెంట్ వైర్లు తెగిపడ్డాయి", text: "మా కాలనీలో రోడ్డుపై లైవ్ కరెంట్ వైర్ తెగిపడింది, వెంటనే ప్రమాదం జరగకముందే సరిచేయండి." },
    { label: "☀️ PM Surya Ghar: Free Solar", text: "What is PM Surya Ghar Muft Bijli Yojana? How can I get 300 units free solar electricity?" },
    { label: "🏥 Ayushman Bharat Golden Card", text: "How to check eligibility and apply for Ayushman Bharat PM-JAY ₹5 Lakh health cover?" },
    { label: "🗑️ Garbage dump not cleared", text: "Municipal garbage container overflowing with trash for 4 days near the market." }
  ];

  if (!isOpen) return null;

  return (
    <div className={`jm-ai-backdrop ${isMinimized ? "minimized" : ""}`}>
      <div className={`jm-ai-card ${isMinimized ? "card-minimized" : ""}`}>
        {/* Header */}
        <div className="jm-ai-header">
          <div className="jm-ai-header-left">
            <div className="jm-ai-avatar">
              <Bot size={22} className="jm-bot-icon" />
              <span className="jm-status-dot online"></span>
            </div>
            <div>
              <div className="jm-ai-title-row">
                <h3 className="jm-ai-name">JanMitra AI Saathi</h3>
                <span className="jm-ai-tag">Multilingual Copilot</span>
              </div>
              <p className="jm-ai-subtitle">
                Civic Grievance Triage & Welfare Scheme Advisor
              </p>
            </div>
          </div>

          <div className="jm-ai-header-actions">
            {/* Language dropdown in AI modal */}
            <div className="jm-ai-lang-select">
              <Languages size={15} />
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                aria-label="Agent Language"
              >
                {SUPPORTED_LANGUAGES.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.nativeName} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              className="jm-ai-ctrl-btn"
              onClick={() => setIsMinimized(!isMinimized)}
              title={isMinimized ? "Maximize" : "Minimize"}
            >
              {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
            </button>

            <button
              type="button"
              className="jm-ai-ctrl-btn"
              onClick={() => {
                stopSpeaking();
                onClose();
              }}
              title="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Body / Chat Stream */}
        {!isMinimized && (
          <>
            <div className="jm-ai-body">
              {messages.map((msg, idx) => (
                <div key={msg.id || idx} className={`jm-msg-bubble-wrap ${msg.sender}`}>
                  {msg.sender === "ai" && (
                    <div className="jm-msg-avatar">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className="jm-msg-content">
                    <div className="jm-msg-text">
                      {msg.text.split("\n\n").map((para, pIdx) => (
                        <p key={pIdx}>
                          {para.split("\n").map((line, lIdx) => (
                            <span key={lIdx}>
                              {line}
                              {lIdx < para.split("\n").length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>

                    {/* Interactive Complaint Triage Card */}
                    {msg.payload?.type === "COMPLAINT_DRAFT" && (
                      <div className="jm-triage-card">
                        <div className="jm-triage-header">
                          <span className="jm-triage-badge">
                            <Sparkles size={13} /> Official Grievance Draft Ready
                          </span>
                          <span className={`jm-priority-pill ${msg.payload.triage.priority}`}>
                            Priority: {msg.payload.triage.priority}
                          </span>
                        </div>

                        <div className="jm-triage-details">
                          <div className="jm-triage-row">
                            <span className="lbl">Classification:</span>
                            <span className="val bold">{msg.payload.triage.category}</span>
                          </div>
                          <div className="jm-triage-row">
                            <span className="lbl">Assigned Authority:</span>
                            <span className="val">{msg.payload.triage.department}</span>
                          </div>
                          <div className="jm-triage-row">
                            <span className="lbl">Guaranteed SLA:</span>
                            <span className="val highlight">{msg.payload.triage.sla}</span>
                          </div>
                          <div className="jm-triage-row">
                            <span className="lbl">Generated Title:</span>
                            <span className="val">{msg.payload.triage.title}</span>
                          </div>
                        </div>

                        <div className="jm-triage-actions">
                          <button
                            type="button"
                            className="jm-btn-autofill"
                            onClick={() => handleAutofill(msg.payload.triage)}
                          >
                            <FileText size={15} />
                            <span>Autofill into Complaint Form</span>
                            <ArrowRight size={14} />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Interactive Scheme Cards inside Chat */}
                    {msg.payload?.type === "SCHEME_RECOMMENDATION" && msg.payload.schemes && (
                      <div className="jm-schemes-chat-list">
                        {msg.payload.schemes.slice(0, 2).map((s) => (
                          <div key={s.id} className="jm-scheme-chat-card">
                            <div className="jm-scheme-chat-head">
                              <div>
                                <span className="jm-scheme-ministry">{s.ministry}</span>
                                <h4 className="jm-scheme-chat-title">{s.name}</h4>
                              </div>
                              <span className="jm-benefit-chip">{s.benefitAmount}</span>
                            </div>
                            <p className="jm-scheme-chat-desc">{s.benefitSummary}</p>
                            <div className="jm-scheme-chat-meta">
                              <span><strong>Eligible:</strong> {s.eligibility.targetGroup}</span>
                              <span><strong>Helpline:</strong> {s.helpline}</span>
                            </div>
                            <div className="jm-scheme-chat-btns">
                              <a
                                href={s.portalUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="jm-btn-apply-direct"
                              >
                                <span>Official Portal</span>
                                <ExternalLink size={13} />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Audio & Time Footer */}
                    <div className="jm-msg-footer">
                      <span className="jm-msg-time">{msg.time}</span>
                      {msg.sender === "ai" && (
                        <button
                          type="button"
                          className={`jm-tts-btn ${activeSpeechIdx === idx ? "active" : ""}`}
                          onClick={() => handleToggleSpeak(msg.text, idx)}
                          title="Listen in regional voice"
                        >
                          {activeSpeechIdx === idx ? (
                            <>
                              <VolumeX size={14} />
                              <span>Stop Audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 size={14} />
                              <span>Listen</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompts */}
            <div className="jm-ai-quick-prompts">
              <span className="jm-quick-lbl">Suggestions:</span>
              <div className="jm-quick-scroll">
                {QUICK_PROMPTS.map((qp, i) => (
                  <button
                    key={i}
                    type="button"
                    className="jm-quick-chip"
                    onClick={() => handleUserSubmit(qp.text)}
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice listening status banner */}
            {isListening && (
              <div className="jm-listening-wave-bar">
                <div className="jm-wave-bars">
                  <span className="bar b1"></span>
                  <span className="bar b2"></span>
                  <span className="bar b3"></span>
                  <span className="bar b4"></span>
                  <span className="bar b5"></span>
                </div>
                <span>{t.listening}</span>
                <button
                  type="button"
                  className="jm-stop-voice-btn"
                  onClick={toggleListening}
                >
                  <MicOff size={14} />
                  <span>Done</span>
                </button>
              </div>
            )}

            {speechError && <div className="jm-speech-err">{speechError}</div>}

            {/* Input Form */}
            <div className="jm-ai-input-wrap">
              <button
                type="button"
                className={`jm-voice-btn ${isListening ? "active pulse" : ""}`}
                onClick={toggleListening}
                title={isListening ? "Stop listening" : "Tap and speak in your language"}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <input
                type="text"
                className="jm-chat-input"
                placeholder={t.placeholderChat}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleUserSubmit();
                  }
                }}
              />

              <button
                type="button"
                className="jm-send-btn"
                disabled={!inputText.trim()}
                onClick={() => handleUserSubmit()}
                title="Send"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
