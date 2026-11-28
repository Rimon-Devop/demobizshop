/* Demo theme kit — one engine, many store designs.
   Each demo page sets window.DEMO = { data, brand, theme, copy } and loads a data set from ../data/. */
(function () {
  const C = window.DEMO, T = C.theme, B = C.brand, DS = window.DATASETS[C.data];
  const MAIN = "../../";
  const bnD = "০১২৩৪৫৬৭৮৯", bn = (n) => String(n).replace(/\d/g, (d) => bnD[d]);
  const tk = (n) => "৳" + bn(Math.round(n).toLocaleString("en-IN"));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const img = (id) => `../assets/img/${id.includes(".") ? id.replace(".", "/") : DS.dir + "/" + id}.jpg`;
  const P = Object.fromEntries(DS.products.map((p) => [p.id, p])), CAT = Object.fromEntries(DS.categories.map((c) => [c.id, c]));
  const L = Object.assign({ buy: "অর্ডার করুন", add: "কার্টে যোগ করুন", viewAll: "সব দেখুন", cats: "জনপ্রিয় ক্যাটাগরি", best: "সবচেয়ে বেশি বিক্রি", all: "সব পণ্য", flash: "ফ্ল্যাশ সেল", testi: "কাস্টমারদের মতামত", newA: "নতুন পণ্য" }, C.labels || {});
  const store = { get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } }, set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} } };
  const KEY = "kit_" + C.id;
  const vr = (p, v) => (p.variants || [[p.unit || "", p.price, p.old]]).find((x) => x[0] === v) || (p.variants || [[p.unit || "", p.price, p.old]])[0];
  const stars = (r = 4.8) => `<span class="stars" aria-label="রেটিং ${r}">${"★".repeat(Math.round(r))}${"☆".repeat(5 - Math.round(r))}</span>`;
  const off = (p) => (p.old ? Math.round((1 - p.price / p.old) * 100) : 0);
  const wa = (t) => `https://wa.me/${B.whatsapp || "8801700000000"}?text=${encodeURIComponent(t)}`;
  const ZONES = C.zones || [["ঢাকার ভিতরে", 70], ["ঢাকার বাইরে", 130]];

  // apply theme tokens + variant classes
  const root = document.documentElement;
  Object.entries(T.vars).forEach(([k, v]) => root.style.setProperty("--" + k, v));
  if (T.cols) root.style.setProperty("--cols", T.cols);
  document.body.className = ["h-" + T.header, "hero-" + T.hero, "c-" + T.card, "t-" + T.title, "k-" + T.cats, "f-" + (T.footer || "dark"), T.extraClass || ""].join(" ");

  // ---------- cart ----------
  let cart = store.get(KEY, []);
  const keyOf = (i) => i.id + "|" + i.v;
  const cartQty = () => cart.reduce((s, i) => s + i.q, 0), cartSub = () => cart.reduce((s, i) => s + vr(P[i.id], i.v)[1] * i.q, 0);
  function add(id, v, q = 1, quiet) { const p = P[id]; v = v || vr(p)[0]; const it = cart.find((i) => keyOf(i) === id + "|" + v); it ? (it.q = Math.min(20, it.q + q)) : cart.push({ id, v, q }); save(); if (!quiet) toast(`✓ ${p.name} — কার্টে যোগ হয়েছে`); }
  function setQ(k, q) { const it = cart.find((i) => keyOf(i) === k); if (!it) return; if (q <= 0) cart = cart.filter((i) => i !== it); else it.q = Math.min(20, q); save(); }
  function save() { store.set(KEY, cart); syncCart(); }

  // ---------- header pieces ----------
  const logo = `<a class="logo" href="#/">${B.mark ? `<span class="logo__m">${B.mark}</span>` : ""}<span class="logo__t">${B.name}${B.sub ? `<small>${B.sub}</small>` : ""}</span></a>`;
  const search = `<form class="srch" data-search><input type="search" placeholder="${C.searchPh || "পণ্য খুঁজুন..."}" aria-label="পণ্য খুঁজুন"><button aria-label="খুঁজুন">⌕</button></form>`;
  const cartBtn = `<button class="ic ic--cart" data-cart aria-label="কার্ট"><span>🛒</span><i class="cnt">০</i></button>`;
  const menuLinks = (C.menu || DS.categories.slice(0, 6).map((c) => [c.name, "#/c/" + c.id])).map(([t, h]) => `<a href="${h}">${t}</a>`).join("");
  const iconLabels = `<a class="il" href="#/track"><span>🚚</span><small>অর্ডার ট্র্যাক</small></a><a class="il" href="#" data-demo-login><span>👤</span><small>সাইন ইন</small></a><button class="il" data-cart><span>🛒<i class="cnt">০</i></span><small>কার্ট</small></button>`;
  function topbar() {
    const t = T.topbar; if (!t) return "";
    if (t.type === "countdown") return `<div class="tb tb--cd"><b>${t.text}</b><span class="cd" data-cd></span></div>`;
    if (t.type === "trust") return `<div class="tb tb--trust"><div class="wrap">${t.items.map((x) => `<span>${x}</span>`).join("")}<span class="tb__r">📞 ${bn(B.phone || "09610000000")}</span></div></div>`;
    if (t.type === "marquee") return `<div class="tb tb--mq"><div class="mq"><span>${(t.text + " ✦ ").repeat(6)}</span><span aria-hidden="true">${(t.text + " ✦ ").repeat(6)}</span></div></div>`;
    return `<div class="tb"><span>${t.text}</span></div>`;
  }
  function header() {
    const H = T.header;
    if (H === "classic") return `<div class="hd__in wrap"><button class="ic only-m" data-menu aria-label="মেনু">☰</button>${logo}${search}<nav class="hd__il only-d">${iconLabels}</nav>${cartBtn.replace("ic--cart", "ic--cart only-m")}</div>`;
    if (H === "single") return `<div class="hd__in wrap"><button class="ic only-m" data-menu aria-label="মেনু">☰</button>${logo}<nav class="hd__menu only-d">${menuLinks}</nav>${search}<a class="pillbtn only-d" href="#/track">অর্ডার ট্র্যাক</a>${cartBtn}</div>`;
    if (H === "boutique") return `<div class="hd__in wrap"><button class="ic only-m" data-menu aria-label="মেনু">☰</button>${logo}${search}<a class="pillbtn pillbtn--o only-d" href="#/track">অর্ডার ট্র্যাক</a>${cartBtn}</div>`;
    if (H === "center") return `<div class="hd__in wrap"><button class="ic only-m" data-menu aria-label="মেনু">☰</button><nav class="hd__menu hd__menu--l only-d">${menuLinks}</nav>${logo}<div class="hd__r">${search.replace('class="srch"', 'class="srch srch--sm only-d"')}<a class="ic only-d" href="#" data-demo-login aria-label="অ্যাকাউন্ট">👤</a>${cartBtn}</div></div>`;
    if (H === "luxe") return `<div class="hd__in wrap"><button class="ic only-m" data-menu aria-label="মেনু">☰</button>${logo}<nav class="hd__menu only-d">${menuLinks}</nav><div class="hd__r">${search.replace('class="srch"', 'class="srch srch--sm only-d"')}<a class="ic only-d" href="#" data-demo-login aria-label="অ্যাকাউন্ট">👤</a>${cartBtn}</div></div>`;
    return "";
  }
  function catbar() {
    const t = T.catbar; if (!t || t === "none") return "";
    if (t === "browse") return `<nav class="cb cb--browse"><div class="wrap cb__in"><details class="browse"><summary>☰ ${C.browseLabel || "সব ক্যাটাগরি"} ▾</summary><div>${DS.categories.map((c) => `<a href="#/c/${c.id}">${c.name}</a>`).join("")}</div></details><div class="cb__links">${(C.quick || [["হোম", "#/"], ["সব পণ্য", "#/shop"], ["অফার", "#/shop?sort=off"], ["অর্ডার ট্র্যাক", "#/track"]]).map(([a, h]) => `<a href="${h}">${a}</a>`).join("")}</div><div class="cb__r"><a href="tel:${B.phone || "09610000000"}">📞 হটলাইন</a></div></div></nav>`;
    return `<nav class="cb cb--${t}"><div class="wrap cb__in">${DS.categories.map((c) => `<a href="#/c/${c.id}">${c.name}</a>`).join("")}</div></nav>`;
  }

  document.body.innerHTML = `
  <div class="demo-bar">🎯 এটি একটি <b>ডেমো</b> (${C.label}) — এই ডিজাইনে ওয়েবসাইট চাই? <a href="${MAIN}#contact">অর্ডার করুন →</a></div>
  ${topbar()}
  <header class="hd">${header()}${catbar()}</header>
  <main id="v"></main>
  <footer class="ft"><div class="wrap ft__g">
    <div>${logo}<p>${C.about || DS.about}</p><p>📍 ${B.address || "ঢাকা, বাংলাদেশ"}<br>📞 ${bn(B.phone || "09610000000")}</p></div>
    <div><h4>ক্যাটাগরি</h4>${DS.categories.map((c) => `<a href="#/c/${c.id}">${c.name}</a>`).join("")}</div>
    <div><h4>সহায়তা</h4><a href="#/track">অর্ডার ট্র্যাকিং</a><a href="#/page">ডেলিভারি পলিসি</a><a href="#/page">রিটার্ন পলিসি</a><a href="#/page">প্রাইভেসি পলিসি</a></div>
    <div><h4>পেমেন্ট</h4><p class="pays"><b>ক্যাশ অন ডেলিভারি</b><b class="bk">বিকাশ</b><b class="ng">নগদ</b></p></div>
  </div><div class="wrap ft__b">© ${B.name} · ডেমো by <a href="${MAIN}">ShopShuru</a> · <a href="../credits.html">ছবি ক্রেডিট</a></div></footer>
  <nav class="bn">${(T.bnav || ["menu", "shop", "home", "cart", "search"]).map((k) => ({ menu: `<a href="#" data-menu><span>☰</span>মেনু</a>`, shop: `<a href="#/shop"><span>🛍️</span>শপ</a>`, home: `<a href="#/" class="${(T.bnavCenter || "home") === "home" ? "bn__c" : ""}"><span>🏠</span>হোম</a>`, cart: `<a href="#" data-cart class="${T.bnavCenter === "cart" ? "bn__c" : ""}"><span>🛒<i class="cnt">০</i></span>কার্ট</a>`, search: `<a href="#" data-sheet><span>🔍</span>সার্চ</a>`, call: `<a href="tel:${B.phone || "09610000000"}" class="${T.bnavCenter === "call" ? "bn__c" : ""}"><span>📞</span>কল</a>`, track: `<a href="#/track"><span>🚚</span>ট্র্যাক</a>`, wa: `<a href="${wa("আসসালামু আলাইকুম")}" target="_blank" rel="noopener"><span>💬</span>WhatsApp</a>`, bulk: `<a href="${wa("বাল্ক অর্ডার করতে চাই")}" target="_blank" rel="noopener"><span>📦</span>বাল্ক অর্ডার</a>` }[k])).join("")}</nav>
  <a class="fwa" href="${wa("আসসালামু আলাইকুম, অর্ডার করতে চাই")}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
  ${T.miniCart ? `<button class="mini" data-cart aria-label="কার্ট"><span>🛍️</span><b class="cnt">০</b><small id="miniSum">৳০</small></button>` : ""}
  <div class="ov" id="ov"></div>
  <aside class="dr dr--l" id="menuD"><div class="dr__h"><b>${B.name}</b><button data-close aria-label="বন্ধ">✕</button></div><div class="dr__b">${DS.categories.map((c) => `<a href="#/c/${c.id}">${c.name}</a>`).join("")}<hr><a href="#/shop">${L.all}</a><a href="#/track">অর্ডার ট্র্যাক</a><a href="tel:${B.phone || "09610000000"}">📞 কল করুন</a></div></aside>
  <aside class="dr dr--r" id="cartD"><div class="dr__h"><b>শপিং কার্ট</b><button data-close aria-label="বন্ধ">✕</button></div><div class="dr__b" id="cItems"></div><div class="dr__up" id="cUp"></div><div class="dr__f"><div class="row"><span>সাবটোটাল</span><b id="cSub"></b></div><a class="btn btn--p btn--block" href="#/checkout" id="cGo">চেকআউট করুন</a></div></aside>
  <div class="sheet" id="sheet"><div class="wrap">${search}</div></div>
  <div class="toast" id="toast" role="status"></div>`;

  // ---------- helpers ----------
  let tt; const toast = (m) => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200); };
  const open = (id) => { close(); $("#" + id).classList.add("open"); $("#ov").classList.add("open"); document.body.classList.add("lock"); };
  const close = () => { $$(".dr.open,.sheet.open").forEach((e) => e.classList.remove("open")); $("#ov").classList.remove("open"); document.body.classList.remove("lock"); };
  function syncCart() {
    $$(".cnt").forEach((e) => (e.textContent = bn(cartQty())));
    if ($("#miniSum")) $("#miniSum").textContent = tk(cartSub());
    $("#cItems").innerHTML = cart.length ? cart.map((i) => { const p = P[i.id], x = vr(p, i.v); return `<div class="ci"><img src="${img(p.id)}" alt="" width="56" height="56"><div class="ci__i"><b>${p.name}</b><small>${i.v}</small><div class="ci__r"><span class="qty"><button data-q="${keyOf(i)}" data-d="-1" aria-label="কমান">−</button><span>${bn(i.q)}</span><button data-q="${keyOf(i)}" data-d="1" aria-label="বাড়ান">+</button></span><b>${tk(x[1] * i.q)}</b></div></div></div>`; }).join("") : `<p class="empty">আপনার কার্ট খালি 🛍️</p>`;
    const cats = new Set(cart.map((i) => P[i.id].cat)); const up = DS.products.filter((p) => !cart.some((i) => i.id === p.id) && cats.has(p.cat)).slice(0, 4);
    $("#cUp").innerHTML = cart.length && up.length ? `<h5>এর সাথে নিতে পারেন</h5><div class="up">${up.map((p) => `<div><img src="${img(p.id)}" alt="" width="70" height="70"><small>${p.name}</small><b>${tk(p.price)}</b><button data-add="${p.id}">+ যোগ</button></div>`).join("")}</div>` : "";
    $("#cSub").textContent = tk(cartSub()); $("#cGo").classList.toggle("off", !cart.length);
  }

  // ---------- components ----------
  const card = (p) => `<article class="pc">
    <a class="pc__img" href="#/p/${p.id}">${off(p) ? `<span class="pc__off">-${bn(off(p))}%</span>` : ""}${p.flag ? `<span class="pc__flag">${p.flag}</span>` : ""}<img src="${img(p.id)}" alt="${esc(p.name)}" loading="lazy" width="600" height="600"></a>
    <div class="pc__b">${T.cardCat ? `<small class="pc__cat">${CAT[p.cat].name}</small>` : ""}<a class="pc__n" href="#/p/${p.id}">${p.name}</a>${T.stars ? `<div class="pc__s">${stars(p.rating)}</div>` : ""}
      <div class="pc__p">${tk(p.price)}${p.old ? ` <del>${tk(p.old)}</del>` : ""}</div>
      <div class="pc__btns"><button class="btn btn--p pc__buy" data-buy="${p.id}">${L.buy}</button>${T.cardCartIcon !== false ? `<button class="btn btn--i" data-add="${p.id}" aria-label="${L.add}">🛒</button>` : ""}</div></div></article>`;
  const sh = (title, link, sub) => `<div class="sh"><div><h2>${title}</h2>${sub ? `<p>${sub}</p>` : ""}</div>${link ? `<a class="sh__a" href="${link}">${L.viewAll} →</a>` : ""}</div>`;
  const rail = (html) => `<div class="rl"><button class="rl__b rl__b--l" data-sc="-1" aria-label="আগে">‹</button><div class="rl__t">${html}</div><button class="rl__b rl__b--r" data-sc="1" aria-label="পরে">›</button></div>`;
  const catImg = (c) => img((DS.products.find((p) => p.cat === c.id) || DS.products[0]).id);

  const SECTIONS = {
    cats: () => `<section class="sec wrap">${sh(L.cats)}${T.cats === "tile" || T.cats === "frame" ? `<div class="kg">${DS.categories.slice(0, T.cats === "frame" ? 4 : 6).map((c) => `<a class="kc" href="#/c/${c.id}"><img src="${catImg(c)}" alt="" loading="lazy" width="600" height="600"><span>${c.name}${T.cats === "frame" ? "<em>কালেকশন দেখুন</em>" : ""}</span></a>`).join("")}</div>` : rail(DS.categories.map((c) => `<a class="kc" href="#/c/${c.id}"><img src="${catImg(c)}" alt="" loading="lazy" width="300" height="300"><span>${c.name}</span></a>`).join(""))}</section>`,
    mostlist: () => `<section class="sec wrap">${sh(L.best, "#/shop")}<div class="ml">${DS.products.filter((p) => p.best).slice(0, 4).map((p) => `<article class="mli"><a href="#/p/${p.id}"><img src="${img(p.id)}" alt="" loading="lazy" width="300" height="300"></a><div><span class="badge">বেস্ট সেলিং</span><a class="pc__n" href="#/p/${p.id}">${p.name}</a><div class="pc__p">${tk(p.price)}${p.old ? ` <del>${tk(p.old)}</del>` : ""}</div><div class="pc__btns"><button class="btn btn--p" data-buy="${p.id}">${L.buy}</button><button class="btn btn--o" data-add="${p.id}">${L.add}</button></div></div></article>`).join("")}</div></section>`,
    flash: () => `<section class="sec wrap"><div class="fs"><div class="fs__h"><h2>⚡ ${L.flash}</h2><span class="cd cd--box" data-cd></span><a href="#/shop?sort=off" class="sh__a">${L.viewAll} →</a></div><div class="grid">${DS.products.filter((p) => p.old).slice(0, T.cols || 5).map(card).join("")}</div></div></section>`,
    best: () => `<section class="sec wrap">${sh(L.best, "#/shop")}<div class="grid">${DS.products.filter((p) => p.best).concat(DS.products.filter((p) => !p.best)).slice(0, T.cols || 5).map(card).join("")}</div></section>`,
    rows: () => DS.categories.slice(0, C.rowCount || 3).map((c) => `<section class="sec wrap">${sh(c.name, "#/c/" + c.id)}${T.rowsAsGrid ? `<div class="grid">${DS.products.filter((p) => p.cat === c.id).slice(0, T.cols || 5).map(card).join("")}</div>` : rail(DS.products.filter((p) => p.cat === c.id).map(card).join(""))}</section>`).join(""),
    grid: () => `<section class="sec wrap">${sh(L.newA, "#/shop")}<div class="grid">${DS.products.slice().reverse().slice(0, (T.cols || 5) * 2).map(card).join("")}</div></section>`,
    banner: () => { const b = C.banner || {}; return `<section class="sec wrap"><a class="wb" href="${b.link || "#/shop"}"><div><small>${b.kicker || "সীমিত সময়ের অফার"}</small><h2>${b.title || "নতুন কালেকশন"}</h2><span class="btn btn--w">${b.cta || "এখনই দেখুন"} →</span></div><img src="${img(b.img || DS.products[1].id)}" alt="" loading="lazy" width="800" height="800"></a></section>`; },
    edits: () => `<section class="sec wrap"><div class="ed">${(C.edits || DS.categories.slice(0, 3).map((c) => [c.name, "#/c/" + c.id, (DS.products.find((p) => p.cat === c.id) || {}).id])).map(([t, h, im]) => `<a href="${h}"><img src="${img(im)}" alt="" loading="lazy" width="800" height="800"><span><em>THE EDIT</em><b>${t}</b><u>এখনই দেখুন</u></span></a>`).join("")}</div></section>`,
    why: () => { const w = C.why || ["১০০% খাঁটি পণ্য", "ল্যাব টেস্টেড", "দ্রুত ডেলিভারি", "সহজ রিটার্ন"]; return `<section class="why"><div class="wrap why__in"><div class="why__c">${w.slice(0, 2).map((x) => `<div><span>✓</span><b>${x}</b><small>প্রতিটি অর্ডারে নিশ্চিত মান ও সেবা</small></div>`).join("")}</div><img src="${img(C.whyImg || DS.products[0].id)}" alt="" loading="lazy" width="600" height="600"><div class="why__c">${w.slice(2).map((x) => `<div><span>✓</span><b>${x}</b><small>প্রতিটি অর্ডারে নিশ্চিত মান ও সেবা</small></div>`).join("")}</div></div></section>`; },
    intro: () => `<section class="sec wrap"><div class="intro"><h2>${C.intro ? C.intro[0] : B.name}</h2><p>${C.intro ? C.intro[1] : C.about || DS.about}</p></div></section>`,
    marquee: () => `<div class="mqs"><div class="mq"><span>${((C.marquee || "ফ্রি হোম ডেলিভারি ✦ ক্যাশ অন ডেলিভারি ✦ ১০০% অরিজিনাল") + " ✦ ").repeat(5)}</span><span aria-hidden="true">${((C.marquee || "ফ্রি হোম ডেলিভারি ✦ ক্যাশ অন ডেলিভারি ✦ ১০০% অরিজিনাল") + " ✦ ").repeat(5)}</span></div></div>`,
    faq: () => `<section class="sec wrap">${sh("সাধারণ জিজ্ঞাসা")}<div class="faq"><img src="${img(C.faqImg || DS.products[2].id)}" alt="" loading="lazy" width="600" height="600"><div>${[["ডেলিভারি কত দিনে পাব?", "ঢাকায় ১-২ দিন, ঢাকার বাইরে ২-৪ দিন।"], ["পণ্য হাতে পেয়ে টাকা দেওয়া যাবে?", "হ্যাঁ, সারাদেশে ক্যাশ অন ডেলিভারি।"], ["পণ্য পছন্দ না হলে?", "৩ দিনের মধ্যে রিটার্ন বা এক্সচেঞ্জ করতে পারবেন।"], ["অর্ডার কীভাবে ট্র্যাক করব?", "অর্ডার নম্বর ও ফোন নম্বর দিয়ে ট্র্যাকিং পেজে।"]].map(([q, a], i) => `<details ${i ? "" : "open"}><summary>${q}</summary><p>${a}</p></details>`).join("")}</div></div></section>`,
    testi: () => `<section class="sec wrap">${sh(L.testi + " <small class='mu'>(ডেমো)</small>")}<div class="ts">${(C.testi || [["রুমানা আক্তার", "পণ্যের মান খুব ভালো, প্যাকেজিংও সুন্দর ছিল।"], ["সাকিব হাসান", "অর্ডারের পরদিনই ডেলিভারি পেয়েছি।"], ["ফারজানা ইসলাম", "দাম অনুযায়ী মান অসাধারণ, আবার নেব।"]]).map(([n, t], i) => `<figure>${stars()}<blockquote>“${t}”</blockquote><figcaption><img src="${img(DS.products[(i * 3) % DS.products.length].id)}" alt="" loading="lazy" width="80" height="80"><b>${n}</b></figcaption></figure>`).join("")}</div></section>`,
    trust: () => `<section class="sec wrap"><div class="tr">${(C.trust || ["🚚 সারাদেশে ডেলিভারি", "💵 ক্যাশ অন ডেলিভারি", "✅ ১০০% অরিজিনাল", "↩️ সহজ রিটার্ন"]).map((x) => `<div>${x}</div>`).join("")}</div></section>`,
    newsletter: () => `<section class="nl"><div class="wrap"><h2>${C.nlTitle || "নতুন কালেকশনের খবর সবার আগে পান"}</h2><form class="nl__f" data-nl><input type="tel" inputmode="numeric" placeholder="আপনার মোবাইল নম্বর" aria-label="মোবাইল নম্বর"><button class="btn btn--p">সাবস্ক্রাইব</button></form></div></section>`,
  };

  function hero() {
    const h = C.hero || {}; const sl = h.slides || [{ title: B.name, sub: "", img: DS.products[0].id }];
    const slide = (s, i) => `<a class="hs ${i ? "" : "on"}" href="${s.link || "#/shop"}" style="--hbg:${s.bg || "var(--p)"}"><div class="hs__c">${s.kicker ? `<small>${s.kicker}</small>` : ""}<h1>${s.title}</h1>${s.sub ? `<p>${s.sub}</p>` : ""}<span class="btn btn--w">${s.cta || "এখনই কিনুন"}</span></div><img src="${img(s.img)}" alt="" width="1000" height="1000"></a>`;
    const dots = sl.length > 1 ? `<div class="hdots">${sl.map((_, i) => `<button data-dot="${i}" class="${i ? "" : "on"}" aria-label="স্লাইড ${bn(i + 1)}"></button>`).join("")}</div>` : "";
    if (T.hero === "slider-sides") return `<section class="hero wrap"><div class="hsl">${sl.map(slide).join("")}${dots}</div><div class="hsd">${(h.sides || [DS.products[3].id, DS.products[5].id]).map((id, i) => `<a href="#/p/${id}"><img src="${img(id)}" alt="" width="600" height="600"><span><b>${(h.sideText || ["নতুন কালেকশন", "সেরা অফার"])[i]}</b><u>দেখুন →</u></span></a>`).join("")}</div></section>`;
    if (T.hero === "full") return `<section class="hero hero--full"><div class="hsl">${sl.map(slide).join("")}${dots}</div></section>`;
    return `<section class="hero wrap"><div class="hsl">${sl.map(slide).join("")}${dots}</div></section>`;
  }

  // ---------- pages ----------
  let timers = [];
  const home = () => hero() + (T.home || ["cats", "best", "rows", "testi"]).map((k) => SECTIONS[k]()).join("");
  function listing(title, items, qs) {
    const sort = qs.get("sort"); let r = [...items];
    if (sort === "low") r.sort((a, b) => a.price - b.price); if (sort === "high") r.sort((a, b) => b.price - a.price); if (sort === "off") r.sort((a, b) => off(b) - off(a));
    return `<div class="wrap crumbs"><a href="#/">হোম</a> › <span>${title}</span></div><section class="sec wrap"><div class="lt"><div><h1>${title}</h1><small class="mu">${bn(r.length)} টি পণ্য</small></div><label class="sel">সাজান <select data-sort><option value="">ডিফল্ট</option><option value="low" ${sort === "low" ? "selected" : ""}>দাম: কম → বেশি</option><option value="high" ${sort === "high" ? "selected" : ""}>দাম: বেশি → কম</option><option value="off" ${sort === "off" ? "selected" : ""}>বেশি ছাড়</option></select></label></div>
      <div class="chips"><a href="#/shop" class="${title === L.all ? "on" : ""}">${L.all}</a>${DS.categories.map((c) => `<a href="#/c/${c.id}" class="${c.name === title ? "on" : ""}">${c.name}</a>`).join("")}</div>
      <div class="grid">${r.map(card).join("") || `<p class="empty">কোনো পণ্য পাওয়া যায়নি।</p>`}</div></section>`;
  }
  function product(id) {
    const p = P[id]; if (!p) return nf(); const c = CAT[p.cat]; const vs = p.variants || [[p.unit || "১ পিস", p.price, p.old]];
    const btns = T.buybox === "stack"
      ? `<div class="bb bb--stack"><div class="bb__row"><span class="qty qty--lg"><button data-pq="-1" aria-label="কমান">−</button><span id="pq">১</span><button data-pq="1" aria-label="বাড়ান">+</button></span><button class="btn btn--o" id="pAdd">${L.add}</button></div><button class="btn btn--p btn--block" id="pBuy">${L.buy}</button><a class="btn btn--wa btn--block" href="${wa(`এই পণ্যটি অর্ডার করতে চাই: ${p.name}`)}" target="_blank" rel="noopener">💬 WhatsApp-এ অর্ডার</a></div>`
      : `<div class="bb__row"><span>পরিমাণ:</span><span class="qty qty--lg"><button data-pq="-1" aria-label="কমান">−</button><span id="pq">১</span><button data-pq="1" aria-label="বাড়ান">+</button></span></div><div class="bb bb--grid"><button class="btn btn--o" id="pAdd">🛒 ${L.add}</button><button class="btn btn--p" id="pBuy">⚡ ${L.buy}</button><a class="btn btn--wa" href="${wa(`এই পণ্যটি অর্ডার করতে চাই: ${p.name}`)}" target="_blank" rel="noopener">💬 WhatsApp অর্ডার</a><a class="btn btn--call" href="tel:${B.phone || "09610000000"}">📞 কল করে অর্ডার</a></div>`;
    return `<div class="wrap crumbs"><a href="#/">হোম</a> › <a href="#/c/${c.id}">${c.name}</a> › <span>${p.name}</span></div>
    <section class="pd wrap"><div class="pd__g">${off(p) ? `<span class="pc__off">-${bn(off(p))}%</span>` : ""}<img src="${img(p.id)}" alt="${esc(p.name)}" width="1000" height="1000"></div>
      <div class="pd__i"><small class="pc__cat">${c.name}</small><h1>${p.name}</h1>${T.stars ? `<div>${stars(p.rating)} <small class="mu">(${bn(p.reviews || 24)} রিভিউ)</small></div>` : ""}
        <div class="pd__p"><b id="pp"></b><del id="po"></del></div>
        ${T.pdCountdown ? `<div class="pd__cd">⏳ অফার শেষ হতে বাকি <span class="cd cd--box" data-cd></span></div>` : ""}
        ${vs.length > 1 ? `<div class="pd__v"><span>${C.variantLabel || "সাইজ"}:</span>${vs.map((v, i) => `<button class="vb ${i ? "" : "on"}" data-v="${v[0]}">${v[0]}</button>`).join("")}</div>` : `<p class="mu">${vs[0][0]}</p>`}
        ${btns}
        <div class="pd__t">${(C.pdTrust || ["🚚 সারাদেশে হোম ডেলিভারি", "💵 ক্যাশ অন ডেলিভারি", "✅ ১০০% অরিজিনাল", "↩️ ৩ দিনে রিটার্ন"]).map((x) => `<span>${x}</span>`).join("")}</div>
      </div></section>
    <section class="sec wrap"><div class="tabs"><button class="on" data-tab="d">বিবরণ</button><button data-tab="s">ডেলিভারি ও রিটার্ন</button></div>
      <div class="tabp" data-p="d"><p>${p.desc || DS.desc}</p></div><div class="tabp" data-p="s" hidden><p>${ZONES.map(([z, f]) => `${z}: ${tk(f)}`).join(" · ")}। পণ্য হাতে পেয়ে টাকা পরিশোধ করুন। ক্ষতিগ্রস্ত বা ভুল পণ্য হলে ৩ দিনের মধ্যে রিটার্ন।</p></div></section>
    <section class="sec wrap">${sh("সম্পর্কিত পণ্য")}<div class="grid">${DS.products.filter((x) => x.cat === p.cat && x.id !== p.id).concat(DS.products.filter((x) => x.cat !== p.cat)).slice(0, T.cols || 5).map(card).join("")}</div></section>`;
  }
  function afterProduct(id) {
    const p = P[id]; if (!p) return; let v = vr(p)[0], q = 1;
    const u = () => { const x = vr(p, v); $("#pp").textContent = tk(x[1] * q); $("#po").textContent = x[2] ? tk(x[2] * q) : ""; $("#pq").textContent = bn(q); };
    $$(".vb").forEach((b) => (b.onclick = () => { v = b.dataset.v; $$(".vb").forEach((x) => x.classList.toggle("on", x === b)); u(); }));
    $$("[data-pq]").forEach((b) => (b.onclick = () => { q = Math.max(1, Math.min(20, q + +b.dataset.pq)); u(); }));
    $("#pAdd").onclick = () => add(id, v, q); $("#pBuy").onclick = () => { add(id, v, q, true); location.hash = "#/checkout"; };
    u();
  }
  function checkout() {
    if (!cart.length) return `<section class="sec wrap"><div class="done"><h2>আপনার কার্ট খালি</h2><a class="btn btn--p" href="#/shop">কেনাকাটা শুরু করুন</a></div></section>`;
    const step = T.checkout === "stepper" ? `<ol class="steps"><li class="ok">কার্ট</li><li class="now">তথ্য</li><li>সম্পন্ন</li></ol>` : "";
    return `<section class="sec wrap co co--${T.checkout || "card"}">${step}
      ${T.checkout === "banner" ? `<div class="co__ban">🎁 অর্ডার কনফার্ম করতে নিচের তথ্যগুলো দিন। আমাদের প্রতিনিধি কল করে নিশ্চিত করবেন।</div>` : ""}
      <form id="coF" class="co__g" novalidate>
        <div class="box"><h2>${T.checkout === "card" ? "অর্ডার করতে নিচের তথ্যগুলো দিন" : "ডেলিভারি তথ্য"}</h2>
          <label>আপনার নাম *<input name="n" required autocomplete="name" placeholder="সম্পূর্ণ নাম"></label>
          <label>মোবাইল নম্বর *<input name="ph" required inputmode="numeric" maxlength="11" autocomplete="tel" placeholder="01XXXXXXXXX"><small class="err" id="phE" hidden>সঠিক ১১ সংখ্যার মোবাইল নম্বর দিন</small></label>
          <small class="mu">ℹ️ অর্ডার সম্পন্ন না হলে সহায়তার জন্য আমরা এই নম্বরে কল করতে পারি।</small>
          <label>সম্পূর্ণ ঠিকানা *<textarea name="a" required rows="2" placeholder="বাসা, রোড, এলাকা, থানা, জেলা"></textarea></label>
          <fieldset class="zones"><legend>ডেলিভারি এলাকা *</legend>${ZONES.map(([z, f], i) => `<label class="rd"><input type="radio" name="z" value="${i}" ${i ? "" : "checked"}> ${z} <b>${f ? tk(f) : "ফ্রি"}</b></label>`).join("")}</fieldset>
          <fieldset class="zones"><legend>পেমেন্ট</legend><label class="rd"><input type="radio" name="pay" value="cod" checked> 💵 ক্যাশ অন ডেলিভারি</label><label class="rd"><input type="radio" name="pay" value="bkash"> <b class="bk">বিকাশ</b> (অগ্রিম)</label></fieldset>
        </div>
        <div class="box co__s"><h2>আপনার অর্ডার</h2>${cart.map((i) => { const p = P[i.id], x = vr(p, i.v); return `<div class="ci ci--s"><img src="${img(p.id)}" alt="" width="48" height="48"><div class="ci__i"><b>${p.name}</b><small>${i.v} × ${bn(i.q)}</small></div><b>${tk(x[1] * i.q)}</b></div>`; }).join("")}
          <div class="row"><span>সাবটোটাল</span><b>${tk(cartSub())}</b></div><div class="row"><span>ডেলিভারি</span><b id="sh"></b></div><div class="row row--t"><span>সর্বমোট</span><b id="tot"></b></div>
          <label class="terms"><input type="checkbox" name="t"> আমি শর্তাবলী ও রিটার্ন পলিসিতে সম্মত</label><small class="err" id="coE" hidden></small>
          <button class="btn btn--p btn--block btn--lg" id="coB">অর্ডার কনফার্ম করুন</button><p class="mu sm">🔒 ডেমো — কোনো আসল অর্ডার হবে না</p></div>
      </form></section>`;
  }
  function afterCheckout() {
    const f = $("#coF"); if (!f) return;
    const u = () => { const s = ZONES[+f.z.value][1]; $("#sh").textContent = s ? tk(s) : "ফ্রি"; const t = cartSub() + s; $("#tot").textContent = tk(t); $("#coB").textContent = `অর্ডার কনফার্ম করুন — ${tk(t)}`; };
    $$("[name=z]", f).forEach((r) => (r.onchange = u)); u();
    f.ph.oninput = () => { f.ph.value = f.ph.value.replace(/\D/g, ""); $("#phE").hidden = /^01[3-9]\d{8}$/.test(f.ph.value) || f.ph.value.length < 11; };
    f.onsubmit = (e) => { e.preventDefault(); const er = []; if (!f.n.value.trim()) er.push("নাম"); if (!/^01[3-9]\d{8}$/.test(f.ph.value)) er.push("সঠিক মোবাইল নম্বর"); if (!f.a.value.trim()) er.push("ঠিকানা"); if (!f.t.checked) er.push("শর্তাবলীতে সম্মতি");
      if (er.length) { $("#coE").hidden = false; $("#coE").textContent = "দয়া করে দিন: " + er.join(", "); return; }
      const no = String(Date.now()).slice(-6), tot = $("#tot").textContent; cart = []; save(); location.hash = `#/done/${no}/${encodeURIComponent(tot)}`; };
  }
  const done = (no, tot) => `<section class="sec wrap"><div class="done">${T.checkout === "stepper" ? `<ol class="steps"><li class="ok">কার্ট</li><li class="ok">তথ্য</li><li class="ok">সম্পন্ন</li></ol>` : ""}<div class="done__i">✓</div><h1>ধন্যবাদ! অর্ডার #${bn(no)} গ্রহণ করা হয়েছে</h1><p>সর্বমোট ${decodeURIComponent(tot || "")} · আমাদের প্রতিনিধি শীঘ্রই কল করে কনফার্ম করবেন।</p><div class="note"><b>এটি ডেমো।</b> আসল সাইটে কাস্টমার SMS পেত, অ্যাডমিনে অর্ডার আসত, আর এক ক্লিকে কুরিয়ারে বুক হতো।</div><a class="btn btn--p" href="${MAIN}#contact">এই ডিজাইনে ওয়েবসাইট চাই →</a></div></section>`;
  const track = () => `<section class="sec wrap"><div class="done"><h1>📦 অর্ডার ট্র্যাক করুন</h1><p class="mu">অর্ডার নম্বর ও মোবাইল নম্বর দিন।</p><form class="trk" onsubmit="event.preventDefault();this.nextElementSibling.hidden=false"><input required placeholder="অর্ডার নম্বর" aria-label="অর্ডার নম্বর"><input required inputmode="numeric" placeholder="01XXXXXXXXX" aria-label="মোবাইল নম্বর"><button class="btn btn--p">ট্র্যাক করুন</button></form><ol class="tl" hidden><li class="ok">অর্ডার গৃহীত</li><li class="ok">কনফার্ম করা হয়েছে</li><li class="now">প্যাক করা হচ্ছে</li><li>কুরিয়ারে হস্তান্তর</li><li>ডেলিভারি সম্পন্ন</li></ol></div></section>`;
  const nf = () => `<section class="sec wrap"><div class="done"><h2>পেজটি পাওয়া যায়নি</h2><a class="btn btn--p" href="#/">হোমে ফিরুন</a></div></section>`;

  // ---------- countdown (real: counts to midnight, never resets mid-day) ----------
  function cd() { const n = new Date(), e = new Date(n); e.setHours(24, 0, 0, 0); const s = Math.floor((e - n) / 1000); const parts = [[Math.floor(s / 3600), "ঘণ্টা"], [Math.floor((s % 3600) / 60), "মিনিট"], [s % 60, "সেকেন্ড"]];
    $$("[data-cd]").forEach((el) => (el.innerHTML = parts.map(([v, l]) => `<span><b>${bn(String(v).padStart(2, "0"))}</b><small>${l}</small></span>`).join(""))); }
  cd(); setInterval(cd, 1000);

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-buy],[data-q],[data-cart],[data-menu],[data-sheet],[data-close],[data-sc],[data-dot],[data-tab],[data-demo-login]"); if (!t) return; const d = t.dataset;
    if ("add" in d) { e.preventDefault(); add(d.add); }
    else if ("buy" in d) { e.preventDefault(); add(d.buy, null, 1, true); location.hash = "#/checkout"; }
    else if ("q" in d) { const it = cart.find((i) => keyOf(i) === d.q); setQ(d.q, (it ? it.q : 0) + +d.d); }
    else if ("cart" in d) { e.preventDefault(); syncCart(); open("cartD"); }
    else if ("menu" in d) { e.preventDefault(); open("menuD"); }
    else if ("sheet" in d) { e.preventDefault(); open("sheet"); setTimeout(() => $("#sheet input").focus(), 60); }
    else if ("close" in d) close();
    else if ("sc" in d) { const r = t.parentElement.querySelector(".rl__t"); r.scrollBy({ left: +d.sc * r.clientWidth * 0.85, behavior: "smooth" }); }
    else if ("dot" in d) { e.preventDefault(); go(+d.dot); }
    else if ("tab" in d) { $$("[data-tab]").forEach((b) => b.classList.toggle("on", b === t)); $$("[data-p]").forEach((p) => (p.hidden = p.dataset.p !== d.tab)); }
    else if ("demoLogin" in d) { e.preventDefault(); toast("ডেমোতে লগইন বন্ধ — আসল সাইটে ফোন + OTP দিয়ে লগইন"); }
  });
  document.addEventListener("submit", (e) => { if (e.target.matches("[data-search]")) { e.preventDefault(); const q = e.target.querySelector("input").value.trim(); if (q) location.hash = "#/search/" + encodeURIComponent(q); } if (e.target.matches("[data-nl]")) { e.preventDefault(); toast("ধন্যবাদ! (ডেমো)"); } });
  document.addEventListener("change", (e) => { if (e.target.matches("[data-sort]")) { const [p] = location.hash.split("?"); location.hash = p + (e.target.value ? "?sort=" + e.target.value : ""); } });
  $("#ov").onclick = close; addEventListener("keydown", (e) => e.key === "Escape" && close());
  let cur = 0; function go(i) { const s = $$(".hs"), dt = $$(".hdots button"); if (!s.length) return; cur = (i + s.length) % s.length; s.forEach((x, k) => x.classList.toggle("on", k === cur)); dt.forEach((x, k) => x.classList.toggle("on", k === cur)); }

  // ---------- router ----------
  function route() {
    timers.forEach(clearInterval); timers = []; close();
    const [path, qs] = (location.hash.slice(1) || "/").split("?"); const pt = path.split("/").filter(Boolean); const q = new URLSearchParams(qs || "");
    const v = $("#v"); let after;
    if (!pt.length) { v.innerHTML = home(); cur = 0; if ($$(".hs").length > 1) timers.push(setInterval(() => go(cur + 1), 5000)); }
    else if (pt[0] === "c" && CAT[pt[1]]) v.innerHTML = listing(CAT[pt[1]].name, DS.products.filter((p) => p.cat === pt[1]), q);
    else if (pt[0] === "shop") v.innerHTML = listing(L.all, DS.products, q);
    else if (pt[0] === "search") { const s = decodeURIComponent(pt.slice(1).join("/")); v.innerHTML = listing(`“${esc(s)}” এর ফলাফল`, DS.products.filter((p) => p.name.includes(s) || (p.en || "").toLowerCase().includes(s.toLowerCase()) || CAT[p.cat].name.includes(s)), q); }
    else if (pt[0] === "p") { v.innerHTML = product(pt[1]); after = () => afterProduct(pt[1]); }
    else if (pt[0] === "checkout") { v.innerHTML = checkout(); after = afterCheckout; }
    else if (pt[0] === "done") v.innerHTML = done(pt[1], pt[2]);
    else if (pt[0] === "track") v.innerHTML = track();
    else if (pt[0] === "page") v.innerHTML = `<section class="sec wrap"><div class="done"><h1>নীতিমালা</h1><p>ডেলিভারি: ${ZONES.map(([z, f]) => `${z} ${f ? tk(f) : "ফ্রি"}`).join(", ")}। রিটার্ন: ৩ দিন। পেমেন্ট: ক্যাশ অন ডেলিভারি, বিকাশ।</p><p class="mu">আসল সাইটে এই পেজ দোকানের সেটিংস থেকে তৈরি হয়, তাই চেকআউটের সাথে সবসময় মিলে যায়।</p></div></section>`;
    else v.innerHTML = nf();
    document.body.dataset.r = pt[0] || "home";
    document.title = `${B.name} — ${C.label} | ডেমো`;
    if (after) after(); cd(); syncCart(); scrollTo(0, 0);
    $$(".rl").forEach((r) => { const t = r.querySelector(".rl__t"); r.classList.toggle("rl--fit", t.scrollWidth <= t.clientWidth + 2); });
  }
  addEventListener("hashchange", route); route();
})();
