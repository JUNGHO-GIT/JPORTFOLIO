// utils.ts

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from "dotenv";
dotenv.config();

// 1-1. number -------------------------------------------------------------------------------------
export const fnRandomNumber = (data: number) => {
  return Math.floor(Math.random() * data);
}
// 1-2. time ---------------------------------------------------------------------------------------
export const fnRandomTime = () => {
  const hour = Math.floor(Math.random() * 23).toString().padStart(2, '0');
  const minute = Math.floor(Math.random() * 60).toString().padStart(2, '0');

  return `${hour}:${minute}`;
}
// 1-3. date ---------------------------------------------------------------------------------------
export const fnCalcDate = (startTime: string, endTime: string) => {
  const start = new Date(`1970/01/01 ${startTime}`);
  const end = new Date(`1970/01/01 ${endTime}`);
  const duration = new Date(Number(end) - Number(start) + 24 * 60 * 60 * 1000);

  return `${duration.getHours().toString().padStart(2, '0')}:${duration.getMinutes().toString().padStart(2, '0')}`;
}

// 1-2. format -------------------------------------------------------------------------------------
export const fnTimeToDecimal = (data: string) => {
  if (typeof data !== 'string' || !data || data === null || data === undefined) {
    return 0;
  }
  const time = data.split(":");
  if (time?.length !== 2) {
    return 0;
  }
  // 10분 단위로 반올림
  const hours = parseFloat(time[0]);
  const minutes = Math.round(parseFloat(time[1]) / 10) * 10 / 60;

  return hours + minutes;
};

export const fnDecimalToTime = (data: number) => {
  if (typeof data !== 'number' || !data || isNaN(data) || data === null || data === undefined) {
    return "00:00";
  }
  // 10분 단위로 반올림
  const floatHours = parseFloat(data.toString());
  const hours = Math.floor(floatHours);
  const minutes = Math.round((floatHours - hours) * 60 / 10) * 10;

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

// 1-2. convert ------------------------------------------------------------------------------------
export const fnStrToDecimal = (data: string) => {
  if (!data || data === null || data === undefined) {
    return 0;
  }
  const [hours, minutes] = data.split(":").map(Number);
  const adjustedHours = hours + Math.floor(minutes / 60);
  const adjustedMinutes = minutes % 60;

  return adjustedHours + adjustedMinutes / 60;
};

export const fnDecimalToStr = (data: number) => {
  if (!data || isNaN(data) || data === null || data === undefined) {
    return "00:00";
  }
  const hours = Math.floor(data);
  const minutes = Math.round((data - hours) * 60);
  const adjustedHours = hours + Math.floor(minutes / 60);
  const adjustedMinutes = minutes % 60;

  return `${String(adjustedHours).padStart(2, "0")}:${String(adjustedMinutes).padStart(2, "0")}`;
};

// 4-1. token --------------------------------------------------------------------------------------
export const token: string = crypto.randomBytes(20).toString('hex');

// 4-2. adminCheck ---------------------------------------------------------------------------------
export const fnAdminCheck = (user_id: string) => {
  const adminId = process.env.ADMIN_ID;

  if (user_id === adminId) {
    return true;
  }
  return false;
};

// 4-3. combinePw ----------------------------------------------------------------------------------
export const fnCombinePw = async (inputPw: string, token: string) => {
  return `${inputPw}_${token}`;
};

// 4-4. hashPw -------------------------------------------------------------------------------------
export const fnHashPw = async (combinedPw: string) => {
  return await bcrypt.hash(combinedPw, 10);
}

// 4-5. comparePw ----------------------------------------------------------------------------------
export const fnComparePw = async (inputPw: string, storedPw: string) => {
  return await bcrypt.compare(inputPw, storedPw);
}