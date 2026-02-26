import type { TemplateProps } from "../registry";
import { ModernTemplate } from "../../../templates/modern-style-roofing-site/src/vf-template/Template";

export default function TemplateModern(props: TemplateProps) {
  return <ModernTemplate {...(props as any)} />;
}
