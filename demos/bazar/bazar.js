/* সতেজ মার্ট — large grocery-store demo (hash-routed single page). Data in data.js */
(function () {
  const D = window.BZ;
  const MAIN = "../../";
  const bnD = "০১২৩৪৫৬৭৮৯";
  const bn = (n) => String(n).replace(/\d/g, (d) => bnD[d]);
  const tk = (n) => "৳" + bn(Math.round(n).toLocaleString("en-IN"));
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const P = Object.fromEntries(D.products.map((p) => [p.id, p]));
  const CAT = Object.fromEntries(D.categories.map((c) => [c.id, c]));
  const BR = Object.fromEntries(D.brands.map((b) => [b.id, b]));
  const store = {
    get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  const FLAG = { best: ["বেস্ট সেলিং", "f-best"], new: ["নতুন", "f-new"], trending: ["ট্রেন্ডিং", "f-trend"], free: ["ফ্রি ডেলিভারি", "f-free"] };
  const inCat = (p, c) => (c === "offer" ? !!p.old : p.cat === c);
  const save = (p, v) => { const x = vr(p, v); return x[2] ? x[2] - x[1] : 0; };
  const vr = (p, v) => p.variants.find((x) => x[0] === v) || p.variants[0];
  const stars = (r) => `<span class="stars" aria-label="রেটিং ${r}">${"★".repeat(Math.round(r))}${"☆".repeat(5 - Math.round(r))}</span>`;

  // ---------------- cart ----------------
  let cart = store.get("bz_cart", []);
  let wish = store.get("bz_wish", []);
  const keyOf = (i) => i.id + "|" + i.v;
  const cartQty = () => cart.reduce((s, i) => s + i.q, 0);
  const cartSub = (items = cart) => items.reduce((s, i) => s + vr(P[i.id], i.v)[1] * i.q, 0);
  const qtyIn = (id) => cart.filter((i) => i.id === id).reduce((s, i) => s + i.q, 0);
  function addToCart(id, v, q = 1, quiet) {
    const p = P[id]; if (!p.stock) return toast("দুঃখিত, পণ্যটি স্টকে নেই");
    v = v || p.variants[0][0];
    const it = cart.find((i) => keyOf(i) === id + "|" + v);
    it ? (it.q = Math.min(20, it.q + q)) : cart.push({ id, v, q });
    persist(); if (!quiet) toast(`✓ "${p.name}" কার্টে যোগ হয়েছে`);
  }
  function setQty(key, q) {
    const it = cart.find((i) => keyOf(i) === key); if (!it) return;
    if (q <= 0) { cart = cart.filter((i) => i !== it); toast("পণ্যটি কার্ট থেকে সরানো হয়েছে"); } else it.q = Math.min(20, q);
    persist();
  }
  function persist() { store.set("bz_cart", cart); syncCartUI(); }

  // ---------------- shell ----------------
  const catMenu = D.categories.map((c) => `
    <li class="cm"><a href="#/c/${c.id}">${c.name}${c.subs ? " ▾" : ""}</a>
      ${c.subs ? `<ul class="cm__drop">${c.subs.map((s) => `<li><a href="#/c/${c.id}?sub=${encodeURIComponent(s)}">${s}</a></li>`).join("")}</ul>` : ""}</li>`).join("");

  document.body.innerHTML = `
  <div class="demo-bar">🎯 এটি একটি <b>ডেমো ওয়েবসাইট</b> — এমন বড় অনলাইন স্টোর চাই? <a href="${MAIN}#contact">যোগাযোগ করুন →</a></div>
  <header class="hd">
    <div class="wrap hd__top">
      <button class="icon-btn only-m" id="menuBtn" aria-label="মেনু">☰</button>
      <a class="logo" href="#/"><span class="logo__mark">স</span><span class="logo__txt"><b>${D.name}</b><small>${D.tagline}</small></span></a>
      <div class="search" id="search">
        <input id="q" type="search" placeholder="মধু, ঘি, গুড়, খেজুর খুঁজুন..." autocomplete="off" aria-label="পণ্য খুঁজুন" />
        <button id="qBtn" aria-label="খুঁজুন">🔍</button>
        <div class="search__drop" id="qDrop" hidden></div>
      </div>
      <nav class="hd__acts">
        <a href="#/track" class="act only-d"><span>📦</span><small>অর্ডার ট্র্যাক</small></a>
        <a href="#" class="act only-d" data-demo-login><span>👤</span><small>সাইন ইন</small></a>
        <a href="#" class="act only-d" data-wish-open><span>♡</span><small>উইশলিস্ট</small><i class="badge" id="wishCount">০</i></a>
        <a href="#" class="act" data-cart-open aria-label="কার্ট"><span>🛒</span><small class="only-d">কার্ট</small><i class="badge" id="cartCount">০</i></a>
      </nav>
    </div>
    <nav class="catbar"><ul class="wrap catbar__in"><li class="cm"><a href="#/shop">☰ সব পণ্য</a></li>${catMenu}</ul></nav>
  </header>

  <main id="view" tabindex="-1"></main>

  <footer class="ft">
    <div class="wrap ft__grid">
      <div class="ft__brand">
        <a class="logo logo--light" href="#/"><span class="logo__mark">স</span><span class="logo__txt"><b>${D.name}</b></span></a>
        <p>সরাসরি কৃষক ও উৎপাদকের কাছ থেকে সংগ্রহ করা খাঁটি খাবার, আপনার দরজায়।</p>
        <p>📍 মিরপুর-১০, ঢাকা<br>📞 ${bn(D.hotline)}<br>✉️ support@example.com</p>
        <div class="apps"><span>▶ Google Play</span><span> App Store</span></div>
      </div>
      <div><h4>তথ্য</h4><a href="#/page/about">আমাদের সম্পর্কে</a><a href="#/page/contact">যোগাযোগ</a><a href="#/page/terms">শর্তাবলী</a><a href="#/page/privacy">প্রাইভেসি পলিসি</a></div>
      <div><h4>কেনাকাটা</h4>${D.categories.slice(1).map((c) => `<a href="#/c/${c.id}">${c.name}</a>`).join("")}</div>
      <div><h4>সহায়তা</h4><a href="#/page/how">কীভাবে অর্ডার করবেন</a><a href="#/track">অর্ডার ট্র্যাকিং</a><a href="#/page/shipping">ডেলিভারি পলিসি</a><a href="#/page/faq">সাধারণ জিজ্ঞাসা</a></div>
      <div><h4>নীতিমালা</h4><a href="#/page/return">রিটার্ন পলিসি</a><a href="#/page/refund">রিফান্ড পলিসি</a><a href="#/page/cancel">অর্ডার বাতিল</a></div>
    </div>
    <div class="wrap ft__pay"><span>পেমেন্ট:</span><b>ক্যাশ অন ডেলিভারি</b><b class="bk">বিকাশ</b><b class="ng">নগদ</b><b>VISA</b><b>Mastercard</b></div>
    <div class="wrap ft__bottom">© ${D.name} · ডেমো by <a href="${MAIN}">ShopShuru</a> · <a href="../credits.html">ছবি ক্রেডিট</a></div>
  </footer>

  <nav class="bnav" id="bnav">
    <a href="#/" data-nav="home"><span>🏠</span>হোম</a>
    <a href="#" id="bnMenu"><span>☰</span>মেনু</a>
    <a href="#" data-cart-open><span>🛒<i class="badge" id="cartCount2">০</i></span>কার্ট</a>
    <a href="#" id="bnSearch"><span>🔍</span>সার্চ</a>
    <a href="#/track" data-nav="track"><span>👤</span>অ্যাকাউন্ট</a>
  </nav>
  <div class="floats" id="floats">
    <a class="fl fl--wa" href="https://wa.me/${D.whatsapp}" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>
    <a class="fl fl--call" href="tel:${D.hotline}" aria-label="কল করুন">📞</a>
  </div>
  <button class="pill" id="pill" data-cart-open aria-label="কার্ট খুলুন"><span>🛍️</span><b id="pillQty">০ টি পণ্য</b><em id="pillSum">৳০</em></button>

  <div class="ov" id="ov"></div>
  <aside class="drawer drawer--left" id="menu" aria-label="মেনু">
    <div class="drawer__head"><b>মেনু</b><button data-close aria-label="বন্ধ">✕</button></div>
    <a href="#" class="signin" data-demo-login><b>হ্যালো!</b> সাইন ইন করুন →</a>
    <div class="mlist">${D.categories.map((c) => `<details><summary><a href="#/c/${c.id}">${c.icon} ${c.name}</a></summary>${(c.subs || []).map((s) => `<a href="#/c/${c.id}?sub=${encodeURIComponent(s)}">${s}</a>`).join("")}</details>`).join("")}</div>
    <div class="mlinks"><a href="#/shop">সব পণ্য</a><a href="#/track">অর্ডার ট্র্যাক করুন</a><a href="#/page/faq">সাধারণ জিজ্ঞাসা</a><a href="tel:${D.hotline}">📞 ${bn(D.hotline)}</a></div>
  </aside>
  <aside class="drawer drawer--right" id="cartD" aria-label="শপিং কার্ট">
    <div class="drawer__head"><b>শপিং কার্ট</b><button data-close aria-label="বন্ধ">✕</button></div>
    <div class="fd" id="fdBar"></div>
    <div class="cd__items" id="cdItems"></div>
    <div class="cd__up" id="cdUp"></div>
    <div class="cd__foot"><div class="row"><span>সাবটোটাল</span><b id="cdSub">৳০</b></div><a href="#/checkout" class="btn btn--p btn--block" id="cdGo">চেকআউট করুন →</a></div>
  </aside>
  <div class="sheet" id="sheet"><div class="wrap"><form id="sheetForm" class="search search--sheet"><input id="q2" type="search" placeholder="পণ্য খুঁজুন..." autocomplete="off" aria-label="পণ্য খুঁজুন"/><button aria-label="খুঁজুন">🔍</button></form><div id="q2Drop" class="search__drop search__drop--sheet"></div></div></div>
  <div class="toast" id="toast" role="status"></div>`;

  // ---------------- UI helpers ----------------
  let tt;
  function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2300); }
  function openPanel(id) { closePanels(); $("#" + id).classList.add("open"); $("#ov").classList.add("open"); document.body.classList.add("lock"); }
  function closePanels() { $$(".drawer.open,.sheet.open").forEach((e) => e.classList.remove("open")); $("#ov").classList.remove("open"); document.body.classList.remove("lock"); }

  function syncCartUI() {
    const q = cartQty(), s = cartSub();
    $("#cartCount").textContent = $("#cartCount2").textContent = bn(q);
    $("#pillQty").textContent = bn(q) + " টি পণ্য"; $("#pillSum").textContent = tk(s);
    $("#wishCount").textContent = bn(wish.length);
    const left = D.freeDeliveryOver - s;
    $("#fdBar").innerHTML = cart.length ? (left > 0
      ? `<p>আর <b>${tk(left)}</b> কিনলে <b>ফ্রি ডেলিভারি</b> 🚚</p><div class="fd__bar"><i style="width:${Math.min(100, (s / D.freeDeliveryOver) * 100)}%"></i></div>`
      : `<p>🎉 আপনি <b>ফ্রি ডেলিভারি</b> পাচ্ছেন!</p><div class="fd__bar"><i style="width:100%"></i></div>`) : "";
    $("#cdItems").innerHTML = cart.length ? cart.map((i) => { const p = P[i.id], x = vr(p, i.v); return `
      <div class="ci"><img src="${D.img(p.id)}" alt="" width="60" height="60"><div class="ci__info"><a href="#/p/${p.id}">${p.name}</a><small>${i.v}</small>
        <div class="ci__row"><div class="qty"><button data-q="${keyOf(i)}" data-d="-1" aria-label="কমান">−</button><span>${bn(i.q)}</span><button data-q="${keyOf(i)}" data-d="1" aria-label="বাড়ান">+</button></div><b>${tk(x[1] * i.q)}</b></div></div>
        <button class="ci__x" data-q="${keyOf(i)}" data-d="-999" aria-label="সরান">✕</button></div>`; }).join("")
      : `<div class="empty"><div>🛒</div><p>আপনার কার্ট খালি</p><a href="#/shop" class="btn btn--o">কেনাকাটা শুরু করুন</a></div>`;
    // contextual upsell: same categories as cart, not already in cart
    const cats = new Set(cart.map((i) => P[i.id].cat));
    const up = D.products.filter((p) => p.stock && !qtyIn(p.id) && (cats.has(p.cat) || p.flags.includes("best"))).slice(0, 6);
    $("#cdUp").innerHTML = cart.length && up.length ? `<h5>এর সাথে নিতে পারেন</h5><div class="up">${up.map((p) => `
      <div class="up__c"><img src="${D.img(p.id)}" alt="" width="64" height="64"><small>${p.name}</small><b>${tk(p.price)}</b><button data-add="${p.id}" data-quiet>+ যোগ</button></div>`).join("")}</div>` : "";
    $("#cdSub").textContent = tk(s);
    $("#cdGo").classList.toggle("disabled", !cart.length);
    $$("[data-card-qty]").forEach((el) => { el.outerHTML = cardBtns(P[el.dataset.cardQty]); });
  }

  // ---------------- components ----------------
  const cardBtns = (p) => {
    if (!p.stock) return `<div class="cbtn" data-card-qty="${p.id}"><button class="btn btn--o btn--block" disabled>স্টক শেষ</button></div>`;
    const q = qtyIn(p.id); const k = p.id + "|" + p.variants[0][0];
    return q ? `<div class="cbtn" data-card-qty="${p.id}"><div class="qty qty--card"><button data-q="${k}" data-d="-1" aria-label="কমান">−</button><span>${bn(q)} টি কার্টে</span><button data-q="${k}" data-d="1" aria-label="বাড়ান">+</button></div></div>`
      : `<div class="cbtn" data-card-qty="${p.id}"><button class="btn btn--o btn--block" data-add="${p.id}">🛒 কার্টে যোগ করুন</button></div>`;
  };
  const card = (p) => { const sv = p.old ? Math.round((1 - p.price / p.old) * 100) : 0; const f = p.flags[0];
    return `<article class="card">
      <a class="card__img" href="#/p/${p.id}">${f ? `<span class="flag ${FLAG[f][1]}">${FLAG[f][0]}</span>` : ""}${sv ? `<span class="save">${bn(sv)}% ছাড়</span>` : ""}
        <img src="${D.img(p.id)}" alt="${esc(p.name)}" loading="lazy" width="400" height="400">${p.stock ? "" : `<span class="oos">স্টক শেষ</span>`}</a>
      <div class="card__b"><a class="card__n" href="#/p/${p.id}">${p.name}</a>
        <div class="card__m">${stars(p.rating)}<small>(${bn(p.reviews)})</small> · <small>${p.variants[0][0]}</small></div>
        <div class="price">${tk(p.price)}${p.old ? ` <del>${tk(p.old)}</del>` : ""}</div>${cardBtns(p)}</div></article>`; };
  const rail = (items, id) => `<div class="rail" data-rail><button class="rail__btn rail__btn--l" data-scroll="-1" aria-label="আগে">‹</button><div class="rail__t">${items}</div><button class="rail__btn rail__btn--r" data-scroll="1" aria-label="পরে">›</button></div>`;
  const head = (t, link) => `<div class="sh"><h2>${t}</h2>${link ? `<a href="${link}">সব দেখুন →</a>` : ""}</div>`;
  const crumbs = (arr) => `<nav class="crumbs wrap" aria-label="breadcrumb"><a href="#/">হোম</a>${arr.map(([t, h]) => ` › ${h ? `<a href="${h}">${t}</a>` : `<span>${t}</span>`}`).join("")}</nav>`;

  // ---------------- pages ----------------
  let slideT, flashT, pdIO;
  function home() {
    const best = D.products.filter((p) => p.flags.includes("best"));
    const flash = D.products.filter((p) => p.old).slice(0, 4);
    return `
    <section class="wrap hero">
      <div class="slider" id="slider">${D.slides.map((s, i) => `
        <a class="slide ${i ? "" : "on"}" href="#/p/${s.pid}" style="--sbg:${s.bg}"><div class="slide__c"><small>${s.kicker}</small><h1>${s.title}</h1><p>${s.sub}</p><span class="btn btn--w">এখনই কিনুন</span></div>
          <img src="${D.img(s.pid)}" alt="" width="800" height="800"></a>`).join("")}
        <div class="dots">${D.slides.map((_, i) => `<button data-dot="${i}" class="${i ? "" : "on"}" aria-label="স্লাইড ${bn(i + 1)}"></button>`).join("")}</div>
      </div>
      <a class="side" href="#/c/dates"><img src="${D.img("d1")}" alt="" width="800" height="800"><div><small>রমজান প্রস্তুতি</small><b>প্রিমিয়াম খেজুর</b><span>১০% পর্যন্ত ছাড় →</span></div></a>
    </section>

    <section class="wrap usp"><div>🚚<span><b>সারাদেশে ডেলিভারি</b><small>ঢাকায় ২৪-৪৮ ঘণ্টা</small></span></div><div>💵<span><b>ক্যাশ অন ডেলিভারি</b><small>পণ্য হাতে পেয়ে টাকা</small></span></div><div>✅<span><b>১০০% খাঁটি</b><small>ল্যাব টেস্টেড পণ্য</small></span></div><div>↩️<span><b>সহজ রিটার্ন</b><small>৩ দিনের মধ্যে</small></span></div></section>

    <section class="wrap blk">${head("জনপ্রিয় ক্যাটাগরি")}
      ${rail(D.categories.slice(1).map((c) => { const p = D.products.find((x) => x.cat === c.id); return `<a class="cat" href="#/c/${c.id}"><img src="${D.img(p.id)}" alt="" loading="lazy" width="200" height="200"><b>${c.name}</b><small>${bn(D.products.filter((x) => x.cat === c.id).length)} টি পণ্য</small></a>`; }).join(""))}</section>

    <section class="wrap blk"><div class="flash"><div class="flash__h"><h2>⚡ আজকের ফ্ল্যাশ সেল</h2><div class="timer" id="flashT" aria-label="অফার শেষ হতে বাকি"></div><a href="#/c/offer">সব অফার →</a></div>
      <div class="grid grid--4">${flash.map((p, i) => card(p).replace('<div class="price">', `<div class="sold"><i style="width:${[72, 45, 88, 60][i]}%"></i></div><small class="soldt">${bn([72, 45, 88, 60][i])}% বিক্রি হয়েছে</small><div class="price">`)).join("")}</div></div></section>

    <section class="wrap blk">${head("সবচেয়ে বেশি বিক্রি", "#/shop?flag=best")}<div class="grid grid--5">${best.map(card).join("")}</div></section>

    <section class="wrap blk">${head("আমাদের ব্র্যান্ড")}${rail(D.brands.map((b) => `<a class="brand" href="#/shop?brand=${b.id}" style="--c:${b.color}"><span>${b.name}</span></a>`).join(""))}</section>

    ${D.rows.map((r, i) => `<section class="wrap blk">${head(r.title, "#/c/" + r.cat)}${rail(D.products.filter((p) => p.cat === r.cat).map(card).join(""))}</section>
      ${i === 0 ? `<section class="wrap blk"><a class="wide" href="#/c/oil"><div><small>রান্নায় খাঁটি স্বাদ</small><h2>ঘানি ভাঙা তেল ও গাওয়া ঘি</h2><span class="btn btn--w">দেখুন →</span></div><img src="${D.img("o1")}" alt="" loading="lazy" width="800" height="800"><img src="${D.img("e1")}" alt="" loading="lazy" width="800" height="800"></a></section>` : ""}`).join("")}

    <section class="wrap blk">${head("আপনার জন্য")}<div class="grid grid--5" id="jfy">${D.products.slice(0, 10).map(card).join("")}</div>
      <div class="center"><button class="btn btn--o" id="more">আরও দেখুন ↓</button></div></section>

    <section class="wrap blk">${head("কাস্টমারদের মতামত <small class='muted'>(ডেমো)</small>")}${rail(D.testimonials.map(([n, r, t]) => `<figure class="tst"><div class="stars">★★★★★</div><blockquote>“${t}”</blockquote><figcaption><span class="av">${n[0]}</span><span><b>${n}</b><small>${r}</small></span></figcaption></figure>`).join(""))}</section>`;
  }
  function afterHome() {
    let cur = 0; const sl = $$(".slide"), dots = $$(".dots button");
    const go = (i) => { cur = (i + sl.length) % sl.length; sl.forEach((s, k) => s.classList.toggle("on", k === cur)); dots.forEach((s, k) => s.classList.toggle("on", k === cur)); };
    dots.forEach((d) => d.onclick = (e) => { e.preventDefault(); go(+d.dataset.dot); });
    slideT = setInterval(() => go(cur + 1), 5000);
    const tick = () => { const n = new Date(), e = new Date(n); e.setHours(24, 0, 0, 0); const s = Math.floor((e - n) / 1000); const el = $("#flashT"); if (!el) return;
      el.innerHTML = [[Math.floor(s / 3600), "ঘণ্টা"], [Math.floor((s % 3600) / 60), "মিনিট"], [s % 60, "সেকেন্ড"]].map(([v, l]) => `<span><b>${bn(String(v).padStart(2, "0"))}</b><small>${l}</small></span>`).join(""); };
    tick(); flashT = setInterval(tick, 1000);
    $("#more").onclick = (e) => { $("#jfy").insertAdjacentHTML("beforeend", D.products.slice(10).map(card).join("")); e.target.remove(); };
  }

  // ----- listing (category / shop / search) with instant filters -----
  let F = {};
  function listing(mode, arg, qs) {
    const base = mode === "cat" ? D.products.filter((p) => inCat(p, arg)) : mode === "search" ? search(arg).prods : D.products;
    const c = mode === "cat" ? CAT[arg] : null;
    const prices = base.map((p) => p.price); const maxP = Math.max(100, ...prices);
    F = { base, sub: new Set(qs.getAll("sub")), brand: new Set(qs.getAll("brand")), flag: new Set(qs.getAll("flag")), max: maxP, cap: maxP, sort: "default", per: 12, page: 1 };
    const subs = [...new Set(base.map((p) => p.sub))], brands = [...new Set(base.map((p) => p.brand))];
    const title = mode === "cat" ? c.name : mode === "search" ? `“${esc(arg)}” এর জন্য ফলাফল` : "সব পণ্য";
    const box = (name, items, key, label) => items.length ? `<details class="fbox" open><summary>${name}</summary>${items.map((v) => `<label><input type="checkbox" data-f="${key}" value="${v}" ${F[key].has(v) ? "checked" : ""}> ${label(v)} <small>(${bn(base.filter((p) => key === "flag" ? p.flags.includes(v) : p[key] === v).length)})</small></label>`).join("")}</details>` : "";
    return `${crumbs(mode === "cat" ? [[c.name]] : [[title]])}
    <section class="wrap lst">
      <aside class="filters" id="filters" aria-label="ফিল্টার">
        <div class="filters__h only-m"><b>ফিল্টার</b><button data-close-f aria-label="বন্ধ">✕</button></div>
        ${box("ক্যাটাগরি", subs, "sub", (v) => v)}
        <details class="fbox" open><summary>দাম</summary><input type="range" id="fPrice" min="0" max="${maxP}" step="10" value="${maxP}" aria-label="সর্বোচ্চ দাম"><div class="prange"><span>৳০</span><b id="fPriceV">${tk(maxP)} পর্যন্ত</b></div></details>
        ${box("ব্র্যান্ড", brands, "brand", (v) => BR[v].name)}
        ${box("ধরন", Object.keys(FLAG).filter((f) => base.some((p) => p.flags.includes(f))), "flag", (v) => FLAG[v][0])}
        <button class="btn btn--p btn--block only-m" data-close-f>ফলাফল দেখুন</button>
      </aside>
      <div class="lst__main">
        <div class="lst__top"><div><h1>${title}</h1><small class="muted" id="count"></small></div>
          <div class="tools"><button class="btn btn--o only-m" id="openF">⚙ ফিল্টার</button>
            <label class="sel">সাজান <select id="sort"><option value="default">ডিফল্ট</option><option value="pop">জনপ্রিয়</option><option value="new">নতুন</option><option value="low">দাম: কম → বেশি</option><option value="high">দাম: বেশি → কম</option><option value="off">বেশি ছাড়</option></select></label></div></div>
        <div class="chips" id="chips"></div>
        <div class="grid grid--4" id="lgrid"></div>
        <div class="pager" id="pager"></div>
      </div>
    </section>`;
  }
  function applyF() {
    let r = F.base.filter((p) => (!F.sub.size || F.sub.has(p.sub)) && (!F.brand.size || F.brand.has(p.brand)) && (!F.flag.size || p.flags.some((f) => F.flag.has(f))) && p.price <= F.max);
    const s = { pop: (a, b) => b.reviews - a.reviews, new: (a, b) => (b.flags.includes("new") ? 1 : 0) - (a.flags.includes("new") ? 1 : 0), low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, off: (a, b) => (b.old ? 1 - b.price / b.old : 0) - (a.old ? 1 - a.price / a.old : 0) }[F.sort];
    if (s) r = [...r].sort(s);
    const pages = Math.max(1, Math.ceil(r.length / F.per)); F.page = Math.min(F.page, pages);
    $("#count").textContent = `${bn(r.length)} টি পণ্য পাওয়া গেছে`;
    $("#lgrid").innerHTML = r.length ? r.slice((F.page - 1) * F.per, F.page * F.per).map(card).join("") : `<div class="empty empty--wide"><div>🔍</div><p>এই ফিল্টারে কোনো পণ্য নেই।</p><button class="btn btn--o" data-clear>সব ফিল্টার মুছুন</button></div>`;
    const chips = [...[...F.sub].map((v) => ["sub", v, v]), ...[...F.brand].map((v) => ["brand", v, BR[v].name]), ...[...F.flag].map((v) => ["flag", v, FLAG[v][0]]), ...(F.max < F.cap ? [["max", "", tk(F.max) + " পর্যন্ত"]] : [])];
    $("#chips").innerHTML = chips.length ? chips.map(([k, v, l]) => `<button class="chip" data-chip="${k}" data-v="${esc(v)}">${l} ✕</button>`).join("") + `<button class="chip chip--clear" data-clear>সব মুছুন</button>` : "";
    $("#pager").innerHTML = pages > 1 ? [...Array(pages)].map((_, i) => `<button class="${i + 1 === F.page ? "on" : ""}" data-page="${i + 1}">${bn(i + 1)}</button>`).join("") : "";
  }
  function afterListing() {
    $$("[data-f]").forEach((i) => i.onchange = () => { F[i.dataset.f][i.checked ? "add" : "delete"](i.value); F.page = 1; applyF(); });
    $("#fPrice").oninput = (e) => { F.max = +e.target.value; $("#fPriceV").textContent = tk(F.max) + " পর্যন্ত"; applyF(); };
    $("#sort").onchange = (e) => { F.sort = e.target.value; applyF(); };
    $("#openF").onclick = () => { $("#filters").classList.add("open"); $("#ov").classList.add("open"); document.body.classList.add("lock"); };
    applyF();
  }

  // ----- product page -----
  function product(id) {
    const p = P[id]; if (!p) return notFound();
    const c = CAT[p.cat], b = BR[p.brand];
    const rel = D.products.filter((x) => x.cat === p.cat && x.id !== p.id).concat(D.products.filter((x) => x.flags.includes("best") && x.cat !== p.cat)).slice(0, 8);
    const waText = encodeURIComponent(`আসসালামু আলাইকুম, আমি অর্ডার করতে চাই:\n${p.name} (${p.variants[0][0]})\n${location.href}`);
    return `${crumbs([[c.name, "#/c/" + c.id], [p.name]])}
    <section class="wrap pd">
      <div class="pd__gal"><div class="pd__main">${p.old ? `<span class="save save--lg">${bn(Math.round((1 - p.price / p.old) * 100))}% ছাড়</span>` : ""}<img src="${D.img(p.id)}" alt="${esc(p.name)}" width="800" height="800"></div></div>
      <div class="pd__info">
        <a class="bchip" href="#/shop?brand=${b.id}" style="--c:${b.color}">${b.name}</a>
        <h1>${p.name}</h1>
        <div class="pd__meta">${stars(p.rating)} <b>${bn(p.rating)}</b> <a href="#rev" data-tab-go="rev">(${bn(p.reviews)} রিভিউ)</a> · ${p.stock ? `<span class="in">✓ স্টকে আছে${p.stock < 10 ? ` — মাত্র ${bn(p.stock)} টি বাকি` : ""}</span>` : `<span class="out">✕ স্টক শেষ</span>`}</div>
        <div class="pd__price"><b id="pdP"></b><del id="pdO"></del><span class="savepill" id="pdS"></span></div>
        <div class="pd__opt"><span>সাইজ:</span>${p.variants.map((v, i) => `<button class="vbtn ${i ? "" : "on"}" data-v="${v[0]}">${v[0]}</button>`).join("")}</div>
        <div class="pd__qty"><span>পরিমাণ:</span><div class="qty qty--lg"><button id="pdDec" aria-label="কমান">−</button><span id="pdQ">১</span><button id="pdInc" aria-label="বাড়ান">+</button></div><button class="heart ${wish.includes(p.id) ? "on" : ""}" data-wish="${p.id}" aria-label="উইশলিস্ট">♡</button></div>
        <div class="pd__btns">
          <button class="btn btn--p" id="pdAdd" ${p.stock ? "" : "disabled"}>🛒 কার্টে যোগ করুন</button>
          <button class="btn btn--d" id="pdBuy" ${p.stock ? "" : "disabled"}>⚡ এখনই কিনুন</button>
          <a class="btn btn--wa" href="https://wa.me/${D.whatsapp}?text=${waText}" target="_blank" rel="noopener">💬 WhatsApp-এ অর্ডার</a>
          <a class="btn btn--call" href="tel:${D.hotline}">📞 কল করে অর্ডার</a>
        </div>
        <ul class="pd__info2"><li>🚚 ঢাকা ও চট্টগ্রাম শহরে ${tk(D.delivery.cityCharge)} (১-২ দিন), অন্যান্য জেলায় ${tk(D.delivery.outsideCharge)} (২-৪ দিন)</li><li>🎁 ${tk(D.freeDeliveryOver)}+ অর্ডারে ফ্রি ডেলিভারি</li><li>💵 পণ্য হাতে পেয়ে টাকা পরিশোধ</li><li>↩️ ৩ দিনের মধ্যে সহজ রিটার্ন</li></ul>
      </div>
    </section>
    <section class="wrap pd__tabs">
      <div class="tabs" role="tablist"><button class="on" data-tab="desc" role="tab">বিবরণ</button><button data-tab="rev" role="tab" id="rev">রিভিউ (${bn(p.reviews)})</button></div>
      <div class="tabp" data-panel="desc"><h3>পণ্যের বিবরণ</h3><p>${p.name} — সরাসরি উৎস থেকে সংগ্রহ করা, কোনো কেমিক্যাল বা প্রিজারভেটিভ ছাড়া। প্রতিটি ব্যাচ মান যাচাই করে প্যাক করা হয়।</p>
        <ul><li>১০০% প্রাকৃতিক ও খাঁটি</li><li>ফুড গ্রেড প্যাকেজিং</li><li>ঠান্ডা ও শুকনো স্থানে সংরক্ষণ করুন</li></ul><p class="muted">ক্যাটাগরি: ${c.name} · ধরন: ${p.sub} · ব্র্যান্ড: ${b.name}</p></div>
      <div class="tabp" data-panel="rev" hidden><div class="revsum"><b>${bn(p.rating)}</b>${stars(p.rating)}<small>${bn(p.reviews)} টি রিভিউ (ডেমো)</small></div>
        ${D.testimonials.slice(0, 2).map(([n, , t]) => `<div class="rev"><div class="stars">★★★★★</div><p>${t}</p><small>— ${n} · ✓ যাচাইকৃত ক্রেতা</small></div>`).join("")}
        <p class="muted">রিভিউ দিতে অর্ডার করা পণ্যে লগইন করুন (ডেমোতে বন্ধ)।</p></div>
    </section>
    <section class="wrap blk">${head("সম্পর্কিত পণ্য")}${rail(rel.map(card).join(""))}</section>
    <div class="sbar" id="sbar"><div><small>${p.name}</small><b id="sbP"></b></div><button class="btn btn--p" id="sbAdd" ${p.stock ? "" : "disabled"}>কার্টে যোগ</button><button class="btn btn--d" id="sbBuy" ${p.stock ? "" : "disabled"}>এখনই কিনুন</button></div>`;
  }
  function afterProduct(id) {
    const p = P[id]; if (!p) return; let v = p.variants[0][0], q = 1;
    const upd = () => { const x = vr(p, v); $("#pdP").textContent = $("#sbP").textContent = tk(x[1] * q); $("#pdO").textContent = x[2] ? tk(x[2] * q) : ""; $("#pdS").textContent = x[2] ? `${tk((x[2] - x[1]) * q)} সাশ্রয়` : ""; $("#pdS").hidden = !x[2]; $("#pdQ").textContent = bn(q); };
    $$(".vbtn").forEach((b) => b.onclick = () => { v = b.dataset.v; $$(".vbtn").forEach((x) => x.classList.toggle("on", x === b)); upd(); });
    $("#pdDec").onclick = () => { q = Math.max(1, q - 1); upd(); }; $("#pdInc").onclick = () => { q = Math.min(20, q + 1); upd(); };
    const add = () => addToCart(id, v, q); const buy = () => { addToCart(id, v, q, true); location.hash = "#/checkout"; };
    $("#pdAdd").onclick = $("#sbAdd").onclick = add; $("#pdBuy").onclick = $("#sbBuy").onclick = buy;
    upd();
    pdIO = new IntersectionObserver(([e]) => { const sb = $("#sbar"); if (sb) sb.classList.toggle("show", !e.isIntersecting && e.boundingClientRect.top < 0); });
    pdIO.observe($(".pd__btns"));
  }

  // ----- checkout -----
  let CO = {};
  function checkout() {
    if (!cart.length) return `<section class="wrap blk"><div class="empty empty--wide"><div>🛒</div><h2>আপনার কার্ট খালি</h2><p>চেকআউট করতে আগে কিছু পণ্য কার্টে যোগ করুন।</p><a href="#/shop" class="btn btn--p">কেনাকাটা শুরু করুন</a></div></section>`;
    CO = { district: "", thana: "", express: false, pay: "cod", plan: 100, coupon: null };
    return `${crumbs([["চেকআউট"]])}
    <form class="wrap co" id="coForm" novalidate>
      <div class="co__l">
        <section class="box"><h2>১. অর্ডার রিভিউ</h2><div id="coItems"></div></section>
        <section class="box"><h2>২. ডেলিভারি ঠিকানা</h2>
          <div class="f2"><label>পূর্ণ নাম *<input name="name" required autocomplete="name" placeholder="আপনার নাম"></label>
            <label>মোবাইল নম্বর *<span class="ph"><i>+৮৮</i><input name="phone" required inputmode="numeric" maxlength="11" autocomplete="tel" placeholder="01XXXXXXXXX"></span><small class="err" id="phErr" hidden>সঠিক ১১ সংখ্যার নম্বর দিন (যেমন 017XXXXXXXX)</small></label></div>
          <p class="consent">ℹ️ অর্ডার সম্পন্ন না করলে অর্ডারে সহায়তার জন্য আমরা এই নম্বরে কল করতে পারি।</p>
          <label>ইমেইল (ঐচ্ছিক)<input name="email" type="email" autocomplete="email" placeholder="you@example.com"></label>
          <div class="f2"><label>জেলা *<select name="district" required><option value="">জেলা বাছাই করুন</option>${D.districts.map((d) => `<option>${d}</option>`).join("")}</select></label>
            <label>থানা / উপজেলা<select name="thana" disabled><option value="">আগে জেলা বাছাই করুন</option></select></label></div>
          <label>সম্পূর্ণ ঠিকানা *<textarea name="addr" required rows="2" placeholder="বাসা নং, রোড, এলাকা"></textarea></label>
          <div class="preview" id="addrPrev" hidden><small>আপনার ঠিকানা</small><p></p></div>
          <label>বিশেষ নির্দেশনা (ঐচ্ছিক)<textarea name="note" rows="2" maxlength="120" placeholder="যেমন: বিকেলে ডেলিভারি দিন"></textarea><small class="muted" id="noteC">০/১২০</small></label>
        </section>
      </div>
      <div class="co__r">
        <section class="box"><h2>৩. ডেলিভারি</h2><div id="shipOpts"><p class="muted">ডেলিভারি চার্জ দেখতে জেলা বাছাই করুন (${tk(D.delivery.cityCharge)} থেকে শুরু)।</p></div></section>
        <section class="box"><h2>৪. পেমেন্ট</h2>
          <div class="tiles">
            <label class="tile"><input type="radio" name="pay" value="cod" checked><span>💵<b>ক্যাশ অন ডেলিভারি</b><small>পণ্য হাতে পেয়ে টাকা দিন</small></span></label>
            <label class="tile"><input type="radio" name="pay" value="bkash"><span><b class="bk">বিকাশ</b><small>বিকাশে এখনই পেমেন্ট</small></span></label>
            <label class="tile"><input type="radio" name="pay" value="online"><span>💳<b>অনলাইন পেমেন্ট</b><small>কার্ড / নগদ / অন্যান্য</small></span></label>
          </div>
          <div id="plan" hidden><p class="muted">কত টাকা এখন দেবেন?</p><div class="tiles tiles--row">
            <label class="tile tile--s"><input type="radio" name="plan" value="50"><span><b>৫০% অগ্রিম</b></span></label>
            <label class="tile tile--s"><input type="radio" name="plan" value="100" checked><span><b>পুরো টাকা</b><small>২% ছাড়</small></span></label></div></div>
        </section>
        <section class="box">
          <details class="coupon"><summary>🎟️ কুপন কোড আছে?</summary><div class="coupon__in"><input id="cpn" placeholder="যেমন: SHOTEJ10" aria-label="কুপন কোড"><button type="button" class="btn btn--o" id="cpnBtn">প্রয়োগ</button></div><small class="muted">ডেমো কুপন: SHOTEJ10 (১০% ছাড়)</small></details>
          <div class="tot" id="tot"></div>
          <label class="terms"><input type="checkbox" name="terms" required> আমি <a href="#/page/terms" target="_blank">শর্তাবলী</a> ও <a href="#/page/return" target="_blank">রিটার্ন পলিসি</a> পড়েছি এবং সম্মত</label>
          <small class="err" id="coErr" hidden></small>
          <button class="btn btn--p btn--block btn--lg only-d" type="submit">অর্ডার কনফার্ম করুন →</button>
          <p class="muted small">🔒 ডেমো — কোনো আসল অর্ডার হবে না</p>
        </section>
      </div>
      <div class="cobar only-m"><div><small>সর্বমোট</small><b id="barTot"></b></div><button class="btn btn--p" type="submit">অর্ডার কনফার্ম করুন</button></div>
    </form>`;
  }
  function coCalc() {
    const sub = cartSub(); const city = D.delivery.city.includes(CO.district);
    let ship = CO.district ? (city ? D.delivery.cityCharge : D.delivery.outsideCharge) : null;
    if (ship != null && CO.express) ship = D.delivery.expressCharge;
    if (ship != null && sub >= D.freeDeliveryOver && !CO.express) ship = 0;
    const disc = (CO.coupon ? Math.round(sub * 0.1) : 0) + (CO.pay !== "cod" && CO.plan === 100 ? Math.round(sub * 0.02) : 0);
    const total = sub + (ship || 0) - disc; const adv = CO.pay === "cod" ? 0 : Math.round((total * CO.plan) / 100);
    return { sub, ship, disc, total, adv, due: total - adv };
  }
  function renderCO() {
    if (!$("#coForm")) return;
    $("#coItems").innerHTML = cart.map((i) => { const p = P[i.id], x = vr(p, i.v); return `<div class="ci ci--co"><img src="${D.img(p.id)}" alt="" width="56" height="56"><div class="ci__info"><b>${p.name}</b><small>${i.v} · ${tk(x[1])}</small></div>
      <div class="qty"><button type="button" data-q="${keyOf(i)}" data-d="-1" aria-label="কমান">−</button><span>${bn(i.q)}</span><button type="button" data-q="${keyOf(i)}" data-d="1" aria-label="বাড়ান">+</button></div><b class="lt">${tk(x[1] * i.q)}</b><button type="button" class="ci__x" data-q="${keyOf(i)}" data-d="-999" aria-label="সরান">🗑</button></div>`; }).join("");
    const t = coCalc();
    $("#shipOpts").innerHTML = CO.district ? `<label class="tile tile--s"><input type="radio" name="exp" value="0" ${CO.express ? "" : "checked"}><span><b>স্ট্যান্ডার্ড ডেলিভারি</b><small>${D.delivery.city.includes(CO.district) ? "১-২ দিন" : "২-৪ দিন"}</small></span><em>${t.sub >= D.freeDeliveryOver ? "ফ্রি" : tk(D.delivery.city.includes(CO.district) ? D.delivery.cityCharge : D.delivery.outsideCharge)}</em></label>
      ${D.delivery.expressDistricts.includes(CO.district) ? `<label class="tile tile--s"><input type="radio" name="exp" value="1" ${CO.express ? "checked" : ""}><span><b>⚡ এক্সপ্রেস ডেলিভারি</b><small>আজই (দুপুর ২টার আগে অর্ডারে)</small></span><em>${tk(D.delivery.expressCharge)}</em></label>` : ""}`
      : `<p class="muted">ডেলিভারি চার্জ দেখতে জেলা বাছাই করুন (${tk(D.delivery.cityCharge)} থেকে শুরু)।</p>`;
    $$("[name=exp]").forEach((r) => r.onchange = () => { CO.express = r.value === "1"; renderCO(); });
    $("#tot").innerHTML = `<div class="row"><span>সাবটোটাল</span><b>${tk(t.sub)}</b></div>
      <div class="row"><span>ডেলিভারি চার্জ</span><b>${t.ship == null ? "জেলা বাছাই করুন" : t.ship ? tk(t.ship) : "ফ্রি"}</b></div>
      ${t.disc ? `<div class="row row--g"><span>ছাড়</span><b>−${tk(t.disc)}</b></div>` : ""}
      <div class="row row--t"><span>সর্বমোট</span><b>${tk(t.total)}</b></div>
      ${t.adv ? `<div class="row row--g"><span>এখন পেমেন্ট</span><b>${tk(t.adv)}</b></div><div class="row"><span>ডেলিভারিতে বাকি</span><b>${tk(t.due)}</b></div>` : ""}`;
    $("#barTot").textContent = tk(t.total);
  }
  function afterCheckout() {
    const f = $("#coForm"); if (!f) return;
    renderCO();
    const prev = () => { const a = [f.addr.value.trim(), CO.thana, CO.district].filter(Boolean).join(", "); $("#addrPrev").hidden = !a; $("#addrPrev p").textContent = a; };
    f.district.onchange = () => { CO.district = f.district.value; CO.express = false; const th = D.thanas[CO.district] || ["সদর", "অন্যান্য"];
      f.thana.disabled = !CO.district; f.thana.innerHTML = `<option value="">থানা বাছাই করুন</option>` + th.map((t) => `<option>${t}</option>`).join(""); CO.thana = ""; prev(); renderCO(); };
    f.thana.onchange = () => { CO.thana = f.thana.value; prev(); };
    f.addr.oninput = prev;
    f.note.oninput = () => $("#noteC").textContent = `${bn(f.note.value.length)}/১২০`;
    f.phone.oninput = () => { f.phone.value = f.phone.value.replace(/\D/g, ""); const ok = /^01[3-9]\d{8}$/.test(f.phone.value);
      $("#phErr").hidden = ok || f.phone.value.length < 11;
      if (ok) store.set("bz_draft", { phone: f.phone.value, name: f.name.value, cart, at: Date.now() }); };  // incomplete-order capture (demo: saved locally)
    $$("[name=pay]").forEach((r) => r.onchange = () => { CO.pay = r.value; $("#plan").hidden = CO.pay === "cod"; renderCO(); });
    $$("[name=plan]").forEach((r) => r.onchange = () => { CO.plan = +r.value; renderCO(); });
    $("#cpnBtn").onclick = () => { const ok = $("#cpn").value.trim().toUpperCase() === "SHOTEJ10"; CO.coupon = ok; toast(ok ? "✓ কুপন প্রয়োগ হয়েছে — ১০% ছাড়" : "কুপন কোডটি সঠিক নয়"); renderCO(); };
    f.onsubmit = (e) => { e.preventDefault();
      const errs = []; if (!f.name.value.trim()) errs.push("নাম"); if (!/^01[3-9]\d{8}$/.test(f.phone.value)) errs.push("সঠিক মোবাইল নম্বর"); if (!CO.district) errs.push("জেলা"); if (!f.addr.value.trim()) errs.push("ঠিকানা"); if (!f.terms.checked) errs.push("শর্তাবলীতে সম্মতি");
      const er = $("#coErr"); if (errs.length) { er.hidden = false; er.textContent = "দয়া করে দিন: " + errs.join(", "); er.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      const t = coCalc(); const no = String(Date.now()).slice(-6);
      const orders = store.get("bz_orders", []); orders.push({ no, phone: f.phone.value, name: f.name.value, items: cart, total: t.total, pay: CO.pay, district: CO.district, at: Date.now() }); store.set("bz_orders", orders);
      cart = []; persist(); try { localStorage.removeItem("bz_draft"); } catch (x) {} location.hash = "#/done/" + no; };
  }

  function done(no) {
    const o = store.get("bz_orders", []).find((x) => x.no === no);
    if (!o) return notFound();
    return `<section class="wrap blk"><div class="done"><div class="done__i">✓</div><h1>ধন্যবাদ, ${esc(o.name)}! অর্ডারটি গ্রহণ করা হয়েছে</h1>
      <p>অর্ডার নম্বর <b>#${bn(o.no)}</b> · সর্বমোট <b>${tk(o.total)}</b></p><p class="muted">আমাদের প্রতিনিধি শীঘ্রই ${bn(o.phone)} নম্বরে কল করে অর্ডার কনফার্ম করবেন।</p>
      <div class="demo-note"><b>এটি ডেমো ছিল।</b> আসল ওয়েবসাইটে এই মুহূর্তে কাস্টমার SMS পেত, আপনার অ্যাডমিন প্যানেলে অর্ডার আসত, ফেক অর্ডার চেক হতো আর এক ক্লিকে কুরিয়ারে বুক করা যেত।</div>
      <div class="done__b"><a class="btn btn--o" href="#/track">অর্ডার ট্র্যাক করুন</a><a class="btn btn--p" href="${MAIN}#contact">এমন ওয়েবসাইট চাই →</a></div></div></section>`;
  }

  function track() {
    return `${crumbs([["অর্ডার ট্র্যাকিং"]])}<section class="wrap blk"><div class="trk"><h1>📦 আপনার অর্ডার ট্র্যাক করুন</h1><p class="muted">অর্ডার নম্বর ও যে মোবাইল নম্বর দিয়ে অর্ডার করেছেন তা দিন।</p>
      <form id="trkF" class="trk__f"><input name="no" required inputmode="numeric" placeholder="অর্ডার নম্বর" aria-label="অর্ডার নম্বর"><input name="ph" required inputmode="numeric" maxlength="11" placeholder="01XXXXXXXXX" aria-label="মোবাইল নম্বর"><button class="btn btn--p">ট্র্যাক করুন</button></form>
      <div id="trkR"><p class="hint">💡 ডেমো: আগে একটি টেস্ট অর্ডার করুন, তারপর সেই অর্ডার নম্বর ও ফোন নম্বর দিয়ে দেখুন।</p></div></div></section>`;
  }
  function afterTrack() {
    $("#trkF").onsubmit = (e) => { e.preventDefault(); const f = e.target; const no = f.no.value.replace(/\D/g, ""), ph = f.ph.value.replace(/\D/g, "");
      const o = store.get("bz_orders", []).find((x) => x.no === no && x.phone === ph);
      if (!o) { $("#trkR").innerHTML = `<p class="err">এই নম্বর ও ফোন দিয়ে কোনো অর্ডার পাওয়া যায়নি। নম্বর দুটো আবার দেখে নিন।</p>`; return; }
      const steps = ["অর্ডার গৃহীত", "কনফার্ম করা হয়েছে", "প্যাক করা হয়েছে", "কুরিয়ারে হস্তান্তর", "ডেলিভারি সম্পন্ন"];
      $("#trkR").innerHTML = `<div class="tl"><p>অর্ডার <b>#${bn(o.no)}</b> · ${tk(o.total)} · ${o.district}</p><ol>${steps.map((s, i) => `<li class="${i < 2 ? "ok" : i === 2 ? "now" : ""}"><b>${s}</b><small>${i === 0 ? new Date(o.at).toLocaleString("bn-BD") : i === 1 ? "প্রতিনিধি কল করে কনফার্ম করেছেন (ডেমো)" : i === 3 ? "কুরিয়ার: Steadfast · কনসাইনমেন্ট আইডি পাবেন SMS-এ" : ""}</small></li>`).join("")}</ol></div>`; };
  }

  const PAGES = { about: "আমাদের সম্পর্কে", contact: "যোগাযোগ", terms: "শর্তাবলী", privacy: "প্রাইভেসি পলিসি", how: "কীভাবে অর্ডার করবেন", shipping: "ডেলিভারি পলিসি", faq: "সাধারণ জিজ্ঞাসা", return: "রিটার্ন পলিসি", refund: "রিফান্ড পলিসি", cancel: "অর্ডার বাতিল" };
  function page(slug) {
    const t = PAGES[slug]; if (!t) return notFound();
    const faq = [["ডেলিভারি চার্জ কত?", `ঢাকা ও চট্টগ্রাম শহরে ${tk(D.delivery.cityCharge)}, অন্যান্য জেলায় ${tk(D.delivery.outsideCharge)}। ঢাকায় এক্সপ্রেস ${tk(D.delivery.expressCharge)}। ${tk(D.freeDeliveryOver)}+ অর্ডারে ফ্রি।`], ["কীভাবে পেমেন্ট করব?", "ক্যাশ অন ডেলিভারি, বিকাশ, নগদ বা কার্ড।"], ["রিটার্ন করা যাবে?", "পণ্য হাতে পাওয়ার ৩ দিনের মধ্যে, ক্ষতিগ্রস্ত বা ভুল পণ্য হলে।"], ["অর্ডার কীভাবে ট্র্যাক করব?", "অর্ডার নম্বর ও মোবাইল নম্বর দিয়ে ট্র্যাকিং পেজে।"]];
    return `${crumbs([[t]])}<section class="wrap blk"><article class="cms"><h1>${t}</h1>
      ${slug === "faq" ? faq.map(([q, a]) => `<details class="fq"><summary>${q}</summary><p>${a}</p></details>`).join("")
        : `<p class="muted">এটি ডেমো পেজ। আসল ওয়েবসাইটে এই পেজের লেখা দোকানের সেটিংস থেকে স্বয়ংক্রিয়ভাবে তৈরি হয় — ফলে ডেলিভারি চার্জ, রিটার্নের সময় ও পেমেন্ট পদ্ধতি চেকআউটের সাথে সবসময় মিলে যায়।</p>
        <p>ডেলিভারি চার্জ: ঢাকা ও চট্টগ্রাম শহরে ${tk(D.delivery.cityCharge)}, অন্যান্য জেলায় ${tk(D.delivery.outsideCharge)}। রিটার্ন: ৩ দিন। পেমেন্ট: ক্যাশ অন ডেলিভারি, বিকাশ, নগদ, কার্ড।</p>`}</article></section>`;
  }
  const notFound = () => `<section class="wrap blk"><div class="empty empty--wide"><div>🤔</div><h2>পেজটি পাওয়া যায়নি</h2><a class="btn btn--p" href="#/">হোমে ফিরুন</a></div></section>`;

  // ---------------- search ----------------
  function search(q) {
    q = q.trim().toLowerCase(); if (!q) return { prods: [], cats: [] };
    const hit = (s) => s.toLowerCase().includes(q);
    return { prods: D.products.filter((p) => hit(p.name) || hit(p.sub) || hit(BR[p.brand].name) || hit(CAT[p.cat].name)), cats: D.categories.filter((c) => hit(c.name) || (c.subs || []).some(hit)) };
  }
  function dropHTML(q) {
    const r = search(q); if (!q.trim()) return "";
    if (!r.prods.length && !r.cats.length) return `<p class="sd__none">“${esc(q)}” এর জন্য কিছু পাওয়া যায়নি। অন্য শব্দে খুঁজে দেখুন, যেমন: মধু, ঘি, গুড়।</p>`;
    return `${r.cats.map((c) => `<a class="sd__cat" href="#/c/${c.id}">📂 ${c.name}</a>`).join("")}${r.prods.slice(0, 8).map((p) => `<a class="sd__p" href="#/p/${p.id}"><img src="${D.img(p.id)}" alt="" width="44" height="44"><span><b>${p.name}</b><small>${BR[p.brand].name}</small></span><em>${tk(p.price)}${p.old ? `<del>${tk(p.old)}</del>` : ""}</em></a>`).join("")}
      <a class="sd__all" href="#/search/${encodeURIComponent(q)}">সব ফলাফল দেখুন (${bn(r.prods.length)}) →</a>`;
  }
  let qt;
  const q = $("#q"), qd = $("#qDrop");
  q.oninput = () => { clearTimeout(qt); qt = setTimeout(() => { qd.innerHTML = dropHTML(q.value); qd.hidden = !q.value.trim(); }, 180); };
  q.onkeydown = (e) => { if (e.key === "Enter" && q.value.trim()) { location.hash = "#/search/" + encodeURIComponent(q.value.trim()); qd.hidden = true; } if (e.key === "Escape") qd.hidden = true; };
  $("#qBtn").onclick = () => q.value.trim() && (location.hash = "#/search/" + encodeURIComponent(q.value.trim()));
  document.addEventListener("click", (e) => { if (!e.target.closest("#search")) qd.hidden = true; });
  $("#q2").oninput = () => { clearTimeout(qt); qt = setTimeout(() => { $("#q2Drop").innerHTML = dropHTML($("#q2").value); }, 180); };
  $("#sheetForm").onsubmit = (e) => { e.preventDefault(); const v = $("#q2").value.trim(); if (v) { location.hash = "#/search/" + encodeURIComponent(v); closePanels(); } };

  // ---------------- global events ----------------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-add],[data-q],[data-cart-open],[data-close],[data-close-f],[data-scroll],[data-wish],[data-wish-open],[data-demo-login],[data-tab],[data-tab-go],[data-chip],[data-clear],[data-page]");
    if (!t) return; const d = t.dataset;
    if ("add" in d) { e.preventDefault(); addToCart(d.add, null, 1, "quiet" in d); if ("quiet" in d) toast("✓ কার্টে যোগ হয়েছে"); }
    else if ("q" in d) { const it = cart.find((i) => keyOf(i) === d.q); setQty(d.q, (it ? it.q : 0) + +d.d); renderCO(); if (!cart.length && location.hash === "#/checkout") route(); }
    else if ("cartOpen" in d) { e.preventDefault(); syncCartUI(); openPanel("cartD"); }
    else if ("close" in d) closePanels();
    else if ("closeF" in d) { $("#filters").classList.remove("open"); $("#ov").classList.remove("open"); document.body.classList.remove("lock"); }
    else if ("scroll" in d) { const tr = t.parentElement.querySelector(".rail__t"); tr.scrollBy({ left: +d.scroll * tr.clientWidth * 0.85, behavior: "smooth" }); }
    else if ("wish" in d) { const on = !wish.includes(d.wish); wish = on ? [...wish, d.wish] : wish.filter((x) => x !== d.wish); store.set("bz_wish", wish); t.classList.toggle("on", on); syncCartUI(); toast(on ? "♡ উইশলিস্টে যোগ হয়েছে" : "উইশলিস্ট থেকে সরানো হয়েছে"); }
    else if ("wishOpen" in d) { e.preventDefault(); toast(wish.length ? `উইশলিস্টে ${bn(wish.length)} টি পণ্য আছে (ডেমো)` : "উইশলিস্ট খালি"); }
    else if ("demoLogin" in d) { e.preventDefault(); closePanels(); toast("ডেমোতে লগইন বন্ধ — আসল সাইটে ফোন নম্বর + OTP দিয়ে লগইন"); }
    else if ("tab" in d || "tabGo" in d) { e.preventDefault(); const k = d.tab || d.tabGo; $$("[data-tab]").forEach((b) => b.classList.toggle("on", b.dataset.tab === k)); $$("[data-panel]").forEach((p) => p.hidden = p.dataset.panel !== k); if (d.tabGo) $(".pd__tabs").scrollIntoView({ behavior: "smooth" }); }
    else if ("chip" in d) { if (d.chip === "max") { F.max = F.cap; $("#fPrice").value = F.cap; $("#fPriceV").textContent = tk(F.cap) + " পর্যন্ত"; } else { F[d.chip].delete(d.v); const cb = $(`[data-f="${d.chip}"][value="${CSS.escape(d.v)}"]`); if (cb) cb.checked = false; } applyF(); }
    else if ("clear" in d) { ["sub", "brand", "flag"].forEach((k) => F[k].clear()); F.max = F.cap; $$("[data-f]").forEach((c) => c.checked = false); $("#fPrice").value = F.cap; $("#fPriceV").textContent = tk(F.cap) + " পর্যন্ত"; applyF(); }
    else if ("page" in d) { F.page = +d.page; applyF(); $(".lst__top").scrollIntoView({ behavior: "smooth" }); }
  });
  $("#ov").onclick = () => { closePanels(); const f = $("#filters"); if (f) f.classList.remove("open"); };
  addEventListener("keydown", (e) => { if (e.key === "Escape") { closePanels(); const f = $("#filters"); if (f) f.classList.remove("open"); } });
  $("#menuBtn").onclick = $("#bnMenu").onclick = (e) => { e.preventDefault(); openPanel("menu"); };
  $("#bnSearch").onclick = (e) => { e.preventDefault(); openPanel("sheet"); setTimeout(() => $("#q2").focus(), 50); };

  // ---------------- router ----------------
  function route() {
    clearInterval(slideT); clearInterval(flashT); if (pdIO) { pdIO.disconnect(); pdIO = null; } closePanels();
    const h = location.hash.slice(1) || "/"; const [path, qs] = h.split("?"); const parts = path.split("/").filter(Boolean); const params = new URLSearchParams(qs || "");
    const v = $("#view"); let after = null, title = D.name + " — " + D.tagline, mode = parts[0] || "home";
    if (!parts.length) { v.innerHTML = home(); after = afterHome; }
    else if (parts[0] === "c" && CAT[parts[1]]) { v.innerHTML = listing("cat", parts[1], params); after = afterListing; title = CAT[parts[1]].name + " | " + D.name; }
    else if (parts[0] === "shop") { v.innerHTML = listing("shop", null, params); after = afterListing; title = "সব পণ্য | " + D.name; }
    else if (parts[0] === "search") { const s = decodeURIComponent(parts.slice(1).join("/")); q.value = s; v.innerHTML = listing("search", s, params); after = afterListing; title = `"${s}" খুঁজুন | ${D.name}`; }
    else if (parts[0] === "p") { v.innerHTML = product(parts[1]); after = () => afterProduct(parts[1]); if (P[parts[1]]) title = P[parts[1]].name + " | " + D.name; }
    else if (parts[0] === "checkout") { v.innerHTML = checkout(); after = afterCheckout; title = "চেকআউট | " + D.name; }
    else if (parts[0] === "done") { v.innerHTML = done(parts[1]); }
    else if (parts[0] === "track") { v.innerHTML = track(); after = afterTrack; title = "অর্ডার ট্র্যাকিং | " + D.name; }
    else if (parts[0] === "page") { v.innerHTML = page(parts[1]); title = (PAGES[parts[1]] || "") + " | " + D.name; }
    else v.innerHTML = notFound();
    document.title = title + " | ডেমো";
    document.body.dataset.route = mode;
    $$(".bnav a").forEach((a) => a.classList.toggle("on", a.dataset.nav === (parts.length ? parts[0] : "home")));
    if (after) after();
    syncCartUI();
    scrollTo(0, 0);
  }
  addEventListener("hashchange", route);
  route();
})();
