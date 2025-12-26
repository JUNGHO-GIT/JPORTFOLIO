/**
 * @file aboutRepository.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { About } from "@schemas/About";

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async () => {
	const finalResult = await About.findOne(
		{
			about_title: `About`
		}
	)
	.lean();

	return finalResult;
};
