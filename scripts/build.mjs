import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import process from "node:process";

await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
await cp("site", "dist", { recursive: true });

const buildInfo = {
  commit: process.env.GITHUB_SHA ?? "local-build",
  builtAt: new Date().toISOString()
};

await writeFile(
  "dist/build-info.json",
  JSON.stringify(buildInfo, null, 2) + "\n",
  "utf8"
);

console.log("Build complete: dist/");
console.log(buildInfo);
