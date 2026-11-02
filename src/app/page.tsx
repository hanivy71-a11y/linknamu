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
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-20 sm:px-8">
      <div className="absolute right-5 top-5 sm:right-6 sm:top-6">
        <ThemeToggle />
      </div>

      <section className="w-full max-w-[26rem] rounded-[2.5rem] border border-white/60 bg-white/25 px-7 pb-10 pt-12 shadow-[0_30px_80px_-30px_rgb(180_110_70_/_0.35)] backdrop-blur-2xl sm:px-10 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_30px_80px_-30px_rgb(0_0_0_/_0.6)]">
        <ProfileHeader profile={profile} />

        <ul className="mt-10 flex flex-col gap-4">
          {links.map((link) => (
            <li key={link.id}>
              <LinkCard link={link} initialCount={showCounts ? (counts[link.id] ?? 0) : undefined} />
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-10 text-center text-xs font-medium tracking-[0.2em] text-stone-400 dark:text-stone-500">
        링크나무
      </footer>
    </main>
  );
}
