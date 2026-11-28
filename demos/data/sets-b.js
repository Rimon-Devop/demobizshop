/* Demo data sets for gadgets, books, menswear and luxury (photos in demos/assets/img/<dir>/). Fictional demo content. */
window.DATASETS = window.DATASETS || {};

DATASETS.gadget = {
  dir: "gadget", about: "অরিজিনাল গ্যাজেট ও এক্সেসরিজ — ওয়ারেন্টি সহ, সারাদেশে ডেলিভারি।",
  desc: "অরিজিনাল পণ্য, ৬ মাসের রিপ্লেসমেন্ট ওয়ারেন্টি। বক্স খুলে চেক করে নিন, সমস্যা থাকলে ডেলিভারি ম্যানকে ফেরত দিন।",
  categories: [{ id: "audio", name: "অডিও" }, { id: "wear", name: "স্মার্ট ওয়াচ" }, { id: "comp", name: "কম্পিউটার এক্সেসরিজ" }, { id: "power", name: "চার্জার ও পাওয়ার ব্যাংক" }, { id: "life", name: "লাইফস্টাইল" }],
  products: [
    { id: "hp", cat: "audio", best: 1, name: "ওয়্যারলেস হেডফোন ANC প্রো", price: 2850, old: 3990, unit: "১ পিস", flag: "হট" },
    { id: "sw", cat: "wear", best: 1, name: "স্মার্ট ওয়াচ সিরিজ ৯ (কলিং)", price: 2450, old: 3200, variants: [["কালো", 2450, 3200], ["সিলভার", 2550, 3300]] },
    { id: "eb", cat: "audio", best: 1, name: "TWS ইয়ারবাডস (৩০ ঘণ্টা ব্যাকআপ)", price: 1290, old: 1790, unit: "১ সেট" },
    { id: "sp", cat: "audio", best: 1, name: "পোর্টেবল ব্লুটুথ স্পিকার", price: 1650, old: 2200, unit: "১ পিস" },
    { id: "pb", cat: "power", best: 1, name: "২০০০০ mAh পাওয়ার ব্যাংক (PD 22.5W)", price: 1850, old: 2400, unit: "১ পিস" },
    { id: "bp", cat: "life", best: 1, name: "অ্যান্টি-থেফট ল্যাপটপ ব্যাকপ্যাক", price: 1550, old: 2100, unit: "১৫.৬ ইঞ্চি" },
    { id: "kb", cat: "comp", name: "মেকানিক্যাল কিবোর্ড (RGB)", price: 2650, old: 3100, unit: "১ পিস" },
    { id: "ms", cat: "comp", name: "ওয়্যারলেস মাউস (সাইলেন্ট ক্লিক)", price: 590, old: 790, unit: "১ পিস" },
    { id: "cm", cat: "life", name: "অ্যাকশন ক্যামেরা 4K", price: 4990, old: 6500, unit: "১ পিস" },
    { id: "sg", cat: "life", name: "পোলারাইজড সানগ্লাস", price: 890, old: 1290, unit: "১ পিস" },
    { id: "ch", cat: "power", name: "৬৫W ফাস্ট চার্জার + টাইপ-সি কেবল", price: 1190, unit: "১ সেট" },
    { id: "lp", cat: "comp", name: "এলইডি ডেস্ক ল্যাম্প (টাচ কন্ট্রোল)", price: 990, old: 1350, unit: "১ পিস" },
  ],
};

DATASETS.books = {
  dir: "books", about: "বই, ইসলামিক পণ্য ও স্টেশনারি — সারাদেশে ক্যাশ অন ডেলিভারি।",
  desc: "অরিজিনাল প্রকাশনী সংস্করণ, ভালো মানের কাগজ ও বাঁধাই। পছন্দ না হলে ৩ দিনের মধ্যে পরিবর্তন।",
  categories: [{ id: "novel", name: "উপন্যাস ও গল্প" }, { id: "islamic", name: "ইসলামিক" }, { id: "kids", name: "শিশুদের বই" }, { id: "stationery", name: "স্টেশনারি" }],
  products: [
    { id: "st", cat: "novel", best: 1, name: "সেরা ১০ উপন্যাস — বক্স সেট", price: 2450, old: 3200, unit: "১০টি বই", flag: "বেস্ট সেলার" },
    { id: "op", cat: "novel", best: 1, name: "পথের গল্প (গল্প সংকলন)", price: 380, old: 450, unit: "হার্ডকভার" },
    { id: "tb", cat: "islamic", best: 1, name: "ক্রিস্টাল তাসবিহ (৯৯ দানা)", price: 450, old: 550, unit: "১ পিস" },
    { id: "rm", cat: "islamic", best: 1, name: "প্রিমিয়াম জায়নামাজ", price: 1250, old: 1500, unit: "১ পিস" },
    { id: "kd", cat: "kids", best: 1, name: "ছোটদের ছবিতে গল্প (৫ খণ্ড)", price: 650, old: 800, unit: "৫টি বই" },
    { id: "nb", cat: "stationery", name: "লেদার কভার নোটবুক", price: 420, unit: "২০০ পাতা" },
    { id: "pn", cat: "stationery", name: "ক্যালিগ্রাফি ফাউন্টেন পেন", price: 690, old: 850, unit: "১ পিস" },
    { id: "dy", cat: "stationery", name: "২০২৭ প্ল্যানার ডায়েরি", price: 550, unit: "১ পিস" },
    { id: "sh", cat: "novel", name: "ক্লাসিক সাহিত্য সংগ্রহ", price: 1850, old: 2200, unit: "৬টি বই" },
    { id: "ol", cat: "islamic", name: "সীরাত সংকলন (বিশেষ সংস্করণ)", price: 950, unit: "হার্ডকভার" },
  ],
};

DATASETS.men = {
  dir: "men", about: "আধুনিক পুরুষদের জন্য প্রিমিয়াম পোশাক ও এক্সেসরিজ।",
  desc: "প্রিমিয়াম কটন, নিখুঁত ফিটিং। সাইজ না মিললে ৩ দিনের মধ্যে ফ্রি এক্সচেঞ্জ।",
  categories: [{ id: "shirt", name: "শার্ট ও টি-শার্ট" }, { id: "outer", name: "জ্যাকেট ও প্যান্ট" }, { id: "shoes", name: "জুতা" }, { id: "acc", name: "এক্সেসরিজ" }],
  products: [
    { id: "sh", cat: "shirt", best: 1, name: "অক্সফোর্ড কটন শার্ট", price: 1450, old: 1850, variants: [["M", 1450, 1850], ["L", 1450, 1850], ["XL", 1490, 1890]], flag: "নতুন" },
    { id: "jk", cat: "outer", best: 1, name: "ক্লাসিক ডেনিম জ্যাকেট", price: 3450, old: 4200, variants: [["M", 3450, 4200], ["L", 3450, 4200], ["XL", 3550, 4300]] },
    { id: "sn", cat: "shoes", best: 1, name: "ক্যাজুয়াল স্নিকার্স", price: 2850, old: 3500, variants: [["40", 2850, 3500], ["41", 2850, 3500], ["42", 2850, 3500]] },
    { id: "wt", cat: "acc", best: 1, name: "অ্যান্টিক স্টাইল পকেট ওয়াচ", price: 2650, old: 3300, unit: "১ পিস" },
    { id: "ts", cat: "shirt", name: "প্রিমিয়াম বেসিক টি-শার্ট", price: 590, old: 750, variants: [["M", 590, 750], ["L", 590, 750], ["XL", 620, 790]] },
    { id: "jn", cat: "outer", name: "স্লিম ফিট ডেনিম জিন্স", price: 1650, variants: [["30", 1650], ["32", 1650], ["34", 1690]] },
    { id: "lb", cat: "shoes", name: "লেদার ফরমাল শু", price: 3250, old: 3900, variants: [["40", 3250, 3900], ["41", 3250, 3900], ["42", 3250, 3900]] },
    { id: "wl", cat: "acc", name: "জেনুইন লেদার ওয়ালেট", price: 890, unit: "১ পিস" },
    { id: "bt", cat: "acc", name: "লেদার বেল্ট", price: 750, old: 950, unit: "ফ্রি সাইজ" },
    { id: "md", cat: "shirt", name: "লিনেন ক্যাজুয়াল শার্ট", price: 1650, variants: [["M", 1650], ["L", 1650]] },
  ],
};

DATASETS.lux = {
  dir: "lux", about: "আতর, পারফিউম, মডেস্ট ফ্যাশন ও উপহার — আভিজাত্যের ছোঁয়া।",
  desc: "প্রিমিয়াম মানের পণ্য, গিফট প্যাকেজিং সহ। অর্ডার কনফার্মের আগে আমাদের প্রতিনিধি কল করবেন।",
  categories: [{ id: "perfume", name: "আতর ও পারফিউম" }, { id: "modest", name: "মডেস্ট ফ্যাশন" }, { id: "home", name: "হোম ডেকোর" }, { id: "gift", name: "উপহার" }],
  products: [
    { id: "pf", cat: "perfume", best: 1, name: "ঊদ রয়্যাল পারফিউম", price: 2450, old: 2950, unit: "৫০ মিলি", flag: "সিগনেচার" },
    { id: "at", cat: "perfume", best: 1, name: "মুশক আল আরব আতর", price: 650, old: 800, unit: "৬ মিলি" },
    { id: "ab", cat: "modest", best: 1, name: "প্রিমিয়াম জর্জেট হিজাব", price: 590, old: 750, variants: [["কালো", 590, 750], ["নুড", 590, 750]] },
    { id: "sc", cat: "modest", best: 1, name: "সিল্ক প্রিন্টেড স্কার্ফ", price: 850, unit: "১ পিস" },
    { id: "gb", cat: "gift", best: 1, name: "লাক্সারি গিফট বক্স (আতর + তাসবিহ)", price: 1850, old: 2200, unit: "১ সেট" },
    { id: "in", cat: "home", name: "বাখুর ও ধূপদানি সেট", price: 950, unit: "১ সেট" },
    { id: "ln", cat: "home", name: "মরোক্কান লণ্ঠন", price: 1650, old: 1950, unit: "১ পিস" },
    { id: "cn", cat: "home", name: "সুগন্ধি ক্যান্ডেল", price: 550, unit: "২০০ গ্রাম" },
    { id: "wm", cat: "modest", name: "লং মডেস্ট গাউন", price: 3250, old: 3900, variants: [["52", 3250, 3900], ["54", 3250, 3900], ["56", 3350, 3990]] },
    { id: "hb", cat: "gift", name: "লেদার ট্রাভেল ব্যাগ", price: 2850, old: 3400, unit: "১ পিস" },
  ],
};
