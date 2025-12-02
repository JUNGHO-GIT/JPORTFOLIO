# JPORTFOLIO Architecture

## Overview

JPORTFOLIO는 개인 포트폴리오 웹 애플리케이션으로, **Monorepo 구조**로 설계되어 있습니다.
- **Backend**: Express.js + MongoDB (Mongoose)
- **Frontend**: React + Vite + MUI

---

## Project Structure

```
JPORTFOLIO/
├── .node/                       
├── index.ts                    # Server entry point
├── package.json                # Server dependencies
├── tsconfig.json               # TypeScript configuration
├── changelog.md                # Version history
│
├── src/                        # Backend source
│   ├── routers/                # Express routers (API endpoints)
│   ├── services/               # Business logic layer
│   ├── repositories/           # Data access layer
│   ├── schemas/                # Mongoose schemas (MongoDB models)
│   └── assets/                 # Server-side utilities & types
│
└── client/                     # Frontend source
		├── .node/
    ├── index.tsx               # Client entry point
    ├── index.html              # HTML template
    ├── package.json            # Client dependencies
    ├── vite.config.ts          # Vite configuration
    │
    └── src/
        ├── pages/              # Page components
        ├── interfaces/         # Reusable UI components
        ├── hooks/              # Custom React hooks
        ├── stores/             # Zustand state management
        ├── exports/            # Module re-exports (barrel files)
        └── assets/             # Styles, scripts, types
```

---

## Backend Architecture

### Layer Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                      Express Server                          │
│                        (index.ts)                            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Routers                               │
│  aboutRouter │ skillsRouter │ portfoliosRouter │ projectsRouter │ adminRouter
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Services                              │
│  aboutService │ skillsService │ portfoliosService │ projectsService │ adminService
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Repositories                            │
│  aboutRepository │ skillsRepository │ portfoliosRepository │ projectsRepository │ adminRepository
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Schemas                               │
│        About │ Skills │ Portfolios │ Projects │ Admin │ Counter
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        MongoDB                               │
└─────────────────────────────────────────────────────────────┘
```

### API Endpoints

| Router      | Prefix        | Description         |
|-------------|---------------|---------------------|
| admin       | `/admin`      | 앱 정보 조회        |
| about       | `/about`      | About 섹션 데이터   |
| skills      | `/skills`     | Skills 섹션 데이터  |
| portfolios  | `/portfolios` | 포트폴리오 데이터   |
| projects    | `/projects`   | 프로젝트 상세 데이터|

### MongoDB Schemas

| Schema     | Collection   | Description                |
|------------|--------------|----------------------------|
| About      | About        | 자기소개 정보              |
| Skills     | Skills       | 기술 스택 정보             |
| Portfolios | Portfolios   | 포트폴리오 목록            |
| Projects   | Projects     | 프로젝트 상세 (섹션별)     |
| Admin      | Admin        | 관리자 정보                |
| Counter    | Counter      | Auto-increment 시퀀스      |

---

## Frontend Architecture

### Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                          App                                 │
│                      (index.tsx)                             │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │  Loader │          │  Routes │          │  Footer │
   └─────────┘          └─────────┘          └─────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │      Main       │
                    │    (Main.tsx)   │
                    └─────────────────┘
                              │
        ┌─────────┬───────────┼───────────┬─────────┐
        ▼         ▼           ▼           ▼         ▼
   ┌────────┐ ┌────────┐ ┌──────────┐ ┌────────┐ ┌──────────┐
   │  Hero  │ │ About  │ │  Skills  │ │Portfolios│ │Projects  │
   └────────┘ └────────┘ └──────────┘ └────────┘ └──────────┘
                                                       │
                              ┌────────────────────────┼────────────────────────┐
                              ▼                        ▼                        ▼
                         ┌─────────┐             ┌─────────┐             ┌─────────┐
                         │Project1 │    ...      │Project4 │    ...      │Project8 │
                         └─────────┘             └─────────┘             └─────────┘
```

### UI Component Structure

| Category    | Components                                    |
|-------------|-----------------------------------------------|
| Components  | Div, Img, Btn, Hr, Br, Grid, Paper, Icons, Bg, Popover |
| Containers  | Input, Select, TextArea, PopUp               |
| Layouts     | Loader, Footer, Toggle                       |

### State Management (Zustand)

| Store            | Purpose                      |
|------------------|------------------------------|
| useStoreLoading  | 로딩 상태 관리               |
| useStoreAlert    | Alert 알림 관리              |
| useStoreConfirm  | Confirm 다이얼로그 관리      |

### Custom Hooks

| Hook              | Purpose                          |
|-------------------|----------------------------------|
| useCommonValue    | 공통 값 (URL, API prefix 등)     |
| useResponsive     | 반응형 브레이크포인트            |
| useFocusedAxis    | 스크롤 축 포커스                 |
| useScrollTop      | 스크롤 위치 관리                 |
| useStorageLocal   | LocalStorage 관리               |
| useStorageSession | SessionStorage 관리             |

### Module Exports (Barrel Pattern)

```
exports/
├── ExportReacts.tsx       # React core exports
├── ExportMuis.tsx         # MUI components
├── ExportLibs.tsx         # External libraries
├── ExportHooks.tsx        # Custom hooks
├── ExportStores.tsx       # Zustand stores
├── ExportComponents.tsx   # UI components
├── ExportContainers.tsx   # Container components
├── ExportLayouts.tsx      # Layout components
├── ExportPages.tsx        # Page components
├── ExportImages.tsx       # Image assets
└── ExportScripts.tsx      # Utility scripts
```

---

## Tech Stack

### Backend

| Technology | Version | Purpose              |
|------------|---------|----------------------|
| Node.js    | 16.x    | Runtime              |
| Express    | 5.x     | Web framework        |
| MongoDB    | -       | Database             |
| Mongoose   | 9.x     | ODM                  |
| TypeScript | 5.x     | Type safety          |
| SWC        | -       | Fast compilation     |
| Bun        | -       | Package manager      |

### Frontend

| Technology | Version | Purpose              |
|------------|---------|----------------------|
| React      | 19.x    | UI library           |
| Vite       | 7.x     | Build tool           |
| MUI        | 7.x     | Component library    |
| Zustand    | 5.x     | State management     |
| Axios      | 1.x     | HTTP client          |
| Swiper     | 12.x    | Carousel             |
| TypeScript | 5.x     | Type safety          |

---

## Data Flow

```
┌────────────┐     HTTP      ┌────────────┐     Mongoose    ┌─────────┐
│   Client   │ ────────────► │   Server   │ ──────────────► │ MongoDB │
│  (React)   │ ◄──────────── │ (Express)  │ ◄────────────── │         │
└────────────┘    JSON       └────────────┘     Document    └─────────┘
      │
      ▼
┌────────────┐
│  Zustand   │
│   Store    │
└────────────┘
```

### Request Flow Example

1. **Client**: `axios.get('/api/projects/detail?project_id=Project1')`
2. **Router**: `projectsRouter.get('/detail')` → 요청 수신
3. **Service**: `projectsService.detail(project_id)` → 비즈니스 로직 처리
4. **Repository**: `projectsRepository.detail(project_id)` → DB 쿼리
5. **Schema**: `Projects.findOne({ project_id })` → MongoDB 조회
6. **Response**: JSON 형태로 클라이언트에 반환

---

## Build & Deployment

### Scripts

| Script    | Server                     | Client                     |
|-----------|----------------------------|----------------------------|
| sync      | `bun .node/cjs/sync.cjs`   | `bun .node/cjs/sync.cjs`   |
| start     | `bun .node/cjs/swc.cjs`    | `bun .node/cjs/swc.cjs`    |
| build     | `bun .node/cjs/swc.cjs`    | `bun .node/cjs/swc.cjs`    |
| gcloud    | `bun .node/cjs/gcloud.cjs` | `bun .node/cjs/gcloud.cjs` |

### Build Output

```
client/build/
├── index.html
├── manifest.json
├── robots.txt
└── assets/
    ├── css/
    │   └── index.[hash].css(.br)
    └── js/
        ├── index.[hash].js(.br)
        ├── react.[hash].js(.br)
        ├── mui.[hash].js(.br)
        └── vendor.[hash].js(.br)
```

---

## Path Aliases

### Server (tsconfig.paths.json)

| Alias          | Path                  |
|----------------|-----------------------|
| @routers/*     | src/routers/*         |
| @services/*    | src/services/*        |
| @repositories/*| src/repositories/*    |
| @schemas/*     | src/schemas/*         |
| @assets/*      | src/assets/*          |

### Client (vite.config.ts)

| Alias              | Path                          |
|--------------------|-------------------------------|
| @assets/*          | src/assets/*                  |
| @hooks/*           | src/hooks/*                   |
| @interfaces/*      | src/interfaces/*              |
| @pages/*           | src/pages/*                   |
| @stores/*          | src/stores/*                  |
| @exportReacts      | src/exports/ExportReacts      |
| @exportMuis        | src/exports/ExportMuis        |
| @exportHooks       | src/exports/ExportHooks       |
| @exportStores      | src/exports/ExportStores      |
| @exportComponents  | src/exports/ExportComponents  |
| @exportContainers  | src/exports/ExportContainers  |
| @exportLayouts     | src/exports/ExportLayouts     |
| @exportPages       | src/exports/ExportPages       |
| @exportLibs        | src/exports/ExportLibs        |
| @exportScripts     | src/exports/ExportScripts     |
