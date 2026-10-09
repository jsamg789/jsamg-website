/* =========================================================
   JSAMG — main script (used by every page)
   Handles: shared header and footer, English/Arabic switching,
   events (upcoming/past), news, board, gallery, photo viewer.

   You normally never need to edit this file.
   Edit the files in the "data" folder instead.
   ========================================================= */
(function () {
  "use strict";

  var J = window.JSAMG;
  var SITE = J.site;
  var EVENTS = J.events || [];
  var BOARD = J.board || [];
  var NEWS = J.news || [];
  var GALLERY = J.gallery || [];
  var BOARD_PHOTO = J.boardPhoto;
  var EVENT_CATS = J.eventCategories || {};
  var NEWS_CATS = J.newsCategories || {};
  var STORAGE_KEY = "jsamg-lang";
  var PAGE = document.body.getAttribute("data-page") || "home";

  var PAGES = [
    { key: "home", file: "index.html", nav: "home" },
    { key: "about", file: "about.html", nav: "about" },
    { key: "board", file: "board.html", nav: "board" },
    { key: "events", file: "events.html", nav: "events" },
    { key: "news", file: "news.html", nav: "news" },
    { key: "gallery", file: "gallery.html", nav: "gallery" },
    { key: "membership", file: "membership.html", nav: "membership" },
    { key: "contact", file: "contact.html", nav: "contact" }
  ];
  var PAGE_TEXT_KEY = {
    home: null, about: "aboutPage", board: "boardPage", events: "eventsPage",
    news: "newsPage", gallery: "galleryPage", membership: "membershipPage", contact: "contactPage"
  };

  var lang = "en";
  var t = SITE.text.en;
  var filters = { events: "all", news: "all", gallery: "all" };

  /* ---------- small helpers ---------- */
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function storeGet() { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } }
  function storeSet(v) { try { localStorage.setItem(STORAGE_KEY, v); } catch (e) { /* ignore */ } }
  function $(id) { return document.getElementById(id); }

  /* Links to other pages carry ?lang=ar when Arabic is chosen.
     This keeps the language even if the browser blocks stored settings. */
  function href(h) {
    if (!h) return h;
    if (/^[\w-]+\.html(#.*)?$/.test(h) || h === "./") {
      if (lang === "ar") {
        var i = h.indexOf("#");
        var base = i === -1 ? h : h.slice(0, i);
        var hash = i === -1 ? "" : h.slice(i);
        return base + "?lang=ar" + hash;
      }
    }
    return h;
  }

  /* ---------- dates (Jordan's local date) ---------- */
  function todayISO() {
    try {
      var s = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Amman", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
      if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    } catch (e) { /* fall through */ }
    var n = new Date();
    return n.getFullYear() + "-" + pad(n.getMonth() + 1) + "-" + pad(n.getDate());
  }
  function dayNum(iso) {
    var p = iso.split("-");
    return Date.UTC(+p[0], +p[1] - 1, +p[2]) / 86400000;
  }
  function isPast(ev) { return todayISO() > (ev.endDate || ev.date); }
  function daysUntil(ev) { return Math.round(dayNum(ev.date) - dayNum(todayISO())); }

  var MONTHS = {
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    ar: ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"]
  };
  var DAYS = {
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    ar: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
  };
  function formatDate(iso, withDay) {
    var p = iso.split("-");
    var d = new Date(Date.UTC(+p[0], +p[1] - 1, +p[2]));
    var s = d.getUTCDate() + " " + MONTHS[lang][d.getUTCMonth()] + " " + d.getUTCFullYear();
    return withDay ? DAYS[lang][d.getUTCDay()] + (lang === "ar" ? " " : ", ") + s : s;
  }

  /* ---------- events ---------- */
  function sortedEvents(list, dir) {
    return list.slice().sort(function (a, b) { return a.date < b.date ? -dir : a.date > b.date ? dir : 0; });
  }
  function upcomingEvents() { return sortedEvents(EVENTS.filter(function (e) { return !isPast(e); }), 1); }
  function pastEvents() { return sortedEvents(EVENTS.filter(isPast), -1); }
  function pickFeatured() {
    var up = upcomingEvents();
    if (up.length) return up[0];
    return pastEvents()[0] || null;
  }

  function eventBadges(ev) {
    var E = t.event, past = isPast(ev);
    var h = '<span class="badge ' + (past ? "past" : "upcoming") + '">' + esc(past ? E.statusPast : E.statusUpcoming) + "</span>";
    if (!past) {
      var n = daysUntil(ev);
      var txt = n <= 0 ? E.today : n === 1 ? E.tomorrow : n === 2 ? E.inTwoDays : n <= 10 ? E.inDays.replace("{n}", n) : E.inManyDays.replace("{n}", n);
      h += '<span class="badge countdown">' + esc(txt) + "</span>";
    }
    (ev.categories || []).forEach(function (c) {
      if (EVENT_CATS[c]) h += '<span class="badge cat">' + esc(EVENT_CATS[c][lang]) + "</span>";
    });
    return h;
  }

  function eventMeta(ev) {
    var E = t.event, d = ev[lang];
    var items = [];
    items.push([E.dateLabel, d.dateText || formatDate(ev.date, true)]);
    if (d.timeText) items.push([E.timeLabel, d.timeText]);
    if (d.venue) items.push([E.venueLabel, d.venue]);
    return '<dl class="event-meta">' + items.map(function (i) {
      return "<div><dt>" + esc(i[0]) + "</dt><dd>" + esc(i[1]) + "</dd></div>";
    }).join("") + "</dl>";
  }

  function eventDetails(ev) {
    var E = t.event, d = ev[lang], h = "";
    if (d.description) h += '<p class="event-desc">' + esc(d.description) + "</p>";
    if (d.talkTitle) {
      h += '<div class="event-block"><span class="label">' + esc(E.occasionLabel) + (d.occasion ? " — " + esc(d.occasion) : "") + "</span>" +
        '<span class="title">&ldquo;' + esc(d.talkTitle) + "&rdquo;</span>" +
        (d.speaker ? "<p><strong>" + esc(d.speaker) + "</strong>" + (d.speakerTitle ? " · " + esc(d.speakerTitle) : "") + "</p>" : "") + "</div>";
    }
    if (d.panelTitle) {
      h += '<div class="event-block"><span class="label">' + esc(E.panelLabel) + "</span>" +
        '<span class="title">&ldquo;' + esc(d.panelTitle) + "&rdquo;</span>" +
        (d.panelDescription ? "<p>" + esc(d.panelDescription) + "</p>" : "") + "</div>";
    }
    if (d.dinner) h += '<div class="event-block"><span class="label">' + esc(E.dinnerLabel) + "</span><p>" + esc(d.dinner) + "</p></div>";
    if (d.sponsor) h += '<div class="event-block"><span class="label">' + esc(E.sponsorLabel) + "</span><p>" + esc(d.sponsor) + "</p></div>";
    return h;
  }

  function eventPhotos(ev) {
    if (!ev.photos || !ev.photos.length) return "";
    var group = "event-" + ev.id;
    registerGroup(group, ev.photos.map(function (p) {
      var src = typeof p === "string" ? p : p.src;
      return { src: src, alt: ev[lang].title, caption: ev[lang].title };
    }));
    return '<div class="event-block"><span class="label">' + esc(t.eventsPage ? t.eventsPage.photos : "") + '</span><div class="event-photos">' +
      ev.photos.map(function (p, i) {
        var src = typeof p === "string" ? p : p.src;
        return '<button type="button" class="thumb" data-lb="' + esc(group) + ":" + i + '"><img src="' + esc(src) + '" alt="' + esc(ev[lang].title) + '" loading="lazy"></button>';
      }).join("") + "</div></div>";
  }

  function posterButton(ev, size) {
    if (!ev.poster) return "";
    var group = "poster-" + ev.id;
    registerGroup(group, [{ src: ev.poster, alt: t.event.posterAlt, caption: ev[lang].title }]);
    return '<button type="button" class="zoomable-poster" data-lb="' + esc(group) + ':0" aria-label="' + esc(t.event.viewPoster) + '">' +
      '<img src="' + esc(ev.poster) + '" ' + (size || "") + ' alt="' + esc(t.event.posterAlt) + '" loading="lazy">' +
      '<span class="zoom-hint">' + esc(t.event.viewPoster) + "</span></button>";
  }

  function eventCardFull(ev) {
    var d = ev[lang], E = t.event;
    var register = ev.registrationLink && !isPast(ev)
      ? '<a class="btn btn-burgundy" href="' + esc(ev.registrationLink) + '" target="_blank" rel="noopener">' + esc(E.register) + "</a>" : "";
    return '<article class="event-card">' +
      (ev.poster ? '<div class="event-poster">' + posterButton(ev, 'width="853" height="1280"') + "</div>" : "") +
      '<div class="event-body"><div class="badges">' + eventBadges(ev) + "</div>" +
      "<h3>" + esc(d.title) + "</h3>" + eventMeta(ev) + eventDetails(ev) + eventPhotos(ev) +
      (register ? '<div class="event-actions">' + register + "</div>" : "") + "</div></article>";
  }

  function eventCardCompact(ev) {
    var d = ev[lang];
    var register = "";
    return '<article class="event-compact">' +
      (ev.poster ? '<div class="compact-poster">' + posterButton(ev, "") + "</div>" : "") +
      '<div class="compact-body"><div class="badges">' + eventBadges(ev) + "</div><h3>" + esc(d.title) + "</h3>" + eventMeta(ev) +
      '<details><summary>' + esc(t.eventsPage.showDetails) + "</summary>" + eventDetails(ev) + eventPhotos(ev) + register + "</details></div></article>";
  }

  /* ---------- filter chips ---------- */
  function chipsHTML(group, items) {
    return items.map(function (c) {
      return '<button type="button" class="chip" data-filter-group="' + group + '" data-filter="' + esc(c.key) + '" aria-pressed="' + (filters[group] === c.key ? "true" : "false") + '">' + esc(c.label) + "</button>";
    }).join("");
  }

  /* ---------- page: home ---------- */
  function renderHome() {
    $("pillars").innerHTML = t.about.pillars.map(function (p, i) {
      return '<div class="pillar"><div class="num">' + (i + 1) + "</div><h3>" + esc(p.t) + "</h3><p>" + esc(p.d) + "</p></div>";
    }).join("");

    var ev = pickFeatured();
    var heading = $("event-heading");
    var box = $("featured-event");
    $("event").hidden = !ev;
    if (ev) {
      heading.textContent = isPast(ev) ? t.event.titlePast : t.event.titleUpcoming;
      box.innerHTML = eventCardFull(ev);
    } else { heading.textContent = ""; box.innerHTML = ""; }

    // banner: show the next event only while one is upcoming
    var next = upcomingEvents()[0] || null;
    var badge = $("hero-badge"), cta = $("hero-event-cta");
    if (next) {
      badge.hidden = false;
      badge.innerHTML = '<span class="dot"></span><span>' + esc(t.hero.badge) + " — <strong>" + esc(next[lang].dateText || formatDate(next.date, true)) + "</strong></span>";
      cta.textContent = t.hero.ctaEvent; cta.href = "#event";
    } else {
      badge.hidden = true; badge.innerHTML = "";
      cta.textContent = t.hero.ctaEvents; cta.href = href("events.html");
    }

    $("home-contact").innerHTML = emailCardHTML(false) + contactExtraCards();

    renderNewsList($("news-list"), NEWS.slice().sort(newsSort).slice(0, 3));
    $("board-grid").innerHTML = BOARD.map(function (m) { return boardCard(m, false); }).join("");

    registerGroup("board", [{ src: BOARD_PHOTO.src, alt: t.board.photoAlt, caption: t.board.photoCaption }]);

    // gallery preview: the first photo of each of the first two albums
    var preview = [];
    GALLERY.slice(0, 2).forEach(function (a) {
      if (a.photos && a.photos.length) preview.push(a.photos[0]);
    });
    registerGroup("home-gallery", preview.map(function (p) {
      var cap = typeof p[lang] === "string" ? p[lang] : "";
      return { src: p.src, alt: cap, caption: cap };
    }));
    $("gallery-preview").innerHTML = preview.map(function (p, i) {
      var cap = typeof p[lang] === "string" ? p[lang] : "";
      return '<figure><button type="button" class="zoomable" data-lb="home-gallery:' + i + '" aria-label="' + esc(cap) + '">' +
        '<img src="' + esc(p.src) + '" alt="' + esc(cap) + '" loading="lazy"></button><figcaption>' + esc(cap) + "</figcaption></figure>";
    }).join("");
  }

  /* ---------- news ---------- */
  function newsSort(a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; }
  function renderNewsList(el, items) {
    el.innerHTML = items.map(function (n) {
      var d = n[lang];
      var img = n.image ? '<div class="news-img"><img src="' + esc(n.image) + '" alt="" loading="lazy"></div>' : "";
      var link = n.link ? '<a class="more" href="' + esc(href(n.link)) + '"' + (/^https?:/.test(n.link) ? ' target="_blank" rel="noopener"' : "") + ">" + esc(t.news.readMore) + "</a>" : "";
      var cat = n.category && NEWS_CATS[n.category] ? '<span class="badge cat">' + esc(NEWS_CATS[n.category][lang]) + "</span>" : "";
      return '<article class="news-card">' + img + '<div class="news-body"><div class="news-top"><span class="news-date">' + esc(formatDate(n.date)) + "</span>" + cat +
        "</div><h3>" + esc(d.title) + "</h3><p>" + esc(d.text) + "</p>" + link + "</div></article>";
    }).join("");
  }

  function renderNewsPage() {
    var cats = [];
    NEWS.forEach(function (n) { if (n.category && NEWS_CATS[n.category] && cats.indexOf(n.category) === -1) cats.push(n.category); });
    if (cats.indexOf(filters.news) === -1) filters.news = "all";
    var bar = $("news-filters");
    bar.innerHTML = cats.length > 1
      ? chipsHTML("news", [{ key: "all", label: t.newsPage.filterAll }].concat(cats.map(function (c) { return { key: c, label: NEWS_CATS[c][lang] }; })))
      : "";
    bar.hidden = cats.length < 2;
    var list = NEWS.slice().sort(newsSort).filter(function (n) { return filters.news === "all" || n.category === filters.news; });
    var el = $("news-list");
    if (!NEWS.length) { el.innerHTML = '<p class="empty">' + esc(t.newsPage.empty) + "</p>"; return; }
    if (!list.length) { el.innerHTML = '<p class="empty">' + esc(t.newsPage.noMatch) + "</p>"; return; }
    renderNewsList(el, list);
  }

  /* ---------- board ---------- */
  var AVATAR = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-4.4 0-8 2.2-8 5v1h16v-1c0-2.8-3.6-5-8-5Z"/></svg>';
  function boardCard(m, detailed) {
    var d = m[lang];
    var pic = m.photo ? '<img src="' + esc(m.photo) + '" alt="' + esc(d.name) + '" loading="lazy">' : AVATAR;
    var extra = "";
    if (d.specialty) extra += '<p class="specialty">' + esc(d.specialty) + "</p>";
    if (detailed && d.bio) extra += '<p class="bio">' + esc(d.bio) + "</p>";
    return '<article class="board-card' + (detailed ? " detailed" : "") + '"><div class="avatar">' + pic + "</div><h3>" + esc(d.name) +
      '</h3><p class="position">' + esc(d.position) + "</p>" + extra + "</article>";
  }
  function renderBoardPage() {
    $("board-grid").innerHTML = BOARD.map(function (m) { return boardCard(m, true); }).join("");
    registerGroup("board", [{ src: BOARD_PHOTO.src, alt: t.board.photoAlt, caption: t.boardPage.photoCaption }]);
  }

  /* ---------- about ---------- */
  function paras(text) {
    return String(text).split(/\n\s*\n/).map(function (p) { return "<p>" + esc(p.trim()) + "</p>"; }).join("");
  }
  function optionalBlocks(src, keys, boxId, sectionId) {
    var shown = keys.filter(function (k) { return src[k] && src[k].body && src[k].body.trim(); });
    $(boxId).innerHTML = shown.map(function (k) {
      return '<div class="info-card"><h3>' + esc(src[k].title) + "</h3>" + paras(src[k].body) + "</div>";
    }).join("");
    $(sectionId).hidden = !shown.length;
  }
  function renderAbout() {
    optionalBlocks(t.aboutPage, ["history", "mission", "vision", "objectives"], "about-blocks", "about-blocks-section");
    $("activities").innerHTML = t.aboutPage.activities.map(function (a, i) {
      return '<div class="pillar"><div class="num">' + (i + 1) + "</div><h3>" + esc(a.t) + "</h3><p>" + esc(a.d) + "</p></div>";
    }).join("");
  }
  function renderMembership() {
    optionalBlocks(t.membershipPage, ["eligibility", "benefits", "steps"], "mem-blocks", "mem-blocks-section");
  }

  /* ---------- contact ---------- */
  function emailCardHTML(onPage) {
    return '<div class="contact-card primary"><h3>' + esc(t.contact.emailLabel) + '</h3><a class="email-link" href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a>" +
      (onPage ? "<p>" + esc(t.contactPage.emailNote) + "</p>" : "") + "</div>";
  }
  function contactExtraCards() {
    var C = J.contact || {}, h = "";
    var addr = C.address && C.address[lang] ? String(C.address[lang]).trim() : "";
    if (addr) h += '<div class="contact-card"><h3>' + esc(t.contact.address) + "</h3><p>" + esc(addr) + "</p></div>";
    if (C.phone && String(C.phone).trim()) {
      h += '<div class="contact-card"><h3>' + esc(t.contact.phone) + '</h3><p><a class="tel" dir="ltr" href="tel:' + esc(String(C.phone).replace(/[^\d+]/g, "")) + '">' + esc(C.phone) + "</a></p></div>";
    }
    var soc = (C.social || []).filter(function (x) { return x && x.name && x.url; });
    if (soc.length) {
      h += '<div class="contact-card"><h3>' + esc(t.contact.social) + '</h3><ul class="social-list">' + soc.map(function (x) {
        return '<li><a href="' + esc(x.url) + '" target="_blank" rel="noopener">' + esc(x.name) + "</a></li>";
      }).join("") + "</ul></div>";
    }
    return h;
  }
  function renderContactPage() {
    var extra = contactExtraCards();
    $("contact-extra").innerHTML = extra;
    $("contact-extra").hidden = !extra;
  }

  /* ---------- events page ---------- */
  function renderEventsPage() {
    var P = t.eventsPage;
    var used = [];
    EVENTS.forEach(function (e) { (e.categories || []).forEach(function (c) { if (EVENT_CATS[c] && used.indexOf(c) === -1) used.push(c); }); });
    if (used.indexOf(filters.events) === -1) filters.events = "all";
    var bar = $("event-filters");
    bar.innerHTML = used.length > 1
      ? chipsHTML("events", [{ key: "all", label: P.filterAll }].concat(used.map(function (c) { return { key: c, label: EVENT_CATS[c][lang] }; })))
      : "";
    bar.hidden = used.length < 2;
    function match(e) { return filters.events === "all" || (e.categories || []).indexOf(filters.events) !== -1; }

    var up = upcomingEvents(), past = pastEvents();
    var upM = up.filter(match), pastM = past.filter(match);
    $("upcoming-list").innerHTML = !up.length ? '<p class="empty">' + esc(P.noUpcoming) + "</p>"
      : !upM.length ? '<p class="empty">' + esc(P.noMatch) + "</p>"
      : upM.map(eventCardFull).join("");
    $("archive").hidden = !past.length;
    $("past-list").innerHTML = !pastM.length ? '<p class="empty">' + esc(P.noMatch) + "</p>" : pastM.map(eventCardCompact).join("");
  }

  /* ---------- gallery ---------- */
  function renderGalleryPage() {
    var P = t.galleryPage;
    var albums = GALLERY.filter(function (a) { return a.photos && a.photos.length; });
    if (!albums.some(function (a) { return a.id === filters.gallery; })) filters.gallery = "all";
    var bar = $("gallery-filters");
    bar.innerHTML = albums.length > 1
      ? chipsHTML("gallery", [{ key: "all", label: P.filterAll }].concat(albums.map(function (a) { return { key: a.id, label: a[lang].title }; })))
      : "";
    bar.hidden = albums.length < 2;
    var shown = albums.filter(function (a) { return filters.gallery === "all" || a.id === filters.gallery; });
    var box = $("albums");
    if (!albums.length) { box.innerHTML = '<p class="empty">' + esc(P.empty) + "</p>"; return; }
    box.innerHTML = shown.map(function (a) {
      var group = "album-" + a.id;
      registerGroup(group, a.photos.map(function (p) {
        var cap = typeof p[lang] === "string" ? p[lang] : "";
        return { src: p.src, alt: cap, caption: cap };
      }));
      var grid = '<div class="masonry n' + Math.min(a.photos.length, 3) + '">' + a.photos.map(function (p, i) {
            var cap = typeof p[lang] === "string" ? p[lang] : "";
            return '<figure><button type="button" class="thumb" data-lb="' + esc(group) + ":" + i + '" aria-label="' + esc(cap) + '"><img src="' + esc(p.src) + '" alt="' + esc(cap) + '" loading="lazy"></button>' +
              (cap ? "<figcaption>" + esc(cap) + "</figcaption>" : "") + "</figure>";
          }).join("") + "</div>";
      return '<section class="album" id="album-' + esc(a.id) + '"><header class="album-head"><h2>' + esc(a[lang].title) + "</h2>" +
        (a[lang].description ? "<p>" + esc(a[lang].description) + "</p>" : "") +
        '<span class="album-count">' + esc(P.photoCount.replace("{n}", a.photos.length)) + "</span></header>" + grid + "</section>";
    }).join("");
  }

  /* ---------- photo viewer (lightbox) ---------- */
  var groups = {};
  var lbState = { items: [], index: 0, opener: null };
  var lb, lbImg, lbCap, lbCount, lbPrev, lbNext, lbClose;

  function registerGroup(name, items) { groups[name] = items; }

  function buildLightbox() {
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.id = "lightbox";
    lb.hidden = true;
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<button type="button" class="lb-close" id="lb-close">&times;</button>' +
      '<button type="button" class="lb-nav lb-prev" id="lb-prev"><span aria-hidden="true">&#8249;</span></button>' +
      '<figure class="lb-figure"><img id="lb-img" src="" alt=""><figcaption id="lb-cap"></figcaption><div class="lb-count" id="lb-count"></div></figure>' +
      '<button type="button" class="lb-nav lb-next" id="lb-next"><span aria-hidden="true">&#8250;</span></button>';
    document.body.appendChild(lb);
    lbImg = $("lb-img"); lbCap = $("lb-cap"); lbCount = $("lb-count");
    lbPrev = $("lb-prev"); lbNext = $("lb-next"); lbClose = $("lb-close");
    lbClose.addEventListener("click", closeLightbox);
    lbPrev.addEventListener("click", function () { stepLightbox(-1); });
    lbNext.addEventListener("click", function () { stepLightbox(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lb-figure")) closeLightbox(); });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) stepLightbox((dx < 0 ? 1 : -1) * (lang === "ar" ? -1 : 1));
    }, { passive: true });
  }
  function lbLabels() {
    lbClose.setAttribute("aria-label", t.lightbox.close);
    lbPrev.setAttribute("aria-label", t.lightbox.prev);
    lbNext.setAttribute("aria-label", t.lightbox.next);
  }
  function showLightboxItem() {
    var it = lbState.items[lbState.index];
    if (!it) return;
    lbImg.src = it.src;
    lbImg.alt = it.alt || "";
    lbCap.textContent = it.caption || "";
    var many = lbState.items.length > 1;
    lbPrev.hidden = !many; lbNext.hidden = !many;
    lbCount.textContent = many ? (lbState.index + 1) + " / " + lbState.items.length : "";
  }
  function openLightbox(groupName, index, opener) {
    var items = groups[groupName];
    if (!items || !items.length) return;
    lbState = { items: items, index: index || 0, opener: opener || null };
    lbLabels();
    showLightboxItem();
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    lbClose.focus();
  }
  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    lbImg.src = "";
    document.body.style.overflow = "";
    if (lbState.opener && document.body.contains(lbState.opener)) lbState.opener.focus();
  }
  function stepLightbox(dir) {
    var n = lbState.items.length;
    if (n < 2) return;
    lbState.index = (lbState.index + dir + n) % n;
    showLightboxItem();
  }

  /* ---------- shared header & footer ---------- */
  function headerHTML() {
    var nav = PAGES.map(function (p) {
      return '<li><a href="' + href(p.file) + '"' + (p.key === PAGE ? ' aria-current="page"' : "") + ">" + esc(t.nav[p.nav]) + "</a></li>";
    }).join("");
    return '<div class="container container-wide header-inner">' +
      '<a class="brand" href="' + href("index.html") + '" aria-label="JSAMG — ' + esc(t.nav.home) + '">' +
        '<img src="images/logo/jsamg-logo-small.jpg" alt="" width="320" height="321" class="brand-logo">' +
        '<span class="brand-text"><strong>' + esc(t.siteShort) + "</strong><span>" + esc(t.siteName) + "</span></span></a>" +
      '<nav id="site-nav" class="site-nav" aria-label="' + t.mainNav + '"><ul>' + nav + "</ul></nav>" +
      '<div class="header-actions">' +
        '<button type="button" class="lang-toggle" id="lang-toggle" aria-label="' + esc(t.langAria) + '">' +
          '<span class="lang-opt' + (lang === "en" ? " active" : "") + '" lang="en">English</span><span class="lang-sep" aria-hidden="true">|</span>' +
          '<span class="lang-opt' + (lang === "ar" ? " active" : "") + '" lang="ar">العربية</span></button>' +
        '<a class="btn btn-burgundy btn-sm join-btn" href="' + esc(mailto(SITE.membershipSubject)) + '">' + esc(t.join) + "</a>" +
        '<button type="button" class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="' + esc(t.menu) + '"><span></span><span></span><span></span></button>' +
      "</div></div>";
  }
  function footerHTML() {
    var links = PAGES.filter(function (p) { return p.key !== "home"; }).map(function (p) {
      return '<li><a href="' + href(p.file) + '">' + esc(t.nav[p.nav]) + "</a></li>";
    }).join("");
    return '<div class="container footer-inner">' +
      '<div class="footer-brand"><img src="images/logo/jsamg-logo-small.jpg" alt="' + esc(t.logoAlt) + '" width="320" height="321" loading="lazy">' +
        "<div><strong>" + esc(t.siteShort) + "</strong><p>" + esc(t.siteName) + " (JSAMG)</p><p>" + esc(t.footer.country) + "</p></div></div>" +
      "<div><h3>" + esc(t.footer.links) + '</h3><ul class="footer-links">' + links + "</ul></div>" +
      "<div><h3>" + esc(t.footer.contactTitle) + '</h3><a class="email-link-footer" href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + "</a></div></div>" +
      '<div class="container footer-bottom"><small><span dir="ltr">© ' + new Date().getFullYear() + "</span> " + esc(t.siteFull) + ". " + esc(t.footer.rights) + "</small></div>";
  }
  function mailto(subject) {
    return "mailto:" + SITE.email + (subject ? "?subject=" + encodeURIComponent(subject) : "");
  }

  /* ---------- static text, links ---------- */
  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = get(t, el.getAttribute("data-i18n"));
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = get(t, el.getAttribute("data-i18n-alt")); if (typeof v === "string") el.alt = v;
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = get(t, el.getAttribute("data-i18n-aria")); if (typeof v === "string") el.setAttribute("aria-label", v);
    });
    document.querySelectorAll("[data-page-link]").forEach(function (a) { a.href = href(a.getAttribute("data-page-link")); });
    document.querySelectorAll("[data-mailto]").forEach(function (a) {
      var kind = a.getAttribute("data-mailto");
      a.href = mailto(kind === "general" ? SITE.generalSubject : SITE.membershipSubject);
    });
    document.querySelectorAll("[data-email]").forEach(function (a) { a.href = "mailto:" + SITE.email; a.textContent = SITE.email; });
    document.querySelectorAll("[data-lb]").forEach(function () { /* handled by delegation */ });
  }

  function pageTitle() {
    var key = PAGE_TEXT_KEY[PAGE];
    if (!key) return t.siteFull;
    return t[key].metaTitle + " | " + t.siteFull;
  }

  var RENDERERS = {
    home: renderHome, about: renderAbout, board: renderBoardPage, events: renderEventsPage,
    news: renderNewsPage, gallery: renderGalleryPage, membership: renderMembership, contact: renderContactPage
  };

  function renderAll() {
    var html = document.documentElement;
    html.lang = lang;
    html.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = pageTitle();
    $("site-header").innerHTML = headerHTML();
    document.querySelector(".site-footer").innerHTML = footerHTML();
    bindHeader();
    applyStatic();
    if (RENDERERS[PAGE]) RENDERERS[PAGE]();
    zebra();
    observeReveal();
  }

  /* On inner pages, alternate white / light-gray bands between the visible sections,
     so hidden optional sections never leave a double gap. */
  function zebra() {
    if (PAGE === "home") return;
    var secs = [].filter.call(document.querySelectorAll("main > section.section"), function (x) { return !x.hidden; });
    secs.forEach(function (x, i) { x.classList.toggle("section-tint", i % 2 === 1); });
  }

  function setLanguage(next, remember) {
    lang = next === "ar" ? "ar" : "en";
    t = SITE.text[lang];
    if (remember) storeSet(lang);
    renderAll();
    // keep the address bar in step so a refresh or a shared link keeps the language
    try {
      var url = new URL(window.location.href);
      if (lang === "ar") url.searchParams.set("lang", "ar"); else url.searchParams.delete("lang");
      window.history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) { /* some browsers block this for local files; that is fine */ }
  }

  /* ---------- header behaviour ---------- */
  function closeMenu() {
    var nav = $("site-nav"), btn = $("menu-toggle");
    if (nav) nav.classList.remove("open");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }
  function bindHeader() {
    $("lang-toggle").addEventListener("click", function () { setLanguage(lang === "en" ? "ar" : "en", true); });
    var btn = $("menu-toggle"), nav = $("site-nav");
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") closeMenu(); });
  }

  /* ---------- gentle scroll reveal ---------- */
  var io = null;
  function observeReveal() {
    var els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.08 });
    }
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- clicks (viewer, filters) ---------- */
  document.addEventListener("click", function (e) {
    var lbTrigger = e.target.closest("[data-lb]");
    if (lbTrigger) {
      var parts = lbTrigger.getAttribute("data-lb").split(":");
      openLightbox(parts[0], parseInt(parts[1] || "0", 10), lbTrigger);
      return;
    }
    var chip = e.target.closest("[data-filter-group]");
    if (chip) {
      filters[chip.getAttribute("data-filter-group")] = chip.getAttribute("data-filter");
      if (RENDERERS[PAGE]) RENDERERS[PAGE]();
      zebra();
      observeReveal();
      var again = document.querySelector('[data-filter-group="' + chip.getAttribute("data-filter-group") + '"][aria-pressed="true"]');
      if (again) again.focus();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (lb && !lb.hidden) {
      if (e.key === "Escape") { closeLightbox(); return; }
      var rtl = lang === "ar";
      if (e.key === "ArrowRight") stepLightbox(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") stepLightbox(rtl ? 1 : -1);
      if (e.key === "Tab") {
        var f = [lbClose, lbPrev, lbNext].filter(function (b) { return !b.hidden; });
        var i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
      return;
    }
    if (e.key === "Escape") closeMenu();
  });

  /* ---------- start ---------- */
  var paramLang = null;
  try { paramLang = new URLSearchParams(window.location.search).get("lang"); } catch (e) { /* ignore */ }
  var saved = storeGet();
  var initial = paramLang === "ar" || paramLang === "en" ? paramLang : (saved === "ar" || saved === "en" ? saved : "en");
  buildLightbox();
  document.querySelectorAll("main section, main .reveal-me").forEach(function (s) { if (!s.classList.contains("reveal")) s.classList.add("reveal"); });
  if (paramLang === "ar" || paramLang === "en") storeSet(paramLang);
  lang = initial;
  t = SITE.text[lang];
  renderAll();
  // keep address bar consistent with chosen language
  try {
    if (lang === "ar" && paramLang !== "ar") {
      var u = new URL(window.location.href); u.searchParams.set("lang", "ar");
      window.history.replaceState(null, "", u.pathname + u.search + u.hash);
    }
  } catch (e) { /* ignore */ }
})();
