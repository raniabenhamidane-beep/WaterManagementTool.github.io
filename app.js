/* Sika Water Action Tool – app logic */
(function () {
  "use strict";

  const MEASURES = window.MEASURES || [];
  const I18N = window.I18N;
  const STORE_KEY = "sika-water-tool-v1";

  const OPTIONS = {
    production: ["admixture", "mortar", "adhesive", "membrane", "coating"],
    uses: ["product", "cleaning", "cooling", "sanitary", "garden"],
    level: ["site_ops", "site_invest", "partner", "community", "group"],
    type: ["reduce", "reuse", "monitor", "nature", "strategy"]
  };
  const TYPE_COLOR = { reduce: "#D8282F", reuse: "#1E6BB8", monitor: "#F5B325", nature: "#2F7D4F", strategy: "#4A5560" };
  const QUADS = ["quick", "strategic", "secondary", "deprio"];

  /* ---------- State (saved in this browser) ---------- */
  const defaults = () => ({
    lang: guessLang(),
    filters: {
      production: [...OPTIONS.production],
      uses: [...OPTIONS.uses],
      level: [...OPTIONS.level],
      type: [...OPTIONS.type]
    },
    done: {}
  });
  let state = load();

  function guessLang() {
    const n = (navigator.language || "en").slice(0, 2);
    return I18N[n] ? n : "en";
  }
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return defaults();
      const s = JSON.parse(raw);
      const d = defaults();
      return {
        lang: I18N[s.lang] ? s.lang : d.lang,
        filters: Object.assign(d.filters, s.filters || {}),
        done: s.done || {}
      };
    } catch (e) { return defaults(); }
  }
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* storage unavailable: keep working in memory */ }
  }

  /* ---------- Text ---------- */
  function t(key, vars) {
    let s = (I18N[state.lang] && I18N[state.lang][key]);
    if (s === undefined) s = I18N.en[key];
    if (s === undefined) return key;
    if (vars) Object.keys(vars).forEach(k => { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }
  function applyText() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    document.title = "Sika – " + t("appTitle");
  }

  /* ---------- Shapes: one shape per level of action ---------- */
  const SHAPES = {
    site_ops: '<circle class="s-fill" cx="16" cy="16" r="14"/>',
    site_invest: '<rect class="s-fill" x="2.5" y="2.5" width="27" height="27" rx="4"/>',
    partner: '<path class="s-fill" d="M16 1.5 L31 29 H1 Z" stroke-linejoin="round"/>',
    community: '<path class="s-fill" d="M16 0.5 L31.5 16 L16 31.5 L0.5 16 Z"/>',
    group: '<polygon class="s-fill" points="16,1 29.5,8.75 29.5,23.25 16,31 2.5,23.25 2.5,8.75"/>'
  };
  function shapeSvg(level, color, label, cls) {
    const textY = level === "partner" ? 23 : 20;
    const textColor = color === TYPE_COLOR.monitor ? "#1D1D1B" : "#FFFFFF";
    const body = SHAPES[level].replace('class="s-fill"', 'class="s-fill" fill="' + color + '"');
    const text = label ? '<text x="16" y="' + textY + '" text-anchor="middle" fill="' + textColor + '">' + esc(label) + "</text>" : "";
    return '<svg class="' + (cls || "") + '" viewBox="0 0 32 32" aria-hidden="true" focusable="false">' + body + text + "</svg>";
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  /* ---------- Filters ---------- */
  function buildFilters() {
    chipGroup("f-production", "production", v => '<span>' + esc(t("prod_" + v)) + "</span>");
    chipGroup("f-uses", "uses", v => '<span>' + esc(t("use_" + v)) + "</span>");
    chipGroup("f-level", "level", v => shapeSvg(v, "#1D1D1B", "", "shape") + "<span>" + esc(t("lvl_" + v)) + "</span>");
    chipGroup("f-type", "type", v => '<span class="dot" style="background:' + TYPE_COLOR[v] + '"></span><span>' + esc(t("type_" + v)) + "</span>");
  }
  function chipGroup(containerId, key, inner) {
    const box = document.getElementById(containerId);
    box.innerHTML = "";
    OPTIONS[key].forEach(v => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.setAttribute("aria-pressed", String(state.filters[key].includes(v)));
      b.innerHTML = inner(v);
      b.addEventListener("click", () => {
        const list = state.filters[key];
        const i = list.indexOf(v);
        if (i >= 0) list.splice(i, 1); else list.push(v);
        b.setAttribute("aria-pressed", String(i < 0));
        save();
        render();
      });
      box.appendChild(b);
    });
  }

  function matches(m) {
    const f = state.filters;
    const prodOk = m.production.includes("all") || m.production.some(p => f.production.includes(p));
    const useOk = m.uses.includes("all") || m.uses.some(u => f.uses.includes(u));
    return prodOk && useOk && f.level.includes(m.level) && f.type.includes(m.type);
  }
  function quadrant(m) {
    const easy = m.effort <= 5, big = m.impact >= 6;
    if (big && easy) return "quick";
    if (big) return "strategic";
    if (easy) return "secondary";
    return "deprio";
  }

  /* ---------- Matrix ---------- */
  const markerEls = {};
  function buildMarkers() {
    const box = document.getElementById("markers");
    MEASURES.forEach(m => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "marker out";
      b.dataset.id = m.id;
      b.style.left = ((m.effort - 0.5) / 10 * 100) + "%";   // effort axis: 0.5–10.5, split at 5.5
      b.style.top = ((1 - (m.impact - 1) / 9) * 100) + "%";  // impact axis: 1–10, split at 5.5
      b.innerHTML = shapeSvg(m.level, TYPE_COLOR[m.type], m.id);
      b.addEventListener("click", () => openDrawer(m, b));
      b.addEventListener("mouseenter", () => showTip(m, b));
      b.addEventListener("focus", () => showTip(m, b));
      b.addEventListener("mouseleave", hideTip);
      b.addEventListener("blur", hideTip);
      box.appendChild(b);
      markerEls[m.id] = b;
    });
  }
  function showTip(m, el) {
    const tip = document.getElementById("tip");
    tip.textContent = m.id + ". " + m.title;
    tip.style.left = "calc(" + el.style.left + " + " + (el.style.getPropertyValue("--dx") || "0px") + ")";
    tip.style.top = el.style.top;
    tip.classList.add("show");
  }
  function hideTip() { document.getElementById("tip").classList.remove("show"); }

  /* ---------- Render ---------- */
  function visibleMeasures() {
    return MEASURES.filter(m => !state.done[m.id] && matches(m));
  }

  function render() {
    hideTip();
    const vis = visibleMeasures();
    const visIds = new Set(vis.map(m => m.id));

    // Spread markers that share the same position so they never overlap.
    const groups = {};
    vis.forEach(m => { const k = m.effort + "-" + m.impact; (groups[k] = groups[k] || []).push(m.id); });
    const spacing = window.matchMedia("(max-width: 640px)").matches ? 24 : 32;
    MEASURES.forEach(m => {
      const el = markerEls[m.id];
      if (visIds.has(m.id)) {
        const g = groups[m.effort + "-" + m.impact];
        const i = g.indexOf(m.id);
        el.style.setProperty("--dx", ((i - (g.length - 1) / 2) * spacing) + "px");
        el.classList.remove("out");
        el.tabIndex = 0;
        el.setAttribute("aria-label", m.id + ". " + m.title + " – " + t("q_" + quadrant(m)));
      } else {
        el.classList.add("out");
        el.tabIndex = -1;
      }
    });

    document.getElementById("count").textContent = vis.length === 1 ? t("countOne") : t("count", { n: vis.length });
    const empty = document.getElementById("empty");
    empty.hidden = vis.length > 0;
    empty.textContent = t("empty");

    renderLists(vis);
    renderDone();
  }

  function renderLists(vis) {
    const box = document.getElementById("lists");
    box.innerHTML = "";
    QUADS.forEach(q => {
      const items = vis.filter(m => quadrant(m) === q)
        .sort((a, b) => (b.impact - b.effort) - (a.impact - a.effort));
      if (!items.length) return;
      const sec = document.createElement("section");
      sec.className = "qlist";
      sec.innerHTML = "<h3>" + esc(t("q_" + q)) + " <small>" + esc(t("q_" + q + "_d")) + "</small></h3>";
      const ul = document.createElement("ul");
      items.forEach(m => {
        const li = document.createElement("li");
        const b = document.createElement("button");
        b.type = "button";
        b.className = "row";
        b.innerHTML = shapeSvg(m.level, TYPE_COLOR[m.type], m.id) +
          '<span class="row-title">' + esc(m.title) +
          '<span class="row-meta">' + esc(t("lvl_" + m.level)) + ", " + esc(t("type_" + m.type).toLowerCase()) + "</span></span>" +
          '<span class="row-cost">' + esc(m.horizon) + "</span>";
        b.addEventListener("click", () => openDrawer(m, b));
        li.appendChild(b);
        ul.appendChild(li);
      });
      sec.appendChild(ul);
      box.appendChild(sec);
    });
  }

  function renderDone() {
    const ids = Object.keys(state.done).filter(id => MEASURES.some(m => m.id === id));
    document.getElementById("doneCount").textContent = ids.length;
    const ul = document.getElementById("doneList");
    ul.innerHTML = "";
    if (!ids.length) {
      ul.innerHTML = '<li class="done-empty" style="background:none;padding:0">' + esc(t("doneEmpty")) + "</li>";
      return;
    }
    ids.sort((a, b) => state.done[b].localeCompare(state.done[a])).forEach(id => {
      const m = MEASURES.find(x => x.id === id);
      const li = document.createElement("li");
      li.innerHTML = "<span>" + esc(m.id + ". " + m.title) + '</span><span class="d-date">' +
        esc(t("doneSince", { d: formatDate(state.done[id]) })) + "</span>";
      const b = document.createElement("button");
      b.type = "button";
      b.textContent = t("putBack");
      b.addEventListener("click", () => setDone(id, false));
      li.appendChild(b);
      ul.appendChild(li);
    });
  }
  function formatDate(iso) {
    try { return new Date(iso).toLocaleDateString(state.lang, { day: "numeric", month: "short", year: "numeric" }); }
    catch (e) { return iso.slice(0, 10); }
  }

  /* ---------- Already in place ---------- */
  let lastDone = null, toastTimer = null;
  function setDone(id, on) {
    if (on) state.done[id] = new Date().toISOString();
    else delete state.done[id];
    save();
    render();
    if (on) {
      const c = document.getElementById("doneCount");
      c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump");
      setTimeout(() => c.classList.remove("bump"), 400);
      lastDone = id;
      toast(t("markedDone"));
    }
  }
  function toast(text) {
    const el = document.getElementById("toast");
    document.getElementById("toastText").textContent = text;
    el.hidden = false;
    requestAnimationFrame(() => el.classList.add("show"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 6000);
  }
  function hideToast() {
    const el = document.getElementById("toast");
    el.classList.remove("show");
    setTimeout(() => { el.hidden = true; }, 300);
  }

  /* ---------- Drawer ---------- */
  let openMeasure = null, returnFocus = null;
  function openDrawer(m, from) {
    openMeasure = m;
    returnFocus = from || null;
    hideTip();
    const tags = document.getElementById("dTags");
    tags.innerHTML =
      '<span class="tag"><span class="dot" style="width:12px;height:12px;border-radius:50%;background:' + TYPE_COLOR[m.type] + '"></span>' + esc(t("type_" + m.type)) + "</span>" +
      '<span class="tag">' + shapeSvg(m.level, "#1D1D1B", "") + esc(t("lvl_" + m.level)) + "</span>" +
      '<span class="tag">' + esc(t("q_" + quadrant(m))) + "</span>";

    const meter = n => '<span class="meter">' + Array.from({ length: 10 }, (_, i) => "<i" + (i < n ? ' class="on"' : "") + "></i>").join("") + "</span>";
    const list = (arr, ordered) => arr && arr.length ? "<" + (ordered ? "ol" : "ul") + ">" + arr.map(x => "<li>" + esc(x) + "</li>").join("") + "</" + (ordered ? "ol" : "ul") + ">" : "";
    const ex = arr => '<ul class="ex">' + arr.map(x => "<li><b>" + esc(x.site || x.company) + "</b>" + esc(x.text) + "</li>").join("") + "</ul>";

    let html =
      '<p class="d-id">' + esc(t("measure", { id: m.id })) + "</p>" +
      '<h2 id="dTitle">' + esc(m.title) + "</h2>" +
      '<p class="d-summary">' + esc(m.summary) + "</p>" +
      '<dl class="d-kpis">' +
        "<div><dt>" + esc(t("horizon")) + "</dt><dd>" + esc(m.horizon) + "</dd></div>" +
        "<div><dt>" + esc(t("cost")) + "</dt><dd>" + esc(t("cost_" + m.cost)) + "</dd></div>" +
        "<div><dt>" + esc(t("effortLbl")) + "</dt><dd>" + meter(m.effort) + "</dd></div>" +
        "<div><dt>" + esc(t("impactLbl")) + "</dt><dd>" + meter(m.impact) + "</dd></div>" +
      "</dl>";
    if (m.checkFirst && m.checkFirst.length) html += '<div class="d-sec"><h3>' + esc(t("checkFirst")) + "</h3>" + list(m.checkFirst) + "</div>";
    if (m.steps && m.steps.length) html += '<div class="d-sec"><h3>' + esc(t("steps")) + "</h3>" + list(m.steps, true) + "</div>";
    html += '<div class="d-sec"><h3>' + esc(t("sikaSites")) + "</h3>" +
      (m.sika && m.sika.length ? '<p class="sub">' + esc(t("sikaSitesHint")) + "</p>" + ex(m.sika) : '<p class="sub">' + esc(t("noSika")) + "</p>") + "</div>";
    if (m.others && m.others.length) html += '<div class="d-sec"><h3>' + esc(t("others")) + "</h3>" + ex(m.others) + "</div>";
    if (m.note) html += '<div class="d-note"><strong>' + esc(t("note")) + "</strong>" + esc(m.note) + "</div>";

    document.getElementById("dBody").innerHTML = html;
    document.getElementById("dBody").scrollTop = 0;

    const drawer = document.getElementById("drawer");
    const bd = document.getElementById("backdrop");
    drawer.hidden = false; bd.hidden = false;
    requestAnimationFrame(() => { drawer.classList.add("open"); bd.classList.add("open"); });
    document.getElementById("dClose").focus();
  }
  function closeDrawer() {
    const drawer = document.getElementById("drawer");
    const bd = document.getElementById("backdrop");
    drawer.classList.remove("open"); bd.classList.remove("open");
    setTimeout(() => { drawer.hidden = true; bd.hidden = true; }, 350);
    if (returnFocus && document.body.contains(returnFocus) && !returnFocus.classList.contains("out")) returnFocus.focus();
    openMeasure = null;
  }

  /* ---------- Print ---------- */
  function fillPrint() {
    const vis = visibleMeasures();
    let html = "";
    QUADS.forEach(q => {
      const items = vis.filter(m => quadrant(m) === q);
      if (!items.length) return;
      html += "<h2>" + esc(t("q_" + q)) + "</h2>";
      items.forEach(m => {
        html += "<article><h3>" + esc(m.id + ". " + m.title) + "</h3><p>" + esc(m.summary) + "</p><p>" +
          esc(t("horizon")) + ": " + esc(m.horizon) + ". " + esc(t("cost")) + ": " + esc(t("cost_" + m.cost)) + ".</p>" +
          (m.steps ? "<ol>" + m.steps.map(s => "<li>" + esc(s) + "</li>").join("") + "</ol>" : "") + "</article>";
      });
    });
    document.getElementById("printArea").innerHTML = html;
  }

  /* ---------- Language ---------- */
  function buildLang() {
    const sel = document.getElementById("langSelect");
    sel.innerHTML = window.LANGS.map(l => '<option value="' + l.code + '">' + esc(l.name) + "</option>").join("");
    sel.value = state.lang;
    sel.addEventListener("change", () => {
      state.lang = sel.value;
      save();
      applyText();
      buildFilters();
      render();
      if (openMeasure) openDrawer(openMeasure, returnFocus);
    });
  }

  /* ---------- Init ---------- */
  function init() {
    buildLang();
    applyText();
    buildFilters();
    buildMarkers();

    // Mobile: start with the site panel collapsed once the visitor has used the tool before.
    if (window.matchMedia("(max-width: 980px)").matches && safeHas()) {
      document.getElementById("sitePanel").open = false;
    }
    // Desktop: the panel is always open.
    document.querySelector("#sitePanel > summary").addEventListener("click", e => {
      if (!window.matchMedia("(max-width: 980px)").matches) e.preventDefault();
    });

    document.getElementById("resetBtn").addEventListener("click", () => {
      state.filters = defaults().filters;
      save(); buildFilters(); render();
    });
    document.getElementById("printBtn").addEventListener("click", () => { fillPrint(); window.print(); });
    window.addEventListener("beforeprint", fillPrint);

    document.getElementById("dClose").addEventListener("click", closeDrawer);
    document.getElementById("backdrop").addEventListener("click", closeDrawer);
    document.addEventListener("keydown", e => { if (e.key === "Escape" && openMeasure) closeDrawer(); });
    document.getElementById("dDone").addEventListener("click", () => {
      if (!openMeasure) return;
      const id = openMeasure.id;
      closeDrawer();
      setTimeout(() => setDone(id, true), 120);
    });
    document.getElementById("toastUndo").addEventListener("click", () => {
      if (lastDone) setDone(lastDone, false);
      lastDone = null;
      hideToast();
    });

    let resizeTimer;
    window.addEventListener("resize", () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(render, 150); });

    // First render after layout so markers grow into place once.
    requestAnimationFrame(() => requestAnimationFrame(render));
  }
  function safeHas() {
    try { return !!localStorage.getItem(STORE_KEY); } catch (e) { return false; }
  }

  init();
})();
