// Multi-lingual Civic AI Agent for JanMitra ("JanSeva AI Saathi")
// Handles regional language complaint extraction, triage, department routing, and scheme recommendations.

import { GOVT_SCHEMES } from "../data/schemes";

export const SUPPORTED_LANGUAGES = [
  { code: "en-IN", name: "English", nativeName: "English", flag: "🇮🇳" },
  { code: "hi-IN", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "te-IN", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta-IN", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "bn-IN", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "mr-IN", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "kn-IN", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "gu-IN", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
];

export const UI_TRANSLATIONS = {
  "en-IN": {
    welcome: "Welcome to JanMitra",
    tagline: "Empowering every citizen through AI civic grievance redressal and welfare awareness.",
    fileComplaint: "Report Civic Issue",
    browseSchemes: "Explore Govt Schemes",
    aiSaathi: "JanMitra AI Saathi",
    askAi: "Ask Multilingual AI",
    myComplaints: "My Complaints",
    adminDashboard: "Authority Portal",
    trackStatus: "Track Complaint Status",
    voiceInput: "Tap to Speak",
    listening: "Listening in your language…",
    stopListening: "Done Speaking",
    quickHelplines: "Emergency Helplines",
    schemeEligibilityQuiz: "Find Schemes For Me",
    resolvedCases: "Resolved Grievances",
    slaGuarantee: "Citizen Charter SLA",
    chatGreeting: "Namaste! I am JanMitra AI Saathi. Speak or write in your regional language. I will help you file a formal complaint or find welfare schemes you are eligible for.",
    placeholderChat: "Type or speak your problem (e.g. 'Street light broken for 3 days' or 'Tell me about solar subsidy')…",
  },
  "hi-IN": {
    welcome: "जनमित्र में आपका स्वागत है",
    tagline: "एआई नागरिक शिकायत निवारण और सरकारी योजनाओं की जानकारी से सशक्त नागरिक।",
    fileComplaint: "नागरिक समस्या दर्ज करें",
    browseSchemes: "सरकारी योजनाएं देखें",
    aiSaathi: "जनमित्र एआई साथी",
    askAi: "एआई सहायक से बात करें",
    myComplaints: "मेरी शिकायतें",
    adminDashboard: "अधिकारी पोर्टल",
    trackStatus: "शिकायत की स्थिति जांचें",
    voiceInput: "बोलकर बताएं",
    listening: "आपकी भाषा सुन रहा हूँ…",
    stopListening: "बोलना समाप्त",
    quickHelplines: "आपातकालीन हेल्पलाइन",
    schemeEligibilityQuiz: "पात्र योजनाएं खोजें",
    resolvedCases: "हल की गई समस्याएं",
    slaGuarantee: "नागरिक चार्टर समय सीमा",
    chatGreeting: "नमस्ते! मैं आपका जनमित्र एआई साथी हूँ। आप अपनी मातृभाषा में बोलकर या लिखकर अपनी समस्या बता सकते हैं। मैं आपकी शिकायत दर्ज कराने और सरकारी योजनाओं की जानकारी देने में मदद करूँगा।",
    placeholderChat: "अपनी समस्या लिखें या बोलें (उदा. 'हमारे मोहल्ले में 3 दिन से बिजली नहीं आ रही' या 'पीएम आवास योजना क्या है')…",
  },
  "te-IN": {
    welcome: "జనమిత్రకు స్వాగతం",
    tagline: "ఏఐ సాంకేతికతతో ప్రజా సమస్యల పరిష్కారం మరియు ప్రభుత్వ సంక్షేమ పథకాల మార్గదర్శి.",
    fileComplaint: "సమస్యను నమోదు చేయండి",
    browseSchemes: "ప్రభుత్వ పథకాలు చూడండి",
    aiSaathi: "జనమిత్ర ఏఐ సాయకుడు",
    askAi: "ఏఐ అసిస్టెంట్‌తో మాట్లాడండి",
    myComplaints: "నా ఫిర్యాదులు",
    adminDashboard: "అధికారుల డ్యాష్‌బోర్డ్",
    trackStatus: "ఫిర్యాదు స్థితి చూడండి",
    voiceInput: "మాట్లాడి చెప్పండి",
    listening: "మీ భాష వింటున్నాను…",
    stopListening: "ముగించండి",
    quickHelplines: "అత్యవసర హెల్ప్‌లైన్లు",
    schemeEligibilityQuiz: "నాకు సరిపోయే పథకాలు",
    resolvedCases: "పరిష్కరించబడిన సమస్యలు",
    slaGuarantee: "పౌర సేవా గడువు",
    chatGreeting: "నమస్కారం! నేను మీ జనమిత్ర ఏఐ సహాయకుడిని. మీ సమస్యను మీ మాతృభాషలో మాట్లాడి లేదా టైప్ చేసి చెప్పండి. మీ ఫిర్యాదును సరిగ్గా నమోదు చేయడంలో మరియు ప్రభుత్వ పథకాలను పొందడంలో నేను మీకు సహాయం చేస్తాను.",
    placeholderChat: "మీ సమస్యను రాయండి లేదా మాట్లాడండి (ఉదా. 'మా వీధిలో పైపులైన్ పగిలి నీరు వృధా అవుతోంది' లేదా 'ఆయుష్మాన్ భారత్ ఎలా పొందాలి')…",
  },
  "ta-IN": {
    welcome: "ஜன்மித்ராவிற்கு நல்வரவு",
    tagline: "AI மூலம் மக்கள் குறைதீர்ப்பு மற்றும் அரசு திட்டங்கள் வழிகாட்டி.",
    fileComplaint: "புகார் பதிவு செய்க",
    browseSchemes: "அரசு நலத்திட்டங்கள்",
    aiSaathi: "ஜன்மித்ரா AI தோழன்",
    askAi: "AI உதவியாளரிடம் கேளுங்கள்",
    myComplaints: "எனது புகார்கள்",
    adminDashboard: "அதிகாரிகள் தளம்",
    trackStatus: "புகார் நிலை அறிய",
    voiceInput: "பேசி பதிவு செய்க",
    listening: "கேட்கிறது…",
    stopListening: "பேசி முடிந்தது",
    quickHelplines: "அவசர எண்கள்",
    schemeEligibilityQuiz: "எனக்கான திட்டங்கள்",
    resolvedCases: "தீர்க்கப்பட்ட புகார்கள்",
    slaGuarantee: "குடிமக்கள் உரிமை சாசனம்",
    chatGreeting: "வணக்கம்! நான் உங்கள் ஜன்மித்ரா AI உதவியாளர். உங்கள் குறைகளை உங்கள் தாய்மொழியில் பேசுங்கள் அல்லது எழுதுங்கள். அரசு திட்டங்கள் அறியவும் நான் உதவுகிறேன்.",
    placeholderChat: "உங்கள் பிரச்சனையை தமிழில் சொல்லுங்கள் அல்லது தட்டச்சு செய்யுங்கள்…",
  },
  "bn-IN": {
    welcome: "জনমিত্রে আপনাকে স্বাগত",
    tagline: "নাগরিক সমস্যা সমাধান ও সরকারি যোজনা সচেতনতায় এআই সহকারী।",
    fileComplaint: "অভিযোগ দায়ের করুন",
    browseSchemes: "সরকারি প্রকল্পসমূহ",
    aiSaathi: "জনমিত্র এআই সাথি",
    askAi: "এআই সহকারীর সাথে কথা বলুন",
    myComplaints: "আমার অভিযোগ",
    adminDashboard: "প্রশাসনিক পোর্টাল",
    trackStatus: "অভিযোগের স্থিতি",
    voiceInput: "মুখে বলুন",
    listening: "শুনছি…",
    stopListening: "বলা শেষ",
    quickHelplines: "জরুরী হেল্পলাইন",
    schemeEligibilityQuiz: "আমার উপযোগী প্রকল্প",
    resolvedCases: "সমাধানকৃত সমস্যা",
    slaGuarantee: "নাগরিক সনদ সময়সীমা",
    chatGreeting: "নমস্কার! আমি জনমিত্র এআই সাথী। আপনার নিজস্ব ভাষায় সমস্যার কথা বলুন বা লিখুন। আমি অভিযোগ দায়ের এবং সরকারি প্রকল্প খুঁজে পেতে সহায়তা করব।",
    placeholderChat: "আপনার সমস্যা লিখুন বা বলুন…",
  },
  "mr-IN": {
    welcome: "जनमित्र मध्ये आपले स्वागत आहे",
    tagline: "एआय नागरिक तक्रार निवारण आणि शासकीय योजनांची माहिती.",
    fileComplaint: "तक्रार नोंदवा",
    browseSchemes: "शासकीय योजना",
    aiSaathi: "जनमित्र एआय मित्र",
    askAi: "एआय सहाय्यकाशी बोला",
    myComplaints: "माझ्या तक्रारी",
    adminDashboard: "अधिकारी कक्ष",
    trackStatus: "तक्रारीची स्थिती",
    voiceInput: "बोलून सांगा",
    listening: "ऐकत आहे…",
    stopListening: "बोलणे पूर्ण",
    quickHelplines: "आपत्कालीन क्रमांक",
    schemeEligibilityQuiz: "माझ्यासाठी योजना",
    resolvedCases: "सोडवलेल्या तक्रारी",
    slaGuarantee: "नागरिक सनद मुदत",
    chatGreeting: "नमस्कार! मी तुमचा जनमित्र एआय सहाय्यक आहे. तुमची तक्रार तुमच्या भाषेत बोला किंवा लिहा. मी शासकीय योजना शोधण्यातही मदत करतो.",
    placeholderChat: "तुमची समस्या लिहा किंवा बोला…",
  },
  "kn-IN": {
    welcome: "ಜನಮಿತ್ರಕ್ಕೆ ಸ್ವಾಗತ",
    tagline: "ಎಐ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ನಾಗರಿಕ ದೂರು ಪರಿಹಾರ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಮಾಹಿತಿ.",
    fileComplaint: "ದೂರು ದಾಖಲಿಸಿ",
    browseSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    aiSaathi: "ಜನಮಿತ್ರ ಎಐ ಮಿತ್ರ",
    askAi: "ಎಐ ಜೊತೆ ಮಾತನಾಡಿ",
    myComplaints: "ನನ್ನ ದೂರುಗಳು",
    adminDashboard: "ಅಧಿಕಾರಿಗಳ ಪೋರ್ಟಲ್",
    trackStatus: "ದೂರಿನ ಸ್ಥಿತಿ ಪರಿಶೀಲಿಸಿ",
    voiceInput: "ಮಾತನಾಡಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ…",
    stopListening: "ಮುಗಿಯಿತು",
    quickHelplines: "ತುರ್ತು ಸಹಾಯವಾಣಿ",
    schemeEligibilityQuiz: "ನನಗೆ ಸೂಕ್ತ ಯೋಜನೆಗಳು",
    resolvedCases: "ಪರಿಹರಿಸಲಾದ ದೂರುಗಳು",
    slaGuarantee: "ನಾಗರಿಕ ಸನ್ನದು ಅವಧಿ",
    chatGreeting: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಜನಮಿತ್ರ ಎಐ ಸಹಾಯಕಿ. ನಿಮ್ಮ ಮಾತೃಭಾಷೆಯಲ್ಲಿ ಮಾತನಾಡಿ ಅಥವಾ ಬರೆದು ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ತಿಳಿಸಿ.",
    placeholderChat: "ನಿಮ್ಮ ಸಮಸ್ಯೆಯನ್ನು ಬರೆಯಿರಿ ಅಥವಾ ಮಾತನಾಡಿ…",
  },
  "gu-IN": {
    welcome: "જનમિત્રમાં આપનું સ્વાગત છે",
    tagline: "એઆઈ દ્વારા નાગરિક ફરિયાદ નિવારણ અને સરકારી યોજનાઓની માહિતી.",
    fileComplaint: "ફરિયાદ નોંધાવો",
    browseSchemes: "સરકારી યોજનાઓ",
    aiSaathi: "જનમિત્ર એઆઈ સાથી",
    askAi: "એઆઈ સાથે વાત કરો",
    myComplaints: "મારી ફરિયાદો",
    adminDashboard: "અધિકારી પોર્ટલ",
    trackStatus: "ફરિયાદ સ્થિતિ તપાસો",
    voiceInput: "બોલીને જણાવો",
    listening: "સાંભળી રહ્યો છું…",
    stopListening: "સમાપ્ત",
    quickHelplines: "ઇમરજન્સી હેલ્પલાઇન",
    schemeEligibilityQuiz: "મારા માટે યોગ્ય યોજનાઓ",
    resolvedCases: "ઉકેલાયેલી ફરિયાદો",
    slaGuarantee: "નાગરિક ચાર્ટર સમયમર્યાદા",
    chatGreeting: "નમસ્તે! હું તમારો જનમિત્ર એઆઈ સાથી છું. તમારી માતૃભાષામાં તમારી સમસ્યા જણાવો. હું ફરિયાદ નોંધવામાં અને યોજનાઓ મેળવવામાં મદદ કરીશ.",
    placeholderChat: "તમારી સમસ્યા લખો અથવા બોલો…",
  }
};

// Natural regional analysis dictionary for high accuracy triage
const CATEGORY_RULES = {
  GARBAGE: {
    dept: "Municipal Sanitation & Waste Management",
    sla: "24 Hours",
    keywords: [
      "garbage", "trash", "waste", "dustbin", "litter", "dump", "filth", "stench", "rotting", "dead animal", "debris",
      // Hindi
      "कचरा", "कूड़ा", "गंदगी", "बदबू", "सफाई", "डस्टबिन", "सड़ा", "मरा हुआ जानवर", "कूड़ेदान",
      // Telugu
      "చెత్త", "దుర్వాసన", "కుళ్ళిపోయిన", "డస్ట్‌బిన్", "మురికి", "శానిటేషన్", "చెత్తకుండీ",
      // Tamil
      "குப்பை", "நாற்றம்", "அழுக்கு", "துப்புரவு",
      // Bengali
      "আবর্জনা", "ময়লা", "পচা", "দুর্গন্ধ",
      // Marathi
      "कचरा", "घाण", "दुर्गंधी", "कचराकुंडी",
    ]
  },
  ROAD: {
    dept: "Public Works Department (PWD & Municipal Roads)",
    sla: "48 Hours",
    keywords: [
      "pothole", "road", "footpath", "traffic", "crater", "broken road", "asphalt", "flyover", "speed breaker", "divider",
      // Hindi
      "सड़क", "गड्ढा", "खड्डा", "फुटपाथ", "जाम", "रोड", "टूटी सड़क", "स्पीड ब्रेकर", "रास्ता",
      // Telugu
      "రోడ్డు", "గుంత", "కంకర", "ఫుట్‌పాత్", "ట్రాఫిక్", "రోడ్", "బ్రేకర్", "దారి",
      // Tamil
      "சாலை", "குழி", "நடைபாதை", "போக்குவரத்து",
      // Bengali
      "রাস্তা", "গর্ত", "ফুটপাথ",
      // Marathi
      "रस्ता", "खड्डा", "फुटपाथ", "वाहतूक",
    ]
  },
  WATER: {
    dept: "City Jal Board & Sewerage Water Authority",
    sla: "24 Hours",
    keywords: [
      "water", "pipeline", "leak", "drain", "sewage", "drinking water", "manhole", "contamination", "overflow", "muddy water",
      // Hindi
      "पानी", "लीकेज", "पाइप", "सीवर", "नाली", "गंदा पानी", "जल", "नल", "पीने का पानी", "मैनहोल",
      // Telugu
      "నీరు", "పైపులైన్", "లీకేజ్", "మురుగునీరు", "తాగునీరు", "నల్లా", "కాలువ", "డ్రైనేజీ", "మ్యాన్‌హోల్",
      // Tamil
      "தண்ணீர்", "குழாய்", "கழிவுநீர்", "வடிகால்",
      // Bengali
      "জল", "নল", "পাইপ", "ড্রেন", "পয়ঃনিষ্কাশন",
      // Marathi
      "पाणी", "गळती", "पाईप", "सांडपाणी", "गटार", "पिण्याचे पाणी",
    ]
  },
  ELECTRICITY: {
    dept: "State Electricity Distribution Corp (DISCOM)",
    sla: "12 Hours (Urgent) / 24 Hours",
    keywords: [
      "electric", "power", "wire", "voltage", "blackout", "streetlight", "street light", "transformer", "pole", "sparking", "shock",
      // Hindi
      "बिजली", "करंट", "तार", "लाइट", "स्ट्रीट लाइट", "खंभा", "ट्रांसफार्मर", "अंधेरा", "कटौती", "शॉर्ट सर्किट",
      // Telugu
      "కరెంట్", "విద్యుత్", "వైర్", "స్ట్రీట్ లైట్", "స్తంభం", "ట్రాన్స్‌ఫార్మర్", "చీకటి", "పవర్ కట్", "స్పార్క్",
      // Tamil
      "மின்சாரம்", "மின்விளக்கு", "மின்கம்பி", "இருட்டு",
      // Bengali
      "বিদ্যুৎ", "কারেন্ট", "তার", "ট্রান্সফরমার", "আলো",
      // Marathi
      "वीज", "लाईट", "वायर", "स्ट्रीट लाईट", "खांब", "अंधार", "शॉर्ट सर्किट",
    ]
  },
  HEALTH: {
    dept: "District Health & Epidemic Control Cell",
    sla: "24 Hours",
    keywords: [
      "hospital", "clinic", "doctor", "medicine", "dengue", "malaria", "mosquito", "phc", "ambulance", "food poisoning",
      // Hindi
      "अस्पताल", "दवाई", "मच्छर", "डेंगू", "मलेरिया", "बीमारी", "डॉक्टर", "स्वास्थ्य केंद्र",
      // Telugu
      "ఆసుపత్రి", "మందులు", "దోమలు", "డెంగ్యూ", "మలేరియా", "డాక్టర్", "ఆరోగ్య కేంద్రం",
      // Tamil
      "மருத்துவமனை", "மருந்து", "கொசு",
      // Bengali
      "হাসপাতাল", "ওষুধ", "মশা", "ডেঙ্গু",
      // Marathi
      "रुग्णालय", "औषध", "डास", "डेंग्यू", "डॉक्टर",
    ]
  }
};

const HIGH_PRIORITY_KEYWORDS = [
  "danger", "dangerous", "urgent", "emergency", "accident", "live wire", "open manhole", "fire", "spark", "sparking",
  "explosion", "falling", "death", "child injured", "overflowing sewage", "toxic", "poisonous", "flooded",
  // Hindi
  "खतरा", "तुरंत", "आपातकालीन", "दुर्घटना", "नंगा तार", "खुला मैनहोल", "आग", "शॉर्ट सर्किट", "जहरीला", "गंभीर",
  // Telugu
  "ప్రమాదం", "వెంటనే", "అత్యవసరం", "యాక్సిడెంట్", "కరెంట్ షాక్", "తెరిచి ఉన్న మ్యాన్‌హోల్", "మంటలు", "తీవ్రమైన",
  // Tamil
  "ஆபத்து", "உடனே", "அவசரம்", "விபத்து",
  // Marathi
  "धोका", "तातडीने", "अपघात", "जीवंत वायर", "उघडी गटार"
];

// Scheme keywords mapping for citizen awareness
const SCHEME_TRIGGERS = [
  {
    schemeId: "pm-jay",
    triggers: ["health insurance", "ayushman", "hospital bill", "cashless treatment", "card", "मुफ्त इलाज", "आयुष्मान", "अस्पताल का खर्चा", "उచిత వైద్యం", "ఆయుష్మాన్ భారత్", "గోల్డెన్ కార్డు"]
  },
  {
    schemeId: "pm-surya-ghar",
    triggers: ["solar", "rooftop solar", "free electricity", "power bill", "bijli bill", "सोलर", "मुफ्त बिजली", "रूफटॉप", "बिजली बिल ज्यादा", "సోలార్ ప్యానెల్", "ఉచిత కరెంట్", "కరెంట్ బిల్లు"]
  },
  {
    schemeId: "pm-kisan",
    triggers: ["kisan", "farmer", "agriculture loan", "crop", "samman nidhi", "किसान", "खेती", "फसल", "రైతు", "వ్యవసాయం", "రైతు భరోసా", "పిఎం కిసాన్"]
  },
  {
    schemeId: "pm-awas-urban",
    triggers: ["house", "housing", "pucca house", "home loan subsidy", "pmay", "मकान", "घर", "आवास योजना", "पक्का घर", "ఇల్లు", "సొంతింటి కల", "పిఎం ఆవాస్"]
  },
  {
    schemeId: "pm-ujjwala",
    triggers: ["gas cylinder", "lpg connection", "gas subsidy", "chulha", "सिलेंडर", "गैस कनेक्शन", "उज्ज्वला", "గ్యాస్ సిలిండర్", "ఉచిత గ్యాస్"]
  },
  {
    schemeId: "pm-vishwakarma",
    triggers: ["artisan", "carpenter", "tailor", "blacksmith", "toolkit", "artisan loan", "कारीगर", "बढ़ई", "दर्जी", "लोहार", "टूलकिट", "చేతివృత్తులు", "వడ్రంగి", "టైలర్", "టూల్‌కిట్"]
  },
  {
    schemeId: "sukanya-samriddhi",
    triggers: ["daughter", "girl child", "education fund for daughter", "sukanya", "बेटी", "सुकन्या समृद्धि", "कन्या", "ఆడపిల్ల", "సుకన్య సమృద్ధి"]
  },
  {
    schemeId: "pm-svanidhi",
    triggers: ["street vendor", "thela", "hawker", "vendor loan", "svanidhi", "रेहड़ी", "पटरी", "ठेला", "स्ट्रीट वेंडर", "వీధి వ్యాపారి", "చిరు వ్యాపారం"]
  },
  {
    schemeId: "atal-pension",
    triggers: ["pension", "old age pension", "retirement", "पेंशन", "वृद्धावस्था पेंशन", "పెన్షన్", "వృద్ధాప్య పింఛన్"]
  },
  {
    schemeId: "national-scholarship",
    triggers: ["scholarship", "student aid", "college fee", "matric", "छात्रवृत्ति", "स्कॉलरशिप", "विद्यार्थी", "స్కాలర్‌షిప్", "చదువు ఖర్చులు"]
  }
];

export function triageComplaintLocally(text) {
  const lower = (text || "").toLowerCase();
  
  // 1. Detect Category
  let detectedCategory = "OTHER";
  let maxMatches = 0;
  let detectedDept = "General Civic Administration";
  let detectedSla = "48 Hours";

  for (const [catKey, rule] of Object.entries(CATEGORY_RULES)) {
    let matches = 0;
    for (const kw of rule.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        matches++;
      }
    }
    if (matches > maxMatches) {
      maxMatches = matches;
      detectedCategory = catKey;
      detectedDept = rule.dept;
      detectedSla = rule.sla;
    }
  }

  // 2. Detect Priority
  let priority = "MEDIUM";
  for (const hk of HIGH_PRIORITY_KEYWORDS) {
    if (lower.includes(hk.toLowerCase())) {
      priority = "HIGH";
      break;
    }
  }

  // 3. Generate structured official title
  let generatedTitle = "";
  if (detectedCategory === "ROAD") generatedTitle = "Road & Pavement Defect / Hazardous Pothole";
  else if (detectedCategory === "WATER") generatedTitle = "Water Supply Disruption / Pipeline Leakage";
  else if (detectedCategory === "ELECTRICITY") generatedTitle = "Power Infrastructure Breakdown / Electrical Hazard";
  else if (detectedCategory === "GARBAGE") generatedTitle = "Solid Waste Overflow & Public Sanitation Failure";
  else if (detectedCategory === "HEALTH") generatedTitle = "Public Health Hazard & Mosquito Vector Infestation";
  else generatedTitle = "Civic Infrastructure Grievance";

  // If user provided a short title or first phrase, adapt it
  const words = text.trim().split(/\s+/);
  if (words.length <= 8 && words.length >= 2) {
    generatedTitle = text.trim();
  }

  return {
    category: detectedCategory,
    department: detectedDept,
    priority,
    sla: detectedSla,
    title: generatedTitle,
    summary: text.length > 120 ? text.substring(0, 120) + "…" : text,
  };
}

export function findMatchingSchemesByQuery(query) {
  const lower = (query || "").toLowerCase();
  const matched = [];

  for (const item of SCHEME_TRIGGERS) {
    const hits = item.triggers.some((t) => lower.includes(t.toLowerCase()));
    if (hits) {
      const found = GOVT_SCHEMES.find((s) => s.id === item.schemeId);
      if (found && !matched.some((m) => m.id === found.id)) {
        matched.push(found);
      }
    }
  }

  // Also check direct scheme name and categories
  if (matched.length === 0) {
    for (const s of GOVT_SCHEMES) {
      if (
        lower.includes(s.name.toLowerCase()) ||
        lower.includes(s.category.toLowerCase()) ||
        lower.includes(s.benefitSummary.toLowerCase())
      ) {
        matched.push(s);
      }
    }
  }

  return matched;
}

export function generateAiAssistantResponse(userMessage, currentLang = "en-IN") {
  const lower = (userMessage || "").toLowerCase();

  // 1. Check if user is asking about or matches a welfare scheme
  const matchedSchemes = findMatchingSchemesByQuery(userMessage);
  if (matchedSchemes.length > 0) {
    const primary = matchedSchemes[0];
    const regionalSummary = primary.regionalSummaries?.[currentLang] || primary.benefitSummary;
    
    let text = "";
    if (currentLang === "hi-IN") {
      text = `आपके प्रश्न के अनुसार यह सरकारी योजना सबसे उपयुक्त है: **${primary.name}**।\n\n📌 **लाभ:** ${primary.benefitAmount} - ${regionalSummary}\n\n📋 **पात्रता:** ${primary.eligibility.targetGroup} (${primary.eligibility.incomeBracket})\n\n📄 **आवश्यक दस्तावेज:** ${primary.documents.slice(0, 3).join(", ")}\n\n📞 **आधिकारिक हेल्पलाइन:** ${primary.helpline}\n\nक्या आप इस योजना के लिए पात्रता चेक करना चाहते हैं या शिकायत दर्ज करना चाहते हैं?`;
    } else if (currentLang === "te-IN") {
      text = `మీ అభ్యర్థన ప్రకారం ఈ ప్రభుత్వ పథకం మీకు సహాయపడుతుంది: **${primary.name}**।\n\n📌 **ప్రయోజనం:** ${primary.benefitAmount} - ${regionalSummary}\n\n📋 **అర్హత:** ${primary.eligibility.targetGroup}\n\n📄 **కావలసిన పత్రాలు:** ${primary.documents.slice(0, 3).join(", ")}\n\n📞 **హెల్ప్‌లైన్ నంబర్:** ${primary.helpline}\n\nమీరు ఈ పథకానికి అర్హతను పరిశీలించాలనుకుంటున్నారా లేదా ఏదైనా సమస్యపై ఫిర్యాదు చేయాలనుకుంటున్నారా?`;
    } else {
      text = `Based on your request, you may benefit from **${primary.name}** (${primary.ministry}).\n\n📌 **Key Benefit:** ${primary.benefitAmount} — ${primary.benefitSummary}\n\n📋 **Who is Eligible:** ${primary.eligibility.targetGroup}\n\n📄 **Key Documents Needed:** ${primary.documents.slice(0, 3).join(", ")}\n\n📞 **Official Helpline:** ${primary.helpline}\n\nWould you like me to guide you to the official portal or check your eligibility criteria?`;
    }

    return {
      type: "SCHEME_RECOMMENDATION",
      schemes: matchedSchemes,
      message: text,
      action: "VIEW_SCHEME",
    };
  }

  // 2. Check if user describes a complaint or civic issue
  const triage = triageComplaintLocally(userMessage);
  const isLikelyComplaint =
    triage.category !== "OTHER" ||
    lower.includes("complaint") ||
    lower.includes("problem") ||
    lower.includes("issue") ||
    lower.includes("शिकायत") ||
    lower.includes("समस्या") ||
    lower.includes("ఫిర్యాదు") ||
    lower.includes("సమస్య");

  if (isLikelyComplaint) {
    let text = "";
    if (currentLang === "hi-IN") {
      text = `मैंने आपकी समस्या का विश्लेषण कर लिया है:\n\n🏷️ **श्रेणी:** ${triage.category}\n🏢 **संबंधित विभाग:** ${triage.department}\n⚠️ **प्राथमिकता:** ${triage.priority === "HIGH" ? "उच्च (तुरंत कार्रवाई)" : "मध्यम"}\n⏱️ **नागरिक चार्टर समय सीमा:** ${triage.sla}\n\nमैंने आपकी शिकायत का प्रारूप तैयार कर लिया है। 'फॉर्म में भरें' बटन दबाकर इसे तुरंत आधिकारिक रूप से दर्ज करें।`;
    } else if (currentLang === "te-IN") {
      text = `నేను మీ సమస్యను గుర్తించి వివరాలను సిద్ధం చేశాను:\n\n🏷️ **విభాగం:** ${triage.category}\n🏢 **సంబంధిత శాఖ:** ${triage.department}\n⚠️ **ప్రాధాన్యత:** ${triage.priority === "HIGH" ? "అత్యవసరం (హై)" : "మధ్యస్థం"}\n⏱️ **పరిష్కార గడువు:** ${triage.sla}\n\nమీ ఫిర్యాదు డ్రాఫ్ట్ సిద్ధంగా ఉంది. 'ఫారమ్‌లో నింపండి' క్లిక్ చేసి వెంటనే ప్రభుత్వ అధికారులకు సమర్పించండి.`;
    } else {
      text = `I have analyzed your civic issue:\n\n🏷️ **Category:** ${triage.category}\n🏢 **Assigned Dept:** ${triage.department}\n⚠️ **Triage Priority:** ${triage.priority}\n⏱️ **Citizen Charter SLA:** ${triage.sla}\n\nI have prepared the complaint draft. Click 'Autofill Form' below to submit it directly to city authorities.`;
    }

    return {
      type: "COMPLAINT_DRAFT",
      triage: {
        ...triage,
        description: userMessage,
      },
      message: text,
      action: "AUTOFILL_FORM",
    };
  }

  // 3. General greeting or query
  let fallback = "";
  if (currentLang === "hi-IN") {
    fallback = `नमस्ते! मैं जनमित्र एआई साथी हूँ। आप मुझे किसी भी नागरिक समस्या (जैसे पानी की लीकेज, सड़क के गड्ढे, बिजली की समस्या, कचरा) के बारे में बता सकते हैं, या आयुष्मान भारत, पीएम आवास, पीएम सूर्य घर जैसी सरकारी योजनाओं की जानकारी ले सकते हैं। बोलें या लिखें!`;
  } else if (currentLang === "te-IN") {
    fallback = `నమస్కారం! నేను జనమిత్ర ఏఐ సాయకుడిని. తాగునీటి సరఫరా, కరెంట్ సమస్యలు, రోడ్డు గుంతలు, చెత్త సమస్యలపై ఫిర్యాదు చేయడానికి లేదా ఆయుష్మాన్ భారత్, పిఎం ఆవాస్, సోలార్ స్కీమ్స్ వంటి ప్రభుత్వ పథకాల గురించి తెలుసుకోవడానికి నన్ను అడగండి!`;
  } else {
    fallback = `Hello! I am your JanMitra AI Assistant. You can describe any civic problem (like water leakages, road potholes, streetlight outages, garbage dumps) to automatically register a complaint, or ask me about welfare schemes like Ayushman Bharat, PM Surya Ghar, and PM Awas Yojana.`;
  }

  return {
    type: "GENERAL_GUIDANCE",
    message: fallback,
    action: null,
  };
}

// Text to Speech in Regional Language
export function speakText(text, lang = "en-IN") {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel(); // Stop any previous speech

  const cleanText = text.replace(/[*#_`]/g, ""); // strip markdown
  const utterance = new SpeechSynthesisUtterance(cleanText);
  utterance.lang = lang;
  utterance.rate = 0.95;
  utterance.pitch = 1.0;

  // Try to pick native voice if available
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find((v) => v.lang.startsWith(lang.split("-")[0]));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
