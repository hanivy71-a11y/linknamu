import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { links, profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

// 클릭 수를 매 요청마다 새로 읽는다.
export const dynamic = "force-dynamic";

// 레이아웃은 wireframe.png를 따른다: 카드 한 장 안에 큰 원형 사진 → 이름 → 소개 → 세로로 쌓인 링크 버튼.
export default async function Home() {
  const counts = await getClickCounts();
  // DB가 연결되지 않았으면 카드에 클릭 수를 표시하지 않는다.
  const showCounts = Boolean(process.env.MONGODB_URI);

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-4 py-16">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <section className="w-full max-w-sm rounded-[2rem] border border-slate-200/80 bg-white/70 px-6 pb-8 pt-10 shadow-xl shadow-sky-500/10 backdrop-blur sm:px-8 dark:border-slate-700/80 dark:bg-slate-800/60 dark:shadow-black/30">
        <ProfileHeader profile={profile} />

        <ul className="mt-8 flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} initialCount={showCounts ? (counts[link.id] ?? 0) : undefined} />
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">링크나무</footer>
    </main>
  );
}
