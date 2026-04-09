import { LegalDocumentRenderer } from "@/components/legal/legal-document-renderer";
import { PRIVACY_POLICY } from "@/constants/legal";

export default function PrivacyPage() {
  return <LegalDocumentRenderer documents={PRIVACY_POLICY} />;
}
