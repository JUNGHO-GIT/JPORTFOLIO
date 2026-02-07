/**
 * @file sort.mjs
 * @description 파일 경로를 받아 Array/Object 정렬 스크립트
 * @author Jungho
 * @since 2025-02-07
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { logger } from "../lib/utils.mjs";

// 2. 인자 파싱 ------------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TITLE = path.basename(__filename);
const argv = process.argv.slice(2);

const args1 = argv.find((arg) => [
  `--npm`,
  `--pnpm`,
  `--yarn`,
  `--bun`,
].includes(arg))?.replace(`--`, ``) || ``;

const args2 = argv.find((arg) => [
  `--array`,
  `--object`,
].includes(arg))?.replace(`--`, ``) || ``;

const args3 = argv.find((arg) => ![
  `--npm`, `--pnpm`, `--yarn`, `--bun`, `--array`, `--object`,
].includes(arg),
)?.replace(/^--/, ``) || ``;

// 3. 배열 정렬 -------------------------------------------------------------------------------
const sortArray = (input) => {
  const cloned = Array.isArray(input) ? [...input] : [];

  const result = cloned
  .sort((a, b) => {
    const aKey = a && typeof a.key === `string` ? a.key : ``;
    const bKey = b && typeof b.key === `string` ? b.key : ``;
    const aHasPlus = aKey.includes(`+`);
    const bHasPlus = bKey.includes(`+`);

    const basicOrder = !aHasPlus && bHasPlus ? -1 : aHasPlus && !bHasPlus ? 1 : 0;
    const finalOrder = basicOrder !== 0 ? basicOrder : aKey < bKey ? -1 : aKey > bKey ? 1 : 0;

    return finalOrder;
  })
  .map((obj) => {
    const reorderedObj = {};

    `key` in obj && (reorderedObj.key = obj.key);
    `command` in obj && (reorderedObj.command = obj.command);
    `when` in obj && (reorderedObj.when = obj.when);

    Object.keys(obj).forEach((prop) => {
      prop !== `key` && prop !== `command` && prop !== `when` && (reorderedObj[prop] = obj[prop]);
    });

    return reorderedObj;
  });

  return result;
};

// 4. 객체 정렬 -------------------------------------------------------------------------------
const sortObject = (input) => {
  const grouped = {};
  const source = input && typeof input === `object` && !Array.isArray(input) ? input : {};

  Object.keys(source).forEach((key) => {
    const parts = key.split(`.`);
    const group = parts[0];
    !grouped[group] && (grouped[group] = []);
    grouped[group].push([
      key,
      source[key],
    ]);
  });

  const sortedObject = {};
  Object.keys(grouped)
  .sort()
  .forEach((group) => {
    grouped[group].sort((a, b) => a[0].localeCompare(b[0]));
    grouped[group].forEach((entry) => {
      const entryKey = entry[0];
      const entryValue = entry[1];
      sortedObject[entryKey] = entryValue;
    });
  });

  const result = sortedObject;
  return result;
};

// 5. JSONC 변환 -----------------------------------------------------------------------------
const convertToJSONC = (sortedArray) => {
  let jsoncContent = `[\n`;
  let previousKey = null;

  sortedArray.forEach((obj, index) => {
    const currentKey = obj && obj.key ? obj.key : `undefined`;

    currentKey !== previousKey && (() => {
      const lines = `------------------------------------------------------------------------------------------`;
      index > 0 && (jsoncContent += `\n`);
      jsoncContent += `\n\t// ${currentKey} ${lines}\n`;
      previousKey = currentKey;
    })();

    const jsonStr = JSON.stringify(obj, null, 2);
    const indentedJson = jsonStr
    .split(`\n`)
    .map((line) => `\t${line}`)
    .join(`\n`);

    jsoncContent += indentedJson;
    index < sortedArray.length - 1 && (jsoncContent += `,`);
    jsoncContent += `\n`;
  });

  jsoncContent += `]`;

  const result = jsoncContent;
  return result;
};

// 6. 파일 읽기 -------------------------------------------------------------------------------
const readInputFile = (filePath) => {
  let fileData = null;
  let errorMessage = ``;
  let success = false;

  try {
    const absolutePath = path.isAbsolute(filePath) ? (
      filePath
    ) : (
      path.resolve(process.cwd(), filePath)
    );

    const fileExists = fs.existsSync(absolutePath);

    fileExists && (() => {
      const fileContent = fs.readFileSync(absolutePath, `utf8`);
      const parsedData = JSON.parse(fileContent);
      fileData = parsedData;
      success = true;
    })();

    !fileExists && (() => {
      errorMessage = `파일을 찾을 수 없습니다: ${absolutePath}`;
    })();
  }
  catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    errorMessage = `파일 읽기 중 오류 발생: ${errMsg}`;
  }

  const result = {
    success: success,
    data: fileData,
    error: errorMessage,
  };
  return result;
};

// 7. 결과 저장 -------------------------------------------------------------------------------
const saveResult = (content, originalPath, modeParam) => {
  let isSaved = false;
  let outputPath = ``;

  try {
    const parsedPath = path.parse(originalPath);
    const isArrayMode = modeParam === `array`;
    const extension = isArrayMode ? `.jsonc` : `.json`;
    const suffix = `_sorted`;
    const newFileName = `${parsedPath.name}${suffix}${extension}`;
    const targetPath = path.join(parsedPath.dir, newFileName);

    fs.writeFileSync(targetPath, content, `utf8`);
    outputPath = targetPath;
    isSaved = true;

    logger(`info`, `-----------------------------------------`);
    logger(`success`, `${newFileName} 파일이 성공적으로 생성되었습니다.`);
    logger(`info`, `파일 위치: ${targetPath}`);
    logger(`info`, `Processed Type: ${modeParam}`);
    logger(`info`, `정렬된 결과가 파일에 저장되었습니다.`);
  }
  catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger(`error`, `파일 저장 중 오류가 발생했습니다: ${errMsg}`);
  }

  const result = {
    success: isSaved,
    path: outputPath,
  };
  return result;
};

// 8. 데이터 처리 -----------------------------------------------------------------------------
const processData = (input, modeParam, originalPath) => {
  const isArrayMode = modeParam === `array`;
  const isObjectMode = modeParam === `object`;

  let canRun = false;
  let outputContent = ``;

  isArrayMode && (() => {
    const isValidArray = Array.isArray(input);
    canRun = isValidArray;

    isValidArray && (() => {
      const sorted = sortArray(input);
      const converted = convertToJSONC(sorted);
      outputContent = converted;
    })();

    !isValidArray && (() => {
      logger(`error`, `오류: 입력 데이터가 배열이 아닙니다.`);
    })();
  })();

  isObjectMode && (() => {
    const isPlainObject = typeof input === `object` && input !== null && !Array.isArray(input);
    canRun = isPlainObject;

    isPlainObject && (() => {
      const sorted = sortObject(input);
      const json = JSON.stringify(sorted, null, 2);
      outputContent = json;
    })();

    !isPlainObject && (() => {
      logger(`error`, `오류: 입력 데이터가 객체가 아닙니다.`);
    })();
  })();

  canRun && (() => {
    const saveResult_output = saveResult(outputContent, originalPath, modeParam);
    !saveResult_output.success && (canRun = false);
  })();

  const result = {
    success: canRun,
    content: outputContent,
  };
  return result;
};

// 9. 메인 로직 ------------------------------------------------------------------------------
const runSort = async (filePath, modeParam) => {
  let success = false;

  const readResult = readInputFile(filePath);

  !readResult.success && (() => {
    logger(`error`, readResult.error);
  })();

  readResult.success && (() => {
    const processResult = processData(readResult.data, modeParam, filePath);
    success = processResult.success;
  })();

  const result = success;
  return result;
};

// 99. 실행 ----------------------------------------------------------------------------------
(async () => {
  let exitCode = 0;

  try {
    logger(`info`, `스크립트 실행: ${TITLE}`);
    logger(`info`, `전달된 인자 1 (package manager): ${args1 || `none`}`);
    logger(`info`, `전달된 인자 2 (mode): ${args2 || `none`}`);
    logger(`info`, `전달된 인자 3 (file path): ${args3 || `none`}`);

    const hasValidMode = args2 === `array` || args2 === `object`;
    const hasFilePath = args3 !== ``;

    !hasValidMode && (() => {
      logger(`error`, `모드를 지정해주세요: --array 또는 --object`);
      exitCode = 1;
    })();

    !hasFilePath && hasValidMode && (() => {
      logger(`error`, `파일 경로를 지정해주세요`);
      exitCode = 1;
    })();

    hasValidMode && hasFilePath && (async () => {
      const sortSuccess = await runSort(args3, args2);

      sortSuccess && (() => {
        logger(`info`, `스크립트 정상 종료: ${TITLE}`);
      })();

      !sortSuccess && (() => {
        logger(`error`, `정렬 처리 실패`);
        exitCode = 1;
      })();
    })();
  }
  catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    logger(`error`, `${TITLE} 스크립트 실행 실패: ${errMsg}`);
    exitCode = 1;
  }
  finally {
    process.exit(exitCode);
  }
})();
