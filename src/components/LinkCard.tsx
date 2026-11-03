"use client";

import type { LinkItem } from "@/data/profile";

type Props = {
  link: LinkItem;
  /** 표시할 클릭 수. undefined면 표시하지 않는다. */
  count?: number;
  onClick?: () => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  function recordClick() {
    // 페이지를 떠나는 중에도 요청이 끝까지 전송되도록 sendBeacon을 쓴다.
    const body = new Blob([JSON.stringify({ id: link.id })], { type: "application/json" });
    const sent = navigator.sendBeacon?.("/api/clicks", body);
    if (!sent) {
      fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
    }
    onClick?.();
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordClick}
      title={link.description}
      className="relative flex min-h-[3.75rem] items-center justify-center rounded-2xl border border-white/70 bg-white/45 px-14 py-4 text-center text-[15px] font-semibold text-stone-700 shadow-[0_1px_0_rgb(255_255_255_/_0.8)_inset,0_8px_24px_-12px_rgb(180_110_70_/_0.3)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_1px_0_rgb(255_255_255_/_0.9)_inset,0_12px_28px_-12px_rgb(180_110_70_/_0.4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:text-stone-200 dark:shadow-[0_1px_0_rgb(255_255_255_/_0.06)_inset,0_8px_24px_-12px_rgb(0_0_0_/_0.6)] dark:hover:bg-white/[0.1]"
    >
      <span className="truncate">{link.title}</span>
      {count !== undefined && (
        <span className="absolute right-5 text-xs font-medium tabular-nums text-stone-400 dark:text-stone-500">
          {count.toLocaleString("ko-KR")}회
        </span>
      )}
    </a>
  );
}
