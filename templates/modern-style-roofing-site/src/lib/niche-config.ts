import type { AboutFacts, NicheId } from "./lead";

export type IconType =
  | "install"
  | "repair"
  | "emergency"
  | "maintenance"
  | "upgrade"
  | "inspection"
  | "unblock"
  | "heating"
  | "bathroom"
  | "drain"
  | "electrical"
  | "ev"
  | "lighting"
  | "smarthome"
  | "construction"
  | "extension"
  | "renovation"
  | "groundworks"
  | "structural"
  | "kitchen"
  | "management";

export type NicheService = {
  id: string;
  label: string;
  description: string;
  imageFilename: string;
  iconType: IconType;
};

export type NicheProject = {
  title: string;
  location: string;
  summary: string;
  imageFilename: string;
};

export type NicheReview = {
  text: string;
  name: string;
  town: string;
};

export type NicheConfig = {
  id: NicheId;
  tradeName: string;
  tradeSingular: string;
  tradePlural: string;
  defaultCompanyName: string;
  defaultLocation: string;
  defaultPhone: string;
  defaultEmail: string;
  defaultCtaText: string;
  defaultPrimaryColor: string;
  defaultSecondaryColor: string;
  defaultYearsInBusiness: string;
  defaultOpeningHours: string;
  defaultEmergencyAvailable: boolean;
  defaultServiceAreas: string[];
  defaultAccreditations: string[];

  hero: {
    badge: string;
    title: string; // supports {location}
    subtitle: string; // supports {location}
    imageFilenames: string[];
  };

  services: {
    heading: string;
    subtitle: string;
    items: NicheService[];
  };

  projects: {
    heading: string;
    subtitle: string;
    items: NicheProject[];
  };

  reviews: {
    heading: string;
    subtitle: string;
    items: NicheReview[];
  };

  trust: {
    stripItems: Array<{ text: string; kind: "icon" | "image"; imageFilename?: string }>;
  };

  about: {
    text: string; // supports {companyName} and {location}
    facts: AboutFacts;
  };
};

export function subLocation(s: string, location: string) {
  return s.replaceAll("{location}", location);
}

export const nicheConfigs: Record<NicheId, NicheConfig> = {
  plumber: {
    id: "plumber",
    tradeName: "Plumbing",
    tradeSingular: "Plumber",
    tradePlural: "Plumbers",
    defaultCompanyName: "MJ plumber and heating",
    defaultLocation: "London",
    defaultPhone: "447778997257",
    defaultEmail: "help@diamondplumbing.co.uk",
    defaultCtaText: "Book a Callout",
    defaultPrimaryColor: "#2563eb",
    defaultSecondaryColor: "#0f172a",
    defaultYearsInBusiness: "12+",
    defaultOpeningHours: "Mon–Sat: 8am–6pm",
    defaultEmergencyAvailable: true,
    defaultServiceAreas: ["London", "Surrey", "Kent", "Essex"],
    defaultAccreditations: ["Fully insured", "Gas Safe (if applicable)", "Trusted local trades"],
    hero: {
      badge: "Trusted Local Plumbers",
      title: "Plumbing in {location} — fast response, tidy work, clear prices.",
      subtitle:
        "Plumbing & heating across {location} — leaks, boilers, radiators and urgent call-outs with clear options and tidy work.",
      imageFilenames: ["hero.webp", "hero2.webp", "hero3.webp"],
    },
    services: {
      subtitle: "Our Services",
      heading: "Plumbing services homeowners actually need",
      items: [
        {
          id: "general-plumbing",
          label: "General Plumbing",
          description: "Repairs and replacements for pipework, taps, toilets and fittings — practical, not decorative.",
          imageFilename: "hero.webp",
          iconType: "repair",
        },
        {
          id: "leak-repair",
          label: "Leak Repairs",
          description: "Trace and fix leaks properly—pipes, joints, valves and fittings.",
          imageFilename: "after.webp",
          iconType: "repair",
        },
        {
          id: "boiler-repair",
          label: "Boiler Repairs",
          description: "Fault finding, repairs and safety checks to get your heating back on.",
          imageFilename: "hero2.webp",
          iconType: "heating",
        },
        {
          id: "drain-unblocking",
          label: "Drain Unblocking",
          description: "Blocked sinks, baths and drains cleared quickly with minimal mess.",
          imageFilename: "before.webp",
          iconType: "unblock",
        },
        {
          id: "central-heating",
          label: "Central Heating",
          description: "Radiators, valves, balancing and system improvements for efficiency.",
          imageFilename: "hero.webp",
          iconType: "heating",
        },
        {
          id: "emergency-plumbing",
          label: "Emergency Plumbing",
          description: "Urgent callouts for bursts and active leaks to prevent property damage.",
          imageFilename: "after.webp",
          iconType: "emergency",
        },
      ],
    },
    projects: {
      subtitle: "Recent work",
      heading: "Recent plumbing & heating work",
      items: [
        {
          title: "Leak Repair + Refit",
          location: "London",
          summary: "Leak traced, pipework repaired and fittings refitted with a clean finish.",
          imageFilename: "after.webp",
        },
        {
          title: "Boiler Fault Find + Repair",
          location: "Surrey",
          summary: "Heating restored with clear explanation of the fault and next steps.",
          imageFilename: "hero2.webp",
        },
        {
          title: "Heating Fault Find",
          location: "Kent",
          summary: "System tested, fault isolated and repaired with clear next steps.",
          imageFilename: "hero2.webp",
        },
      ],
    },
    reviews: {
      subtitle: "Reviews",
      heading: "Rated highly for fast response",
      items: [
        { text: "Quick response and very tidy work. Explained the issue clearly and fixed it fast.", name: "Paul", town: "London" },
        { text: "Great communication and fair price. Would definitely use again.", name: "Amy", town: "Surrey" },
        { text: "Emergency leak handled same day. Professional and respectful in the house.", name: "Nina", town: "Kent" },
      ],
    },
    trust: {
      stripItems: [
        { kind: "icon", text: "Fully Insured" },
        { kind: "icon", text: "Transparent pricing" },
        { kind: "icon", text: "Tidy workmanship" },
        { kind: "icon", text: "Fast response" },
      ],
    },
    about: {
      text: "{companyName} helps homeowners across {location} with reliable plumbing—fast response, clean work areas, and clear options before we start.",
      facts: { familyRun: true, local: true, established: true },
    },
  },
  electrician: {
    id: "electrician",
    tradeName: "Electrical",
    tradeSingular: "Electrician",
    tradePlural: "Electricians",
    defaultCompanyName: "MJ plumber and heating",
    defaultLocation: "London",
    defaultPhone: "447778997257",
    defaultEmail: "hello@diamondelectrical.co.uk",
    defaultCtaText: "Get a Quote",
    defaultPrimaryColor: "#2563eb",
    defaultSecondaryColor: "#0f172a",
    defaultYearsInBusiness: "10+",
    defaultOpeningHours: "Mon–Fri: 8am–6pm",
    defaultEmergencyAvailable: true,
    defaultServiceAreas: ["London", "Surrey", "Kent", "Essex"],
    defaultAccreditations: ["Fully insured", "Qualified electricians", "Safety-first approach"],
    hero: {
      badge: "Trusted Local Electricians",
      title: "Electricians in {location} — safe installs, tidy finishes, clear quotes.",
      subtitle:
        "From fault finding to full installs, we deliver modern electrical work across {location} with neat workmanship and clear communication.",
      imageFilenames: ["hero1.webp", "hero2.webp", "hero3.webp"],
    },
    services: {
      subtitle: "Services",
      heading: "Electrical services",
      items: [
        {
          id: "consumer-unit",
          label: "Consumer Unit Upgrades",
          description: "Modern boards, improved protection and compliant installs.",
          imageFilename: "cablecabinet.webp",
          iconType: "upgrade",
        },
        {
          id: "ev-charging",
          label: "EV Charging Points",
          description: "Home charging installs with safe routing and neat finishes.",
          imageFilename: "chargingpoint.webp",
          iconType: "ev",
        },
        {
          id: "lighting",
          label: "Lighting Installation",
          description: "Indoor and outdoor lighting with clean, tidy wiring routes.",
          imageFilename: "lightinstall.webp",
          iconType: "lighting",
        },
        {
          id: "fault-finding",
          label: "Fault Finding",
          description: "Diagnose trips, dead circuits and intermittent issues fast.",
          imageFilename: "electricaloutlets.webp",
          iconType: "inspection",
        },
        {
          id: "smarthome",
          label: "Smart Home Upgrades",
          description: "Smart controls, sensors and modern upgrades done properly.",
          imageFilename: "smarthome.webp",
          iconType: "smarthome",
        },
        {
          id: "emergency-electrician",
          label: "Emergency Electrician",
          description: "Urgent callouts to make safe and restore power where possible.",
          imageFilename: "short_emergency.webp",
          iconType: "emergency",
        },
      ],
    },
    projects: {
      subtitle: "Recent work",
      heading: "Recent electrical projects",
      items: [
        {
          title: "EV Charger Installation",
          location: "London",
          summary: "Neat external run, safe termination and customer walkthrough.",
          imageFilename: "chargingpoint.webp",
        },
        {
          title: "Consumer Unit Upgrade",
          location: "Surrey",
          summary: "Board upgraded with modern protection and labelled circuits.",
          imageFilename: "cablecabinet.webp",
        },
        {
          title: "Lighting Upgrade",
          location: "Kent",
          summary: "Modern lighting installed with tidy access and minimal disruption.",
          imageFilename: "lightinstall.webp",
        },
      ],
    },
    reviews: {
      subtitle: "Reviews",
      heading: "Known for neat work",
      items: [
        { text: "Very tidy install and explained everything clearly. Highly recommended.", name: "Tom", town: "London" },
        { text: "Fast fault find and fixed the issue the same day. Great service.", name: "Leah", town: "Surrey" },
        { text: "Professional and punctual. The finish was excellent.", name: "Mark", town: "Kent" },
      ],
    },
    trust: {
      stripItems: [
        { kind: "icon", text: "Fully Insured" },
        { kind: "icon", text: "Safety-first" },
        { kind: "icon", text: "Clear written quotes" },
        { kind: "image", text: "4.9 Google Reviews", imageFilename: "google-g.png" },
      ],
    },
    about: {
      text: "{companyName} provides safe, modern electrical work across {location}. We keep things simple: turn up on time, work neatly, and leave you with clear documentation.",
      facts: { familyRun: false, local: true, established: true },
    },
  },
  construction: {
    id: "construction",
    tradeName: "Construction",
    tradeSingular: "Builder",
    tradePlural: "Builders",
    defaultCompanyName: "MJ plumber and heating",
    defaultLocation: "London",
    defaultPhone: "447778997257",
    defaultEmail: "build@diamondconstruction.co.uk",
    defaultCtaText: "Request a Quote",
    defaultPrimaryColor: "#2563eb",
    defaultSecondaryColor: "#0f172a",
    defaultYearsInBusiness: "18+",
    defaultOpeningHours: "Mon–Fri: 8am–5pm",
    defaultEmergencyAvailable: false,
    defaultServiceAreas: ["London", "Surrey", "Kent"],
    defaultAccreditations: ["Fully insured", "Project managed", "Quality workmanship"],
    hero: {
      badge: "Trusted Local Builders",
      title: "Construction in {location} — quality builds, clear timelines, tidy sites.",
      subtitle:
        "From renovations to extensions, we deliver reliable construction across {location} with organised project management and consistent communication.",
      imageFilenames: ["hero2.webp", "hero4.webp"],
    },
    services: {
      subtitle: "Services",
      heading: "Construction services",
      items: [
        {
          id: "extensions",
          label: "Home Extensions",
          description: "Plan, build and finish—clean detailing and clear milestones.",
          imageFilename: "hero2.webp",
          iconType: "extension",
        },
        {
          id: "renovations",
          label: "Renovations",
          description: "Modernise your home with careful sequencing and tidy work areas.",
          imageFilename: "hero4.webp",
          iconType: "renovation",
        },
        {
          id: "groundworks",
          label: "Groundworks",
          description: "Foundations and prep work done properly to support the build.",
          imageFilename: "before.webp",
          iconType: "groundworks",
        },
        {
          id: "brickwork",
          label: "Brickwork & Structural",
          description: "Structural alterations completed safely with quality finishes.",
          imageFilename: "after.webp",
          iconType: "structural",
        },
        {
          id: "kitchens",
          label: "Kitchen Builds",
          description: "Coordinate trades and deliver a clean, functional finish.",
          imageFilename: "hero2.webp",
          iconType: "kitchen",
        },
        {
          id: "project-management",
          label: "Project Management",
          description: "Clear planning, scheduling and communication from start to finish.",
          imageFilename: "hero4.webp",
          iconType: "management",
        },
      ],
    },
    projects: {
      subtitle: "Recent work",
      heading: "Recent builds",
      items: [
        {
          title: "Rear Extension Build",
          location: "London",
          summary: "Clear phases, tidy site management and a finished handover on schedule.",
          imageFilename: "hero2.webp",
        },
        {
          title: "Full Renovation",
          location: "Surrey",
          summary: "Coordinated trades with consistent updates and quality finishes.",
          imageFilename: "hero4.webp",
        },
        {
          title: "Structural Alteration",
          location: "Kent",
          summary: "Safe sequencing and careful finishing with minimal disruption.",
          imageFilename: "after.webp",
        },
      ],
    },
    reviews: {
      subtitle: "Reviews",
      heading: "Trusted for organised builds",
      items: [
        { text: "Great communication throughout and the finish is fantastic.", name: "Hannah", town: "London" },
        { text: "Managed the job well and kept the site tidy. Would recommend.", name: "Owen", town: "Surrey" },
        { text: "Reliable team and the timeline was clear from day one.", name: "Priya", town: "Kent" },
      ],
    },
    trust: {
      stripItems: [
        { kind: "icon", text: "Fully Insured" },
        { kind: "icon", text: "Clear milestones" },
        { kind: "icon", text: "Tidy sites" },
        { kind: "image", text: "4.9 Google Reviews", imageFilename: "google-g.png" },
      ],
    },
    about: {
      text: "{companyName} delivers reliable construction across {location} with organised project management, tidy works, and clear next steps at every stage.",
      facts: { familyRun: true, local: true, established: true },
    },
  },
};

export function getNicheConfig(niche: NicheId): NicheConfig {
  return nicheConfigs[niche] ?? nicheConfigs.plumber;
}

