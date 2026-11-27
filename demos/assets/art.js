/* Product illustrations as SVG — no external images needed.
   art(type, c1, c2, label) -> svg string */
(function () {
  const sh = (id) => `<ellipse cx="100" cy="182" rx="58" ry="7" fill="#000" opacity=".10"/>`;
  const txt = (t, y, c, s) => t ? `<text x="100" y="${y}" text-anchor="middle" font-family="Hind Siliguri, sans-serif" font-weight="700" font-size="${s || 15}" fill="${c}">${t}</text>` : "";
  const shine = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="#fff" opacity=".28"/>`;

  const T = {
    jar: (a, b, l) => `${sh()}
      <rect x="58" y="34" width="84" height="22" rx="6" fill="${b}"/>
      <rect x="54" y="52" width="92" height="8" rx="3" fill="${b}" opacity=".8"/>
      <path d="M52 66q0-8 10-8h76q10 0 10 8v100q0 14-14 14H66q-14 0-14-14z" fill="${a}"/>
      <rect x="58" y="96" width="84" height="48" rx="6" fill="#fffaf0"/>
      ${txt(l, 126, b, 16)}${shine(60, 66, 8, 88)}`,
    bottle: (a, b, l) => `${sh()}
      <rect x="86" y="20" width="28" height="20" rx="4" fill="${b}"/>
      <path d="M88 40h24v18q22 10 22 34v74q0 14-14 14H80q-14 0-14-14V92q0-24 22-34z" fill="${a}"/>
      <rect x="70" y="104" width="60" height="44" rx="5" fill="#fffaf0"/>
      ${txt(l, 131, b, 14)}${shine(74, 90, 7, 70)}`,
    pouch: (a, b, l) => `${sh()}
      <path d="M56 36h88l6 136q0 8-8 8H58q-8 0-8-8z" fill="${a}"/>
      <rect x="56" y="36" width="88" height="10" fill="${b}"/>
      <line x1="58" y1="54" x2="142" y2="54" stroke="${b}" stroke-width="2" stroke-dasharray="4 3"/>
      <rect x="70" y="72" width="60" height="40" rx="20" fill="#fff" opacity=".85"/>
      ${txt(l, 98, b, 15)}
      <rect x="64" y="124" width="72" height="40" rx="6" fill="${b}" opacity=".25"/>`,
    block: (a, b, l) => `${sh()}
      <ellipse cx="100" cy="158" rx="58" ry="20" fill="${b}"/>
      <ellipse cx="100" cy="150" rx="58" ry="20" fill="${a}"/>
      <ellipse cx="100" cy="124" rx="50" ry="18" fill="${b}"/>
      <ellipse cx="100" cy="116" rx="50" ry="18" fill="${a}"/>
      <ellipse cx="100" cy="92" rx="42" ry="16" fill="${b}"/>
      <ellipse cx="100" cy="85" rx="42" ry="16" fill="${a}"/>
      <ellipse cx="88" cy="80" rx="14" ry="4" fill="#fff" opacity=".25"/>
      ${l ? `<rect x="62" y="34" width="76" height="26" rx="13" fill="#fffaf0"/>${txt(l, 52, b, 14)}` : ""}`,
    box: (a, b, l) => `${sh()}
      <path d="M40 80l60-26 60 26v86q0 8-8 8H48q-8 0-8-8z" fill="${a}"/>
      <path d="M40 80l60-26 60 26-60 24z" fill="${b}"/>
      <rect x="66" y="118" width="68" height="34" rx="6" fill="#fffaf0"/>
      ${txt(l, 141, b, 14)}`,
    dropper: (a, b, l) => `${sh()}
      <rect x="88" y="18" width="24" height="26" rx="12" fill="#222"/>
      <rect x="84" y="42" width="32" height="18" rx="3" fill="${b}"/>
      <rect x="64" y="60" width="72" height="116" rx="14" fill="${a}"/>
      <rect x="70" y="96" width="60" height="50" rx="5" fill="#fff" opacity=".9"/>
      ${txt(l, 126, b, 14)}${shine(70, 66, 7, 90)}`,
    tube: (a, b, l) => `${sh()}
      <path d="M62 26h76l-8 132H70z" fill="${a}"/>
      <rect x="58" y="20" width="84" height="10" rx="2" fill="${b}"/>
      <rect x="80" y="158" width="40" height="22" rx="4" fill="${b}"/>
      ${txt(l, 92, b, 15)}${shine(70, 36, 6, 100)}`,
    lipstick: (a, b, l) => `${sh()}
      <path d="M84 30q0-8 16-12 16 4 16 12v40H84z" fill="${a}"/>
      <rect x="78" y="70" width="44" height="24" rx="3" fill="#d9b25b"/>
      <rect x="72" y="94" width="56" height="84" rx="6" fill="${b}"/>
      ${txt(l, 142, "#fff", 13)}`,
    kurti: (a, b, l) => `${sh()}
      <defs><pattern id="p${a.slice(1)}" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="2.5" fill="${b}" opacity=".7"/></pattern></defs>
      <path d="M78 22q22 14 44 0l30 14 14 44-22 8-6-18v108H62V70l-6 18-22-8 14-44z" fill="${a}"/>
      <path d="M78 22q22 14 44 0l30 14 14 44-22 8-6-18v108H62V70l-6 18-22-8 14-44z" fill="url(#p${a.slice(1)})"/>
      <path d="M86 24q14 22 28 0" fill="none" stroke="${b}" stroke-width="4"/>
      <rect x="62" y="158" width="76" height="10" fill="${b}"/>`,
    panjabi: (a, b, l) => `${sh()}
      <path d="M80 20h40l30 16 16 50-20 6-8-22v108H62V70l-8 22-20-6 16-50z" fill="${a}"/>
      <rect x="94" y="20" width="12" height="70" fill="${b}"/>
      <circle cx="100" cy="40" r="2.5" fill="#fff"/><circle cx="100" cy="54" r="2.5" fill="#fff"/><circle cx="100" cy="68" r="2.5" fill="#fff"/>
      <rect x="86" y="14" width="28" height="10" rx="3" fill="${b}"/>`,
    saree: (a, b, l) => `${sh()}
      <rect x="34" y="128" width="132" height="44" rx="6" fill="${a}"/><rect x="34" y="160" width="132" height="12" fill="${b}"/>
      <rect x="42" y="92" width="116" height="40" rx="6" fill="${a}" opacity=".85"/><rect x="42" y="122" width="116" height="10" fill="${b}"/>
      <rect x="50" y="56" width="100" height="40" rx="6" fill="${a}" opacity=".7"/><rect x="50" y="86" width="100" height="10" fill="${b}"/>
      <path d="M60 70h80M60 108h80M60 146h80" stroke="${b}" stroke-width="2" stroke-dasharray="2 6" opacity=".7"/>`,
    ring: (a, b, l) => `${sh()}
      <ellipse cx="100" cy="122" rx="52" ry="48" fill="none" stroke="${a}" stroke-width="14"/>
      <ellipse cx="100" cy="122" rx="52" ry="48" fill="none" stroke="#fff" stroke-width="3" opacity=".35"/>
      <path d="M78 74l22-30 22 30-22 18z" fill="${b}"/><path d="M78 74l22-30 22 30z" fill="#fff" opacity=".35"/>`,
    necklace: (a, b, l) => `${sh()}
      <path d="M40 30q60 150 120 0" fill="none" stroke="${a}" stroke-width="6"/>
      ${[...Array(9)].map((_, i) => { const t = (i + 1) / 10; const x = 40 + 120 * t; const y = 30 + 150 * 2 * t * (1 - t) * 0.94; return `<circle cx="${x}" cy="${y}" r="6" fill="${a}"/>`; }).join("")}
      <path d="M86 112h28l-14 34z" fill="${b}"/><circle cx="100" cy="122" r="7" fill="#fff" opacity=".6"/>`,
    earring: (a, b, l) => `${sh()}
      ${[66, 134].map((x) => `<circle cx="${x}" cy="40" r="7" fill="${a}"/><line x1="${x}" y1="47" x2="${x}" y2="70" stroke="${a}" stroke-width="3"/>
      <path d="M${x - 24} 70h48l-24 70z" fill="${a}"/><circle cx="${x}" cy="92" r="9" fill="${b}"/>
      ${[0, 1, 2].map((k) => `<circle cx="${x - 12 + k * 12}" cy="152" r="5" fill="${a}"/>`).join("")}`).join("")}`,
    bangle: (a, b, l) => `${sh()}
      <ellipse cx="100" cy="112" rx="66" ry="58" fill="none" stroke="${a}" stroke-width="16"/>
      <ellipse cx="100" cy="112" rx="66" ry="58" fill="none" stroke="${b}" stroke-width="4" stroke-dasharray="3 9"/>`,
  };
  window.art = (type, c1, c2, label) =>
    `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label || type}">${(T[type] || T.jar)(c1, c2, label || "")}</svg>`;
})();
