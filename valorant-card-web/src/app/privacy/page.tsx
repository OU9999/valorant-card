import {
  LegalPageLayout,
  LegalSection,
} from "@/components/layout/legal-page-layout";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="개인정보처리방침" lastModified="2025년 4월 7일">
      <LegalSection title="1. 수집하는 개인정보 항목">
        <p>본 서비스는 Riot Games API를 통해 아래 정보를 수집합니다.</p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>Riot ID (게임 이름 + 태그라인)</li>
          <li>PUUID (계정 고유 식별자)</li>
          <li>매치 히스토리 (최근 경쟁전 기록)</li>
          <li>랭크/티어 정보</li>
          <li>에이전트 사용 통계</li>
          <li>라운드별 킬/데스/어시스트</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. 수집 방법">
        <ul className="list-inside list-disc space-y-1">
          <li>Riot Sign On(RSO) OAuth 동의 후 Riot Games API를 통해 수집</li>
          <li>플레이어 본인의 명시적 동의(opt-in) 후에만 수집</li>
          <li>Riot 계정 자격증명(비밀번호 등)은 일절 수집하지 않음</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. 개인정보 이용 목적">
        <ul className="list-inside list-disc space-y-1">
          <li>발로란트 플레이어 카드 생성 및 표시</li>
          <li>플레이어 퍼포먼스 스코어 산출</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. 보관 및 파기">
        <ul className="list-inside list-disc space-y-1">
          <li>수집된 데이터는 카드 생성 목적으로만 일시적으로 처리됩니다.</li>
          <li>세션 만료 시 세션 데이터는 자동 삭제됩니다.</li>
          <li>이용자 요청 시 관련 데이터를 즉시 삭제합니다.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. 쿠키 사용">
        <p>본 서비스는 아래 목적으로 쿠키를 사용합니다.</p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>
            세션 쿠키: RSO 인증 상태 유지를 위해 사용되며, 브라우저 종료 시 자동
            삭제됩니다.
          </li>
          <li>
            본 서비스는 광고, 분석, 트래킹 목적의 쿠키를 사용하지 않습니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="6. 제3자 제공">
        <ul className="list-inside list-disc space-y-1">
          <li>수집된 개인정보는 제3자에게 판매하지 않습니다.</li>
          <li>Riot Games API 이용약관을 준수합니다.</li>
          <li>
            서비스 호스팅을 위해 Vercel Inc. 인프라를 이용하며, 이에 따라
            데이터가 해외(미국)에서 처리될 수 있습니다.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="7. 이용자 권리">
        <p>
          이용자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제를 요청할 수
          있습니다.
        </p>
        <p className="mt-2">
          문의:{" "}
          <a
            href="mailto:omh232323@gmail.com"
            className="text-primary transition-colors hover:text-primary/80"
          >
            omh232323@gmail.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="8. 개인정보 보호책임자">
        <ul className="list-inside list-disc space-y-1">
          <li>성명: OU9999</li>
          <li>
            연락처:{" "}
            <a
              href="mailto:omh232323@gmail.com"
              className="text-primary transition-colors hover:text-primary/80"
            >
              omh232323@gmail.com
            </a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="9. 국외 이전">
        <p>
          본 서비스는 Vercel Inc.(미국)의 클라우드 인프라에서 호스팅되며, 수집된
          데이터가 미국 소재 서버에서 처리될 수 있습니다.
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1">
          <li>이전 국가: 미국</li>
          <li>이전 업체: Vercel Inc.</li>
          <li>이전 항목: Riot ID, PUUID, 매치 기록, 랭크 정보</li>
          <li>이전 목적: 서비스 호스팅 및 데이터 처리</li>
        </ul>
      </LegalSection>

      <LegalSection title="참고">
        <p>
          Riot Games 개인정보방침:{" "}
          <a
            href="https://www.riotgames.com/en/privacy-notice"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary transition-colors hover:text-primary/80"
          >
            https://www.riotgames.com/en/privacy-notice
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
