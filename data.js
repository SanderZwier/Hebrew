// Biblical Hebrew Learning App — Data Module

const HEBREW_LETTERS = [
  {
    id: "aleph",
    letter: "א",
    name: "Aleph",
    nameHebrew: "אָלֶף",
    transliteration: "ʾ",
    sound: "Silent (glottal stop)",
    value: 1,
    isFinal: false,
    group: "guttural"
  },
  {
    id: "bet",
    letter: "בּ",
    letterNoDagesh: "ב",
    name: "Bet",
    nameHebrew: "בֵּית",
    transliteration: "b (v without dagesh)",
    sound: "b as in boy (v as in vine)",
    value: 2,
    isFinal: false,
    group: "begadkefat"
  },
  {
    id: "gimel",
    letter: "גּ",
    letterNoDagesh: "ג",
    name: "Gimel",
    nameHebrew: "גִּימֶל",
    transliteration: "g",
    sound: "g as in good",
    value: 3,
    isFinal: false,
    group: "begadkefat"
  },
  {
    id: "dalet",
    letter: "דּ",
    letterNoDagesh: "ד",
    name: "Dalet",
    nameHebrew: "דָּלֶת",
    transliteration: "d",
    sound: "d as in door",
    value: 4,
    isFinal: false,
    group: "begadkefat"
  },
  {
    id: "he",
    letter: "ה",
    name: "He",
    nameHebrew: "הֵא",
    transliteration: "h",
    sound: "h as in hat",
    value: 5,
    isFinal: false,
    group: "guttural"
  },
  {
    id: "vav",
    letter: "ו",
    name: "Vav",
    nameHebrew: "וָו",
    transliteration: "v / w",
    sound: "v as in vine",
    value: 6,
    isFinal: false,
    group: "regular"
  },
  {
    id: "zayin",
    letter: "ז",
    name: "Zayin",
    nameHebrew: "זַיִן",
    transliteration: "z",
    sound: "z as in zero",
    value: 7,
    isFinal: false,
    group: "regular"
  },
  {
    id: "chet",
    letter: "ח",
    name: "Chet",
    nameHebrew: "חֵית",
    transliteration: "ḥ",
    sound: "ch as in Bach (guttural)",
    value: 8,
    isFinal: false,
    group: "guttural"
  },
  {
    id: "tet",
    letter: "ט",
    name: "Tet",
    nameHebrew: "טֵית",
    transliteration: "ṭ",
    sound: "t as in tall (emphatic)",
    value: 9,
    isFinal: false,
    group: "emphatic"
  },
  {
    id: "yod",
    letter: "י",
    name: "Yod",
    nameHebrew: "יוֹד",
    transliteration: "y",
    sound: "y as in yes",
    value: 10,
    isFinal: false,
    group: "regular"
  },
  {
    id: "kaf",
    letter: "כּ",
    letterNoDagesh: "כ",
    name: "Kaf",
    nameHebrew: "כַּף",
    transliteration: "k (kh without dagesh)",
    sound: "k as in king (kh as in Bach)",
    value: 20,
    isFinal: false,
    group: "begadkefat"
  },
  {
    id: "kaf-final",
    letter: "ך",
    name: "Final Kaf",
    nameHebrew: "כַּף סוֹפִית",
    transliteration: "kh",
    sound: "kh as in Bach (final form)",
    value: 500,
    isFinal: true,
    baseId: "kaf",
    group: "begadkefat"
  },
  {
    id: "lamed",
    letter: "ל",
    name: "Lamed",
    nameHebrew: "לָמֶד",
    transliteration: "l",
    sound: "l as in lamp",
    value: 30,
    isFinal: false,
    group: "regular"
  },
  {
    id: "mem",
    letter: "מ",
    name: "Mem",
    nameHebrew: "מֵם",
    transliteration: "m",
    sound: "m as in mother",
    value: 40,
    isFinal: false,
    group: "regular"
  },
  {
    id: "mem-final",
    letter: "ם",
    name: "Final Mem",
    nameHebrew: "מֵם סוֹפִית",
    transliteration: "m",
    sound: "m as in mother (final form)",
    value: 600,
    isFinal: true,
    baseId: "mem",
    group: "regular"
  },
  {
    id: "nun",
    letter: "נ",
    name: "Nun",
    nameHebrew: "נוּן",
    transliteration: "n",
    sound: "n as in now",
    value: 50,
    isFinal: false,
    group: "regular"
  },
  {
    id: "nun-final",
    letter: "ן",
    name: "Final Nun",
    nameHebrew: "נוּן סוֹפִית",
    transliteration: "n",
    sound: "n as in now (final form)",
    value: 700,
    isFinal: true,
    baseId: "nun",
    group: "regular"
  },
  {
    id: "samekh",
    letter: "ס",
    name: "Samekh",
    nameHebrew: "סָמֶך",
    transliteration: "s",
    sound: "s as in sun",
    value: 60,
    isFinal: false,
    group: "regular"
  },
  {
    id: "ayin",
    letter: "ע",
    name: "Ayin",
    nameHebrew: "עַיִן",
    transliteration: "ʿ",
    sound: "Silent (pharyngeal fricative)",
    value: 70,
    isFinal: false,
    group: "guttural"
  },
  {
    id: "pe",
    letter: "פּ",
    letterNoDagesh: "פ",
    name: "Pe",
    nameHebrew: "פֵּא",
    transliteration: "p (f without dagesh)",
    sound: "p as in park (f as in fun)",
    value: 80,
    isFinal: false,
    group: "begadkefat"
  },
  {
    id: "pe-final",
    letter: "ף",
    name: "Final Pe",
    nameHebrew: "פֵּא סוֹפִית",
    transliteration: "f",
    sound: "f as in fun (final form)",
    value: 800,
    isFinal: true,
    baseId: "pe",
    group: "begadkefat"
  },
  {
    id: "tsade",
    letter: "צ",
    name: "Tsade",
    nameHebrew: "צָדֵי",
    transliteration: "ts",
    sound: "ts as in cats (emphatic)",
    value: 90,
    isFinal: false,
    group: "emphatic"
  },
  {
    id: "tsade-final",
    letter: "ץ",
    name: "Final Tsade",
    nameHebrew: "צָדֵי סוֹפִית",
    transliteration: "ts",
    sound: "ts as in cats (final form)",
    value: 900,
    isFinal: true,
    baseId: "tsade",
    group: "emphatic"
  },
  {
    id: "qof",
    letter: "ק",
    name: "Qof",
    nameHebrew: "קוֹף",
    transliteration: "q",
    sound: "k as in king (back of throat)",
    value: 100,
    isFinal: false,
    group: "emphatic"
  },
  {
    id: "resh",
    letter: "ר",
    name: "Resh",
    nameHebrew: "רֵישׁ",
    transliteration: "r",
    sound: "r as in run (slightly rolled)",
    value: 200,
    isFinal: false,
    group: "guttural"
  },
  {
    id: "shin",
    letter: "שׁ",
    name: "Shin",
    nameHebrew: "שִׁין",
    transliteration: "sh",
    sound: "sh as in ship",
    value: 300,
    isFinal: false,
    group: "regular",
    variant: "sin"
  },
  {
    id: "sin",
    letter: "שׂ",
    name: "Sin",
    nameHebrew: "שִׂין",
    transliteration: "s",
    sound: "s as in sun",
    value: 300,
    isFinal: false,
    group: "regular",
    variant: "shin"
  },
  {
    id: "tav",
    letter: "תּ",
    letterNoDagesh: "ת",
    name: "Tav",
    nameHebrew: "תָּו",
    transliteration: "t",
    sound: "t as in tall",
    value: 400,
    isFinal: false,
    group: "begadkefat"
  }
];

const NIKKUD = [
  {
    id: "patach",
    symbol: "\u05B7",
    name: "Patach",
    transliteration: "a",
    sound: "a as in father (short)",
    type: "short",
    example: "בַּ"
  },
  {
    id: "qamats",
    symbol: "\u05B8",
    name: "Qamats",
    transliteration: "a",
    sound: "a as in father (long)",
    type: "long",
    example: "בָּ"
  },
  {
    id: "segol",
    symbol: "\u05B6",
    name: "Segol",
    transliteration: "e",
    sound: "e as in bed (short)",
    type: "short",
    example: "בֶּ"
  },
  {
    id: "tsere",
    symbol: "\u05B5",
    name: "Tsere",
    transliteration: "e",
    sound: "ey as in they (long)",
    type: "long",
    example: "בֵּ"
  },
  {
    id: "hiriq",
    symbol: "\u05B4",
    name: "Hiriq",
    transliteration: "i",
    sound: "i as in machine",
    type: "short",
    example: "בִּ"
  },
  {
    id: "holam",
    symbol: "\u05B9",
    name: "Holam",
    transliteration: "o",
    sound: "o as in go (long)",
    type: "long",
    example: "בֹּ"
  },
  {
    id: "qamats-hatuf",
    symbol: "\u05B8",
    name: "Qamats Hatuf",
    transliteration: "o",
    sound: "o as in pot (short)",
    type: "short",
    example: "כָּל"
  },
  {
    id: "qubuts",
    symbol: "\u05BB",
    name: "Qubuts",
    transliteration: "u",
    sound: "u as in rule (short)",
    type: "short",
    example: "בֻּ"
  },
  {
    id: "shuruk",
    symbol: "וּ",
    name: "Shuruk",
    transliteration: "u",
    sound: "u as in rule (long)",
    type: "long",
    example: "שׁוּב"
  },
  {
    id: "shva",
    symbol: "\u05B0",
    name: "Shva",
    transliteration: "ə (or silent)",
    sound: "Very short 'e' or silent",
    type: "reduced",
    example: "בְּ"
  },
  {
    id: "hataf-patach",
    symbol: "\u05B2",
    name: "Hataf Patach",
    transliteration: "a",
    sound: "Quick a as in father",
    type: "reduced",
    example: "אֲ"
  },
  {
    id: "hataf-segol",
    symbol: "\u05B1",
    name: "Hataf Segol",
    transliteration: "e",
    sound: "Quick e as in bed",
    type: "reduced",
    example: "אֱ"
  },
  {
    id: "hataf-qamats",
    symbol: "\u05B3",
    name: "Hataf Qamats",
    transliteration: "o",
    sound: "Quick o as in pot",
    type: "reduced",
    example: "אֳ"
  }
];

const VOCABULARY = [
  // Theological terms
  {
    id: "v-elohim",
    hebrew: "אֱלֹהִים",
    hebrewNoNikkud: "אלהים",
    transliteration: "Elohim",
    english: "God",
    category: "theology",
    frequency: 2602
  },
  {
    id: "v-yhwh",
    hebrew: "יהוה",
    hebrewNoNikkud: "יהוה",
    transliteration: "YHWH (Adonai)",
    english: "The LORD",
    category: "theology",
    frequency: 6828
  },
  {
    id: "v-ruach",
    hebrew: "רוּחַ",
    hebrewNoNikkud: "רוח",
    transliteration: "ruach",
    english: "spirit, wind, breath",
    category: "theology",
    frequency: 378
  },
  {
    id: "v-torah",
    hebrew: "תּוֹרָה",
    hebrewNoNikkud: "תורה",
    transliteration: "torah",
    english: "law, instruction, teaching",
    category: "theology",
    frequency: 223
  },
  {
    id: "v-shalom",
    hebrew: "שָׁלוֹם",
    hebrewNoNikkud: "שלום",
    transliteration: "shalom",
    english: "peace, wholeness",
    category: "theology",
    frequency: 237
  },
  {
    id: "v-berith",
    hebrew: "בְּרִית",
    hebrewNoNikkud: "ברית",
    transliteration: "berit",
    english: "covenant",
    category: "theology",
    frequency: 287
  },
  {
    id: "v-qodesh",
    hebrew: "קֹדֶשׁ",
    hebrewNoNikkud: "קדש",
    transliteration: "qodesh",
    english: "holiness, holy",
    category: "theology",
    frequency: 470
  },
  {
    id: "v-chesed",
    hebrew: "חֶסֶד",
    hebrewNoNikkud: "חסד",
    transliteration: "chesed",
    english: "steadfast love, kindness",
    category: "theology",
    frequency: 249
  },

  // People & family
  {
    id: "v-adam",
    hebrew: "אָדָם",
    hebrewNoNikkud: "אדם",
    transliteration: "adam",
    english: "man, human, Adam",
    category: "people",
    frequency: 562
  },
  {
    id: "v-ish",
    hebrew: "אִישׁ",
    hebrewNoNikkud: "איש",
    transliteration: "ish",
    english: "man, husband",
    category: "people",
    frequency: 2188
  },
  {
    id: "v-ishah",
    hebrew: "אִשָּׁה",
    hebrewNoNikkud: "אשה",
    transliteration: "ishah",
    english: "woman, wife",
    category: "people",
    frequency: 781
  },
  {
    id: "v-ben",
    hebrew: "בֵּן",
    hebrewNoNikkud: "בן",
    transliteration: "ben",
    english: "son",
    category: "people",
    frequency: 4941
  },
  {
    id: "v-bat",
    hebrew: "בַּת",
    hebrewNoNikkud: "בת",
    transliteration: "bat",
    english: "daughter",
    category: "people",
    frequency: 587
  },
  {
    id: "v-av",
    hebrew: "אָב",
    hebrewNoNikkud: "אב",
    transliteration: "av",
    english: "father",
    category: "people",
    frequency: 1210
  },
  {
    id: "v-em",
    hebrew: "אֵם",
    hebrewNoNikkud: "אם",
    transliteration: "em",
    english: "mother",
    category: "people",
    frequency: 220
  },
  {
    id: "v-am",
    hebrew: "עַם",
    hebrewNoNikkud: "עם",
    transliteration: "am",
    english: "people, nation",
    category: "people",
    frequency: 1869
  },
  {
    id: "v-melek",
    hebrew: "מֶלֶךְ",
    hebrewNoNikkud: "מלך",
    transliteration: "melekh",
    english: "king",
    category: "people",
    frequency: 2530
  },
  {
    id: "v-kohen",
    hebrew: "כֹּהֵן",
    hebrewNoNikkud: "כהן",
    transliteration: "kohen",
    english: "priest",
    category: "people",
    frequency: 750
  },
  {
    id: "v-navi",
    hebrew: "נָבִיא",
    hebrewNoNikkud: "נביא",
    transliteration: "navi",
    english: "prophet",
    category: "people",
    frequency: 317
  },

  // Nature & creation
  {
    id: "v-eretz",
    hebrew: "אֶרֶץ",
    hebrewNoNikkud: "ארץ",
    transliteration: "erets",
    english: "land, earth",
    category: "nature",
    frequency: 2504
  },
  {
    id: "v-shamayim",
    hebrew: "שָׁמַיִם",
    hebrewNoNikkud: "שמים",
    transliteration: "shamayim",
    english: "heaven, sky",
    category: "nature",
    frequency: 421
  },
  {
    id: "v-mayim",
    hebrew: "מַיִם",
    hebrewNoNikkud: "מים",
    transliteration: "mayim",
    english: "water",
    category: "nature",
    frequency: 585
  },
  {
    id: "v-yom",
    hebrew: "יוֹם",
    hebrewNoNikkud: "יום",
    transliteration: "yom",
    english: "day",
    category: "nature",
    frequency: 2304
  },
  {
    id: "v-lailah",
    hebrew: "לַיְלָה",
    hebrewNoNikkud: "לילה",
    transliteration: "lailah",
    english: "night",
    category: "nature",
    frequency: 233
  },
  {
    id: "v-or",
    hebrew: "אוֹר",
    hebrewNoNikkud: "אור",
    transliteration: "or",
    english: "light",
    category: "nature",
    frequency: 120
  },
  {
    id: "v-esh",
    hebrew: "אֵשׁ",
    hebrewNoNikkud: "אש",
    transliteration: "esh",
    english: "fire",
    category: "nature",
    frequency: 376
  },
  {
    id: "v-ets",
    hebrew: "עֵץ",
    hebrewNoNikkud: "עץ",
    transliteration: "ets",
    english: "tree, wood",
    category: "nature",
    frequency: 329
  },
  {
    id: "v-har",
    hebrew: "הַר",
    hebrewNoNikkud: "הר",
    transliteration: "har",
    english: "mountain",
    category: "nature",
    frequency: 558
  },
  {
    id: "v-nahar",
    hebrew: "נָהָר",
    hebrewNoNikkud: "נהר",
    transliteration: "nahar",
    english: "river",
    category: "nature",
    frequency: 119
  },

  // Common verbs
  {
    id: "v-amar",
    hebrew: "אָמַר",
    hebrewNoNikkud: "אמר",
    transliteration: "amar",
    english: "to say, to speak",
    category: "verbs",
    frequency: 5316
  },
  {
    id: "v-halak",
    hebrew: "הָלַךְ",
    hebrewNoNikkud: "הלך",
    transliteration: "halakh",
    english: "to walk, to go",
    category: "verbs",
    frequency: 1554
  },
  {
    id: "v-natan",
    hebrew: "נָתַן",
    hebrewNoNikkud: "נתן",
    transliteration: "natan",
    english: "to give",
    category: "verbs",
    frequency: 2014
  },
  {
    id: "v-asah",
    hebrew: "עָשָׂה",
    hebrewNoNikkud: "עשה",
    transliteration: "asah",
    english: "to do, to make",
    category: "verbs",
    frequency: 2632
  },
  {
    id: "v-yada",
    hebrew: "יָדַע",
    hebrewNoNikkud: "ידע",
    transliteration: "yada",
    english: "to know",
    category: "verbs",
    frequency: 956
  },
  {
    id: "v-shama",
    hebrew: "שָׁמַע",
    hebrewNoNikkud: "שמע",
    transliteration: "shama",
    english: "to hear, to listen",
    category: "verbs",
    frequency: 1165
  },
  {
    id: "v-ra-ah",
    hebrew: "רָאָה",
    hebrewNoNikkud: "ראה",
    transliteration: "ra'ah",
    english: "to see",
    category: "verbs",
    frequency: 1311
  },
  {
    id: "v-bo",
    hebrew: "בּוֹא",
    hebrewNoNikkud: "בוא",
    transliteration: "bo",
    english: "to come, to enter",
    category: "verbs",
    frequency: 2592
  },
  {
    id: "v-diber",
    hebrew: "דִּבֶּר",
    hebrewNoNikkud: "דבר",
    transliteration: "dibber",
    english: "to speak",
    category: "verbs",
    frequency: 1136
  },
  {
    id: "v-yashav",
    hebrew: "יָשַׁב",
    hebrewNoNikkud: "ישב",
    transliteration: "yashav",
    english: "to sit, to dwell",
    category: "verbs",
    frequency: 1088
  },
  {
    id: "v-shub",
    hebrew: "שׁוּב",
    hebrewNoNikkud: "שוב",
    transliteration: "shuv",
    english: "to return, to repent",
    category: "verbs",
    frequency: 1075
  },
  {
    id: "v-katav",
    hebrew: "כָּתַב",
    hebrewNoNikkud: "כתב",
    transliteration: "katav",
    english: "to write",
    category: "verbs",
    frequency: 225
  },

  // Common nouns & objects
  {
    id: "v-davar",
    hebrew: "דָּבָר",
    hebrewNoNikkud: "דבר",
    transliteration: "davar",
    english: "word, thing, matter",
    category: "nouns",
    frequency: 1455
  },
  {
    id: "v-bayit",
    hebrew: "בַּיִת",
    hebrewNoNikkud: "בית",
    transliteration: "bayit",
    english: "house",
    category: "nouns",
    frequency: 2047
  },
  {
    id: "v-ir",
    hebrew: "עִיר",
    hebrewNoNikkud: "עיר",
    transliteration: "ir",
    english: "city",
    category: "nouns",
    frequency: 1094
  },
  {
    id: "v-derekh",
    hebrew: "דֶּרֶךְ",
    hebrewNoNikkud: "דרך",
    transliteration: "derekh",
    english: "way, road, journey",
    category: "nouns",
    frequency: 712
  },
  {
    id: "v-lev",
    hebrew: "לֵב",
    hebrewNoNikkud: "לב",
    transliteration: "lev",
    english: "heart",
    category: "nouns",
    frequency: 854
  },
  {
    id: "v-yad",
    hebrew: "יָד",
    hebrewNoNikkud: "יד",
    transliteration: "yad",
    english: "hand",
    category: "nouns",
    frequency: 1627
  },
  {
    id: "v-nefesh",
    hebrew: "נֶפֶשׁ",
    hebrewNoNikkud: "נפש",
    transliteration: "nefesh",
    english: "soul, life, self",
    category: "nouns",
    frequency: 757
  },
  {
    id: "v-shem",
    hebrew: "שֵׁם",
    hebrewNoNikkud: "שם",
    transliteration: "shem",
    english: "name",
    category: "nouns",
    frequency: 864
  },
  {
    id: "v-sefer",
    hebrew: "סֵפֶר",
    hebrewNoNikkud: "ספר",
    transliteration: "sefer",
    english: "book, scroll",
    category: "nouns",
    frequency: 191
  },
  {
    id: "v-mishpat",
    hebrew: "מִשְׁפָּט",
    hebrewNoNikkud: "משפט",
    transliteration: "mishpat",
    english: "judgment, justice",
    category: "nouns",
    frequency: 425
  },

  // ── Batch 2 (words 56–105) ──────────────────────────────

  // Theology 2
  {
    id: "v-tefillah",
    hebrew: "תְּפִלָּה",
    hebrewNoNikkud: "תפלה",
    transliteration: "tefillah",
    english: "prayer",
    category: "theology",
    frequency: 77
  },
  {
    id: "v-emunah",
    hebrew: "אֱמוּנָה",
    hebrewNoNikkud: "אמונה",
    transliteration: "emunah",
    english: "faithfulness, faith",
    category: "theology",
    frequency: 49
  },
  {
    id: "v-avon",
    hebrew: "עָוֹן",
    hebrewNoNikkud: "עון",
    transliteration: "avon",
    english: "iniquity, guilt",
    category: "theology",
    frequency: 233
  },
  {
    id: "v-chatta",
    hebrew: "חַטָּאת",
    hebrewNoNikkud: "חטאת",
    transliteration: "chattat",
    english: "sin, sin offering",
    category: "theology",
    frequency: 296
  },
  {
    id: "v-kavod",
    hebrew: "כָּבוֹד",
    hebrewNoNikkud: "כבוד",
    transliteration: "kavod",
    english: "glory, honor",
    category: "theology",
    frequency: 200
  },
  {
    id: "v-tsedaqah",
    hebrew: "צְדָקָה",
    hebrewNoNikkud: "צדקה",
    transliteration: "tsedaqah",
    english: "righteousness",
    category: "theology",
    frequency: 159
  },
  {
    id: "v-olam",
    hebrew: "עוֹלָם",
    hebrewNoNikkud: "עולם",
    transliteration: "olam",
    english: "forever, eternity",
    category: "theology",
    frequency: 439
  },
  {
    id: "v-mizbeach",
    hebrew: "מִזְבֵּחַ",
    hebrewNoNikkud: "מזבח",
    transliteration: "mizbeach",
    english: "altar",
    category: "theology",
    frequency: 403
  },

  // People 2
  {
    id: "v-eved",
    hebrew: "עֶבֶד",
    hebrewNoNikkud: "עבד",
    transliteration: "eved",
    english: "servant, slave",
    category: "people",
    frequency: 800
  },
  {
    id: "v-ach",
    hebrew: "אָח",
    hebrewNoNikkud: "אח",
    transliteration: "ach",
    english: "brother",
    category: "people",
    frequency: 629
  },
  {
    id: "v-achot",
    hebrew: "אָחוֹת",
    hebrewNoNikkud: "אחות",
    transliteration: "achot",
    english: "sister",
    category: "people",
    frequency: 114
  },
  {
    id: "v-naar",
    hebrew: "נַעַר",
    hebrewNoNikkud: "נער",
    transliteration: "na'ar",
    english: "boy, youth, servant",
    category: "people",
    frequency: 240
  },
  {
    id: "v-naarah",
    hebrew: "נַעֲרָה",
    hebrewNoNikkud: "נערה",
    transliteration: "na'arah",
    english: "girl, young woman",
    category: "people",
    frequency: 76
  },
  {
    id: "v-sar",
    hebrew: "שַׂר",
    hebrewNoNikkud: "שר",
    transliteration: "sar",
    english: "prince, official",
    category: "people",
    frequency: 421
  },
  {
    id: "v-shofet",
    hebrew: "שֹׁפֵט",
    hebrewNoNikkud: "שופט",
    transliteration: "shofet",
    english: "judge",
    category: "people",
    frequency: 69
  },
  {
    id: "v-goy",
    hebrew: "גּוֹי",
    hebrewNoNikkud: "גוי",
    transliteration: "goy",
    english: "nation, people",
    category: "people",
    frequency: 567
  },

  // Nature 2
  {
    id: "v-yam",
    hebrew: "יָם",
    hebrewNoNikkud: "ים",
    transliteration: "yam",
    english: "sea",
    category: "nature",
    frequency: 396
  },
  {
    id: "v-midbar",
    hebrew: "מִדְבָּר",
    hebrewNoNikkud: "מדבר",
    transliteration: "midbar",
    english: "wilderness, desert",
    category: "nature",
    frequency: 271
  },
  {
    id: "v-even",
    hebrew: "אֶבֶן",
    hebrewNoNikkud: "אבן",
    transliteration: "even",
    english: "stone",
    category: "nature",
    frequency: 276
  },
  {
    id: "v-kochav",
    hebrew: "כּוֹכָב",
    hebrewNoNikkud: "כוכב",
    transliteration: "kokhav",
    english: "star",
    category: "nature",
    frequency: 37
  },
  {
    id: "v-anan",
    hebrew: "עָנָן",
    hebrewNoNikkud: "ענן",
    transliteration: "anan",
    english: "cloud",
    category: "nature",
    frequency: 87
  },
  {
    id: "v-geshem",
    hebrew: "גֶּשֶׁם",
    hebrewNoNikkud: "גשם",
    transliteration: "geshem",
    english: "rain",
    category: "nature",
    frequency: 35
  },
  {
    id: "v-sadeh",
    hebrew: "שָׂדֶה",
    hebrewNoNikkud: "שדה",
    transliteration: "sadeh",
    english: "field",
    category: "nature",
    frequency: 329
  },
  {
    id: "v-chol",
    hebrew: "חוֹל",
    hebrewNoNikkud: "חול",
    transliteration: "chol",
    english: "sand",
    category: "nature",
    frequency: 23
  },

  // Verbs 2
  {
    id: "v-avar",
    hebrew: "עָבַר",
    hebrewNoNikkud: "עבר",
    transliteration: "avar",
    english: "to pass over, to cross",
    category: "verbs",
    frequency: 553
  },
  {
    id: "v-lakach",
    hebrew: "לָקַח",
    hebrewNoNikkud: "לקח",
    transliteration: "laqach",
    english: "to take",
    category: "verbs",
    frequency: 967
  },
  {
    id: "v-qara",
    hebrew: "קָרָא",
    hebrewNoNikkud: "קרא",
    transliteration: "qara",
    english: "to call, to read",
    category: "verbs",
    frequency: 739
  },
  {
    id: "v-shalach",
    hebrew: "שָׁלַח",
    hebrewNoNikkud: "שלח",
    transliteration: "shalach",
    english: "to send",
    category: "verbs",
    frequency: 847
  },
  {
    id: "v-akhal",
    hebrew: "אָכַל",
    hebrewNoNikkud: "אכל",
    transliteration: "akhal",
    english: "to eat",
    category: "verbs",
    frequency: 820
  },
  {
    id: "v-muth",
    hebrew: "מוּת",
    hebrewNoNikkud: "מות",
    transliteration: "mut",
    english: "to die",
    category: "verbs",
    frequency: 854
  },
  {
    id: "v-nasa",
    hebrew: "נָשָׂא",
    hebrewNoNikkud: "נשא",
    transliteration: "nasa",
    english: "to lift, to carry",
    category: "verbs",
    frequency: 659
  },
  {
    id: "v-samach",
    hebrew: "שָׂמַח",
    hebrewNoNikkud: "שמח",
    transliteration: "samach",
    english: "to rejoice, to be glad",
    category: "verbs",
    frequency: 156
  },

  // Nouns 2
  {
    id: "v-lechem",
    hebrew: "לֶחֶם",
    hebrewNoNikkud: "לחם",
    transliteration: "lechem",
    english: "bread, food",
    category: "nouns",
    frequency: 298
  },
  {
    id: "v-dam",
    hebrew: "דָּם",
    hebrewNoNikkud: "דם",
    transliteration: "dam",
    english: "blood",
    category: "nouns",
    frequency: 361
  },
  {
    id: "v-chayim",
    hebrew: "חַיִּים",
    hebrewNoNikkud: "חיים",
    transliteration: "chayyim",
    english: "life",
    category: "nouns",
    frequency: 269
  },
  {
    id: "v-mavet",
    hebrew: "מָוֶת",
    hebrewNoNikkud: "מות",
    transliteration: "mavet",
    english: "death",
    category: "nouns",
    frequency: 153
  },
  {
    id: "v-kol",
    hebrew: "קוֹל",
    hebrewNoNikkud: "קול",
    transliteration: "qol",
    english: "voice, sound",
    category: "nouns",
    frequency: 506
  },
  {
    id: "v-panim",
    hebrew: "פָּנִים",
    hebrewNoNikkud: "פנים",
    transliteration: "panim",
    english: "face",
    category: "nouns",
    frequency: 2126
  },
  {
    id: "v-ayin",
    hebrew: "עַיִן",
    hebrewNoNikkud: "עין",
    transliteration: "ayin",
    english: "eye, spring",
    category: "nouns",
    frequency: 887
  },
  {
    id: "v-regel",
    hebrew: "רֶגֶל",
    hebrewNoNikkud: "רגל",
    transliteration: "regel",
    english: "foot",
    category: "nouns",
    frequency: 251
  },
  {
    id: "v-rosh",
    hebrew: "רֹאשׁ",
    hebrewNoNikkud: "ראש",
    transliteration: "rosh",
    english: "head, top",
    category: "nouns",
    frequency: 600
  },
  {
    id: "v-peh",
    hebrew: "פֶּה",
    hebrewNoNikkud: "פה",
    transliteration: "peh",
    english: "mouth",
    category: "nouns",
    frequency: 498
  },

  // ── Batch 3 (words 106–155) ─────────────────────────────

  // Theology 3
  {
    id: "v-todah",
    hebrew: "תּוֹדָה",
    hebrewNoNikkud: "תודה",
    transliteration: "todah",
    english: "thanksgiving, praise",
    category: "theology",
    frequency: 32
  },
  {
    id: "v-korban",
    hebrew: "קָרְבָּן",
    hebrewNoNikkud: "קרבן",
    transliteration: "qorban",
    english: "offering, sacrifice",
    category: "theology",
    frequency: 80
  },
  {
    id: "v-teshuvah",
    hebrew: "תְּשׁוּבָה",
    hebrewNoNikkud: "תשובה",
    transliteration: "teshuvah",
    english: "repentance, return",
    category: "theology",
    frequency: 8
  },
  {
    id: "v-geulah",
    hebrew: "גְּאֻלָּה",
    hebrewNoNikkud: "גאולה",
    transliteration: "geulah",
    english: "redemption",
    category: "theology",
    frequency: 14
  },
  {
    id: "v-tehillah",
    hebrew: "תְּהִלָּה",
    hebrewNoNikkud: "תהלה",
    transliteration: "tehillah",
    english: "praise, hymn",
    category: "theology",
    frequency: 57
  },
  {
    id: "v-yeshuah",
    hebrew: "יְשׁוּעָה",
    hebrewNoNikkud: "ישועה",
    transliteration: "yeshuah",
    english: "salvation, deliverance",
    category: "theology",
    frequency: 78
  },
  {
    id: "v-rachamim",
    hebrew: "רַחֲמִים",
    hebrewNoNikkud: "רחמים",
    transliteration: "rachamim",
    english: "mercy, compassion",
    category: "theology",
    frequency: 44
  },
  {
    id: "v-kedushah",
    hebrew: "קְדֻשָּׁה",
    hebrewNoNikkud: "קדושה",
    transliteration: "qedushah",
    english: "holiness, sanctity",
    category: "theology",
    frequency: 12
  },

  // People 3
  {
    id: "v-almah",
    hebrew: "עַלְמָה",
    hebrewNoNikkud: "עלמה",
    transliteration: "almah",
    english: "young woman, maiden",
    category: "people",
    frequency: 9
  },
  {
    id: "v-zaqen",
    hebrew: "זָקֵן",
    hebrewNoNikkud: "זקן",
    transliteration: "zaqen",
    english: "elder, old man",
    category: "people",
    frequency: 178
  },
  {
    id: "v-ger",
    hebrew: "גֵּר",
    hebrewNoNikkud: "גר",
    transliteration: "ger",
    english: "stranger, sojourner",
    category: "people",
    frequency: 92
  },
  {
    id: "v-gibbor",
    hebrew: "גִּבּוֹר",
    hebrewNoNikkud: "גבור",
    transliteration: "gibbor",
    english: "mighty man, warrior",
    category: "people",
    frequency: 159
  },
  {
    id: "v-yeled",
    hebrew: "יֶלֶד",
    hebrewNoNikkud: "ילד",
    transliteration: "yeled",
    english: "child, boy",
    category: "people",
    frequency: 89
  },
  {
    id: "v-roi",
    hebrew: "רֹעֶה",
    hebrewNoNikkud: "רועה",
    transliteration: "ro'eh",
    english: "shepherd",
    category: "people",
    frequency: 62
  },
  {
    id: "v-oyev",
    hebrew: "אֹיֵב",
    hebrewNoNikkud: "אויב",
    transliteration: "oyev",
    english: "enemy",
    category: "people",
    frequency: 285
  },
  {
    id: "v-malakh",
    hebrew: "מַלְאָךְ",
    hebrewNoNikkud: "מלאך",
    transliteration: "mal'akh",
    english: "angel, messenger",
    category: "people",
    frequency: 213
  },

  // Nature 3
  {
    id: "v-gan",
    hebrew: "גַּן",
    hebrewNoNikkud: "גן",
    transliteration: "gan",
    english: "garden",
    category: "nature",
    frequency: 57
  },
  {
    id: "v-perach",
    hebrew: "פֶּרַח",
    hebrewNoNikkud: "פרח",
    transliteration: "perach",
    english: "flower, blossom",
    category: "nature",
    frequency: 17
  },
  {
    id: "v-peri",
    hebrew: "פְּרִי",
    hebrewNoNikkud: "פרי",
    transliteration: "peri",
    english: "fruit",
    category: "nature",
    frequency: 119
  },
  {
    id: "v-kerem",
    hebrew: "כֶּרֶם",
    hebrewNoNikkud: "כרם",
    transliteration: "kerem",
    english: "vineyard",
    category: "nature",
    frequency: 94
  },
  {
    id: "v-afar",
    hebrew: "עָפָר",
    hebrewNoNikkud: "עפר",
    transliteration: "afar",
    english: "dust, earth",
    category: "nature",
    frequency: 110
  },
  {
    id: "v-ruach-2",
    hebrew: "רוּחַ",
    hebrewNoNikkud: "רוח",
    transliteration: "ruach",
    english: "wind",
    category: "nature",
    frequency: 378
  },
  {
    id: "v-shamash",
    hebrew: "שֶׁמֶשׁ",
    hebrewNoNikkud: "שמש",
    transliteration: "shemesh",
    english: "sun",
    category: "nature",
    frequency: 134
  },
  {
    id: "v-yareach",
    hebrew: "יָרֵחַ",
    hebrewNoNikkud: "ירח",
    transliteration: "yareach",
    english: "moon",
    category: "nature",
    frequency: 26
  },

  // Verbs 3
  {
    id: "v-bara",
    hebrew: "בָּרָא",
    hebrewNoNikkud: "ברא",
    transliteration: "bara",
    english: "to create",
    category: "verbs",
    frequency: 48
  },
  {
    id: "v-tsivah",
    hebrew: "צִוָּה",
    hebrewNoNikkud: "צוה",
    transliteration: "tsivah",
    english: "to command",
    category: "verbs",
    frequency: 496
  },
  {
    id: "v-shamar",
    hebrew: "שָׁמַר",
    hebrewNoNikkud: "שמר",
    transliteration: "shamar",
    english: "to keep, to guard",
    category: "verbs",
    frequency: 469
  },
  {
    id: "v-yadah",
    hebrew: "יָדָה",
    hebrewNoNikkud: "ידה",
    transliteration: "yadah",
    english: "to praise, to give thanks",
    category: "verbs",
    frequency: 111
  },
  {
    id: "v-barak",
    hebrew: "בָּרַךְ",
    hebrewNoNikkud: "ברך",
    transliteration: "barakh",
    english: "to bless, to kneel",
    category: "verbs",
    frequency: 327
  },
  {
    id: "v-palal",
    hebrew: "פָּלַל",
    hebrewNoNikkud: "פלל",
    transliteration: "palal",
    english: "to pray",
    category: "verbs",
    frequency: 84
  },
  {
    id: "v-zakar",
    hebrew: "זָכַר",
    hebrewNoNikkud: "זכר",
    transliteration: "zakhar",
    english: "to remember",
    category: "verbs",
    frequency: 235
  },
  {
    id: "v-batach",
    hebrew: "בָּטַח",
    hebrewNoNikkud: "בטח",
    transliteration: "batach",
    english: "to trust",
    category: "verbs",
    frequency: 120
  },

  // Nouns 3
  {
    id: "v-shulchan",
    hebrew: "שֻׁלְחָן",
    hebrewNoNikkud: "שלחן",
    transliteration: "shulchan",
    english: "table",
    category: "nouns",
    frequency: 71
  },
  {
    id: "v-kos",
    hebrew: "כּוֹס",
    hebrewNoNikkud: "כוס",
    transliteration: "kos",
    english: "cup",
    category: "nouns",
    frequency: 31
  },
  {
    id: "v-shaar",
    hebrew: "שַׁעַר",
    hebrewNoNikkud: "שער",
    transliteration: "sha'ar",
    english: "gate",
    category: "nouns",
    frequency: 373
  },
  {
    id: "v-cherev",
    hebrew: "חֶרֶב",
    hebrewNoNikkud: "חרב",
    transliteration: "cherev",
    english: "sword",
    category: "nouns",
    frequency: 413
  },
  {
    id: "v-beged",
    hebrew: "בֶּגֶד",
    hebrewNoNikkud: "בגד",
    transliteration: "beged",
    english: "garment, clothing",
    category: "nouns",
    frequency: 217
  },
  {
    id: "v-kesef",
    hebrew: "כֶּסֶף",
    hebrewNoNikkud: "כסף",
    transliteration: "kesef",
    english: "silver, money",
    category: "nouns",
    frequency: 403
  },
  {
    id: "v-zahav",
    hebrew: "זָהָב",
    hebrewNoNikkud: "זהב",
    transliteration: "zahav",
    english: "gold",
    category: "nouns",
    frequency: 392
  },
  {
    id: "v-ohel",
    hebrew: "אֹהֶל",
    hebrewNoNikkud: "אהל",
    transliteration: "ohel",
    english: "tent",
    category: "nouns",
    frequency: 348
  },

  // ── Batch 4 (words 156–205) ─────────────────────────────

  // Theology 4
  {
    id: "v-mikdash",
    hebrew: "מִקְדָּשׁ",
    hebrewNoNikkud: "מקדש",
    transliteration: "miqdash",
    english: "sanctuary",
    category: "theology",
    frequency: 75
  },
  {
    id: "v-kapporet",
    hebrew: "כַּפֹּרֶת",
    hebrewNoNikkud: "כפורת",
    transliteration: "kapporet",
    english: "mercy seat, atonement cover",
    category: "theology",
    frequency: 27
  },
  {
    id: "v-neder",
    hebrew: "נֶדֶר",
    hebrewNoNikkud: "נדר",
    transliteration: "neder",
    english: "vow",
    category: "theology",
    frequency: 60
  },
  {
    id: "v-moed",
    hebrew: "מוֹעֵד",
    hebrewNoNikkud: "מועד",
    transliteration: "mo'ed",
    english: "appointed time, festival",
    category: "theology",
    frequency: 223
  },
  {
    id: "v-shabbat",
    hebrew: "שַׁבָּת",
    hebrewNoNikkud: "שבת",
    transliteration: "shabbat",
    english: "Sabbath, rest",
    category: "theology",
    frequency: 111
  },
  {
    id: "v-chet",
    hebrew: "חֵטְא",
    hebrewNoNikkud: "חטא",
    transliteration: "chet",
    english: "sin",
    category: "theology",
    frequency: 34
  },
  {
    id: "v-nachalah",
    hebrew: "נַחֲלָה",
    hebrewNoNikkud: "נחלה",
    transliteration: "nachalah",
    english: "inheritance, portion",
    category: "theology",
    frequency: 222
  },
  {
    id: "v-emet",
    hebrew: "אֱמֶת",
    hebrewNoNikkud: "אמת",
    transliteration: "emet",
    english: "truth, faithfulness",
    category: "theology",
    frequency: 127
  },

  // People 4
  {
    id: "v-tsava",
    hebrew: "צָבָא",
    hebrewNoNikkud: "צבא",
    transliteration: "tsava",
    english: "army, host",
    category: "people",
    frequency: 487
  },
  {
    id: "v-mishpachah",
    hebrew: "מִשְׁפָּחָה",
    hebrewNoNikkud: "משפחה",
    transliteration: "mishpachah",
    english: "family, clan",
    category: "people",
    frequency: 304
  },
  {
    id: "v-dor",
    hebrew: "דּוֹר",
    hebrewNoNikkud: "דור",
    transliteration: "dor",
    english: "generation",
    category: "people",
    frequency: 167
  },
  {
    id: "v-almana",
    hebrew: "אַלְמָנָה",
    hebrewNoNikkud: "אלמנה",
    transliteration: "almanah",
    english: "widow",
    category: "people",
    frequency: 55
  },
  {
    id: "v-yatom",
    hebrew: "יָתוֹם",
    hebrewNoNikkud: "יתום",
    transliteration: "yatom",
    english: "orphan, fatherless",
    category: "people",
    frequency: 42
  },
  {
    id: "v-rasha",
    hebrew: "רָשָׁע",
    hebrewNoNikkud: "רשע",
    transliteration: "rasha",
    english: "wicked person",
    category: "people",
    frequency: 263
  },
  {
    id: "v-tsaddiq",
    hebrew: "צַדִּיק",
    hebrewNoNikkud: "צדיק",
    transliteration: "tsaddiq",
    english: "righteous person",
    category: "people",
    frequency: 206
  },
  {
    id: "v-chokhma",
    hebrew: "חָכְמָה",
    hebrewNoNikkud: "חכמה",
    transliteration: "chokhmah",
    english: "wisdom",
    category: "people",
    frequency: 153
  },

  // Nature 4
  {
    id: "v-tal",
    hebrew: "טַל",
    hebrewNoNikkud: "טל",
    transliteration: "tal",
    english: "dew",
    category: "nature",
    frequency: 31
  },
  {
    id: "v-sheleg",
    hebrew: "שֶׁלֶג",
    hebrewNoNikkud: "שלג",
    transliteration: "sheleg",
    english: "snow",
    category: "nature",
    frequency: 20
  },
  {
    id: "v-barad",
    hebrew: "בָּרָד",
    hebrewNoNikkud: "ברד",
    transliteration: "barad",
    english: "hail",
    category: "nature",
    frequency: 29
  },
  {
    id: "v-tohu",
    hebrew: "תֹּהוּ",
    hebrewNoNikkud: "תהו",
    transliteration: "tohu",
    english: "formless, void, chaos",
    category: "nature",
    frequency: 20
  },
  {
    id: "v-tehom",
    hebrew: "תְּהוֹם",
    hebrewNoNikkud: "תהום",
    transliteration: "tehom",
    english: "deep, abyss",
    category: "nature",
    frequency: 36
  },
  {
    id: "v-nesher",
    hebrew: "נֶשֶׁר",
    hebrewNoNikkud: "נשר",
    transliteration: "nesher",
    english: "eagle",
    category: "nature",
    frequency: 26
  },
  {
    id: "v-aryeh",
    hebrew: "אַרְיֵה",
    hebrewNoNikkud: "אריה",
    transliteration: "aryeh",
    english: "lion",
    category: "nature",
    frequency: 45
  },
  {
    id: "v-tson",
    hebrew: "צֹאן",
    hebrewNoNikkud: "צאן",
    transliteration: "tson",
    english: "flock, sheep",
    category: "nature",
    frequency: 274
  },

  // Verbs 4
  {
    id: "v-galah",
    hebrew: "גָּלָה",
    hebrewNoNikkud: "גלה",
    transliteration: "galah",
    english: "to reveal, to go into exile",
    category: "verbs",
    frequency: 187
  },
  {
    id: "v-ga-al",
    hebrew: "גָּאַל",
    hebrewNoNikkud: "גאל",
    transliteration: "ga'al",
    english: "to redeem",
    category: "verbs",
    frequency: 104
  },
  {
    id: "v-salach",
    hebrew: "סָלַח",
    hebrewNoNikkud: "סלח",
    transliteration: "salach",
    english: "to forgive",
    category: "verbs",
    frequency: 46
  },
  {
    id: "v-chazaq",
    hebrew: "חָזַק",
    hebrewNoNikkud: "חזק",
    transliteration: "chazaq",
    english: "to be strong, to strengthen",
    category: "verbs",
    frequency: 290
  },
  {
    id: "v-yarash",
    hebrew: "יָרַשׁ",
    hebrewNoNikkud: "ירש",
    transliteration: "yarash",
    english: "to inherit, to possess",
    category: "verbs",
    frequency: 232
  },
  {
    id: "v-banah",
    hebrew: "בָּנָה",
    hebrewNoNikkud: "בנה",
    transliteration: "banah",
    english: "to build",
    category: "verbs",
    frequency: 376
  },
  {
    id: "v-shavar",
    hebrew: "שָׁבַר",
    hebrewNoNikkud: "שבר",
    transliteration: "shavar",
    english: "to break",
    category: "verbs",
    frequency: 148
  },
  {
    id: "v-malakh-v",
    hebrew: "מָלַךְ",
    hebrewNoNikkud: "מלך",
    transliteration: "malakh",
    english: "to reign, to be king",
    category: "verbs",
    frequency: 350
  },

  // Nouns 4
  {
    id: "v-aron",
    hebrew: "אֲרוֹן",
    hebrewNoNikkud: "ארון",
    transliteration: "aron",
    english: "ark, chest",
    category: "nouns",
    frequency: 202
  },
  {
    id: "v-menorah",
    hebrew: "מְנוֹרָה",
    hebrewNoNikkud: "מנורה",
    transliteration: "menorah",
    english: "lampstand",
    category: "nouns",
    frequency: 40
  },
  {
    id: "v-keli",
    hebrew: "כְּלִי",
    hebrewNoNikkud: "כלי",
    transliteration: "keli",
    english: "vessel, instrument",
    category: "nouns",
    frequency: 325
  },
  {
    id: "v-shemen",
    hebrew: "שֶׁמֶן",
    hebrewNoNikkud: "שמן",
    transliteration: "shemen",
    english: "oil, ointment",
    category: "nouns",
    frequency: 193
  },
  {
    id: "v-yayin",
    hebrew: "יַיִן",
    hebrewNoNikkud: "יין",
    transliteration: "yayin",
    english: "wine",
    category: "nouns",
    frequency: 141
  },
  {
    id: "v-koach",
    hebrew: "כֹּחַ",
    hebrewNoNikkud: "כח",
    transliteration: "koach",
    english: "strength, power",
    category: "nouns",
    frequency: 126
  },
  {
    id: "v-chomer",
    hebrew: "חוֹמָה",
    hebrewNoNikkud: "חומה",
    transliteration: "chomah",
    english: "wall",
    category: "nouns",
    frequency: 133
  },
  {
    id: "v-magen",
    hebrew: "מָגֵן",
    hebrewNoNikkud: "מגן",
    transliteration: "magen",
    english: "shield",
    category: "nouns",
    frequency: 63
  }
];

const SCRIPTURE = [
  // ── Batch 1 (verses 1–20): Psalms ──────────────────────
  {
    id: "ps-23-1",
    hebrew: "יְהוָה רֹעִי לֹא אֶחְסָר",
    transliteration: "Adonai ro'i, lo echsar",
    english: "The LORD is my shepherd; I shall not want",
    reference: "Psalm 23:1"
  },
  {
    id: "ps-119-105",
    hebrew: "נֵר לְרַגְלִי דְבָרֶךָ וְאוֹר לִנְתִיבָתִי",
    transliteration: "Ner le-ragli devarekha, ve-or lintivati",
    english: "Your word is a lamp to my feet and a light to my path",
    reference: "Psalm 119:105"
  },
  {
    id: "ps-46-10",
    hebrew: "הַרְפּוּ וּדְעוּ כִּי אָנֹכִי אֱלֹהִים",
    transliteration: "Harpu ud'u ki anokhi Elohim",
    english: "Be still and know that I am God",
    reference: "Psalm 46:10"
  },
  {
    id: "ps-34-8",
    hebrew: "טַעֲמוּ וּרְאוּ כִּי טוֹב יְהוָה",
    transliteration: "Ta'amu ur'u ki tov Adonai",
    english: "Taste and see that the LORD is good",
    reference: "Psalm 34:8"
  },
  {
    id: "ps-150-6",
    hebrew: "כֹּל הַנְּשָׁמָה תְּהַלֵּל יָהּ הַלְלוּיָהּ",
    transliteration: "Kol ha-neshamah tehallel Yah, Halleluyah",
    english: "Let everything that has breath praise the LORD. Hallelujah!",
    reference: "Psalm 150:6"
  },
  {
    id: "ps-118-24",
    hebrew: "זֶה הַיּוֹם עָשָׂה יְהוָה נָגִילָה וְנִשְׂמְחָה בוֹ",
    transliteration: "Zeh ha-yom asah Adonai, nagilah ve-nism'chah vo",
    english: "This is the day the LORD has made; let us rejoice and be glad in it",
    reference: "Psalm 118:24"
  },
  {
    id: "ps-19-1",
    hebrew: "הַשָּׁמַיִם מְסַפְּרִים כְּבוֹד אֵל",
    transliteration: "Ha-shamayim mesapperim kevod El",
    english: "The heavens declare the glory of God",
    reference: "Psalm 19:1"
  },
  {
    id: "ps-27-1",
    hebrew: "יְהוָה אוֹרִי וְיִשְׁעִי מִמִּי אִירָא",
    transliteration: "Adonai ori ve-yish'i, mimmi ira",
    english: "The LORD is my light and my salvation — whom shall I fear?",
    reference: "Psalm 27:1"
  },
  {
    id: "ps-51-10",
    hebrew: "לֵב טָהוֹר בְּרָא לִי אֱלֹהִים",
    transliteration: "Lev tahor bera li Elohim",
    english: "Create in me a clean heart, O God",
    reference: "Psalm 51:10"
  },
  {
    id: "ps-133-1",
    hebrew: "הִנֵּה מַה טּוֹב וּמַה נָּעִים שֶׁבֶת אַחִים גַּם יָחַד",
    transliteration: "Hinneh mah tov u-mah na'im shevet achim gam yachad",
    english: "How good and pleasant it is when brothers dwell together in unity",
    reference: "Psalm 133:1"
  },
  {
    id: "ps-100-1",
    hebrew: "הָרִיעוּ לַיהוָה כָּל הָאָרֶץ",
    transliteration: "Hari'u l'Adonai kol ha-arets",
    english: "Shout for joy to the LORD, all the earth",
    reference: "Psalm 100:1"
  },
  {
    id: "ps-121-1",
    hebrew: "אֶשָּׂא עֵינַי אֶל הֶהָרִים מֵאַיִן יָבֹא עֶזְרִי",
    transliteration: "Essa einai el he-harim, me-ayin yavo ezri",
    english: "I lift up my eyes to the mountains — where does my help come from?",
    reference: "Psalm 121:1"
  },
  {
    id: "ps-103-1",
    hebrew: "בָּרֲכִי נַפְשִׁי אֶת יְהוָה",
    transliteration: "Barakhi nafshi et Adonai",
    english: "Bless the LORD, O my soul",
    reference: "Psalm 103:1"
  },
  {
    id: "ps-136-1",
    hebrew: "הוֹדוּ לַיהוָה כִּי טוֹב כִּי לְעוֹלָם חַסְדּוֹ",
    transliteration: "Hodu l'Adonai ki tov, ki le-olam chasdo",
    english: "Give thanks to the LORD, for he is good; his steadfast love endures forever",
    reference: "Psalm 136:1"
  },
  {
    id: "ps-1-1",
    hebrew: "אַשְׁרֵי הָאִישׁ אֲשֶׁר לֹא הָלַךְ בַּעֲצַת רְשָׁעִים",
    transliteration: "Ashrei ha-ish asher lo halakh ba-atsat resha'im",
    english: "Blessed is the man who walks not in the counsel of the wicked",
    reference: "Psalm 1:1"
  },
  {
    id: "ps-37-5",
    hebrew: "גּוֹל עַל יְהוָה דַּרְכֶּךָ וּבְטַח עָלָיו",
    transliteration: "Gol al Adonai darkekhah, u-v'tach alav",
    english: "Commit your way to the LORD; trust in him",
    reference: "Psalm 37:5"
  },
  {
    id: "ps-42-1",
    hebrew: "כְּאַיָּל תַּעֲרֹג עַל אֲפִיקֵי מָיִם",
    transliteration: "Ke-ayal ta'arog al afikei mayim",
    english: "As the deer pants for streams of water",
    reference: "Psalm 42:1"
  },
  {
    id: "ps-145-18",
    hebrew: "קָרוֹב יְהוָה לְכָל קֹרְאָיו",
    transliteration: "Qarov Adonai le-khol qor'av",
    english: "The LORD is near to all who call on him",
    reference: "Psalm 145:18"
  },
  {
    id: "ps-34-14",
    hebrew: "בַּקֵּשׁ שָׁלוֹם וְרָדְפֵהוּ",
    transliteration: "Baqqesh shalom ve-rodfeihu",
    english: "Seek peace and pursue it",
    reference: "Psalm 34:14"
  },
  {
    id: "ps-16-11",
    hebrew: "תּוֹדִיעֵנִי אֹרַח חַיִּים",
    transliteration: "Todi'eni orach chayyim",
    english: "You make known to me the path of life",
    reference: "Psalm 16:11"
  },

  // ── Batch 2 (verses 21–40): Torah ──────────────────────
  {
    id: "sc-gen-1-1",
    hebrew: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
    transliteration: "Bereshit bara Elohim et ha-shamayim ve-et ha-arets",
    english: "In the beginning God created the heavens and the earth",
    reference: "Genesis 1:1"
  },
  {
    id: "sc-gen-1-3",
    hebrew: "וַיֹּאמֶר אֱלֹהִים יְהִי אוֹר וַיְהִי אוֹר",
    transliteration: "Vayomer Elohim yehi or, vayehi or",
    english: "And God said, 'Let there be light,' and there was light",
    reference: "Genesis 1:3"
  },
  {
    id: "sc-gen-1-31",
    hebrew: "וַיַּרְא אֱלֹהִים אֶת כָּל אֲשֶׁר עָשָׂה וְהִנֵּה טוֹב מְאֹד",
    transliteration: "Vayar Elohim et kol asher asah, ve-hinneh tov me'od",
    english: "And God saw everything that he had made, and behold, it was very good",
    reference: "Genesis 1:31"
  },
  {
    id: "sc-gen-2-18",
    hebrew: "לֹא טוֹב הֱיוֹת הָאָדָם לְבַדּוֹ",
    transliteration: "Lo tov heyot ha-adam levaddo",
    english: "It is not good for the man to be alone",
    reference: "Genesis 2:18"
  },
  {
    id: "sc-gen-12-1",
    hebrew: "לֶךְ לְךָ מֵאַרְצְךָ וּמִמּוֹלַדְתְּךָ וּמִבֵּית אָבִיךָ",
    transliteration: "Lekh lekha me-artsekha u-mi-moladtekha u-mi-bet avikha",
    english: "Go from your country and your kindred and your father's house",
    reference: "Genesis 12:1"
  },
  {
    id: "sc-gen-15-6",
    hebrew: "וְהֶאֱמִן בַּיהוָה וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה",
    transliteration: "Ve-he'emin b'Adonai, vayachsheveha lo tsedaqah",
    english: "And he believed the LORD, and he counted it to him as righteousness",
    reference: "Genesis 15:6"
  },
  {
    id: "sc-gen-28-15",
    hebrew: "וְהִנֵּה אָנֹכִי עִמָּךְ וּשְׁמַרְתִּיךָ בְּכֹל אֲשֶׁר תֵּלֵךְ",
    transliteration: "Ve-hinneh anokhi immakh, u-shemarttikha be-khol asher telekh",
    english: "Behold, I am with you and will keep you wherever you go",
    reference: "Genesis 28:15"
  },
  {
    id: "sc-gen-50-20",
    hebrew: "אַתֶּם חֲשַׁבְתֶּם עָלַי רָעָה אֱלֹהִים חֲשָׁבָהּ לְטֹבָה",
    transliteration: "Attem chashavtem alai ra'ah, Elohim chashavah le-tovah",
    english: "You meant evil against me, but God meant it for good",
    reference: "Genesis 50:20"
  },
  {
    id: "sc-exod-3-14",
    hebrew: "אֶהְיֶה אֲשֶׁר אֶהְיֶה",
    transliteration: "Ehyeh asher ehyeh",
    english: "I AM WHO I AM",
    reference: "Exodus 3:14"
  },
  {
    id: "sc-exod-15-2",
    hebrew: "עָזִּי וְזִמְרָת יָהּ וַיְהִי לִי לִישׁוּעָה",
    transliteration: "Azzi ve-zimrat Yah, vayehi li lishu'ah",
    english: "The LORD is my strength and my song, and he has become my salvation",
    reference: "Exodus 15:2"
  },
  {
    id: "sc-exod-20-2",
    hebrew: "אָנֹכִי יְהוָה אֱלֹהֶיךָ אֲשֶׁר הוֹצֵאתִיךָ מֵאֶרֶץ מִצְרַיִם",
    transliteration: "Anokhi Adonai Elohekha, asher hotsettikha me-erets Mitsrayim",
    english: "I am the LORD your God, who brought you out of the land of Egypt",
    reference: "Exodus 20:2"
  },
  {
    id: "sc-lev-19-18",
    hebrew: "וְאָהַבְתָּ לְרֵעֲךָ כָּמוֹךָ אֲנִי יְהוָה",
    transliteration: "Ve-ahavta le-re'akha kamokha, ani Adonai",
    english: "You shall love your neighbor as yourself: I am the LORD",
    reference: "Leviticus 19:18"
  },
  {
    id: "sc-num-6-24",
    hebrew: "יְבָרֶכְךָ יְהוָה וְיִשְׁמְרֶךָ",
    transliteration: "Yevarekh'kha Adonai ve-yishmerekha",
    english: "The LORD bless you and keep you",
    reference: "Numbers 6:24"
  },
  {
    id: "sc-num-6-25",
    hebrew: "יָאֵר יְהוָה פָּנָיו אֵלֶיךָ וִיחֻנֶּךָּ",
    transliteration: "Ya'er Adonai panav elekha vi-chunnekka",
    english: "The LORD make his face shine upon you and be gracious to you",
    reference: "Numbers 6:25"
  },
  {
    id: "sc-deut-4-29",
    hebrew: "וּבִקַּשְׁתֶּם מִשָּׁם אֶת יְהוָה אֱלֹהֶיךָ וּמָצָאתָ",
    transliteration: "U-viqqashtem mi-sham et Adonai Elohekha u-matsata",
    english: "From there you will seek the LORD your God and you will find him",
    reference: "Deuteronomy 4:29"
  },
  {
    id: "sc-deut-6-4",
    hebrew: "שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד",
    transliteration: "Shema Yisrael, Adonai Eloheinu, Adonai Echad",
    english: "Hear, O Israel: The LORD our God, the LORD is one",
    reference: "Deuteronomy 6:4"
  },
  {
    id: "sc-deut-6-5",
    hebrew: "וְאָהַבְתָּ אֵת יְהוָה אֱלֹהֶיךָ בְּכָל לְבָבְךָ",
    transliteration: "Ve-ahavta et Adonai Elohekha be-khol levavekha",
    english: "You shall love the LORD your God with all your heart",
    reference: "Deuteronomy 6:5"
  },
  {
    id: "sc-deut-31-6",
    hebrew: "חִזְקוּ וְאִמְצוּ אַל תִּירְאוּ וְאַל תַּעַרְצוּ מִפְּנֵיהֶם",
    transliteration: "Chizqu ve-imtsu, al tir'u ve-al ta'artsu mi-peneihem",
    english: "Be strong and courageous. Do not fear or be in dread of them",
    reference: "Deuteronomy 31:6"
  },
  {
    id: "sc-deut-31-8",
    hebrew: "וַיהוָה הוּא הַהֹלֵךְ לְפָנֶיךָ הוּא יִהְיֶה עִמָּךְ",
    transliteration: "V'Adonai hu ha-holekh lefanekha, hu yihyeh immakh",
    english: "It is the LORD who goes before you. He will be with you",
    reference: "Deuteronomy 31:8"
  },
  {
    id: "sc-deut-32-4",
    hebrew: "הַצּוּר תָּמִים פָּעֳלוֹ כִּי כָל דְּרָכָיו מִשְׁפָּט",
    transliteration: "Ha-tsur tamim po'olo, ki khol derakhav mishpat",
    english: "The Rock, his work is perfect, for all his ways are justice",
    reference: "Deuteronomy 32:4"
  },

  // ── Batch 3 (verses 41–60): Prophets (Nevi'im) ────────
  {
    id: "sc-josh-1-9",
    hebrew: "חֲזַק וֶאֱמָץ אַל תַּעֲרֹץ וְאַל תֵּחָת",
    transliteration: "Chazaq ve-emats, al ta'arots ve-al techat",
    english: "Be strong and courageous. Do not be frightened, and do not be dismayed",
    reference: "Joshua 1:9"
  },
  {
    id: "sc-josh-24-15",
    hebrew: "וְאָנֹכִי וּבֵיתִי נַעֲבֹד אֶת יְהוָה",
    transliteration: "Ve-anokhi u-veti na'avod et Adonai",
    english: "As for me and my house, we will serve the LORD",
    reference: "Joshua 24:15"
  },
  {
    id: "sc-1sam-16-7",
    hebrew: "כִּי הָאָדָם יִרְאֶה לַעֵינַיִם וַיהוָה יִרְאֶה לַלֵּבָב",
    transliteration: "Ki ha-adam yir'eh la-einayim, v'Adonai yir'eh la-levav",
    english: "For man looks on the outward appearance, but the LORD looks on the heart",
    reference: "1 Samuel 16:7"
  },
  {
    id: "sc-1kings-19-12",
    hebrew: "קוֹל דְּמָמָה דַקָּה",
    transliteration: "Qol demamah daqqah",
    english: "A still, small voice",
    reference: "1 Kings 19:12"
  },
  {
    id: "sc-isa-6-3",
    hebrew: "קָדוֹשׁ קָדוֹשׁ קָדוֹשׁ יְהוָה צְבָאוֹת מְלֹא כָל הָאָרֶץ כְּבוֹדוֹ",
    transliteration: "Qadosh qadosh qadosh Adonai tseva'ot, melo khol ha-arets kevodo",
    english: "Holy, holy, holy is the LORD of hosts; the whole earth is full of his glory",
    reference: "Isaiah 6:3"
  },
  {
    id: "sc-isa-7-14",
    hebrew: "הִנֵּה הָעַלְמָה הָרָה וְיֹלֶדֶת בֵּן וְקָרָאת שְׁמוֹ עִמָּנוּאֵל",
    transliteration: "Hinneh ha-almah harah ve-yoledet ben, ve-qarat shemo Immanuel",
    english: "Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel",
    reference: "Isaiah 7:14"
  },
  {
    id: "sc-isa-9-5",
    hebrew: "כִּי יֶלֶד יֻלַּד לָנוּ בֵּן נִתַּן לָנוּ",
    transliteration: "Ki yeled yullad lanu, ben nittan lanu",
    english: "For to us a child is born, to us a son is given",
    reference: "Isaiah 9:5"
  },
  {
    id: "sc-isa-40-8",
    hebrew: "יָבֵשׁ חָצִיר נָבֵל צִיץ וּדְבַר אֱלֹהֵינוּ יָקוּם לְעוֹלָם",
    transliteration: "Yavesh chatsir, navel tsits, u-devar Eloheinu yaqum le-olam",
    english: "The grass withers, the flower fades, but the word of our God will stand forever",
    reference: "Isaiah 40:8"
  },
  {
    id: "sc-isa-40-31",
    hebrew: "וְקוֹיֵ יְהוָה יַחֲלִיפוּ כֹחַ יַעֲלוּ אֵבֶר כַּנְּשָׁרִים",
    transliteration: "Ve-qoyei Adonai yachalifu khoach, ya'alu ever ka-nesharim",
    english: "But they who wait for the LORD shall renew their strength; they shall mount up with wings like eagles",
    reference: "Isaiah 40:31"
  },
  {
    id: "sc-isa-41-10",
    hebrew: "אַל תִּירָא כִּי עִמְּךָ אָנִי אַל תִּשְׁתָּע כִּי אֲנִי אֱלֹהֶיךָ",
    transliteration: "Al tira ki immekha ani, al tishta ki ani Elohekha",
    english: "Fear not, for I am with you; be not dismayed, for I am your God",
    reference: "Isaiah 41:10"
  },
  {
    id: "sc-isa-53-5",
    hebrew: "וְהוּא מְחֹלָל מִפְּשָׁעֵנוּ מְדֻכָּא מֵעֲוֹנֹתֵינוּ",
    transliteration: "Ve-hu mecholal mi-pesha'enu, medukka me-avonotenu",
    english: "But he was pierced for our transgressions; he was crushed for our iniquities",
    reference: "Isaiah 53:5"
  },
  {
    id: "sc-isa-55-11",
    hebrew: "כֵּן יִהְיֶה דְבָרִי אֲשֶׁר יֵצֵא מִפִּי לֹא יָשׁוּב אֵלַי רֵיקָם",
    transliteration: "Ken yihyeh devari asher yetse mi-pi, lo yashuv elai reqam",
    english: "So shall my word be that goes out from my mouth; it shall not return to me empty",
    reference: "Isaiah 55:11"
  },
  {
    id: "sc-jer-1-5",
    hebrew: "בְּטֶרֶם אֶצָּרְךָ בַבֶּטֶן יְדַעְתִּיךָ",
    transliteration: "Be-terem etsorkha va-beten yeda'tikha",
    english: "Before I formed you in the womb I knew you",
    reference: "Jeremiah 1:5"
  },
  {
    id: "sc-jer-17-7",
    hebrew: "בָּרוּךְ הַגֶּבֶר אֲשֶׁר יִבְטַח בַּיהוָה",
    transliteration: "Barukh ha-gever asher yivtach b'Adonai",
    english: "Blessed is the man who trusts in the LORD",
    reference: "Jeremiah 17:7"
  },
  {
    id: "sc-jer-29-11",
    hebrew: "כִּי אָנֹכִי יָדַעְתִּי אֶת הַמַּחֲשָׁבֹת אֲשֶׁר אָנֹכִי חֹשֵׁב עֲלֵיכֶם",
    transliteration: "Ki anokhi yada'ti et ha-machashavot asher anokhi choshev aleikhem",
    english: "For I know the plans I have for you, declares the LORD",
    reference: "Jeremiah 29:11"
  },
  {
    id: "sc-jer-31-3",
    hebrew: "אַהֲבַת עוֹלָם אֲהַבְתִּיךְ עַל כֵּן מְשַׁכְתִּיךְ חָסֶד",
    transliteration: "Ahavat olam ahavtikh, al ken meshakhtikh chased",
    english: "I have loved you with an everlasting love; therefore I have drawn you with lovingkindness",
    reference: "Jeremiah 31:3"
  },
  {
    id: "sc-ezek-36-26",
    hebrew: "וְנָתַתִּי לָכֶם לֵב חָדָשׁ וְרוּחַ חֲדָשָׁה אֶתֵּן בְּקִרְבְּכֶם",
    transliteration: "Ve-natatti lakhem lev chadash, ve-ruach chadashah etten be-qirbekhem",
    english: "And I will give you a new heart, and a new spirit I will put within you",
    reference: "Ezekiel 36:26"
  },
  {
    id: "sc-hos-6-6",
    hebrew: "כִּי חֶסֶד חָפַצְתִּי וְלֹא זָבַח",
    transliteration: "Ki chesed chafatsti ve-lo zavach",
    english: "For I desire steadfast love and not sacrifice",
    reference: "Hosea 6:6"
  },
  {
    id: "sc-mic-6-8",
    hebrew: "הַשְׂכֵּל וַעֲשׂוֹת מִשְׁפָּט וְאַהֲבַת חֶסֶד וְהַצְנֵעַ לֶכֶת עִם אֱלֹהֶיךָ",
    transliteration: "Haskel va-asot mishpat, ve-ahavat chesed, ve-hatsnea lekhet im Elohekha",
    english: "To do justice, and to love kindness, and to walk humbly with your God",
    reference: "Micah 6:8"
  },
  {
    id: "sc-hab-2-14",
    hebrew: "כִּי תִּמָּלֵא הָאָרֶץ לָדַעַת אֶת כְּבוֹד יְהוָה כַּמַּיִם יְכַסּוּ עַל יָם",
    transliteration: "Ki timmale ha-arets la-da'at et kevod Adonai, ka-mayim yekhassu al yam",
    english: "For the earth will be filled with the knowledge of the glory of the LORD as the waters cover the sea",
    reference: "Habakkuk 2:14"
  },

  // ── Batch 4 (verses 61–80): More Psalms & Prophets ────
  {
    id: "sc-isa-43-1",
    hebrew: "אַל תִּירָא כִּי גְאַלְתִּיךָ קָרָאתִי בְשִׁמְךָ לִי אָתָּה",
    transliteration: "Al tira ki ge'altikha, qarati ve-shimkha, li attah",
    english: "Fear not, for I have redeemed you; I have called you by name, you are mine",
    reference: "Isaiah 43:1"
  },
  {
    id: "sc-isa-26-3",
    hebrew: "יֵצֶר סָמוּךְ תִּצֹּר שָׁלוֹם שָׁלוֹם כִּי בְךָ בָּטוּחַ",
    transliteration: "Yetser samukh titsor shalom shalom, ki vekha batuach",
    english: "You keep him in perfect peace whose mind is stayed on you, because he trusts in you",
    reference: "Isaiah 26:3"
  },
  {
    id: "sc-isa-54-10",
    hebrew: "כִּי הֶהָרִים יָמוּשׁוּ וְהַגְּבָעוֹת תְּמוּטֶנָה וְחַסְדִּי מֵאִתֵּךְ לֹא יָמוּשׁ",
    transliteration: "Ki he-harim yamushu ve-ha-geva'ot temutennah, ve-chasdi me-ittek lo yamush",
    english: "Though the mountains be shaken and the hills be removed, yet my unfailing love for you will not be shaken",
    reference: "Isaiah 54:10"
  },
  {
    id: "sc-zech-4-6",
    hebrew: "לֹא בְחַיִל וְלֹא בְכֹחַ כִּי אִם בְּרוּחִי אָמַר יְהוָה צְבָאוֹת",
    transliteration: "Lo ve-chayil ve-lo ve-khoach, ki im be-ruchi, amar Adonai tseva'ot",
    english: "Not by might, nor by power, but by my Spirit, says the LORD of hosts",
    reference: "Zechariah 4:6"
  },
  {
    id: "sc-mal-3-6",
    hebrew: "כִּי אֲנִי יְהוָה לֹא שָׁנִיתִי",
    transliteration: "Ki ani Adonai lo shaniti",
    english: "For I the LORD do not change",
    reference: "Malachi 3:6"
  },
  {
    id: "sc-ps-23-4",
    hebrew: "גַּם כִּי אֵלֵךְ בְּגֵיא צַלְמָוֶת לֹא אִירָא רָע כִּי אַתָּה עִמָּדִי",
    transliteration: "Gam ki elekh be-ge tsalmavet, lo ira ra, ki attah immadi",
    english: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me",
    reference: "Psalm 23:4"
  },
  {
    id: "sc-ps-46-1",
    hebrew: "אֱלֹהִים לָנוּ מַחֲסֶה וָעֹז עֶזְרָה בְצָרוֹת נִמְצָא מְאֹד",
    transliteration: "Elohim lanu machaseh va-oz, ezrah ve-tsarot nimtsa me'od",
    english: "God is our refuge and strength, a very present help in trouble",
    reference: "Psalm 46:1"
  },
  {
    id: "sc-ps-139-14",
    hebrew: "אוֹדְךָ עַל כִּי נוֹרָאוֹת נִפְלֵיתִי",
    transliteration: "Odekha al ki nora'ot nifleiti",
    english: "I praise you, for I am fearfully and wonderfully made",
    reference: "Psalm 139:14"
  },
  {
    id: "sc-ps-139-23",
    hebrew: "חָקְרֵנִי אֵל וְדַע לְבָבִי",
    transliteration: "Choqreni El ve-da levavi",
    english: "Search me, O God, and know my heart",
    reference: "Psalm 139:23"
  },
  {
    id: "sc-ps-91-1",
    hebrew: "יֹשֵׁב בְּסֵתֶר עֶלְיוֹן בְּצֵל שַׁדַּי יִתְלוֹנָן",
    transliteration: "Yoshev be-seter Elyon, be-tsel Shaddai yitlonan",
    english: "He who dwells in the shelter of the Most High will rest in the shadow of the Almighty",
    reference: "Psalm 91:1"
  },
  {
    id: "sc-joel-3-1",
    hebrew: "אֶשְׁפּוֹךְ אֶת רוּחִי עַל כָּל בָּשָׂר",
    transliteration: "Eshpokh et ruchi al kol basar",
    english: "I will pour out my Spirit on all flesh",
    reference: "Joel 3:1"
  },
  {
    id: "sc-amos-5-24",
    hebrew: "וְיִגַּל כַּמַּיִם מִשְׁפָּט וּצְדָקָה כְּנַחַל אֵיתָן",
    transliteration: "Ve-yiggal ka-mayim mishpat, u-tsedaqah ke-nachal eitan",
    english: "But let justice roll down like waters, and righteousness like an ever-flowing stream",
    reference: "Amos 5:24"
  },
  {
    id: "sc-zeph-3-17",
    hebrew: "יְהוָה אֱלֹהַיִךְ בְּקִרְבֵּךְ גִּבּוֹר יוֹשִׁיעַ",
    transliteration: "Adonai Elohayikh be-qirbekh, gibbor yoshia",
    english: "The LORD your God is in your midst, a mighty one who will save",
    reference: "Zephaniah 3:17"
  },
  {
    id: "sc-nah-1-7",
    hebrew: "טוֹב יְהוָה לְמָעוֹז בְּיוֹם צָרָה",
    transliteration: "Tov Adonai le-ma'oz be-yom tsarah",
    english: "The LORD is good, a stronghold in the day of trouble",
    reference: "Nahum 1:7"
  },
  {
    id: "sc-ps-37-4",
    hebrew: "וְהִתְעַנַּג עַל יְהוָה וְיִתֶּן לְךָ מִשְׁאֲלֹת לִבֶּךָ",
    transliteration: "Ve-hit'annag al Adonai ve-yitten lekha mish'alot libbeka",
    english: "Delight yourself in the LORD, and he will give you the desires of your heart",
    reference: "Psalm 37:4"
  },
  {
    id: "sc-ps-90-12",
    hebrew: "לִמְנוֹת יָמֵינוּ כֵּן הוֹדַע וְנָבִא לְבַב חָכְמָה",
    transliteration: "Limnot yamenu ken hoda, ve-navi levav chokhmah",
    english: "So teach us to number our days that we may get a heart of wisdom",
    reference: "Psalm 90:12"
  },
  {
    id: "sc-ps-19-14",
    hebrew: "יִהְיוּ לְרָצוֹן אִמְרֵי פִי וְהֶגְיוֹן לִבִּי לְפָנֶיךָ",
    transliteration: "Yihyu le-ratson imrei fi, ve-hegyon libbi lefanekha",
    english: "Let the words of my mouth and the meditation of my heart be acceptable in your sight",
    reference: "Psalm 19:14"
  },
  {
    id: "sc-ps-34-18",
    hebrew: "קָרוֹב יְהוָה לְנִשְׁבְּרֵי לֵב",
    transliteration: "Qarov Adonai le-nishberei lev",
    english: "The LORD is near to the brokenhearted",
    reference: "Psalm 34:18"
  },
  {
    id: "sc-ps-55-22",
    hebrew: "הַשְׁלֵךְ עַל יְהוָה יְהָבְךָ וְהוּא יְכַלְכְּלֶךָ",
    transliteration: "Hashlekh al Adonai yehavkha, ve-hu yekhalkelekha",
    english: "Cast your burden on the LORD, and he will sustain you",
    reference: "Psalm 55:22"
  },
  {
    id: "sc-ps-30-5",
    hebrew: "בָּעֶרֶב יָלִין בֶּכִי וְלַבֹּקֶר רִנָּה",
    transliteration: "Ba-erev yalin bekhi, ve-la-boqer rinnah",
    english: "Weeping may tarry for the night, but joy comes with the morning",
    reference: "Psalm 30:5"
  },

  // ── Batch 5 (verses 81–100): Writings (Ketuvim) ───────
  {
    id: "sc-prov-1-7",
    hebrew: "יִרְאַת יְהוָה רֵאשִׁית דָּעַת",
    transliteration: "Yir'at Adonai reshit da'at",
    english: "The fear of the LORD is the beginning of knowledge",
    reference: "Proverbs 1:7"
  },
  {
    id: "sc-prov-3-5",
    hebrew: "בְּטַח אֶל יְהוָה בְּכָל לִבֶּךָ וְאֶל בִּינָתְךָ אַל תִּשָּׁעֵן",
    transliteration: "Betach el Adonai be-khol libbeka, ve-el binatekha al tisha'en",
    english: "Trust in the LORD with all your heart, and do not lean on your own understanding",
    reference: "Proverbs 3:5"
  },
  {
    id: "sc-prov-3-6",
    hebrew: "בְּכָל דְּרָכֶיךָ דָעֵהוּ וְהוּא יְיַשֵּׁר אֹרְחֹתֶיךָ",
    transliteration: "Be-khol derakhekha da'ehu, ve-hu yeyasher orchotekha",
    english: "In all your ways acknowledge him, and he will make straight your paths",
    reference: "Proverbs 3:6"
  },
  {
    id: "sc-prov-4-23",
    hebrew: "מִכָּל מִשְׁמָר נְצֹר לִבֶּךָ כִּי מִמֶּנּוּ תּוֹצְאוֹת חַיִּים",
    transliteration: "Mi-kol mishmar netsor libbeka, ki mimmennu tots'ot chayyim",
    english: "Keep your heart with all vigilance, for from it flow the springs of life",
    reference: "Proverbs 4:23"
  },
  {
    id: "sc-prov-16-3",
    hebrew: "גֹּל אֶל יְהוָה מַעֲשֶׂיךָ וְיִכֹּנוּ מַחְשְׁבֹתֶיךָ",
    transliteration: "Gol el Adonai ma'asekha, ve-yikkonu machshevotekha",
    english: "Commit your work to the LORD, and your plans will be established",
    reference: "Proverbs 16:3"
  },
  {
    id: "sc-prov-22-6",
    hebrew: "חֲנֹךְ לַנַּעַר עַל פִּי דַרְכּוֹ",
    transliteration: "Chanokh la-na'ar al pi darko",
    english: "Train up a child in the way he should go",
    reference: "Proverbs 22:6"
  },
  {
    id: "sc-prov-27-17",
    hebrew: "בַּרְזֶל בְּבַרְזֶל יָחַד",
    transliteration: "Barzel be-varzel yachad",
    english: "Iron sharpens iron",
    reference: "Proverbs 27:17"
  },
  {
    id: "sc-prov-31-10",
    hebrew: "אֵשֶׁת חַיִל מִי יִמְצָא וְרָחֹק מִפְּנִינִים מִכְרָהּ",
    transliteration: "Eshet chayil mi yimtsa, ve-rachoq mi-peninim mikhrah",
    english: "An excellent wife who can find? She is far more precious than jewels",
    reference: "Proverbs 31:10"
  },
  {
    id: "sc-eccl-3-1",
    hebrew: "לַכֹּל זְמָן וְעֵת לְכָל חֵפֶץ תַּחַת הַשָּׁמָיִם",
    transliteration: "La-kol zeman ve-et le-khol chefets tachat ha-shamayim",
    english: "For everything there is a season, and a time for every matter under heaven",
    reference: "Ecclesiastes 3:1"
  },
  {
    id: "sc-eccl-12-13",
    hebrew: "אֶת הָאֱלֹהִים יְרָא וְאֶת מִצְוֹתָיו שְׁמוֹר כִּי זֶה כָּל הָאָדָם",
    transliteration: "Et ha-Elohim yera, ve-et mitsvotav shemor, ki zeh kol ha-adam",
    english: "Fear God and keep his commandments, for this is the whole duty of man",
    reference: "Ecclesiastes 12:13"
  },
  {
    id: "sc-song-8-6",
    hebrew: "שִׂימֵנִי כַחוֹתָם עַל לִבֶּךָ כִּי עַזָּה כַמָּוֶת אַהֲבָה",
    transliteration: "Simeni ka-chotam al libbeka, ki azzah ka-mavet ahavah",
    english: "Set me as a seal upon your heart, for love is strong as death",
    reference: "Song of Songs 8:6"
  },
  {
    id: "sc-ruth-1-16",
    hebrew: "כִּי אֶל אֲשֶׁר תֵּלְכִי אֵלֵךְ וּבַאֲשֶׁר תָּלִינִי אָלִין",
    transliteration: "Ki el asher telkhi elekh, u-va-asher talini alin",
    english: "Where you go I will go, and where you lodge I will lodge",
    reference: "Ruth 1:16"
  },
  {
    id: "sc-lam-3-22",
    hebrew: "חַסְדֵי יְהוָה כִּי לֹא תָמְנוּ כִּי לֹא כָלוּ רַחֲמָיו",
    transliteration: "Chasdei Adonai ki lo tamnu, ki lo khalu rachamav",
    english: "The steadfast love of the LORD never ceases; his mercies never come to an end",
    reference: "Lamentations 3:22"
  },
  {
    id: "sc-lam-3-23",
    hebrew: "חֲדָשִׁים לַבְּקָרִים רַבָּה אֱמוּנָתֶךָ",
    transliteration: "Chadashim la-beqarim, rabbah emunatekha",
    english: "They are new every morning; great is your faithfulness",
    reference: "Lamentations 3:23"
  },
  {
    id: "sc-dan-2-21",
    hebrew: "וְהוּא מְהַשְׁנֵא עִדָּנַיָּא וְזִמְנַיָּא",
    transliteration: "Ve-hu mehashnei iddanaya ve-zimnaya",
    english: "He changes times and seasons; he removes kings and sets up kings",
    reference: "Daniel 2:21"
  },
  {
    id: "sc-1chr-16-34",
    hebrew: "הוֹדוּ לַיהוָה כִּי טוֹב כִּי לְעוֹלָם חַסְדּוֹ",
    transliteration: "Hodu l'Adonai ki tov, ki le-olam chasdo",
    english: "Oh give thanks to the LORD, for he is good; for his steadfast love endures forever",
    reference: "1 Chronicles 16:34"
  },
  {
    id: "sc-2chr-7-14",
    hebrew: "וְיִכָּנְעוּ עַמִּי אֲשֶׁר נִקְרָא שְׁמִי עֲלֵיהֶם וְיִתְפַּלְלוּ",
    transliteration: "Ve-yikkane'u ammi asher niqra shemi aleihem, ve-yitpallelu",
    english: "If my people who are called by my name humble themselves, and pray",
    reference: "2 Chronicles 7:14"
  },
  {
    id: "sc-neh-8-10",
    hebrew: "כִּי חֶדְוַת יְהוָה הִיא מָעֻזְּכֶם",
    transliteration: "Ki chedvat Adonai hi ma'uzzkhem",
    english: "For the joy of the LORD is your strength",
    reference: "Nehemiah 8:10"
  },
  {
    id: "sc-job-19-25",
    hebrew: "וַאֲנִי יָדַעְתִּי גֹּאֲלִי חָי",
    transliteration: "Va-ani yada'ti go'ali chai",
    english: "For I know that my Redeemer lives",
    reference: "Job 19:25"
  },
  {
    id: "sc-prov-18-10",
    hebrew: "מִגְדַּל עֹז שֵׁם יְהוָה בּוֹ יָרוּץ צַדִּיק וְנִשְׂגָּב",
    transliteration: "Migdal oz shem Adonai, bo yaruts tsaddiq ve-nisgav",
    english: "The name of the LORD is a strong tower; the righteous man runs into it and is safe",
    reference: "Proverbs 18:10"
  }
];

const CATEGORY_LABELS = {
  theology: "Theology",
  people: "People & Family",
  nature: "Nature & Creation",
  verbs: "Common Verbs",
  nouns: "Common Nouns"
};
