import { embedHeaders } from "@/lib/vtt";

export const dynamic = "force-dynamic";

// GET /obr/party/background — Table Tools' background page. Owlbear Rodeo loads
// it invisibly in every client in the room (GM and players), so the vision
// preview and the stage curtain keep working with the popover closed. All logic
// is in /obr/party/background.js; see that file for what runs where.
const PAGE = String.raw`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Table Tools (background)</title>
<script src="/obr/sdk.js"></script>
<script src="/obr/party/polygon-clipping.min.js"></script>
<script src="/obr/party/vision.js"></script>
<script src="/obr/party/background.js"></script>
</head>
<body></body>
</html>`;

export async function GET() {
  return new Response(PAGE, {
    headers: embedHeaders({ "content-type": "text/html; charset=utf-8" }),
  });
}
