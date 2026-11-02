// 페이지에 표시할 프로필과 링크. 링크를 추가·수정할 때는 이 파일만 고치면 된다.
// id는 클릭 수를 저장하는 키이므로 한 번 정하면 바꾸지 않는다.

export type Profile = {
  name: string;
  bio: string;
  /** public/ 아래 이미지 경로 (예: "/avatar.jpg"). 비워 두면 이름 첫 글자로 아바타를 그린다. */
  image?: string;
};

export type LinkItem = {
  id: string;
  title: string;
  url: string;
  description?: string;
};

export const profile: Profile = {
  name: "Edward",
  bio: "Guitar, Code, Family",
};

export const links: LinkItem[] = [
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com/hanivy71-a11y",
    description: "만들고 있는 코드",
  },
  {
    id: "linktree",
    title: "Linktree",
    url: "https://linktr.ee/hanivy71",
    description: "예전 링크 모음",
  },
  {
    id: "blog",
    title: "Blog",
    url: "https://blog.naver.com/hanivy",
    description: "네이버 블로그",
  },
];

export const linkIds = new Set(links.map((link) => link.id));
