import { appendFileSync, existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const reportDirectory = path.resolve(".lighthouseci");
const reports = (existsSync(reportDirectory) ? readdirSync(reportDirectory, { withFileTypes: true }) : [])
  .filter((entry) => entry.isFile() && /^lhr-.*\.json$/.test(entry.name))
  .map((entry) => {
    const report = JSON.parse(readFileSync(path.join(reportDirectory, entry.name), "utf8"));
    const url = new URL(report.finalUrl || report.requestedUrl);
    const score = (category) => {
      const value = report.categories?.[category]?.score;
      return Number.isFinite(value) ? `${Math.round(value * 100)}%` : "n/a";
    };

    return `| \`${url.pathname}\` | ${score("performance")} | ${score("accessibility")} | ${score("best-practices")} | ${score("seo")} |`;
  });

const summary = [
  "## Lighthouse CI results",
  "",
  reports.length
    ? "| Page | Performance | Accessibility | Best Practices | SEO |\n|-------|-------------|---------------|----------------|-----|\n" + reports.join("\n")
    : "No Lighthouse reports were produced. Check the Lighthouse CI logs for collection errors.",
  "",
].join("\n");

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
} else {
  process.stdout.write(summary);
}
