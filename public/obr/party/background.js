/* Table Tools: background script. Owlbear Rodeo loads it in EVERY client
 * in the room (GM and players), popover open or not.
 *
 * GM clients:
 *   - VISION PREVIEW: when the GM turns it on (popover or right-click "See what
 *     they see"), draws a local, GM-only blackout over everything the chosen
 *     token (or the whole party) can't see, using Dynamic Fog's walls, doors and
 *     lights (see vision.js). Local items never reach other players.
 *   - STAGE BADGE: marks the action icon while the current scene is hidden
 *     from players.
 * Player clients:
 *   - STAGE CURTAIN: while the scene is hidden, covers the player's screen with
 *     a full-screen modal plus a local blackout under it (in case the modal
 *     gets closed), until the GM clicks Make live.
 *
 * State lives where each part needs it:
 *   player metadata  NS/vision  { mode: "off"|"token"|"party", tokenId, opacity }  (GM's own)
 *   room metadata    NS/stage   { auto: bool, message: string }
 *   scene metadata   NS/stage   "staged" | "live"
 */
(function () {
  "use strict";

  var OBR = window.OBR;
  var V = window.TTVision;
  var NS = "com.dungeoncrawlerscompanion.party";
  var VISION_KEY = NS + "/vision";
  var STAGE_KEY = NS + "/stage";
  var OVERLAY_ID = NS + "/vision-overlay";
  var COVER_ID = NS + "/curtain-cover";
  var CURTAIN_MODAL = NS + "/curtain";
  var MENU_ID = NS + "/see";

  var role = "PLAYER";
  var sceneReady = false;
  var vision = { mode: "off", tokenId: null, opacity: 0.92 };
  var roomStage = { auto: false, message: "" };
  var sceneStage = null;
  var covered = false;
  var badged = null;
  var unsubItems = null;

  function isGM() { return role === "GM"; }

  // A scene is hidden if the GM hid it, or if "hide new scenes" is on and
  // the GM hasn't made this one live yet.
  function hidden() {
    return sceneStage === "staged" || (!!roomStage.auto && sceneStage !== "live");
  }

  function baseItem(id, name, layer) {
    return {
      id: id,
      type: "PATH",
      name: name,
      visible: true,
      locked: true,
      createdUserId: OBR.player.id,
      zIndex: 9e12,
      lastModified: new Date().toISOString(),
      lastModifiedUserId: OBR.player.id,
      position: { x: 0, y: 0 },
      rotation: 0,
      scale: { x: 1, y: 1 },
      layer: layer,
      metadata: {},
      disableHit: true,
      disableAutoZIndex: true,
      fillRule: "evenodd",
      style: { fillColor: "#000000", fillOpacity: 1, strokeColor: "#000000", strokeOpacity: 0, strokeWidth: 0, strokeDash: [] },
      commands: [],
    };
  }

  async function localExists(id) {
    var found = await OBR.scene.local.getItems([id]);
    return found.length > 0;
  }

  // ------------------------------------------------------- vision preview --

  var visionTimer = null;
  var visionBusy = false;
  var visionAgain = false;

  function scheduleVision() {
    clearTimeout(visionTimer);
    visionTimer = setTimeout(drawVision, 120);
  }

  async function clearVision() {
    if (!sceneReady) return;
    if (await localExists(OVERLAY_ID)) await OBR.scene.local.deleteItems([OVERLAY_ID]);
  }

  async function drawVision() {
    if (visionBusy) { visionAgain = true; return; }
    visionBusy = true;
    try {
      if (!isGM() || !sceneReady || vision.mode === "off") { await clearVision(); return; }
      var items = await OBR.scene.items.getItems();
      if (vision.mode === "token" && !items.some(function (i) { return i.id === vision.tokenId; })) {
        // The token left the scene; the preview goes with it.
        await setVision({ mode: "off", tokenId: null });
        await clearVision();
        return;
      }
      var result = V.compute(items, { mode: vision.mode, tokenId: vision.tokenId });
      var cmds = V.overlayCommands(result.visible);
      var opacity = Math.max(0.3, Math.min(1, Number(vision.opacity) || 0.92));
      if (await localExists(OVERLAY_ID)) {
        await OBR.scene.local.updateItems([OVERLAY_ID], function (d) {
          d[0].commands = cmds;
          d[0].style.fillOpacity = opacity;
        });
      } else {
        var it = baseItem(OVERLAY_ID, "Vision preview", "POINTER");
        it.commands = cmds;
        it.style.fillOpacity = opacity;
        await OBR.scene.local.addItems([it]);
      }
    } catch (e) {
      console.error("[Table Tools] vision preview", e);
    } finally {
      visionBusy = false;
      if (visionAgain) { visionAgain = false; scheduleVision(); }
    }
  }

  async function setVision(next) {
    var cur = Object.assign({}, vision, next);
    var patch = {};
    patch[VISION_KEY] = cur;
    await OBR.player.setMetadata(patch);
  }

  // --------------------------------------------------------------- curtain --

  async function applyStage() {
    if (isGM()) {
      if (covered) await uncover();
      var want = sceneReady && hidden() ? "PREP" : "";
      if (want !== badged) {
        badged = want;
        try {
          await OBR.action.setBadgeText(want || undefined);
          if (want) await OBR.action.setBadgeBackgroundColor("#b03030");
        } catch (e) { /* older hosts */ }
      }
      return;
    }
    // Players: cover during a scene switch too, when auto-hide is on, so a
    // new scene never flashes up before its stage state has loaded.
    var shouldCover = sceneReady ? hidden() : !!roomStage.auto;
    if (shouldCover) await cover();
    else await uncover();
  }

  async function cover() {
    if (!covered) {
      covered = true;
      try {
        await OBR.modal.open({ id: CURTAIN_MODAL, url: "/obr/party/curtain", fullScreen: true, hidePaper: true });
      } catch (e) { console.error("[Table Tools] curtain", e); }
    }
    // Belt and braces: a local blackout over the map, in case the modal is
    // dismissed. Re-added on every scene, since local items don't carry over.
    if (sceneReady && !(await localExists(COVER_ID))) {
      var it = baseItem(COVER_ID, "Curtain", "POPOVER");
      var E = 200000;
      it.disableHit = false; // swallow clicks on the map
      it.commands = [[0, -E, -E], [1, E, -E], [1, E, E], [1, -E, E], [5]];
      await OBR.scene.local.addItems([it]);
    }
  }

  async function uncover() {
    if (covered) {
      covered = false;
      try { await OBR.modal.close(CURTAIN_MODAL); } catch (e) { /* already closed */ }
    }
    if (sceneReady && (await localExists(COVER_ID))) await OBR.scene.local.deleteItems([COVER_ID]);
  }

  // ------------------------------------------------------------------ wire --

  async function onSceneReady(ready) {
    sceneReady = ready;
    if (unsubItems) { unsubItems(); unsubItems = null; }
    if (ready) {
      var meta = await OBR.scene.getMetadata();
      sceneStage = meta[STAGE_KEY] || null;
      if (isGM()) {
        unsubItems = OBR.scene.items.onChange(function () { if (vision.mode !== "off") scheduleVision(); });
        if (hidden()) {
          OBR.notification.show("Players can't see this scene yet. Open Table Tools → Stage and click Make live.", "WARNING").catch(function () {});
        }
      }
    } else {
      sceneStage = null;
    }
    await applyStage();
    if (isGM()) scheduleVision();
  }

  function readVision(meta) {
    var v = meta && meta[VISION_KEY];
    return v && typeof v === "object" ? v : { mode: "off", tokenId: null, opacity: 0.92 };
  }

  OBR.onReady(async function () {
    role = await OBR.player.getRole();
    vision = readVision(await OBR.player.getMetadata());
    var rm = await OBR.room.getMetadata();
    roomStage = rm[STAGE_KEY] || { auto: false, message: "" };

    OBR.contextMenu.create({
      id: MENU_ID,
      icons: [{
        icon: "/obr/party/eye.svg",
        label: "See what they see",
        filter: { roles: ["GM"], max: 1, every: [{ key: "layer", value: "CHARACTER" }] },
      }],
      onClick: function (context) {
        var id = context.items[0] && context.items[0].id;
        if (!id) return;
        // Same token again turns it off, so the menu works as a toggle.
        if (vision.mode === "token" && vision.tokenId === id) setVision({ mode: "off", tokenId: null });
        else setVision({ mode: "token", tokenId: id });
      },
    });

    OBR.player.onChange(function (p) {
      var roleChanged = p.role !== role;
      role = p.role;
      var next = readVision(p.metadata);
      var changed = JSON.stringify(next) !== JSON.stringify(vision);
      vision = next;
      if (changed || roleChanged) scheduleVision();
      if (roleChanged) applyStage();
    });

    OBR.room.onMetadataChange(function (m) {
      roomStage = m[STAGE_KEY] || { auto: false, message: "" };
      applyStage();
    });

    OBR.scene.onMetadataChange(function (m) {
      sceneStage = m[STAGE_KEY] || null;
      applyStage();
    });

    OBR.scene.onReadyChange(onSceneReady);
    await onSceneReady(await OBR.scene.isReady());
  });
})();
