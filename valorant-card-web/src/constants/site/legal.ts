interface LegalSectionData {
  title: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalDocumentData {
  title: string;
  lastModified: string;
  sections: LegalSectionData[];
}

const PRIVACY_POLICY: Record<"en" | "ko", LegalDocumentData> = {
  en: {
    title: "Privacy Policy",
    lastModified: "Last modified: April 7, 2025",
    sections: [
      {
        title: "1. Information We Collect",
        paragraphs: [
          "This service collects the following information through the Riot Games API:",
        ],
        items: [
          "Riot ID (Game Name + Tagline)",
          "PUUID (Player Universally Unique Identifier)",
          "Match history (recent competitive match records)",
          "Rank and tier information",
          "Agent usage statistics",
          "Per-round kills, deaths, and assists",
        ],
      },
      {
        title: "2. How We Collect Information",
        items: [
          "Data is collected via the Riot Games API after the user authorizes through Riot Sign On (RSO) OAuth",
          "Data is only collected after the player provides explicit opt-in consent",
          "We never collect Riot account credentials (passwords, etc.)",
        ],
      },
      {
        title: "3. Purpose of Data Use",
        items: [
          "Generating and displaying VALORANT player cards",
          "Calculating player performance scores",
        ],
      },
      {
        title: "4. Data Retention and Deletion",
        items: [
          "Collected data is processed temporarily for card generation purposes only.",
          "Session data is automatically deleted when the session expires.",
          "Users may request immediate deletion of their data at any time.",
        ],
      },
      {
        title: "5. Cookies",
        paragraphs: [
          "This service uses cookies for the following purposes:",
        ],
        items: [
          "Session cookie (vfc_session): Used to maintain RSO authentication state. Automatically expires within 24 hours of issuance.",
          "Locale cookie (locale): A functional cookie that stores your selected display language (Korean/English). Retained for up to one year and can be deleted by the user at any time via browser settings.",
          "This service does not use cookies for advertising, analytics, or tracking purposes.",
        ],
      },
      {
        title: "6. Third-Party Sharing",
        items: [
          "We do not sell collected personal information to third parties.",
          "We comply with the Riot Games API Terms of Service.",
          "The service is hosted on Vercel Inc. infrastructure, and data may be processed on servers located in the United States.",
        ],
      },
      {
        title: "7. Your Rights",
        paragraphs: [
          "You may request access to, correction of, or deletion of your personal data at any time.",
          "Contact: [omh232323@gmail.com](mailto:omh232323@gmail.com)",
        ],
      },
      {
        title: "8. Data Protection Officer",
        items: [
          "Name: OU9999",
          "Contact: [omh232323@gmail.com](mailto:omh232323@gmail.com)",
        ],
      },
      {
        title: "9. International Data Transfer",
        paragraphs: [
          "This service is hosted on Vercel Inc. (United States) cloud infrastructure. Collected data may be processed on servers located in the United States.",
        ],
        items: [
          "Destination country: United States",
          "Service provider: Vercel Inc.",
          "Data transferred: Riot ID, PUUID, match records, rank information",
          "Purpose: Service hosting and data processing",
        ],
      },
      {
        title: "Reference",
        paragraphs: [
          "Riot Games Privacy Notice: [https://www.riotgames.com/en/privacy-notice](https://www.riotgames.com/en/privacy-notice)",
        ],
      },
    ],
  },
  ko: {
    title: "개인정보처리방침",
    lastModified: "최종 수정일: 2025년 4월 7일",
    sections: [
      {
        title: "1. 수집하는 개인정보 항목",
        paragraphs: [
          "본 서비스는 Riot Games API를 통해 아래 정보를 수집합니다.",
        ],
        items: [
          "Riot ID (게임 이름 + 태그라인)",
          "PUUID (계정 고유 식별자)",
          "매치 히스토리 (최근 경쟁전 기록)",
          "랭크/티어 정보",
          "에이전트 사용 통계",
          "라운드별 킬/데스/어시스트",
        ],
      },
      {
        title: "2. 수집 방법",
        items: [
          "Riot Sign On(RSO) OAuth 동의 후 Riot Games API를 통해 수집",
          "플레이어 본인의 명시적 동의(opt-in) 후에만 수집",
          "Riot 계정 자격증명(비밀번호 등)은 일절 수집하지 않음",
        ],
      },
      {
        title: "3. 개인정보 이용 목적",
        items: [
          "발로란트 플레이어 카드 생성 및 표시",
          "플레이어 퍼포먼스 스코어 산출",
        ],
      },
      {
        title: "4. 보관 및 파기",
        items: [
          "수집된 데이터는 카드 생성 목적으로만 일시적으로 처리됩니다.",
          "세션 만료 시 세션 데이터는 자동 삭제됩니다.",
          "이용자 요청 시 관련 데이터를 즉시 삭제합니다.",
        ],
      },
      {
        title: "5. 쿠키 사용",
        paragraphs: ["본 서비스는 아래 목적으로 쿠키를 사용합니다."],
        items: [
          "세션 쿠키(vfc_session): RSO 인증 상태 유지를 위해 사용되며, 발급 후 최대 24시간 뒤 자동 만료됩니다.",
          "언어 설정 쿠키(locale): 선택한 표시 언어(한국어/영어)를 저장하기 위한 기능성 쿠키로, 최대 1년간 유지되며 이용자가 브라우저 설정에서 언제든 삭제할 수 있습니다.",
          "본 서비스는 광고, 분석, 트래킹 목적의 쿠키를 사용하지 않습니다.",
        ],
      },
      {
        title: "6. 제3자 제공",
        items: [
          "수집된 개인정보는 제3자에게 판매하지 않습니다.",
          "Riot Games API 이용약관을 준수합니다.",
          "서비스 호스팅을 위해 Vercel Inc. 인프라를 이용하며, 이에 따라 데이터가 해외(미국)에서 처리될 수 있습니다.",
        ],
      },
      {
        title: "7. 이용자 권리",
        paragraphs: [
          "이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제를 요청할 수 있습니다.",
          "문의: [omh232323@gmail.com](mailto:omh232323@gmail.com)",
        ],
      },
      {
        title: "8. 개인정보 보호책임자",
        items: [
          "성명: OU9999",
          "연락처: [omh232323@gmail.com](mailto:omh232323@gmail.com)",
        ],
      },
      {
        title: "9. 국외 이전",
        paragraphs: [
          "본 서비스는 Vercel Inc.(미국)의 클라우드 인프라에서 호스팅되며, 수집된 데이터가 미국 소재 서버에서 처리될 수 있습니다.",
        ],
        items: [
          "이전 국가: 미국",
          "이전 업체: Vercel Inc.",
          "이전 항목: Riot ID, PUUID, 매치 기록, 랭크 정보",
          "이전 목적: 서비스 호스팅 및 데이터 처리",
        ],
      },
      {
        title: "참고",
        paragraphs: [
          "Riot Games 개인정보방침: [https://www.riotgames.com/en/privacy-notice](https://www.riotgames.com/en/privacy-notice)",
        ],
      },
    ],
  },
};

const TERMS_OF_SERVICE: Record<"en" | "ko", LegalDocumentData> = {
  en: {
    title: "Terms of Service",
    lastModified: "Last modified: April 7, 2025",
    sections: [
      {
        title: "1. Service Description",
        items: [
          "VAL CARD is a tool that generates player cards based on public VALORANT match statistics.",
          "This service is provided free of charge with no paid features.",
          "This service is not affiliated with, endorsed by, or officially connected to Riot Games in any way.",
        ],
      },
      {
        title: "2. Terms of Use",
        items: [
          "Use of this service requires Riot Sign On (RSO) login and consent to data access.",
          "You may only access data from your own account.",
        ],
      },
      {
        title: "3. Intellectual Property",
        items: [
          "VALORANT, Riot Games, and all related assets are the property of Riot Games, Inc.",
          "Generated cards are for personal, non-commercial use only.",
        ],
      },
      {
        title: "4. Prohibited Activities",
        items: [
          "Abuse of the service or automated scraping",
          "Attempting to bypass rate limits",
          "Impersonating another user's account",
        ],
      },
      {
        title: "5. Disclaimer",
        items: [
          "This service is provided \"as-is\" without any warranties of any kind.",
          "We do not guarantee the accuracy of data or availability of the service.",
          "The service may be discontinued if the Riot Games API becomes unavailable.",
        ],
      },
      {
        title: "6. Governing Law",
        paragraphs: [
          "These terms shall be governed by and construed in accordance with the laws of the Republic of Korea.",
        ],
      },
      {
        title: "7. Contact",
        paragraphs: [
          "For inquiries regarding the service: [omh232323@gmail.com](mailto:omh232323@gmail.com)",
        ],
      },
    ],
  },
  ko: {
    title: "이용약관",
    lastModified: "최종 수정일: 2025년 4월 7일",
    sections: [
      {
        title: "1. 서비스 설명",
        items: [
          "VAL CARD는 발로란트 공개 매치 스탯을 기반으로 플레이어 카드를 생성하는 도구입니다.",
          "본 서비스는 유료 기능 없이 무료로 제공됩니다.",
          "본 서비스는 Riot Games와 제휴, 보증, 또는 공식적 관계가 없는 독립적인 서비스입니다.",
        ],
      },
      {
        title: "2. 이용 조건",
        items: [
          "서비스 이용을 위해 Riot Sign On(RSO) 로그인 및 데이터 공개 동의가 필요합니다.",
          "본인 계정의 데이터만 조회할 수 있습니다.",
        ],
      },
      {
        title: "3. 지적재산권",
        items: [
          "VALORANT, Riot Games 및 관련 자산은 Riot Games, Inc.의 소유입니다.",
          "생성된 카드는 개인 비상업적 용도로만 사용 가능합니다.",
        ],
      },
      {
        title: "4. 금지 행위",
        items: [
          "서비스 악용 및 자동화 스크래핑",
          "Rate limit 우회 시도",
          "타인 계정 사칭",
        ],
      },
      {
        title: "5. 면책 조항",
        items: [
          "본 서비스는 \"있는 그대로(as-is)\" 제공되며, 어떠한 보증도 하지 않습니다.",
          "데이터의 정확성 및 서비스 가용성을 보장하지 않습니다.",
          "Riot Games API 제공이 중단될 경우 서비스가 중단될 수 있습니다.",
        ],
      },
      {
        title: "6. 준거법",
        paragraphs: [
          "본 약관은 대한민국 법률에 따라 해석되고 적용됩니다.",
        ],
      },
      {
        title: "7. 문의",
        paragraphs: [
          "서비스 관련 문의: [omh232323@gmail.com](mailto:omh232323@gmail.com)",
        ],
      },
    ],
  },
};

export { PRIVACY_POLICY, TERMS_OF_SERVICE };
export type { LegalSectionData, LegalDocumentData };
