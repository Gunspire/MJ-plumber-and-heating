import type { TemplateProps } from "../registry";
import { ModernTemplate as WavesTemplate } from "../../../templates/modern-style-roofing-site/src/vf-template/Template";

export default function TemplateWaves(props: TemplateProps) {
  return <WavesTemplate {...(props as any)} />;
}
