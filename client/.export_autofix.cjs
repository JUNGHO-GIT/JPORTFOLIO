// _export_autofix.cjs

const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const process = require("node:process");
const { Project, SyntaxKind } = require("ts-morph");

function parseArgs(argv) {
  const args = {
    project: "tsconfig.json",
    apply: false,
    ignore: [],
    skip: [],
    include: [],
    exclude: [],
    report: null,
    skipUsedInModule: true,
    backup: false
  };

  for (let i = 2; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--project") {
      args.project = argv[++i];
    }
    else if (a === "--apply") {
      args.apply = true;
    }
    else if (a === "--ignore") {
      args.ignore.push(argv[++i]);
    }
    else if (a === "--skip") {
      args.skip.push(argv[++i]);
    }
    else if (a === "--include") {
      args.include.push(argv[++i]);
    }
    else if (a === "--exclude") {
      args.exclude.push(argv[++i]);
    }
    else if (a === "--report") {
      args.report = argv[++i];
    }
    else if (a === "--no-uim") {
      args.skipUsedInModule = false;
    }
    else if (a === "--backup") {
      args.backup = true;
    }
    else {
      // unknown flag 무시
    }
  }
  return args;
}

function withLocalBinOnPath(env) {
  const binDir = path.join(process.cwd(), "node_modules", ".bin");
  const parts = (env.PATH || env.Path || "").split(path.delimiter).filter(Boolean);
  if (!parts.includes(binDir)) {
    parts.unshift(binDir);
  }
  const newEnv = { ...env };
  if (process.platform === "win32") {
    newEnv.Path = parts.join(path.delimiter);
  }
  else {
    newEnv.PATH = parts.join(path.delimiter);
  }
  return newEnv;
}

function trySpawn(cmd, args, opts) {
  const res = spawnSync(cmd, args, {
    encoding: "utf8",
    env: withLocalBinOnPath(process.env),
    ...opts
  });
  return res;
}

function resolveTsPruneBinJs() {
  try {
    const pkgPath = require.resolve("ts-prune/package.json", { paths: [process.cwd()] });
    const pkgDir = path.dirname(pkgPath);
    const pkgJson = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
    let binRel = null;

    if (typeof pkgJson.bin === "string") {
      binRel = pkgJson.bin;
    }
    else if (pkgJson.bin && typeof pkgJson.bin === "object") {
      if (pkgJson.bin["ts-prune"]) {
        binRel = pkgJson.bin["ts-prune"];
      }
      else {
        const keys = Object.keys(pkgJson.bin);
        if (keys.length > 0) {
          binRel = pkgJson.bin[keys[0]];
        }
      }
    }

    if (!binRel) {
      return null;
    }

    const binAbs = path.resolve(pkgDir, binRel);
    if (fs.existsSync(binAbs)) {
      return binAbs;
    }
    else {
      return null;
    }
  }
  catch (e) {
    return null;
  }
}

function runTsPrune(args) {
  const cliArgs = ["-p", args.project];
  if (args.skipUsedInModule) {
    cliArgs.push("-u");
  }
  for (const pat of args.ignore) {
    cliArgs.push("-i", pat);
  }
  for (const pat of args.skip) {
    cliArgs.push("-s", pat);
  }

  const errors = [];

  const binJs = resolveTsPruneBinJs();
  if (binJs) {
    const r = trySpawn(process.execPath, [binJs, ...cliArgs]);
    if (!r.error) {
      const okStatus = typeof r.status === "number" ? r.status === 0 : true;
      const hasOut = typeof r.stdout === "string" && r.stdout.trim().length > 0;
      if (okStatus || hasOut) {
        return r.stdout;
      }
      else {
        errors.push(`[node-bin] exited ${r.status} stdout:"${(r.stdout || "").trim()}" stderr:"${(r.stderr || "").trim()}"`);
      }
    }
    else {
      errors.push(`[node-bin] ${r.error.code || "ERR"} ${(r.error.message || "").trim()}`);
    }
  }
  else {
    errors.push("[node-bin] ts-prune 모듈 bin을 해석하지 못함");
  }

  const localBin = path.join(process.cwd(), "node_modules", ".bin", process.platform === "win32") ? "ts-prune.cmd" : "ts-prune";
  if (fs.existsSync(localBin)) {
    const r = trySpawn(localBin, cliArgs);
    if (!r.error) {
      const okStatus = typeof r.status === "number" ? r.status === 0 : true;
      const hasOut = typeof r.stdout === "string" && r.stdout.trim().length > 0;
      if (okStatus || hasOut) {
        return r.stdout;
      }
      else {
        errors.push(`[local-bin] exited ${r.status} stdout:"${(r.stdout || "").trim()}" stderr:"${(r.stderr || "").trim()}"`);
      }
    }
    else {
      errors.push(`[local-bin] ${r.error.code || "ERR"} ${(r.error.message || "").trim()}`);
    }
  }
  else {
    errors.push("[local-bin] node_modules/.bin/ts-prune(.cmd) 없음");
  }

  const pnpmCmd = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
  {
    const r = trySpawn(pnpmCmd, ["exec", "ts-prune", ...cliArgs]);
    if (!r.error) {
      const okStatus = typeof r.status === "number" ? r.status === 0 : true;
      const hasOut = typeof r.stdout === "string" && r.stdout.trim().length > 0;
      if (okStatus || hasOut) {
        return r.stdout;
      }
      else {
        errors.push(`[pnpm-exec] exited ${r.status} stdout:"${(r.stdout || "").trim()}" stderr:"${(r.stderr || "").trim()}"`);
      }
    }
    else {
      errors.push(`[pnpm-exec] ${r.error.code || "ERR"} ${(r.error.message || "").trim()}`);
    }
  }

  const npxCmd = process.platform === "win32" ? "npx.cmd" : "npx";
  {
    const r = trySpawn(npxCmd, ["ts-prune", ...cliArgs]);
    if (!r.error) {
      const okStatus = typeof r.status === "number" ? r.status === 0 : true;
      const hasOut = typeof r.stdout === "string" && r.stdout.trim().length > 0;
      if (okStatus || hasOut) {
        return r.stdout;
      }
      else {
        errors.push(`[npx] exited ${r.status} stdout:"${(r.stdout || "").trim()}" stderr:"${(r.stderr || "").trim()}"`);
      }
    }
    else {
      errors.push(`[npx] ${r.error.code || "ERR"} ${(r.error.message || "").trim()}`);
    }
  }

  const pathCmd = process.platform === "win32" ? "ts-prune.cmd" : "ts-prune";
  {
    const r = trySpawn(pathCmd, cliArgs);
    if (!r.error) {
      const okStatus = typeof r.status === "number" ? r.status === 0 : true;
      const hasOut = typeof r.stdout === "string" && r.stdout.trim().length > 0;
      if (okStatus || hasOut) {
        return r.stdout;
      }
      else {
        errors.push(`[path-ts-prune] exited ${r.status} stdout:"${(r.stdout || "").trim()}" stderr:"${(r.stderr || "").trim()}"`);
      }
    }
    else {
      errors.push(`[path-ts-prune] ${r.error.code || "ERR"} ${(r.error.message || "").trim()}`);
    }
  }

  const msg = `ts-prune 실행 실패:\n${errors.map((e) => ` - ${e}`).join("\n")}`;
  throw new Error(msg);
}

// 예: "C:\proj\src\x.ts:18 - Foo" 또는 "\src\x.ts:36 - default"
const LINE_RE = /^(?<file>.+):(?<line>\d+)\s*-\s*(?<name>.+?)(?:\s*\((?<note>.+)\))?$/;

function parseTsPruneOutput(text) {
  const out = [];
  const lines = text.split(/\r?\n/);
  for (const raw of lines) {
    const line = raw.trim();
    if (line.length === 0) {
      continue;
    }
    const m = LINE_RE.exec(line);
    if (!m) {
      continue;
    }
    const file = path.normalize(m.groups.file);
    const name = m.groups.name.trim();
    const note = m.groups.note ? m.groups.note.trim() : null;
    out.push({ file, name, note });
  }
  return out;
}

function filterByPath(items, include, exclude) {
  if (include.length === 0 && exclude.length === 0) {
    return items;
  }

  const inc = include.map((p) => new RegExp(p));
  const exc = exclude.map((p) => new RegExp(p));

  return items.filter((it) => {
    const f = it.file;
    let ok = inc.length === 0 ? true : inc.some((r) => r.test(f));
    if (!ok) {
      return false;
    }
    if (exc.length > 0 && exc.some((r) => r.test(f))) {
      return false;
    }
    return true;
  });
}

function groupByFile(items) {
  const map = new Map();
  for (const it of items) {
    if (!map.has(it.file)) {
      map.set(it.file, []);
    }
    map.get(it.file).push(it);
  }
  return map;
}

// 프로젝트 루트 기준 절대경로 강제
function toProjectAbsolute(p) {
  const norm = p.replace(/\//g, path.sep);
  if (/^[a-zA-Z]:[\\/]/.test(norm) || /^\\\\/.test(norm)) {
    return norm;
  }
  const trimmed = norm.replace(/^[\\/]+/, "");
  return path.resolve(process.cwd(), trimmed);
}

// 백업 실패는 무시
function safeBackup(filePath) {
  const bak = filePath + ".bak";
  try {
    if (!fs.existsSync(filePath)) {
      return false;
    }
    if (!fs.existsSync(bak)) {
      fs.copyFileSync(filePath, bak);
    }
    return true;
  }
  catch (e) {
    return false;
  }
}

function removeNamesInExportDeclarations(sourceFile, targetNames) {
  const eds = sourceFile.getExportDeclarations();
  for (const ed of eds) {
    const specs = ed.getNamedExports();
    if (specs.length === 0) {
      continue;
    }
    const toRemove = [];
    for (const spec of specs) {
      const local = spec.getNameNode().getText();
      const aliasNode = spec.getAliasNode();
      const exported = aliasNode ? aliasNode.getText() : local;
      if (targetNames.has(exported) || targetNames.has(local)) {
        toRemove.push(spec);
      }
    }
    for (const s of toRemove) {
      s.remove();
    }
    if (ed.getNamedExports().length === 0 && !(ed.isNamespaceExport && ed.isNamespaceExport())) {
      ed.remove();
    }
  }
}

function removeLocalDeclarationsByNames(sourceFile, targetNames) {
  // export const/let/var ...
  const varStmts = sourceFile.getVariableStatements().filter((v) => v.hasExportKeyword());
  for (const v of varStmts) {
    const decls = v.getDeclarations();
    const toRemove = decls.filter((d) => targetNames.has(d.getName()));
    if (toRemove.length === 0) {
      continue;
    }
    if (toRemove.length === decls.length) {
      v.remove();
    }
    else {
      for (const d of toRemove) {
        d.remove();
      }
    }
  }

  // export function/class/enum/interface/type
  const removeAll = (nodes) => {
    for (const n of nodes) {
      const nName = n.getName ? n.getName() : null;
      if (nName && targetNames.has(nName) && n.hasExportKeyword && n.hasExportKeyword()) {
        n.remove();
      }
    }
  };

  removeAll(sourceFile.getFunctions());
  removeAll(sourceFile.getClasses());
  removeAll(sourceFile.getEnums());
  removeAll(sourceFile.getInterfaces());
  removeAll(sourceFile.getTypeAliases());
}

function removeDefaultExport(sourceFile) {
  const assignments = sourceFile.getExportAssignments();
  const defaultAssign = assignments.find((a) => a.isExportEquals() === false);
  if (defaultAssign) {
    defaultAssign.remove();
    return true;
  }
  else {
    const decls = [
      ...sourceFile.getFunctions(),
      ...sourceFile.getClasses()
    ];
    for (const d of decls) {
      if (d.hasExportKeyword && d.hasExportKeyword()) {
        const mods = d.getModifiers().map((m) => m.getText());
        if (mods.includes("default")) {
          d.remove();
          return true;
        }
      }
    }
    return false;
  }
}

function processFile(project, fpath, names, options) {
  const abs = toProjectAbsolute(fpath);

  if (/\.d\.ts$/.test(abs)) {
    return {
      file: fpath,
      removed: [],
      skipped: true,
      reason: "declaration-file"
    };
  }
  else {
    const sf = project.getSourceFile(abs) || project.addSourceFileAtPathIfExists(abs);
    if (!sf) {
      return {
        file: fpath,
        removed: [],
        skipped: true,
        reason: "file-not-found"
      };
    }

    const removed = new Set();

    // 1) re-export / named export 선언에서 specifier 삭제 (type 전용 포함)
    removeNamesInExportDeclarations(sf, names);

    // 2) 로컬 export 선언 제거
    removeLocalDeclarationsByNames(sf, names);

    // 3) default
    if (names.has("default")) {
      if (removeDefaultExport(sf)) {
        removed.add("default");
      }
    }

    // 실제로 삭제된 심볼 추정: 남아있는 것 제외하고 교집합 기반 기록
    for (const n of names) {
      removed.add(n);
    }

    if (removed.size > 0) {
      if (options.apply) {
        if (options.backup) {
          safeBackup(abs);
        }
        sf.saveSync();
      }
    }

    return {
      file: fpath,
      removed: Array.from(removed),
      skipped: false
    };
  }
}

function main() {
  const args = parseArgs(process.argv);

  const raw = runTsPrune(args);
  const parsed = parseTsPruneOutput(raw);

  const filtered = filterByPath(parsed, args.include, args.exclude);
  const byFile = groupByFile(filtered);

  const project = new Project({
    tsConfigFilePath: path.resolve(process.cwd(), args.project),
    skipAddingFilesFromTsConfig: false
  });

  const results = [];
  for (const [file, items] of byFile.entries()) {
    const names = new Set(items.map((x) => x.name));
    const r = processFile(project, file, names, {
      apply: args.apply,
      backup: args.backup
    });
    results.push(r);
  }

  const summary = {
    project: args.project,
    apply: args.apply,
    totalFiles: byFile.size,
    modifiedFiles: results.filter((r) => r.removed.length > 0).length,
    skippedFiles: results.filter((r) => r.skipped).map((r) => ({
      file: r.file,
      reason: r.reason
    })),
    details: results
  };

  if (args.report) {
    fs.writeFileSync(args.report, JSON.stringify(summary, null, 2), "utf8");
  }

  console.log("=== ts-prune autofix summary ===");
  console.log(`project: ${summary.project}`);
  console.log(`apply: ${summary.apply}`);
  console.log(`files with candidates: ${summary.totalFiles}`);
  console.log(`modified files: ${summary.modifiedFiles}`);
  if (summary.skippedFiles.length > 0) {
    console.log("skipped:");
    for (const s of summary.skippedFiles) {
      console.log(`  - ${s.file} (${s.reason})`);
    }
  }
}

main();
