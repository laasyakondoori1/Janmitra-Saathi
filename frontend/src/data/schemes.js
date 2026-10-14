export const SCHEME_CATEGORIES = [
  { id: "ALL", name: "All Schemes", icon: "Landmark" },
  { id: "HEALTH", name: "Health & Wellness", icon: "HeartPulse" },
  { id: "HOUSING", name: "Housing & Shelter", icon: "Home" },
  { id: "AGRICULTURE", name: "Agriculture & Farmers", icon: "Sprout" },
  { id: "ENERGY", name: "Clean Energy & Power", icon: "SunMedium" },
  { id: "WOMEN_CHILD", name: "Women & Child Care", icon: "Users" },
  { id: "PENSION", name: "Social Security & Pension", icon: "ShieldCheck" },
  { id: "EDUCATION", name: "Education & Youth", icon: "GraduationCap" },
  { id: "FINANCE", name: "Loans & Small Business", icon: "Wallet" },
];

export const GOVT_SCHEMES = [
  {
    id: "pm-jay",
    name: "Ayushman Bharat - PMJAY",
    tagline: "World's largest government-funded healthcare assurance scheme",
    category: "HEALTH",
    ministry: "Ministry of Health & Family Welfare",
    benefitAmount: "₹5,00,000 / year",
    benefitSummary: "Cashless secondary and tertiary healthcare hospitalization cover per family per year at empaneled hospitals across India.",
    eligibility: {
      incomeBracket: "BPL / Low Income / SECC listed",
      ageRange: "All ages eligible",
      occupations: ["Daily wage worker", "Small Farmer", "Artisan", "Unorganized sector", "BPL household"],
      targetGroup: "Deprived rural & identified occupational urban families"
    },
    documents: [
      "Aadhaar Card of all family members",
      "Ration Card / SECC Household Letter",
      "Active Mobile Number",
      "Age & Address Proof"
    ],
    helpline: "14555 / 1800-111-565",
    portalUrl: "https://beneficiary.nha.gov.in",
    isPopular: true,
    regionalSummaries: {
      "hi-IN": "प्रति परिवार प्रति वर्ष ₹5 लाख तक का मुफ्त कैशलेस इलाज देश भर के सरकारी और निजी सूचीबद्ध अस्पतालों में।",
      "te-IN": "దేశవ్యాప్తంగా ఎంప్యానెల్ చేయబడిన ఆసుపత్రులలో ప్రతి కుటుంబానికి సంవత్సరానికి ₹5 లక్షల వరకు ఉచిత నగదు రహిత చికిత్స."
    },
    howToApply: "Visit your nearest CSC (Common Service Center) or empaneled hospital with Aadhaar and Ration Card to generate Ayushman Golden Card instantly."
  },
  {
    id: "pm-surya-ghar",
    name: "PM Surya Ghar: Muft Bijli Yojana",
    tagline: "Free electricity up to 300 units/month via rooftop solar subsidy",
    category: "ENERGY",
    ministry: "Ministry of New and Renewable Energy",
    benefitAmount: "Up to ₹78,000 Subsidy",
    benefitSummary: "Central subsidy of ₹30,000 for 1kW, ₹60,000 for 2kW, and ₹78,000 for 3kW+ rooftop solar systems plus up to 300 units free power every month.",
    eligibility: {
      incomeBracket: "Any residential electricity consumer",
      ageRange: "18+ years (Household head)",
      occupations: ["All homeowners"],
      targetGroup: "Individual residential households with suitable rooftop area"
    },
    documents: [
      "Electricity Bill (Recent 6 months)",
      "Rooftop Ownership Document / House Tax receipt",
      "Aadhaar Card",
      "Bank Account Passbook (for direct subsidy transfer)"
    ],
    helpline: "15555 / 011-2436-0707",
    portalUrl: "https://pmsuryaghar.gov.in",
    isPopular: true,
    regionalSummaries: {
      "hi-IN": "छत पर सोलर पैनल लगाने के लिए ₹78,000 तक की सरकारी सब्सिडी और हर महीने 300 यूनिट तक मुफ्त बिजली।",
      "te-IN": "రూఫ్‌టాప్ సోలార్ ప్యానెల్స్ కొరకు ₹78,000 వరకు సబ్సిడీ మరియు నెలకు 300 యూనిట్ల వరకు ఉచిత విద్యుత్."
    },
    howToApply: "Register on pmsuryaghar.gov.in with your consumer account number and DISCOM provider. Select an empaneled vendor."
  },
  {
    id: "pm-kisan",
    name: "PM Kisan Samman Nidhi",
    tagline: "Direct income support of ₹6,000 annually to all farming families",
    category: "AGRICULTURE",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefitAmount: "₹6,000 / year",
    benefitSummary: "Three equal quarterly installments of ₹2,000 directly transferred into the Aadhaar-seeded bank accounts of land-holding farmer families.",
    eligibility: {
      incomeBracket: "Small & Marginal Farmers",
      ageRange: "18+ years",
      occupations: ["Cultivator", "Small Farmer", "Agricultural Land Owner"],
      targetGroup: "All landholder farmer families with cultivable land holdings"
    },
    documents: [
      "Land Ownership Documents (Khata / RoR / Patta)",
      "Aadhaar Card",
      "Bank Account Details (Aadhaar linked NPCI)",
      "Citizenship proof"
    ],
    helpline: "155261 / 011-24300606",
    portalUrl: "https://pmkisan.gov.in",
    isPopular: true,
    regionalSummaries: {
      "hi-IN": "किसान परिवारों को हर साल ₹6,000 की नकद सहायता सीधे बैंक खाते में 3 बराबर किश्तों (₹2000-₹2000) में।",
      "te-IN": "రైతు కుటుంబాలకు ఏటా ₹6,000 ఆర్థిక సహాయం 3 విడతల్లో నేరుగా వారి బ్యాంకు ఖాతాల్లో జమ చేయబడుతుంది."
    },
    howToApply: "Apply online at pmkisan.gov.in under 'New Farmer Registration' or visit the local Revenue/CSC office."
  },
  {
    id: "pm-awas-urban",
    name: "Pradhan Mantri Awas Yojana (PMAY-U 2.0)",
    tagline: "Affordable pucca houses with basic amenities for urban families",
    category: "HOUSING",
    ministry: "Ministry of Housing and Urban Affairs",
    benefitAmount: "₹1.5 Lakh to ₹2.67 Lakh Subsidy",
    benefitSummary: "Interest subsidy on home loans up to ₹2.67 Lakh or direct central assistance of ₹1.5 Lakh for construction of pucca homes for EWS/LIG families.",
    eligibility: {
      incomeBracket: "EWS (up to ₹3L/yr), LIG (₹3L-₹6L/yr), MIG (₹6L-₹12L/yr)",
      ageRange: "21-70 years",
      occupations: ["Urban low-income workers", "Daily wage earners", "Salaried", "Self-employed"],
      targetGroup: "Families not owning a pucca house anywhere in India"
    },
    documents: [
      "Aadhaar Card and PAN Card",
      "Income Certificate / Salary Slip / ITR",
      "Affidavit of not owning a pucca house",
      "Land title / Construction permission (if beneficiary-led)"
    ],
    helpline: "011-2306-0484 / 011-2306-3285",
    portalUrl: "https://pmay-urban.gov.in",
    isPopular: true,
    regionalSummaries: {
      "hi-IN": "शहरी गरीब और मध्यम वर्गीय परिवारों के लिए पक्का मकान बनाने या खरीदने पर ₹2.67 लाख तक की होम लोन ब्याज सब्सिडी।",
      "te-IN": "పట్టణ ప్రాంత పేద, మధ్యతరగతి కుటుంబాలకు సొంతింటి కల సాకారానికి గృహ నిర్మాణ సబ్సిడీ మరియు వడ్డీ రాయితీ."
    },
    howToApply: "Submit an application through your Urban Local Body (ULB) / Municipality or online at pmay-urban.gov.in."
  },
  {
    id: "pm-ujjwala",
    name: "Pradhan Mantri Ujjwala Yojana 2.0",
    tagline: "Free LPG connections for women from low-income households",
    category: "WOMEN_CHILD",
    ministry: "Ministry of Petroleum and Natural Gas",
    benefitAmount: "Free LPG Connection + ₹300 Subsidy/cylinder",
    benefitSummary: "Free LPG gas connection with first cylinder and stove provided at zero cost, plus ₹300 targeted subsidy per 14.2kg cylinder refill (up to 12 refills/year).",
    eligibility: {
      incomeBracket: "Below Poverty Line (BPL)",
      ageRange: "Women aged 18+ years",
      occupations: ["Homemaker / Low-income family head"],
      targetGroup: "Adult women belonging to poor households without existing LPG connection"
    },
    documents: [
      "Aadhaar Card of the applicant and adult family members",
      "Ration card supporting family composition",
      "Bank Account Number and IFSC Code",
      "Self-declaration for migrant families"
    ],
    helpline: "1906 / 1800-266-6696",
    portalUrl: "https://pmuy.gov.in",
    isPopular: false,
    regionalSummaries: {
      "hi-IN": "गरीब महिलाओं को मुफ्त गैस कनेक्शन, पहला भरा सिलेंडर और चूल्हा बिल्कुल मुफ्त, साथ ही ₹300 प्रति सिलेंडर सब्सिडी।",
      "te-IN": "పేద మహిళలకు ఉచిత గ్యాస్ కనెక్షన్, మొదటి రీఫిల్ మరియు స్టవ్ ఉచితం, ప్రతి సిలిండర్‌పై ₹300 సబ్సిడీ."
    },
    howToApply: "Apply online at pmuy.gov.in or submit the 1-page form at any nearest Indane, Bharatgas, or HP Gas distributor."
  },
  {
    id: "pm-vishwakarma",
    name: "PM Vishwakarma Scheme",
    tagline: "Holistic support for traditional artisans, carpenters, weavers and masons",
    category: "FINANCE",
    ministry: "Ministry of Micro, Small and Medium Enterprises",
    benefitAmount: "₹3 Lakh Loan at 5% + ₹15,000 Toolkit",
    benefitSummary: "Skill verification, 5-7 days basic training with ₹500/day stipend, ₹15,000 free toolkit incentive, and collateral-free loan up to ₹3,00,000 at concessional 5% interest.",
    eligibility: {
      incomeBracket: "Traditional trades / Artisans",
      ageRange: "18+ years",
      occupations: ["Carpenter", "Blacksmith", "Potter", "Sculptor", "Cobbler", "Mason", "Barber", "Washerman", "Tailor", "Fisherman"],
      targetGroup: "18 recognized traditional family-based trades"
    },
    documents: [
      "Aadhaar Card and Mobile Number",
      "Bank Account Details",
      "Ration Card",
      "Skill Verification from Gram Panchayat or ULB"
    ],
    helpline: "1800-267-7777 / 011-2306-1500",
    portalUrl: "https://pmvishwakarma.gov.in",
    isPopular: true,
    regionalSummaries: {
      "hi-IN": "18 पारंपरिक कारीगरों (बढ़ई, लोहार, कुम्हार, दर्जी आदि) को ₹15,000 का टूलकिट और 5% ब्याज पर ₹3 लाख तक का लोन।",
      "te-IN": "చేతివృత్తుల కళాకారులకు (వడ్రంగి, కమ్మరి, కుమ్మరి, టైలర్ మొదలైన 18 వృత్తులు) ₹15,000 ఉచిత టూల్‌కిట్ మరియు ₹3 లక్షల సులభ రుణం."
    },
    howToApply: "Visit any CSC kiosk with Aadhaar and bank details for biometric verification and trade registration."
  },
  {
    id: "sukanya-samriddhi",
    name: "Sukanya Samriddhi Yojana (SSY)",
    tagline: "Highest interest small-savings scheme for the girl child's education & future",
    category: "WOMEN_CHILD",
    ministry: "Ministry of Finance",
    benefitAmount: "8.2% Compound Interest + Tax Free",
    benefitSummary: "High interest rate of 8.2% per annum, triple tax exemption under Sec 80C (EEE status), minimum deposit ₹250/year, matures at age 21.",
    eligibility: {
      incomeBracket: "Any Indian citizen parent/guardian",
      ageRange: "Girl child below 10 years of age",
      occupations: ["All citizens"],
      targetGroup: "Parents or legal guardians of female child"
    },
    documents: [
      "Birth Certificate of the girl child",
      "Identity Proof of Parent/Guardian (Aadhaar / PAN)",
      "Address Proof",
      "Passport size photograph"
    ],
    helpline: "1800-266-6868",
    portalUrl: "https://www.indiapost.gov.in",
    isPopular: false,
    regionalSummaries: {
      "hi-IN": "10 वर्ष से कम उम्र की बेटियों के लिए 8.2% का उच्च ब्याज, शिक्षा और विवाह के लिए सुरक्षित भविष्य, पूर्ण कर छूट।",
      "te-IN": "10 సంవత్సరాల లోపు ఆడపిల్లల భవిష్యత్తు కోసం 8.2% అత్యధిక వడ్డీతో పోస్టాఫీస్ పొదుపు పథకం, పూర్తి పన్ను మినహాయింపు."
    },
    howToApply: "Open an account at any Post Office or authorized commercial bank branch with the child's birth certificate."
  },
  {
    id: "pm-svanidhi",
    name: "PM Street Vendor's AtmaNirbhar Nidhi (PM SVANidhi)",
    tagline: "Affordable working capital loans for urban street vendors",
    category: "FINANCE",
    ministry: "Ministry of Housing and Urban Affairs",
    benefitAmount: "₹10,000 to ₹50,000 Micro-credit",
    benefitSummary: "Initial working capital loan of ₹10,000, stepping up to ₹20,000 and ₹50,000 upon timely repayment, with 7% interest subsidy and cashback on digital transactions.",
    eligibility: {
      incomeBracket: "Urban Street Vendors",
      ageRange: "18+ years",
      occupations: ["Street vendor", "Hawker", "Fruit/Vegetable seller", "Food stall operator"],
      targetGroup: "Vendors engaged in street vending in urban and peri-urban areas"
    },
    documents: [
      "Vending Certificate / Letter of Recommendation (LoR)",
      "Aadhaar Card",
      "Bank Account details",
      "Mobile number linked to Aadhaar"
    ],
    helpline: "1800-111-979",
    portalUrl: "https://pmsvanidhi.mohua.gov.in",
    isPopular: false,
    regionalSummaries: {
      "hi-IN": "सड़क किनारे रेहड़ी-पटरी विक्रेताओं के लिए ₹10,000 से ₹50,000 तक का बिना गारंटी सस्ता लोन और 7% ब्याज सब्सिडी।",
      "te-IN": "వీధి వ్యాపారుల కోసం ₹10,000 నుండి ₹50,000 వరకు పూచీకత్తు లేని రుణం మరియు 7% వడ్డీ రాయితీ."
    },
    howToApply: "Apply online at pmsvanidhi.mohua.gov.in or through Urban Local Bodies and local banking correspondents."
  },
  {
    id: "atal-pension",
    name: "Atal Pension Yojana (APY)",
    tagline: "Guaranteed monthly lifetime pension for unorganized sector citizens",
    category: "PENSION",
    ministry: "Ministry of Finance (PFRDA)",
    benefitAmount: "₹1,000 to ₹5,000 Monthly Pension",
    benefitSummary: "Guaranteed pension of ₹1,000 to ₹5,000 per month upon reaching 60 years of age, depending on contribution amount, backed by Government of India guarantee.",
    eligibility: {
      incomeBracket: "Non-income tax payers",
      ageRange: "18 to 40 years old",
      occupations: ["Unorganized workers", "Self-employed", "Farmers", "Daily workers", "Domestic helpers"],
      targetGroup: "Citizens in unorganized sectors without formal pension benefits"
    },
    documents: [
      "Bank / Post Office Savings Account",
      "Aadhaar Card",
      "Mobile Number for SMS updates",
      "Nominee details"
    ],
    helpline: "1800-110-069",
    portalUrl: "https://www.npscra.nsdl.co.in",
    isPopular: false,
    regionalSummaries: {
      "hi-IN": "असंगठित क्षेत्र के कामगारों के लिए 60 वर्ष की आयु के बाद हर महीने ₹1,000 से ₹5,000 की आजीवन सरकारी पेंशन।",
      "te-IN": "అసంఘటిత రంగ కార్మికుల కోసం 60 సంవత్సరాల వయస్సు దాటిన తర్వాత నెలకు ₹1,000 నుండి ₹5,000 వరకు జీవితాంతం ప్రభుత్వ పెన్షన్."
    },
    howToApply: "Visit your bank branch where you have an account or register through your mobile banking netbanking portal."
  },
  {
    id: "national-scholarship",
    name: "National Scholarship Portal (NSP / Pre & Post Matric)",
    tagline: "One-stop financial assistance for students from minority & underprivileged backgrounds",
    category: "EDUCATION",
    ministry: "Ministry of Social Justice / Education / Minority Affairs",
    benefitAmount: "₹2,500 to ₹25,000 / year",
    benefitSummary: "Direct scholarship grant to students from Class 1 to Ph.D. level covering tuition fees, maintenance allowance, and book stipends.",
    eligibility: {
      incomeBracket: "Family income under ₹2.5 Lakh / year",
      ageRange: "School / College students (6 - 28 years)",
      occupations: ["Student"],
      targetGroup: "SC, ST, OBC, Minority, and economically weaker section students"
    },
    documents: [
      "Previous Year Marks Sheet (>50% marks)",
      "Income Certificate of parents",
      "Caste / Community Certificate",
      "Student Bank Account Passbook",
      "Bonafide Student Certificate from school/college"
    ],
    helpline: "0120-6619540",
    portalUrl: "https://scholarships.gov.in",
    isPopular: false,
    regionalSummaries: {
      "hi-IN": "कक्षा 1 से लेकर उच्च शिक्षा तक के योग्य छात्रों को फीस और पढ़ाई के खर्च के लिए ₹2,500 से ₹25,000 प्रति वर्ष छात्रवृत्ति।",
      "te-IN": "పాఠశాల మరియు కళాశాల విద్యార్థులకు విద్యాభ్యాస ఖర్చుల కొరకు ప్రతి సంవత్సరం స్కాలర్‌షిప్ ఆర్థిక సహాయం."
    },
    howToApply: "Register on scholarships.gov.in, complete OTR (One Time Registration) with Aadhaar, and submit institute verification."
  },
  {
    id: "jal-jeevan-mission",
    name: "Jal Jeevan Mission (Har Ghar Jal)",
    tagline: "Clean, safe, pressurized tap water connection to every rural home",
    category: "HOUSING",
    ministry: "Ministry of Jal Shakti",
    benefitAmount: "100% Free Household Tap Connection",
    benefitSummary: "Provides functional household tap connection (FHTC) providing 55 liters per capita per day of potable quality water on regular basis.",
    eligibility: {
      incomeBracket: "All rural households",
      ageRange: "All ages",
      occupations: ["Rural residents"],
      targetGroup: "Rural households across India without clean tap water access"
    },
    documents: [
      "Aadhaar Card",
      "Village / Gram Panchayat proof of residence"
    ],
    helpline: "1800-180-1551",
    portalUrl: "https://jaljeevanmission.gov.in",
    isPopular: false,
    regionalSummaries: {
      "hi-IN": "हर ग्रामीण परिवार के घर में नल से शुद्ध और सुरक्षित पीने का पानी उपलब्ध कराने की राष्ट्रीय योजना।",
      "te-IN": "ప్రతి గ్రామీణ కుటుంబానికి ఇంటి వద్దకే నల్లా ద్వారా స్వచ్ఛమైన తాగునీటి సరఫరా అందించే పథకం."
    },
    howToApply: "Contact your Gram Panchayat Water and Sanitation Committee (VWSC) or local Jal Nigam authority."
  }
];
