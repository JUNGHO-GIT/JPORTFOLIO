// client/gcloud.cjs

const os = require('os');
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

// 프로젝트 빌드 -----------------------------------------------------------------------------------
const buildProject = () => {
	logger(`info`, `프로젝트 빌드 시작`);

	const commandBuild = `npm run build`;
	execSync(commandBuild, { stdio: 'inherit' });

	logger(`success`, `프로젝트 빌드 완료`);
};

// build 폴더 압축 ---------------------------------------------------------------------------------
const compressBuild = () => {
	logger(`info`, `build 폴더 압축 시작`);

	const command = `tar -zcvf build.tar.gz build`;
	execSync(command, { stdio: 'inherit' });

	logger(`success`, `build 폴더 압축 완료`);
};

// gcloud에 업로드 ---------------------------------------------------------------------------------
const uploadToGCS = () => {
	logger(`info`, `GCS 업로드 시작`);

	const gcsPath = `gs://${CONFIG.gcs.bucket}/${CONFIG.gcs.path}`;
	const command = `gcloud storage cp build.tar.gz ${gcsPath}`;
	execSync(command, { stdio: 'inherit' });

	logger(`success`, `GCS 업로드 완료: ${gcsPath}`);
};

// 기존 build.tar.gz 삭제 --------------------------------------------------------------------------
const deleteBuildTar = (winOrLinux=``) => {
	logger(`info`, `build.tar.gz 삭제 시작`);

	const command = winOrLinux === `win` ? (
		`del build.tar.gz`
	) : (
		`rm -rf build.tar.gz`
	);
	execSync(command, { stdio: 'inherit' });

	logger(`success`, `build.tar.gz 삭제 완료`);
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
	const clientPath = `/var/www/${CONFIG.domain}/${CONFIG.projectName}/client`;
	const gcsPath = `gs://${CONFIG.gcs.bucket}/${CONFIG.gcs.path}`;

	const cmdCd = `cd ${clientPath}`;
	const cmdGs = `sudo gcloud storage cp ${gcsPath} .`;
	const cmdTar = `sudo tar -zvxf build.tar.gz --strip-components=1`;
	const cmdRm = `sudo rm build.tar.gz`;
	const cmdCh = `sudo chmod -R 755 ${clientPath}`;
	const cmdRestart = `sudo systemctl restart nginx`;

	const sshCommand = winOrLinux === `win` ? (
		`powershell -Command "ssh -i ${keyPath} ${serviceId}@${ipAddr} '${cmdCd} && ${cmdGs} && ${cmdTar} && ${cmdRm} && ${cmdCh} && ${cmdRestart}'"`
	) : (
		`ssh -i ${keyPath} ${serviceId}@${ipAddr} '${cmdCd} && ${cmdGs} && ${cmdTar} && ${cmdRm} && ${cmdCh} && ${cmdRestart}'`
	);

	logger(`info`, `SSH 명령 실행 중...`);
	execSync(sshCommand, { stdio: 'inherit' });
	logger(`success`, `원격 서버 스크립트 실행 완료`);
};

// 실행 ---------------------------------------------------------------------------------------
(() => {
	logger(`info`, `스크립트 실행: gcloud.cjs`);

	try {
		const { os: winOrLinux, args } = detectOsAndArgs();

		args.includes(`--deploy`) ? (() => {
			buildProject();
			compressBuild();
			uploadToGCS();
			deleteBuildTar(winOrLinux);
			runRemoteScript(winOrLinux);
			logger(`success`, `전체 배포 프로세스 완료`);
		})() : (() => {
			throw new Error(`Invalid argument. Use --deploy.`);
		})();

		process.exit(0);
	}
	catch (e) {
		logger(`error`, `스크립트 실행 실패: ${e.message}`);
		process.exit(1);
	}
})();