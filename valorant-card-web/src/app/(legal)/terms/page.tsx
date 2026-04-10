import { LegalDocumentRenderer } from "@/components/legal/legal-document-renderer";
import { TERMS_OF_SERVICE } from "@/constants/site/legal";

export default function TermsPage() {
  return <LegalDocumentRenderer documents={TERMS_OF_SERVICE} />;
}
