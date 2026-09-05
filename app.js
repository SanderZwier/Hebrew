// Biblical Hebrew Practice — Application Logic

(function () {
  "use strict";

  // ─── State ────────────────────────────────────────────────
  const state = {
    currentSection: "home",
    showNikkud: true,
    theme: "auto",
    muted: false,
    scores: {
      letterRecog: { correct: 0, total: 0 },
      vocab: { correct: 0, total: 0 },
      letterQuiz: { correct: 0, total: 0 },
      psalms: { correct: 0, total: 0 }
    },
    trackers: {
      letterRecog: {},
      vocab: {},
      letterQuiz: {},
      psalms: {}
    },
    vocabKnown: {},
    psalmsKnown: {},
    streaks: { letterRecog: 0, letterQuiz: 0 },
    currentCategory: "all",
    letterRecogFilter: "letters",
    flashcardFlipped: false,
    currentVocabItem: null,
    psFlipped: false,
    currentPsalm: null,
    answering: false
  };

  // ─── Helpers ──────────────────────────────────────────────

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function pickWeighted(items, tracker) {
    const weights = items.map(function (item) {
      const id = item.id;
      return tracker[id] ? tracker[id].weight : 2;
    });
    const totalWeight = weights.reduce(function (s, w) { return s + w; }, 0);
    let r = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  function updateWeight(tracker, itemId, correct) {
    if (!tracker[itemId]) {
      tracker[itemId] = { correct: 0, wrong: 0, weight: 2 };
    }
    if (correct) {
      tracker[itemId].correct++;
      tracker[itemId].weight = Math.max(1, tracker[itemId].weight - 1);
    } else {
      tracker[itemId].wrong++;
      tracker[itemId].weight += 3;
    }
    tracker[itemId].lastSeen = Date.now();
  }

  function getTopMistakes(tracker, n) {
    return Object.entries(tracker)
      .filter(function (e) { return e[1].wrong > 0; })
      .sort(function (a, b) { return b[1].weight - a[1].weight; })
      .slice(0, n)
      .map(function (e) { return { id: e[0], data: e[1] }; });
  }

  function stripNikkud(text) {
    return text.replace(/[\u0591-\u05C7]/g, "");
  }

  function displayHebrew(text) {
    return state.showNikkud ? text : stripNikkud(text);
  }

  // Strip vowel points and cantillation but KEEP the shin/sin dots
  // (U+05C1 / U+05C2), which are the only thing distinguishing \u05E9\u05C1 from \u05E9\u05C2.
  function stripVowelsKeepSinDot(text) {
    return text.replace(/[\u0591-\u05C0\u05C3-\u05C7]/g, "");
  }

  // For single letter/nikkud glyphs shown in quizzes: like displayHebrew
  // but preserves the sin/shin dot so the two never collapse visually.
  function displayLetter(text) {
    return state.showNikkud ? text : stripVowelsKeepSinDot(text);
  }

  // Nikkud quiz items must never be stripped (the point IS the vowel);
  // letter items use displayLetter so shin/sin stay distinct.
  function displayQuizItem(item) {
    return item._isNikkud ? item.letter : displayLetter(item.letter);
  }

  function confusabilityRank(item, correct) {
    if (item.id === correct.variant || item.variant === correct.id) return 2;
    if (item.baseId === correct.id || item.id === correct.baseId) return 2;
    if (item.baseId && item.baseId === correct.baseId) return 2;
    if (correct.group && item.group === correct.group) return 1;
    if (correct.type && item.type === correct.type) return 1;
    return 0;
  }

  function pickDistractors(correct, pool, count) {
    var tiers = { 2: [], 1: [], 0: [] };
    pool.forEach(function (item) {
      if (item.id === correct.id) return;
      tiers[confusabilityRank(item, correct)].push(item);
    });
    var picked = [];
    [2, 1, 0].forEach(function (rank) {
      if (picked.length >= count) return;
      picked = picked.concat(shuffle(tiers[rank]).slice(0, count - picked.length));
    });
    return picked;
  }

  // ─── Persistence ──────────────────────────────────────────

  var STORAGE_KEY = "hebrew-app-state";
  var THEME_KEY = "hebrew-app-theme";
  var QUIZ_MODES = ["letterRecog", "vocab", "letterQuiz", "psalms"];

  // A single plain-object snapshot of everything worth persisting or
  // exporting. Used by saveState, the Export backup action, and as the
  // shape validated on import.
  function serializeState() {
    return {
      version: 1,
      savedAt: new Date().toISOString(),
      scores: state.scores,
      trackers: state.trackers,
      vocabKnown: state.vocabKnown,
      psalmsKnown: state.psalmsKnown,
      prefs: {
        showNikkud: state.showNikkud,
        currentCategory: state.currentCategory,
        letterRecogFilter: state.letterRecogFilter,
        theme: state.theme,
        muted: state.muted
      }
    };
  }

  function isPlainObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  // Validate types and apply a serializeState()-shaped object onto state,
  // backfilling any missing score/tracker keys so older or partial saves
  // don't leave a mode undefined.
  function applySavedData(data) {
    if (!isPlainObject(data)) return false;

    if (isPlainObject(data.scores)) state.scores = data.scores;
    if (isPlainObject(data.trackers)) state.trackers = data.trackers;
    if (isPlainObject(data.vocabKnown)) state.vocabKnown = data.vocabKnown;
    if (isPlainObject(data.psalmsKnown)) state.psalmsKnown = data.psalmsKnown;

    QUIZ_MODES.forEach(function (mode) {
      if (!isPlainObject(state.scores[mode])) {
        state.scores[mode] = { correct: 0, total: 0 };
      }
      if (!isPlainObject(state.trackers[mode])) {
        state.trackers[mode] = {};
      }
    });

    var prefs = data.prefs;
    if (isPlainObject(prefs)) {
      if (typeof prefs.showNikkud === "boolean") state.showNikkud = prefs.showNikkud;
      if (typeof prefs.currentCategory === "string") state.currentCategory = prefs.currentCategory;
      if (typeof prefs.letterRecogFilter === "string") state.letterRecogFilter = prefs.letterRecogFilter;
      if (prefs.theme === "auto" || prefs.theme === "light" || prefs.theme === "dark") {
        state.theme = prefs.theme;
      }
      if (typeof prefs.muted === "boolean") state.muted = prefs.muted;
    }
    return true;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeState()));
      // Mirror the theme separately so the pre-paint inline script in
      // index.html can read it without parsing the whole state blob.
      localStorage.setItem(THEME_KEY, state.theme);
    } catch (e) { /* storage full or unavailable */ }
  }

  function loadState() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) applySavedData(JSON.parse(saved));
    } catch (e) { /* corrupt data, start fresh */ }
  }

  // ─── Sound Effects (Web Audio API) ────────────────────────

  var audioCtx = null;
  var audioUnlocked = false;

  function getAudioCtx() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // iOS Safari requires audio to be "unlocked" by playing a sound
  // directly inside a user-initiated touch/click handler.
  function unlockAudio() {
    if (audioUnlocked) return;
    var ctx = getAudioCtx();
    var buf = ctx.createBuffer(1, 1, 22050);
    var src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    audioUnlocked = true;
    document.removeEventListener("touchstart", unlockAudio, true);
    document.removeEventListener("click", unlockAudio, true);
  }

  document.addEventListener("touchstart", unlockAudio, true);
  document.addEventListener("click", unlockAudio, true);

  function playCorrectSound() {
    if (state.muted) return;
    try {
      var ctx = getAudioCtx();
      var now = ctx.currentTime;

      // Warm ascending two-note chime
      [392, 523.25].forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        var gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, now + i * 0.12);
        gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.45);
      });
    } catch (e) { /* audio not supported */ }
  }

  function playIncorrectSound() {
    if (state.muted) return;
    try {
      var ctx = getAudioCtx();
      var now = ctx.currentTime;

      // Soft low tone
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 220;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } catch (e) { /* audio not supported */ }
  }

  // ─── Pronunciation (Web Speech API) ───────────────────────

  var hebrewVoice = null;

  function findHebrewVoice() {
    if (!("speechSynthesis" in window)) return;
    var voices = window.speechSynthesis.getVoices();
    hebrewVoice = null;
    for (var i = 0; i < voices.length; i++) {
      if (/^(he|iw)\b/i.test(voices[i].lang)) {
        hebrewVoice = voices[i];
        break;
      }
    }
    document.body.classList.toggle("speech-ready", !!hebrewVoice);
    if (state.currentSection === "settings") renderSettings();
  }

  function initSpeech() {
    if (!("speechSynthesis" in window)) return;
    findHebrewVoice();
    // Voices load asynchronously in most browsers; re-check when ready.
    window.speechSynthesis.onvoiceschanged = findHebrewVoice;
  }

  function speak(text) {
    if (!hebrewVoice || !("speechSynthesis" in window) || !text) return;
    try {
      window.speechSynthesis.cancel();
      var utter = new SpeechSynthesisUtterance(text);
      utter.voice = hebrewVoice;
      utter.lang = hebrewVoice.lang;
      utter.rate = 0.75;
      window.speechSynthesis.speak(utter);
    } catch (e) { /* speech not supported */ }
  }

  // Build a 🔊 button that speaks the given text (or a lazily resolved
  // text via a getter function). stopProp prevents a card flip.
  function makeSpeakButton(label, getText, stopProp) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "speak-btn";
    btn.setAttribute("aria-label", label);
    btn.textContent = "🔊";
    btn.addEventListener("click", function (e) {
      if (stopProp) e.stopPropagation();
      speak(typeof getText === "function" ? getText() : getText);
    });
    return btn;
  }

  // ─── Theme ────────────────────────────────────────────────

  function resolveTheme(theme) {
    if (theme === "light" || theme === "dark") return theme;
    var prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "dark" : "light";
  }

  function applyTheme() {
    document.documentElement.setAttribute("data-theme", resolveTheme(state.theme));
  }

  function watchSystemTheme() {
    if (!window.matchMedia) return;
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var handler = function () { if (state.theme === "auto") applyTheme(); };
    if (mq.addEventListener) mq.addEventListener("change", handler);
    else if (mq.addListener) mq.addListener(handler);
  }

  // ─── Navigation ───────────────────────────────────────────

  function switchSection(name) {
    state.currentSection = name;

    document.querySelectorAll(".section").forEach(function (el) {
      el.classList.remove("active");
    });
    document.getElementById("section-" + name).classList.add("active");

    document.querySelectorAll(".nav-btn").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.section === name);
    });

    // Initialize mode when switching to it
    if (name === "letter-recog") nextLetterRecog();
    if (name === "vocab") nextVocab();
    if (name === "letter-quiz") nextLetterQuiz();
    if (name === "psalms") nextPsalm();
    if (name === "reference") renderReference();
    if (name === "home") renderHome();
    if (name === "settings") renderSettings();

    updateHeaderScore();
  }

  // ─── Header Score ─────────────────────────────────────────

  function updateHeaderScore() {
    var s = state.scores;
    var correct = s.letterRecog.correct + s.vocab.correct + s.letterQuiz.correct + (s.psalms ? s.psalms.correct : 0);
    var total = s.letterRecog.total + s.vocab.total + s.letterQuiz.total + (s.psalms ? s.psalms.total : 0);
    document.getElementById("header-correct").textContent = correct;
    document.getElementById("header-total").textContent = total;
  }

  // ─── Home Section ─────────────────────────────────────────

  function renderHome() {
    // Stats grid
    var grid = document.getElementById("stats-grid");
    var s = state.scores;
    var pctLR = s.letterRecog.total ? Math.round(s.letterRecog.correct / s.letterRecog.total * 100) : 0;
    var pctV = s.vocab.total ? Math.round(s.vocab.correct / s.vocab.total * 100) : 0;
    var pctLQ = s.letterQuiz.total ? Math.round(s.letterQuiz.correct / s.letterQuiz.total * 100) : 0;
    var pctPS = s.psalms && s.psalms.total ? Math.round(s.psalms.correct / s.psalms.total * 100) : 0;

    grid.innerHTML =
      '<div class="stat-card"><div class="stat-value">' + pctLR + '%</div><div class="stat-label">Letters</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + pctV + '%</div><div class="stat-label">Vocab</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + pctLQ + '%</div><div class="stat-label">Quiz</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + pctPS + '%</div><div class="stat-label">Scripture</div></div>';

    // Problem areas — combine all trackers, keeping the highest-weight
    // record per item, then reuse getTopMistakes to rank them.
    var combined = {};
    QUIZ_MODES.forEach(function (mode) {
      Object.entries(state.trackers[mode]).forEach(function (e) {
        var id = e[0], d = e[1];
        if (!combined[id] || combined[id].weight < d.weight) {
          combined[id] = d;
        }
      });
    });

    var allMistakes = getTopMistakes(combined, 5);

    var problemDiv = document.getElementById("problem-areas");
    var problemList = document.getElementById("problem-list");

    if (allMistakes.length === 0) {
      problemDiv.style.display = "none";
      return;
    }

    problemDiv.style.display = "block";
    problemList.innerHTML = "";

    allMistakes.forEach(function (entry) {
      var id = entry.id;
      var wrong = entry.data.wrong;
      var times = ' — missed ' + wrong + ' time' + (wrong === 1 ? '' : 's') + '</span>';
      // Find the item in letters, nikkud, vocab, or scripture
      var letter = HEBREW_LETTERS.find(function (l) { return l.id === id; });
      var nikkud = NIKKUD.find(function (n) { return n.id === id; });
      var word = VOCABULARY.find(function (w) { return w.id === id; });
      var psalm = SCRIPTURE.find(function (p) { return p.id === id; });
      var li = document.createElement("li");
      if (letter) {
        li.innerHTML = '<span class="problem-hebrew">' + displayLetter(letter.letter) + '</span> ' +
          '<span class="problem-name">' + letter.name + times;
      } else if (nikkud) {
        li.innerHTML = '<span class="problem-hebrew">' + nikkud.example + '</span> ' +
          '<span class="problem-name">' + nikkud.name + times;
      } else if (word) {
        li.innerHTML = '<span class="problem-hebrew">' + displayHebrew(word.hebrew) + '</span> ' +
          '<span class="problem-name">' + word.english + times;
      } else if (psalm) {
        li.innerHTML = '<span class="problem-hebrew">' + psalm.reference + '</span> ' +
          '<span class="problem-name">' + psalm.english.substring(0, 40) + '…' + times;
      }
      problemList.appendChild(li);
    });
  }

  // ─── Letter Recognition ───────────────────────────────────

  // Build a unified pool item from a nikkud entry so it can be
  // mixed with letter items in the same quiz engine.
  function nikkudToQuizItem(n) {
    return {
      id: n.id,
      letter: n.example,
      name: n.name,
      sound: n.sound,
      type: n.type,
      _isNikkud: true
    };
  }

  // Returns {questions, distractors}: the set to draw prompts from and the
  // (possibly wider) set to draw wrong answers from. The "sofit" filter has
  // only 5 final forms, so its distractors are widened with the base
  // letters; nikkud items stay unstripped throughout.
  function getLetterRecogPool() {
    var filter = state.letterRecogFilter;
    var nikkudItems = NIKKUD.map(nikkudToQuizItem);
    if (filter === "sofit") {
      var finals = HEBREW_LETTERS.filter(function (l) { return l.isFinal; });
      var baseIds = finals.map(function (l) { return l.baseId; });
      var bases = HEBREW_LETTERS.filter(function (l) { return baseIds.indexOf(l.id) !== -1; });
      return { questions: finals, distractors: finals.concat(bases) };
    }
    if (filter === "nikkud") return { questions: nikkudItems, distractors: nikkudItems };
    if (filter === "all") {
      var all = HEBREW_LETTERS.concat(nikkudItems);
      return { questions: all, distractors: all };
    }
    var nonFinal = HEBREW_LETTERS.filter(function (l) { return !l.isFinal; });
    return { questions: nonFinal, distractors: nonFinal };
  }

  function nextLetterRecog() {
    state.answering = false;
    var feedback = document.getElementById("lr-feedback");
    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    var pool = getLetterRecogPool();
    if (pool.questions.length === 0 || pool.distractors.length < 4) return;

    var chosen = pickWeighted(pool.questions, state.trackers.letterRecog);
    var distractors = pickDistractors(chosen, pool.distractors, 3);
    var options = shuffle([chosen].concat(distractors));

    document.getElementById("lr-letter").textContent = displayQuizItem(chosen);
    document.getElementById("lr-correct").textContent = state.scores.letterRecog.correct;
    document.getElementById("lr-total").textContent = state.scores.letterRecog.total;

    var choicesDiv = document.getElementById("lr-choices");
    choicesDiv.innerHTML = "";

    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.dataset.itemId = opt.id;
      btn.textContent = opt.name;
      btn.addEventListener("click", function () {
        if (state.answering) return;
        handleLetterRecogAnswer(opt, chosen, choicesDiv);
      });
      choicesDiv.appendChild(btn);
    });

    renderStreak("lr-streak", state.streaks.letterRecog);
  }

  function handleLetterRecogAnswer(selected, correct, container) {
    state.answering = true;
    state.scores.letterRecog.total++;
    var isCorrect = selected.id === correct.id;

    if (isCorrect) {
      state.scores.letterRecog.correct++;
      state.streaks.letterRecog++;
    } else {
      state.streaks.letterRecog = 0;
    }

    updateWeight(state.trackers.letterRecog, correct.id, isCorrect);
    saveState();
    updateHeaderScore();

    // Visual feedback
    var buttons = container.querySelectorAll(".choice-btn");
    buttons.forEach(function (btn) {
      btn.disabled = true;
      if (btn.dataset.itemId === correct.id) btn.classList.add("correct");
      if (btn.dataset.itemId === selected.id && !isCorrect) btn.classList.add("incorrect");
    });

    var feedback = document.getElementById("lr-feedback");
    if (isCorrect) {
      playCorrectSound();
      feedback.textContent = "Correct! " + correct.name + " — " + correct.sound;
      feedback.className = "quiz-feedback show-correct";
    } else {
      playIncorrectSound();
      feedback.textContent = "That was " + correct.name + " — " + correct.sound;
      feedback.className = "quiz-feedback show-incorrect";
    }

    document.getElementById("lr-correct").textContent = state.scores.letterRecog.correct;
    document.getElementById("lr-total").textContent = state.scores.letterRecog.total;
    renderStreak("lr-streak", state.streaks.letterRecog);

    setTimeout(nextLetterRecog, 1800);
  }

  // ─── Vocabulary Flashcards ────────────────────────────────

  var VOCAB_BATCH_SIZE = 50;

  function getUnlockedVocab() {
    var totalKnown = Object.keys(state.vocabKnown).length;
    var unlocked = VOCAB_BATCH_SIZE * (Math.floor(totalKnown / VOCAB_BATCH_SIZE) + 1);
    return VOCABULARY.slice(0, Math.min(unlocked, VOCABULARY.length));
  }

  function getFilteredVocab() {
    var pool = getUnlockedVocab();
    if (state.currentCategory === "all") return pool;
    return pool.filter(function (w) { return w.category === state.currentCategory; });
  }

  function nextVocab() {
    state.flashcardFlipped = false;
    var flashcard = document.getElementById("flashcard");
    // Disable animation so the card snaps back instantly —
    // otherwise the answer side of the next card is briefly visible.
    flashcard.style.transition = "none";
    flashcard.classList.remove("flipped");
    // Force a reflow so the snap-back takes effect before we re-enable transitions.
    void flashcard.offsetHeight;
    flashcard.style.transition = "";
    document.getElementById("vocab-actions").style.display = "none";

    var pool = getFilteredVocab();
    if (pool.length === 0) return;

    var chosen = pickWeighted(pool, state.trackers.vocab);
    state.currentVocabItem = chosen;

    document.getElementById("vocab-hebrew").textContent = displayHebrew(chosen.hebrew);
    document.getElementById("vocab-english").textContent = chosen.english;
    document.getElementById("vocab-transliteration").textContent = chosen.transliteration;

    document.getElementById("vocab-correct").textContent = state.scores.vocab.correct;
    document.getElementById("vocab-total").textContent = state.scores.vocab.total;

    updateVocabProgress();
  }

  function rerenderVocab() {
    if (!state.currentVocabItem) return;
    document.getElementById("vocab-hebrew").textContent = displayHebrew(state.currentVocabItem.hebrew);
  }

  function flipFlashcard() {
    state.flashcardFlipped = !state.flashcardFlipped;
    var flashcard = document.getElementById("flashcard");
    flashcard.classList.toggle("flipped", state.flashcardFlipped);
    // Show buttons once the answer has been seen at least once
    if (state.flashcardFlipped) {
      document.getElementById("vocab-actions").style.display = "flex";
    }
  }

  function handleVocabKnow() {
    playCorrectSound();
    state.scores.vocab.total++;
    state.scores.vocab.correct++;
    state.vocabKnown[state.currentVocabItem.id] = true;
    updateWeight(state.trackers.vocab, state.currentVocabItem.id, true);
    saveState();
    updateHeaderScore();
    nextVocab();
  }

  function handleVocabLearning() {
    playIncorrectSound();
    state.scores.vocab.total++;
    delete state.vocabKnown[state.currentVocabItem.id];
    updateWeight(state.trackers.vocab, state.currentVocabItem.id, false);
    saveState();
    updateHeaderScore();
    nextVocab();
  }

  function updateVocabProgress() {
    var unlocked = getUnlockedVocab();
    var totalKnown = Object.keys(state.vocabKnown).length;
    var pool = getFilteredVocab();
    var knownInPool = pool.filter(function (w) { return state.vocabKnown[w.id]; }).length;
    var pct = pool.length ? Math.round(knownInPool / pool.length * 100) : 0;
    document.getElementById("vocab-progress-fill").style.width = pct + "%";

    var level = Math.floor(totalKnown / VOCAB_BATCH_SIZE) + 1;
    var moreToUnlock = VOCABULARY.length > unlocked.length;
    var untilNext = moreToUnlock ? (level * VOCAB_BATCH_SIZE - totalKnown) : 0;
    var text = knownInPool + " of " + pool.length + " words mastered";
    if (state.currentCategory === "all" && moreToUnlock) {
      text += " \u2014 " + untilNext + " more to unlock next batch";
    }
    text += " (Level " + level + " of " + Math.ceil(VOCABULARY.length / VOCAB_BATCH_SIZE) + ")";
    document.getElementById("vocab-progress-text").textContent = text;
  }

  // ─── Scripture ──────────────────────────────────────────

  var SCRIPTURE_BATCH_SIZE = 20;

  function getUnlockedScripture() {
    var totalKnown = Object.keys(state.psalmsKnown).length;
    var unlocked = SCRIPTURE_BATCH_SIZE * (Math.floor(totalKnown / SCRIPTURE_BATCH_SIZE) + 1);
    return SCRIPTURE.slice(0, Math.min(unlocked, SCRIPTURE.length));
  }

  function nextPsalm() {
    state.psFlipped = false;
    var flashcard = document.getElementById("ps-flashcard");
    flashcard.style.transition = "none";
    flashcard.classList.remove("flipped");
    void flashcard.offsetHeight;
    flashcard.style.transition = "";
    document.getElementById("ps-actions").style.display = "none";

    var pool = getUnlockedScripture();
    if (pool.length === 0) return;

    var chosen = pickWeighted(pool, state.trackers.psalms);
    state.currentPsalm = chosen;

    document.getElementById("ps-hebrew").textContent = displayHebrew(chosen.hebrew);
    document.getElementById("ps-english").textContent = chosen.english;
    document.getElementById("ps-transliteration").textContent = chosen.transliteration;
    document.getElementById("ps-reference").textContent = chosen.reference;

    document.getElementById("ps-correct").textContent = state.scores.psalms.correct;
    document.getElementById("ps-total").textContent = state.scores.psalms.total;

    updatePsalmsProgress();
  }

  function rerenderPsalm() {
    if (!state.currentPsalm) return;
    document.getElementById("ps-hebrew").textContent = displayHebrew(state.currentPsalm.hebrew);
  }

  function flipPsalmCard() {
    state.psFlipped = !state.psFlipped;
    var flashcard = document.getElementById("ps-flashcard");
    flashcard.classList.toggle("flipped", state.psFlipped);
    if (state.psFlipped) {
      document.getElementById("ps-actions").style.display = "flex";
    }
  }

  function handlePsalmKnow() {
    playCorrectSound();
    state.scores.psalms.total++;
    state.scores.psalms.correct++;
    state.psalmsKnown[state.currentPsalm.id] = true;
    updateWeight(state.trackers.psalms, state.currentPsalm.id, true);
    saveState();
    updateHeaderScore();
    nextPsalm();
  }

  function handlePsalmLearning() {
    playIncorrectSound();
    state.scores.psalms.total++;
    delete state.psalmsKnown[state.currentPsalm.id];
    updateWeight(state.trackers.psalms, state.currentPsalm.id, false);
    saveState();
    updateHeaderScore();
    nextPsalm();
  }

  function updatePsalmsProgress() {
    var unlocked = getUnlockedScripture();
    var totalKnown = Object.keys(state.psalmsKnown).length;
    var pct = unlocked.length ? Math.round(totalKnown / unlocked.length * 100) : 0;
    document.getElementById("ps-progress-fill").style.width = pct + "%";

    var level = Math.floor(totalKnown / SCRIPTURE_BATCH_SIZE) + 1;
    var totalLevels = Math.ceil(SCRIPTURE.length / SCRIPTURE_BATCH_SIZE);
    var moreToUnlock = SCRIPTURE.length > unlocked.length;
    var untilNext = moreToUnlock ? (level * SCRIPTURE_BATCH_SIZE - totalKnown) : 0;
    var text = totalKnown + " of " + unlocked.length + " verses mastered";
    if (moreToUnlock) {
      text += " \u2014 " + untilNext + " more to unlock next batch";
    }
    text += " (Level " + level + " of " + totalLevels + ")";
    document.getElementById("ps-progress-text").textContent = text;
  }

  // ─── Letter Quiz ──────────────────────────────────────────

  function nextLetterQuiz() {
    state.answering = false;
    var feedback = document.getElementById("lq-feedback");
    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    var nonFinal = HEBREW_LETTERS.filter(function (l) { return !l.isFinal; });
    var chosen = pickWeighted(nonFinal, state.trackers.letterQuiz);
    var distractors = pickDistractors(chosen, nonFinal, 3);
    var options = shuffle([chosen].concat(distractors));

    document.getElementById("lq-name").textContent = chosen.name;
    document.getElementById("lq-correct").textContent = state.scores.letterQuiz.correct;
    document.getElementById("lq-total").textContent = state.scores.letterQuiz.total;

    var choicesDiv = document.getElementById("lq-choices");
    choicesDiv.innerHTML = "";

    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.dataset.itemId = opt.id;
      btn.textContent = displayLetter(opt.letter);
      btn.addEventListener("click", function () {
        if (state.answering) return;
        handleLetterQuizAnswer(opt, chosen, choicesDiv);
      });
      choicesDiv.appendChild(btn);
    });

    renderStreak("lq-streak", state.streaks.letterQuiz);
  }

  function handleLetterQuizAnswer(selected, correct, container) {
    state.answering = true;
    state.scores.letterQuiz.total++;
    var isCorrect = selected.id === correct.id;

    if (isCorrect) {
      state.scores.letterQuiz.correct++;
      state.streaks.letterQuiz++;
    } else {
      state.streaks.letterQuiz = 0;
    }

    updateWeight(state.trackers.letterQuiz, correct.id, isCorrect);
    saveState();
    updateHeaderScore();

    var buttons = container.querySelectorAll(".choice-btn");
    buttons.forEach(function (btn) {
      btn.disabled = true;
      if (btn.dataset.itemId === correct.id) btn.classList.add("correct");
      if (btn.dataset.itemId === selected.id && !isCorrect) btn.classList.add("incorrect");
    });

    var feedback = document.getElementById("lq-feedback");
    if (isCorrect) {
      playCorrectSound();
      feedback.textContent = "Correct! " + correct.name + " is " + displayLetter(correct.letter);
      feedback.className = "quiz-feedback show-correct";
    } else {
      playIncorrectSound();
      feedback.textContent = "The correct letter for " + correct.name + " is " + displayLetter(correct.letter);
      feedback.className = "quiz-feedback show-incorrect";
    }

    document.getElementById("lq-correct").textContent = state.scores.letterQuiz.correct;
    document.getElementById("lq-total").textContent = state.scores.letterQuiz.total;
    renderStreak("lq-streak", state.streaks.letterQuiz);

    setTimeout(nextLetterQuiz, 1800);
  }

  // ─── Streak ───────────────────────────────────────────────

  function renderStreak(elementId, count) {
    var el = document.getElementById(elementId);
    if (count >= 3) {
      el.innerHTML = '<span class="streak-fire">Streak: ' + count + '</span>';
    } else {
      el.textContent = "";
    }
  }

  // ─── Reference ────────────────────────────────────────────

  // Build one reference row: a glyph cell (with a 🔊 button) followed by
  // plain text cells.
  function refRow(glyph, glyphClass, speakText, speakLabel, cells) {
    var tr = document.createElement("tr");
    var glyphCell = document.createElement("td");
    glyphCell.className = glyphClass;
    var glyphSpan = document.createElement("span");
    glyphSpan.textContent = glyph;
    glyphCell.appendChild(glyphSpan);
    glyphCell.appendChild(makeSpeakButton(speakLabel, speakText, false));
    tr.appendChild(glyphCell);
    cells.forEach(function (text) {
      var td = document.createElement("td");
      td.textContent = text;
      tr.appendChild(td);
    });
    return tr;
  }

  function renderReference() {
    var tbody = document.getElementById("ref-alphabet-body");
    tbody.innerHTML = "";
    HEBREW_LETTERS.forEach(function (l) {
      tbody.appendChild(refRow(
        displayLetter(l.letter), "ref-letter",
        l.nameHebrew, "Pronounce " + l.name,
        [l.name, l.sound, l.value]
      ));
    });

    var nbody = document.getElementById("ref-nikkud-body");
    nbody.innerHTML = "";
    NIKKUD.forEach(function (n) {
      nbody.appendChild(refRow(
        n.example, "ref-example",
        n.example, "Pronounce " + n.name,
        [n.name, n.sound, n.type]
      ));
    });
  }

  // ─── Nikkud Toggle ────────────────────────────────────────

  function handleNikkudToggle() {
    state.showNikkud = document.getElementById("nikkud-switch").checked;
    saveState();
    // Re-render current section
    var section = state.currentSection;
    if (section === "letter-recog") nextLetterRecog();
    if (section === "vocab") rerenderVocab();
    if (section === "letter-quiz") nextLetterQuiz();
    if (section === "psalms") rerenderPsalm();
    if (section === "reference") renderReference();
    if (section === "home") renderHome();
  }

  // ─── Category Filter ─────────────────────────────────────

  function populateCategories() {
    var select = document.getElementById("category-select");
    Object.entries(CATEGORY_LABELS).forEach(function (entry) {
      var opt = document.createElement("option");
      opt.value = entry[0];
      opt.textContent = entry[1];
      select.appendChild(opt);
    });
  }

  // ─── Settings ─────────────────────────────────────────────

  function setSettingsStatus(msg) {
    var el = document.getElementById("settings-status");
    if (el) el.textContent = msg || "";
  }

  // Reflect current state into every control (used on init and after an
  // imported backup replaces preferences).
  function syncControlsFromState() {
    var nikkud = document.getElementById("nikkud-switch");
    if (nikkud) nikkud.checked = state.showNikkud;
    var category = document.getElementById("category-select");
    if (category) category.value = state.currentCategory;
    var filter = document.getElementById("lr-filter");
    if (filter) filter.value = state.letterRecogFilter;
    var theme = document.getElementById("theme-select");
    if (theme) theme.value = state.theme;
    var mute = document.getElementById("mute-switch");
    if (mute) mute.checked = state.muted;
  }

  function renderSettings() {
    var themeSelect = document.getElementById("theme-select");
    if (themeSelect) themeSelect.value = state.theme;
    var muteSwitch = document.getElementById("mute-switch");
    if (muteSwitch) muteSwitch.checked = state.muted;

    var note = document.getElementById("settings-speech-note");
    if (note) {
      if (hebrewVoice) {
        note.textContent = "A Hebrew voice was found on this device (" + hebrewVoice.name +
          "). Device voices speak Modern Hebrew, which is only an approximation of Biblical pronunciation.";
      } else {
        note.textContent = "No Hebrew voice was found on this device, so the pronunciation buttons are hidden. " +
          "If one is installed later it will speak Modern Hebrew, an approximation of Biblical pronunciation.";
      }
    }

    var summary = document.getElementById("settings-summary");
    if (summary) {
      var s = state.scores;
      var totalCorrect = QUIZ_MODES.reduce(function (n, m) { return n + s[m].correct; }, 0);
      var totalAnswered = QUIZ_MODES.reduce(function (n, m) { return n + s[m].total; }, 0);
      var vocabCount = Object.keys(state.vocabKnown).length;
      var verseCount = Object.keys(state.psalmsKnown).length;
      summary.textContent = totalCorrect + " correct of " + totalAnswered + " answered — " +
        vocabCount + " words and " + verseCount + " verses mastered.";
    }
  }

  function handleThemeChange(e) {
    state.theme = e.target.value;
    applyTheme();
    saveState();
    renderSettings();
  }

  function handleMuteChange(e) {
    state.muted = e.target.checked;
    saveState();
  }

  function exportBackup() {
    try {
      var json = JSON.stringify(serializeState(), null, 2);
      var blob = new Blob([json], { type: "application/json" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "hebrew-progress-backup.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSettingsStatus("Backup downloaded.");
    } catch (e) {
      setSettingsStatus("Could not export a backup on this device.");
    }
  }

  function importBackup(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var data;
      try {
        data = JSON.parse(reader.result);
      } catch (e) {
        setSettingsStatus("That file is not a valid backup.");
        return;
      }
      if (applySavedData(data)) {
        saveState();
        syncControlsFromState();
        applyTheme();
        renderHome();
        updateHeaderScore();
        renderSettings();
        setSettingsStatus("Backup imported.");
      } else {
        setSettingsStatus("That file is not a valid backup.");
      }
    };
    reader.onerror = function () { setSettingsStatus("Could not read that file."); };
    reader.readAsText(file);
  }

  function resetProgress() {
    if (!window.confirm("Reset all progress? This clears your scores and mastered words and verses. Your preferences are kept.")) {
      return;
    }
    QUIZ_MODES.forEach(function (mode) {
      state.scores[mode] = { correct: 0, total: 0 };
      state.trackers[mode] = {};
    });
    state.vocabKnown = {};
    state.psalmsKnown = {};
    state.streaks = { letterRecog: 0, letterQuiz: 0 };
    saveState();
    updateHeaderScore();
    renderHome();
    renderSettings();
    setSettingsStatus("Progress reset.");
  }

  // ─── Init ─────────────────────────────────────────────────

  function init() {
    loadState();
    applyTheme();
    watchSystemTheme();
    initSpeech();

    // Nav buttons
    document.querySelectorAll(".nav-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        switchSection(btn.dataset.section);
      });
    });

    // Mode cards on home
    document.querySelectorAll(".mode-card").forEach(function (card) {
      card.addEventListener("click", function () {
        switchSection(card.dataset.goto);
      });
    });

    // Nikkud toggle
    document.getElementById("nikkud-switch").addEventListener("change", handleNikkudToggle);

    // Flashcard
    document.getElementById("flashcard").addEventListener("click", flipFlashcard);
    document.getElementById("btn-know").addEventListener("click", handleVocabKnow);
    document.getElementById("btn-learning").addEventListener("click", handleVocabLearning);
    document.getElementById("vocab-speak").addEventListener("click", function (e) {
      e.stopPropagation();
      if (state.currentVocabItem) speak(state.currentVocabItem.hebrew);
    });

    // Scripture flashcard
    document.getElementById("ps-flashcard").addEventListener("click", flipPsalmCard);
    document.getElementById("ps-btn-know").addEventListener("click", handlePsalmKnow);
    document.getElementById("ps-btn-learning").addEventListener("click", handlePsalmLearning);
    document.getElementById("ps-speak").addEventListener("click", function (e) {
      e.stopPropagation();
      if (state.currentPsalm) speak(state.currentPsalm.hebrew);
    });

    // Letter recognition filter
    document.getElementById("lr-filter").addEventListener("change", function (e) {
      state.letterRecogFilter = e.target.value;
      saveState();
      nextLetterRecog();
    });

    // Category filter
    populateCategories();
    document.getElementById("category-select").addEventListener("change", function (e) {
      state.currentCategory = e.target.value;
      saveState();
      nextVocab();
    });

    // Settings controls
    document.getElementById("theme-select").addEventListener("change", handleThemeChange);
    document.getElementById("mute-switch").addEventListener("change", handleMuteChange);
    document.getElementById("settings-export").addEventListener("click", exportBackup);
    document.getElementById("settings-import").addEventListener("change", function (e) {
      importBackup(e.target.files && e.target.files[0]);
      e.target.value = "";
    });
    document.getElementById("settings-reset").addEventListener("click", resetProgress);

    // Reflect saved preferences into every control
    syncControlsFromState();

    // Initial render
    renderHome();
    updateHeaderScore();
  }

  // Start
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
