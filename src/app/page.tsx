"use client";

import { useState } from "react";
import { fetchApi } from "@/network/fetch-api";
import type { FetchResult } from "@/network/fetch-api";
import { API_ENDPOINTS } from "@/constants/api-endpoints";

const ExamplePage = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FetchResult<unknown> | null>(null);

  const handleFetchContent = async () => {
    setLoading(true);
    const res = await fetchApi(`${API_ENDPOINTS.CONTENT}?locale=ko-KR`);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Valorant API Example
          </h1>
          <p className="mt-2 text-gray-400">
            Riot Games API 엔드포인트 테스트 페이지
          </p>
        </div>

        <section className="space-y-4 rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-xl font-semibold text-white">
            Content (게임 컨텐츠)
          </h2>
          <button
            type="button"
            onClick={handleFetchContent}
            className="rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-600"
          >
            컨텐츠 조회
          </button>

          {loading && <p className="text-sm text-gray-400">로딩 중...</p>}

          {result && !result.ok && (
            <pre className="overflow-auto rounded-lg bg-red-950 p-4 text-sm text-red-300">
              {result.error}
            </pre>
          )}

          {result?.ok && (
            <pre className="max-h-80 overflow-auto rounded-lg bg-gray-800 p-4 text-sm text-green-300">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          )}
        </section>
      </div>
    </div>
  );
};

export default ExamplePage;
