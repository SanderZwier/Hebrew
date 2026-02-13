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
      letterQuiz: { correct: 0, total: 0 }
    },
    trackers: {
      letterRecog: {},
      vocab: {},
      letterQuiz: {}
    },
    vocabKnown: {},
    streaks: { letterRecog: 0, letterQuiz: 0 },
    currentCategory: "all",
    letterRecogFilter: "letters",
    flashcardFlipped: false,
    currentVocabItem: null,
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
        vocabKnown: state.vocabKnown
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
      }
    } catch (e) { /* corrupt data, start fresh */ }
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
    if (name === "reference") renderReference();
    if (name === "home") renderHome();

    updateHeaderScore();
  }

  // ─── Header Score ─────────────────────────────────────────

  function updateHeaderScore() {
    var s = state.scores;
    var correct = s.letterRecog.correct + s.vocab.correct + s.letterQuiz.correct;
    var total = s.letterRecog.total + s.vocab.total + s.letterQuiz.total;
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

    grid.innerHTML =
      '<div class="stat-card"><div class="stat-value">' + pctLR + '%</div><div class="stat-label">Letters</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + pctV + '%</div><div class="stat-label">Vocab</div></div>' +
      '<div class="stat-card"><div class="stat-value">' + pctLQ + '%</div><div class="stat-label">Quiz</div></div>';

    // Problem areas — combine all trackers
    var allMistakes = [];
    var combined = {};
    ["letterRecog", "vocab", "letterQuiz"].forEach(function (mode) {
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
      feedback.textContent = "Correct! " + correct.name + " — " + correct.sound;
      feedback.className = "quiz-feedback show-correct";
    } else {
      feedback.textContent = "That was " + correct.name + " — " + correct.sound;
      feedback.className = "quiz-feedback show-incorrect";
    }

    document.getElementById("lr-correct").textContent = state.scores.letterRecog.correct;
    document.getElementById("lr-total").textContent = state.scores.letterRecog.total;
    renderStreak("lr-streak", state.streaks.letterRecog);

    setTimeout(nextLetterRecog, 1800);
  }

  // ─── Vocabulary Flashcards ────────────────────────────────

  function getFilteredVocab() {
    if (state.currentCategory === "all") return VOCABULARY;
    return VOCABULARY.filter(function (w) { return w.category === state.currentCategory; });
  }

  function nextVocab() {
    state.flashcardFlipped = false;
    var flashcard = document.getElementById("flashcard");
    flashcard.classList.remove("flipped");
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
    if (state.flashcardFlipped) return;
    state.flashcardFlipped = true;
    document.getElementById("flashcard").classList.add("flipped");
    document.getElementById("vocab-actions").style.display = "flex";
  }

  function handleVocabKnow() {
    state.scores.vocab.total++;
    state.scores.vocab.correct++;
    state.vocabKnown[state.currentVocabItem.id] = true;
    updateWeight(state.trackers.vocab, state.currentVocabItem.id, true);
    saveState();
    updateHeaderScore();
    nextVocab();
  }

  function handleVocabLearning() {
    state.scores.vocab.total++;
    delete state.vocabKnown[state.currentVocabItem.id];
    updateWeight(state.trackers.vocab, state.currentVocabItem.id, false);
    saveState();
    updateHeaderScore();
    nextVocab();
  }

  function updateVocabProgress() {
    var pool = getFilteredVocab();
    var known = pool.filter(function (w) { return state.vocabKnown[w.id]; }).length;
    var pct = pool.length ? Math.round(known / pool.length * 100) : 0;
    document.getElementById("vocab-progress-fill").style.width = pct + "%";
    document.getElementById("vocab-progress-text").textContent =
      known + " of " + pool.length + " words mastered (" + pct + "%)";
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
      feedback.textContent = "Correct! " + correct.name + " is " + displayHebrew(correct.letter);
      feedback.className = "quiz-feedback show-correct";
    } else {
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
