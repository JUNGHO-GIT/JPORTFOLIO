/**
 * @file swc.mjs
 * @description SWC 컴파일 및 빌드 스크립트 (ESM)
 * @author Jungho
 * @since 2025-12-03
 */

import fs from 'fs';
import path from 'path';
import process from 'process';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { logger, runCmd, validateDir, delDir, getProjectType, getPmArgs } from '../lib/utils.mjs';

// 1. 설정 및 상수 ---------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const TITLE = path.basename(__filename);
const argv = process.argv.slice(2);

// 2. 인자 파싱 (IIFE) -----------------------------------------------------------------------
const { args1, args2, args3 } = (() => {
	const p1 = argv.find(arg => [
		`--npm`,
		`--pnpm`,
		`--yarn`,
		`--bun`,
	].includes(arg))?.replace(`--`, ``) ?? ``;
	const p2 = argv.find(arg => [
		`--watch`,
		`--start`,
		`--compile`,
		`--build`,
	].includes(arg))?.replace(`--`, ``) ?? ``;
	const p3 = argv.find(arg => [
		`--server`,
		`--client`,
	].includes(arg))?.replace(`--`, ``) ?? ``;

	return { "args1": p1, "args2": p2, "args3": p3 };
})();

// 3. 헬퍼 함수 ------------------------------------------------------------------------------
const getSwcConfig = () => {
	const cwd = process.cwd();
	const configName = args3 === `client` ? `.client.swcrc` : `.server.swcrc`;
	const configPath = path.resolve(cwd, configName);
	const result = fs.existsSync(configPath) ? configPath : null;
	return result;
};

const spawnProcess = (pmArgs = []) => {
	const useShell = args1 !== `bun`;
	const result = spawn(args1, pmArgs, { "stdio": `inherit`, "shell": useShell, "env": process.env });
	return result;
};

// 4. 컴파일 실행 ----------------------------------------------------------------------------
const runCompile = () => {
	logger(`info`, `컴파일 시작`);

	const { isServer } = getProjectType(args3);
	const outDir = validateDir([
		`out`,
		`dist`,
		`build`,
	]);
	const tsCfg = validateDir([
		`tsconfig.json`,
		`tsconfig.build.json`,
	]);
	const swcCfg = getSwcConfig();
	const baseSwcArgs = [
		`swc`,
		`src`,
		`-d`,
		outDir,
		`--strip-leading-paths`,
	];

	// 유효성 검사 및 실행
	!isServer ? (
		logger(`error`, `컴파일 모드는 서버 프로젝트에서만 사용 가능합니다`),
		process.exit(1)
	) : !tsCfg ? (
		logger(`error`, `tsconfig 파일을 찾을 수 없습니다`),
		process.exit(1)
	) : (
		delDir(outDir),
		swcCfg && baseSwcArgs.push(`--config-file`, swcCfg),
		(() => {
			try {
				runCmd(args1, getPmArgs(args1, baseSwcArgs));
				runCmd(args1, getPmArgs(args1, [
					`tsc-alias`,
					`-p`,
					tsCfg,
					`-f`,
				]));
				logger(`success`, `컴파일 완료`);
			}
			catch (e) {
				const errMsg = e instanceof Error ? e.message : String(e);
				logger(`error`, `swc 컴파일 실패: ${errMsg}`);
				throw e;
			}
		})()
	);
};

// 5. 빌드 실행 ------------------------------------------------------------------------------
const runBuild = () => {
	logger(`info`, `빌드 시작`);

	const { isClient, isServer, hasVite, hasNext } = getProjectType(args3);
	const outDir = validateDir([
		`out`,
		`dist`,
		`build`,
	]);

	delDir(outDir);

	try {
		isClient ? (
			hasVite ? (
				runCmd(args1, getPmArgs(args1, [
					`vite`,
					`build`,
				]))
			) : hasNext ? (
				runCmd(args1, getPmArgs(args1, [
					`next`,
					`build`,
				]))
			) : (
				logger(`error`, `클라이언트 빌드 도구를 찾을 수 없습니다`),
				process.exit(1)
			)
		) : isServer ? (
			runCompile()
		) : (
			// Unreachable in normal flows but safe fallback
			void 0
		);
		logger(`success`, `빌드 완료`);
	}
	catch (e) {
		const errMsg = e instanceof Error ? e.message : String(e);
		logger(`error`, `빌드 실패: ${errMsg}`);
		throw e;
	}
};

// 6. 워치 모드 ------------------------------------------------------------------------------
const runWatch = () => {
	logger(`info`, `워치 모드 시작`);

	const { isServer } = getProjectType(args3);
	const outDir = validateDir([
		`out`,
		`dist`,
		`build`,
	]);
	const tsCfg = validateDir([
		`tsconfig.json`,
		`tsconfig.build.json`,
	]);
	const swcCfg = getSwcConfig();

	!isServer ? (
		logger(`error`, `워치 모드는 서버 프로젝트에서만 사용 가능합니다`),
		process.exit(1)
	) : !tsCfg ? (
		logger(`error`, `tsconfig 파일을 찾을 수 없습니다`),
		process.exit(1)
	) : (() => {
		const swcBase = [
			`swc`,
			`src`,
			`-d`,
			outDir,
			`--strip-leading-paths`,
			`--watch`,
		];
		swcCfg && swcBase.push(`--config-file`, swcCfg);

		const swcProc = spawnProcess(getPmArgs(args1, swcBase));
		const aliasProc = spawnProcess(getPmArgs(args1, [
			`tsc-alias`,
			`-p`,
			tsCfg,
			`-f`,
			`--watch`,
		]));

		const cleanup = () => {
			logger(`info`, `워치 모드 종료 중...`);
			swcProc.kill();
			aliasProc.kill();
			process.exit(0);
		};

		process.on(`SIGINT`, cleanup);
		process.on(`SIGTERM`, cleanup);
		swcProc.on(`close`, code => code && code !== 0 && logger(`warn`, `swc 종료 (exit code: ${code})`));
		aliasProc.on(`close`, code => code && code !== 0 && logger(`warn`, `tsc-alias 종료 (exit code: ${code})`));

		logger(`success`, `워치 모드 실행 중`);
	})();
};

// 7. 스타트 모드 ----------------------------------------------------------------------------
const runStart = () => {
	logger(`info`, `스타트 모드 시작`);

	const { isClient, isServer, hasVite, hasNext, hasReactScripts, hasIndexTs } = getProjectType(args3);

	// 클라이언트 인자 구성
	const clientArgs = isClient ? (
		hasVite ? (
			getPmArgs(args1, [
				`vite`,
				`dev`,
			])
		) : hasNext ? (
			getPmArgs(args1, [
				`next`,
				`dev`,
			])
		) : hasReactScripts ? (
			getPmArgs(args1, [
				`react-scripts`,
				`start`,
			])
		) : null
	) : null;

	// 서버 인자 구성
	const serverArgs = isServer && hasIndexTs ? (
		args1 === `bun` ? [
			`--watch`,
			`index.ts`,
		] : getPmArgs(args1, [
			`tsx`,
			`watch`,
			`--clear-screen=false`,
			`--ignore`,
			`node_modules`,
			`index.ts`,
		])
	) : null;

	const startArgs = clientArgs || serverArgs;

	// 실행 로직
	isClient && !clientArgs ? (
		logger(`error`, `클라이언트 개발 서버 도구를 찾을 수 없습니다`),
		process.exit(1)
	) : isServer && !serverArgs ? (
		logger(`error`, `서버 진입점 파일(index.ts)을 찾을 수 없습니다`),
		process.exit(1)
	) : !startArgs ? (
		logger(`error`, `시작 명령어를 생성할 수 없습니다`),
		process.exit(1)
	) : (() => {
		const startProc = spawnProcess(startArgs);
		const cleanup = () => {
			logger(`info`, `스타트 모드 종료 중...`);
			startProc.kill();
			process.exit(0);
		};

		process.on(`SIGINT`, cleanup);
		process.on(`SIGTERM`, cleanup);
		startProc.on(`close`, code => code && code !== 0 && logger(`warn`, `start 프로세스 종료 (exit code: ${code})`));

		const modeMsg = isClient ? `클라이언트 개발 서버 실행 중` : `서버 개발 모드 실행 중`;
		logger(`success`, modeMsg);
	})();
};

// 99. 메인 실행 -----------------------------------------------------------------------------
void (async () => {
	try {
		logger(`info`, `스크립트 실행: ${TITLE}`);
		logger(`info`, `전달된 인자 1: ${args1 || `none`}`);
		logger(`info`, `전달된 인자 2: ${args2 || `none`}`);
		logger(`info`, `전달된 인자 3: ${args3 || `none`}`);

		// 모드별 실행
		args2 === `compile` ? (
			runCompile()
		) : args2 === `build` ? (
			runBuild()
		) : args2 === `watch` ? (
			runWatch()
		) : args2 === `start` ? (
			runStart()
		) : (
			logger(`warn`, `알 수 없는 명령입니다: ${args2}`),
			process.exit(1)
		);

		// watch나 start 모드일 경우 프로세스를 종료하지 않음
		const isKeepAlive = args2 === `watch` || args2 === `start`;
		!isKeepAlive && (
			logger(`info`, `스크립트 정상 종료: ${TITLE}`),
			process.exit(0)
		);
	}
	catch (e) {
		const errMsg = e instanceof Error ? e.message : String(e);
		logger(`error`, `${TITLE} 스크립트 실행 실패: ${errMsg}`);
		process.exit(1);
	}
})();