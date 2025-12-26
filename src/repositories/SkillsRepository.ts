/**
 * @file SkillsRepository.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { Skills } from "@schemas/Skills";

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async () => {
	const finalResult = await Skills.findOne(
		{
			skills_title: `Skills`
		}
	)
	.lean();

	return finalResult;
};
