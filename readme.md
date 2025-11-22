# JPORTFOLIO

- [Project Detail](https://www.junghomun.com/JPORTFOLIO/projects/project5)
- [Project Url](https://www.junghomun.com/JPORTFOLIO)

## client (bun + swc)

The React `client` bundle ships with a Bun-driven helper located at `client/.node/swc.cjs`. The helper orchestrates `bun build`/`bun start` along with SWC so that the project can run without `react-scripts`.

### 설치

1. `cd client`
2. `bun install`

### 개발 서버

- `bun run start` (runs `bun .node/swc.cjs --bun --start --client` which currently forwards to `craco start` so you still get the familiar CRA dev server powered by Bun).

### 프로덕션 빌드

- `bun run build` (runs `bun .node/swc.cjs --bun --build --client`). The helper copies `public/` to `build/`, runs `bun build ./src/index.tsx --outdir ./build/static/js` with SWC, rewrites `%PUBLIC_URL%` placeholders using `package.json` `homepage`/`PUBLIC_URL`, and injects the generated bundle entrypoint into `build/index.html`.

추가적으로 `bun run reset|fix|git|gcloud`로 `.node/*` 스크립트를 실행하면 관련 배포/정리 워크플로우를 Bun 환경에서 그대로 사용할 수 있습니다.
