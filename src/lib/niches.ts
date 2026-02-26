export type NicheId = string;

export type NicheService = {
  title: string;
  description: string;
  imageFilename: string;
  href?: string;
};

export type NicheConfig = {
  id: NicheId;
  companyName: string;
  tradeSingular: string;
  tradePlural: string;
  heroBadge: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImages: string[];
  whyChooseImage: string;
  ctaBandImage: string;
  bottomCtaImage: string;
  beforeAfter: { before: string; after: string };
  gallery: Array<{ id: string; filename: string; alt: string; location: string }>;
  projects: Array<{
    img: string;
    title: string;
    loc: string;
    date: string;
    duration: string;
    highlights: string[];
    alt: string;
  }>;
  servicesHeading: string;
  services: NicheService[];
};

const SINGLE_NICHE_CONFIG: NicheConfig = {
  "id": "plumber",
  "companyName": "MJ plumber and heating",
  "tradeSingular": "Plumber",
  "tradePlural": "Plumbing",
  "heroBadge": "Trusted Local Plumbers",
  "heroTitle": "Reliable plumbing in London. Fast response, tidy work, clear pricing.",
  "heroSubtitle": "Plumbing & heating specialists. Leaks, boilers, radiators and emergency call-outs with clear pricing and tidy work.",
  "heroImages": [
    "hero.webp",
    "hero2.webp"
  ],
  "whyChooseImage": "hero2.webp",
  "ctaBandImage": "hero3.webp",
  "bottomCtaImage": "hero4.webp",
  "beforeAfter": {
    "before": "before.webp",
    "after": "after.webp"
  },
  "gallery": [
    {
      "id": "A",
      "filename": "boilerinstallation.webp",
      "alt": "Boiler installation work",
      "location": "London"
    },
    {
      "id": "B",
      "filename": "plumbingwork.webp",
      "alt": "Plumbing repair work",
      "location": "Surrey"
    },
    {
      "id": "C",
      "filename": "heatingwork.webp",
      "alt": "Central heating work",
      "location": "Kent"
    },
    {
      "id": "D",
      "filename": "faucetwork.webp",
      "alt": "Tap and fixture installation",
      "location": "South London"
    }
  ],
  "projects": [
    {
      "img": "boilerinstallation.webp",
      "title": "Boiler Replacement + System Upgrade",
      "loc": "South London",
      "date": "Aug 2025",
      "duration": "1 day",
      "highlights": [
        "New boiler install",
        "System flush",
        "Clean finish"
      ],
      "alt": "Boiler installation"
    },
    {
      "img": "heatingwork.webp",
      "title": "Central Heating Upgrade",
      "loc": "Surrey",
      "date": "Jul 2025",
      "duration": "2 days",
      "highlights": [
        "Improved heat",
        "Neat pipework",
        "Tested system"
      ],
      "alt": "Central heating upgrade"
    },
    {
      "img": "emergencywork.webp",
      "title": "Emergency Leak Repair",
      "loc": "Central London",
      "date": "Sep 2025",
      "duration": "2 hours",
      "highlights": [
        "Leak stopped fast",
        "Parts replaced",
        "Advice given"
      ],
      "alt": "Emergency plumbing repair"
    }
  ],
  "servicesHeading": "Plumbing Services",
  "services": [
    {
      "title": "Boilers",
      "description": "Boiler installs, servicing, diagnostics, and replacements.",
      "imageFilename": "boilerinstallation.webp",
      "href": "#contact"
    },
    {
      "title": "Plumbing",
      "description": "Leaks, burst pipes, taps, toilets, and general plumbing repairs.",
      "imageFilename": "plumbingwork.webp",
      "href": "#contact"
    },
    {
      "title": "Central Heating",
      "description": "Radiators, pipework, upgrades, and heating performance.",
      "imageFilename": "heatingwork.webp",
      "href": "#contact"
    },
    {
      "title": "Gas Work",
      "description": "Gas-safe compliant work for appliances and pipework.",
      "imageFilename": "cvinspection.webp",
      "href": "#contact"
    },
    {
      "title": "Emergency",
      "description": "Rapid call-outs for leaks, loss of heating, and urgent failures.",
      "imageFilename": "emergencywork.webp",
      "href": "#contact"
    },
    {
      "title": "Pipework & Repairs",
      "description": "Practical repairs and replacements for pipework, fittings and valves—done properly.",
      "imageFilename": "faucetwork.webp",
      "href": "#contact"
    }
  ]
};

export function getNicheConfig(_niche: string): NicheConfig {
  return SINGLE_NICHE_CONFIG;
}
