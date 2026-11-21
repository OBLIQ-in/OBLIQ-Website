import globalsCss from "../app/globals.css?raw";

/**
 * Reads the design tokens straight out of globals.css, so this page can't
 * drift from the stylesheet: `:root` custom properties grouped by their
 * `/* ── Group ── *\/` comments, plus the Tailwind utilities `@theme` maps them to.
 */

interface Token {
  name: string;
  value: string;
  note?: string;
}

interface TokenGroup {
  title: string;
  tokens: Token[];
}

function block(css: string, selector: string) {
  const start = css.indexOf(`${selector} {`);
  if (start === -1) return "";
  const open = css.indexOf("{", start);
  return css.slice(open + 1, css.indexOf("\n}", open));
}

function parseRoot(css: string): TokenGroup[] {
  const groups: TokenGroup[] = [];
  for (const raw of block(css, ":root").split("\n")) {
    const line = raw.trim();
    const heading = line.match(/^\/\*\s*──\s*(.+?)\s*──\s*\*\/$/);
    if (heading) {
      groups.push({ title: heading[1]!, tokens: [] });
      continue;
    }
    const decl = line.match(/^(--[\w-]+):\s*(.+?);\s*(?:\/\*\s*(.+?)\s*\*\/)?$/);
    if (decl) {
      if (groups.length === 0) groups.push({ title: "Tokens", tokens: [] });
      groups.at(-1)!.tokens.push({ name: decl[1]!, value: decl[2]!, note: decl[3] });
    }
  }
  return groups;
}

/** `--color-cream: var(--cream)` in `@theme` → the token is usable as `bg-cream`, `text-cream`… */
function parseThemeUtilities(css: string) {
  const map = new Map<string, string>();
  for (const [, name, token] of block(css, "@theme inline").matchAll(/--([\w-]+):\s*var\((--[\w-]+)\)/g)) {
    if (name!.startsWith("color-")) map.set(token!, name!.slice("color-".length));
    else if (name!.startsWith("font-")) map.set(token!, name!);
  }
  return map;
}

const isPaint = (value: string) => /^(#|rgb|hsl|linear-gradient|radial-gradient)/.test(value);

function Preview({ token }: { token: Token }) {
  const box = "h-10 w-16 shrink-0 rounded-md border border-[var(--border)]";
  if (isPaint(token.value)) return <span className={box} style={{ background: `var(${token.name})` }} />;
  if (token.name.startsWith("--font")) {
    return <span className="w-16 shrink-0 text-2xl" style={{ fontFamily: `var(${token.name})` }}>Aa</span>;
  }
  if (token.name.startsWith("--radius")) {
    return (
      <span
        className="h-10 w-16 shrink-0 border-2 border-[var(--ink-soft)] bg-[var(--cream-2)]"
        style={{ borderRadius: `min(var(${token.name}), 20px)` }}
      />
    );
  }
  if (token.name.includes("shadow")) {
    return <span className={`${box} bg-white`} style={{ boxShadow: `var(${token.name})` }} />;
  }
  return <span className="w-16 shrink-0" />;
}

export function DesignTokens() {
  const groups = parseRoot(globalsCss);
  const utilities = parseThemeUtilities(globalsCss);

  return (
    // sb-unstyled opts out of the docs page typography so Tailwind classes apply as written
    <div className="sb-unstyled flex flex-col gap-10 font-sans">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="mb-3 text-lg font-semibold text-[var(--ink)]">{group.title}</h2>
          <ul className="flex flex-col divide-y divide-[var(--border)] rounded-xl border border-[var(--border)] bg-white">
            {group.tokens.map((token) => {
              const utility = utilities.get(token.name);
              return (
                <li key={token.name} className="flex items-center gap-4 px-4 py-3">
                  <Preview token={token} />
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <code className="text-sm font-semibold text-[var(--ink)]">{token.name}</code>
                    <code className="break-all text-xs text-[var(--ink-soft)]">{token.value}</code>
                    {token.note && <span className="text-xs text-[var(--ink-muted)]">{token.note}</span>}
                  </div>
                  {utility && (
                    <code className="ml-auto shrink-0 rounded-full bg-[var(--pill)] px-2.5 py-1 text-xs text-[var(--ink-soft)]">
                      {utility.startsWith("font-") ? utility : `bg-${utility} · text-${utility}`}
                    </code>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
