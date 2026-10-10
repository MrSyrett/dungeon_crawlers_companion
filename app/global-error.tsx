"use client";

// The last-resort boundary: an error in the ROOT layout itself takes the whole
// app down, and Next replaces everything — including <html>/<body> and the
// stylesheet the layout imports — with this file. So it can't rely on the app's
// CSS or tokens; it renders its own document with inline styles. Kept to the
// brand's dark ground and gold so it still feels like the app, not a crash.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  void error;
  const wrap: React.CSSProperties = {
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "24px",
    background: "#12100e",
    color: "#e9e2d4",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  };
  const btn: React.CSSProperties = {
    display: "inline-block",
    border: "1px solid #c9a34a",
    color: "#c9a34a",
    background: "transparent",
    borderRadius: 6,
    padding: "11px 20px",
    font: "inherit",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    textDecoration: "none",
    cursor: "pointer",
  };
  const btnMuted: React.CSSProperties = { ...btn, border: "1px solid #3a342b", color: "#8a8274" };
  return (
    <html lang="en">
      <body style={wrap}>
        <div style={{ maxWidth: 480 }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a8274" }}>
            The dice betray you
          </p>
          <h1 style={{ margin: "12px 0 0", fontSize: 28, fontWeight: 900, color: "#c9a34a" }}>
            The whole table went dark.
          </h1>
          <p style={{ margin: "16px 0 0", fontSize: 16, lineHeight: 1.5, color: "#c8c0b2" }}>
            Something broke while loading the app. Any sheet you were editing is kept in your browser,
            so your work is safe. Reload to try again.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 26 }}>
            <button type="button" onClick={() => reset()} style={btn}>
              Try again
            </button>
            <button type="button" onClick={() => window.location.reload()} style={btnMuted}>
              Reload
            </button>
            <a href="/dashboard" style={btnMuted}>
              Dashboard
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
