import type { NicheId } from "./lead";

export type ServiceDetailSectionCard = { title: string; body: string };
export type ServiceDetailStep = { title: string; body: string };
export type ServiceDetailFaq = { q: string; a: string };

export type ServiceDetailCopy = {
  heroKicker: string;
  heroTitle: string;
  heroIntro: string;

  includedSubtitle: string;
  includedTitle: string;
  includedIntro: string;
  includedCards: ServiceDetailSectionCard[];

  processSubtitle: string;
  processTitle: string;
  processIntro: string;
  processSteps: ServiceDetailStep[];

  faqSubtitle: string;
  faqTitle: string;
  faqs: ServiceDetailFaq[];
};

type Args = {
  niche: NicheId;
  tradeName: string; // e.g. "Roofing"
  companyName: string;
  location: string;
  serviceId: string;
  serviceLabel: string;
};

function generic(args: Args): ServiceDetailCopy {
  const t = args.tradeName.toLowerCase();
  return {
    heroKicker: `${args.tradeName} service`,
    heroTitle: args.serviceLabel,
    heroIntro: `Professional ${t} in ${args.location}, with tidy workmanship and clear next steps.`,
    includedSubtitle: "What’s included",
    includedTitle: "Clear scope. Clean finish. No surprises.",
    includedIntro:
      "We’ll confirm what’s needed, explain your options, and complete the work with tidy workmanship. You’ll always know what’s happening next.",
    includedCards: [
      { title: "Clear written quote", body: "Straightforward scope and pricing before we start." },
      { title: "Tidy work areas", body: "We respect your home and clean up as we go." },
      { title: "Safety-first approach", body: "We work safely and protect your property." },
      { title: "Fast communication", body: "Quick answers and clear next steps." },
    ],
    processSubtitle: "Our process",
    processTitle: "How it works",
    processIntro: "A calm, simple process that keeps things clear from the first call to completion.",
    processSteps: [
      { title: "Tell us what you need", body: "Share details and photos if helpful — we’ll ask the right questions." },
      { title: "We confirm the scope", body: "We explain options and what’s included before any work starts." },
      { title: "Complete the job neatly", body: "We work safely, keep things tidy, and aim for minimal disruption." },
      { title: "Final checks & handover", body: "We confirm you’re happy and explain any aftercare." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: `${args.serviceLabel} FAQs`,
    faqs: [
      { q: "Do you provide a written quote?", a: "Yes. We keep the scope clear so you know what’s included." },
      { q: "How soon can you attend?", a: "It depends on workload, but urgent issues are prioritised where possible." },
      { q: "Will you keep things tidy?", a: "Yes — we protect work areas, clean up, and treat your home with respect." },
    ],
  };
}

const byServiceId: Record<string, (a: Args) => ServiceDetailCopy> = {
  // Plumbing
  "general-plumbing": (a) => ({
    heroKicker: "Plumbing",
    heroTitle: "General plumbing repairs & replacements done properly",
    heroIntro:
      `From leaking fittings to faulty valves and pipework repairs, we do practical, reliable plumbing across ${a.location} with tidy work and clear pricing.`,
    includedSubtitle: "What’s included",
    includedTitle: "Fix the issue properly — and leave it neat",
    includedIntro:
      "We focus on durable repairs and sensible replacements. You’ll get clear options before we start and a tidy finish when we’re done.",
    includedCards: [
      { title: "Diagnosis", body: "We identify the cause and confirm the right fix." },
      { title: "Repair or replace", body: "Reliable parts and secure fittings for long-term results." },
      { title: "Isolation & testing", body: "We isolate where needed and test after the work." },
      { title: "Tidy finish", body: "Clean work area, clear explanation of what was done." },
    ],
    processSubtitle: "Our process",
    processTitle: "How general plumbing jobs run",
    processIntro: "Clear steps, minimal disruption, and a tidy handover.",
    processSteps: [
      { title: "Quick assessment", body: "We check symptoms and access, then confirm scope." },
      { title: "Explain options", body: "You get clear choices and pricing before work starts." },
      { title: "Complete the work", body: "Neat repairs/replacements with reliable parts." },
      { title: "Test & hand over", body: "We confirm performance and talk you through aftercare." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "General plumbing FAQs",
    faqs: [
      { q: "Do you do small jobs?", a: "Yes — from minor leaks to replacements, we’re happy to help." },
      { q: "Can you replace valves and fittings?", a: "Yes — we can replace faulty valves, fittings, and sections of pipework." },
      { q: "Will it be messy?", a: "We work cleanly and protect the area — tidy working is part of the job." },
    ],
  }),
  "leak-repair": (a) => ({
    heroKicker: "Leaks",
    heroTitle: "Leak repairs done properly (not just a quick patch)",
    heroIntro:
      `We trace the source and fix the failure point — pipes, joints, valves or fittings — with tidy work and clear pricing across ${a.location}.`,
    includedSubtitle: "What’s included",
    includedTitle: "Trace the leak. Fix the cause. Protect your home.",
    includedIntro:
      "Leaks can travel and show up far from the source. We isolate the cause, repair it properly, and leave things neat and accessible.",
    includedCards: [
      { title: "Leak tracing", body: "Identify the true source and the failed component." },
      { title: "Repair or replace", body: "Fix pipes, joints, valves and fittings with reliable parts." },
      { title: "Pressure/flow check", body: "Confirm performance after the repair." },
      { title: "Tidy finish", body: "Clean up and leave the area presentable." },
    ],
    processSubtitle: "Our process",
    processTitle: "How we handle a leak",
    processIntro: "Fast attendance where possible, with a proper diagnostic approach.",
    processSteps: [
      { title: "Assess & isolate", body: "We locate the leak and isolate water if needed." },
      { title: "Confirm repair options", body: "We explain the best fix and any sensible upgrades." },
      { title: "Complete repair", body: "Neat pipework and secure fittings." },
      { title: "Test & tidy", body: "We check for leaks and leave the area clean." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Leak repair FAQs",
    faqs: [
      { q: "Can you fix a leak the same day?", a: "Often yes, depending on access and parts. Urgent leaks are prioritised." },
      { q: "Do you repair hidden leaks?", a: "Yes — we trace the likely source and advise the best approach to access." },
      { q: "Will you need to turn the water off?", a: "Sometimes briefly. We’ll explain the steps and keep disruption minimal." },
    ],
  }),
  "boiler-repair": (a) => ({
    heroKicker: "Heating",
    heroTitle: "Boiler repairs with clear fault finding",
    heroIntro:
      `No guesswork. We diagnose the issue, explain options, and get your heating back on where possible across ${a.location}.`,
    includedSubtitle: "What’s included",
    includedTitle: "Diagnosis first, then the right repair",
    includedIntro:
      "Boiler issues can have multiple causes. We check systematically to identify the fault and provide clear next steps.",
    includedCards: [
      { title: "Fault finding", body: "Systematic checks to isolate the root cause." },
      { title: "Safety checks", body: "We prioritise safe operation and clear guidance." },
      { title: "Repair & parts advice", body: "We explain repair options and any parts needed." },
      { title: "Performance check", body: "Confirm operation and system pressures after the fix." },
    ],
    processSubtitle: "Our process",
    processTitle: "How boiler repairs work",
    processIntro: "A clear diagnostic approach, then straightforward options.",
    processSteps: [
      { title: "Initial checks", body: "We test common failure points and error conditions." },
      { title: "Confirm fault", body: "We isolate the issue and explain what’s failed." },
      { title: "Repair where possible", body: "We complete the repair or plan the next visit if parts are needed." },
      { title: "Test & explain", body: "We confirm operation and talk you through aftercare." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Boiler repair FAQs",
    faqs: [
      { q: "Can you fix it on the first visit?", a: "Often yes. If parts are needed, we’ll be clear about the next step." },
      { q: "Do you provide safety advice?", a: "Yes — safety-first, with clear guidance if we spot risks." },
      { q: "Should I repair or replace?", a: "We’ll advise based on age, reliability and cost-effectiveness." },
    ],
  }),
  "drain-unblocking": (a) => ({
    heroKicker: "Drains",
    heroTitle: "Drain unblocking with minimal mess",
    heroIntro:
      `Blocked sink, bath or drain? We clear it quickly, explain the cause, and help prevent it happening again across ${a.location}.`,
    includedSubtitle: "What’s included",
    includedTitle: "Clear the blockage and improve flow",
    includedIntro:
      "We aim to clear blockages quickly, but also explain what caused it and what simple steps reduce future issues.",
    includedCards: [
      { title: "Assess the blockage", body: "We identify where the blockage is and the likely cause." },
      { title: "Clear and flush", body: "We clear the obstruction and flush to restore flow." },
      { title: "Check traps & fittings", body: "We check common restriction points and advise improvements." },
      { title: "Prevention advice", body: "Simple guidance to reduce repeat blockages." },
    ],
    processSubtitle: "Our process",
    processTitle: "How unblocking works",
    processIntro: "Fast attendance where possible with a clean, controlled approach.",
    processSteps: [
      { title: "Quick diagnosis", body: "We test flow and isolate the likely restriction." },
      { title: "Clear the blockage", body: "Appropriate method depending on location and severity." },
      { title: "Flush and verify", body: "Confirm the line is running freely." },
      { title: "Advise on prevention", body: "We explain what caused it and how to avoid repeats." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Drain unblocking FAQs",
    faqs: [
      { q: "Do blockages keep coming back?", a: "They can, if the underlying cause isn’t addressed. We’ll explain prevention." },
      { q: "Will there be mess?", a: "We work cleanly and protect the area — minimal mess is the goal." },
      { q: "Can you unblock outdoor drains?", a: "Often yes — tell us what’s blocked and we’ll advise." },
    ],
  }),
  "central-heating": (a) => ({
    heroKicker: "Heating",
    heroTitle: "Central heating improvements for comfort and efficiency",
    heroIntro:
      `Radiators, valves, balancing and upgrades across ${a.location}. We improve performance and explain options clearly.`,
    includedSubtitle: "What’s included",
    includedTitle: "Reliable heat, better performance",
    includedIntro:
      "We can diagnose uneven heating, improve radiator performance, and recommend sensible upgrades for efficiency.",
    includedCards: [
      { title: "System checks", body: "We assess pressures, radiator performance and controls." },
      { title: "Valves & radiators", body: "Replace faulty valves/radiators and improve control." },
      { title: "Balancing", body: "Improve consistency so rooms heat more evenly." },
      { title: "Upgrade advice", body: "Practical recommendations — no upsell pressure." },
    ],
    processSubtitle: "Our process",
    processTitle: "How we improve heating",
    processIntro: "We assess first, then apply fixes that make a real difference.",
    processSteps: [
      { title: "Assess the symptoms", body: "Cold spots, noisy pipes, inconsistent rooms — we trace causes." },
      { title: "Confirm options", body: "We explain what’s worth doing and why." },
      { title: "Complete improvements", body: "Neat work with minimal disruption." },
      { title: "Test performance", body: "Confirm improved heat and control." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Central heating FAQs",
    faqs: [
      { q: "Why are some radiators cold?", a: "Common causes include balancing, air, sludge, or faulty valves." },
      { q: "Can you replace radiator valves?", a: "Yes — we can replace valves and help improve room-by-room control." },
      { q: "Do you advise on efficiency?", a: "Yes — practical steps that actually help reduce waste." },
    ],
  }),
  "emergency-plumbing": (a) => ({
    heroKicker: "Emergency",
    heroTitle: "Emergency plumbing to prevent damage fast",
    heroIntro:
      `Burst pipe or active leak? We prioritise make-safe work across ${a.location}, then confirm the best permanent repair.`,
    includedSubtitle: "What’s included",
    includedTitle: "Make safe first, then repair properly",
    includedIntro:
      "Emergency work is about controlling water fast, protecting your property, and giving you clear next steps.",
    includedCards: [
      { title: "Isolation & make-safe", body: "Stop or reduce the leak quickly to prevent further damage." },
      { title: "Temporary repairs", body: "Where needed, temporary measures until permanent repair." },
      { title: "Permanent fix", body: "Repair or replacement with reliable parts." },
      { title: "Clear communication", body: "We explain what happened and what’s next." },
    ],
    processSubtitle: "Our process",
    processTitle: "What happens on an emergency visit",
    processIntro: "Fast action, then a calm plan.",
    processSteps: [
      { title: "Call & triage", body: "We ask key questions and advise immediate steps." },
      { title: "Make safe", body: "Isolate the leak and protect the area." },
      { title: "Repair plan", body: "Confirm the best permanent fix." },
      { title: "Repair & test", body: "Complete repair and confirm performance." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Emergency plumbing FAQs",
    faqs: [
      { q: "What should I do before you arrive?", a: "If safe, isolate the water and move valuables away from the leak area." },
      { q: "Can you attend the same day?", a: "Often, depending on workload. Active leaks are prioritised." },
      { q: "Will you help with next steps?", a: "Yes — we’ll explain what happened and what’s needed next." },
    ],
  }),

  // Electrical
  "consumer-unit": (a) => ({
    heroKicker: "Safety",
    heroTitle: "Consumer unit upgrades for modern protection",
    heroIntro:
      `Upgrade to a modern board with improved protection and tidy labelling. Safe, compliant installs across ${a.location}.`,
    includedSubtitle: "What’s included",
    includedTitle: "Modern protection, neat documentation",
    includedIntro:
      "A board upgrade is about safety and clarity. We keep wiring tidy, circuits labelled, and provide a clear handover.",
    includedCards: [
      { title: "Assessment", body: "We check existing installation and confirm the right approach." },
      { title: "Safe, tidy install", body: "Clean wiring routes and careful termination." },
      { title: "Labelling", body: "Clear circuit identification to make future work easier." },
      { title: "Handover", body: "We explain what’s changed and what to expect." },
    ],
    processSubtitle: "Our process",
    processTitle: "How an upgrade works",
    processIntro: "Safety-first work with clear communication and tidy finishes.",
    processSteps: [
      { title: "Survey & quote", body: "Confirm scope, access and timing." },
      { title: "Install", body: "Careful replacement with minimal disruption." },
      { title: "Test & verify", body: "We confirm safe operation before completion." },
      { title: "Label & hand over", body: "Clear labels and explanation of circuits." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Consumer unit FAQs",
    faqs: [
      { q: "Why upgrade a consumer unit?", a: "Modern protection improves safety and reduces nuisance faults." },
      { q: "Will power be off during the work?", a: "Usually for a period. We’ll explain timing and keep it clear." },
      { q: "Do you label circuits?", a: "Yes — a clear label set is part of a professional finish." },
    ],
  }),
  "ev-charging": (a) => ({
    heroKicker: "EV charging",
    heroTitle: "EV charging points installed safely and neatly",
    heroIntro:
      `Home EV charging installations across ${a.location} with tidy cable routing, safe termination, and a simple handover.`,
    includedSubtitle: "What’s included",
    includedTitle: "A neat install you’ll be happy to see every day",
    includedIntro:
      "We plan cable routes, keep the finish tidy, and explain usage so you’re confident from day one.",
    includedCards: [
      { title: "Site assessment", body: "Confirm charger location, cable routes and power requirements." },
      { title: "Neat cable routing", body: "Tidy external runs and minimal visual impact where possible." },
      { title: "Safe connection", body: "Correct termination with safety-first approach." },
      { title: "Walkthrough", body: "We explain operation and basic troubleshooting." },
    ],
    processSubtitle: "Our process",
    processTitle: "How an EV charger install runs",
    processIntro: "Clear steps, tidy workmanship, and a simple handover.",
    processSteps: [
      { title: "Confirm location", body: "We agree the best position for usability and aesthetics." },
      { title: "Install & route", body: "Cable routed neatly and securely." },
      { title: "Commission", body: "We verify operation and safety." },
      { title: "Handover", body: "We show you how to use it and what to do if anything changes." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "EV charging FAQs",
    faqs: [
      { q: "Can you keep cables neat?", a: "Yes — tidy routing and clean fixing are part of the job." },
      { q: "Where should the charger go?", a: "We’ll recommend the best location for access, safety and aesthetics." },
      { q: "Do you test it after installation?", a: "Yes — we commission and verify operation before leaving." },
    ],
  }),
  lighting: (a) => ({
    heroKicker: "Lighting",
    heroTitle: "Lighting installation with clean, tidy wiring routes",
    heroIntro:
      `Indoor and outdoor lighting installed across ${a.location} with neat finishes and minimal disruption.`,
    includedSubtitle: "What’s included",
    includedTitle: "Modern lighting, finished neatly",
    includedIntro:
      "We install lighting with careful planning to keep routes tidy and the finish clean.",
    includedCards: [
      { title: "Planning", body: "We confirm placement, switching and practical use." },
      { title: "Tidy routes", body: "We aim for minimal disruption with clean access." },
      { title: "Safe install", body: "Correct connections with safety-first checks." },
      { title: "Final tidy-up", body: "We leave the area clean and presentable." },
    ],
    processSubtitle: "Our process",
    processTitle: "How lighting installs work",
    processIntro: "Clear scope, tidy work, and a clean finish.",
    processSteps: [
      { title: "Confirm design", body: "Placement, switches and any access requirements." },
      { title: "Install", body: "Careful work with clean routes where possible." },
      { title: "Test", body: "Verify operation and explain controls." },
      { title: "Finish", body: "Final tidy-up and handover." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Lighting installation FAQs",
    faqs: [
      { q: "Can you install outdoor lighting?", a: "Yes — we can advise on placement, durability and tidy routing." },
      { q: "Will it be disruptive?", a: "We aim to minimise disruption and keep work areas tidy." },
      { q: "Do you test everything before leaving?", a: "Yes — we verify operation and explain controls." },
    ],
  }),
  "fault-finding": (a) => ({
    heroKicker: "Diagnostics",
    heroTitle: "Fault finding for trips, dead circuits and intermittent issues",
    heroIntro:
      `We diagnose electrical faults systematically across ${a.location}, explain what we found, and outline the safest next step.`,
    includedSubtitle: "What’s included",
    includedTitle: "Systematic checks — no guesswork",
    includedIntro:
      "Intermittent issues can be frustrating. We test logically to isolate the cause and recommend the right fix.",
    includedCards: [
      { title: "Symptom assessment", body: "Trips, dead sockets, flicker or intermittent power issues." },
      { title: "Testing & isolation", body: "We isolate circuits and narrow down the fault." },
      { title: "Clear explanation", body: "We explain what’s failed and why." },
      { title: "Next-step plan", body: "A clear route to repair with options where appropriate." },
    ],
    processSubtitle: "Our process",
    processTitle: "How we find faults",
    processIntro: "We test systematically until the cause is confirmed.",
    processSteps: [
      { title: "Gather symptoms", body: "When it happens, what triggers it, and what’s affected." },
      { title: "Test & isolate", body: "Logical isolation to pinpoint the fault." },
      { title: "Confirm the cause", body: "We explain the fault and what it means." },
      { title: "Repair plan", body: "We outline the safest fix and timeline." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Fault finding FAQs",
    faqs: [
      { q: "Can you fix it the same day?", a: "Often yes. If parts are needed, we’ll be clear about the next step." },
      { q: "Why does my circuit keep tripping?", a: "Common causes include faulty appliances, wiring issues, or overloaded circuits." },
      { q: "Will you explain what you found?", a: "Yes — we keep it clear and straightforward." },
    ],
  }),
  smarthome: (a) => ({
    heroKicker: "Smart home",
    heroTitle: "Smart home upgrades done properly",
    heroIntro:
      `Smart controls, sensors and upgrades across ${a.location} with neat installs and clear guidance on how everything works.`,
    includedSubtitle: "What’s included",
    includedTitle: "Modern upgrades with clean finishes",
    includedIntro:
      "Smart upgrades are best when they’re installed neatly and explained clearly. We keep wiring tidy and controls intuitive.",
    includedCards: [
      { title: "Consultation", body: "We confirm what you want to control and the best setup." },
      { title: "Neat install", body: "Tidy wiring routes and clean mounting." },
      { title: "Setup", body: "Configured for reliable day-to-day use." },
      { title: "Walkthrough", body: "We show you how to use it and what to do if settings change." },
    ],
    processSubtitle: "Our process",
    processTitle: "How upgrades work",
    processIntro: "We plan, install neatly, then walk you through the setup.",
    processSteps: [
      { title: "Confirm goals", body: "What you want to automate or control." },
      { title: "Install", body: "Neat mounting and tidy wiring routes." },
      { title: "Configure", body: "Reliable settings for daily use." },
      { title: "Handover", body: "Clear walkthrough and aftercare." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Smart home FAQs",
    faqs: [
      { q: "Will it be easy to use?", a: "Yes — we focus on simple controls and clear explanations." },
      { q: "Can you add smart lighting or heating controls?", a: "Often yes — tell us what you want to control and we’ll advise." },
      { q: "Do you tidy up after installation?", a: "Always — clean finish is part of the job." },
    ],
  }),
  "emergency-electrician": (a) => ({
    heroKicker: "Emergency",
    heroTitle: "Emergency electrician — make safe and restore power",
    heroIntro:
      `Urgent callouts across ${a.location} to make safe, isolate faults, and restore power where possible with clear next steps.`,
    includedSubtitle: "What’s included",
    includedTitle: "Safety first, then a calm plan",
    includedIntro:
      "We prioritise safety and clear communication during urgent electrical issues.",
    includedCards: [
      { title: "Triage advice", body: "Immediate guidance to keep things safe before we arrive." },
      { title: "Make-safe work", body: "Isolate the fault and reduce risk quickly." },
      { title: "Restore where possible", body: "We aim to restore supply safely where possible." },
      { title: "Clear next steps", body: "Written recommendations for any follow-up work." },
    ],
    processSubtitle: "Our process",
    processTitle: "What happens on an emergency callout",
    processIntro: "Fast action, safety-first decisions, and a clear route forward.",
    processSteps: [
      { title: "Call & triage", body: "We ask key questions and advise immediate safety steps." },
      { title: "Make safe", body: "We isolate the fault and reduce risk." },
      { title: "Restore if safe", body: "We restore power where possible and safe." },
      { title: "Plan follow-up", body: "We outline any further repairs needed." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Emergency electrician FAQs",
    faqs: [
      { q: "What should I do if something smells like burning?", a: "Switch off power if safe and call immediately. Do not use affected circuits." },
      { q: "Can you restore power the same day?", a: "Often yes, depending on fault severity and safety." },
      { q: "Will you explain what caused it?", a: "Yes — we keep it clear and safety-focused." },
    ],
  }),

  // Construction
  extensions: (a) => ({
    heroKicker: "Extensions",
    heroTitle: "Home extensions with clear milestones and tidy sites",
    heroIntro:
      `From planning through to finishing, we deliver organised extension builds across ${a.location} with clear communication and a professional site setup.`,
    includedSubtitle: "What’s included",
    includedTitle: "A build you can live around",
    includedIntro:
      "Good construction is organised. We sequence work carefully, keep the site tidy, and communicate clearly.",
    includedCards: [
      { title: "Clear milestones", body: "A simple plan with key phases and expectations." },
      { title: "Site setup", body: "Safe, tidy working areas and controlled access." },
      { title: "Quality finishes", body: "Clean detailing and consistent workmanship." },
      { title: "Handover", body: "A finished handover with clear snags/next steps if needed." },
    ],
    processSubtitle: "Our process",
    processTitle: "How an extension project runs",
    processIntro: "A structured process designed to keep you informed and the site controlled.",
    processSteps: [
      { title: "Scope & feasibility", body: "We confirm goals, constraints, and the best approach." },
      { title: "Plan & schedule", body: "Agree milestones and realistic timelines." },
      { title: "Build & coordinate", body: "We manage sequencing and keep the site tidy." },
      { title: "Finish & handover", body: "Final checks and a professional handover." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Extension FAQs",
    faqs: [
      { q: "How do you keep the site tidy?", a: "We organise access, protect areas, and tidy daily where practical." },
      { q: "Do you provide a clear timeline?", a: "Yes — with milestones and realistic expectations." },
      { q: "Can you coordinate multiple trades?", a: "Yes — sequencing and coordination are part of the value." },
    ],
  }),
  renovations: (a) => ({
    heroKicker: "Renovations",
    heroTitle: "Renovations with careful sequencing and a tidy finish",
    heroIntro:
      `Modernise your home across ${a.location} with structured work, clear communication and consistent workmanship.`,
    includedSubtitle: "What’s included",
    includedTitle: "Organised renovation work",
    includedIntro:
      "Renovations go smoothly when the scope is clear and the sequencing makes sense. We keep it organised.",
    includedCards: [
      { title: "Scope clarity", body: "We define what’s included and what’s optional early." },
      { title: "Sequencing", body: "We plan the order of work to avoid rework and delays." },
      { title: "Quality workmanship", body: "Consistent finish across all areas." },
      { title: "Communication", body: "Clear updates and next steps." },
    ],
    processSubtitle: "Our process",
    processTitle: "How renovations run",
    processIntro: "Structured phases that keep the project controlled.",
    processSteps: [
      { title: "Scope & plan", body: "Define goals, finish levels and key constraints." },
      { title: "Prepare", body: "Protect areas and set up the site properly." },
      { title: "Build & finish", body: "Work through phases with clear milestones." },
      { title: "Snag & handover", body: "Final checks and tidy completion." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Renovation FAQs",
    faqs: [
      { q: "Can you work around an occupied home?", a: "Often yes — we plan access and keep areas tidy." },
      { q: "Will I get clear updates?", a: "Yes — we keep communication simple and consistent." },
      { q: "Do you help with planning the sequence?", a: "Yes — sequencing is key to a smooth renovation." },
    ],
  }),
  groundworks: (a) => ({
    heroKicker: "Groundworks",
    heroTitle: "Groundworks done properly — the foundation for a great build",
    heroIntro:
      `Foundations and prep work across ${a.location} with careful levels, safe site setup and clear milestones.`,
    includedSubtitle: "What’s included",
    includedTitle: "Solid preparation, clear milestones",
    includedIntro:
      "Good groundworks reduce future problems. We focus on levels, drainage considerations and tidy site management.",
    includedCards: [
      { title: "Site prep", body: "Access planning and safe working areas." },
      { title: "Levels & layout", body: "Correct setting out and level control." },
      { title: "Foundations", body: "Work completed to support the build reliably." },
      { title: "Clear communication", body: "Milestones and next steps kept simple." },
    ],
    processSubtitle: "Our process",
    processTitle: "How groundworks run",
    processIntro: "We plan, set out, execute, then verify before moving to the next phase.",
    processSteps: [
      { title: "Set out", body: "Confirm layout and levels." },
      { title: "Excavate & prepare", body: "Prep for foundations with safety-first approach." },
      { title: "Complete works", body: "Foundations and prep work completed." },
      { title: "Verify", body: "Checks before the build continues." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Groundworks FAQs",
    faqs: [
      { q: "Why do groundworks matter?", a: "They set the base for everything — levels and prep reduce future issues." },
      { q: "Do you keep the site safe?", a: "Yes — safety-first working practices and clear access planning." },
      { q: "Will you explain the next steps?", a: "Yes — we keep milestones and sequencing clear." },
    ],
  }),
  brickwork: (a) => ({
    heroKicker: "Structural",
    heroTitle: "Brickwork & structural alterations with quality finishes",
    heroIntro:
      `Structural work across ${a.location} completed safely with careful detailing and tidy work areas.`,
    includedSubtitle: "What’s included",
    includedTitle: "Safe work, tidy finish",
    includedIntro:
      "Structural work needs careful planning, safety-first execution, and a neat finish that blends with your home.",
    includedCards: [
      { title: "Assessment", body: "We confirm scope and constraints before starting." },
      { title: "Safe execution", body: "Controlled work areas with safety-first decisions." },
      { title: "Quality finish", body: "Clean lines and consistent workmanship." },
      { title: "Handover", body: "Clear explanation and next steps." },
    ],
    processSubtitle: "Our process",
    processTitle: "How structural work runs",
    processIntro: "We keep the scope clear and the work controlled.",
    processSteps: [
      { title: "Confirm scope", body: "Agree exactly what’s included." },
      { title: "Prepare", body: "Protect areas and set up the site." },
      { title: "Complete work", body: "Safe, tidy execution with quality checks." },
      { title: "Finish & tidy", body: "Clean completion and handover." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Brickwork & structural FAQs",
    faqs: [
      { q: "Will the finish match?", a: "We aim for a clean, consistent finish and will discuss expectations upfront." },
      { q: "How disruptive is it?", a: "It depends on scope. We plan access and keep areas tidy." },
      { q: "Do you provide a clear timeline?", a: "Yes — we communicate milestones and next steps." },
    ],
  }),
  kitchens: (a) => ({
    heroKicker: "Kitchens",
    heroTitle: "Kitchen builds with coordinated trades and tidy finishes",
    heroIntro:
      `We coordinate the build side across ${a.location} to deliver a clean, functional kitchen finish with clear sequencing.`,
    includedSubtitle: "What’s included",
    includedTitle: "A coordinated build, not chaos",
    includedIntro:
      "Kitchen projects go smoothly when sequencing is managed and expectations are clear.",
    includedCards: [
      { title: "Sequencing", body: "Clear order of works to reduce delays and rework." },
      { title: "Coordination", body: "Trades coordinated for a clean finish." },
      { title: "Tidy working", body: "Respect for your home during the build." },
      { title: "Handover", body: "Final checks and tidy completion." },
    ],
    processSubtitle: "Our process",
    processTitle: "How kitchen builds run",
    processIntro: "Clear steps and coordination from start to finish.",
    processSteps: [
      { title: "Confirm scope", body: "Define what’s included and the finish level." },
      { title: "Plan schedule", body: "Agree milestones and sequencing." },
      { title: "Build & coordinate", body: "Execute with tidy site practices." },
      { title: "Finish & handover", body: "Final checks and tidy completion." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Kitchen build FAQs",
    faqs: [
      { q: "Can you coordinate multiple trades?", a: "Yes — coordination is a big part of delivering a clean finish." },
      { q: "Will it be tidy?", a: "We keep work areas controlled and aim for daily tidy-ups where practical." },
      { q: "Do you provide clear milestones?", a: "Yes — clear steps keep the project predictable." },
    ],
  }),
  "project-management": (a) => ({
    heroKicker: "Management",
    heroTitle: "Project management that keeps your build organised",
    heroIntro:
      `Clear planning, scheduling and communication across ${a.location} so your project stays predictable and controlled.`,
    includedSubtitle: "What’s included",
    includedTitle: "Clarity, scheduling and communication",
    includedIntro:
      "Good management reduces delays and stress. We keep milestones clear and communication consistent.",
    includedCards: [
      { title: "Planning", body: "Scope and sequencing aligned before work starts." },
      { title: "Scheduling", body: "Trades coordinated with realistic milestones." },
      { title: "Communication", body: "Clear updates and next steps." },
      { title: "Quality checks", body: "Finish levels checked before sign-off." },
    ],
    processSubtitle: "Our process",
    processTitle: "How we manage projects",
    processIntro: "A simple structure that keeps things moving.",
    processSteps: [
      { title: "Define scope", body: "Agree outcomes, finishes and constraints." },
      { title: "Build the schedule", body: "Sequence works and set milestones." },
      { title: "Coordinate", body: "Keep trades aligned and issues resolved quickly." },
      { title: "Handover", body: "Final checks and tidy completion." },
    ],
    faqSubtitle: "FAQ",
    faqTitle: "Project management FAQs",
    faqs: [
      { q: "What does project management include?", a: "Planning, scheduling, coordination and clear communication." },
      { q: "Will I get updates?", a: "Yes — we keep updates and next steps clear." },
      { q: "Can you manage small projects too?", a: "Yes — the same structure helps projects run smoothly." },
    ],
  }),
};

export function getServiceDetailCopy(args: Args): ServiceDetailCopy {
  const fn = byServiceId[args.serviceId];
  if (fn) return fn(args);
  return generic(args);
}

