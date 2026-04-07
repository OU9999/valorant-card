import { LegalDocumentRenderer } from "@/components/layout/legal-document-renderer";
import { PRIVACY_POLICY } from "@/constants/legal";

export default function PrivacyPage() {
  return <LegalDocumentRenderer documents={PRIVACY_POLICY} />;
}
