/* Demo data sets with existing photos (demos/assets/img/<dir>/<id>.jpg). Fictional demo content. */
window.DATASETS = window.DATASETS || {};

DATASETS.organic = {
  dir: "organic", about: "সরাসরি কৃষকের কাছ থেকে সংগ্রহ করা খাঁটি ও ভেজালমুক্ত খাবার।",
  desc: "সরাসরি উৎস থেকে সংগ্রহ করা, ল্যাব টেস্টেড ও কোনো কেমিক্যাল বা প্রিজারভেটিভ ছাড়া। ঠান্ডা ও শুকনো স্থানে রাখুন।",
  categories: [{ id: "honey", name: "মধু" }, { id: "ghee", name: "ঘি ও তেল" }, { id: "gur", name: "গুড়" }, { id: "spice", name: "মসলা" }, { id: "dates", name: "খেজুর ও বাদাম" }],
  products: [
    { id: "h1", cat: "honey", best: 1, name: "সুন্দরবনের খলিশা ফুলের মধু", price: 850, old: 1000, variants: [["৫০০ গ্রাম", 850, 1000], ["১ কেজি", 1600, 1900]], flag: "হট" },
    { id: "g1", cat: "gur", best: 1, name: "খেজুরের পাটালি গুড়", price: 450, old: 520, unit: "১ কেজি", flag: "সিজনাল" },
    { id: "e1", cat: "ghee", best: 1, name: "খাঁটি গাওয়া ঘি", price: 1250, old: 1400, variants: [["৪০০ গ্রাম", 1250, 1400], ["৮০০ গ্রাম", 2400, 2750]] },
    { id: "d1", cat: "dates", best: 1, name: "আজওয়া খেজুর (প্রিমিয়াম)", price: 1350, old: 1500, unit: "৫০০ গ্রাম" },
    { id: "m1", cat: "spice", best: 1, name: "ঝাল মরিচ গুঁড়া", price: 180, old: 220, unit: "২৫০ গ্রাম" },
    { id: "o1", cat: "ghee", best: 1, name: "কাঠের ঘানি সরিষার তেল", price: 420, old: 480, variants: [["১ লিটার", 420, 480], ["৫ লিটার", 1950, 2300]] },
    { id: "h2", cat: "honey", name: "সরিষা ফুলের মধু", price: 550, old: 650, unit: "৫০০ গ্রাম" },
    { id: "h3", cat: "honey", name: "লিচু ফুলের মধু", price: 650, unit: "৫০০ গ্রাম" },
    { id: "h4", cat: "honey", name: "কালোজিরা ফুলের মধু", price: 950, old: 1100, unit: "৫০০ গ্রাম" },
    { id: "e2", cat: "ghee", name: "সিরাজগঞ্জের দেশি ঘি", price: 1150, unit: "৪০০ গ্রাম" },
    { id: "o2", cat: "ghee", name: "কোল্ড প্রেসড নারিকেল তেল", price: 360, unit: "২৫০ মিলি" },
    { id: "g2", cat: "gur", name: "খেজুরের ঝোলা গুড়", price: 380, unit: "৫০০ গ্রাম" },
    { id: "g3", cat: "gur", name: "আখের লাল গুড়", price: 220, old: 260, unit: "১ কেজি" },
    { id: "m2", cat: "spice", name: "হলুদ গুঁড়া", price: 140, unit: "২৫০ গ্রাম" },
    { id: "m3", cat: "spice", name: "ধনিয়া গুঁড়া", price: 120, unit: "২৫০ গ্রাম" },
    { id: "m4", cat: "spice", name: "গরম মসলা মিক্স", price: 260, old: 300, unit: "১০০ গ্রাম" },
    { id: "d2", cat: "dates", name: "সুক্কারি খেজুর", price: 950, unit: "৫০০ গ্রাম" },
    { id: "d3", cat: "dates", name: "কাজুবাদাম (W320)", price: 690, old: 780, unit: "২৫০ গ্রাম" },
  ],
};

DATASETS.beauty = {
  dir: "beauty", about: "কোরিয়ান, জাপানিজ ও লোকাল ব্র্যান্ডের অথেনটিক স্কিনকেয়ার ও মেকআপ।",
  desc: "১০০% অথেনটিক প্রোডাক্ট, ব্যাচ নম্বর ও এক্সপায়ারি ডেট সহ। ব্যবহারের আগে প্যাচ টেস্ট করে নিন।",
  categories: [{ id: "serum", name: "সিরাম" }, { id: "clean", name: "ফেসওয়াশ" }, { id: "cream", name: "ক্রিম ও সানস্ক্রিন" }, { id: "makeup", name: "মেকআপ" }, { id: "hair", name: "হেয়ারকেয়ার" }],
  products: [
    { id: "s1", cat: "serum", best: 1, name: "ভিটামিন সি ব্রাইটেনিং সিরাম", price: 890, old: 1190, unit: "৩০ মিলি", flag: "নতুন" },
    { id: "k1", cat: "cream", best: 1, name: "সিরামাইড ময়েশ্চারাইজিং ক্রিম", price: 990, old: 1250, unit: "৫০ গ্রাম" },
    { id: "l1", cat: "makeup", best: 1, name: "ম্যাট লিপস্টিক — রুবি রেড", price: 450, old: 550, variants: [["রুবি রেড", 450, 550], ["নুড পিংক", 450, 550]] },
    { id: "c1", cat: "clean", best: 1, name: "সেন্টেলা কাম ফোম ক্লেনজার", price: 650, old: 780, unit: "১৫০ মিলি" },
    { id: "r1", cat: "hair", best: 1, name: "অনিয়ন হেয়ার অয়েল", price: 550, old: 650, unit: "২০০ মিলি" },
    { id: "s2", cat: "serum", name: "নিয়াসিনামাইড ১০% সিরাম", price: 750, old: 950, unit: "৩০ মিলি" },
    { id: "s3", cat: "serum", name: "হায়ালুরোনিক অ্যাসিড সিরাম", price: 820, unit: "৩০ মিলি" },
    { id: "c2", cat: "clean", name: "রাইস ওয়াটার ফেসওয়াশ", price: 480, unit: "১০০ মিলি" },
    { id: "c3", cat: "clean", name: "টি-ট্রি অ্যাকনে ফেসওয়াশ", price: 420, old: 520, unit: "১০০ মিলি" },
    { id: "k2", cat: "cream", name: "সানস্ক্রিন SPF 50+", price: 780, unit: "৫০ মিলি" },
    { id: "k3", cat: "cream", name: "অ্যালোভেরা স্লিপিং মাস্ক", price: 690, unit: "১০০ গ্রাম" },
    { id: "l2", cat: "makeup", name: "ব্লাশ অন কমপ্যাক্ট", price: 590, unit: "১ পিস" },
    { id: "l3", cat: "makeup", name: "লিকুইড ফাউন্ডেশন", price: 1150, old: 1350, variants: [["ফেয়ার", 1150, 1350], ["মিডিয়াম", 1150, 1350]] },
    { id: "r2", cat: "hair", name: "আরগান অয়েল শ্যাম্পু", price: 720, unit: "৩০০ মিলি" },
  ],
};

DATASETS.fashion = {
  dir: "fashion", about: "তাঁতের শাড়ি থেকে আধুনিক কুর্তি — দেশীয় কারিগরদের হাতে তৈরি পোশাক।",
  desc: "আরামদায়ক কাপড়, পাকা রং এবং যত্নের সাথে সেলাই। ছবির সাথে রঙের সামান্য পার্থক্য হতে পারে। সাইজ না মিললে ৩ দিনের মধ্যে ফ্রি এক্সচেঞ্জ।",
  categories: [{ id: "saree", name: "শাড়ি" }, { id: "three", name: "থ্রি-পিস" }, { id: "kurti", name: "কুর্তি" }, { id: "panjabi", name: "পাঞ্জাবি" }],
  products: [
    { id: "sa1", cat: "saree", best: 1, name: "হাফসিল্ক জামদানি শাড়ি", price: 3450, old: 4100, unit: "ব্লাউজ পিস সহ", flag: "ঈদ স্পেশাল" },
    { id: "t1", cat: "three", best: 1, name: "লন কটন থ্রি-পিস", price: 1850, old: 2200, variants: [["আনস্টিচ", 1850, 2200], ["রেডিমেড (M)", 2150], ["রেডিমেড (L)", 2150]] },
    { id: "k1", cat: "kurti", best: 1, name: "ব্লক প্রিন্ট কটন কুর্তি", price: 950, old: 1150, variants: [["M", 950, 1150], ["L", 950, 1150], ["XL", 990, 1190]] },
    { id: "p1", cat: "panjabi", best: 1, name: "প্রিমিয়াম কটন পাঞ্জাবি", price: 1450, old: 1750, variants: [["40", 1450, 1750], ["42", 1450, 1750], ["44", 1490, 1790]] },
    { id: "sa2", cat: "saree", name: "টাঙ্গাইল তাঁতের শাড়ি", price: 1650, old: 1900, unit: "ব্লাউজ পিস সহ" },
    { id: "sa3", cat: "saree", name: "কাতান বেনারসি শাড়ি", price: 5800, unit: "ব্লাউজ পিস সহ" },
    { id: "sa4", cat: "saree", name: "সুতি প্রিন্ট শাড়ি", price: 890, old: 1050, unit: "ব্লাউজ পিস সহ" },
    { id: "t2", cat: "three", name: "জর্জেট এমব্রয়ডারি থ্রি-পিস", price: 2650, unit: "আনস্টিচ" },
    { id: "k2", cat: "kurti", name: "এমব্রয়ডারি লং কুর্তি", price: 1250, variants: [["M", 1250], ["L", 1250]] },
    { id: "p2", cat: "panjabi", name: "খাদি কটন পাঞ্জাবি", price: 2350, variants: [["40", 2350], ["42", 2350]] },
    { id: "p3", cat: "panjabi", name: "সাদা চিকন কাজের পাঞ্জাবি", price: 1150, old: 1300, variants: [["40", 1150, 1300], ["42", 1150, 1300]] },
  ],
};

DATASETS.jewelry = {
  dir: "jewelry", about: "গোল্ড প্লেটেড, অক্সিডাইজড ও স্টোন জুয়েলারি — উৎসব থেকে প্রতিদিনের সাজে।",
  desc: "উন্নত মানের ব্রাস বেসে ১৮ ক্যারেট গোল্ড প্লেটিং। পানি ও পারফিউম থেকে দূরে রাখুন। প্রতিটি অর্ডারে ফ্রি গিফট বক্স।",
  categories: [{ id: "necklace", name: "নেকলেস" }, { id: "ring", name: "আংটি" }, { id: "earring", name: "কানের দুল" }, { id: "bangle", name: "চুড়ি ও বালা" }],
  products: [
    { id: "n1", cat: "necklace", best: 1, name: "কুন্দন স্টোন নেকলেস সেট", price: 2450, old: 2950, unit: "কানের দুল সহ", flag: "ব্রাইডাল" },
    { id: "e1", cat: "earring", best: 1, name: "ঝুমকা কানের দুল", price: 520, old: 650, unit: "১ জোড়া" },
    { id: "b1", cat: "bangle", best: 1, name: "গোল্ড প্লেটেড বালা (জোড়া)", price: 1250, old: 1500, variants: [["২.৪", 1250, 1500], ["২.৬", 1250, 1500]] },
    { id: "r1", cat: "ring", best: 1, name: "রুবি স্টোন আংটি", price: 450, old: 590, variants: [["সাইজ ৬", 450, 590], ["সাইজ ৭", 450, 590]] },
    { id: "n2", cat: "necklace", name: "মিনিমাল চেইন পেনডেন্ট", price: 690, old: 850, unit: "১ পিস" },
    { id: "n3", cat: "necklace", name: "অক্সিডাইজড স্টেটমেন্ট নেকলেস", price: 890, unit: "১ পিস" },
    { id: "r2", cat: "ring", name: "টারকোয়েজ স্টোন আংটি", price: 550, unit: "১ পিস" },
    { id: "r3", cat: "ring", name: "কাপল রিং সেট", price: 990, old: 1200, unit: "২ পিস" },
    { id: "e2", cat: "earring", name: "স্টোন ড্রপ ইয়াররিং", price: 480, unit: "১ জোড়া" },
    { id: "e3", cat: "earring", name: "গোল্ডেন চাঁদবালি", price: 390, old: 450, unit: "১ জোড়া" },
    { id: "b2", cat: "bangle", name: "রঙিন কাচের চুড়ি সেট", price: 350, unit: "২৪ পিস" },
  ],
};

/* mixed sets built from the above (for multi-category stores) */
DATASETS.boutique = {
  dir: "", about: "শাড়ি, থ্রি-পিস, কুর্তি আর মানানসই গয়না — এক জায়গায়।",
  desc: DATASETS.fashion.desc,
  categories: [{ id: "saree", name: "শাড়ি" }, { id: "three", name: "থ্রি-পিস" }, { id: "kurti", name: "কুর্তি" }, { id: "jewel", name: "গয়না" }],
  products: DATASETS.fashion.products.filter((p) => p.cat !== "panjabi").map((p) => ({ ...p, id: "fashion." + p.id }))
    .concat(DATASETS.jewelry.products.slice(0, 6).map((p) => ({ ...p, id: "jewelry." + p.id, cat: "jewel" }))),
};
DATASETS.blush = {
  dir: "", about: "নারীদের পোশাক, বিউটি ও জুয়েলারির প্রিমিয়াম কালেকশন।",
  desc: "প্রিমিয়াম মানের কাপড় ও অথেনটিক প্রোডাক্ট। অর্ডার কনফার্মের আগে আমাদের প্রতিনিধি কল করে সাইজ ও রং নিশ্চিত করবেন।",
  categories: [{ id: "saree", name: "শাড়ি" }, { id: "three", name: "থ্রি-পিস" }, { id: "beauty", name: "স্কিনকেয়ার" }, { id: "jewel", name: "জুয়েলারি" }],
  products: DATASETS.fashion.products.filter((p) => ["saree", "three", "kurti"].includes(p.cat)).map((p) => ({ ...p, id: "fashion." + p.id, cat: p.cat === "kurti" ? "three" : p.cat }))
    .concat(DATASETS.beauty.products.slice(0, 6).map((p) => ({ ...p, id: "beauty." + p.id, cat: "beauty" })))
    .concat(DATASETS.jewelry.products.slice(0, 5).map((p) => ({ ...p, id: "jewelry." + p.id, cat: "jewel" }))),
};
