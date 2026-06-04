(function () {
  "use strict";

  const upperCategories = [
    { id: "ones", label: "Ones", hint: "Sum of all ones", face: 1 },
    { id: "twos", label: "Twos", hint: "Sum of all twos", face: 2 },
    { id: "threes", label: "Threes", hint: "Sum of all threes", face: 3 },
    { id: "fours", label: "Fours", hint: "Sum of all fours", face: 4 },
    { id: "fives", label: "Fives", hint: "Sum of all fives", face: 5 },
    { id: "sixes", label: "Sixes", hint: "Sum of all sixes", face: 6 },
  ];

  const lowerCategories = [
    { id: "onePair", label: "One Pair", hint: "Highest matching pair" },
    { id: "twoPairs", label: "Two Pairs", hint: "Two different pairs" },
    { id: "threeKind", label: "Three of a Kind", hint: "Three matching dice" },
    { id: "fourKind", label: "Four of a Kind", hint: "Four matching dice" },
    { id: "smallStraight", label: "Small Straight", hint: "1, 2, 3, 4, 5" },
    { id: "largeStraight", label: "Large Straight", hint: "2, 3, 4, 5, 6" },
    { id: "fullHouse", label: "Full House", hint: "One pair and one three-kind" },
    { id: "chance", label: "Chance", hint: "Sum of all dice" },
    { id: "yatzy", label: "Yatzy", hint: "Five matching dice" },
  ];

  const categories = [...upperCategories, ...lowerCategories];
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const bestScoreKey = "yatzy-best-score-v1";
  const diePips = {
    1: [5],
    2: [1, 9],
    3: [1, 5, 9],
    4: [1, 3, 7, 9],
    5: [1, 3, 5, 7, 9],
    6: [1, 3, 4, 6, 7, 9],
  };

  const state = {
    mode: "solo",
    players: [],
    currentPlayerIndex: 0,
    dice: [1, 1, 1, 1, 1],
    held: [false, false, false, false, false],
    rolls: 0,
    gameOver: false,
    message: "Roll the dice to start.",
    turnLog: [],
    bestScore: Number(localStorage.getItem(bestScoreKey) || 0),
    autoPlaying: false,
    autoTimer: null,
    cpuDelay: 620,
    installPrompt: null,
    pwaMessage: "",
    pwaVisible: false,
  };

  const els = {};

  function emptyScores() {
    return Object.fromEntries(categories.map((category) => [category.id, null]));
  }

  function createPlayer(id, name, type) {
    return {
      id,
      name,
      type,
      scores: emptyScores(),
      lastTurn: null,
    };
  }

  function countDice(dice) {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    dice.forEach((value) => {
      counts[value] += 1;
    });
    return counts;
  }

  function sumDice(dice) {
    return dice.reduce((total, value) => total + value, 0);
  }

  function scoreDice(categoryId, dice) {
    const category = categoryMap.get(categoryId);
    if (!category) {
      return 0;
    }

    const counts = countDice(dice);

    if (category.face) {
      return counts[category.face] * category.face;
    }

    if (categoryId === "onePair") {
      for (let face = 6; face >= 1; face -= 1) {
        if (counts[face] >= 2) {
          return face * 2;
        }
      }
      return 0;
    }

    if (categoryId === "twoPairs") {
      const pairs = [];
      for (let face = 6; face >= 1; face -= 1) {
        if (counts[face] >= 2) {
          pairs.push(face);
        }
      }
      return pairs.length >= 2 ? (pairs[0] + pairs[1]) * 2 : 0;
    }

    if (categoryId === "threeKind") {
      for (let face = 6; face >= 1; face -= 1) {
        if (counts[face] >= 3) {
          return face * 3;
        }
      }
      return 0;
    }

    if (categoryId === "fourKind") {
      for (let face = 6; face >= 1; face -= 1) {
        if (counts[face] >= 4) {
          return face * 4;
        }
      }
      return 0;
    }

    if (categoryId === "smallStraight") {
      return [1, 2, 3, 4, 5].every((face) => counts[face] === 1) ? 15 : 0;
    }

    if (categoryId === "largeStraight") {
      return [2, 3, 4, 5, 6].every((face) => counts[face] === 1) ? 20 : 0;
    }

    if (categoryId === "fullHouse") {
      const hasPair = counts.some((amount) => amount === 2);
      const hasThree = counts.some((amount) => amount === 3);
      return hasPair && hasThree ? sumDice(dice) : 0;
    }

    if (categoryId === "chance") {
      return sumDice(dice);
    }

    if (categoryId === "yatzy") {
      return counts.some((amount) => amount === 5) ? 50 : 0;
    }

    return 0;
  }

  function calculateTotals(scores) {
    const upper = upperCategories.reduce((total, category) => total + (scores[category.id] || 0), 0);
    const lower = lowerCategories.reduce((total, category) => total + (scores[category.id] || 0), 0);
    const bonus = upper >= 63 ? 50 : 0;
    return {
      upper,
      lower,
      bonus,
      total: upper + lower + bonus,
      remaining: categories.filter((category) => scores[category.id] === null).length,
    };
  }

  function currentPlayer() {
    return state.players[state.currentPlayerIndex];
  }

  function leaderboard() {
    return state.players
      .map((player) => ({ player, totals: calculateTotals(player.scores) }))
      .sort((a, b) => b.totals.total - a.totals.total || a.totals.remaining - b.totals.remaining);
  }

  function randomDie() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function clearCpuTimer() {
    if (state.autoTimer) {
      clearTimeout(state.autoTimer);
      state.autoTimer = null;
    }
  }

  function canHumanAct() {
    const player = currentPlayer();
    return !state.gameOver && player && player.type === "human";
  }

  function shouldCpuRun() {
    const player = currentPlayer();
    return !state.gameOver && player && player.type === "cpu" && (state.mode === "vsComputer" || state.autoPlaying);
  }

  function scheduleCpuStep(delay = state.cpuDelay) {
    clearCpuTimer();
    if (!shouldCpuRun()) {
      return;
    }
    state.autoTimer = setTimeout(runCpuStep, delay);
  }

  function resetTurnFor(playerIndex) {
    state.currentPlayerIndex = playerIndex;
    state.dice = [1, 1, 1, 1, 1];
    state.held = [false, false, false, false, false];
    state.rolls = 0;
  }

  function nextPlayablePlayerIndex() {
    for (let offset = 1; offset <= state.players.length; offset += 1) {
      const index = (state.currentPlayerIndex + offset) % state.players.length;
      if (calculateTotals(state.players[index].scores).remaining > 0) {
        return index;
      }
    }
    return -1;
  }

  function allPlayersFinished() {
    return state.players.every((player) => calculateTotals(player.scores).remaining === 0);
  }

  function finishGame() {
    state.gameOver = true;
    clearCpuTimer();
    const ranked = leaderboard();
    const winner = ranked[0];
    const tie = ranked.filter((entry) => entry.totals.total === winner.totals.total).length > 1;
    state.message = tie ? `Game over. Tie at ${winner.totals.total}.` : `Game over. ${winner.player.name} wins with ${winner.totals.total}.`;

    const human = state.players.find((player) => player.type === "human");
    if (human) {
      const total = calculateTotals(human.scores).total;
      if (total > state.bestScore) {
        state.bestScore = total;
        localStorage.setItem(bestScoreKey, String(total));
      }
    }
  }

  function advanceAfterScore() {
    if (allPlayersFinished()) {
      finishGame();
      return;
    }

    const nextIndex = nextPlayablePlayerIndex();
    resetTurnFor(nextIndex);
    const player = currentPlayer();
    state.message = player.type === "cpu" ? `${player.name} is thinking.` : `${player.name}, roll the dice.`;
  }

  function rollCurrentDice() {
    if (state.gameOver || state.rolls >= 3) {
      return false;
    }

    state.dice = state.dice.map((value, index) => (state.held[index] ? value : randomDie()));
    state.rolls += 1;
    return true;
  }

  function rollDice() {
    if (!canHumanAct() || !rollCurrentDice()) {
      return;
    }

    state.message = state.rolls === 3 ? "Choose a score row." : "Hold dice or roll again.";
    render();
  }

  function toggleHold(index) {
    if (!canHumanAct() || state.rolls === 0) {
      return;
    }

    state.held[index] = !state.held[index];
    render();
  }

  function applyScore(categoryId) {
    const player = currentPlayer();
    if (!player || state.rolls === 0 || state.gameOver || player.scores[categoryId] !== null) {
      return false;
    }

    const category = categoryMap.get(categoryId);
    const score = scoreDice(categoryId, state.dice);
    player.scores[categoryId] = score;
    player.lastTurn = {
      categoryId,
      label: category.label,
      score,
      dice: [...state.dice],
    };
    state.turnLog.unshift(`${player.name}: ${category.label} +${score}`);
    state.turnLog = state.turnLog.slice(0, 5);
    advanceAfterScore();
    return true;
  }

  function scoreCategory(categoryId) {
    if (!canHumanAct()) {
      return;
    }

    if (applyScore(categoryId)) {
      render();
      scheduleCpuStep(560);
    }
  }

  function chooseCpuHoldFace(dice, scores) {
    const counts = countDice(dice);
    let bestFace = 6;
    let bestCount = 0;
    for (let face = 1; face <= 6; face += 1) {
      if (counts[face] > bestCount || (counts[face] === bestCount && face > bestFace)) {
        bestFace = face;
        bestCount = counts[face];
      }
    }

    if (scores.yatzy === null && bestCount >= 2) {
      return bestFace;
    }

    for (let face = 6; face >= 1; face -= 1) {
      const upper = upperCategories[face - 1];
      if (upper && scores[upper.id] === null && counts[face] >= 2) {
        return face;
      }
    }

    if (bestCount >= 2) {
      return bestFace;
    }

    return dice.includes(6) ? 6 : dice.includes(5) ? 5 : bestFace;
  }

  function chooseCpuHolds(dice, scores) {
    const targetFace = chooseCpuHoldFace(dice, scores);
    const unique = new Set(dice);

    if (scores.largeStraight === null && [2, 3, 4, 5, 6].filter((face) => unique.has(face)).length >= 4) {
      return dice.map((value, index) => [2, 3, 4, 5, 6].includes(value) && dice.indexOf(value) === index);
    }

    if (scores.smallStraight === null && [1, 2, 3, 4, 5].filter((face) => unique.has(face)).length >= 4) {
      return dice.map((value, index) => [1, 2, 3, 4, 5].includes(value) && dice.indexOf(value) === index);
    }

    return dice.map((value) => value === targetFace);
  }

  function zeroPenalty(categoryId) {
    const penalties = {
      ones: 1,
      twos: 2,
      threes: 4,
      onePair: 5,
      fours: 7,
      twoPairs: 8,
      fives: 10,
      sixes: 12,
      threeKind: 13,
      fourKind: 15,
      fullHouse: 16,
      smallStraight: 17,
      largeStraight: 18,
      chance: 22,
      yatzy: 25,
    };
    return penalties[categoryId] || 20;
  }

  function categoryPriority(categoryId, score, scores) {
    if (score === 0) {
      return -zeroPenalty(categoryId);
    }

    const priority = {
      yatzy: 28,
      largeStraight: 12,
      smallStraight: 10,
      fullHouse: 9,
      fourKind: 7,
      threeKind: 5,
      twoPairs: 4,
      onePair: 2,
      chance: score >= 22 ? 4 : -3,
    };
    const category = categoryMap.get(categoryId);
    const upperPressure = category && category.face && calculateTotals(scores).upper < 63 ? category.face * 0.8 : 0;
    return score + (priority[categoryId] || 0) + upperPressure;
  }

  function chooseCpuCategory(scores, dice) {
    return categories
      .filter((category) => scores[category.id] === null)
      .map((category) => {
        const score = scoreDice(category.id, dice);
        return {
          id: category.id,
          score,
          rank: categoryPriority(category.id, score, scores),
        };
      })
      .sort((a, b) => b.rank - a.rank || b.score - a.score)[0].id;
  }

  function runCpuStep() {
    state.autoTimer = null;
    if (!shouldCpuRun()) {
      return;
    }

    const player = currentPlayer();
    if (state.rolls > 0 && state.rolls < 3) {
      state.held = chooseCpuHolds(state.dice, player.scores);
    }

    if (state.rolls < 3) {
      rollCurrentDice();
      state.message = `${player.name} rolls ${state.rolls} / 3.`;
      render();
      scheduleCpuStep();
      return;
    }

    const categoryId = chooseCpuCategory(player.scores, state.dice);
    applyScore(categoryId);
    render();
    scheduleCpuStep(760);
  }

  function setupPlayers(mode) {
    if (mode === "vsComputer") {
      return [createPlayer("you", "You", "human"), createPlayer("cpu", "Computer", "cpu")];
    }

    if (mode === "watch") {
      return [createPlayer("cpuA", "CPU A", "cpu"), createPlayer("cpuB", "CPU B", "cpu")];
    }

    return [createPlayer("you", "You", "human")];
  }

  function restartGame() {
    clearCpuTimer();
    state.players = setupPlayers(state.mode);
    state.currentPlayerIndex = 0;
    state.turnLog = [];
    state.gameOver = false;
    state.autoPlaying = state.mode === "watch";
    resetTurnFor(0);
    state.message = state.mode === "watch" ? "Watching CPU A start." : "Roll the dice to start.";
    render();
    scheduleCpuStep(520);
  }

  function setMode(mode) {
    if (!["solo", "vsComputer", "watch"].includes(mode) || state.mode === mode) {
      return;
    }
    state.mode = mode;
    restartGame();
  }

  function toggleAutoPlay() {
    if (state.mode !== "watch" || state.gameOver) {
      return;
    }
    state.autoPlaying = !state.autoPlaying;
    state.message = state.autoPlaying ? `${currentPlayer().name} continues.` : "CPU match paused.";
    render();
    scheduleCpuStep(420);
  }

  function renderDie(value, index) {
    const player = currentPlayer();
    const button = document.createElement("button");
    button.type = "button";
    button.className = `die${state.held[index] ? " is-held" : ""}`;
    button.disabled = !canHumanAct() || state.rolls === 0;
    button.setAttribute(
      "aria-label",
      `Die ${index + 1}: ${value}${state.held[index] ? ", held" : ""}${player && player.type === "cpu" ? ", CPU turn" : ""}`
    );
    button.setAttribute("aria-pressed", String(state.held[index]));
    button.dataset.index = String(index);

    const face = document.createElement("span");
    face.className = "die-face";
    diePips[value].forEach((pipPosition) => {
      const pip = document.createElement("span");
      pip.className = `pip pip-${pipPosition}`;
      face.appendChild(pip);
    });
    button.appendChild(face);
    return button;
  }

  function scorePreview(categoryId) {
    return state.rolls > 0 ? scoreDice(categoryId, state.dice) : "-";
  }

  function renderPlayersBoard() {
    els.playersBoard.replaceChildren(
      ...state.players.map((player, index) => {
        const totals = calculateTotals(player.scores);
        const card = document.createElement("div");
        card.className = `player-card${index === state.currentPlayerIndex ? " is-active" : ""}`;

        const title = document.createElement("div");
        title.className = "player-title";
        title.innerHTML = `<strong>${player.name}</strong><span>${player.type === "cpu" ? "CPU" : "Player"}</span>`;

        const score = document.createElement("div");
        score.className = "player-score";
        score.innerHTML = `<strong>${totals.total}</strong><span>${totals.remaining} left</span>`;

        const last = document.createElement("p");
        last.className = "player-last";
        last.textContent = player.lastTurn ? `${player.lastTurn.label} +${player.lastTurn.score}` : "No score yet";

        card.append(title, score, last);
        return card;
      })
    );
  }

  function renderTurnLog() {
    els.turnLog.hidden = state.turnLog.length === 0;
    els.turnLog.replaceChildren(
      ...state.turnLog.map((entry) => {
        const item = document.createElement("p");
        item.textContent = entry;
        return item;
      })
    );
  }

  function renderScoreRow(category) {
    const player = currentPlayer();
    const filled = player.scores[category.id] !== null;
    const row = document.createElement("div");
    row.className = `score-row${filled ? " is-filled" : ""}`;

    const name = document.createElement("div");
    name.className = "score-name";
    name.innerHTML = `<strong>${category.label}</strong><span>${category.hint}</span>`;

    const value = document.createElement("div");
    value.className = "score-value";
    value.textContent = filled ? String(player.scores[category.id]) : String(scorePreview(category.id));

    const button = document.createElement("button");
    button.type = "button";
    button.className = `score-button${filled ? " is-filled" : ""}`;
    button.disabled = filled || state.rolls === 0 || !canHumanAct();
    button.dataset.category = category.id;
    button.textContent = filled ? "Set" : player.type === "cpu" ? "CPU" : "Score";
    button.setAttribute("aria-label", `Score ${category.label}`);

    row.append(name, value, button);
    return row;
  }

  function renderScoreTable() {
    els.scoreTable.replaceChildren();

    const upperHeader = document.createElement("div");
    upperHeader.className = "score-row is-section";
    upperHeader.textContent = "Upper section";
    els.scoreTable.appendChild(upperHeader);
    upperCategories.forEach((category) => els.scoreTable.appendChild(renderScoreRow(category)));

    const lowerHeader = document.createElement("div");
    lowerHeader.className = "score-row is-section";
    lowerHeader.textContent = "Lower section";
    els.scoreTable.appendChild(lowerHeader);
    lowerCategories.forEach((category) => els.scoreTable.appendChild(renderScoreRow(category)));
  }

  function renderModeButtons() {
    els.modeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === state.mode);
      button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode));
    });
  }

  function render() {
    const player = currentPlayer();
    const totals = calculateTotals(player.scores);
    const leader = leaderboard()[0];
    els.totalLabel.textContent = state.mode === "solo" ? "Total" : player.name;
    els.totalScore.textContent = String(totals.total);
    els.secondaryLabel.textContent = state.mode === "solo" ? "Best" : "Leader";
    els.bestScore.textContent = state.mode === "solo" ? String(state.bestScore) : String(leader.totals.total);
    els.upperScore.textContent = String(totals.upper);
    els.scoreCardSubtitle.textContent = player.name;
    els.rollCount.textContent = `${state.rolls} / 3`;
    els.remainingCount.textContent = String(totals.remaining);
    els.bonusState.textContent = `${totals.bonus} / 50`;
    els.turnMessage.textContent = state.message;
    els.rollButton.disabled = !canHumanAct() || state.rolls >= 3;
    els.rollButton.textContent = player.type === "cpu" ? "CPU Rolling" : state.rolls === 0 ? "Roll Dice" : "Roll Again";
    els.autoButton.hidden = state.mode !== "watch";
    els.autoButton.textContent = state.autoPlaying ? "Pause" : "Resume";
    els.autoButton.disabled = state.gameOver;
    els.diceTray.replaceChildren(...state.dice.map((value, index) => renderDie(value, index)));
    renderModeButtons();
    renderPlayersBoard();
    renderScoreTable();
    renderTurnLog();

    els.pwaStatus.hidden = !state.pwaVisible;
    els.pwaStatus.textContent = state.pwaMessage;
  }

  function renderGameToText() {
    const player = currentPlayer();
    const totals = calculateTotals(player.scores);
    const availableScores = Object.fromEntries(
      categories
        .filter((category) => player.scores[category.id] === null)
        .map((category) => [category.id, state.rolls > 0 ? scoreDice(category.id, state.dice) : null])
    );

    return JSON.stringify({
      coordinate_system: "Turn-based score card; dice indexed left to right from 0 to 4.",
      mode: state.gameOver ? "game_over" : state.mode,
      current_player: {
        id: player.id,
        name: player.name,
        type: player.type,
      },
      auto_playing: state.autoPlaying,
      dice: state.dice,
      held: state.held,
      rolls: state.rolls,
      rolls_remaining: Math.max(0, 3 - state.rolls),
      players: state.players.map((entry) => ({
        id: entry.id,
        name: entry.name,
        type: entry.type,
        scores: entry.scores,
        totals: calculateTotals(entry.scores),
        last_turn: entry.lastTurn,
      })),
      available_scores: availableScores,
      totals,
      turn_log: state.turnLog,
      message: state.message,
    });
  }

  function bindEvents() {
    els.rollButton.addEventListener("click", rollDice);
    els.restartButton.addEventListener("click", restartGame);
    els.autoButton.addEventListener("click", toggleAutoPlay);
    els.modeButtons.forEach((button) => {
      button.addEventListener("click", () => setMode(button.dataset.mode));
    });
    els.diceTray.addEventListener("click", (event) => {
      const die = event.target.closest(".die");
      if (die) {
        toggleHold(Number(die.dataset.index));
      }
    });
    els.scoreTable.addEventListener("click", (event) => {
      const button = event.target.closest(".score-button");
      if (button) {
        scoreCategory(button.dataset.category);
      }
    });
  }

  function setPwaStatus(message, visible = true) {
    state.pwaMessage = message;
    state.pwaVisible = visible;
    if (els.pwaStatus) {
      render();
    }
  }

  function registerPwa() {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      state.installPrompt = event;
      setPwaStatus("Ready to install from your browser menu.");
    });

    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        if (registration.active) {
          setPwaStatus("Offline play is ready.");
        }
      })
      .catch(() => {
        setPwaStatus("Offline play is unavailable in this browser.", true);
      });

    navigator.serviceWorker.ready.then(() => {
      setPwaStatus("Offline play is ready.");
    });

    window.addEventListener("appinstalled", () => {
      state.installPrompt = null;
      setPwaStatus("Installed for offline play.");
    });
  }

  function init() {
    els.diceTray = document.getElementById("dice-tray");
    els.scoreTable = document.getElementById("score-table");
    els.playersBoard = document.getElementById("players-board");
    els.turnLog = document.getElementById("turn-log");
    els.rollButton = document.getElementById("roll-button");
    els.restartButton = document.getElementById("restart-button");
    els.autoButton = document.getElementById("auto-button");
    els.modeButtons = [...document.querySelectorAll(".mode-button")];
    els.totalLabel = document.getElementById("total-label");
    els.secondaryLabel = document.getElementById("secondary-label");
    els.totalScore = document.getElementById("total-score");
    els.bestScore = document.getElementById("best-score");
    els.upperScore = document.getElementById("upper-score");
    els.scoreCardSubtitle = document.getElementById("score-card-subtitle");
    els.rollCount = document.getElementById("roll-count");
    els.remainingCount = document.getElementById("remaining-count");
    els.bonusState = document.getElementById("bonus-state");
    els.turnMessage = document.getElementById("turn-message");
    els.pwaStatus = document.getElementById("pwa-status");

    bindEvents();
    state.players = setupPlayers("solo");
    render();
    registerPwa();
  }

  window.render_game_to_text = renderGameToText;
  window.advanceTime = (ms = 1000 / 60) => {
    if (shouldCpuRun()) {
      runCpuStep();
    } else {
      render();
    }
    return Promise.resolve(ms);
  };
  window.__yatzy = {
    scoreDice,
    calculateTotals,
    chooseCpuCategory,
    chooseCpuHolds,
    categories: categories.map((category) => ({ id: category.id, label: category.label })),
  };

  document.addEventListener("DOMContentLoaded", init);
})();
