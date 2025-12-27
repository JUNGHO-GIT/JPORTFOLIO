/**
 * @file git.mjs
 * @description Git 관련 자동화 스크립트 (ESM)
 * @author Jungho
 * @since 2025-12-03
 */

// @ts-check
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import process from "node:process";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { logger, runPrompt, fileExists } from "../lib/utils.mjs";
import { env } from "../lib/env.mjs";
import { settings } from "../lib/settings.mjs";

// 1. 인자 파싱 ------------------------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const TITLE = path.basename(__filename);
const argv = process.argv.slice(2);
const args1 = argv.find((arg) => [
	`--npm`,
	`--pnpm`,
	`--yarn`,
	`--bun`,
].includes(arg))?.replace(`--`, ``) || ``;
const args2 = argv.find((arg) => [
	`--push`,
	`--fetch`,
].includes(arg))?.replace(`--`, ``) || ``;
const args3 = argv.find((arg) => [
	`--y`,
	`--n`,
].includes(arg))?.replace(`--`, ``) || ``;
const BACKUP_DIR = path.join(`.node`, `.tmp`);
const BACKUP_PATH = path.join(BACKUP_DIR, `git.mjs.backup.json`);

// 2. 원격 저장소 유틸 -----------------------------------------------------------------------
const remoteUtils = {
	getSettings: (remoteName = ``) => (
		remoteName === settings.git.remotes.public.name ? settings.git.remotes.public
			: remoteName === settings.git.remotes.private.name ? settings.git.remotes.private
				: null
	),
	getBranch: (remoteName = ``) => remoteUtils.getSettings(remoteName)?.branch || null,
	exists: (remoteName = ``) => {
		try {
			execSync(`git remote get-url ${remoteName}`, { encoding: `utf8`, stdio: `pipe` });
			return true;
		}
		catch {
			return false;
		}
	},
	branchExists: (remoteName = ``, branchName = ``) => {
		try {
			execSync(`git ls-remote --exit-code --heads ${remoteName} ${branchName}`, { stdio: `pipe` });
			return true;
		}
		catch {
			return false;
		}
	},
	hasLocalBranch: (branch = ``) => {
		try {
			branch && execSync(`git show-ref --verify --quiet refs/heads/${branch}`, { stdio: `pipe` });
			return Boolean(branch);
		}
		catch {
			return false;
		}
	},
	ensureLocalFromRemote: (branch = ``, remoteName = ``) => {
		const ok = branch && remoteName && remoteUtils.exists(remoteName) && (() => {
			try {
				execSync(`git fetch ${remoteName} --prune`, { stdio: `pipe` });
				execSync(`git checkout -B ${branch} ${remoteName}/${branch}`, { stdio: `pipe` });
				return true;
			}
			catch {
				return false;
			}
		})();
		return ok ?? false;
	},
};

// 3. 브랜치 관리 (기본브랜치 설정 + 정리) ---------------------------------------------------
const manageBranches = (mode = ``) => {
	// 3-1. 기본브랜치 설정
	mode === `setDefault` && [settings.git.remotes.public.name, settings.git.remotes.private.name].forEach((remoteName) => {
		const remoteExists = remoteUtils.exists(remoteName);
		!remoteExists && logger(`info`, `Remote '${remoteName}' 존재하지 않음 - 기본브랜치 설정 건너뜀`);

		remoteExists && (() => {
			const targetBranch = remoteUtils.getBranch(remoteName);
			!targetBranch && logger(`warn`, `원격 기본브랜치를 찾을 수 없습니다: ${remoteName}`);

			targetBranch && remoteUtils.branchExists(remoteName, targetBranch) && (() => {
				try {
					const remoteUrl = execSync(`git remote get-url ${remoteName}`, { encoding: `utf8` }).trim();
					const match = remoteUrl.match(/github\.com[/:]([^/]+)\/([^./]+)/);
					match && (() => {
						const [, owner, repo] = match;
						execSync(`gh api repos/${owner}/${repo} -X PATCH -f default_branch=${targetBranch}`, { stdio: `pipe` });
						logger(`success`, `GitHub default branch 변경 완료: ${targetBranch}`);

						!targetBranch.endsWith(`main`) && (() => {
							try {
								execSync(`git push ${remoteName} --delete main`, { stdio: `pipe` });
								logger(`success`, `원격 'main' 브랜치 삭제 완료: ${remoteName}`);
							}
							catch {
								logger(`info`, `원격 'main' 브랜치 없음 또는 이미 삭제됨`);
							}
						})();
					})();
				}
				catch (error) {
					logger(`warn`, `GitHub default branch 설정 실패: ${error instanceof Error ? error.message : String(error)}`);
				}
			})();
		})();
	});

	// 3-2. 브랜치 정리
	mode === `cleanup` && (() => {
		logger(`info`, `불필요한 브랜치 정리 시작`);
		const uniqueDefaults = [
			...new Set([
				remoteUtils.getBranch(settings.git.remotes.public.name),
				remoteUtils.getBranch(settings.git.remotes.private.name),
			].filter(Boolean))
		];

		uniqueDefaults.length === 0 && logger(`warn`, `기본브랜치 설정을 찾을 수 없습니다 - 브랜치 정리 스킵`);

		// 로컬 브랜치 정리
		uniqueDefaults.length > 0 && (() => {
			const localBranches = execSync(`git branch --list`, { encoding: `utf8` })
			.split(/\r?\n/)
			.map((b) => b.replace(/^\*?\s*/, ``).trim())
			.filter(Boolean);
			const localToDelete = localBranches.filter((b) => !uniqueDefaults.includes(b));

			localToDelete.length > 0 && (() => {
				const currentBranch = execSync(`git branch --show-current`, { encoding: `utf8` }).trim();
				!uniqueDefaults.includes(currentBranch) && (() => {
					const switchTo = String(uniqueDefaults[0] || ``);
					switchTo && (remoteUtils.hasLocalBranch(switchTo) ? (() => {
						try {
							execSync(`git checkout ${switchTo}`, { stdio: `inherit` });
						}
						catch {
							logger(`warn`, `브랜치 전환 실패: ${switchTo}`);
						}
					})() : (() => {
						const created = remoteUtils.ensureLocalFromRemote(switchTo, settings.git.remotes.private.name) || remoteUtils.ensureLocalFromRemote(switchTo, settings.git.remotes.public.name);
						created ? logger(`info`, `로컬 기본브랜치 생성/전환 완료: ${switchTo}`) : logger(`warn`, `로컬 기본브랜치 생성/전환 실패: ${switchTo}`);
					})());
				})();

				const afterBranch = execSync(`git branch --show-current`, { encoding: `utf8` }).trim();
				localToDelete.filter((b) => b !== afterBranch).forEach((branch) => {
					try {
						execSync(`git branch -D ${branch}`, { stdio: `pipe` });
						logger(`success`, `로컬 브랜치 삭제 완료: ${branch}`);
					}
					catch (error) {
						logger(`warn`, `로컬 브랜치 삭제 실패: ${branch} - ${error instanceof Error ? error.message : String(error)}`);
					}
				});
			})();
		})();

		// 원격 브랜치 정리
		[settings.git.remotes.public.name, settings.git.remotes.private.name].forEach((remoteName) => {
			const remoteExists = remoteUtils.exists(remoteName);
			!remoteExists && logger(`info`, `Remote '${remoteName}' 존재하지 않음 - 원격 브랜치 정리 건너뜀`);

			remoteExists && (() => {
				const targetBranch = remoteUtils.getBranch(remoteName);
				targetBranch && (() => {
					try {
						execSync(`git fetch ${remoteName} --prune`, { stdio: `pipe` });
					}
					catch {
						logger(`warn`, `${remoteName} fetch 실패`);
					}

					const remoteBranches = execSync(`git branch -r --list "${remoteName}/*"`, { encoding: `utf8` })
					.split(/\r?\n/)
					.map((b) => b.trim())
					.filter((b) => b && !b.includes(`HEAD`))
					.map((b) => b.replace(`${remoteName}/`, ``));

					remoteBranches.filter((b) => b !== targetBranch).forEach((branch) => {
						try {
							execSync(`git push ${remoteName} --delete ${branch}`, { stdio: `pipe` });
							logger(`success`, `원격 브랜치 삭제 완료: ${remoteName}/${branch}`);
						}
						catch (error) {
							logger(`warn`, `원격 브랜치 삭제 실패: ${remoteName}/${branch} - ${error instanceof Error ? error.message : String(error)}`);
						}
					});
				})();
			})();
		});
		logger(`success`, `브랜치 정리 완료`);
	})();
};

// 4. Git LFS 설정 ---------------------------------------------------------------------------
const ensureGitLfs = () => {
	logger(`info`, `Git LFS 강제 설정 시작`);
	try {
		execSync(`git lfs install --force`, { stdio: `pipe` });
		logger(`success`, `Git LFS 설치/초기화 완료`);

		const gitattributesPath = `.gitattributes`;
		const lfsPatterns = [
			`*.zip filter=lfs diff=lfs merge=lfs -text`,
			`*.tar.gz filter=lfs diff=lfs merge=lfs -text`,
			`*.7z filter=lfs diff=lfs merge=lfs -text`,
			`*.rar filter=lfs diff=lfs merge=lfs -text`,
			`*.png filter=lfs diff=lfs merge=lfs -text`,
			`*.jpg filter=lfs diff=lfs merge=lfs -text`,
			`*.jpeg filter=lfs diff=lfs merge=lfs -text`,
			`*.gif filter=lfs diff=lfs merge=lfs -text`,
			`*.mp4 filter=lfs diff=lfs merge=lfs -text`,
			`*.mp3 filter=lfs diff=lfs merge=lfs -text`,
			`*.pdf filter=lfs diff=lfs merge=lfs -text`,
			`*.psd filter=lfs diff=lfs merge=lfs -text`,
			`*.ai filter=lfs diff=lfs merge=lfs -text`,
			`*.vsix filter=lfs diff=lfs merge=lfs -text`,
		];

		const existingContent = fileExists(gitattributesPath) ? fs.readFileSync(gitattributesPath, `utf8`) : ``;
		const existingLines = new Set(existingContent.split(/\r?\n/).map((l) => l.trim()).filter(Boolean));
		const missingPatterns = lfsPatterns.filter((p) => !existingLines.has(p));

		missingPatterns.length > 0 ? (() => {
			const newContent = existingContent.trim() + (existingContent.trim() ? os.EOL : ``) + missingPatterns.join(os.EOL) + os.EOL;
			fs.writeFileSync(gitattributesPath, newContent, `utf8`);
			logger(`success`, `.gitattributes LFS 패턴 추가 완료: ${missingPatterns.length}개`);
		})() : logger(`info`, `.gitattributes LFS 패턴 이미 설정됨`);

		const trackedFiles = execSync(`git lfs ls-files`, { encoding: `utf8` }).trim();
		trackedFiles ? logger(`info`, `LFS 추적 파일 존재: ${trackedFiles.split(/\r?\n/).length}개`) : logger(`info`, `LFS 추적 파일 없음`);
	}
	catch (error) {
		logger(`warn`, `Git LFS 설정 실패: ${error instanceof Error ? error.message : String(error)}`);
	}
};

// 5. 환경변수 파일 관리 ---------------------------------------------------------------------
const envManager = {
	upsertLine: (content = ``, key = ``, value = ``) => {
		const lines = content.split(/\r?\n/);
		const rx = new RegExp(`^\\s*${key}\\s*=`, `i`);
		const idx = lines.findIndex((line) => rx.test(line));
		const nextLine = `${key}=${value}`;
		idx >= 0 ? (lines[idx] = nextLine) : lines.push(nextLine);
		return lines.join(os.EOL);
	},
	findLine: (content = ``, key = ``) => {
		const lines = content.split(/\r?\n/);
		const rx = new RegExp(`^\\s*${key}\\s*=`, `i`);
		const idx = lines.findIndex((line) => rx.test(line));
		return { idx: idx, line: idx >= 0 ? lines[idx] : null };
	},
	readBackup: () => {
		try {
			const parsed = JSON.parse(fs.readFileSync(BACKUP_PATH, `utf8`));
			return parsed && typeof parsed === `object` ? parsed : null;
		}
		catch {
			return null;
		}
	},
	writeBackup: (payload) => {
		try {
			fs.mkdirSync(BACKUP_DIR, { recursive: true });
			fs.writeFileSync(BACKUP_PATH, `${JSON.stringify(payload, null, 2)}\n`, `utf8`);
			return true;
		}
		catch {
			return false;
		}
	},
	cleanupBackup: () => {
		try {
			fs.existsSync(BACKUP_PATH) && fs.unlinkSync(BACKUP_PATH);
			fs.existsSync(BACKUP_DIR) && fs.readdirSync(BACKUP_DIR).length === 0 && fs.rmdirSync(BACKUP_DIR);
			logger(`info`, `백업 정리 완료: ${BACKUP_PATH}`);
		}
		catch {
			logger(`warn`, `백업 정리 실패: ${BACKUP_PATH}`);
		}
	},
	syncFiles: () => {
		const syncOne = (filePath = ``, mode = ``) => {
			const abs = path.resolve(process.cwd(), filePath);
			!fs.existsSync(abs) && (() => {
				logger(`info`, `env 파일 없음 - 건너뜀: ${filePath}`);
			})();

			fs.existsSync(abs) && (() => {
				const content = fs.readFileSync(abs, `utf8`);
				const isProd = mode === `PRODUCTION`;
				let next = content;
				next = envManager.upsertLine(next, `ENV_MODE`, isProd ? `PRODUCTION` : `DEVELOPMENT`);
				next = envManager.upsertLine(next, `CLIENT_URL`, isProd ? `https://www.${env.domain}/${env.projectName}` : `http://localhost:${env.localPort.client}/${env.projectName}`);
				next = envManager.upsertLine(next, `GOOGLE_CALLBACK_URL`, isProd ? `https://www.${env.domain}/${env.projectName}/${env.gcp.callback}` : `http://localhost:${env.localPort.server}/${env.projectName}/${env.gcp.callback}`);
				fs.writeFileSync(abs, next, `utf8`);
			})();
		};

		syncOne(`.env.development`, `DEVELOPMENT`);
		syncOne(`.env.production`, `PRODUCTION`);
		logger(`info`, `.env.development/.env.production 동기화 완료`);
	},
	modify: () => {
		const envExists = fileExists(`.env`);
		!envExists && logger(`info`, `.env 파일 없음 - GLOBAL_ENV 수정 건너뜀`);

		envExists && (() => {
			logger(`info`, `.env 파일 수정 시작 (GLOBAL_ENV=PRODUCTION)`);
			const envContent = fs.readFileSync(`.env`, `utf8`);
			const backup = envManager.readBackup() ?? {};
			const nextBackup = { ...backup, updatedAt: new Date().toISOString(), env: backup.env ?? {} };

			const found = envManager.findLine(envContent, `GLOBAL_ENV`);
			found.line && (nextBackup.env[`GLOBAL_ENV`] = found.line);
			envManager.writeBackup(nextBackup);

			fs.writeFileSync(`.env`, envManager.upsertLine(envContent, `GLOBAL_ENV`, `PRODUCTION`), `utf8`);
			logger(`info`, `.env 파일 수정 완료`);
		})();
	},
	restore: () => {
		const envExists = fileExists(`.env`);
		!envExists && logger(`info`, `.env 파일 없음 - GLOBAL_ENV 복원 건너뜀`);

		envExists && (() => {
			logger(`info`, `.env 파일 복원 시작`);
			const envContent = fs.readFileSync(`.env`, `utf8`);
			const backup = envManager.readBackup();
			const hasBackup = Boolean(backup?.env?.GLOBAL_ENV);

			const restored = hasBackup ? (() => {
				const lines = envContent.split(/\r?\n/);
				const { idx } = envManager.findLine(envContent, `GLOBAL_ENV`);
				idx >= 0 && (lines[idx] = backup.env[`GLOBAL_ENV`]);
				return lines.join(os.EOL);
			})() : envManager.upsertLine(envContent, `GLOBAL_ENV`, `DEVELOPMENT`);

			fs.writeFileSync(`.env`, restored, `utf8`);
			logger(`info`, `.env 파일 복원 완료`);
		})();
	},
};

// 6. 버전 및 Changelog 업데이트 -------------------------------------------------------------
const updateVersionAndChangelog = (msg = ``) => {
	let newVersion = ``;

	// 6-1. changelog 수정
	fileExists(`changelog.md`) && (() => {
		logger(`info`, `changelog.md 업데이트 시작`);
		const changelog = fs.readFileSync(`changelog.md`, `utf8`);
		const matches = [...changelog.matchAll(/(\s*)(\d+\.\d+\.\d+)(\s*)/g)];
		const lastVersion = matches.at(-1)?.[2] ?? `0.0.0`;
		const ver = lastVersion.split(`.`).map(Number);

		ver[2]++;
		ver[2] >= 10 && (ver[2] = 0, ver[1]++);
		ver[1] >= 10 && (ver[1] = 0, ver[0]++);
		newVersion = ver.join(`.`);

		const entryContent = msg || (() => {
			const now = new Date();
			const dateStr = now.toLocaleDateString(`ko-KR`, { year: `numeric`, month: `2-digit`, day: `2-digit` });
			const timeStr = now.toLocaleTimeString(`ko-KR`, { hour: `2-digit`, minute: `2-digit`, second: `2-digit`, hour12: false });
			return `- ${dateStr} (${timeStr})`.replaceAll(/(\.\s*\()/g, ` (`).replaceAll(/(\.\s*)/g, `-`).replaceAll(/\((\W*)(\s*)/g, `(`);
		})();

		fs.writeFileSync(`changelog.md`, `${changelog}\n## \\[ ${newVersion} \\]\n\n${msg ? `- ${msg}` : entryContent}\n`, `utf8`);
		logger(`success`, `changelog.md 업데이트 완료: ${newVersion}`);
	})();

	// 6-2. package.json 버전 수정
	newVersion && fileExists(`package.json`) && (() => {
		logger(`info`, `package.json 버전 업데이트 시작: ${newVersion}`);
		const pkg = JSON.parse(fs.readFileSync(`package.json`, `utf8`));
		pkg.version = newVersion;
		fs.writeFileSync(`package.json`, `${JSON.stringify(pkg, null, 2)}\n`, `utf8`);
		logger(`success`, `package.json 버전 업데이트 완료: ${newVersion}`);
	})();
};

// 7. Git Fetch ------------------------------------------------------------------------------
const gitFetch = () => {
	try {
		const privateExists = remoteUtils.exists(settings.git.remotes.private.name);
		const publicExists = remoteUtils.exists(settings.git.remotes.public.name);
		const canUseRemote = privateExists || publicExists;

		!canUseRemote && logger(`warn`, `사용 가능한 remote가 없습니다 - fetch/reset 스킵`);

		canUseRemote && (() => {
			const targetRemote = privateExists ? settings.git.remotes.private.name : settings.git.remotes.public.name;
			const targetBranch = remoteUtils.getBranch(targetRemote);

			!targetBranch && logger(`warn`, `원격 기본브랜치를 찾을 수 없습니다 - fetch/reset 스킵`);

			targetBranch && (() => {
				const fullRef = `${targetRemote}/${targetBranch}`;
				logger(`info`, `Git Fetch 시작: ${targetRemote}`);
				execSync(`git fetch ${targetRemote}`, { stdio: `inherit` });
				logger(`success`, `Git Fetch 완료: ${targetRemote}`);

				logger(`info`, `Git Reset Hard 시작: ${fullRef}`);
				execSync(`git reset --hard ${fullRef}`, { stdio: `inherit` });
				logger(`success`, `Git Reset Hard 완료: ${fullRef}`);
			})();
		})();
	}
	catch (error) {
		logger(`error`, `Git Fetch/Reset 실패: ${error instanceof Error ? error.message : String(error)}`);
		throw error;
	}
};

// 8. Git Push -------------------------------------------------------------------------------
const gitPush = (remoteName = ``, ignoreFilePath = ``, msg = ``) => {
	const remoteExists = remoteUtils.exists(remoteName);
	!remoteExists && logger(`info`, `Remote '${remoteName}' 존재하지 않음 - 건너뜀`);

	remoteExists && (() => {
		const targetBranch = remoteUtils.getBranch(remoteName);
		!targetBranch && logger(`warn`, `원격 기본브랜치를 찾을 수 없습니다: ${remoteName} - push 스킵`);

		targetBranch && (() => {
			const fullRef = `${remoteName}/${targetBranch}`;
			logger(`info`, `Git Push 시작: ${remoteName} (${fullRef})`);

			const ignorePublicFile = fs.readFileSync(`.gitignore.public`, `utf8`);
			const ignoreContent = fs.readFileSync(ignoreFilePath, `utf8`);

			logger(`info`, `.gitignore 파일 수정 적용: ${ignoreFilePath}`);
			fs.writeFileSync(`.gitignore`, ignoreContent, `utf8`);

			// git cache 초기화
			execSync(`git rm -r -f --cached .`, { stdio: `inherit` });
			execSync(`git add .`, { stdio: `inherit` });

			const statusOutput = execSync(`git status --porcelain`, { encoding: `utf8` }).trim();
			statusOutput && (() => {
				logger(`info`, `변경사항 감지 - 커밋 진행`);
				const tempFile = `.git-commit-msg.tmp`;
				const commitContent = msg || (() => {
					const now = new Date();
					return `${now.toISOString().slice(0, 10)} ${now.toTimeString().slice(0, 8)}`;
				})();
				fs.writeFileSync(tempFile, commitContent, `utf8`);
				execSync(`git commit -F "${tempFile}"`, { stdio: `inherit` });
				fs.unlinkSync(tempFile);
				logger(`success`, `커밋 완료`);
			})();
			!statusOutput && logger(`info`, `변경사항 없음 - 커밋 건너뜀`);

			logger(`info`, `Push 진행: ${fullRef}`);
			execSync(`git push --force ${remoteName} HEAD:${targetBranch}`, { stdio: `inherit` });
			logger(`success`, `Push 완료: ${fullRef}`);

			fs.writeFileSync(`.gitignore`, ignorePublicFile, `utf8`);
			logger(`info`, `.gitignore 파일 복원`);
		})();
	})();
};

// 9. Push 프로세스 실행 ---------------------------------------------------------------------
const runPushProcess = async () => {
	const commitMsg = args3.includes(`n`) ? `` : await runPrompt(`커밋 메시지 입력 (빈값 = 날짜/시간): `);
	logger(`info`, `커밋 메시지: ${commitMsg || `auto (date/time)`}`);

	ensureGitLfs();
	envManager.syncFiles();
	updateVersionAndChangelog(commitMsg);

	envManager.modify();
	try {
		gitPush(settings.git.remotes.public.name, `.gitignore.public`, commitMsg);
		gitPush(settings.git.remotes.private.name, `.gitignore.private`, commitMsg);
		logger(`success`, `Git Push 완료`);
	}
	finally {
		envManager.restore();
		envManager.cleanupBackup();
	}
};

// 10. 메인 실행 -----------------------------------------------------------------------------
(async () => {
	try {
		logger(`info`, `스크립트 실행: ${TITLE}`);
		logger(`info`, `전달된 인자 1: ${args1 || `none`}`);
		logger(`info`, `전달된 인자 2: ${args2 || `none`}`);
		logger(`info`, `전달된 인자 3: ${args3 || `none`}`);
	}
	catch {
		logger(`warn`, `인자 파싱 오류 발생`);
		process.exit(0);
	}

	try {
		args2 === `fetch` && (() => {
			ensureGitLfs();
			manageBranches(`setDefault`);
			manageBranches(`cleanup`);
			gitFetch();
		})();

		args2 === `push` && (await (async () => {
			await runPushProcess();
			manageBranches(`setDefault`);
			manageBranches(`cleanup`);
		})());

		logger(`info`, `스크립트 정상 종료: ${TITLE}`);
		process.exit(0);
	}
	catch (error) {
		const errMsg = error instanceof Error ? error.message : String(error);
		logger(`error`, `${TITLE} 스크립트 실행 실패: ${errMsg}`);
		process.exit(1);
	}
})();
