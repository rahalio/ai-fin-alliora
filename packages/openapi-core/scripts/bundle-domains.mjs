import { mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const bundled = join(root, "src", ".bundled");
mkdirSync(bundled, { recursive: true });

const domains = [
  "identity",
  "capabilities",
  "decisions",
  "stagegates",
  "experience",
  "dependencies",
  "alerts",
  "workforce",
  "reports",
];

for (const domain of domains) {
  for (const [ext, dest] of [
    ["yaml", join(bundled, `${domain}.openapi.yaml`)],
    ["json", join(bundled, `${domain}.json`)],
  ]) {
    const result = spawnSync(
      "pnpm",
      ["exec", "redocly", "bundle", domain, "--output", dest],
      { cwd: root, stdio: "inherit" }
    );
    if (result.status !== 0) {
      process.exit(result.status ?? 1);
    }
  }
}
