/* Demo data for "সতেজ মার্ট" — all brand names, text and testimonials are fictional demo content. */
window.BZ = {
  name: "সতেজ মার্ট",
  tagline: "খাঁটি খাবারের অনলাইন বাজার",
  hotline: "09610000000",
  whatsapp: "8801700000000",
  freeDeliveryOver: 2000,
  img: (id) => `../assets/img/organic/${id}.jpg`,

  categories: [
    { id: "offer", name: "অফার জোন", icon: "🔥" },
    { id: "honey", name: "মধু", icon: "🍯", subs: ["সুন্দরবনের মধু", "ফুলের মধু"] },
    { id: "oil", name: "তেল ও ঘি", icon: "🫙", subs: ["ঘি", "সরিষার তেল", "নারিকেল তেল"] },
    { id: "gur", name: "গুড়", icon: "🟤", subs: ["খেজুরের গুড়", "আখের গুড়"] },
    { id: "dates", name: "খেজুর ও বাদাম", icon: "🌴", subs: ["খেজুর", "বাদাম"] },
    { id: "spices", name: "মসলা", icon: "🌶️", subs: ["গুঁড়া মসলা", "মসলা মিক্স"] },
  ],

  brands: [
    { id: "mouban", name: "মৌবন", color: "#b45309" },
    { id: "khati", name: "খাঁটি ঘর", color: "#0b6b4a" },
    { id: "ghani", name: "ঘানিঘর", color: "#a16207" },
    { id: "nobanno", name: "নবান্ন", color: "#7c2d12" },
    { id: "moru", name: "মরুর স্বাদ", color: "#9a3412" },
    { id: "moshla", name: "মসলাবাড়ি", color: "#b91c1c" },
  ],

  // flags: best | new | trending | free (free delivery)
  products: [
    { id: "h1", cat: "honey", sub: "সুন্দরবনের মধু", brand: "mouban", name: "সুন্দরবনের খলিশা ফুলের মধু", price: 850, old: 1000, flags: ["best"], variants: [["৫০০ গ্রাম", 850, 1000], ["১ কেজি", 1600, 1900]], stock: 24, rating: 4.8, reviews: 126 },
    { id: "h2", cat: "honey", sub: "ফুলের মধু", brand: "mouban", name: "সরিষা ফুলের মধু", price: 550, old: 650, flags: ["new"], variants: [["৫০০ গ্রাম", 550, 650], ["১ কেজি", 1000, 1200]], stock: 40, rating: 4.6, reviews: 58 },
    { id: "h3", cat: "honey", sub: "ফুলের মধু", brand: "mouban", name: "লিচু ফুলের মধু", price: 650, flags: [], variants: [["৫০০ গ্রাম", 650], ["১ কেজি", 1200]], stock: 18, rating: 4.7, reviews: 41 },
    { id: "h4", cat: "honey", sub: "ফুলের মধু", brand: "khati", name: "কালোজিরা ফুলের মধু", price: 950, old: 1100, flags: ["best", "trending"], variants: [["৫০০ গ্রাম", 950, 1100], ["১ কেজি", 1800, 2100]], stock: 9, rating: 4.9, reviews: 203 },
    { id: "e1", cat: "oil", sub: "ঘি", brand: "khati", name: "খাঁটি গাওয়া ঘি", price: 1250, old: 1400, flags: ["best"], variants: [["৪০০ গ্রাম", 1250, 1400], ["৮০০ গ্রাম", 2400, 2750]], stock: 30, rating: 4.8, reviews: 312 },
    { id: "e2", cat: "oil", sub: "ঘি", brand: "nobanno", name: "সিরাজগঞ্জের দেশি ঘি", price: 1150, flags: ["new"], variants: [["৪০০ গ্রাম", 1150], ["৮০০ গ্রাম", 2200]], stock: 15, rating: 4.5, reviews: 37 },
    { id: "o1", cat: "oil", sub: "সরিষার তেল", brand: "ghani", name: "কাঠের ঘানি ভাঙা সরিষার তেল", price: 420, old: 480, flags: ["best", "free"], variants: [["১ লিটার", 420, 480], ["২ লিটার", 820, 940], ["৫ লিটার", 1950, 2300]], stock: 60, rating: 4.7, reviews: 188 },
    { id: "o2", cat: "oil", sub: "নারিকেল তেল", brand: "ghani", name: "কোল্ড প্রেসড নারিকেল তেল", price: 360, flags: [], variants: [["২৫০ মিলি", 360], ["৫০০ মিলি", 680]], stock: 22, rating: 4.4, reviews: 19 },
    { id: "g1", cat: "gur", sub: "খেজুরের গুড়", brand: "nobanno", name: "যশোরের খেজুরের পাটালি গুড়", price: 450, old: 520, flags: ["best", "trending"], variants: [["১ কেজি", 450, 520], ["২ কেজি", 880, 1040]], stock: 35, rating: 4.9, reviews: 274 },
    { id: "g2", cat: "gur", sub: "খেজুরের গুড়", brand: "nobanno", name: "খেজুরের ঝোলা গুড় (লিকুইড)", price: 380, flags: ["new"], variants: [["৫০০ গ্রাম", 380], ["১ কেজি", 720]], stock: 20, rating: 4.6, reviews: 44 },
    { id: "g3", cat: "gur", sub: "আখের গুড়", brand: "khati", name: "আখের লাল গুড়", price: 220, old: 260, flags: [], variants: [["১ কেজি", 220, 260]], stock: 50, rating: 4.3, reviews: 22 },
    { id: "d1", cat: "dates", sub: "খেজুর", brand: "moru", name: "আজওয়া খেজুর (প্রিমিয়াম)", price: 1350, old: 1500, flags: ["best"], variants: [["৫০০ গ্রাম", 1350, 1500], ["১ কেজি", 2600, 2950]], stock: 14, rating: 4.8, reviews: 96 },
    { id: "d2", cat: "dates", sub: "খেজুর", brand: "moru", name: "সুক্কারি খেজুর", price: 950, flags: ["trending"], variants: [["৫০০ গ্রাম", 950], ["১ কেজি", 1850]], stock: 0, rating: 4.6, reviews: 31 },
    { id: "d3", cat: "dates", sub: "বাদাম", brand: "khati", name: "কাজুবাদাম (W320)", price: 690, old: 780, flags: ["new"], variants: [["২৫০ গ্রাম", 690, 780], ["৫০০ গ্রাম", 1350, 1520]], stock: 26, rating: 4.7, reviews: 52 },
    { id: "m1", cat: "spices", sub: "গুঁড়া মসলা", brand: "moshla", name: "ঝাল মরিচ গুঁড়া", price: 180, old: 220, flags: ["best"], variants: [["২৫০ গ্রাম", 180, 220], ["৫০০ গ্রাম", 340, 420]], stock: 80, rating: 4.6, reviews: 143 },
    { id: "m2", cat: "spices", sub: "গুঁড়া মসলা", brand: "moshla", name: "হলুদ গুঁড়া", price: 140, flags: [], variants: [["২৫০ গ্রাম", 140], ["৫০০ গ্রাম", 260]], stock: 75, rating: 4.5, reviews: 88 },
    { id: "m3", cat: "spices", sub: "গুঁড়া মসলা", brand: "moshla", name: "ধনিয়া গুঁড়া", price: 120, flags: [], variants: [["২৫০ গ্রাম", 120]], stock: 64, rating: 4.4, reviews: 40 },
    { id: "m4", cat: "spices", sub: "মসলা মিক্স", brand: "moshla", name: "গরম মসলা মিক্স", price: 260, old: 300, flags: ["trending"], variants: [["১০০ গ্রাম", 260, 300]], stock: 33, rating: 4.7, reviews: 67 },
  ],

  slides: [
    { pid: "h1", kicker: "শীতের স্পেশাল", title: "সুন্দরবনের খাঁটি মধু", sub: "১ কেজি কিনলে ৩০০ টাকা ছাড় + ফ্রি ডেলিভারি", bg: "linear-gradient(115deg,#5b2c06,#b45309)" },
    { pid: "g1", kicker: "নতুন মৌসুম", title: "যশোরের খেজুরের পাটালি গুড়", sub: "গাছির হাতে তৈরি, চিনি বা কেমিক্যাল ছাড়া", bg: "linear-gradient(115deg,#3b1d0a,#8a4b1c)" },
    { pid: "o1", kicker: "সপ্তাহের অফার", title: "কাঠের ঘানি ভাঙা সরিষার তেল", sub: "৫ লিটারে সারাদেশে ফ্রি ডেলিভারি", bg: "linear-gradient(115deg,#0b4a33,#0b6b4a)" },
  ],

  rows: [
    { title: "খাঁটি মধু", cat: "honey" },
    { title: "প্রিমিয়াম খেজুর ও বাদাম", cat: "dates" },
    { title: "রান্নার প্রয়োজনীয়", cat: "spices" },
  ],

  testimonials: [
    ["রুমানা আক্তার", "শিক্ষিকা, ধানমন্ডি", "মধুটা একদম খাঁটি, বাচ্চারা খুব পছন্দ করেছে। প্যাকেজিংও সুন্দর ছিল।"],
    ["মোঃ সাকিব হাসান", "ব্যাংকার, চট্টগ্রাম", "অর্ডারের পরদিনই ডেলিভারি। পাটালি গুড়ের স্বাদ একদম গ্রামের মতো।"],
    ["ফারজানা ইসলাম", "গৃহিণী, সিলেট", "ঘি-এর ঘ্রাণ অসাধারণ। দাম অনুযায়ী মান খুবই ভালো, আবার নেব।"],
    ["তানভীর আহমেদ", "ইঞ্জিনিয়ার, উত্তরা", "সাইট থেকে অর্ডার করা খুব সহজ। কল করে কনফার্ম করেছে, ভালো লেগেছে।"],
  ],

  districts: ["ঢাকা", "গাজীপুর", "নারায়ণগঞ্জ", "নরসিংদী", "মানিকগঞ্জ", "মুন্সিগঞ্জ", "টাঙ্গাইল", "কিশোরগঞ্জ", "ফরিদপুর", "গোপালগঞ্জ", "মাদারীপুর", "রাজবাড়ী", "শরীয়তপুর",
    "চট্টগ্রাম", "কক্সবাজার", "কুমিল্লা", "ফেনী", "নোয়াখালী", "লক্ষ্মীপুর", "চাঁদপুর", "ব্রাহ্মণবাড়িয়া", "খাগড়াছড়ি", "রাঙ্গামাটি", "বান্দরবান",
    "রাজশাহী", "নাটোর", "নওগাঁ", "চাঁপাইনবাবগঞ্জ", "পাবনা", "সিরাজগঞ্জ", "বগুড়া", "জয়পুরহাট",
    "খুলনা", "বাগেরহাট", "সাতক্ষীরা", "যশোর", "ঝিনাইদহ", "মাগুরা", "নড়াইল", "কুষ্টিয়া", "চুয়াডাঙ্গা", "মেহেরপুর",
    "বরিশাল", "ভোলা", "পটুয়াখালী", "বরগুনা", "পিরোজপুর", "ঝালকাঠি",
    "সিলেট", "মৌলভীবাজার", "হবিগঞ্জ", "সুনামগঞ্জ",
    "রংপুর", "দিনাজপুর", "ঠাকুরগাঁও", "পঞ্চগড়", "নীলফামারী", "লালমনিরহাট", "কুড়িগ্রাম", "গাইবান্ধা",
    "ময়মনসিংহ", "জামালপুর", "শেরপুর", "নেত্রকোনা"],
  thanas: {
    "ঢাকা": ["মিরপুর", "পল্লবী", "মোহাম্মদপুর", "ধানমন্ডি", "গুলশান", "বনানী", "উত্তরা", "বাড্ডা", "রামপুরা", "খিলগাঁও", "যাত্রাবাড়ী", "তেজগাঁও", "রমনা", "লালবাগ", "ক্যান্টনমেন্ট", "দক্ষিণখান"],
    "চট্টগ্রাম": ["পাঁচলাইশ", "কোতোয়ালী", "ডবলমুরিং", "হালিশহর", "চান্দগাঁও", "পতেঙ্গা", "বায়েজিদ"],
  },
  // delivery: city zones vs rest; express only inside Dhaka
  delivery: { city: ["ঢাকা", "চট্টগ্রাম"], cityCharge: 70, outsideCharge: 130, expressDistricts: ["ঢাকা"], expressCharge: 100 },
};
