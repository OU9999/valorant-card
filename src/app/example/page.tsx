"use client";

import { useState } from "react";

interface ApiState {
  loading: boolean;
  data: unknown;
  error: string | null;
}

const INITIAL_STATE: ApiState = { loading: false, data: null, error: null };

const ExamplePage = () => {
  const [content, setContent] = useState<ApiState>(INITIAL_STATE);
  const [status, setStatus] = useState<ApiState>(INITIAL_STATE);
  const [account, setAccount] = useState<ApiState>(INITIAL_STATE);
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");

  const fetchApi = async (
    url: string,
    setter: (state: ApiState) => void,
  ) => {
    setter({ loading: true, data: null, error: null });
    try {
      const res = await fetch(url);
      const json = await res.json();
      if (!res.ok) {
        setter({ loading: false, data: null, error: json.error ?? `HTTP ${res.status}` });
        return;
      }
      setter({ loading: false, data: json, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setter({ loading: false, data: null, error: message });
    }
  };

  const handleAccountSearch = () => {
    if (!gameName.trim() || !tagLine.trim()) return;
    fetchApi(
      `/api/valorant/account/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
      setAccount,
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Valorant API Example</h1>
          <p className="mt-2 text-gray-400">Riot Games API 엔드포인트 테스트 페이지</p>
        </div>

        {/* Account Lookup */}
        <section className="space-y-4 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">Account 조회</h2>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Game Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-500"
            />
            <input
              type="text"
              placeholder="Tag Line"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              className="w-28 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 outline-none focus:border-red-500"
            />
            <button
              type="button"
              onClick={handleAccountSearch}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
            >
              검색
            </button>
          </div>
          <ResultBlock state={account} />
        </section>

        {/* Content API */}
        <section className="space-y-4 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">Content (게임 컨텐츠)</h2>
          <button
            type="button"
            onClick={() => fetchApi("/api/valorant/content?locale=ko-KR", setContent)}
            className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-600"
          >
            컨텐츠 조회
          </button>
          <ResultBlock state={content} />
        </section>

        {/* Status API */}
        <section className="space-y-4 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">Status (서버 상태)</h2>
          <button
            type="button"
            onClick={() => fetchApi("/api/valorant/status", setStatus)}
            className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-600"
          >
            서버 상태 조회
          </button>
          <ResultBlock state={status} />
        </section>

        {/* Endpoint Reference */}
        <section className="space-y-3 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">API 엔드포인트 목록</h2>
          <ul className="space-y-1 text-sm text-gray-400">
            <li><code className="text-gray-300">GET /api/valorant/account/:gameName/:tagLine</code> - 계정 조회</li>
            <li><code className="text-gray-300">GET /api/valorant/matches/:matchId</code> - 매치 상세</li>
            <li><code className="text-gray-300">GET /api/valorant/matches/by-puuid/:puuid</code> - 매치 히스토리</li>
            <li><code className="text-gray-300">GET /api/valorant/matches/recent/:queue</code> - 최근 매치</li>
            <li><code className="text-gray-300">GET /api/valorant/ranked/:actId</code> - 랭크 리더보드</li>
            <li><code className="text-gray-300">GET /api/valorant/content</code> - 게임 컨텐츠</li>
            <li><code className="text-gray-300">GET /api/valorant/status</code> - 서버 상태</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const ResultBlock = ({ state }: { state: ApiState }) => {
  if (state.loading) {
    return <p className="text-sm text-gray-400">로딩 중...</p>;
  }

  if (state.error) {
    return (
      <pre className="overflow-auto rounded-lg bg-red-950 p-4 text-sm text-red-300">
        {state.error}
      </pre>
    );
  }

  if (!state.data) return null;

  return (
    <pre className="max-h-80 overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-300">
      {JSON.stringify(state.data, null, 2)}
    </pre>
  );
};

export default ExamplePage;
