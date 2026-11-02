import Image from "next/image";
import type { Profile } from "@/data/profile";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <header className="flex flex-col items-center text-center">
      {profile.image ? (
        <Image
          src={profile.image}
          alt={`${profile.name} 프로필 사진`}
          width={160}
          height={160}
          priority
          className="h-36 w-36 rounded-full object-cover ring-4 ring-white shadow-lg shadow-sky-500/30 sm:h-40 sm:w-40 dark:ring-slate-700"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 via-sky-500 to-sky-600 text-6xl font-bold text-white ring-4 ring-white shadow-lg shadow-sky-500/30 sm:h-40 sm:w-40 dark:ring-slate-700"
        >
          {profile.name.charAt(0)}
        </div>
      )}
      <h1 className="mt-7 text-balance text-xl font-bold uppercase tracking-[0.12em] sm:text-2xl">{profile.name}</h1>
      <p className="mt-2 text-balance text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-slate-400">
        {profile.bio}
      </p>
    </header>
  );
}
