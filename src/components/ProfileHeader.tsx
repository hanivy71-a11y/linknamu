import Image from "next/image";
import type { Profile } from "@/data/profile";

// 사진 둘레의 흰 테두리 + 아래로 떨어지는 따뜻한 그림자로 살짝 떠 있는 느낌을 준다.
const avatarClass =
  "h-32 w-32 rounded-full ring-[5px] ring-white/80 shadow-[0_18px_40px_-12px_rgb(190_110_60_/_0.45),0_4px_10px_-2px_rgb(190_110_60_/_0.2)] sm:h-36 sm:w-36 dark:ring-white/10 dark:shadow-[0_18px_40px_-12px_rgb(0_0_0_/_0.7)]";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={144}
          height={144}
          priority
          className={`${avatarClass} object-cover`}
        />
      ) : (
        <div
          aria-hidden="true"
          className={`${avatarClass} flex items-center justify-center bg-gradient-to-br from-[#ffd9bf] via-[#f6b48f] to-[#e98f6a] text-5xl font-semibold text-white`}
        >
          <span className="drop-shadow-[0_2px_6px_rgb(160_80_40_/_0.35)]">{profile.name.charAt(0)}</span>
        </div>
      )}
      <h1 className="mt-7 text-balance text-2xl font-bold tracking-tight text-stone-800 dark:text-stone-50">
        {profile.name}
      </h1>
      <p className="mt-2 text-balance text-[15px] leading-relaxed text-stone-500 dark:text-stone-400">{profile.bio}</p>
    </header>
  );
}
