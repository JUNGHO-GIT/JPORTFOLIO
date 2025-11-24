// server/gcloud.cjs

const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

// 프로젝트 설정 -------------------------------------------------------------------------------
const CONFIG = {
	domain: `junghomun.com`,
	projectName: `JPORTFOLIO`,
	serverIp: `104.196.212.101`,
	localPort: {
		client: 3000,
		server: 4000
	},
	gcs: {
		bucket: `jungho-bucket`,
		path: `JPORTFOLIO/SERVER/build.tar.gz`
	},
	ssh: {
		win: {
			keyPath: `C:\\Users\\jungh\\.ssh\\JKEY`,
			serviceId: `junghomun00`
		},
		linux: {
			keyPath: `~/ssh/JKEY`,
			serviceId: `junghomun1234`
		}
	}
};

// 로깅 함수 -----------------------------------------------------------------------------------
const logger = (type=``, message=``) => {
	const format = (text=``) => text.trim().replace(/^\s+/gm, ``);
	const line = `----------------------------------------`;
	const colors = {
		line: `\x1b[38;5;214m`,
		info: `\x1b[36m`,
		success: `\x1b[32m`,
		warn: `\x1b[33m`,
		error: `\x1b[31m`,
		reset: `\x1b[0m`
	};
	const separator = `${colors.line}${line}${colors.reset}`;

	type === `info` && console.log(format(`
		${separator}
		${colors.info}[INFO]${colors.reset} - ${message}
	`));
	type === `success` && console.log(format(`
		${separator}
		${colors.success}[SUCCESS]${colors.reset} - ${message}
	`));
	type === `warn` && console.log(format(`
		${separator}
		${colors.warn}[WARN]${colors.reset} - ${message}
	`));
	type === `error` && console.log(format(`
		${separator}
		${colors.error}[ERROR]${colors.reset} - ${message}
	`));
};

// OS 확인 --------------------------------------------------------------------------------------
const detectOsAndArgs = () => {
	const winOrLinux = os.platform() === 'win32' ? `win` : `linux`;
	const args = process.argv.slice(2);

	logger(`info`, `운영체제 감지: ${winOrLinux}`);
	logger(`info`, `전달된 인자: ${args.length > 0 ? args.join(', ') : 'none'}`);

	return {
		os: winOrLinux,
		args: args
	};
};

// env 파일 및 index 파일 수정 ---------------------------------------------------------------------
const modifyEnvAndIndex = () => {
	logger(`info`, `.env 및 index.ts 파일 수정 시작`);

	const envFile = fs.readFileSync('.env', 'utf8');
	const indexFile = fs.readFileSync('index.ts', 'utf8');

	const linesEnv = envFile.split(/\r?\n/);
	const linesIndex = indexFile.split(/\r?\n/);

	const updatedEnv = linesEnv.map(line => (
		line.startsWith('CLIENT_URL=') ? (
			`CLIENT_URL=https://www.${CONFIG.domain}/${CONFIG.projectName}`
		) : line.startsWith('GOOGLE_CALLBACK_URL=') ? (
			`GOOGLE_CALLBACK_URL=https://www.${CONFIG.domain}/${CONFIG.projectName}/api/auth/google/callback`
		) : (
			line
		)
	));

	const updatedIndex = linesIndex.map(line => (
		line.startsWith(`// const db = process.env.DB_NAME`) ? (
			`const db = process.env.DB_NAME`
		) : line.startsWith(`const db = process.env.DB_TEST`) ? (
			`// const db = process.env.DB_TEST`
		) : (
			line
		)
	));

	const newEnvFile = updatedEnv.join(os.EOL);
	const newIndexFile = updatedIndex.join(os.EOL);

	fs.writeFileSync('.env', newEnvFile);
	fs.writeFileSync('index.ts', newIndexFile);

	logger(`success`, `.env 및 index.ts 파일 수정 완료`);
};

// changelog 수정 -------------------------------------------------------------------------------
const modifyChangelog = () => {
	logger(`info`, `changelog.md 업데이트 시작`);

	const currentDate = new Date().toLocaleDateString('ko-KR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	});

	const currentTime = new Date().toLocaleTimeString('ko-KR', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	});

	const changelog = fs.readFileSync(`changelog.md`, 'utf8');
	const versionPattern = /(\s*)(\d+[.]\d+[.]\d+)(\s*)/g;
	const matches = [...changelog.matchAll(versionPattern)];
	const lastMatch = matches[matches.length - 1];
	const lastVersion = lastMatch[2];
	const versionArray = lastVersion.split('.');
	versionArray[2] = (parseInt(versionArray[2]) + 1).toString();

	const newVersion = `\\[ ${versionArray.join('.')} \\]`;
	const formattedDateTime = `- ${currentDate} (${currentTime})`
		.replace(/([.]\s*[(])/g, ` (`)
		.replace(/([.]\s*)/g, `-`)
		.replace(/[(](\W*)(\s*)/g, `(`);

	const newEntry = `\n## ${newVersion}\n\n${formattedDateTime}\n`;
	const updatedChangelog = changelog + newEntry;

	fs.writeFileSync(`changelog.md`, updatedChangelog, 'utf8');
	logger(`success`, `changelog.md 업데이트 완료: ${versionArray.join('.')}`);

	return versionArray.join('.');
};

// git push 공통 함수 ---------------------------------------------------------------------------
const gitPush = (remoteName=``, ignoreFilePath=``, winOrLinux=``) => {
	logger(`info`, `Git Push 시작: ${remoteName}`);

	const ignoreFile = `.gitignore`;
	const ignorePublicFile = fs.readFileSync(`.gitignore.public`, 'utf8');
	const ignoreContent = fs.readFileSync(ignoreFilePath, 'utf8');
	const currentBranch = execSync(`git branch --show-current`, { encoding: 'utf8' }).trim();

	logger(`info`, `현재 브랜치: ${currentBranch}`);
	logger(`info`, `.gitignore 파일 교체: ${ignoreFilePath}`);
	fs.writeFileSync(ignoreFile, ignoreContent, 'utf8');
	execSync(`git rm -r -f --cached .`, { stdio: 'inherit' });
	execSync(`git add .`, { stdio: 'inherit' });

	const statusOutput = execSync(`git status --porcelain`, { encoding: 'utf8' }).trim();

	statusOutput ? (() => {
		logger(`info`, `변경사항 감지 - 커밋 진행`);
		const commitMessage = winOrLinux === `win` ? (
			`git commit -m "%date% %time:~0,8%"`
		) : (
			`git commit -m "$(date +%Y-%m-%d) $(date +%H:%M:%S)"`
		);
		execSync(commitMessage, { stdio: 'inherit' });
		logger(`success`, `커밋 완료`);
	})() : logger(`info`, `변경사항 없음 - 커밋 건너뜀`);

	logger(`info`, `Push 진행: ${remoteName} ${currentBranch}`);
	execSync(`git push --force ${remoteName} ${currentBranch}`, { stdio: 'inherit' });
	logger(`success`, `Push 완료: ${remoteName}`);

	fs.writeFileSync(ignoreFile, ignorePublicFile, 'utf8');
	logger(`info`, `.gitignore 파일 복원`);
};

// 원격 서버에서 스크립트 실행 ---------------------------------------------------------------------
const runRemoteScript = (winOrLinux=``) => {
	logger(`info`, `원격 서버 스크립트 실행 시작`);

	const keyPath = winOrLinux === `win` ? (
		CONFIG.ssh.win.keyPath
	) : (
		CONFIG.ssh.linux.keyPath
	);
	const serviceId = winOrLinux === `win` ? (
		CONFIG.ssh.win.serviceId
	) : (
		CONFIG.ssh.linux.serviceId
	);

	const ipAddr = CONFIG.serverIp;
	const serverPath = `/var/www/${CONFIG.domain}/${CONFIG.projectName}/server`;

	const cmdCd = `cd ${serverPath}`;
	const cmdGitFetch = `sudo git fetch --all`;
	const cmdGitReset = `sudo git reset --hard origin/master`;
	const cmdRmClient = `sudo rm -rf client`;
	const cmdCh = `sudo chmod -R 755 ${serverPath}`;
	const cmdStop = `if pm2 describe ${CONFIG.projectName} >/dev/null 2>&1; then sudo pm2 stop ${CONFIG.projectName} && pm2 save; fi`;
	const cmdNpm = `sudo npm install`;
	const cmdStart = `sudo pm2 start ecosystem.config.cjs --env production && pm2 save`;
	const cmdSave = `sleep 5 && sudo pm2 save --force`;

	const sshCommand = winOrLinux === `win` ? (
		`powershell -Command "ssh -i ${keyPath} ${serviceId}@${ipAddr} '${cmdCd} && ${cmdGitFetch} && ${cmdGitReset} && ${cmdRmClient} && ${cmdCh} && ${cmdStop} && ${cmdNpm} && ${cmdStart} && ${cmdSave}'"`
	) : (
		`ssh -i ${keyPath} ${serviceId}@${ipAddr} '${cmdCd} && ${cmdGitFetch} && ${cmdGitReset} && ${cmdRmClient} && ${cmdCh} && ${cmdStop} && ${cmdNpm} && ${cmdStart} && ${cmdSave}'`
	);

	logger(`info`, `SSH 명령 실행 중...`);
	execSync(sshCommand, { stdio: 'inherit' });
	logger(`success`, `원격 서버 스크립트 실행 완료`);
};

// env 파일 및 index 파일 복원 --------------------------------------------------------------------
const restoreEnvAndIndex = () => {
	logger(`info`, `.env 및 index.ts 파일 복원 시작`);

	const envFile = fs.readFileSync('.env', 'utf8');
	const indexFile = fs.readFileSync('index.ts', 'utf8');

	const linesEnv = envFile.split(/\r?\n/);
	const linesIndex = indexFile.split(/\r?\n/);

	const updatedEnv = linesEnv.map(line => (
		line.startsWith('CLIENT_URL=') ? (
			`CLIENT_URL=http://localhost:${CONFIG.localPort.client}/${CONFIG.projectName}`
		) : line.startsWith('GOOGLE_CALLBACK_URL=') ? (
			`GOOGLE_CALLBACK_URL=http://localhost:${CONFIG.localPort.server}/${CONFIG.projectName}/api/auth/google/callback`
		) : (
			line
		)
	));

	const updatedIndex = linesIndex.map(line => (
		line.startsWith(`const db = process.env.DB_NAME`) ? (
			`// const db = process.env.DB_NAME`
		) : line.startsWith(`// const db = process.env.DB_TEST`) ? (
			`const db = process.env.DB_TEST`
		) : (
			line
		)
	));

	const newEnvFile = updatedEnv.join(os.EOL);
	const newIndexFile = updatedIndex.join(os.EOL);

	fs.writeFileSync('.env', newEnvFile);
	fs.writeFileSync('index.ts', newIndexFile);

	logger(`success`, `.env 및 index.ts 파일 복원 완료`);
};

// 실행 ---------------------------------------------------------------------------------------
(() => {
	logger(`info`, `스크립트 실행: gcloud.cjs`);

	try {
		const { os: winOrLinux, args } = detectOsAndArgs();

		args.includes(`--deploy`) ? (() => {
			modifyEnvAndIndex();
			modifyChangelog();
			gitPush(`origin`, `.gitignore.public`, winOrLinux);
			gitPush(`private`, `.gitignore.private`, winOrLinux);
			runRemoteScript(winOrLinux);
			restoreEnvAndIndex();
			logger(`success`, `전체 배포 프로세스 완료`);
		})() : args.includes(`--git`) ? (() => {
			modifyChangelog();
			gitPush(`origin`, `.gitignore.public`, winOrLinux);
			gitPush(`private`, `.gitignore.private`, winOrLinux);
			logger(`success`, `Git Push 완료`);
		})() : (() => {
			throw new Error(`Invalid argument. Use --git or --deploy.`);
		})();

		process.exit(0);
	}
	catch (e) {
		logger(`error`, `스크립트 실행 실패: ${e.message}`);
		process.exit(1);
	}
})();