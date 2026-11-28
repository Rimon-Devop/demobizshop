(function () {
  const cfg = window.SITE_CONFIG || {};
  const root = document.documentElement;

  // ---------- language ----------
  function setLang(lang) {
    root.dataset.lang = lang;
    root.lang = lang;
    try { localStorage.setItem("lang", lang); } catch (e) {}
  }
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  if (saved === "en" || saved === "bn") setLang(saved);
  document.getElementById("langToggle").addEventListener("click", () =>
    setLang(root.dataset.lang === "bn" ? "en" : "bn")
  );

  // ---------- contact links ----------
  const waBase = "https://wa.me/" + cfg.whatsapp;
  const hello = encodeURIComponent("আসসালামু আলাইকুম, আমি ওয়েবসাইট বানাতে চাই।");
  document.querySelectorAll("[data-wa]").forEach((a) => {
    a.href = waBase + "?text=" + hello;
    a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-fb]").forEach((a) => {
    a.href = cfg.facebook; a.target = "_blank"; a.rel = "noopener";
  });
  document.querySelectorAll("[data-phone]").forEach((a) => (a.href = "tel:" + (cfg.phone || "").replace(/[^+\d]/g, "")));
  document.querySelectorAll("[data-phone-text]").forEach((s) => (s.textContent = cfg.phone));

  // ---------- mobile menu ----------
  const nav = document.getElementById("nav");
  const menuBtn = document.getElementById("menuBtn");
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));

  // ---------- header shadow ----------
  const header = document.querySelector(".header");
  addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 10), { passive: true });

  // ---------- plan / demo buttons preselect form ----------
  const planSelect = document.getElementById("planSelect");
  document.querySelectorAll("[data-plan]").forEach((b) =>
    b.addEventListener("click", () => (planSelect.value = b.dataset.plan))
  );
  const form = document.getElementById("orderForm");
  document.querySelectorAll("[data-demo]").forEach((b) =>
    b.addEventListener("click", () => {
      form.note.value = (root.dataset.lang === "bn" ? "ডেমো পছন্দ: " : "Demo I like: ") + b.dataset.demo;
    })
  );

  // ---------- form -> WhatsApp ----------
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = form.elements;
    const msg =
      "আসসালামু আলাইকুম! 🙌\n" +
      "নাম: " + f.name.value + "\n" +
      "ব্যবসা: " + f.business.value + "\n" +
      "প্যাকেজ: " + f.plan.value +
      (f.note.value ? "\nনোট: " + f.note.value : "");
    window.open(waBase + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });

  // ---------- reveal on scroll ----------
  const els = document.querySelectorAll(".feature, .plan, .service, .demo, .step, .faq details, .compare");
  if ("IntersectionObserver" in window) {
    els.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
  }

  document.getElementById("year").textContent = new Date().getFullYear();
})();

// ---------- demo category filter ----------
(function () {
  const bar = document.querySelector(".demo-filter"); if (!bar) return;
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]"); if (!b) return;
    const g = b.dataset.filter;
    bar.querySelectorAll("button").forEach((x) => x.classList.toggle("on", x === b));
    document.querySelectorAll("#demoGrid .demo").forEach((d) => d.classList.toggle("is-hidden", g !== "all" && d.dataset.group !== g && d.dataset.group !== "all"));
  });
})();
