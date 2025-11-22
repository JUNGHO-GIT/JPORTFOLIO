// index.ts

import qs from "qs";
import cors from "cors";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";

import { router as adminRouter } from "@routers/adminRouter";
import { router as aboutRouter } from "@routers/aboutRouter";
import { router as skillsRouter } from "@routers/skillsRouter";
import { router as portfoliosRouter } from "@routers/portfoliosRouter";
import { router as projectsRouter } from "@routers/projectsRouter";

// -------------------------------------------------------------------------------------------------
dotenv.config();
const app = express();
const preFix = process.env.HTTP_PREFIX || "";

// 서버 포트 설정 ----------------------------------------------------------------------------------
const httpPort = Number(process.env.HTTP_PORT);
const httpsPort = Number(process.env.HTTPS_PORT);

(function start(httpPort: number, httpsPort: number) {
  try {
    const httpServer = app.listen(httpPort, () => {
      console.log(`HTTP 서버가 포트 ${httpPort}에서 실행 중입니다.`);
    });
    httpServer.on('error', (err: any) => {
      if (err?.code === 'EADDRINUSE') {
        console.log(`${httpPort} 포트가 이미 사용 중입니다. 다른 포트로 변경합니다.`);
        start(httpPort + 1, httpsPort);
      }
      else {
        console.error(`서버 실행 중 오류 발생: ${err}`);
      }
    });
  }
  catch (err: any) {
    console.error(`서버 실행 중 오류 발생: ${err}`);
  }
})(httpPort, httpsPort);

// MongoDB 설정 ------------------------------------------------------------------------------------
const id = process.env.DB_USER;
const pw = process.env.DB_PASS;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
// const db = process.env.DB_NAME
const db = process.env.DB_TEST
const envStr = db === process.env.DB_TEST ? "DEVELOPMENT" : "PRODUCTION";

mongoose.connect(`mongodb://${id}:${pw}@${host}:${port}/${db}`)
	.then(() => {
		console.log(`[${envStr}] MongoDB 연결 성공 [${db}]`);
	})
	.catch((err: any) => {
		console.error(`[${envStr}] MongoDB 연결 실패 [${db}] ${err}`);
	});

// 로그 설정 -------------------------------------------------------------------------------------------
if (envStr === "DEVELOPMENT") {
	const color = {
		reset: "\x1b[0m",
		coll: "\x1b[38;2;78;201;176m",
		method: "\x1b[38;2;220;220;170m",
		field: "\x1b[38;2;183;126;202m",
		string: "\x1b[38;2;244;212;174m",
		number: "\x1b[38;2;85;221;0m",
		boolean: "\x1b[38;2;86;157;214m",
		null: "\\x1b[38;2;86;157;214m",
	};

	const fmtColl = (coll: string) => `${color.coll}${coll}${color.reset}`;
	const fmtMethod = (m: string) => `${color.method}${m}${color.reset}`;
	const fmtJson = (obj: any) => JSON.stringify(obj, null, 2)
	.replace(/"(\$[^"]+)":/g, `"${color.field}$1${color.reset}":`)
	.replace(/"([^"$]+)":/g, `"${color.field}$1${color.reset}":`)
	.replace(/: "([^"]*)"/g, `: "${color.string}$1${color.reset}"`)
	.replace(/: (\d+)/g, `: ${color.number}$1${color.reset}`)
	.replace(/: (true|false|null)/g, `: ${color.boolean}$1${color.reset}`);

	mongoose.set('debug', (coll, method, query, doc, options) => {
		const log = (...parts: string[]) => console.log(...parts, '\n');
		const args = [query, doc, options]?.filter(x => x !== undefined).map(fmtJson);

		// 메서드 그룹별 처리
		if (['aggregate', 'find', 'findOne', 'count', 'countDocuments', 'distinct'].includes(method)) {
			console.log(`\n---------------------------------------------`);
			log(
				`db.getCollection('${fmtColl(coll)}').${fmtMethod(method)}(`,
				args.join(', '),
				')'
			);
		}
		else if (['update', 'updateOne', 'updateMany', 'replaceOne', 'deleteOne', 'deleteMany', 'insertOne', 'insertMany'].includes(method)) {
			console.log(`\n---------------------------------------------`);
			log(
				`db.getCollection('${fmtColl(coll)}').${fmtMethod(method)}(`,
				args.join(', '),
				')'
			);
		}
		else {
			console.log(`\n---------------------------------------------`);
			log(
				`db.getCollection('${fmtColl(coll)}').${fmtMethod(method)}(`,
				args.join(', '),
				')'
			);
		}
	});
}

// qs 파서 적용 ------------------------------------------------------------------------------------
app.set('query parser', (str: string) => qs.parse(str));

// 미들웨어 설정 -----------------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "DELETE", "PUT"],
	credentials: true,
	allowedHeaders: ["Content-Type", "Authorization"],
	exposedHeaders: ["Authorization"],
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

// --------------------------------------------------------------------------------------------
// 0. 에러처리 미들웨어
app.use((err: Error, req: Request, res: Response, next: Function) => {
	console.error(err.stack);
	// @ts-ignore
	res.status(500).send({
		status: 500,
		message: err.message,
	});
});