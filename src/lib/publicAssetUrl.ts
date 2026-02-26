export const PUBLIC_ASSET_BASE_URL = "https://storage.vfwebdesign.co.uk/public-vfwebdesign/";

export function publicAssetUrl(assetPath: string): string {
  const normalized = assetPath.replace(/^\/+/, "");
  return new URL(normalized, PUBLIC_ASSET_BASE_URL).toString();
}
