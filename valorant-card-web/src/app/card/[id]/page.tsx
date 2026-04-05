import { notFound } from "next/navigation";
import { getCard } from "@/lib/card/store";
import { CardView } from "@/components/card/card-view";

interface CardPageProps {
  params: Promise<{ id: string }>;
}

export default async function CardPage({ params }: CardPageProps) {
  const { id } = await params;
  const card = getCard(id);

  if (!card) {
    notFound();
  }

  return <CardView data={card} />;
}
