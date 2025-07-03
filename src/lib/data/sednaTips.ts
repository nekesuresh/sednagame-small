export interface SednaTip {
  id: number;
  tip: string;
  caseStudy: string;
}

export const sednaTips: SednaTip[] = [
  {
    id: 1,
    tip: 'AI chatbots can significantly improve multilingual customer service and accessibility by using sentiment detection and voice integration.',
    caseStudy: 'Team Sedna developed a multilingual, AI-powered chatbot capable of detecting over five languages. It adjusted tone based on user sentiment, escalated negative interactions to human agents, and integrated voice output for accessibility. This improved first-response time by 60% and supported quality in low-literacy segments.'
  },
  {
    id: 2,
    tip: 'AI-enhanced traffic signal systems can increase safety and efficiency through real-time vehicle detection and adaptive control.',
    caseStudy: 'Team Sedna developed an adaptive traffic signal system using YOLOv5 computer vision models to detect vehicles and estimate speed in under 50ms. The system dynamically adjusted signal timing based on traffic behavior, achieving 99.9% uptime, zero pedestrian injuries, and a 30+ vehicle per cycle increase in throughput.'
  },
  {
    id: 3,
    tip: 'AI-driven hiring platforms reduce time-to-hire and improve candidate-role matching by automating screening and onboarding.',
    caseStudy: 'Team Sedna built a secure, AI-powered hiring system that automated sourcing, screening, onboarding, and interviews. The platform featured compatibility scoring, data purging, background checks, and compliance protections. It reduced average time-to-hire by 60% and passed audits without a single compliance violation.'
  },
  {
    id: 4,
    tip: 'Real-time, AI-based data security enforcement can dramatically reduce the risk of data exfiltration attacks.',
    caseStudy: 'A national cybersecurity agency facing advanced persistent threats deployed Team Sedna-integrated Deep-AI enforcement. Despite prior use of traditional tools (DLP, CASB), data breaches persisted until this rollout. Within weeks, the agency achieved zero malicious exfiltrations and reduced total cost of ownership by 62%.'
  },
  {
    id: 5,
    tip: 'AI adoption in government benefits from structured governance frameworks that include ethics, transparency, and compliance tools.',
    caseStudy: 'Sedna developed an AI governance framework for public-sector clients with policies covering fairness, audit logging, risk mitigation, and model lifecycle management. These frameworks aligned with the U.S. AI Bill of Rights and ensured ethical, secure deployment across departments.'
  },
  {
    id: 6,
    tip: 'Enterprise-wide AI readiness assessments help organizations identify workflow gaps, infrastructure needs, and staff training priorities.',
    caseStudy: 'For a large private client, Team Sedna conducted an AI readiness evaluation covering estimating tools, compatibility with platforms like ChatGPT, and role-based training. The outcome included a phased roadmap, ChatGPT-based automation, estimator training, and continuous learning resources—valued at $175,000.'
  },
  {
    id: 7,
    tip: 'Developing internal AI policy and governance helps large organizations prioritize use cases and ensure ethical compliance.',
    caseStudy: 'Team Sedna provided AI consulting to help a major company develop a standardized internal AI policy, roadmap, and ethical safeguards. This included prioritizing AI use cases, reviewing existing solutions, and establishing long-term governance—an ongoing engagement valued at $200,000.'
  },
  {
    id: 8,
    tip: 'AI-based data protection tools can safeguard sensitive IP, design files, and financial data across international teams.',
    caseStudy: 'Team Sedna led a global data protection engagement covering the U.S., UK, Israel, India, and China. The focus was on protecting intellectual property, financials, and design documentation with scalable enforcement mechanisms—valued at $1.32 million.'
  },
  {
    id: 9,
    tip: 'Justice sector AI deployments require customized policies to address governance, ethics, and risk across the offender lifecycle.',
    caseStudy: 'Team Sedna created an AI playbook and compliance tools for justice and public safety organizations. The effort included policy drafting, ethics training, and validation by IJIS members. The result improved leaders\' understanding of AI regulations and risk mitigation best practices.'
  },
  {
    id: 10,
    tip: 'Automated classification, encryption, and access controls are critical to enterprise-level data security strategies.',
    caseStudy: 'Team Sedna supported a $1.12 million data protection platform rollout that included DLP enforcement, automated classification, exfiltration prevention, and CyberSOC integration. The system safeguarded sensitive communication across email, web, and internal channels.'
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
