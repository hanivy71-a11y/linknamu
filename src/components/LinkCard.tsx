"use client";

import { useState } from "react";
import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  initialCount?: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function recordClick() {
    // 페이지를 떠나는 중에도 요청이 끝까지 전송되도록 sendBeacon을 쓴다.
    const body = new Blob([JSON.stringify({ id: link.id })], { type: "application/json" });
    const sent = navigator.sendBeacon?.("/api/clicks", body);
    if (!sent) {
      fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
    }
    if (count !== undefined) setCount(count + 1);
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      title={link.description}
      className="relative flex min-h-14 items-center justify-center rounded-xl border-2 border-slate-300 bg-white px-12 py-3 text-center font-semibold transition hover:-translate-y-0.5 hover:border-sky-500 hover:bg-sky-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 dark:border-slate-600 dark:bg-slate-900/60 dark:hover:border-sky-500 dark:hover:bg-sky-500"
    >
      <span className="truncate">{link.title}</span>
      {count !== undefined && (
        <span className="absolute right-4 text-xs font-normal tabular-nums opacity-60">
          {count.toLocaleString("ko-KR")}회
        </span>
      )}
    </a>
  );
}
