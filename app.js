// Biblical Hebrew Practice — Application Logic

(function () {
  "use strict";

  // ─── State ────────────────────────────────────────────────
  const state = {
    currentSection: "home",
    showNikkud: true,
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

  function pickDistractors(correct, pool, count) {
    const others = pool.filter(function (item) { return item.id !== correct.id; });
    return shuffle(others).slice(0, count);
  }

  // ─── Persistence ──────────────────────────────────────────

  function saveState() {
    try {
      localStorage.setItem("hebrew-app-state", JSON.stringify({
        scores: state.scores,
        trackers: state.trackers,
        vocabKnown: state.vocabKnown,
        psalmsKnown: state.psalmsKnown
      }));
    } catch (e) { /* storage full or unavailable */ }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem("hebrew-app-state");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.scores) state.scores = data.scores;
        if (data.trackers) state.trackers = data.trackers;
        if (data.vocabKnown) state.vocabKnown = data.vocabKnown;
        if (data.psalmsKnown) state.psalmsKnown = data.psalmsKnown;
        // Ensure new keys exist for older saved states
        if (!state.scores.psalms) state.scores.psalms = { correct: 0, total: 0 };
        if (!state.trackers.psalms) state.trackers.psalms = {};
      }
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

    // Problem areas — combine all trackers
    var allMistakes = [];
    var combined = {};
    ["letterRecog", "vocab", "letterQuiz", "psalms"].forEach(function (mode) {
      Object.entries(state.trackers[mode]).forEach(function (e) {
        var id = e[0], d = e[1];
        if (!combined[id] || combined[id].weight < d.weight) {
          combined[id] = d;
        }
      });
    });

    allMistakes = Object.entries(combined)
      .filter(function (e) { return e[1].wrong > 0; })
      .sort(function (a, b) { return b[1].weight - a[1].weight; })
      .slice(0, 5);

    var problemDiv = document.getElementById("problem-areas");
    var problemList = document.getElementById("problem-list");

    if (allMistakes.length === 0) {
      problemDiv.style.display = "none";
      return;
    }

    problemDiv.style.display = "block";
    problemList.innerHTML = "";

    allMistakes.forEach(function (entry) {
      var id = entry[0];
      // Find the item in letters, nikkud, or vocab
      var letter = HEBREW_LETTERS.find(function (l) { return l.id === id; });
      var nikkud = NIKKUD.find(function (n) { return n.id === id; });
      var word = VOCABULARY.find(function (w) { return w.id === id; });
      var psalm = SCRIPTURE.find(function (p) { return p.id === id; });
      var li = document.createElement("li");
      if (letter) {
        li.innerHTML = '<span class="problem-hebrew">' + displayHebrew(letter.letter) + '</span> ' +
          '<span class="problem-name">' + letter.name + ' — missed ' + entry[1].wrong + ' time' + (entry[1].wrong === 1 ? '' : 's') + '</span>';
      } else if (nikkud) {
        li.innerHTML = '<span class="problem-hebrew">' + nikkud.example + '</span> ' +
          '<span class="problem-name">' + nikkud.name + ' — missed ' + entry[1].wrong + ' time' + (entry[1].wrong === 1 ? '' : 's') + '</span>';
      } else if (word) {
        li.innerHTML = '<span class="problem-hebrew">' + displayHebrew(word.hebrew) + '</span> ' +
          '<span class="problem-name">' + word.english + ' — missed ' + entry[1].wrong + ' time' + (entry[1].wrong === 1 ? '' : 's') + '</span>';
      } else if (psalm) {
        li.innerHTML = '<span class="problem-hebrew">' + psalm.reference + '</span> ' +
          '<span class="problem-name">' + psalm.english.substring(0, 40) + '… — missed ' + entry[1].wrong + ' time' + (entry[1].wrong === 1 ? '' : 's') + '</span>';
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
      _isNikkud: true
    };
  }

  function getLetterRecogPool() {
    var filter = state.letterRecogFilter;
    if (filter === "letters") {
      return HEBREW_LETTERS.filter(function (l) { return !l.isFinal; });
    }
    if (filter === "sofit") {
      return HEBREW_LETTERS.filter(function (l) { return l.isFinal; });
    }
    if (filter === "nikkud") {
      return NIKKUD.map(nikkudToQuizItem);
    }
    // "all"
    return HEBREW_LETTERS.concat(NIKKUD.map(nikkudToQuizItem));
  }

  function nextLetterRecog() {
    state.answering = false;
    var feedback = document.getElementById("lr-feedback");
    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    var pool = getLetterRecogPool();
    if (pool.length < 4) return; // need at least 4 items for choices

    var chosen = pickWeighted(pool, state.trackers.letterRecog);
    var distractors = pickDistractors(chosen, pool, 3);
    var options = shuffle([chosen].concat(distractors));

    document.getElementById("lr-letter").textContent = displayHebrew(chosen.letter);
    document.getElementById("lr-correct").textContent = state.scores.letterRecog.correct;
    document.getElementById("lr-total").textContent = state.scores.letterRecog.total;

    var choicesDiv = document.getElementById("lr-choices");
    choicesDiv.innerHTML = "";

    options.forEach(function (opt) {
      var btn = document.createElement("button");
      btn.className = "choice-btn";
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
      if (btn.textContent === correct.name) btn.classList.add("correct");
      if (btn.textContent === selected.name && !isCorrect) btn.classList.add("incorrect");
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
      btn.textContent = displayHebrew(opt.letter);
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
      if (stripNikkud(btn.textContent) === stripNikkud(correct.letter)) btn.classList.add("correct");
      if (btn.textContent === displayHebrew(selected.letter) && !isCorrect) btn.classList.add("incorrect");
    });

    var feedback = document.getElementById("lq-feedback");
    if (isCorrect) {
      playCorrectSound();
      feedback.textContent = "Correct! " + correct.name + " is " + displayHebrew(correct.letter);
      feedback.className = "quiz-feedback show-correct";
    } else {
      playIncorrectSound();
      feedback.textContent = "The correct letter for " + correct.name + " is " + displayHebrew(correct.letter);
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

  function renderReference() {
    var tbody = document.getElementById("ref-alphabet-body");
    tbody.innerHTML = "";
    HEBREW_LETTERS.forEach(function (l) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="ref-letter">' + displayHebrew(l.letter) + '</td>' +
        '<td>' + l.name + '</td>' +
        '<td>' + l.sound + '</td>' +
        '<td>' + l.value + '</td>';
      tbody.appendChild(tr);
    });

    var nbody = document.getElementById("ref-nikkud-body");
    nbody.innerHTML = "";
    NIKKUD.forEach(function (n) {
      var tr = document.createElement("tr");
      tr.innerHTML =
        '<td class="ref-example">' + n.example + '</td>' +
        '<td>' + n.name + '</td>' +
        '<td>' + n.sound + '</td>' +
        '<td>' + n.type + '</td>';
      nbody.appendChild(tr);
    });
  }

  // ─── Nikkud Toggle ────────────────────────────────────────

  function handleNikkudToggle() {
    state.showNikkud = document.getElementById("nikkud-switch").checked;
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

  // ─── Init ─────────────────────────────────────────────────

  function init() {
    loadState();

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
    document.getElementById("nikkud-switch").checked = state.showNikkud;
    document.getElementById("nikkud-switch").addEventListener("change", handleNikkudToggle);

    // Flashcard
    document.getElementById("flashcard").addEventListener("click", flipFlashcard);
    document.getElementById("btn-know").addEventListener("click", handleVocabKnow);
    document.getElementById("btn-learning").addEventListener("click", handleVocabLearning);

    // Psalms flashcard
    document.getElementById("ps-flashcard").addEventListener("click", flipPsalmCard);
    document.getElementById("ps-btn-know").addEventListener("click", handlePsalmKnow);
    document.getElementById("ps-btn-learning").addEventListener("click", handlePsalmLearning);

    // Letter recognition filter
    document.getElementById("lr-filter").addEventListener("change", function (e) {
      state.letterRecogFilter = e.target.value;
      nextLetterRecog();
    });

    // Category filter
    populateCategories();
    document.getElementById("category-select").addEventListener("change", function (e) {
      state.currentCategory = e.target.value;
      nextVocab();
    });

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
