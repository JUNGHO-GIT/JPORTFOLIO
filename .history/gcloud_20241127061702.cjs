// gcloud.cjs

const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

const winOrLinux = os.platform() === 'win32' ? "win" : "linux";
console.log(`Activated OS is : ${winOrLinux}`);

// env 파일 및 index 파일 수정 ---------------------------------------------------------------------
const modifyEnvAndIndex = () => {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const indexFile = fs.readFileSync('index.ts', 'utf8');

    // 파일을 줄 단위로 나눔
    const linesEnv = envFile.split(/\r?\n/);
    const linesIndex = indexFile.split(/\r?\n/);

    const updatedEnv = linesEnv.map(line => {
      if (line.startsWith('CLIENT_URL=')) {
        return `CLIENT_URL=https://www.junghomun.com/JPORTFOLIO`;
      }
      if (line.startsWith('GOOGLE_CALLBACK_URL=')) {
        return `GOOGLE_CALLBACK_URL=https://www.junghomun.com/JPORTFOLIO/api/auth/google/callback`;
      }
      // 다른 줄은 그대로 유지
      return line;
    });

    const updatedIndex = linesIndex.map(line => {
      if (line.startsWith(`// const db = process.env.DB_NAME`)) {
        return `const db = process.env.DB_NAME`;
      }
      if (line.startsWith(`const db = process.env.DB_TEST`)) {
        return `// const db = process.env.DB_TEST`;
      }
      // 다른 줄은 그대로 유지
      return line;
    });

    // 줄을 다시 합쳐서 저장
    const newEnvFile = updatedEnv.join(os.EOL);
    const newIndexFile = updatedIndex.join(os.EOL);

    fs.writeFileSync('.env', newEnvFile);
    fs.writeFileSync('index.ts', newIndexFile);
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// changelog 수정 ----------------------------------------------------------------------------------
const modifyChangelog = () => {
  try {

    // ex. 2024-11-03 (16:23:24)
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

    const changelog = fs.readFileSync('changelog.md', 'utf8');
    const versionPattern = /(\s*)(\d+[.]\d+[.]\d+)(\s*)/g;
    const matches = [...changelog.matchAll(versionPattern)];
    const lastMatch = matches[matches.length - 1];
    const lastVersion = lastMatch[2];
    const versionArray = lastVersion.split('.');
    versionArray[2] = (parseInt(versionArray[2]) + 1).toString();

    let newVersion = `\\[ ${versionArray.join('.')} \\]`;
    let newDateTime = `- ${currentDate} (${currentTime})`;
    newDateTime = newDateTime.replace(/([.]\s*[(])/g, ' (');
    newDateTime = newDateTime.replace(/([.]\s*)/g, '-');
    newDateTime = newDateTime.replace(/[(](\W*)(\s*)/g, '(');

    let newEntry = `\n## ${newVersion}\n\n${newDateTime}\n`;

    const updatedChangelog = changelog + newEntry;

    fs.writeFileSync('changelog.md', updatedChangelog, 'utf8');
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// git push (public) -------------------------------------------------------------------------------
const gitPushPublic = () => {
  try {
    const ignoreFile = ".gitignore";
    const ignorePublicFile = fs.readFileSync(".gitignore.public", "utf8");
    fs.writeFileSync(ignoreFile, ignorePublicFile, "utf8");

    const gitRmCached = (
      'git rm -r --cached .'
    );
    const gitAdd = (
      'git add .'
    );
    const gitCommit = (
      winOrLinux === "win"
      ? 'git commit -m \"%date% %time:~0,8%\"'
      : 'git commit -m \"$(date +%Y-%m-%d) $(date +%H:%M:%S)\"'
    );
    const gitPushPublic = (
      'git push origin master'
    );

    execSync(gitRmCached, { stdio: 'inherit' });
    execSync(gitAdd, { stdio: 'inherit' });
    execSync(gitCommit, { stdio: 'inherit' });
    execSync(gitPushPublic, { stdio: 'inherit' });

    fs.writeFileSync(ignoreFile, ignorePublicFile, "utf8");
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// git push (private) ------------------------------------------------------------------------------
const gitPushPrivate = () => {
  try {
    const ignoreFile = ".gitignore";
    const ignorePublicFile = fs.readFileSync(".gitignore.public", "utf8");
    const ignorePrivateFile = fs.readFileSync(".gitignore.private", "utf8");
    fs.writeFileSync(ignoreFile, ignorePrivateFile, "utf8");

    const gitRmCached = (
      'git rm -r --cached .'
    );
    const gitAdd = (
      'git add .'
    );
    const gitCommit = (
      winOrLinux === "win"
      ? 'git commit -m \"%date% %time:~0,8%\"'
      : 'git commit -m \"$(date +%Y-%m-%d) $(date +%H:%M:%S)\"'
    );
    const gitPushPrivate = (
      'git push private master'
    );

    execSync(gitRmCached, { stdio: 'inherit' });
    execSync(gitAdd, { stdio: 'inherit' });
    execSync(gitCommit, { stdio: 'inherit' });
    execSync(gitPushPrivate, { stdio: 'inherit' });

    fs.writeFileSync(ignoreFile, ignorePublicFile, "utf8");
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
    const cmdCd = 'cd /var/www/junghomun.com/JPORTFOLIO/server';
    const cmdGitFetch = 'sudo git fetch --all';
    const cmdGitReset = 'sudo git reset --hard origin/master';
    const cmdRmClient = 'sudo rm -rf client';
    const cmdCh = 'sudo chmod -R 755 /var/www/junghomun.com/JPORTFOLIO/server';
    const cmdStop = 'if pm2 describe JPORTFOLIO >/dev/null 2>&1; then sudo pm2 stop JPORTFOLIO; fi';
    const cmdNpm = 'sudo npm install';
    const cmdStart = 'sudo pm2 start ecosystem.config.cjs --env production';
    const cmdSave = 'sleep 5 && sudo pm2 save --force';

    const winCommand = `powershell -Command "ssh -i ${keyPath} ${serviceId}@${ipAddr} \'${cmdCd} && ${cmdGitFetch} && ${cmdGitReset} && ${cmdRmClient} && ${cmdCh} && ${cmdStop} && ${cmdNpm} && ${cmdStart} && ${cmdSave}\'"`;

    const linuxCommand = `ssh -i ${keyPath} ${serviceId}@${ipAddr} \'${cmdCd} && ${cmdGitFetch} && ${cmdGitReset} && ${cmdRmClient} && ${cmdCh} && ${cmdStop} && ${cmdNpm} && ${cmdStart} && ${cmdSave}\'`;

    const sshCommand = winOrLinux === "win" ? winCommand : linuxCommand;
    execSync(sshCommand, { stdio: 'inherit' });
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// env 파일 및 index 파일 복원 --------------------------------------------------------------------
const restoreEnvAndIndex = () => {
  try {
    const envFile = fs.readFileSync('.env', 'utf8');
    const indexFile = fs.readFileSync('index.ts', 'utf8');

    // 파일을 줄 단위로 나눔
    const linesEnv = envFile.split(/\r?\n/);
    const linesIndex = indexFile.split(/\r?\n/);

    const updatedEnv = linesEnv.map(line => {
      if (line.startsWith('CLIENT_URL=')) {
        return `CLIENT_URL=http://localhost:3000/JPORTFOLIO`;
      }
      if (line.startsWith('GOOGLE_CALLBACK_URL=')) {
        return `GOOGLE_CALLBACK_URL=http://localhost:4000/JPORTFOLIO/api/auth/google/callback`;
      }
      // 다른 줄은 그대로 유지
      return line;
    });

    const updatedIndex = linesIndex.map(line => {
      if (line.startsWith(`const db = process.env.DB_NAME`)) {
        return `// const db = process.env.DB_NAME`;
      }
      if (line.startsWith(`// const db = process.env.DB_TEST`)) {
        return `const db = process.env.DB_TEST`;
      }
      // 다른 줄은 그대로 유지
      return line;
    });

    // 줄을 다시 합쳐서 저장
    const newEnvFile = updatedEnv.join(os.EOL);
    const newIndexFile = updatedIndex.join(os.EOL);

    fs.writeFileSync('.env', newEnvFile);
    fs.writeFileSync('index.ts', newIndexFile);
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// -------------------------------------------------------------------------------------------------
modifyEnvAndIndex();
modifyChangelog();
gitPushPublic();
gitPushPrivate();
runRemoteScript();
restoreEnvAndIndex();
process.exit(0);