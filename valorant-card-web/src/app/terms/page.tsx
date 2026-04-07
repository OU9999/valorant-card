import {
  LegalPageLayout,
  LegalSection,
} from "@/components/layout/legal-page-layout";

export default function TermsPage() {
  return (
    <LegalPageLayout title="이용약관" lastModified="2025년 4월 7일">
      <LegalSection title="1. 서비스 설명">
        <ul className="list-inside list-disc space-y-1">
          <li>
            Valorant Card는 발로란트 공개 매치 스탯을 기반으로 플레이어 카드를
            생성하는 도구입니다.
          </li>
          <li>
            본 서비스는 Riot Games와 제휴, 보증, 또는 공식적 관계가 없는
            독립적인 서비스입니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. 이용 조건">
        <ul className="list-inside list-disc space-y-1">
          <li>
            서비스 이용을 위해 Riot Sign On(RSO) 로그인 및 데이터 공개 동의가
            필요합니다.
          </li>
          <li>본인 계정의 데이터만 조회할 수 있습니다.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 지적재산권">
        <ul className="list-inside list-disc space-y-1">
          <li>
            VALORANT, Riot Games 및 관련 자산은 Riot Games, Inc.의 소유입니다.
          </li>
          <li>생성된 카드는 개인 비상업적 용도로만 사용 가능합니다.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. 금지 행위">
        <ul className="list-inside list-disc space-y-1">
          <li>서비스 악용 및 자동화 스크래핑</li>
          <li>Rate limit 우회 시도</li>
          <li>타인 계정 사칭</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. 면책 조항">
        <ul className="list-inside list-disc space-y-1">
          <li>
            본 서비스는 &quot;있는 그대로(as-is)&quot; 제공되며, 어떠한 보증도
            하지 않습니다.
          </li>
          <li>데이터의 정확성 및 서비스 가용성을 보장하지 않습니다.</li>
          <li>
            Riot Games API 제공이 중단될 경우 서비스가 중단될 수 있습니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. 준거법">
        <p>본 약관은 대한민국 법률에 따라 해석되고 적용됩니다.</p>
      </LegalSection>

      <LegalSection title="7. 문의">
        <p>
          서비스 관련 문의:{" "}
          <a
            href="mailto:omh232323@gmail.com"
            className="text-primary transition-colors hover:text-primary/80"
          >
            omh232323@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
