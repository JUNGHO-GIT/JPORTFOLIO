/**
 * @file ProjectsRepository.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { Projects } from "@schemas/Projects";

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async (
	project_id_param: string,
) => {
	const finalResult = await Projects.findOne(
		{
			project_id: project_id_param
		}
	)
	.lean();

	return finalResult;
};
