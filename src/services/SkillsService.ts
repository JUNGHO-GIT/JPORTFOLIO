/**
 * @file SkillsService.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import * as repository from "@repositories/SkillsRepository";

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async () => {

	// result 변수 선언
	let findResult: any = null;
	let finalResult: any = null;
	let statusResult: string = `fail`;

	findResult = await repository.detail();

	if (!findResult) {
		statusResult = `fail`;
		finalResult = null;
	}
	else {
		statusResult = `success`;
		finalResult = findResult;
	}

	return {
		status: statusResult,
		result: finalResult,
	};
};
