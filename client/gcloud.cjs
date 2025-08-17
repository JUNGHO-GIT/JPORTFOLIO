// gcloud.cjs

const { execSync } = require('child_process');
const os = require('os');

const winOrLinux = os.platform() === 'win32' ? "win" : "linux";
console.log(`Activated OS is : ${winOrLinux}`);

// 프로젝트 빌드 -----------------------------------------------------------------------------------
const buildProject = () => {
  try {
    const commandBuild = 'npm run build';
    execSync(commandBuild, { stdio: 'inherit' });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// build 폴더 압축 ---------------------------------------------------------------------------------
const compressBuild = () => {
  try {
    const command = 'tar -zcvf build.tar.gz build';
    execSync(command, { stdio: 'inherit' });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// gcloud에 업로드 ---------------------------------------------------------------------------------
const uploadToGCS = () => {
  try {
    const command = 'gcloud storage cp build.tar.gz gs://jungho-bucket/JPORTFOLIO/SERVER/build.tar.gz';
    execSync(command, { stdio: 'inherit' });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// 기존 build.tar.gz 삭제 --------------------------------------------------------------------------
const deleteBuildTar = () => {
  try {
    const del = winOrLinux === "win" ? "del" : "rm -rf";
    const command = `${del} build.tar.gz`
    execSync(command, { stdio: 'inherit' });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// 원격 서버에서 스크립트 실행 ---------------------------------------------------------------------
const runRemoteScript = () => {
  try {
    const keyPath = (
      winOrLinux === "win"
      ? "C:\\Users\\jungh\\.ssh\\JKEY"
      : "~/ssh/JKEY"
    );

    const serviceId = (
      winOrLinux === "win"
      ? 'junghomun00'
      : 'junghomun1234'
    );

    const ipAddr = "104.196.212.101";
    const cmdCd = 'cd /var/www/junghomun.com/JPORTFOLIO/client';
    const cmdGs = 'sudo gcloud storage cp gs://jungho-bucket/JPORTFOLIO/SERVER/build.tar.gz .';
    const cmdTar = 'sudo tar -zvxf build.tar.gz --strip-components=1';
    const cmdRm = 'sudo rm build.tar.gz';
    const cmdCh = 'sudo chmod -R 755 /var/www/junghomun.com/JPORTFOLIO/client'
    const cmdRestart = 'sudo systemctl restart nginx';

    const winCommand = `powershell -Command "ssh -i ${keyPath} ${serviceId}@${ipAddr} \'${cmdCd} && ${cmdGs} && ${cmdTar} && ${cmdRm} && ${cmdCh} && ${cmdRestart}\'"
    `;

    const linuxCommand = `ssh -i ${keyPath} ${serviceId}@${ipAddr} \'${cmdCd} && ${cmdGs} && ${cmdTar} && ${cmdRm} && ${cmdCh} && ${cmdRestart}\'`;

    const sshCommand = winOrLinux === "win" ? winCommand : linuxCommand;

    execSync(sshCommand, { stdio: 'inherit' });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// -------------------------------------------------------------------------------------------------
buildProject();
compressBuild();
uploadToGCS();
deleteBuildTar();
runRemoteScript();
process.exit(0);