/* =========================================================
   JSAMG — Members Directory engine
   Reads data/members.json and builds the search box, filters
   and member cards on members.html, in English or Arabic.

   You normally never need to edit this file.
   To add or edit members, edit data/members.json.
   To add a photo, upload  members-photos/<MEMBER-ID>.jpg
   (see MEMBERS_DIRECTORY_GUIDE.md).
   ========================================================= */
(function () {
  "use strict";

  var DATA_FILE = "data/members.json";
  var PHOTO_FOLDER = "members-photos/";
  var DEFAULT_PHOTO = PHOTO_FOLDER + "default-avatar.svg";

  var members = null;          // list after loading
  var loadState = "idle";      // idle | loading | ok | error
  var lang = "en", T = {};
  var state = { q: "", specialty: "", country: "", city: "", sort: "az" };
  var showIds = /[?&]ids=1\b/.test(window.location.search);

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function str(v) { return v == null ? "" : String(v).trim(); }
  function other(l) { return l === "ar" ? "en" : "ar"; }
  // value of a field in the current language, falling back to the other language
  function val(m, key, l) {
    l = l || lang;
    return str(m[key + "_" + l]) || str(m[key + "_" + other(l)]);
  }
  function fill(s, map) {
    return String(s || "").replace(/\{(\w+)\}/g, function (_, k) { return map[k] == null ? "" : map[k]; });
  }
  // "Jordan, USA" -> ["Jordan", "USA"]   (also splits the Arabic comma ، and ;)
  function parts(s) {
    return str(s).split(/\s*[,،;]\s*/).map(str).filter(Boolean);
  }
  // list of {key, en, ar} for a multi-value field such as country or city
  function pairs(m, key) {
    var en = parts(m[key + "_en"]), ar = parts(m[key + "_ar"]);
    var n = Math.max(en.length, ar.length), out = [];
    for (var i = 0; i < n; i++) {
      var e = en[i] || "", a = ar[i] || "";
      out.push({ key: (e || a).toLowerCase(), en: e || a, ar: a || e });
    }
    return out;
  }
  // forgiving search: ignore case, Arabic diacritics and common letter variants
  function norm(s) {
    return str(s).toLowerCase()
      .replace(/[ً-ٰٟـ‎‏]/g, "")
      .replace(/[أإآٱ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي")
      .replace(/ؤ/g, "و").replace(/ئ/g, "ي")
      .replace(/[.'’\-]/g, " ").replace(/\s+/g, " ").trim();
  }
  function visible(m) { return m && m.show !== false && (str(m.name_en) || str(m.name_ar)); }

  /* ---------- loading ---------- */
  function load(done) {
    if (loadState === "ok" || loadState === "error") { done(); return; }
    if (loadState === "loading") return;
    loadState = "loading";
    fetch(DATA_FILE, { cache: "no-cache" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (list) {
        members = (Array.isArray(list) ? list : []).filter(visible);
        loadState = "ok";
        done();
      })
      .catch(function () { members = []; loadState = "error"; done(); });
  }

  /* ---------- options for the dropdowns ---------- */
  function collator() {
    try { return new Intl.Collator(lang === "ar" ? "ar" : "en", { sensitivity: "base" }); }
    catch (e) { return { compare: function (a, b) { return a < b ? -1 : a > b ? 1 : 0; } }; }
  }
  function uniqueOptions(getPairs, list) {
    var seen = {}, out = [];
    list.forEach(function (m) {
      getPairs(m).forEach(function (p) {
        if (!seen[p.key]) { seen[p.key] = true; out.push(p); }
      });
    });
    var c = collator();
    return out.sort(function (a, b) { return c.compare(a[lang], b[lang]); });
  }
  function specialtyPairs(m) {
    var e = str(m.specialty_en), a = str(m.specialty_ar);
    return e || a ? [{ key: (e || a).toLowerCase(), en: e || a, ar: a || e }] : [];
  }
  function countryPairs(m) { return pairs(m, "country"); }
  function cityPairs(m) { return pairs(m, "city"); }
  function hasKey(list, key) { return !key || list.some(function (p) { return p.key === key; }); }

  function optionsHTML(allLabel, list, selected) {
    return '<option value="">' + esc(allLabel) + "</option>" + list.map(function (p) {
      return '<option value="' + esc(p.key) + '"' + (p.key === selected ? " selected" : "") + ">" + esc(p[lang]) + "</option>";
    }).join("");
  }

  /* ---------- controls ---------- */
  function drawControls() {
    var box = $("md-controls");
    if (!box) return;
    box.innerHTML =
      '<div class="md-field md-search"><label for="md-q">' + esc(T.searchLabel) + "</label>" +
        '<input id="md-q" type="search" autocomplete="off" placeholder="' + esc(T.searchPlaceholder) + '" value="' + esc(state.q) + '"></div>' +
      '<div class="md-field"><label for="md-specialty">' + esc(T.specialtyLabel) + '</label><select id="md-specialty"></select></div>' +
      '<div class="md-field"><label for="md-country">' + esc(T.countryLabel) + '</label><select id="md-country"></select></div>' +
      '<div class="md-field"><label for="md-city">' + esc(T.cityLabel) + '</label><select id="md-city"></select></div>' +
      '<div class="md-field"><label for="md-sort">' + esc(T.sortLabel) + "</label>" +
        '<select id="md-sort"><option value="az">' + esc(T.sortAZ) + '</option><option value="za">' + esc(T.sortZA) + "</option></select></div>" +
      '<div class="md-field md-reset-wrap"><button type="button" id="md-reset" class="btn btn-outline md-reset">' + esc(T.reset) + "</button></div>";
    $("md-sort").value = state.sort;
    fillDropdowns();

    $("md-q").addEventListener("input", function () { state.q = this.value; drawResults(); });
    $("md-specialty").addEventListener("change", function () { state.specialty = this.value; drawResults(); });
    $("md-country").addEventListener("change", function () { state.country = this.value; state.city = ""; fillDropdowns(); drawResults(); });
    $("md-city").addEventListener("change", function () { state.city = this.value; drawResults(); });
    $("md-sort").addEventListener("change", function () { state.sort = this.value; drawResults(); });
    $("md-reset").addEventListener("click", function () {
      state = { q: "", specialty: "", country: "", city: "", sort: "az" };
      drawControls(); drawResults();
      $("md-q").focus();
    });
  }

  function fillDropdowns() {
    var specs = uniqueOptions(specialtyPairs, members);
    var countries = uniqueOptions(countryPairs, members);
    // the city list follows the chosen country
    var inCountry = members.filter(function (m) { return !state.country || countryPairs(m).some(function (p) { return p.key === state.country; }); });
    var cities = uniqueOptions(cityPairs, inCountry);
    if (!hasKey(specs, state.specialty)) state.specialty = "";
    if (!hasKey(countries, state.country)) state.country = "";
    if (!hasKey(cities, state.city)) state.city = "";
    $("md-specialty").innerHTML = optionsHTML(T.specialtyAll, specs, state.specialty);
    $("md-country").innerHTML = optionsHTML(T.countryAll, countries, state.country);
    $("md-city").innerHTML = optionsHTML(T.cityAll, cities, state.city);
    $("md-city").disabled = cities.length === 0;
  }

  /* ---------- filtering ---------- */
  function matches(m) {
    if (state.q) {
      var q = norm(state.q);
      var hay = norm(m.name_en) + " | " + norm(m.name_ar);
      var words = q.split(" ");
      for (var i = 0; i < words.length; i++) if (hay.indexOf(words[i]) === -1) return false;
    }
    if (state.specialty && !specialtyPairs(m).some(function (p) { return p.key === state.specialty; })) return false;
    if (state.country && !countryPairs(m).some(function (p) { return p.key === state.country; })) return false;
    if (state.city && !cityPairs(m).some(function (p) { return p.key === state.city; })) return false;
    return true;
  }

  /* ---------- cards ---------- */
  function photoSrc(m) {
    var p = str(m.photo);
    if (p) return /[\/:]/.test(p) ? p : PHOTO_FOLDER + p;      // a file name alone means members-photos/<name>
    return PHOTO_FOLDER + encodeURIComponent(str(m.id)) + ".jpg"; // default: members-photos/<ID>.jpg
  }
  function telHref(n) { return "tel:" + n.replace(/[^\d+]/g, ""); }

  function card(m) {
    var name = val(m, "name"), otherName = str(m["name_" + other(lang)]);
    var spec = val(m, "specialty"), sub = val(m, "subspecialty"), inst = val(m, "institution");
    var cities = pairs(m, "city").map(function (p) { return p[lang]; }).join(lang === "ar" ? "، " : ", ");
    var countries = pairs(m, "country").map(function (p) { return p[lang]; }).join(lang === "ar" ? "، " : ", ");
    var place = cities && countries ? cities + " — " + countries : (cities || countries);
    var training = str(m.us_training_en) || str(m.us_training_ar);
    var ttype = val(m, "training_type");
    var phones = parts(m.clinic_phone);
    var booking = /^https:\/\//.test(str(m.booking_link)) ? str(m.booking_link) : "";

    var rows = "";
    function row(label, html, cls) { rows += '<div class="md-row' + (cls ? " " + cls : "") + '"><dt>' + esc(label) + "</dt><dd>" + html + "</dd></div>"; }
    if (inst) row(T.institution, '<span dir="auto">' + esc(inst) + "</span>");
    if (place) row(T.location, esc(place));
    if (training) row(T.training, '<span dir="auto">' + esc(training) + "</span>" + (ttype ? '<span class="md-type">' + esc(ttype) + "</span>" : ""));
    if (phones.length || booking) {
      var c = phones.map(function (n) { return '<a class="md-tel" dir="ltr" href="' + esc(telHref(n)) + '">' + esc(n) + "</a>"; }).join("");
      if (booking) c += '<a class="md-book" href="' + esc(booking) + '" target="_blank" rel="noopener">' + esc(T.booking) + "</a>";
      row(T.phone, c, "md-contact");
    }

    return '<article class="md-card" id="' + esc(m.id) + '">' +
      '<div class="md-photo"><img src="' + esc(photoSrc(m)) + '" alt="' + esc(fill(T.photoAlt, { name: name })) + '" loading="lazy" width="120" height="120" data-md-photo></div>' +
      (showIds ? '<span class="md-id" dir="ltr">' + esc(m.id) + "</span>" : "") +
      '<h3 class="md-name">' + esc(T.doctor) + " " + esc(name) + "</h3>" +
      (otherName && otherName !== name ? '<p class="md-name-alt" lang="' + other(lang) + '" dir="' + (lang === "ar" ? "ltr" : "rtl") + '">' + esc(otherName) + "</p>" : "") +
      (spec ? '<p class="md-specialty">' + esc(spec) + "</p>" : "") +
      (sub && sub !== spec ? '<p class="md-sub">' + esc(sub) + "</p>" : "") +
      (rows ? '<dl class="md-details">' + rows + "</dl>" : "") +
      "</article>";
  }

  function drawResults() {
    var grid = $("md-grid"), count = $("md-count");
    if (!grid) return;
    var total = members.length;
    var c = collator();
    var list = members.filter(matches).sort(function (a, b) {
      var r = c.compare(val(a, "name"), val(b, "name"));
      return state.sort === "za" ? -r : r;
    });
    var filtered = state.q || state.specialty || state.country || state.city;
    count.innerHTML = '<span class="md-total">' + esc(fill(T.total, { n: total })) + "</span>" +
      (filtered ? '<span class="md-showing">' + esc(fill(T.showing, { m: list.length, n: total })) + "</span>" : "");
    grid.innerHTML = list.length ? list.map(card).join("") : '<p class="empty">' + esc(T.noMatch) + "</p>";
  }

  function drawMessage(text) {
    if ($("md-controls")) $("md-controls").innerHTML = "";
    if ($("md-count")) $("md-count").innerHTML = "";
    if ($("md-grid")) $("md-grid").innerHTML = '<p class="empty">' + esc(text) + "</p>";
  }

  /* ---------- photo fallback: show the default avatar if a photo is missing ---------- */
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img && img.tagName === "IMG" && img.hasAttribute("data-md-photo") && img.getAttribute("src") !== DEFAULT_PHOTO) {
      img.src = DEFAULT_PHOTO;
      img.parentNode.classList.add("is-default");
    }
  }, true);

  /* ---------- called by js/main.js on load and on every language switch ---------- */
  function render(newLang, text) {
    lang = newLang === "ar" ? "ar" : "en";
    T = text || {};
    if (loadState !== "ok" && loadState !== "error") drawMessage("…");
    load(function () {
      if (loadState === "error") {
        drawMessage(window.location.protocol === "file:" ? T.localNote : T.loadError);
        return;
      }
      if (!members.length) { drawMessage(T.empty); return; }
      drawControls();
      drawResults();
    });
  }

  window.JSAMG = window.JSAMG || {};
  window.JSAMG.membersDirectory = { render: render };
})();
