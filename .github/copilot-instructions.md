# JPORTFOLIO — Copilot Instructions

## 1. 핵심 원칙

- **Readability > Performance > Cleverness**
- **SRP** — 함수 하나 = 작업 하나
- **Fail-fast** — 문맥 있는 에러 메시지로 즉시 실패
- 명확하고 서술적인 이름 사용 (`request` not `req`)
- 대상 독자: 시니어 개발자. 튜토리얼식 설명 금지
- API나 라이브러리를 지어내지 마라

## 2. 포매팅

- NEVER single-line `if/else/try/catch/loop`. ALWAYS braces `{}` + line breaks
- `else`와 `catch`는 반드시 닫는 `}` 다음 **새 줄**에서 시작
- `=`와 `:` 주위 공백 1개. 세로 정렬용 패딩 금지
- 화살표 기본값은 공백 없음: `(a=1) => {}`
- 최대 중첩 4단계. 더 깊으면 헬퍼로 추출
- 주석: `// 1. name ---- (대시를 col 90까지 채움)`

```typescript
// ✅ DO
if (isValid) {
  process();
}
else {
  handleError();
}

// ❌ DON'T
if (isValid) process();
else handleError();
```

## 3. 네이밍 컨벤션

| 대상 | 규칙 | 예시 |
|------|------|------|
| 서버 파일 | PascalCase.ts | `AboutService.ts`, `SkillsRouter.ts` |
| Mongoose 스키마 | PascalCase.ts | `About.ts`, `Skills.ts` |
| 클라이언트 페이지 | PascalCase 컴포넌트 | `pages/about/About.tsx` |
| 스토어 | camelCase + Store | `aboutStore.ts` |
| 빌드 스크립트 | camelCase.mjs | `swc.mjs`, `fix.mjs` |
| 상수 | UPPER_SNAKE_CASE | `HTTP_PREFIX`, `DB_NAME` |
| 함수/변수 | camelCase | `loadEnv()`, `httpPort` |

## 4. Java 규칙

- **Java 11** 기준
- `null` 반환 금지 → `Optional<T>` 또는 `Collections.emptyList()`
- `Objects.requireNonNull()`로 필수 파라미터 검증
- `AutoCloseable`은 반드시 `try-with-resources`
- `final` 선호 — 필드, 지역 변수 모두
- 가변 상태는 방어적 복사본 반환
- 인터페이스로 선언: `List<T>` not `ArrayList<T>`
- Stream API 선호, 루프 내 `StringBuilder`, 매직 값은 `private static final` 상수로

```java
// ✅ DO
public Optional<User> findById(String id) {
    Objects.requireNonNull(id, "id must not be null");
    return repository.findById(id);
}

// ❌ DON'T
public User findById(String id) {
    return repository.findById(id); // null 가능
}
```

## 5. TypeScript 규칙

- **Single Exit Point** — 함수 중간 return 금지. 결과를 변수에 담고 마지막에 return
- 결과 변수명은 맥락에 맞게 (user, skills 등). `rs`, `result` 금지
- `any` 사용 금지 → `unknown` 또는 인터페이스 정의
- 객체 키: 항상 double-quoted `{ "key": value }`
- 콜백은 arrow function 선호
- IIFE 최소화; 변수를 먼저 추출

```typescript
// ✅ Single exit point
const getUser = async (id: string): Promise<User | null> => {
  let user: User | null = null;
  if (id) {
    user = await userRepository.findById(id);
  }
  return user;
};

// ❌ Multiple returns
const getUser = async (id: string): Promise<User | null> => {
  if (!id) return null;      // 금지
  return await userRepository.findById(id);
};

// ✅ Ternary chains — 괄호 + 줄바꿈
const label = isAdmin ? (
  "Administrator"
) : isModerator ? (
  "Moderator"
) : (
  "User"
);
```

**Path aliases** (`tsconfig.paths.json` / `vite.config.ts`):

```typescript
// Server: @assets/*, @services/*, @routers/*, @repositories/*, @schemas/*
import { loadEnv } from "@assets/scripts/env";

// Client: @, @pages, @stores, @hooks, @exportReacts, @exportMuis, etc.
import { useAboutStore } from "@stores/aboutStore";
```

## 6. SQL / MyBatis 규칙

- 파라미터 바인딩: `#{}` 강제. `${}` 사용 금지 (SQL injection 위험)
- SQL 키워드: 대문자 (`SELECT`, `FROM`, `WHERE`, `INSERT`)
- 테이블/컬럼명: snake_case

```xml
<!-- ✅ DO -->
<select id="findById" resultType="User">
  SELECT user_id, user_name FROM users WHERE user_id = #{userId}
</select>

<!-- ❌ DON'T -->
<select id="findById" resultType="User">
  select * from users where user_id = ${userId}
</select>
```

## 7. 테스트 규칙

- **Given-When-Then** 패턴 사용
- 한글 메서드명 허용 (테스트 의도 명확화)
- 테스트 하나 = 검증 하나 (SRP)

```java
@Test
void 사용자_이름으로_조회시_존재하면_반환한다() {
    // Given
    User saved = repository.save(new User("홍길동"));

    // When
    Optional<User> found = service.findByName("홍길동");

    // Then
    assertThat(found).isPresent();
    assertThat(found.get().getName()).isEqualTo("홍길동");
}
```

> 현재 이 프로젝트에는 테스트 스위트가 없다. 테스트 추가는 명시적 요청 시에만 진행.

## 8. 에러 핸들링

- **NEVER** empty catch — 반드시 log 또는 rethrow
- 구체적 예외 타입 catch. 범용 `Exception`/`Throwable` 금지
- TypeScript catch는 `error: unknown` 타입 사용

```typescript
// ✅ DO
try {
  await operation();
}
catch (error: unknown) {
  if (error instanceof ValidationError) {
    handleValidation(error);
  }
  else {
    console.error("operation failed:", error);
    throw error;
  }
}

// ❌ DON'T
try { await operation(); }
catch { /* empty */ }
```

## 9. Commit 메시지

Conventional Commits 형식:

```
type: short description

예시:
  feat: add Google OAuth callback handler
  fix: resolve mongoose connection timeout on cold start
  chore: update SWC to 1.15.11
  refactor: extract email validation to shared utility
```

## 10. 에이전트 행동 규칙

- **Surgical edit** — 요청된 부분만 변경. 관련 없는 코드 수정/리포맷/리네임 금지
- `if-else`를 삼항/IIFE로 변환하지 마라 (요청 없는 한)
- 건드리지 않은 코드의 원래 스타일 유지
- ESLint 자동 fix 실행 금지 (fix.mjs가 파일을 변경함)
- 빌드/서버 자동 실행 금지 — 명시적 요청 시에만
- `bun install` 시 Bun 미설치 확인 → npm fallback 제공
- `.env` 파일 직접 수정 금지 (실제 credential 포함)
- `.node/` 디렉토리 파일 직접 편집 금지 (auto-synced CDN)
- 테스트 파일을 요청 없이 생성하지 마라
- 명령 실패 시 대안을 자동 시도하지 말고, 에러 메시지를 보고하라

## 11. Changes 섹션

작업 완료 후 반드시 **변경 파일별 한 줄 요약**을 포함:

```markdown
## Changes
- `src/services/AboutService.ts` — findById 메서드에 null 체크 추가
- `client/src/pages/about/About.tsx` — 로딩 스피너 컴포넌트 교체
```
