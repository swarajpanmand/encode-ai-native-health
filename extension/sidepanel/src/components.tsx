import { cn } from "./lib/utils";

/* -----------------------------
   Types
------------------------------ */

type BadgeProps = {
  text: string;
  tone?: "positive" | "negative" | "neutral" | "warning";
};

type SummaryHeroProps = {
  tree: any;
  mode?: "text" | "image";
};

/* -----------------------------
   Components
------------------------------ */

function Badge({ text, tone = "neutral" }: BadgeProps) {
  const styles = {
    positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
    negative: "bg-rose-50 text-rose-700 border-rose-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    neutral: "bg-slate-50 text-slate-700 border-slate-200",
  };

  return (
    <span className={cn(
      "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium border",
      styles[tone]
    )}>
      {text}
    </span>
  );
}

export function SummaryHero({ tree, mode }: SummaryHeroProps) {
  const children = tree?.props?.children ?? [];

  const header = children.find((c: any) => c.component === "Header")?.props;
  const textContent = children.find(
    (c: any) => c.component === "TextContent"
  )?.props?.textMarkdown;

  const title = header?.title ?? "Health Summary";
  const subtitle = header?.subtitle;
  const verdict = extractVerdict(textContent);

  const badges = inferBadgesFromTree(children);

  return (
    <section className="bg-white rounded-2xl border border-border/60 shadow-sm p-4 space-y-3 relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

      {/* Context hint (image only) */}
      {mode === "image" && (
        <div className="text-xs text-muted-foreground mb-1">
          Analysis based on product image
        </div>
      )}

      {/* Title block */}
      <div className="space-y-1 relative z-10">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {title}
        </h3>

        {subtitle && (
          <p className="text-xs text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>

      {/* Badges */}
      {badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {badges.map((b) => (
            <Badge key={b.text} text={b.text} tone={b.tone} />
          ))}
        </div>
      )}

      {/* Verdict (1–2 lines max, scannable) */}
      {verdict && (
        <div className="bg-muted/50 rounded-lg p-3 text-sm text-foreground/90 leading-snug">
          {verdict}
        </div>
      )}
    </section>
  );
}

/* -----------------------------
   Helpers (Infer badges from UI tree)
------------------------------ */

function inferBadgesFromTree(children: any[]): BadgeProps[] {
  const badges: BadgeProps[] = [];

  // Look for CalloutV2 or Tags in the tree to promote to top
  for (const child of children) {
    if (child.component === "CalloutV2") {
      const variant = child.props?.variant;
      const title = child.props?.title;

      if (variant === "success") {
        badges.push({ text: "Healthy Choice", tone: "positive" });
      } else if (variant === "warning" || variant === "danger") {
        // e.g. "High Sugar" if title says so
        if (title?.toLowerCase().includes("sugar")) {
          badges.push({ text: "High Sugar", tone: "negative" });
        } else if (title?.toLowerCase().includes("processed")) {
          badges.push({ text: "Processed", tone: "warning" });
        } else {
          badges.push({ text: "Caution", tone: "warning" });
        }
      }
    }

    if (child.component === "TagBlock") {
      // If there are tags, grab the first 2 important ones
      const tags = child.props?.children ?? [];
      tags.slice(0, 2).forEach((t: any) => {
        badges.push({
          text: t.text,
          tone: t.variant === "danger" ? "negative" : t.variant === "warning" ? "warning" : "neutral",
        });
      });
    }
  }

  // Dedupe by text
  const unique = new Map();
  badges.forEach((b) => unique.set(b.text, b));
  return Array.from(unique.values()).slice(0, 3);
}

/* -----------------------------
   Verdict extraction (important)
------------------------------ */
function extractVerdict(markdown?: string) {
  if (!markdown) return "";

  const clean = stripMarkdown(markdown);

  // Prefer “Bottom Line:” style summaries
  const bottomLineMatch = clean.match(/bottom line[:\-]?\s*(.*)/i);
  if (bottomLineMatch?.[1]) {
    return bottomLineMatch[1];
  }

  // Otherwise take first sentence only
  return clean.split(".").slice(0, 1).join(".") + ".";
}

/* -----------------------------
   Utils
------------------------------ */
export function stripMarkdown(text: string) {
  return text.replace(/\*\*/g, "").trim();
}
