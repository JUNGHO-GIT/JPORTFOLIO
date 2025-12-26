/**
 * @file PortfoliosRepository.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { Portfolios } from "@schemas/Portfolios";

// 2. detail ---------------------------------------------------------------------------------------
export const detail = async () => {
	const finalResult = await Portfolios.findOne(
		{
			portfolios_title: `Portfolios`
		}
	)
	.lean();

	return finalResult;
};
