/**
 * @file ProjectsRouter.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import express, { Request, Response } from "express";
import * as service from "@services/ProjectsService";
export const router = express.Router();

// 2. detail ---------------------------------------------------------------------------------------
router.get(`/detail`, async (req: Request, res: Response) => {
	try {
		let finalResult = await service.detail(
			req.query.project_id as string,
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
