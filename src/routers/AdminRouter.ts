/**
 * @file AdminRouter.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import express, { Request, Response } from "express";
import * as service from "@services/AdminService";
export const router = express.Router();

// 0. appInfo --------------------------------------------------------------------------------------
router.get(`/appInfo`, async (req: Request, res: Response) => {
	try {
		let finalResult = await service.appInfo();
		if (finalResult.status === `success`) {
			res.json({
				msg: `조회 성공`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
		else if (finalResult.status === `fail`) {
			res.json({
				msg: `조회 실패`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
		else {
			res.json({
				msg: `조회 에러`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
	}
	catch (error: any) {
		console.error(error);
		res.status(500).json({
			status: `error`,
			msg: error.toString(),
			error: error.toString(),
		});
	}
});

// 2-1. visit (count) ------------------------------------------------------------------------------
router.get(`/visitCount`, async (req: Request, res: Response) => {
	try {
		let finalResult = await service.visitCount(
			req.query.DATE as string,
		);
		if (finalResult.status === `success`) {
			res.json({
				msg: `조회 성공`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
		else if (finalResult.status === `fail`) {
			res.json({
				msg: `조회 실패`,
				status: finalResult.status,
				result: finalResult.result,
				totalCnt: null,
			});
		}
		else {
			res.json({
				msg: `조회 에러`,
				status: finalResult.status,
				result: finalResult.result,
				totalCnt: null,
			});
		}
	}
	catch (error: any) {
		console.error(error);
		res.status(500).json({
			status: `error`,
			msg: error.toString(),
			error: error.toString(),
		});
	}
});

// 2-2. visit (save) -------------------------------------------------------------------------------
router.get(`/visitSave`, async (req: Request, res: Response) => {
	try {
		let finalResult = await service.visitSave(
			req as any,
			req.query.DATE as string,
		);
		if (finalResult.status === `success`) {
			res.json({
				msg: `조회 성공`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
		else if (finalResult.status === `fail`) {
			res.json({
				msg: `조회 실패`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
		else {
			res.json({
				msg: `조회 에러`,
				status: finalResult.status,
				result: finalResult.result,
			});
		}
	}
	catch (error: any) {
		console.error(error);
		res.status(500).json({
			status: `error`,
			msg: error.toString(),
			error: error.toString(),
		});
	}
});
