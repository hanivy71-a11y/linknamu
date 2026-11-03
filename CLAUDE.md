# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

# 링크나무 (Link in Bio 서비스)

## 프로젝트 개요

Linktree처럼 내 모든 링크를 한 페이지에 모아두고
하나의 URL로 공유할 수 있는 서비스입니다.

제품 요구사항(타깃 사용자, 핵심 기능, 출시 범위)은 `PRD.MD`에 있다.

## 기술 스택

- Next.js 14 (App Router)
- Tailwind CSS
- MongoDB Atlas (클릭 수 저장)
- Vercel (배포)

## 주요 기능

- 프로필 표시 (이름, 소개, 사진)
- 링크 카드 목록
- 다크모드 토글
- 링크 클릭 수 집계

## 코드 규칙

- TypeScript 사용
- 컴포넌트는 src/components/ 아래에 작성
- 환경 변수는 .env.local에 저장 (절대 커밋하지 않음)
- 모바일 우선 반응형 디자인

## 커밋 메시지 규칙

`<꼬리표>: <한국어로 무엇을 했는지>` 형식으로 쓴다 (Conventional Commits). 예: `fix: 다크 모드에서 클릭 수가 안 보이는 문제 수정`

| 꼬리표 | 언제 쓰나 |
|---|---|
| `feat` | 새 기능 추가 (사용자가 새로 할 수 있는 게 생김) |
| `fix` | 버그 수정 |
| `style` | 디자인·UI만 변경 (기능은 그대로) |
| `docs` | 문서만 수정 (README, CLAUDE.md, PRD.md 등) |
| `refactor` | 동작은 같고 코드 구조만 개선 |
| `chore` | 설정, 패키지 추가·업데이트 등 잡일 |

- 사용자가 메시지를 지정하면 그대로 쓰고, 지정하지 않으면 변경 내용에 맞는 꼬리표를 골라 쓴다.
- 한 커밋에는 한 종류의 변경만 담는 것을 원칙으로 한다.

## 명령어

- `npm run dev`: 개발 서버 (http://localhost:3000)
- `npm run build`: 프로덕션 빌드 (타입 검사 포함)
- `npm run lint`: ESLint (next/core-web-vitals)
- 테스트는 아직 없음

## 구조

- **콘텐츠는 `src/data/profile.ts` 한 곳에 있다.** 프로필과 링크 목록을 여기서 고친다. DB에는 링크를 저장하지 않는다. 링크의 `id`는 클릭 수 문서의 키이므로 바꾸면 기존 클릭 수와 연결이 끊긴다.
- **클릭 집계 흐름:** `LinkCard`(클라이언트 컴포넌트)가 클릭 시 `navigator.sendBeacon`으로 `POST /api/clicks` `{ id }`를 보낸다 → `src/app/api/clicks/route.ts`가 `profile.ts`에 등록된 id인지 확인 → `src/lib/clicks.ts`가 `clicks` 컬렉션의 `{ _id: 링크 id, count }`를 `$inc`로 upsert한다.
- **DB 없이도 동작해야 한다.** `MONGODB_URI`가 없으면 `getMongoClient()`가 `null`을 반환하고, GET·POST `/api/clicks`는 503을 돌려주고 페이지는 클릭 수 표시 없이 동작한다. 조회에 실패하면 `getClickCounts()`가 `null`을 반환하고 GET도 503으로 응답해 페이지가 깨지지 않게 한다. MongoClient는 핫 리로드 중 연결이 쌓이지 않도록 `globalThis`에 캐시한다.
- **클릭 수 표시 흐름:** `src/app/page.tsx`는 클릭 수를 읽지 않는다. 클라이언트 컴포넌트 `LinkList`가 처음에는 모든 카드에 0회를 보여 주고, 마운트되면 `GET /api/clicks`로 전체 클릭 수를 한 번에 받아 갱신한다. 카드를 누르면 화면의 숫자도 바로 1 올린다. GET이 503(DB 미설정·조회 실패)이면 클릭 수 표시를 숨긴다.
- **다크 모드:** Tailwind `darkMode: "class"`. `ThemeToggle.tsx`의 `themeInitScript`가 `layout.tsx`의 `<head>`에서 렌더링 전에 실행되어 localStorage(`linknamu-theme`) 또는 OS 설정으로 `<html class="dark">`를 붙인다. 그래서 `<html>`에 `suppressHydrationWarning`이 있다. 색은 Tailwind 유틸리티의 `dark:` 변형으로 지정한다.
- 폰트는 `pretendard` 패키지의 가변 폰트를 `next/font/local`로 불러 `--font-sans` 변수로 주입하고 `tailwind.config.ts`의 `fontFamily.sans`에서 쓴다.

## 환경 변수

`.env.local.example`을 `.env.local`로 복사해 채운다. Vercel에서는 프로젝트 설정의 Environment Variables에 같은 이름으로 넣는다.

- `MONGODB_URI`: MongoDB Atlas 연결 문자열
- `MONGODB_DB`: DB 이름 (기본값 `linknamu`)
