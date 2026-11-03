"use client";

import { useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { LinkItem } from "@/data/profile";

// 클릭 수를 받아오기 전까지 모든 카드에 보여 줄 값
const PLACEHOLDER_COUNT = 0;

type Props = {
  links: LinkItem[];
};

export default function LinkList({ links }: Props) {
  // null이면 클릭 수를 표시하지 않는다(DB 미설정·조회 실패).
  const [counts, setCounts] = useState<Record<string, number> | null>(() =>
    Object.fromEntries(links.map((link) => [link.id, PLACEHOLDER_COUNT])),
  );

  // 페이지가 열리면 모든 링크의 클릭 수를 한 번에 가져온다.
  useEffect(() => {
    let cancelled = false;

    fetch("/api/clicks", { cache: "no-store" })
      .then((res) => (res.ok ? (res.json() as Promise<Record<string, number>>) : null))
      .then((data) => {
        if (cancelled) return;
        // 응답이 오기 전에 누른 클릭은 이미 서버 값에 반영됐을 수 있으므로 서버 값으로 덮어쓴다.
        setCounts(data ? Object.fromEntries(links.map((link) => [link.id, data[link.id] ?? 0])) : null);
      })
      .catch(() => {
        if (!cancelled) setCounts(null);
      });

    return () => {
      cancelled = true;
    };
  }, [links]);

  function handleClick(id: string) {
    setCounts((prev) => (prev ? { ...prev, [id]: (prev[id] ?? 0) + 1 } : prev));
  }

  return (
    <ul className="mt-10 flex flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard link={link} count={counts?.[link.id]} onClick={() => handleClick(link.id)} />
        </li>
      ))}
    </ul>
  );
}
