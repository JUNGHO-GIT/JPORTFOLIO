/**
 * @file adminRepository.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-27
 */

import { Admin } from "@schemas/Admin";

// 1-0. visit (count) ------------------------------------------------------------------------------
export const visitCount = async (
	DATE_param: string,
) => {
	const finalResult = await Admin.aggregate([
		{
			$match: {
				admin_date: DATE_param
			}
		},
		{
			$project: {
				_id: 1,
				admin_date: 1,
				adminSection: 1,
			}
		}
	]);

	return finalResult;
};

// 1-2. visit (detail) -----------------------------------------------------------------------------
export const visitDetail = async (
	ip_param: string,
	DATE_param: string,
) => {

	const finalResult: any = await Admin.findOne(
		{
			admin_date: DATE_param,
			"adminSection.admin_visit_ip": ip_param
		}
	);

	return finalResult;
};

// 1-3. visit (save) -------------------------------------------------------------------------------
export const visitSave = async (
	ip_param: string,
	DATE_param: string,
) => {

	const finalResult: any = await Admin.create(
		{
			admin_date: DATE_param,
			adminSection: [
				{
					admin_visit_ip: ip_param
				}
			],
			admin_regDt: new Date(),
			admin_updateDt: null
		}
	);

	return finalResult;
};
