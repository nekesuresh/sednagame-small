export interface SednaTip {
  id: number;
  tip: string;
  caseStudy: string;
}

export const sednaTips: SednaTip[] = [
  {
    id: 1,
    tip: "Sedna helped a national cybersecurity agency stop data leaks using AI, achieving zero malicious exfiltrations for three years.",
    caseStudy: "A national Cybersecurity Agency facing repeated data exfiltration attacks partnered with Sedna to deploy GhangorCloud's AI-driven Information Security Enforcer (ISE). Despite prior investments in DLP and CASB, threats persisted until Sedna integrated the ISE for real-time protection. Within weeks, the agency saw 100% threat prevention, reduced total cost of ownership by 62%, and maintained zero exfiltrations over three years."
  },
  {
    id: 2,
    tip: "Sedna built an AI chatbot that supports 98% accurate multilingual help—no wait times, no confusion.",
    caseStudy: "A public sector client needed to support diverse residents with accessible, responsive customer service. Sedna delivered a multilingual AI-powered chatbot with 98% language detection accuracy, sentiment-aware responses, and optional voice support. It slashed wait times by 60%, improved satisfaction, and enabled 24/7 engagement with encryption and data protection built-in."
  },
  {
    id: 3,
    tip: "Sedna helped a city use AI and sensors to adjust traffic lights in real time—keeping cars and pedestrians safer.",
    caseStudy: "To fix congestion and safety issues caused by outdated timers, a city adopted Sedna's AI-driven adaptive traffic signal system. Using edge-deployed YOLOv5 models, sensors, and pedestrian alerts, the system adjusted lights dynamically based on real-time conditions. The result: 30+ extra vehicles moved per cycle, 99.9% uptime, and zero pedestrian injuries."
  },
  {
    id: 4,
    tip: "Sedna automated a city's hiring process using AI, cutting hiring time by 60% and reducing HR workload.",
    caseStudy: "A local government HR department faced long hiring cycles and compliance issues. Sedna built a secure AI-powered hiring platform that automated sourcing, screening, and onboarding, including AI chat-based interviews and job-fit scoring. The platform reduced time-to-hire by 60%, improved match quality, and passed compliance audits with no violations."
  },
  {
    id: 5,
    tip: "Sedna helped a construction team test AI for estimates—then automated high-impact sales tasks like lead follow-ups.",
    caseStudy: "Sedna conducted an AI readiness assessment for a construction firm, evaluating estimate workflows and infrastructure. They developed a phased roadmap, piloted AI-assisted estimating with ChatGPT, and automated lead qualification and follow-ups. Sedna also designed a training program and quality control framework. The engagement, valued at $175,000, continues successfully."
  },
  {
    id: 6,
    tip: "Sedna designed AI policy and training for a large organization—ensuring ethics and compliance from day one.",
    caseStudy: "A large enterprise partnered with Sedna to build a responsible, compliant AI program. Sedna created an AI roadmap, defined governance structures, and reviewed existing tools for ethical use. Services included advisory sessions, policy writing, and safeguards for data use. The project—valued at $200,000—established long-term AI standards and best practices."
  },
  {
    id: 7,
    tip: "Sedna stopped global data leaks for a client in 5 countries using smart AI-powered security.",
    caseStudy: "A multinational organization relied on Sedna for data protection across the U.S., UK, Israel, India, and China. Sedna safeguarded IP, financials, and sensitive designs using advanced AI tools. Their solution enforced encryption, access control, and data classification, helping the client avoid breaches. The global engagement was valued at $1.32 million."
  },
  {
    id: 8,
    tip: "Sedna helped counties predict traffic jams and bus delays with AI-powered transit analytics.",
    caseStudy: "To improve mobility, Sedna deployed AI systems that analyze camera, ridership, and weather data to manage transit and roads. Models predicted congestion, rerouted traffic, and optimized maintenance schedules. Local governments saw improved service reliability and safety, while riders experienced better on-time performance."
  },
  {
    id: 9,
    tip: "Sedna built tools to help counties stop insider threats and protect resident data across departments.",
    caseStudy: "Sedna implemented AI-driven cybersecurity across county systems, helping agencies prevent insider threats, enforce HIPAA and CCPA rules, and protect sensitive resident information. Real-time data monitoring and AI-based anomaly detection ensured secure operations and reduced data breach risks."
  },
  {
    id: 10,
    tip: "Sedna created permit-processing AI that speeds up approvals and cuts paperwork headaches.",
    caseStudy: "Counties struggling with backlog in permits and licenses used Sedna's GenAI-powered automation system. It read, validated, and processed requests while complying with privacy laws. Built-in audit trails and redaction tools ensured transparency. The result: faster processing, less staff burden, and improved public satisfaction."
  },
  {
    id: 11,
    tip: "Sedna helped a justice sector group create an AI Playbook to avoid bias and stay compliant.",
    caseStudy: "Justice organizations needed AI guidance to separate useful tools from exaggerated claims. Sedna authored the AI Playbook, provided policy samples, and supported federal compliance. Through workshops and case vetting, agencies learned how to apply AI ethically, improve fairness, and understand system limits."
  },
  {
    id: 12,
    tip: "Sedna brought AI hiring tools to government HR—making screening faster and fairer.",
    caseStudy: "For civil service HR, Sedna launched an AI-powered platform that automated screening, job-matching, and onboarding. Features included skill tracking, equity checks, and rule-based logic tailored to government hiring practices. Agencies reduced admin burden and improved retention with fairer hiring processes."
  },
  {
    id: 13,
    tip: "Sedna worked with Chicago's emergency services to improve 311 and dispatch using smart tech and feedback loops.",
    caseStudy: "In Chicago, Sedna enhanced 311 Contact Centers and the Computer-Aided Dispatch (CAD) system by identifying key stakeholders, improving communications, and enabling feedback integration. These AI-aligned strategies improved response times, coordination, and system efficiency across emergency support channels."
  },
  {
    id: 14,
    tip: "Sedna helped Illinois boost health services by training staff across departments on smarter IT systems.",
    caseStudy: "Sedna developed training programs for Illinois Health & Human Services, helping staff navigate IT systems that support public care. Training spanned multiple departments and built digital fluency for long-term service delivery improvements—laying the foundation for future AI-supported systems."
  },
  {
    id: 15,
    tip: "Sedna helped Pittsburgh get AI-ready by comparing its systems to top-performing cities.",
    caseStudy: "For the City of Pittsburgh and Department of Education IT, Sedna ran a comparative benchmarking project. It assessed the city's AI and digital readiness, identifying performance gaps and opportunities. The outcome: clear, data-driven recommendations that supported smarter planning and investment decisions."
  }
];

export function getRandomTip(): SednaTip {
  return sednaTips[Math.floor(Math.random() * sednaTips.length)];
}

export function getTipById(id: number): SednaTip | undefined {
  return sednaTips.find(tip => tip.id === id);
}

/* export function getTipsByCategory(category: string): SednaTip[] {
  return sednaTips.filter(tip => tip.category === category);
}

export function getTipsByDifficulty(difficulty: 'easy' | 'medium' | 'hard'): SednaTip[] {
  return sednaTips.filter(tip => tip.difficulty === difficulty);
}*/
