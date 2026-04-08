import { LegalLayout } from "@/components/legal/legal-shared";

export default function LegalGroupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LegalLayout>{children}</LegalLayout>;
}
