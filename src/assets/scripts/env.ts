/**
 * @file env.ts
 * @description dotenv 로딩 유틸
 * @author Jungho
 * @since 2025-12-27
 */

process.env.DOTENV_CONFIG_QUIET = `true`;
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

// 1. 환경 모드 타입 정의 --------------------------------------------------------------------
export type EnvMode = `DEVELOPMENT` | `PRODUCTION`;
type EnvModeOrEmpty = EnvMode | ``;

const normalizeMode = (raw = ``): EnvModeOrEmpty => {
	const v: string = String(raw || ``).trim().toUpperCase();

	return (v === `DEVELOPMENT` || v === `DEV`) ? (
		`DEVELOPMENT`
	) : (v === `PRODUCTION` || v === `PROD`) ? (
		`PRODUCTION`
	) : (v === `TEST`) ? (
		`DEVELOPMENT`
	) : (
		``
	);
};

// 2. 유틸 함수 --------------------------------------------------------------------
const parseBool = (raw: unknown, defaultValue: boolean): boolean => {
	const v: string = String(raw ?? ``).trim().toLowerCase();

	return v ? (
		(v === `1` || v === `true` || v === `yes` || v === `y` || v === `on`)
	) : (
		defaultValue
	);
};
const resolveRootDir = (): string => {
	const override: string = String(process.env.DOTENV_DIR ?? ``).trim();

	return override ? (
		path.isAbsolute(override) ? override : path.resolve(process.cwd(), override)
	) : (
		process.cwd()
	);
};
const pickModeFromEnv = (): EnvModeOrEmpty => {
	const fromEnvMode: EnvModeOrEmpty = normalizeMode(process.env.ENV_MODE);
	const fromGlobal: EnvModeOrEmpty = normalizeMode(process.env.GLOBAL_ENV);

	const nodeEnvRaw: string = String(process.env.NODE_ENV ?? ``).trim().toLowerCase();
	const fromNodeEnv: EnvModeOrEmpty = nodeEnvRaw === `production` ? `PRODUCTION` : ``;

	return fromEnvMode || fromGlobal || fromNodeEnv || ``;
};

// 3. dotenv 경로 결정 및 로드 함수 --------------------------------------------------------------------
export const resolveDotenvPath = () => {
	const rootDir: string = resolveRootDir();

	const overridePath: string = String(process.env.DOTENV_PATH ?? ``).trim();
	if (overridePath) {
		const abs: string = path.isAbsolute(overridePath) ? overridePath : path.resolve(rootDir, overridePath);
		if (!fs.existsSync(abs)) {
			throw new Error(`dotenv file not found (DOTENV_PATH): ${abs}`);
		}
		return abs;
	}

	const mode: EnvModeOrEmpty = pickModeFromEnv();
	const devPath: string = path.resolve(rootDir, `.env.development`);
	const prodPath: string = path.resolve(rootDir, `.env.production`);
	const hasDev: boolean = fs.existsSync(devPath);
	const hasProd: boolean = fs.existsSync(prodPath);

	const selected: string = (mode === `PRODUCTION`) ? (
		prodPath
	) : (mode === `DEVELOPMENT`) ? (
		devPath
	) : (!hasDev && hasProd) ? (
		prodPath
	) : (
		devPath
	);

	if (!fs.existsSync(selected)) {
		throw new Error(
			[
				`dotenv file not found: ${selected}`,
				`rootDir: ${rootDir}`,
				`hasDev: ${String(hasDev)}, hasProd: ${String(hasProd)}`,
			].join(` | `),
		);
	}

	return selected;
};

let loaded: boolean = false;

// 9. dotenv 로드 함수 --------------------------------------------------------------------
export const loadEnv = () => {
	if (loaded) {
		return;
	}

	const rootDir: string = resolveRootDir();
	const override: boolean = parseBool(process.env.DOTENV_OVERRIDE, false);
	const quiet: boolean = parseBool(process.env.DOTENV_QUIET, true);

	const basePath: string = path.resolve(rootDir, `.env`);
	if (fs.existsSync(basePath)) {
		const r0 = dotenv.config({ path: basePath, override: false, quiet: quiet });
		if (r0.error) {
			throw r0.error;
		}
	}

	const dotenvPath: string = resolveDotenvPath();
	const r1 = dotenv.config({ path: dotenvPath, override: override, quiet: quiet });
	if (r1.error) {
		throw r1.error;
	}

	const finalMode: EnvModeOrEmpty = pickModeFromEnv() || normalizeMode(process.env.ENV_MODE) || normalizeMode(process.env.GLOBAL_ENV);
	if (finalMode) {
		process.env.ENV_MODE = finalMode;
		process.env.GLOBAL_ENV = finalMode;
	}

	loaded = true;
};

// 10. 모듈 import 시 자동 로드 --------------------------------------------------------------------
loadEnv();
