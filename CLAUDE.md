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

## 명령어

- `npm run dev`: 개발 서버 (http://localhost:3000)
- `npm run build`: 프로덕션 빌드 (타입 검사 포함)
- `npm run lint`: ESLint (next/core-web-vitals)
- 테스트는 아직 없음

## 구조

- **콘텐츠는 `src/data/profile.ts` 한 곳에 있다.** 프로필과 링크 목록을 여기서 고친다. DB에는 링크를 저장하지 않는다. 링크의 `id`는 클릭 수 문서의 키이므로 바꾸면 기존 클릭 수와 연결이 끊긴다.
- **클릭 집계 흐름:** `LinkCard`(클라이언트 컴포넌트)가 클릭 시 `navigator.sendBeacon`으로 `POST /api/clicks` `{ id }`를 보낸다 → `src/app/api/clicks/route.ts`가 `profile.ts`에 등록된 id인지 확인 → `src/lib/clicks.ts`가 `clicks` 컬렉션의 `{ _id: 링크 id, count }`를 `$inc`로 upsert한다.
- **DB 없이도 동작해야 한다.** `MONGODB_URI`가 없으면 `getMongoClient()`가 `null`을 반환하고, 페이지는 클릭 수 표시 없이 렌더링되며 POST는 503을 돌려준다. 조회 실패도 빈 객체로 처리해 페이지가 깨지지 않게 한다. MongoClient는 핫 리로드 중 연결이 쌓이지 않도록 `globalThis`에 캐시한다.
- `src/app/page.tsx`는 `force-dynamic` 서버 컴포넌트로, 요청마다 클릭 수를 읽어 카드에 초기값으로 넘긴다.
- **다크 모드:** Tailwind `darkMode: "class"`. `ThemeToggle.tsx`의 `themeInitScript`가 `layout.tsx`의 `<head>`에서 렌더링 전에 실행되어 localStorage(`linknamu-theme`) 또는 OS 설정으로 `<html class="dark">`를 붙인다. 그래서 `<html>`에 `suppressHydrationWarning`이 있다. 색은 Tailwind 유틸리티의 `dark:` 변형으로 지정한다.
- 폰트는 `next/font/google`의 IBM Plex Sans KR을 `--font-sans` 변수로 주입하고 `tailwind.config.ts`의 `fontFamily.sans`에서 쓴다.

## 환경 변수

`.env.local.example`을 `.env.local`로 복사해 채운다. Vercel에서는 프로젝트 설정의 Environment Variables에 같은 이름으로 넣는다.

- `MONGODB_URI`: MongoDB Atlas 연결 문자열
- `MONGODB_DB`: DB 이름 (기본값 `linknamu`)
