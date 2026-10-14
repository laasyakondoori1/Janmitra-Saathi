# JanMitra (जनमित्र) — AI-Powered Civic Empowerment & Welfare Portal

[![React](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Spring Boot](https://img.shields.io/badge/Backend-Spring%20Boot%203-6DB33F?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**JanMitra** is a modern civic empowerment platform designed for Indian citizens and municipal authorities. It bridges the gap between public grievance redressal and government welfare awareness through an AI-powered multilingual assistant, automated triage, and citizen charter SLA tracking.

---

## 🌟 Key Features

### 1. 🤖 JanMitra AI Saathi (जनमित्र साथी)
- **Multilingual Voice & Text AI:** Supports 8 Indian languages: **Hindi (हिन्दी)**, **Telugu (తెలుగు)**, **Tamil (தமிழ்)**, **Bengali (বাংলা)**, **Marathi (मराठी)**, **Kannada (ಕನ್ನಡ)**, **Gujarati (ગુજરાતી)**, and **English**.
- **Speech Recognition (STT):** Citizens can report civic issues by speaking into their microphone in their native regional language with real-time waveform feedback.
- **Speech Synthesis (TTS):** Responses are spoken back using natural regional accents, ensuring accessibility for non-literate citizens.
- **Intelligent Triage & Routing:** Automatically classifies issues (*Road, Water, Electricity, Sanitation, Health*), detects urgency (*High / Medium*), routes to the appropriate municipal department, and calculates Citizen Charter SLAs (12h, 24h, 48h).
- **1-Click Autofill:** Converts regional voice input into formal government complaints with one-click form autofill.

### 2. 🏛️ JanKalyan Government Schemes Directory
- **Comprehensive Welfare Catalog:** Detailed information on major Central and State schemes:
  - **Ayushman Bharat (PM-JAY):** ₹5,00,000/year free hospital assurance.
  - **PM Surya Ghar Muft Bijli Yojana:** Up to ₹78,000 rooftop solar subsidy + 300 free units/month.
  - **PM Kisan Samman Nidhi:** ₹6,000/year direct cash transfer for farmers.
  - **Pradhan Mantri Awas Yojana (PMAY-U 2.0):** Affordable housing and loan interest subsidies.
  - **PM Vishwakarma:** Collateral-free loans and ₹15,000 toolkits for traditional artisans.
  - **PM SVANidhi:** Micro-credit loans for urban street vendors.
  - **Sukanya Samriddhi Yojana:** High-interest savings scheme for girl children.
  - **Atal Pension Yojana:** Guaranteed monthly lifetime pensions.
  - **Jal Jeevan Mission:** Tap water connectivity for rural households.
- **30-Second Welfare Eligibility Finder Quiz:** A 3-step interactive questionnaire that calculates matching schemes and total estimated financial benefits.
- **Application Guidance:** Direct links to official portals, required document checklists, and toll-free helplines.

### 3. 📝 Citizen Grievance Portal
- **Interactive Form:** Title suggestion chips, voice description, GPS auto-locate with Google Maps coordinates, photo upload with client-side canvas compression.
- **4-Stage Citizen Charter Progress Stepper:**
  $$\text{Lodged} \longrightarrow \text{AI Triage \& Dept Assigned} \longrightarrow \text{Field Inspection Dispatched} \longrightarrow \text{Resolved}$$
- **Audit History:** Full timeline of official inspector notes and timestamped updates.
- **Satisfaction Rating:** 1 to 5 star citizen feedback upon resolution.

### 4. 🏢 Department Authority & Admin Dashboard
- **City Operations Control:** Real-time KPI statistics (*Total complaints, Pending review, In Progress, Resolved*).
- **Workflow Management:** Update ticket status, reassign departments, and append official audit remarks visible in citizen timelines.
- **Quick Demo Role Switcher:** Toggle between Citizen and Official mode with a single click.

### 5. 🌟 Civic Transparency & Social Audit Feed
- Neighborhood impact stories showcasing verified before/after resolutions across municipal wards.
- Citizen applause / upvote mechanism.
- Citywide SLA compliance transparency scorecard (94.2% on-time resolution).

### 6. 🚨 Emergency & Public Utilities Helplines
- Quick-access modal with one-click tap-to-call and copy number capabilities for **112**, Police **100**, Fire **101**, Ambulance **108**, Women Safety **1091**, Childline **1098**, Electricity **1912**, Water **1916**, and Cyber Crime **1930**.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+) & **npm**
- **Java** (JDK 17 or higher) & **Apache Maven**
- **MongoDB** (running locally on port 27017 or a MongoDB Atlas URI)

---

### Step 1: Start Backend (Spring Boot 3)
```bash
cd backend
mvn spring-boot:run
```
The backend starts at `http://localhost:8080`.
- MongoDB URI defaults to: `mongodb://localhost:27017/janmitra`
- Default Admin Login: `admin@janmitra.in` / `admin123`

---

### Step 2: Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Open **`http://localhost:5173/`** in your browser.

---

## 🏗️ Project Architecture

```
janmitra/
├── backend/
│   ├── src/main/java/com/janmitra/
│   │   ├── model/          # Complaint & User MongoDB documents
│   │   ├── repo/           # Spring Data repositories
│   │   ├── security/       # JWT Auth filter & Spring Security config
│   │   ├── service/        # AI Service (triage, keyword classification)
│   │   └── web/            # REST controllers (Auth, Complaints, Admin)
│   ├── src/main/resources/ # application.properties
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── components/     # Navbar, HeroBanner, SchemesPortal, ComplaintPortal,
    │   │                   # AdminPortal, AiSaathiModal, CivicFeed, HelplinesModal
    │   ├── data/           # Government schemes dataset & emergency helplines
    │   ├── services/       # Multilingual AI copilot, speech recognition & TTS
    │   ├── api.js          # Resilient API layer with offline fallback
    │   ├── styles.css      # Design system with glassmorphism & responsive layout
    │   └── App.jsx         # Main application controller
    ├── index.html
    └── vite.config.js
```

---

## 📄 License
This project is licensed under the MIT License.
