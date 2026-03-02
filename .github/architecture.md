# JPORTFOLIO — Architecture

## 1. 프로젝트 설명

개인 포트폴리오 웹사이트 (junghomun.com). Express REST API 백엔드와 React SPA 프론트엔드로 구성된 풀스택 모노레포.

## 2. 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 언어 | TypeScript | 5.9.3 |
| 런타임 / 패키지매니저 | Bun (기본), Node.js (engine: 16.x) | Latest / 16.x |
| 서버 프레임워크 | Express | 5.2.1 |
| DB / ODM | MongoDB / Mongoose | 9.1.6 |
| 클라이언트 프레임워크 | React | 19.2.4 |
| 빌드 도구 (클라이언트) | Vite | 7.3.1 |
| UI 라이브러리 | MUI | 7.3.7 |
| 상태관리 | Zustand | 5.0.11 |
| 트랜스파일러 | SWC | 1.15.11 |
| 인증 | Passport + Google OAuth2 | — |
| 스토리지 | Google Cloud Storage | — |
| 결제 | Stripe | — |
| 프로세스 관리 | PM2 (production) | — |

## 3. 디렉토리 구조

```
./                            # 서버 루트 (Express + TypeScript)
├── index.ts                  # 서버 엔트리포인트
├── src/
│   ├── assets/               # 공용 타입, 스크립트, 유틸리티
│   │   └── scripts/          # env 로더, fetch polyfill 등
│   ├── repositories/         # DB 접근 계층 (Mongoose 쿼리)
│   ├── routers/              # Express 라우트 핸들러
│   ├── schemas/              # Mongoose 스키마 정의
│   └── services/             # 비즈니스 로직 계층
├── .node/                    # 빌드/배포 스크립트 (auto-synced — 수정 금지)
│   ├── mjs/                  # swc.mjs, fix.mjs, git.mjs, gcloud.mjs, sync.mjs
│   └── lib/                  # 공유 유틸리티
├── client/                   # React 프론트엔드 (Vite + TypeScript)
│   ├── src/
│   │   ├── assets/           # 정적 자산, 스타일
│   │   ├── exports/          # Barrel re-export 파일
│   │   ├── hooks/            # 커스텀 React 훅
│   │   ├── interfaces/       # TypeScript 인터페이스
│   │   ├── pages/            # 페이지 컴포넌트
│   │   └── stores/           # Zustand 상태 스토어
│   └── vite.config.ts        # Vite 설정
├── eslint.config.mjs         # ESLint flat config
├── tsconfig.json             # TypeScript 컴파일러 옵션
├── tsconfig.paths.json       # 서버 Path alias 정의
├── .server.swcrc             # 서버 SWC 트랜스파일 설정
├── ecosystem.config.cjs      # PM2 프로세스 관리 설정
├── .env                      # 환경 변수 (git-ignored in production)
├── .env.development          # 개발 환경 오버라이드
└── .env.production           # 프로덕션 환경 오버라이드
```

### 수정 금지 경로

| 경로 | 이유 |
|------|------|
| `.node/` | `bun run sync`로 CDN에서 자동 동기화. 수동 편집 시 덮어쓰기됨 |
| `node_modules/` | 의존성 아티팩트 — Bun이 관리 |
| `out/`, `client/build/` | 컴파일러 출력 — 빌드 시 재생성 |

## 4. 빌드 / 실행 명령어

| 작업 | 명령어 | 설명 |
|------|--------|------|
| 서버 의존성 설치 | `bun install` | 루트에서 실행 |
| 클라이언트 의존성 설치 | `cd client && bun install` | client/ 에서 실행 |
| 서버 빌드 | `bun run build` | SWC 컴파일 → `out/` 출력 |
| 클라이언트 빌드 | `cd client && bun run build` | Vite 빌드 → `client/build/` 출력 |
| 서버 개발 실행 | `bun run start` | tsx watch 모드로 서버 시작 |
| 클라이언트 개발 실행 | `cd client && bun run start` | Vite dev server (port 3000) |
| 린트/자동수정 | `bun run fix` | ts-prune + ESLint 자동 수정 |
| 스크립트 동기화 | `bun run sync` | `.node/` CDN 스크립트 동기화 |
| 프로덕션 배포 | `pm2 start ecosystem.config.cjs --env production` | PM2로 서버 실행 |

> **주의**: Bun 미설치 환경에서는 `node .node/mjs/swc.mjs --npm --build --server` 형태로 npm fallback 사용 가능.

## 5. 사용 가능한 스크립트

### 서버 (root `package.json`)

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| `sync` | `bun .node/mjs/sync.mjs --bun --sync --server` | CDN 스크립트 동기화 |
| `start` | `bun .node/mjs/swc.mjs --bun --start --server` | 개발 서버 시작 |
| `build` | `bun .node/mjs/swc.mjs --bun --build --server` | 서버 빌드 |
| `fix` | `bun .node/mjs/fix.mjs --bun --fix` | 린트 자동 수정 |
| `gcloud` | `bun .node/mjs/gcloud.mjs --bun --server` | GCloud 배포 |
| `git-push-y` | `bun .node/mjs/git.mjs --bun --push --y` | Git 푸시 (확인 있음) |

### 클라이언트 (`client/package.json`)

| 스크립트 | 명령어 | 설명 |
|----------|--------|------|
| `sync` | `bun .node/mjs/sync.mjs --bun --sync --client` | CDN 스크립트 동기화 |
| `start` | `bun .node/mjs/swc.mjs --bun --start --client` | Vite 개발 서버 시작 |
| `build` | `bun .node/mjs/swc.mjs --bun --build --client` | Vite 프로덕션 빌드 |
| `fix` | `bun .node/mjs/fix.mjs --bun --fix` | 린트 자동 수정 |
| `gcloud` | `bun .node/mjs/gcloud.mjs --bun --client` | GCloud 배포 |

### 환경 변수 (주요 키)

| 변수 | 설명 |
|------|------|
| `NODE_ENV` / `ENV_MODE` | `DEVELOPMENT` 또는 `PRODUCTION` |
| `HTTP_PREFIX` | API 경로 접두사 (기본: `/JPORTFOLIO/api`) |
| `HTTP_PORT` | 서버 포트 (기본: `4000`) |
| `CLIENT_URL` | 클라이언트 origin (기본: `http://localhost:3000/JPORTFOLIO`) |
| `DB_USER` / `DB_PASS` / `DB_HOST` / `DB_PORT` / `DB_NAME` | MongoDB 접속 정보 |
