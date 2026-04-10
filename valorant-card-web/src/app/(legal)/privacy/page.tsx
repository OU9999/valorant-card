import { LegalDocumentRenderer } from "@/components/legal/legal-document-renderer";
import { PRIVACY_POLICY } from "@/constants/site/legal";

export default function PrivacyPage() {
  return <LegalDocumentRenderer documents={PRIVACY_POLICY} />;
}
