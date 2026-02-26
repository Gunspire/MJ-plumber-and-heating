export type NicheKey = string;

export type ServiceOption = {
  id: string;
  label: string;
  presetDescription: string;
  presetGalleryId: string;
};

const EXPORTED_SERVICE_OPTIONS: ServiceOption[] = [
  {
    "id": "emergency_plumbing_repair",
    "label": "Emergency Plumbing Repair",
    "presetDescription": "Rapid response for bursts, major leaks, and urgent plumbing problems.",
    "presetGalleryId": "emergencywork.webp"
  },
  {
    "id": "leak_repair",
    "label": "Leak Repair",
    "presetDescription": "Locate and fix leaks quickly, with minimal disruption and tidy workmanship.",
    "presetGalleryId": "plumbingwork.webp"
  },
  {
    "id": "drain_cleaning_and_snaking",
    "label": "Drain Cleaning & Snaking",
    "presetDescription": "Clear blocked sinks, baths, and drains — restore flow and reduce smells.",
    "presetGalleryId": "piping.jpeg"
  },
  {
    "id": "water_heater_replacement",
    "label": "Water Heater Replacement",
    "presetDescription": "Replace or upgrade hot water systems with safe installation and clear advice.",
    "presetGalleryId": "boilerinstallation.webp"
  },
  {
    "id": "fixture_installation",
    "label": "Fixture Installation",
    "presetDescription": "Install taps, toilets, showers and more — properly sealed and tested.",
    "presetGalleryId": "faucetwork.webp"
  }
];

export const SERVICES_BY_NICHE: Record<NicheKey, ServiceOption[]> = {
  ["plumber"]: EXPORTED_SERVICE_OPTIONS,
};

export function getServicesForNiche(_niche: string | undefined): ServiceOption[] {
  return EXPORTED_SERVICE_OPTIONS;
}
