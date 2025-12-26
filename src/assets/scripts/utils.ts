/**
 * @file utils.ts
 * @description foo
 * @author Jungho
 * @since 2025-12-26
 */

import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';
import dotenv from "dotenv";
dotenv.config();

// 1-1. number -------------------------------------------------------------------------------------
export const randomNumber = (data: number) => Math.floor(Math.random() * data);
// 1-2. time ---------------------------------------------------------------------------------------
export const randomTime = () => {
	const hour: string = Math.floor(Math.random() * 23).toString().padStart(2, `0`);
	const minute: string = Math.floor(Math.random() * 60).toString().padStart(2, `0`);

	return `${hour}:${minute}`;
};
// 1-3. date ---------------------------------------------------------------------------------------
export const calcDate = (startTime: string, endTime: string) => {
	const start: Date = new Date(`1970/01/01 ${startTime}`);
	const end: Date = new Date(`1970/01/01 ${endTime}`);
	const duration: Date = new Date(Number(end) - Number(start) + 24 * 60 * 60 * 1000);

	return `${duration.getHours().toString().padStart(2, `0`)}:${duration.getMinutes().toString().padStart(2, `0`)}`;
};

// 1-2. format -------------------------------------------------------------------------------------
export const timeToDecimal = (data: string) => {
	if (typeof data !== `string` || !data || data === null || data === undefined) {
		return 0;
	}
	const time: string[] = data.split(`:`);
	if (time?.length !== 2) {
		return 0;
	}
	// 10분 단위로 반올림
	const hours: number = Number.parseFloat(time[0]);
	const minutes: number = Math.round(Number.parseFloat(time[1]) / 10) * 10 / 60;

	return hours + minutes;
};

export const decimalToTime = (data: number) => {
	if (typeof data !== `number` || !data || Number.isNaN(data) || data === null || data === undefined) {
		return `00:00`;
	}
	// 10분 단위로 반올림
	const floatHours: number = Number.parseFloat(data.toString());
	const hours: number = Math.floor(floatHours);
	const minutes: number = Math.round((floatHours - hours) * 60 / 10) * 10;

	return `${hours.toString().padStart(2, `0`)}:${minutes.toString().padStart(2, `0`)}`;
};

// 1-2. convert ------------------------------------------------------------------------------------
export const strToDecimal = (data: string) => {
	if (!data || data === null || data === undefined) {
		return 0;
	}
	const [hours, minutes] = data.split(`:`).map(Number);
	const adjustedHours: number = hours + Math.floor(minutes / 60);
	const adjustedMinutes: number = minutes % 60;

	return adjustedHours + adjustedMinutes / 60;
};

export const decimalToStr = (data: number) => {
	if (!data || Number.isNaN(data) || data === null || data === undefined) {
		return `00:00`;
	}
	const hours: number = Math.floor(data);
	const minutes: number = Math.round((data - hours) * 60);
	const adjustedHours: number = hours + Math.floor(minutes / 60);
	const adjustedMinutes: number = minutes % 60;

	return `${String(adjustedHours).padStart(2, `0`)}:${String(adjustedMinutes).padStart(2, `0`)}`;
};

// 4-1. token --------------------------------------------------------------------------------------
export const token: string = crypto.randomBytes(20).toString(`hex`);

// 4-2. adminCheck ---------------------------------------------------------------------------------
export const isAdmin = (user_id: string) => {
	const adminId: string | undefined = process.env.ADMIN_ID;

	if (user_id === adminId) {
		return true;
	}
	return false;
};

// 4-3. combinePw ----------------------------------------------------------------------------------
export const combinePw = async (inputPw: string, tokenParam: string) => {
	return `${inputPw}_${tokenParam}`;
};

// 4-4. hashPw -------------------------------------------------------------------------------------
export const hashPw = async (combinedPw: string) => {
	return bcrypt.hash(combinedPw, 10);
};

// 4-5. comparePw ----------------------------------------------------------------------------------
export const comparePw = async (inputPw: string, storedPw: string) => {
	return bcrypt.compare(inputPw, storedPw);
};
