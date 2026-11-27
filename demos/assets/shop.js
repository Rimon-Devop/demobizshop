/* Demo store engine — renders a full e-commerce storefront from window.SHOP */
(function () {
  const S = window.SHOP;
  const bn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
  const tk = (n) => "৳" + bn(Number(n).toLocaleString("en-IN"));
  const $ = (s, r = document) => r.querySelector(s);
  const byId = Object.fromEntries(S.products.map((p) => [p.id, p]));
  const photo = (p) => `<img class="ph" src="../assets/img/${S.key}/${p.id}.jpg" alt="${p.name}" loading="lazy" width="800" height="800">`;
  const img = (o, label) => (S.photos && o.id ? photo(o) : art(o.type, o.c1, o.c2, label === undefined ? o.label : label));
  const catImg = (c) => { const p = S.products.find((x) => x.cat === c.id); return S.photos && p ? photo(p) : art(c.type, c.c1, c.c2, ""); };
  const off = (p) => (p.old ? Math.round(((p.old - p.price) / p.old) * 100) : 0);
  const MAIN = "../../";

  let cart = [];
  try { cart = JSON.parse(localStorage.getItem("cart_" + S.key) || "[]"); } catch (e) {}
  const save = () => { try { localStorage.setItem("cart_" + S.key, JSON.stringify(cart)); } catch (e) {} };

  // ---------- markup ----------
  const card = (p) => `
    <article class="pcard" data-id="${p.id}">
      <button class="pcard__img" data-view="${p.id}" style="--bg:${p.bg || "var(--soft)"}" aria-label="${p.name}">
        ${off(p) ? `<span class="badge">-${bn(off(p))}%</span>` : ""}
        ${p.tag ? `<span class="badge badge--tag">${p.tag}</span>` : ""}
        ${img(p)}
      </button>
      <div class="pcard__body">
        <h3 data-view="${p.id}">${p.name}</h3>
        <p class="pcard__unit">${p.unit || ""}</p>
        <div class="price">${tk(p.price)} ${p.old ? `<del>${tk(p.old)}</del>` : ""}</div>
        <div class="pcard__btns">
          <button class="btn btn--main" data-buy="${p.id}">অর্ডার করুন</button>
          <button class="btn btn--icon" data-add="${p.id}" aria-label="কার্টে যোগ করুন">🛒</button>
        </div>
      </div>
    </article>`;

  const section = (sec) => {
    const list = sec.cat ? S.products.filter((p) => p.cat === sec.cat) : S.products.filter((p) => p.best);
    return `<section class="block"><div class="wrap">
      <div class="block__head"><h2>${sec.title}</h2>${sec.cat ? `<a href="#" data-cat="${sec.cat}">সব দেখুন →</a>` : ""}</div>
      <div class="grid">${list.map(card).join("")}</div></div></section>`;
  };

  document.body.innerHTML = `
  <div class="demo-bar">🎯 এটি একটি <b>ডেমো ওয়েবসাইট</b> — এমন ওয়েবসাইট আপনার ব্যবসার জন্য চাই? <a href="${MAIN}#contact">অর্ডার করুন →</a></div>
  <div class="announce">${S.announce}</div>
  <header class="top">
    <div class="wrap top__in">
      <a class="brand" href="#"><span class="brand__icon">${S.icon}</span><span><b>${S.name}</b><small>${S.tagline}</small></span></a>
      <form class="search" onsubmit="return false"><input id="q" placeholder="পণ্য খুঁজুন..." /><button aria-label="খুঁজুন">🔍</button></form>
      <div class="top__right">
        <a class="hotline" href="tel:${S.hotline}"><span>📞</span><span><small>হটলাইন</small><b>${bn(S.hotline)}</b></span></a>
        <button class="cart-btn" id="cartBtn" aria-label="কার্ট">🛒<i id="cartCount">০</i></button>
      </div>
    </div>
    <nav class="cats"><div class="wrap cats__in">
      <a href="#" data-cat="all" class="on">সব পণ্য</a>
      ${S.categories.map((c) => `<a href="#" data-cat="${c.id}">${c.name}</a>`).join("")}
    </div></nav>
  </header>

  <main id="home">
    <section class="hero"><div class="wrap">
      <div class="slider" id="slider">
        ${S.slides.map((s, i) => `
        <div class="slide ${i ? "" : "on"}" style="--sbg:${s.bg}">
          <div class="slide__copy"><small>${s.kicker}</small><h1>${s.title}</h1><p>${s.sub}</p>
            <button class="btn btn--light" data-buy="${s.pid}">${s.cta}</button></div>
          <div class="slide__art">${img(byId[s.pid], s.label)}</div>
        </div>`).join("")}
        <div class="dots">${S.slides.map((_, i) => `<button data-dot="${i}" class="${i ? "" : "on"}" aria-label="স্লাইড ${i + 1}"></button>`).join("")}</div>
      </div>
    </div></section>

    <section class="trust"><div class="wrap trust__in">
      ${(S.trust || [["🚚", "সারাদেশে ডেলিভারি"], ["💵", "ক্যাশ অন ডেলিভারি"], ["✅", "১০০% অরিজিনাল"], ["↩️", "সহজ রিটার্ন"]])
        .map(([i, t]) => `<div><span>${i}</span>${t}</div>`).join("")}
    </div></section>

    <section class="block"><div class="wrap">
      <div class="block__head"><h2>ক্যাটাগরি</h2></div>
      <div class="catgrid">${S.categories.map((c) => `<a href="#" data-cat="${c.id}" class="catcard"><span style="--bg:${c.bg || "var(--soft)"}">${catImg(c)}</span>${c.name}</a>`).join("")}</div>
    </div></section>

    <div id="sections">${S.sections.map(section).join("")}</div>

    ${S.promo ? `<section class="block"><div class="wrap"><div class="promo">
      <div><small>${S.promo.kicker}</small><h2>${S.promo.title}</h2><p>${S.promo.sub}</p><button class="btn btn--light" data-buy="${S.promo.pid}">এখনই অর্ডার করুন</button></div>
      <div class="promo__art">${img(byId[S.promo.pid])}</div></div></div></section>` : ""}

    <section class="block block--soft"><div class="wrap">
      <div class="block__head"><h2>কাস্টমার রিভিউ</h2><span class="muted">ডেমো রিভিউ</span></div>
      <div class="reviews">${S.reviews.map((r) => `<blockquote><div class="stars">★★★★★</div><p>“${r[1]}”</p><cite>— ${r[0]}, ${r[2]}</cite></blockquote>`).join("")}</div>
    </div></section>
  </main>

  <section class="block hidden" id="listing"><div class="wrap">
    <div class="block__head"><h2 id="listTitle"></h2><a href="#" id="backHome">← হোমে ফিরুন</a></div>
    <div class="grid" id="listGrid"></div>
  </div></section>

  <footer class="foot"><div class="wrap foot__in">
    <div><div class="brand brand--foot"><span class="brand__icon">${S.icon}</span><b>${S.name}</b></div><p>${S.about}</p></div>
    <div><h4>যোগাযোগ</h4><p>📞 ${bn(S.hotline)}<br>📍 ${S.address}<br>⏰ সকাল ৯টা – রাত ১০টা</p></div>
    <div><h4>তথ্য</h4><p>ডেলিভারি পলিসি<br>রিটার্ন পলিসি<br>প্রাইভেসি পলিসি</p></div>
    <div><h4>পেমেন্ট</h4><div class="pays"><span>ক্যাশ অন ডেলিভারি</span><span class="bkash">বিকাশ</span><span class="nagad">নগদ</span></div></div>
  </div><div class="wrap foot__bottom">© ${S.name} · Demo by <a href="${MAIN}">ShopShuru</a> · <a href="../credits.html">ছবি ক্রেডিট</a></div></footer>

  <nav class="mnav">
    <a href="#" id="mHome"><span>🏠</span>হোম</a>
    <a href="#" id="mCats"><span>📂</span>ক্যাটাগরি</a>
    <a href="#" id="mCart"><span>🛒</span>কার্ট</a>
    <a href="https://wa.me/8801700000000" target="_blank" rel="noopener"><span>💬</span>চ্যাট</a>
  </nav>
  <a class="wa" href="https://wa.me/8801700000000" target="_blank" rel="noopener" aria-label="WhatsApp">💬</a>

  <div class="overlay" id="overlay"></div>
  <aside class="drawer" id="drawer" aria-label="কার্ট">
    <div class="drawer__head"><h3>আপনার কার্ট</h3><button data-close aria-label="বন্ধ">✕</button></div>
    <div class="drawer__items" id="cartItems"></div>
    <div class="drawer__foot"><div class="row"><span>সাবটোটাল</span><b id="cartSub"></b></div>
      <button class="btn btn--main btn--block" id="toCheckout">চেকআউট করুন</button></div>
  </aside>
  <div class="modal" id="modal" role="dialog" aria-modal="true"><div class="modal__box" id="modalBox"></div></div>
  <div class="toast" id="toast"></div>`;

  // ---------- cart ----------
  const totalQty = () => cart.reduce((s, i) => s + i.q, 0);
  const lineKey = (id, v) => id + "|" + (v || "");
  const priceOf = (id, v) => { const p = byId[id]; const vv = p.variants && p.variants.find((x) => x[0] === v); return vv ? vv[1] : p.price; };
  function add(id, q = 1, v) {
    const p = byId[id]; v = v || (p.variants ? p.variants[0][0] : "");
    const it = cart.find((i) => lineKey(i.id, i.v) === lineKey(id, v));
    it ? (it.q += q) : cart.push({ id, v, q });
    save(); renderCart(); toast(`"${p.name}" কার্টে যোগ হয়েছে`);
  }
  function renderCart() {
    $("#cartCount").textContent = bn(totalQty());
    $("#cartItems").innerHTML = cart.length ? cart.map((i, n) => { const p = byId[i.id]; return `
      <div class="ci"><span class="ci__img" style="--bg:${p.bg || "var(--soft)"}">${img(p, "")}</span>
        <div class="ci__info"><b>${p.name}</b><small>${i.v || p.unit || ""}</small><span>${tk(priceOf(i.id, i.v))}</span></div>
        <div class="qty"><button data-dec="${n}">−</button><span>${bn(i.q)}</span><button data-inc="${n}">+</button></div></div>`; }).join("")
      : `<p class="empty">কার্ট খালি 🛍️</p>`;
    $("#cartSub").textContent = tk(cart.reduce((s, i) => s + priceOf(i.id, i.v) * i.q, 0));
  }
  const open = (el) => { el.classList.add("open"); $("#overlay").classList.add("open"); document.body.style.overflow = "hidden"; };
  const closeAll = () => { document.querySelectorAll(".open").forEach((e) => e.classList.remove("open")); document.body.style.overflow = ""; };
  let tt; function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2200); }

  // ---------- product view ----------
  function view(id) {
    const p = byId[id]; let v = p.variants ? p.variants[0][0] : ""; let q = 1;
    $("#modalBox").innerHTML = `
      <button class="x" data-close aria-label="বন্ধ">✕</button>
      <div class="pv">
        <div class="pv__img" style="--bg:${p.bg || "var(--soft)"}">${img(p)}</div>
        <div class="pv__info">
          <h2>${p.name}</h2>
          <div class="price price--lg"><span id="pvPrice">${tk(priceOf(id, v))}</span> ${p.old ? `<del>${tk(p.old)}</del>` : ""}</div>
          <p class="muted">${p.desc || S.defaultDesc}</p>
          ${p.variants ? `<div class="vars">${p.variants.map((x, i) => `<button class="${i ? "" : "on"}" data-var="${x[0]}">${x[0]}</button>`).join("")}</div>` : `<p class="muted">${p.unit || ""}</p>`}
          <div class="pv__row"><div class="qty qty--lg"><button id="pvDec">−</button><span id="pvQ">১</span><button id="pvInc">+</button></div>
            <button class="btn btn--ghost" id="pvAdd">কার্টে যোগ করুন</button></div>
          <button class="btn btn--main btn--block btn--lg" id="pvBuy">অর্ডার করুন — ক্যাশ অন ডেলিভারি</button>
          <ul class="pv__list"><li>✅ ১০০% অরিজিনাল পণ্য</li><li>🚚 ঢাকায় ১-২ দিন, ঢাকার বাইরে ২-৩ দিন</li><li>💵 পণ্য হাতে পেয়ে টাকা পরিশোধ</li></ul>
        </div></div>`;
    const box = $("#modalBox");
    box.querySelectorAll("[data-var]").forEach((b) => b.onclick = () => { v = b.dataset.var; box.querySelectorAll("[data-var]").forEach((x) => x.classList.toggle("on", x === b)); $("#pvPrice").textContent = tk(priceOf(id, v)); });
    $("#pvDec").onclick = () => { q = Math.max(1, q - 1); $("#pvQ").textContent = bn(q); };
    $("#pvInc").onclick = () => { q++; $("#pvQ").textContent = bn(q); };
    $("#pvAdd").onclick = () => { add(id, q, v); closeAll(); };
    $("#pvBuy").onclick = () => checkout([{ id, v, q }]);
    open($("#modal"));
  }

  // ---------- checkout ----------
  function checkout(items) {
    if (!items.length) return toast("কার্ট খালি");
    closeAll();
    let ship = S.deliveryIn;
    const sub = items.reduce((s, i) => s + priceOf(i.id, i.v) * i.q, 0);
    $("#modalBox").innerHTML = `
      <button class="x" data-close aria-label="বন্ধ">✕</button>
      <h2 class="co__title">অর্ডার কনফার্ম করতে নিচের তথ্য দিন</h2>
      <div class="co">
        <form id="coForm" class="co__form">
          <label>আপনার নাম *<input required name="n" placeholder="সম্পূর্ণ নাম"></label>
          <label>মোবাইল নাম্বার *<input required name="p" inputmode="numeric" pattern="01[3-9][0-9]{8}" placeholder="01XXXXXXXXX"></label>
          <label>সম্পূর্ণ ঠিকানা *<textarea required name="a" rows="2" placeholder="বাসা, রোড, এলাকা, থানা, জেলা"></textarea></label>
          <div class="ship">
            <label class="radio"><input type="radio" name="s" value="in" checked> ঢাকার ভিতরে <b>${tk(S.deliveryIn)}</b></label>
            <label class="radio"><input type="radio" name="s" value="out"> ঢাকার বাইরে <b>${tk(S.deliveryOut)}</b></label>
          </div>
          <div class="ship">
            <label class="radio"><input type="radio" name="m" checked> 💵 ক্যাশ অন ডেলিভারি</label>
            <label class="radio"><input type="radio" name="m"> <span class="bkash">বিকাশ</span> / <span class="nagad">নগদ</span></label>
          </div>
          <button class="btn btn--main btn--block btn--lg">অর্ডার কনফার্ম করুন <span id="coBtnTotal"></span></button>
          <p class="muted small">🔒 ডেমো — কোনো আসল অর্ডার হবে না</p>
        </form>
        <div class="co__sum"><h3>অর্ডার সারাংশ</h3>
          ${items.map((i) => { const p = byId[i.id]; return `<div class="ci ci--sm"><span class="ci__img" style="--bg:${p.bg || "var(--soft)"}">${img(p, "")}</span><div class="ci__info"><b>${p.name}</b><small>${i.v || p.unit || ""} × ${bn(i.q)}</small></div><b>${tk(priceOf(i.id, i.v) * i.q)}</b></div>`; }).join("")}
          <div class="row"><span>সাবটোটাল</span><b>${tk(sub)}</b></div>
          <div class="row"><span>ডেলিভারি চার্জ</span><b id="coShip"></b></div>
          <div class="row row--total"><span>সর্বমোট</span><b id="coTotal"></b></div>
        </div>
      </div>`;
    const upd = () => { $("#coShip").textContent = tk(ship); $("#coTotal").textContent = tk(sub + ship); $("#coBtnTotal").textContent = "— " + tk(sub + ship); };
    upd();
    $("#coForm").querySelectorAll("[name=s]").forEach((r) => r.onchange = () => { ship = r.value === "in" ? S.deliveryIn : S.deliveryOut; upd(); });
    $("#coForm").onsubmit = (e) => {
      e.preventDefault();
      const no = "#" + bn(1000 + Math.floor(Math.random() * 9000));
      cart = []; save(); renderCart();
      $("#modalBox").innerHTML = `<button class="x" data-close aria-label="বন্ধ">✕</button>
        <div class="done"><div class="done__icon">✓</div><h2>ধন্যবাদ! আপনার অর্ডার ${no} গ্রহণ করা হয়েছে</h2>
        <p>আমাদের প্রতিনিধি শীঘ্রই কল করে অর্ডার কনফার্ম করবেন।</p>
        <div class="done__demo"><b>এটি ডেমো ছিল।</b> আসল ওয়েবসাইটে এই মুহূর্তে —<br>📩 কাস্টমারের ফোনে SMS যেত · 🔔 আপনার কাছে নোটিফিকেশন আসতো · 🚚 এক ক্লিকে কুরিয়ারে বুক করা যেত</div>
        <a class="btn btn--main btn--lg" href="${MAIN}#contact">এমন ওয়েবসাইট চাই →</a></div>`;
    };
    open($("#modal"));
  }

  // ---------- listing / search ----------
  function list(title, items) {
    $("#home").classList.add("hidden"); $("#listing").classList.remove("hidden");
    $("#listTitle").textContent = title;
    $("#listGrid").innerHTML = items.length ? items.map(card).join("") : `<p class="empty">কোনো পণ্য পাওয়া যায়নি</p>`;
    scrollTo({ top: 0 });
  }
  function home() { $("#home").classList.remove("hidden"); $("#listing").classList.add("hidden"); document.querySelectorAll(".cats a").forEach((a) => a.classList.toggle("on", a.dataset.cat === "all")); scrollTo({ top: 0, behavior: "smooth" }); }
  $("#q").addEventListener("input", (e) => { const t = e.target.value.trim(); t ? list(`"${t}" এর ফলাফল`, S.products.filter((p) => p.name.includes(t) || (p.en || "").toLowerCase().includes(t.toLowerCase()))) : home(); });

  // ---------- events ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-view],[data-buy],[data-add],[data-cat],[data-close],[data-inc],[data-dec],[data-dot]");
    if (!t) return;
    const d = t.dataset;
    if (d.view) view(d.view);
    else if (d.buy) { e.preventDefault(); view(d.buy); }
    else if (d.add) add(d.add);
    else if (d.cat) { e.preventDefault(); if (d.cat === "all") return home(); const c = S.categories.find((x) => x.id === d.cat);
      document.querySelectorAll(".cats a").forEach((a) => a.classList.toggle("on", a.dataset.cat === d.cat)); list(c.name, S.products.filter((p) => p.cat === d.cat)); }
    else if ("close" in d) closeAll();
    else if (d.inc) { cart[d.inc].q++; save(); renderCart(); }
    else if (d.dec) { const i = cart[d.dec]; i.q--; if (!i.q) cart.splice(d.dec, 1); save(); renderCart(); }
    else if (d.dot) go(+d.dot);
  });
  $("#overlay").onclick = closeAll;
  $("#modal").onclick = (e) => { if (e.target.id === "modal") closeAll(); };
  addEventListener("keydown", (e) => e.key === "Escape" && closeAll());
  $("#cartBtn").onclick = $("#mCart").onclick = (e) => { e.preventDefault(); renderCart(); open($("#drawer")); };
  $("#toCheckout").onclick = () => checkout(cart);
  $("#backHome").onclick = $("#mHome").onclick = (e) => { e.preventDefault(); home(); };
  $("#mCats").onclick = (e) => { e.preventDefault(); home(); setTimeout(() => $(".catgrid").scrollIntoView({ behavior: "smooth", block: "center" }), 50); };

  // slider
  let cur = 0; const slides = document.querySelectorAll(".slide"), dots = document.querySelectorAll(".dots button");
  function go(i) { cur = (i + slides.length) % slides.length; slides.forEach((s, k) => s.classList.toggle("on", k === cur)); dots.forEach((s, k) => s.classList.toggle("on", k === cur)); }
  setInterval(() => go(cur + 1), 5000);

  document.title = `${S.name} — ${S.tagline} | ডেমো`;
  renderCart();
})();
