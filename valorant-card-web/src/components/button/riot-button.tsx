"use client";

import { useTranslations } from "next-intl";

interface RiotButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const RiotButton = ({ onClick, disabled }: RiotButtonProps) => {
  const t = useTranslations("Auth");

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 cursor-pointer items-center gap-2.5 rounded-lg bg-[#D13639] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#B82E31] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
        <path d="M13.458.86 0 7.093l3.353 12.761 2.552-.313-.701-8.024.838-.373 1.447 8.202 4.361-.535-.775-8.857.83-.37 1.591 9.025 4.412-.542-.849-9.708.84-.374 1.74 9.87L24 17.318V3.5Zm.316 19.356.222 1.256L24 23.14v-4.18l-10.22 1.256Z" />
      </svg>
      {t("loginWithRiot")}
    </button>
  );
};

export { RiotButton };
export type { RiotButtonProps };
