/* ============================
   Types
============================ */

type ThesysNode = {
  component: string;
  props?: any;
};

type RendererProps = {
  node: ThesysNode;
};

/* ============================
   Main Renderer
============================ */

export function ThesysRenderer({ node }: RendererProps) {
  if (!node) return null;

  const { component, props = {} } = node;

  switch (component) {
    case "Card":
      return <C1Card {...props} />;

    case "Header":
      return <C1Header {...props} />;

    case "InlineHeader":
      return <C1InlineHeader {...props} />;

    case "TextContent":
      return <C1TextContent {...props} />;

    case "CalloutV2":
      return <C1CalloutV2 {...props} />;

    case "MiniCardBlock":
      return <C1MiniCardBlock {...props} />;

    case "MiniCard":
      return <C1MiniCard {...props} />;

    case "DataTile":
      return <C1DataTile {...props} />;

    case "List":
      return <C1List {...props} />;

    case "TagBlock":
      return <C1TagBlock {...props} />;

    case "ButtonGroup":
      return <C1ButtonGroup {...props} />;

    case "Button":
      return <C1Button {...props} />;

    case "Stats":
      return <C1Stats {...props} />;

    case "Steps":
      return <C1Steps {...props} />;

    case "Table":
      return <C1Table {...props} />;

    case "Icon":
      return null; // icons optional

    default:
      return null;
  }
}

/* ============================
   Helpers
============================ */

function renderChildren(children?: ThesysNode[]) {
  if (!Array.isArray(children)) return null;
  return children.map((child, i) => (
    <ThesysRenderer key={i} node={child} />
  ));
}

/* ============================
   Components
============================ */

function C1Card({ children }: any) {
  return (
    <div className="bg-white rounded-xl border border-border/60 p-4 shadow-sm space-y-4">
      {renderChildren(children)}
    </div>
  );
}

/* ---------- Headers ---------- */

function C1Header({ title, subtitle }: any) {
  return (
    <div className="space-y-0.5">
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

function C1InlineHeader({ heading, description }: any) {
  return (
    <div className="space-y-0.5 pt-2">
      <h3 className="text-sm font-semibold text-foreground">{heading}</h3>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

/* ---------- Text ---------- */

function C1TextContent({ textMarkdown }: any) {
  const html = textMarkdown
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return (
    <div
      className="text-sm text-foreground/90 leading-relaxed [&_img]:max-w-[24px] [&_img]:inline-block [&_img]:align-middle [&_svg]:max-w-[24px] [&_svg]:inline-block [&_svg]:align-middle"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/* ---------- Callouts ---------- */

type CalloutVariant = "info" | "success" | "warning" | "danger";

type CalloutProps = {
  variant?: CalloutVariant;
  title: string;
  description: string;
};

const CALLOUT_STYLES: Record<CalloutVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800",
  success: "border-green-200 bg-green-50 text-green-800",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  danger: "border-red-200 bg-red-50 text-red-800",
};


function C1CalloutV2({
  variant = "info",
  title,
  description,
}: CalloutProps) {
  return (
    <div
      className={`border-l-4 rounded-xl p-3 space-y-1 ${CALLOUT_STYLES[variant]}`}
    >
      <div className="space-y-0.5">
        <p className="text-sm font-semibold leading-tight">
          {title}
        </p>
        <p className="text-sm opacity-90 leading-snug">
          {description}
        </p>
      </div>
    </div>
  );
}

/* ---------- Mini Cards ---------- */

function C1MiniCardBlock({ children }: any) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {renderChildren(children)}
    </div>
  );
}

function C1MiniCard({ lhs }: any) {
  return (
    <div className="rounded-xl border bg-white p-3">
      {lhs && <ThesysRenderer node={lhs} />}
    </div>
  );
}

function C1DataTile({ amount, description }: any) {
  return (
    <div className="space-y-0.5">
      <p className="text-xl font-semibold text-foreground">{amount}</p>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}

/* ---------- Lists ---------- */

function C1List({ items }: any) {
  return (
    <ul className="space-y-3">
      {items?.map((item: any, i: number) => (
        <li key={i} className="space-y-0.5">
          <p className="text-sm font-medium text-foreground">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.subtitle}</p>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Tags ---------- */

function C1TagBlock({ children }: any) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {children?.map((tag: any, i: number) => (
        <C1Tag key={i} {...tag} />
      ))}
    </div>
  );
}

function C1Tag({ text, variant }: any) {
  const styles =
    variant === "danger"
      ? "bg-red-100 text-red-700"
      : variant === "warning"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-gray-100 text-gray-700";

  return (
    <span className={`text-xs px-3 py-1 rounded-full ${styles}`}>
      {text}
    </span>
  );
}

/* ---------- Buttons ---------- */

function C1ButtonGroup({ children }: any) {
  return (
    <div className="flex gap-2 flex-wrap pt-2">
      {renderChildren(children)}
    </div>
  );
}

function C1Button({ children, name }: any) {
  function handleClick() {
    window.dispatchEvent(
      new CustomEvent("C1_ACTION", { detail: name })
    );
  }

  return (
    <button
      onClick={handleClick}
      className="
        px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground 
        rounded-lg text-xs font-medium transition-colors
        whitespace-nowrap border border-border/50
      "
    >
      {children}
    </button>
  );
}

/* ---------- Stats ---------- */

function C1Stats({ number, label }: any) {
  return (
    <div className="space-y-0.5">
      <p className="text-lg font-semibold text-foreground">{number}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ---------- Steps ---------- */

function C1Steps({ items }: any) {
  return (
    <ol className="space-y-3 pl-4 list-decimal marker:text-muted-foreground/60">
      {items?.map((step: any, i: number) => (
        <li key={i} className="space-y-0.5 pl-1">
          <p className="text-sm font-medium text-foreground">{step.title}</p>
          <p className="text-xs text-muted-foreground">{step.details}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Table ---------- */

function C1Table({ tableHeader, tableBody }: any) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/60">
      <table className="w-full text-xs">
        <thead className="bg-muted/50 border-b border-border/60">
          <tr>
            {tableHeader?.map((h: string, i: number) => (
              <th key={i} className="px-3 py-2 text-left font-medium text-muted-foreground uppercase tracking-wider text-[10px]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {tableBody?.map((row: string[], i: number) => (
            <tr key={i} className="hover:bg-muted/20 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-2 text-foreground/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
