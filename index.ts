/**
 * @file index.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-14
 */

import "@assets/scripts/fetch";
import { loadEnv } from "@assets/scripts/env";
import qs from "qs";
import cors from "cors";
import mongoose from "mongoose";
import express, { type Request, type Response, type Express } from "express";

import { router as adminRouter } from "@routers/AdminRouter";
import { router as aboutRouter } from "@routers/AboutRouter";
import { router as skillsRouter } from "@routers/SkillsRouter";
import { router as portfoliosRouter } from "@routers/PortfoliosRouter";
import { router as projectsRouter } from "@routers/ProjectsRouter";

// -------------------------------------------------------------------------------------------------
loadEnv();
const app: Express = express();
const preFix: string = process.env.HTTP_PREFIX ?? ``;

// 서버 포트 설정 ----------------------------------------------------------------------------------
const httpPort: number = Number(process.env.HTTP_PORT);
const httpsPort: number = Number(process.env.HTTPS_PORT);
(function start(httpPortParam: number, httpsPortParam: number) {
	const httpServer = app.listen(httpPortParam, () => {
		console.log(`HTTP 서버가 포트 ${httpPortParam}에서 실행 중입니다.`);
	});
	httpServer.on(`error`, (err: unknown) => {
		if (err?.code === `EADDRINUSE`) {
			console.log(`${httpPortParam} 포트가 이미 사용 중입니다. 다른 포트로 변경합니다.`);
			start(httpPortParam + 1, httpsPortParam);
		}
		else {
			console.error(`서버 실행 중 오류 발생: ${err}`);
		}
	});
}(httpPort, httpsPort));

// MongoDB 설정 ------------------------------------------------------------------------------------
const id: string | undefined = process.env.DB_USER;
const pw: string | undefined = process.env.DB_PASS;
const host: string | undefined = process.env.DB_HOST;
const port: string | undefined = process.env.DB_PORT;
const mode: string | undefined = process.env.ENV_MODE;
const db: string = mode === `PRODUCTION` ? (process.env.DB_NAME ?? ``) : (process.env.DB_TEST ?? ``);
const isDev: boolean = mode === `DEVELOPMENT`;

mongoose.connect(`mongodb://${id}:${pw}@${host}:${port}/${db}`)
.then(() => {
	console.log(`[${mode}] MongoDB 연결 성공 [${db}]`);
})
.catch((error: unknown) => {
	console.error(`[${mode}] MongoDB 연결 실패 [${db}] ${error}`);
});

// 로그 설정 -------------------------------------------------------------------------------------------
if (isDev) {
	const color = {
		reset: `\u001B[0m`,
		coll: `\u001B[38;2;78;201;176m`,
		method: `\u001B[38;2;220;220;170m`,
		field: `\u001B[38;2;183;126;202m`,
		string: `\u001B[38;2;244;212;174m`,
		number: `\u001B[38;2;85;221;0m`,
		boolean: `\u001B[38;2;86;157;214m`,
		null: `\\x1b[38;2;86;157;214m`,
	};

	const fmtColl = (coll: string) => `${color.coll}${coll}${color.reset}`;
	const fmtMethod = (m: string) => `${color.method}${m}${color.reset}`;
	const fmtJson = (obj: any) => JSON.stringify(obj, null, 2)
	.replaceAll(/"(\$[^"]+)":/g, `"${color.field}$1${color.reset}":`)
	.replaceAll(/"([^"$]+)":/g, `"${color.field}$1${color.reset}":`)
	.replaceAll(/: "([^"]*)"/g, `: "${color.string}$1${color.reset}"`)
	.replaceAll(/: (\d+)/g, `: ${color.number}$1${color.reset}`)
	.replaceAll(/: (true|false|null)/g, `: ${color.boolean}$1${color.reset}`);

	mongoose.set(`debug`, (coll, method, query, doc, options) => {
		const log = (...parts: string[]) => {
			console.log(...parts, `\n`);
		};
		const args = [
			query,
			doc,
			options,
		].filter((x) => x !== undefined).map((element) => fmtJson(element));

		// 메서드 그룹별 처리
		if ([
			`aggregate`,
			`find`,
			`findOne`,
			`count`,
			`countDocuments`,
			`distinct`,
		].includes(method)) {
			console.log(`\n---------------------------------------------`);
			log(
				`db.getCollection('${fmtColl(coll)}').${fmtMethod(method)}(`,
				args.join(`, `),
				`)`
			);
		}
		else if ([
			`update`,
			`updateOne`,
			`updateMany`,
			`replaceOne`,
			`deleteOne`,
			`deleteMany`,
			`insertOne`,
			`insertMany`,
		].includes(method)) {
			console.log(`\n---------------------------------------------`);
			log(
				`db.getCollection('${fmtColl(coll)}').${fmtMethod(method)}(`,
				args.join(`, `),
				`)`
			);
		}
		else {
			console.log(`\n---------------------------------------------`);
			log(
				`db.getCollection('${fmtColl(coll)}').${fmtMethod(method)}(`,
				args.join(`, `),
				`)`
			);
		}
	});
}

// qs 파서 적용 ------------------------------------------------------------------------------------
app.set(`query parser`, (str: string) => qs.parse(str));

// 미들웨어 설정 -----------------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: `*`,
	methods: [
		`GET`,
		`POST`,
		`DELETE`,
		`PUT`,
	],
	credentials: true,
	allowedHeaders: [
		`Content-Type`,
		`Authorization`,
	],
	exposedHeaders: [`Authorization`],
	maxAge: 3600,
	optionsSuccessStatus: 204,
	preflightContinue: false,
}));

// 라우터 설정 -------------------------------------------------------------------------------------
app.use(`${preFix}/admin`, adminRouter);
app.use(`${preFix}/about`, aboutRouter);
app.use(`${preFix}/skills`, skillsRouter);
app.use(`${preFix}/portfolios`, portfoliosRouter);
app.use(`${preFix}/projects`, projectsRouter);

// 0. 에러처리 미들웨어 -----------------------------------------------------------------------
app.use((err: Error, req: Request, res: Response, _next: Function) => {
	console.error(err.stack);
	res.status(500).send({
		status: 500,
		message: err.message,
	});
});
