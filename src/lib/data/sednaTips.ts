export interface SednaTip {
  id: number;
  tip: string;
  caseStudy: string;
  // Add logo fields for future use
  logoBlack?: string;
  logoWhite?: string;
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
  },
  {
    id: 11,
    tip: "Anchor AI initiatives in specific operational challenges. Don't lead with AI—lead with inefficiency. Identify one recurring bottleneck (e.g., delays in case assignment, repetitive data entry, citizen wait times) that burdens staff or reduces service quality. Use data and staff input to validate the pain point.",
    caseStudy: "Sedna conducts operational discovery workshops and process mapping with agency stakeholders to identify the highest-impact automation and AI opportunities—grounded in measurable outcomes."
  },
  {
    id: 12,
    tip: "Launch targeted pilots with clear metrics and boundaries. Select one process to automate (e.g., flagging high-risk inspection reports or summarizing meeting transcripts) and pilot it in a contained environment. Define success metrics like time saved, accuracy improvements, or volume processed.",
    caseStudy: "Sedna's agile delivery model allows for building and testing minimum viable AI solutions within 60-90 days, using defined KPIs and feedback loops to prove value before full-scale rollout."
  },
  {
    id: 13,
    tip: "Tie AI use cases to mission and program objectives. Ensure AI supports core mandates (e.g., improving access to justice, reducing emergency response times, or increasing service equity), rather than just adopting technology for modernization's sake.",
    caseStudy: "Sedna facilitates strategic alignment workshops to map use cases to policy priorities, ensuring AI initiatives clearly support mission outcomes and performance goals."
  },
  {
    id: 14,
    tip: "Form cross-functional, user-inclusive teams. Include legal, operations, data, procurement, and frontline staff from the beginning. Appoint change champions to promote buy-in and ownership.",
    caseStudy: "Sedna uses structured intake and design sprints that bring together diverse agency roles, ensuring solutions are technically feasible, legally compliant, and operationally embraced."
  },
  {
    id: 15,
    tip: "Design for privacy, security, and public sector compliance. Build from day one with compliance in mind—whether it's HIPAA, CJIS, FERPA, ADA, or state-specific laws. Stay informed about evolving standards like the EU AI Act. Include risk classification, explainability, and oversight from the start.",
    caseStudy: "Sedna incorporates compliance checks and legal consultation into every stage of the delivery cycle. The team actively monitors global standards like the EU AI Act to help agencies align with emerging best practices."
  },
  {
    id: 16,
    tip: "Build AI literacy and comfort across roles. Host short, accessible trainings and AI demos for non-technical teams. Focus on what AI is, what it isn't, and how it can support—not replace—their work.",
    caseStudy: "Sedna offers tailored AI education workshops, from executive briefings to hands-on training for analysts and program staff, ensuring the entire agency ecosystem is AI-ready."
  },
  {
    id: 17,
    tip: "Focus on human-AI collaboration, not automation for its own sake. Use AI to enhance—not replace—public servants. Let it draft summaries or detect patterns, while keeping final decisions human-led.",
    caseStudy: "Sedna's human-centered design ensures AI tools serve staff by delivering intuitive interfaces and clear handoffs between automation and human input."
  },
  {
    id: 18,
    tip: "Audit for fairness, bias, and equity in AI outputs. Continuously test AI for biased outcomes, especially in sensitive domains like policing or benefits eligibility. Use representative data and provide appeal mechanisms.",
    caseStudy: "Sedna implements bias and equity audits during development and helps agencies build ethical AI governance frameworks for long-term oversight."
  },
  {
    id: 19,
    tip: "Partner with local innovation ecosystems. Collaborate with local universities, civic tech groups, and minority-owned tech firms for innovation, prototyping, and community engagement.",
    caseStudy: "As a certified MBE/WBE with strong civic and academic ties, Sedna helps agencies co-create with local innovators while ensuring technical rigor and contract compliance."
  },
  {
    id: 20,
    tip: "Plan for post-launch sustainability and ownership. Go beyond the pilot. Plan for maintenance, training, system updates, and staff ownership. Budget for long-term support.",
    caseStudy: "Sedna provides full lifecycle support—including AI system retraining, feedback loops, knowledge transfer, and helpdesk design—to ensure long-term sustainability."
  },
  {
    id: 21,
    tip: "Address data readiness before starting AI projects. AI is only as effective as the data it's trained on. Assess and improve data quality, structure, and accessibility before model development.",
    caseStudy: "Sedna conducts data readiness assessments and supports agencies in creating structured, secure, and usable data environments—often as a 'Phase 0' in AI initiatives."
  },
  {
    id: 22,
    tip: "Create AI procurement language that supports innovation and oversight. Traditional procurement templates often lack language for AI-specific risks or requirements. Adapt contract language to support explainability, post-deployment performance, and flexibility.",
    caseStudy: "Sedna works with procurement teams to craft AI-focused RFPs and contracts, balancing innovation with control and helping agencies avoid vendor lock-in."
  },
  {
    id: 23,
    tip: "Build transparent, explainable AI systems for public accountability. Public-facing AI must be understandable to staff and citizens alike. Design systems that generate plain-language outputs and auditable logic trails.",
    caseStudy: "Sedna uses interpretable models where possible and develops interfaces that allow staff to understand, question, and correct AI-generated recommendations."
  },
  {
    id: 24,
    tip: "Vet and manage AI vendors like strategic partners. AI vendors must align with public sector values. Expect transparency, roadmaps, ethics policies, and handoff plans.",
    caseStudy: "Sedna serves as a trusted integrator—vetting AI tools, managing vendor relationships, and ensuring alignment with agency goals and compliance requirements."
  },
  {
    id: 25,
    tip: "Prepare your workforce for the shift AI will bring. AI adoption changes roles and responsibilities. Engage unions, HR, and staff early to support transitions in workflows and job functions.",
    caseStudy: "Sedna's organizational change specialists help agencies redefine roles, retrain staff, and guide cultural transitions that support sustainable and inclusive AI adoption."
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

// Add export for logo paths
export const sednaLogos = {
  black: '/sedna-logos/sedna1.png',
  white: '/sedna-logos/sedna2.jpeg'
};
