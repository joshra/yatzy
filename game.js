(function () {
  "use strict";

  const languageKey = "yatzy-language-v1";
  const languageOptions = [
    { id: "zh-Hant", htmlLang: "zh-Hant", label: "繁中" },
    { id: "en", htmlLang: "en", label: "English" },
    { id: "sv", htmlLang: "sv", label: "Svenska" },
  ];

  const translations = {
    "zh-Hant": {
      ui: {
        pageTitle: "Yatzy",
        metaDescription: "支援單人、對戰電腦與雙人對戰模式的北歐 Yatzy PWA 遊戲。",
        title: "Yatzy",
        eyebrow: "北歐 Yatzy",
        boardLabel: "Yatzy 遊戲板",
        scoreSummaryLabel: "分數摘要",
        languageSelectorLabel: "語言",
        playAreaLabel: "骰子控制",
        modeTabsLabel: "遊戲模式",
        playersLabel: "玩家",
        rollsLabel: "擲骰",
        remainingLabel: "剩餘",
        bonusLabel: "獎勵",
        diceLabel: "骰子",
        recentTurnsLabel: "最近回合",
        scoreCardLabel: "計分卡",
        scoreCardTitle: "計分卡",
        upperLabel: "上半區",
        total: "總分",
        best: "最高分",
        leader: "領先",
        rollDice: "擲骰",
        rollAgain: "再擲",
        cpuRolling: "CPU 擲骰中",
        restart: "重新開始",
        currentTurn: "目前回合",
        upperSection: "上半區",
        lowerSection: "下半區",
        scoreAction: "計分",
        setAction: "已填",
        cpuAction: "CPU",
        held: "保留",
        dieAria: "骰子 {index}：{value}{held}{cpuTurn}",
        dieHeldSuffix: "，已保留",
        dieCpuSuffix: "，CPU 回合",
        scoreAria: "將 {category} 計分",
        noScoreYet: "尚未得分",
        remainingCount: "剩餘 {remaining} 項",
      },
      modes: {
        solo: "單人",
        vsComputer: "對戰電腦",
        twoPlayer: "雙人對戰",
      },
      playerNames: {
        you: "你",
        player1: "玩家 1",
        player2: "玩家 2",
        cpu: "電腦",
      },
      playerTypes: {
        human: "玩家",
        cpu: "CPU",
      },
      categories: {
        ones: { label: "一點", hint: "所有一點骰總和" },
        twos: { label: "二點", hint: "所有二點骰總和" },
        threes: { label: "三點", hint: "所有三點骰總和" },
        fours: { label: "四點", hint: "所有四點骰總和" },
        fives: { label: "五點", hint: "所有五點骰總和" },
        sixes: { label: "六點", hint: "所有六點骰總和" },
        onePair: { label: "一對", hint: "最高的一組對子" },
        twoPairs: { label: "兩對", hint: "兩組不同對子" },
        threeKind: { label: "三條", hint: "三顆相同骰子" },
        fourKind: { label: "四條", hint: "四顆相同骰子" },
        smallStraight: { label: "小順", hint: "1, 2, 3, 4, 5" },
        largeStraight: { label: "大順", hint: "2, 3, 4, 5, 6" },
        fullHouse: { label: "葫蘆", hint: "一對加三條" },
        chance: { label: "機會", hint: "所有骰子總和" },
        yatzy: { label: "Yatzy", hint: "五顆相同骰子" },
      },
      messages: {
        start: "擲骰開始。",
        cpuThinking: "{player} 正在思考。",
        playerRoll: "{player}，請擲骰。",
        chooseScore: "選擇一列計分。",
        holdOrRoll: "保留骰子或再擲一次。",
        gameTie: "遊戲結束，{score} 分平手。",
        gameWinner: "遊戲結束，{player} 以 {score} 分獲勝。",
        cpuRolls: "{player} 擲第 {rolls} / 3 次。",
        pwaReadyInstall: "可從瀏覽器選單安裝。",
        offlineReady: "已可離線遊玩。",
        offlineUnavailable: "此瀏覽器無法離線遊玩。",
        installedOffline: "已安裝，可離線遊玩。",
      },
    },
    en: {
      ui: {
        pageTitle: "Yatzy",
        metaDescription: "A Nordic Yatzy PWA game with solo, computer opponent, and two-player modes.",
        title: "Yatzy",
        eyebrow: "Nordic Yatzy",
        boardLabel: "Yatzy board",
        scoreSummaryLabel: "Score summary",
        languageSelectorLabel: "Language",
        playAreaLabel: "Dice controls",
        modeTabsLabel: "Game mode",
        playersLabel: "Players",
        rollsLabel: "Rolls",
        remainingLabel: "Remaining",
        bonusLabel: "Bonus",
        diceLabel: "Dice",
        recentTurnsLabel: "Recent turns",
        scoreCardLabel: "Score card",
        scoreCardTitle: "Score Card",
        upperLabel: "Upper",
        total: "Total",
        best: "Best",
        leader: "Leader",
        rollDice: "Roll Dice",
        rollAgain: "Roll Again",
        cpuRolling: "CPU Rolling",
        restart: "Restart",
        currentTurn: "Turn",
        upperSection: "Upper section",
        lowerSection: "Lower section",
        scoreAction: "Score",
        setAction: "Set",
        cpuAction: "CPU",
        held: "HELD",
        dieAria: "Die {index}: {value}{held}{cpuTurn}",
        dieHeldSuffix: ", held",
        dieCpuSuffix: ", CPU turn",
        scoreAria: "Score {category}",
        noScoreYet: "No score yet",
        remainingCount: "{remaining} left",
      },
      modes: {
        solo: "Solo",
        vsComputer: "Vs Computer",
        twoPlayer: "Two Players",
      },
      playerNames: {
        you: "You",
        player1: "Player 1",
        player2: "Player 2",
        cpu: "Computer",
      },
      playerTypes: {
        human: "Player",
        cpu: "CPU",
      },
      categories: {
        ones: { label: "Ones", hint: "Sum of all ones" },
        twos: { label: "Twos", hint: "Sum of all twos" },
        threes: { label: "Threes", hint: "Sum of all threes" },
        fours: { label: "Fours", hint: "Sum of all fours" },
        fives: { label: "Fives", hint: "Sum of all fives" },
        sixes: { label: "Sixes", hint: "Sum of all sixes" },
        onePair: { label: "One Pair", hint: "Highest matching pair" },
        twoPairs: { label: "Two Pairs", hint: "Two different pairs" },
        threeKind: { label: "Three of a Kind", hint: "Three matching dice" },
        fourKind: { label: "Four of a Kind", hint: "Four matching dice" },
        smallStraight: { label: "Small Straight", hint: "1, 2, 3, 4, 5" },
        largeStraight: { label: "Large Straight", hint: "2, 3, 4, 5, 6" },
        fullHouse: { label: "Full House", hint: "One pair and one three-kind" },
        chance: { label: "Chance", hint: "Sum of all dice" },
        yatzy: { label: "Yatzy", hint: "Five matching dice" },
      },
      messages: {
        start: "Roll the dice to start.",
        cpuThinking: "{player} is thinking.",
        playerRoll: "{player}, roll the dice.",
        chooseScore: "Choose a score row.",
        holdOrRoll: "Hold dice or roll again.",
        gameTie: "Game over. Tie at {score}.",
        gameWinner: "Game over. {player} wins with {score}.",
        cpuRolls: "{player} rolls {rolls} / 3.",
        pwaReadyInstall: "Ready to install from your browser menu.",
        offlineReady: "Offline play is ready.",
        offlineUnavailable: "Offline play is unavailable in this browser.",
        installedOffline: "Installed for offline play.",
      },
    },
    sv: {
      ui: {
        pageTitle: "Yatzy",
        metaDescription: "Ett nordiskt Yatzy-PWA-spel med solo, datormotståndare och tvåspelarläge.",
        title: "Yatzy",
        eyebrow: "Nordisk Yatzy",
        boardLabel: "Yatzy-bräde",
        scoreSummaryLabel: "Poängsammanfattning",
        languageSelectorLabel: "Språk",
        playAreaLabel: "Tärningskontroller",
        modeTabsLabel: "Spelläge",
        playersLabel: "Spelare",
        rollsLabel: "Kast",
        remainingLabel: "Kvar",
        bonusLabel: "Bonus",
        diceLabel: "Tärningar",
        recentTurnsLabel: "Senaste rundorna",
        scoreCardLabel: "Poängkort",
        scoreCardTitle: "Poängkort",
        upperLabel: "Övre",
        total: "Totalt",
        best: "Rekord",
        leader: "Ledare",
        rollDice: "Kasta",
        rollAgain: "Kasta igen",
        cpuRolling: "Datorn kastar",
        restart: "Starta om",
        currentTurn: "Tur",
        upperSection: "Övre sektion",
        lowerSection: "Nedre sektion",
        scoreAction: "Sätt",
        setAction: "Satt",
        cpuAction: "CPU",
        held: "SPARAD",
        dieAria: "Tärning {index}: {value}{held}{cpuTurn}",
        dieHeldSuffix: ", sparad",
        dieCpuSuffix: ", CPU-tur",
        scoreAria: "Sätt poäng i {category}",
        noScoreYet: "Ingen poäng ännu",
        remainingCount: "{remaining} kvar",
      },
      modes: {
        solo: "Solo",
        vsComputer: "Mot datorn",
        twoPlayer: "Två spelare",
      },
      playerNames: {
        you: "Du",
        player1: "Spelare 1",
        player2: "Spelare 2",
        cpu: "Datorn",
      },
      playerTypes: {
        human: "Spelare",
        cpu: "CPU",
      },
      categories: {
        ones: { label: "Ettor", hint: "Summan av alla ettor" },
        twos: { label: "Tvåor", hint: "Summan av alla tvåor" },
        threes: { label: "Treor", hint: "Summan av alla treor" },
        fours: { label: "Fyror", hint: "Summan av alla fyror" },
        fives: { label: "Femmor", hint: "Summan av alla femmor" },
        sixes: { label: "Sexor", hint: "Summan av alla sexor" },
        onePair: { label: "Ett par", hint: "Högsta paret" },
        twoPairs: { label: "Två par", hint: "Två olika par" },
        threeKind: { label: "Tretal", hint: "Tre lika tärningar" },
        fourKind: { label: "Fyrtal", hint: "Fyra lika tärningar" },
        smallStraight: { label: "Liten stege", hint: "1, 2, 3, 4, 5" },
        largeStraight: { label: "Stor stege", hint: "2, 3, 4, 5, 6" },
        fullHouse: { label: "Kåk", hint: "Ett par och ett tretal" },
        chance: { label: "Chans", hint: "Summan av alla tärningar" },
        yatzy: { label: "Yatzy", hint: "Fem lika tärningar" },
      },
      messages: {
        start: "Kasta tärningarna för att börja.",
        cpuThinking: "{player} tänker.",
        playerRoll: "{player}, kasta tärningarna.",
        chooseScore: "Välj en poängrad.",
        holdOrRoll: "Spara tärningar eller kasta igen.",
        gameTie: "Spelet är slut. Oavgjort på {score}.",
        gameWinner: "Spelet är slut. {player} vinner med {score}.",
        cpuRolls: "{player} kastar {rolls} / 3.",
        pwaReadyInstall: "Redo att installera via webbläsarmenyn.",
        offlineReady: "Offlinespel är klart.",
        offlineUnavailable: "Offlinespel stöds inte i den här webbläsaren.",
        installedOffline: "Installerad för offlinespel.",
      },
    },
  };

  const upperCategories = [
    { id: "ones", face: 1 },
    { id: "twos", face: 2 },
    { id: "threes", face: 3 },
    { id: "fours", face: 4 },
    { id: "fives", face: 5 },
    { id: "sixes", face: 6 },
  ];

  const lowerCategories = [
    { id: "onePair" },
    { id: "twoPairs" },
    { id: "threeKind" },
    { id: "fourKind" },
    { id: "smallStraight" },
    { id: "largeStraight" },
    { id: "fullHouse" },
    { id: "chance" },
    { id: "yatzy" },
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

  function normalizeLanguage(language) {
    const value = String(language || "").toLowerCase();
    if (value.startsWith("zh")) {
      return "zh-Hant";
    }
    if (value.startsWith("sv")) {
      return "sv";
    }
    if (value.startsWith("en")) {
      return "en";
    }
    return null;
  }

  function getInitialLanguage() {
    const stored = normalizeLanguage(localStorage.getItem(languageKey));
    if (stored) {
      return stored;
    }

    const browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
    for (const language of browserLanguages) {
      const normalized = normalizeLanguage(language);
      if (normalized) {
        return normalized;
      }
    }

    return "en";
  }

  function activeCopy() {
    return translations[state.language] || translations.en;
  }

  function uiText(key) {
    const copy = activeCopy();
    return copy.ui[key] || translations.en.ui[key] || key;
  }

  function formatText(template, values = {}) {
    return String(template).replace(/\{(\w+)\}/g, (match, key) => (values[key] === undefined ? match : values[key]));
  }

  function playerName(playerId) {
    const copy = activeCopy();
    return copy.playerNames[playerId] || translations.en.playerNames[playerId] || playerId;
  }

  function playerTypeLabel(type) {
    const copy = activeCopy();
    return copy.playerTypes[type] || translations.en.playerTypes[type] || type;
  }

  function categoryCopy(categoryId) {
    const copy = activeCopy();
    return copy.categories[categoryId] || translations.en.categories[categoryId] || { label: categoryId, hint: "" };
  }

  function categoryLabel(categoryId) {
    return categoryCopy(categoryId).label;
  }

  function categoryHint(categoryId) {
    return categoryCopy(categoryId).hint;
  }

  function modeLabel(mode) {
    const copy = activeCopy();
    return copy.modes[mode] || translations.en.modes[mode] || mode;
  }

  function messageText(key, args = {}) {
    const copy = activeCopy();
    const values = { ...args };
    if (values.playerId) {
      values.player = playerName(values.playerId);
    }
    return formatText(copy.messages[key] || translations.en.messages[key] || key, values);
  }

  const state = {
    language: getInitialLanguage(),
    mode: "solo",
    players: [],
    currentPlayerIndex: 0,
    dice: [1, 1, 1, 1, 1],
    held: [false, false, false, false, false],
    rolls: 0,
    gameOver: false,
    messageKey: "start",
    messageArgs: {},
    turnLog: [],
    bestScore: Number(localStorage.getItem(bestScoreKey) || 0),
    autoTimer: null,
    cpuDelay: 620,
    installPrompt: null,
    pwaMessageKey: "",
    pwaMessageArgs: {},
    pwaVisible: false,
  };

  const els = {};

  function setMessage(key, args = {}) {
    state.messageKey = key;
    state.messageArgs = args;
  }

  function currentMessage() {
    return messageText(state.messageKey, state.messageArgs);
  }

  function currentPwaMessage() {
    return state.pwaMessageKey ? messageText(state.pwaMessageKey, state.pwaMessageArgs) : "";
  }

  function syncPlayerNames() {
    state.players.forEach((player) => {
      player.name = playerName(player.id);
    });
  }

  function applyStaticText() {
    const option = languageOptions.find((entry) => entry.id === state.language) || languageOptions[1];
    document.documentElement.lang = option.htmlLang;
    document.title = uiText("pageTitle");

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", uiText("metaDescription"));
    }

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = uiText(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      element.setAttribute("aria-label", uiText(element.dataset.i18nAriaLabel));
    });
  }

  function renderLanguageButtons() {
    els.languageButtons.forEach((button) => {
      const selected = button.dataset.lang === state.language;
      const option = languageOptions.find((entry) => entry.id === button.dataset.lang);
      button.textContent = option ? option.label : button.dataset.lang;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  }

  function setLanguage(languageId) {
    if (!translations[languageId] || state.language === languageId) {
      return;
    }
    state.language = languageId;
    localStorage.setItem(languageKey, languageId);
    syncPlayerNames();
    if (els.rollButton) {
      render();
    }
  }

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
    return !state.gameOver && player && player.type === "cpu" && state.mode === "vsComputer";
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
    if (tie) {
      setMessage("gameTie", { score: winner.totals.total });
    } else {
      setMessage("gameWinner", { playerId: winner.player.id, score: winner.totals.total });
    }

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
    setMessage(player.type === "cpu" ? "cpuThinking" : "playerRoll", { playerId: player.id });
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

    setMessage(state.rolls === 3 ? "chooseScore" : "holdOrRoll");
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

    const score = scoreDice(categoryId, state.dice);
    player.scores[categoryId] = score;
    player.lastTurn = {
      categoryId,
      score,
      dice: [...state.dice],
    };
    state.turnLog.unshift({ playerId: player.id, categoryId, score });
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
      setMessage("cpuRolls", { playerId: player.id, rolls: state.rolls });
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
      return [createPlayer("you", playerName("you"), "human"), createPlayer("cpu", playerName("cpu"), "cpu")];
    }

    if (mode === "twoPlayer") {
      return [createPlayer("player1", playerName("player1"), "human"), createPlayer("player2", playerName("player2"), "human")];
    }

    return [createPlayer("you", playerName("you"), "human")];
  }

  function restartGame() {
    clearCpuTimer();
    state.players = setupPlayers(state.mode);
    state.currentPlayerIndex = 0;
    state.turnLog = [];
    state.gameOver = false;
    resetTurnFor(0);
    setMessage("playerRoll", { playerId: currentPlayer().id });
    render();
    scheduleCpuStep(520);
  }

  function setMode(mode) {
    if (!["solo", "vsComputer", "twoPlayer"].includes(mode) || state.mode === mode) {
      return;
    }
    state.mode = mode;
    restartGame();
  }

  function renderDie(value, index) {
    const player = currentPlayer();
    const button = document.createElement("button");
    button.type = "button";
    button.className = `die${state.held[index] ? " is-held" : ""}`;
    button.disabled = !canHumanAct() || state.rolls === 0;
    button.dataset.heldLabel = uiText("held");
    button.setAttribute(
      "aria-label",
      formatText(uiText("dieAria"), {
        index: index + 1,
        value,
        held: state.held[index] ? uiText("dieHeldSuffix") : "",
        cpuTurn: player && player.type === "cpu" ? uiText("dieCpuSuffix") : "",
      })
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

  function playerAccentClass(playerId) {
    if (playerId === "you" || playerId === "player1") {
      return "is-player-one";
    }

    if (playerId === "cpu" || playerId === "player2") {
      return "is-player-two";
    }

    return "is-player-neutral";
  }

  function applyTurnTheme(player) {
    const isPlayerTwo = player && (player.id === "cpu" || player.id === "player2");
    document.body.classList.toggle("is-player-one-turn", !isPlayerTwo);
    document.body.classList.toggle("is-player-two-turn", Boolean(isPlayerTwo));
  }

  function renderPlayersBoard() {
    els.playersBoard.replaceChildren(
      ...state.players.map((player, index) => {
        const totals = calculateTotals(player.scores);
        const isActive = index === state.currentPlayerIndex;
        const card = document.createElement("div");
        card.className = `player-card ${playerAccentClass(player.id)}${isActive ? " is-active" : ""}`;

        const title = document.createElement("div");
        title.className = "player-title";

        const name = document.createElement("strong");
        name.textContent = player.name;

        const meta = document.createElement("span");
        meta.className = "player-meta";

        const type = document.createElement("span");
        type.textContent = playerTypeLabel(player.type);
        meta.appendChild(type);

        if (isActive) {
          const turn = document.createElement("span");
          turn.className = "player-turn-pill";
          turn.textContent = uiText("currentTurn");
          meta.appendChild(turn);
        }

        title.append(name, meta);

        const score = document.createElement("div");
        score.className = "player-score";
        score.innerHTML = `<strong>${totals.total}</strong><span>${formatText(uiText("remainingCount"), {
          remaining: totals.remaining,
        })}</span>`;

        const last = document.createElement("p");
        last.className = "player-last";
        last.textContent = player.lastTurn
          ? `${categoryLabel(player.lastTurn.categoryId)} +${player.lastTurn.score}`
          : uiText("noScoreYet");

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
        item.textContent =
          typeof entry === "string" ? entry : `${playerName(entry.playerId)}: ${categoryLabel(entry.categoryId)} +${entry.score}`;
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
    name.innerHTML = `<strong>${categoryLabel(category.id)}</strong><span>${categoryHint(category.id)}</span>`;

    const value = document.createElement("div");
    value.className = "score-value";
    value.textContent = filled ? String(player.scores[category.id]) : String(scorePreview(category.id));

    const button = document.createElement("button");
    button.type = "button";
    button.className = `score-button${filled ? " is-filled" : ""}`;
    button.disabled = filled || state.rolls === 0 || !canHumanAct();
    button.dataset.category = category.id;
    button.textContent = filled ? uiText("setAction") : player.type === "cpu" ? uiText("cpuAction") : uiText("scoreAction");
    button.setAttribute("aria-label", formatText(uiText("scoreAria"), { category: categoryLabel(category.id) }));

    row.append(name, value, button);
    return row;
  }

  function renderScoreTable() {
    els.scoreTable.replaceChildren();

    const upperHeader = document.createElement("div");
    upperHeader.className = "score-row is-section";
    upperHeader.textContent = uiText("upperSection");
    els.scoreTable.appendChild(upperHeader);
    upperCategories.forEach((category) => els.scoreTable.appendChild(renderScoreRow(category)));

    const lowerHeader = document.createElement("div");
    lowerHeader.className = "score-row is-section";
    lowerHeader.textContent = uiText("lowerSection");
    els.scoreTable.appendChild(lowerHeader);
    lowerCategories.forEach((category) => els.scoreTable.appendChild(renderScoreRow(category)));
  }

  function renderModeButtons() {
    els.modeButtons.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.mode === state.mode);
      button.setAttribute("aria-pressed", String(button.dataset.mode === state.mode));
      button.textContent = modeLabel(button.dataset.mode);
    });
  }

  function render() {
    applyStaticText();
    renderLanguageButtons();
    const player = currentPlayer();
    applyTurnTheme(player);
    const totals = calculateTotals(player.scores);
    const leader = leaderboard()[0];
    els.totalLabel.textContent = state.mode === "solo" ? uiText("total") : player.name;
    els.totalScore.textContent = String(totals.total);
    els.secondaryLabel.textContent = state.mode === "solo" ? uiText("best") : uiText("leader");
    els.bestScore.textContent = state.mode === "solo" ? String(state.bestScore) : String(leader.totals.total);
    els.upperScore.textContent = String(totals.upper);
    els.scoreCardSubtitle.textContent = player.name;
    els.rollCount.textContent = `${state.rolls} / 3`;
    els.remainingCount.textContent = String(totals.remaining);
    els.bonusState.textContent = `${totals.bonus} / 50`;
    els.turnMessage.textContent = currentMessage();
    els.rollButton.disabled = !canHumanAct() || state.rolls >= 3;
    els.rollButton.textContent = player.type === "cpu" ? uiText("cpuRolling") : state.rolls === 0 ? uiText("rollDice") : uiText("rollAgain");
    els.restartButton.textContent = uiText("restart");
    els.diceTray.replaceChildren(...state.dice.map((value, index) => renderDie(value, index)));
    renderModeButtons();
    renderPlayersBoard();
    renderScoreTable();
    renderTurnLog();

    els.pwaStatus.hidden = !state.pwaVisible;
    els.pwaStatus.textContent = currentPwaMessage();
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
      language: state.language,
      mode: state.gameOver ? "game_over" : state.mode,
      current_player: {
        id: player.id,
        name: player.name,
        type: player.type,
      },
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
        last_turn: entry.lastTurn
          ? {
              ...entry.lastTurn,
              label: categoryLabel(entry.lastTurn.categoryId),
            }
          : null,
      })),
      available_scores: availableScores,
      totals,
      turn_log: state.turnLog.map((entry) =>
        typeof entry === "string" ? entry : `${playerName(entry.playerId)}: ${categoryLabel(entry.categoryId)} +${entry.score}`
      ),
      message: currentMessage(),
    });
  }

  function handleLanguageSelection(event) {
    const target = event.target instanceof Element ? event.target : null;
    const button = target ? target.closest(".language-button") : null;
    if (!button || !els.languageSwitcher || !els.languageSwitcher.contains(button)) {
      return;
    }

    if (event.type === "touchend") {
      event.preventDefault();
    }

    setLanguage(button.dataset.lang);
  }

  function bindEvents() {
    els.rollButton.addEventListener("click", rollDice);
    els.restartButton.addEventListener("click", restartGame);
    els.modeButtons.forEach((button) => {
      button.addEventListener("click", () => setMode(button.dataset.mode));
    });
    els.languageSwitcher.addEventListener("click", handleLanguageSelection);
    els.languageSwitcher.addEventListener("touchend", handleLanguageSelection, { passive: false });
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

  function setPwaStatus(messageKey, visible = true, args = {}) {
    state.pwaMessageKey = messageKey;
    state.pwaMessageArgs = args;
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
      setPwaStatus("pwaReadyInstall");
    });

    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        if (registration.active) {
          setPwaStatus("offlineReady");
        }
      })
      .catch(() => {
        setPwaStatus("offlineUnavailable", true);
      });

    navigator.serviceWorker.ready.then(() => {
      setPwaStatus("offlineReady");
    });

    window.addEventListener("appinstalled", () => {
      state.installPrompt = null;
      setPwaStatus("installedOffline");
    });
  }

  function init() {
    els.diceTray = document.getElementById("dice-tray");
    els.scoreTable = document.getElementById("score-table");
    els.playersBoard = document.getElementById("players-board");
    els.turnLog = document.getElementById("turn-log");
    els.rollButton = document.getElementById("roll-button");
    els.restartButton = document.getElementById("restart-button");
    els.modeButtons = [...document.querySelectorAll(".mode-button")];
    els.languageSwitcher = document.querySelector(".language-switcher");
    els.languageButtons = [...document.querySelectorAll(".language-button")];
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
    setLanguage,
    get language() {
      return state.language;
    },
    get categories() {
      return categories.map((category) => ({ id: category.id, label: categoryLabel(category.id) }));
    },
  };

  document.addEventListener("DOMContentLoaded", init);
})();
