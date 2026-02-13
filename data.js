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
  }
];

const PSALMS_SENTENCES = [
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
  }
];

const CATEGORY_LABELS = {
  theology: "Theology",
  people: "People & Family",
  nature: "Nature & Creation",
  verbs: "Common Verbs",
  nouns: "Common Nouns"
};
