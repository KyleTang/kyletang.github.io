/**
 * FIFA 2026 世界杯晋级之路竞猜
 */
(function () {
  'use strict';

  let data = null;
  const picks = {}; // matchId -> teamId

  const ROUND_LABELS = {
    r32: '32强',
    r16: '16强',
    qf: '八强',
    sf: '半决赛',
    final: '决赛',
    third: '三四名',
  };

  /** @type {Record<string, string[]>} */
  let FEEDERS = {};

  const ROUND_COLUMNS = [
    { key: 'r32', ids: () => data.roundOf32.map((m) => m.id) },
    { key: 'r16', ids: () => Array.from({ length: 8 }, (_, i) => `r16-${i + 1}`) },
    { key: 'qf', ids: () => Array.from({ length: 4 }, (_, i) => `qf-${i + 1}`) },
    { key: 'sf', ids: () => ['sf-1', 'sf-2'] },
  ];

  function buildBracketMeta() {
    FEEDERS = {};
    for (let i = 0; i < 8; i++) {
      FEEDERS[`r16-${i + 1}`] = [`r32-${i * 2 + 1}`, `r32-${i * 2 + 2}`];
    }
    for (let i = 0; i < 4; i++) {
      FEEDERS[`qf-${i + 1}`] = [`r16-${i * 2 + 1}`, `r16-${i * 2 + 2}`];
    }
    for (let i = 0; i < 2; i++) {
      FEEDERS[`sf-${i + 1}`] = [`qf-${i * 2 + 1}`, `qf-${i * 2 + 2}`];
    }
    FEEDERS.final = ['sf-1', 'sf-2'];
  }

  function allMatchIds() {
    const ids = data.roundOf32.map((m) => m.id);
    for (let i = 1; i <= 8; i++) ids.push(`r16-${i}`);
    for (let i = 1; i <= 4; i++) ids.push(`qf-${i}`);
    for (let i = 1; i <= 2; i++) ids.push(`sf-${i}`);
    ids.push('final');
    ids.push('third');
    return ids;
  }

  function getRound(matchId) {
    if (matchId === 'third') return 'third';
    if (matchId === 'final') return 'final';
    if (matchId.startsWith('r32')) return 'r32';
    if (matchId.startsWith('r16')) return 'r16';
    if (matchId.startsWith('qf')) return 'qf';
    if (matchId.startsWith('sf')) return 'sf';
    return 'final';
  }

  function getDownstreamIds(fromMatchId) {
    const all = allMatchIds();
    const idx = all.indexOf(fromMatchId);
    return idx >= 0 ? all.slice(idx + 1) : [];
  }

  function getMatchZone(matchId) {
    if (matchId === 'final' || matchId === 'third') return 'final';
    if (matchId.startsWith('r32')) {
      return parseInt(matchId.split('-')[1], 10) <= 8 ? 'upper' : 'lower';
    }
    if (matchId.startsWith('r16')) {
      return parseInt(matchId.split('-')[1], 10) <= 4 ? 'upper' : 'lower';
    }
    if (matchId.startsWith('qf')) {
      return parseInt(matchId.split('-')[1], 10) <= 2 ? 'upper' : 'lower';
    }
    if (matchId === 'sf-1') return 'upper';
    if (matchId === 'sf-2') return 'lower';
    return 'upper';
  }

  function getSplitY(wrapperEl) {
    const board = wrapperEl.querySelector('.bracket-board');
    if (!board || !board.dataset.splitY) return 0;
    return parseFloat(board.dataset.splitY, 10) || 0;
  }

  function getMatchLoser(matchId) {
    const parts = getParticipants(matchId);
    const pick = picks[matchId];
    if (!parts[0] || !parts[1] || !pick) return null;
    return parts[0] === pick ? parts[1] : parts[0];
  }

  function getParticipants(matchId) {
    if (matchId === 'third') {
      return [getMatchLoser('sf-1'), getMatchLoser('sf-2')];
    }
    if (matchId.startsWith('r32')) {
      const m = data.roundOf32.find((x) => x.id === matchId);
      return m ? [m.team1, m.team2] : [null, null];
    }
    const feeders = FEEDERS[matchId];
    if (!feeders) return [null, null];
    return feeders.map((fid) => picks[fid] || null);
  }

  function getTeam(teamId) {
    return data.teams[teamId] || { name: teamId, code: 'un' };
  }

  function isUnknownFlag(code) {
    return !code || code === 'un';
  }

  function getFlagSources(code) {
    if (isUnknownFlag(code)) return [];
    return [
      `https://flagcdn.com/w40/${code}.png`,
      `https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${code}.svg`,
      `https://flagcdn.com/${code}.svg`,
    ];
  }

  function flagUrl(code) {
    if (isUnknownFlag(code)) return FIFA_PLACEHOLDER_IMG;
    const sources = getFlagSources(code);
    return sources[0] || FIFA_PLACEHOLDER_IMG;
  }

  /** @type {Map<string, string>} code -> PNG data URL */
  const flagCache = new Map();

  const FIFA_PLACEHOLDER_SVG = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 30" role="img" aria-label="FIFA">',
    '<defs><linearGradient id="fifa-bg" x1="0%" y1="0%" x2="100%" y2="100%">',
    '<stop offset="0%" stop-color="#0057b8"/><stop offset="100%" stop-color="#002855"/>',
    '</linearGradient></defs>',
    '<rect width="40" height="30" fill="url(#fifa-bg)"/>',
    '<ellipse cx="20" cy="11" rx="8" ry="8" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.9"/>',
    '<ellipse cx="20" cy="11" rx="3.5" ry="8" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.9"/>',
    '<line x1="12" y1="11" x2="28" y2="11" stroke="rgba(255,255,255,0.28)" stroke-width="0.9"/>',
    '<text x="20" y="23.5" text-anchor="middle" fill="#ffffff" font-family="Arial,Helvetica,sans-serif" font-size="7.5" font-weight="700" letter-spacing="0.8">FIFA</text>',
    '</svg>',
  ].join('');

  let FIFA_PLACEHOLDER_IMG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(FIFA_PLACEHOLDER_SVG)}`;

  function loadFlagAsPngDataUrl(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.referrerPolicy = 'no-referrer';
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = 44;
          canvas.height = 32;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL('image/png'));
        } catch (err) {
          reject(err);
        }
      };
      img.onerror = () => reject(new Error(`flag load failed: ${url}`));
      img.src = url;
    });
  }

  async function resolveFlagDataUrl(code) {
    if (isUnknownFlag(code)) {
      return flagCache.get('un') || FIFA_PLACEHOLDER_IMG;
    }
    if (flagCache.has(code)) return flagCache.get(code);

    const sources = getFlagSources(code);
    for (const url of sources) {
      try {
        const dataUrl = await loadFlagAsPngDataUrl(url);
        flagCache.set(code, dataUrl);
        return dataUrl;
      } catch (_) { /* try next source */ }
    }
    return '';
  }

  async function preloadAllFlags() {
    const codes = [...new Set(Object.values(data.teams).map((t) => t.code))];
    if (!codes.includes('un')) codes.push('un');
    await Promise.all(codes.map((code) => resolveFlagDataUrl(code)));
  }

  function bindFlagImg(img, code) {
    img.classList.add('team-flag');
    img.dataset.flagCode = code || 'un';
    img.referrerPolicy = 'no-referrer';
    img.removeAttribute('crossorigin');

    if (isUnknownFlag(code)) {
      img.classList.add('team-flag-fifa');
      img.classList.remove('team-flag-placeholder');
      img.src = flagCache.get('un') || FIFA_PLACEHOLDER_IMG;
      return;
    }

    img.classList.remove('team-flag-fifa', 'team-flag-placeholder');

    const cached = flagCache.get(code);
    if (cached) {
      img.src = cached;
      return;
    }

    img.src = flagUrl(code);
    resolveFlagDataUrl(code).then((dataUrl) => {
      if (dataUrl && img.isConnected) img.src = dataUrl;
    });
  }

  async function applyFlagCache(rootEl) {
    const imgs = rootEl.querySelectorAll('img[data-flag-code]');
    await Promise.all(
      [...imgs].map(async (img) => {
        const code = img.dataset.flagCode;
        const dataUrl = await resolveFlagDataUrl(code);
        if (dataUrl) img.src = dataUrl;
      })
    );
  }

  let FOOTBALL_IMG = 'assets/football.png';
  let TROPHY_IMG = '';

  const TROPHY_SVG = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">',
    '<defs>',
    '<linearGradient id="wc-gold" x1="0%" y1="0%" x2="100%" y2="100%">',
    '<stop offset="0%" stop-color="#ffe082"/>',
    '<stop offset="45%" stop-color="#ffc107"/>',
    '<stop offset="100%" stop-color="#ff8f00"/>',
    '</linearGradient>',
    '<linearGradient id="wc-base" x1="0%" y1="0%" x2="0%" y2="100%">',
    '<stop offset="0%" stop-color="#eceff1"/>',
    '<stop offset="100%" stop-color="#90a4ae"/>',
    '</linearGradient>',
    '</defs>',
    '<ellipse cx="32" cy="58" rx="18" ry="4" fill="#000" opacity="0.12"/>',
    '<path d="M18 52h28l-2 6H20z" fill="url(#wc-base)"/>',
    '<rect x="22" y="48" width="20" height="4" rx="1" fill="#cfd8dc"/>',
    '<path d="M32 8c-8 0-14 5-14 12 0 4 2 7 4 10l2 18h16l2-18c2-3 4-6 4-10 0-7-6-12-14-12z" fill="url(#wc-gold)" stroke="#e65100" stroke-width="1"/>',
    '<path d="M24 18c2-3 5-5 8-5s6 2 8 5" fill="none" stroke="#fff8e1" stroke-width="1.5" opacity="0.7"/>',
    '<circle cx="32" cy="14" r="3" fill="#fff8e1" opacity="0.85"/>',
    '<path d="M18 20c-4 2-7 6-8 10M46 20c4 2 7 6 8 10" fill="none" stroke="url(#wc-gold)" stroke-width="3" stroke-linecap="round"/>',
    '</svg>',
  ].join('');

  TROPHY_IMG = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(TROPHY_SVG)}`;

  async function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async function loadAssetAsDataUrl(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return blobToDataUrl(await res.blob());
  }

  async function loadFootballIcon() {
    try {
      FOOTBALL_IMG = await loadAssetAsDataUrl('assets/football.png');
    } catch (_) { /* 回退使用相对路径 */ }
  }

  async function loadTrophyIcon() {
    try {
      TROPHY_IMG = await loadAssetAsDataUrl('assets/world-cup.svg');
    } catch (_) { /* 回退使用内嵌 SVG */ }
  }

  async function loadFifaPlaceholder() {
    try {
      const dataUrl = await loadAssetAsDataUrl('assets/fifa-placeholder.svg');
      FIFA_PLACEHOLDER_IMG = dataUrl;
      flagCache.set('un', dataUrl);
    } catch (_) {
      flagCache.set('un', FIFA_PLACEHOLDER_IMG);
    }
  }

  function appendWinnerBadge(parentEl, kind) {
    const badge = document.createElement('img');
    badge.src = kind === 'trophy' ? TROPHY_IMG : FOOTBALL_IMG;
    badge.alt = '';
    badge.className = kind === 'trophy' ? 'team-badge team-trophy' : 'team-badge';
    parentEl.appendChild(badge);
    return badge;
  }

  function renderWinnerRowHtml(team, namePrefix) {
    const prefix = namePrefix || '';
    return `
      <img class="champion-flag team-flag" data-flag-code="${team.code}" src="${flagUrl(team.code)}" alt="${team.name}">
      <span class="champion-name">${prefix}${team.name}</span>
      <img class="team-badge team-trophy" src="${TROPHY_IMG}" alt="">`;
  }

  function hydrateFlags(root) {
    root.querySelectorAll('img[data-flag-code]').forEach((img) => {
      bindFlagImg(img, img.dataset.flagCode);
    });
  }

  function getResults() {
    const championId = picks.final || null;
    const thirdId = picks.third || null;
    return {
      champion: championId ? getTeam(championId) : null,
      runnerUp: championId ? getTeam(getMatchLoser('final')) : null,
      third: thirdId ? getTeam(thirdId) : null,
      fourth: thirdId ? getTeam(getMatchLoser('third')) : null,
    };
  }

  function renderResultItem(label, team, extraClass, badgeKind) {
    if (!team) {
      return `
        <div class="result-item ${extraClass} result-empty">
          <span class="result-label">${label}</span>
          <span class="result-name">待定</span>
        </div>`;
    }
    const badge =
      badgeKind === 'trophy'
        ? `<img class="team-badge team-trophy" src="${TROPHY_IMG}" alt="">`
        : '';
    return `
      <div class="result-item ${extraClass}">
        <span class="result-label">${label}</span>
        <img class="team-flag" data-flag-code="${team.code}" src="${flagUrl(team.code)}" alt="${team.name}">
        <span class="result-name">${team.name}</span>
        ${badge}
      </div>`;
  }

  function buildResultsHtml() {
    const r = getResults();
    return `
      <div class="results-title">预测赛果</div>
      <div class="results-grid">
        ${renderResultItem('冠军', r.champion, 'result-champion', 'trophy')}
        ${renderResultItem('亚军', r.runnerUp, 'result-runner-up')}
        ${renderResultItem('季军', r.third, 'result-third')}
        ${renderResultItem('殿军', r.fourth, 'result-fourth')}
      </div>`;
  }

  function renderResultsPanel(container) {
    const panel = document.createElement('div');
    panel.className = 'results-panel';
    panel.innerHTML = buildResultsHtml();
    hydrateFlags(panel);
    container.appendChild(panel);
    return panel;
  }

  function renderChampionTeamHtml(team) {
    return `<div class="champion-team">${renderWinnerRowHtml(team)}</div>`;
  }

  function validateDownstream(fromMatchId) {
    let changed = true;
    while (changed) {
      changed = false;
      for (const mid of getDownstreamIds(fromMatchId)) {
        const parts = getParticipants(mid);
        const pick = picks[mid];
        const ready = parts[0] && parts[1];
        if (pick && (!ready || !parts.includes(pick))) {
          delete picks[mid];
          changed = true;
        }
      }
    }
  }

  function setPick(matchId, teamId) {
    const parts = getParticipants(matchId);
    if (!parts.includes(teamId)) return;
    if (picks[matchId] === teamId) return;
    picks[matchId] = teamId;
    validateDownstream(matchId);
    render();
    saveState();
  }

  function clearAll() {
    Object.keys(picks).forEach((k) => delete picks[k]);
    render();
    saveState();
  }

  function saveState() {
    try {
      localStorage.setItem('fifa2026_picks', JSON.stringify(picks));
    } catch (_) { /* ignore */ }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem('fifa2026_picks');
      if (raw) Object.assign(picks, JSON.parse(raw));
    } catch (_) { /* ignore */ }
  }

  function createTeamEl(teamId, matchId, slotIndex) {
    const team = getTeam(teamId);
    const el = document.createElement('div');
    el.className = 'team';
    el.dataset.teamId = teamId;
    el.dataset.matchId = matchId;
    el.dataset.slot = String(slotIndex);

    const img = document.createElement('img');
    img.dataset.flagCode = team.code;
    img.alt = team.name;
    bindFlagImg(img, team.code);

    const name = document.createElement('span');
    name.className = 'team-name';
    name.textContent = team.name;

    el.appendChild(img);
    el.appendChild(name);

    const winner = picks[matchId];

    const parts = getParticipants(matchId);
    const bothReady = parts[0] && parts[1];

    if (bothReady) {
      el.addEventListener('click', () => setPick(matchId, teamId));
      if (winner === teamId) {
        el.classList.add('winner');
        appendWinnerBadge(el, matchId === 'final' ? 'trophy' : 'football');
      } else if (winner) {
        el.classList.add('loser');
      }
    } else {
      el.classList.add('disabled');
    }

    return el;
  }

  function createEmptyTeamEl(text) {
    const el = document.createElement('div');
    el.className = 'team empty disabled';
    el.textContent = text || '待定';
    return el;
  }

  function createMatchEl(matchId, showLabel) {
    const parts = getParticipants(matchId);
    const round = getRound(matchId);
    const wrap = document.createElement('div');
    wrap.className = 'match';
    wrap.dataset.matchId = matchId;
    wrap.classList.add(`zone-${getMatchZone(matchId)}`);
    if (round === 'final') wrap.classList.add('final-match');
    if (round === 'third') wrap.classList.add('third-match');

    if (showLabel) {
      const lbl = document.createElement('div');
      lbl.className = 'match-id-label';
      lbl.textContent = ROUND_LABELS[round] || matchId;
      wrap.appendChild(lbl);
    }

    parts.forEach((tid, i) => {
      if (tid) wrap.appendChild(createTeamEl(tid, matchId, i));
      else wrap.appendChild(createEmptyTeamEl());
    });

    return wrap;
  }

  function createRoundColumn(roundKey, matchIds, showLabels) {
    const col = document.createElement('div');
    col.className = `round-column`;
    const label = document.createElement('div');
    label.className = 'round-label';
    label.textContent = ROUND_LABELS[roundKey];
    col.appendChild(label);

    const round = document.createElement('div');
    round.className = `round round-${roundKey}`;
    matchIds.forEach((id) => round.appendChild(createMatchEl(id, showLabels)));
    col.appendChild(round);
    return col;
  }

  function createZoneLayer(className, text) {
    const el = document.createElement('div');
    el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function createConnectorOverlay(useCanvas) {
    if (useCanvas) {
      const canvas = document.createElement('canvas');
      canvas.className = 'connector-canvas';
      return canvas;
    }
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'connector-svg');
    svg.setAttribute('aria-hidden', 'true');
    return svg;
  }

  function renderBracket(container, useCanvas) {
    container.innerHTML = '';
    container.classList.add('bracket-board');

    container.appendChild(createZoneLayer('zone-bg zone-bg-upper'));
    container.appendChild(createZoneLayer('zone-bg zone-bg-lower'));
    container.appendChild(createZoneLayer('zone-divider'));
    container.appendChild(createZoneLayer('zone-label zone-label-upper', '上半区'));
    container.appendChild(createZoneLayer('zone-label zone-label-lower', '下半区'));

    const overlay = createConnectorOverlay(useCanvas);

    const bracket = document.createElement('div');
    bracket.className = 'bracket';

    ROUND_COLUMNS.forEach(({ key, ids }) => {
      bracket.appendChild(createRoundColumn(key, ids(), false));
    });

    const finalCol = document.createElement('div');
    finalCol.className = 'round-column round-column-finals';
    const finalLabel = document.createElement('div');
    finalLabel.className = 'round-label';
    finalLabel.textContent = '决赛 / 三四名';
    finalCol.appendChild(finalLabel);

    const finalRound = document.createElement('div');
    finalRound.className = 'round round-finals';
    finalRound.appendChild(createMatchEl('final', true));
    finalRound.appendChild(createMatchEl('third', true));
    finalCol.appendChild(finalRound);

    bracket.appendChild(finalCol);
    container.appendChild(bracket);
    container.insertBefore(overlay, bracket);
    return overlay;
  }

  /** 上下半区背景与虚线分割 */
  function layoutZoneBackgrounds(container) {
    const board = container.classList.contains('bracket-board')
      ? container
      : container.querySelector('.bracket-board');
    if (!board) return;

    const r32Matches = board.querySelectorAll('.round-r32 .match');
    if (r32Matches.length < 16) return;

    const upperLast = r32Matches[7];
    const lowerFirst = r32Matches[8];
    const boardRect = board.getBoundingClientRect();
    const splitY =
      (upperLast.getBoundingClientRect().bottom + lowerFirst.getBoundingClientRect().top) / 2 -
      boardRect.top;
    const totalH = board.offsetHeight;

    const upperBg = board.querySelector('.zone-bg-upper');
    const lowerBg = board.querySelector('.zone-bg-lower');
    const divider = board.querySelector('.zone-divider');
    const labelUpper = board.querySelector('.zone-label-upper');
    const labelLower = board.querySelector('.zone-label-lower');
    if (!upperBg) return;

    upperBg.style.height = `${splitY}px`;
    lowerBg.style.top = `${splitY}px`;
    lowerBg.style.height = `${Math.max(0, totalH - splitY)}px`;
    divider.style.top = `${splitY}px`;

    labelUpper.style.top = `${splitY / 2}px`;
    labelLower.style.top = `${splitY + (totalH - splitY) / 2}px`;

    board.dataset.splitY = String(splitY);
  }

  /** 收集所有连线：从 feeder 到 child 的 slot */
  function collectConnections() {
    const conns = [];
    Object.entries(FEEDERS).forEach(([childId, feeders]) => {
      feeders.forEach((fromId, toSlot) => {
        conns.push({ fromId, toId: childId, toSlot });
      });
    });
    return conns;
  }

  function centerMatchBetweenFeeders(matchEl, roundEl, f1, f2) {
    const f1Center = f1.getBoundingClientRect().top + f1.offsetHeight / 2;
    const f2Center = f2.getBoundingClientRect().top + f2.offsetHeight / 2;
    const targetCenter = (f1Center + f2Center) / 2;
    const roundTop = roundEl.getBoundingClientRect().top;
    const top = targetCenter - roundTop - matchEl.offsetHeight / 2;

    matchEl.style.position = 'absolute';
    matchEl.style.top = `${top}px`;
    matchEl.style.left = '0';
    matchEl.style.width = '100%';
  }

  /** 各轮对阵垂直居中于上一场两场 feeder 之间 */
  function alignBracketLayout(container) {
    const bracket = container.querySelector('.bracket');
    if (!bracket) return;

    bracket.querySelectorAll(
      '.round-r16 .match, .round-qf .match, .round-sf .match, .round-finals .match'
    ).forEach((el) => {
      el.style.position = '';
      el.style.top = '';
      el.style.left = '';
      el.style.width = '';
    });
    bracket.querySelectorAll('.round-r16, .round-qf, .round-sf, .round-finals').forEach((el) => {
      el.style.height = '';
    });

    const rounds = [...bracket.querySelectorAll('.round-column .round')].filter(
      (r) => !r.classList.contains('round-finals')
    );
    if (rounds.length < 2) return;

    const baseHeight = rounds[0].offsetHeight;
    let prevMatches = [...rounds[0].querySelectorAll('.match')];

    for (let r = 1; r < rounds.length; r++) {
      const roundEl = rounds[r];
      const matches = [...roundEl.querySelectorAll('.match')];
      roundEl.style.height = `${baseHeight}px`;

      if (matches.length === 1 && prevMatches.length >= 2) {
        centerMatchBetweenFeeders(matches[0], roundEl, prevMatches[0], prevMatches[1]);
      } else {
        matches.forEach((matchEl, j) => {
          const f1 = prevMatches[j * 2];
          const f2 = prevMatches[j * 2 + 1];
          if (f1 && f2) centerMatchBetweenFeeders(matchEl, roundEl, f1, f2);
        });
      }

      prevMatches = matches;
    }

    alignFinalsColumn(bracket, baseHeight);
    layoutZoneBackgrounds(container);
  }

  /** 决赛居中于半决赛之间，三四名决赛位于决赛下方 */
  function alignFinalsColumn(bracket, baseHeight) {
    const finalsRound = bracket.querySelector('.round-finals');
    const sf1 = bracket.querySelector('[data-match-id="sf-1"]');
    const sf2 = bracket.querySelector('[data-match-id="sf-2"]');
    const finalMatch = bracket.querySelector('[data-match-id="final"]');
    const thirdMatch = bracket.querySelector('[data-match-id="third"]');
    if (!finalsRound || !sf1 || !sf2 || !finalMatch) return;

    const thirdGap = 14;
    const thirdH = thirdMatch ? thirdMatch.offsetHeight : 0;
    finalsRound.style.position = 'relative';
    finalsRound.style.height = `${baseHeight + thirdGap + thirdH}px`;

    centerMatchBetweenFeeders(finalMatch, finalsRound, sf1, sf2);

    if (thirdMatch) {
      const finalBottom =
        finalMatch.offsetTop + finalMatch.offsetHeight;
      thirdMatch.style.position = 'absolute';
      thirdMatch.style.top = `${finalBottom + thirdGap}px`;
      thirdMatch.style.left = '0';
      thirdMatch.style.width = '100%';
    }
  }

  function scheduleLayoutAndConnectors(container, svgEl, wrapperEl) {
    requestAnimationFrame(() => {
      alignBracketLayout(container);
      requestAnimationFrame(() => {
        drawConnectors(svgEl, wrapperEl);
      });
    });
  }

  function waitForLayoutAndConnectors(container, overlayEl, wrapperEl, useCanvas) {
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        alignBracketLayout(container);
        requestAnimationFrame(() => {
          if (useCanvas) {
            drawConnectorsToCanvas(overlayEl, wrapperEl, true);
          } else {
            drawConnectors(overlayEl, wrapperEl);
          }
          requestAnimationFrame(resolve);
        });
      });
    });
  }

  /** @returns {{ x1:number,y1:number,midX:number,y2:number,x2:number,active:boolean }[]} */
  function computeConnections(wrapperEl) {
    const wrapperRect = wrapperEl.getBoundingClientRect();
    const paths = [];

    collectConnections().forEach(({ fromId, toId, toSlot }) => {
      const fromMatch = wrapperEl.querySelector(`[data-match-id="${fromId}"]`);
      const toMatch = wrapperEl.querySelector(`[data-match-id="${toId}"]`);
      if (!fromMatch || !toMatch) return;

      const fromTeams = fromMatch.querySelectorAll('.team:not(.empty)');
      if (!fromTeams.length) return;

      const fromWinner = picks[fromId];
      let fromTeamEl = null;
      fromTeams.forEach((el) => {
        if (el.dataset.teamId === fromWinner) fromTeamEl = el;
      });

      const toTeams = toMatch.querySelectorAll('.team');
      const toTeamEl = toTeams[toSlot];
      if (!toTeamEl) return;

      const fromRect = (fromTeamEl || fromTeams[0]).getBoundingClientRect();
      const toRect = toTeamEl.getBoundingClientRect();

      const y1 = fromRect.top + fromRect.height / 2 - wrapperRect.top;
      const y2 = toRect.top + toRect.height / 2 - wrapperRect.top;
      const x1 = fromRect.right - wrapperRect.left;
      const x2 = toRect.left - wrapperRect.left;
      const midX = (x1 + x2) / 2;

      const winnerAdvances =
        fromWinner &&
        getParticipants(toId)[toSlot] === fromWinner;

      paths.push({ x1, y1, midX, y2, x2, active: !!winnerAdvances });
    });

    return paths;
  }

  function strokeForPath(active) {
    return active ? '#00c853' : '#66bb6a';
  }

  function drawConnectors(svgEl, wrapperEl) {
    svgEl.innerHTML = '';
    const paths = computeConnections(wrapperEl);

    paths.forEach(({ x1, y1, midX, y2, x2, active }) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', strokeForPath(active));
      path.setAttribute('stroke-width', active ? '3' : '2');
      if (active) path.classList.add('active');
      svgEl.appendChild(path);
    });

    svgEl.setAttribute('width', wrapperEl.offsetWidth);
    svgEl.setAttribute('height', wrapperEl.offsetHeight);
  }

  /** Canvas 绘制供 html2canvas 导出（SVG 在导出时常常无法渲染） */
  function drawConnectorsToCanvas(canvasEl, wrapperEl, forExport) {
    const w = wrapperEl.offsetWidth;
    const h = wrapperEl.offsetHeight;
    const dpr = forExport ? 2 : 1;

    canvasEl.width = w * dpr;
    canvasEl.height = h * dpr;
    canvasEl.style.width = `${w}px`;
    canvasEl.style.height = `${h}px`;

    const ctx = canvasEl.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    computeConnections(wrapperEl).forEach(({ x1, y1, midX, y2, x2, active }) => {
      ctx.strokeStyle = strokeForPath(active);
      ctx.lineWidth = active ? 3 : 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(midX, y1);
      ctx.lineTo(midX, y2);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  }

  function render() {
    const board = document.getElementById('bracket');
    const overlay = renderBracket(board, false);
    scheduleLayoutAndConnectors(board, overlay, board);

    const resultsHost = document.getElementById('results-host');
    if (resultsHost) {
      resultsHost.innerHTML = '';
      renderResultsPanel(resultsHost);
    }
  }

  function formatDate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}年${m}月${day}日`;
  }

  let qrInstance = null;

  function buildExportPreview(nickname) {
    document.getElementById('export-title').textContent = data.tournament;
    document.getElementById('export-subtitle').textContent = data.subtitle || '晋级之路竞猜';
    document.getElementById('export-nickname').textContent = nickname;
    document.getElementById('export-date').textContent = formatDate(new Date());

    const exportBracket = document.getElementById('export-bracket');
    exportBracket.innerHTML = '';
    const miniWrapper = document.createElement('div');
    miniWrapper.className = 'bracket-wrapper export-bracket-inner';
    const miniBracket = document.createElement('div');
    miniBracket.id = 'export-bracket-inner';
    miniWrapper.appendChild(miniBracket);
    exportBracket.appendChild(miniWrapper);

    const miniCanvas = renderBracket(miniBracket, true);

    const championBox = document.getElementById('export-results');
    championBox.innerHTML = `<div class="results-panel">${buildResultsHtml()}</div>`;
    hydrateFlags(championBox);

    const qrContainer = document.getElementById('qrcode');
    qrContainer.innerHTML = '';
    qrInstance = new QRCode(qrContainer, {
      text: window.location.href,
      width: 100,
      height: 100,
      colorDark: '#0a1628',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M,
    });

    return { miniWrapper, miniCanvas, miniBracket };
  }

  function waitForImage(img) {
    return new Promise((resolve) => {
      if (img.complete && (img.naturalWidth > 0 || img.src.startsWith('data:'))) {
        resolve();
        return;
      }
      const done = () => resolve();
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
      setTimeout(done, 3000);
    });
  }

  async function prepareExportImages(rootEl) {
    await applyFlagCache(rootEl);
    const badges = rootEl.querySelectorAll('img.team-badge, img.team-trophy');
    await Promise.all([...badges].map(waitForImage));
    await new Promise((r) => setTimeout(r, 100));
  }

  function isWeChatBrowser() {
    return /MicroMessenger/i.test(navigator.userAgent);
  }

  function showWeChatSavePreview(dataUrl) {
    const modal = document.getElementById('wechat-save-modal');
    const img = document.getElementById('wechat-save-image');
    if (!modal || !img) return;
    img.src = dataUrl;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
  }

  function hideWeChatSavePreview() {
    const modal = document.getElementById('wechat-save-modal');
    const img = document.getElementById('wechat-save-image');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
    if (img) img.removeAttribute('src');
  }

  async function exportImage(nickname) {
    const exportRoot = document.getElementById('export-root');
    const { miniWrapper, miniCanvas, miniBracket } = buildExportPreview(nickname);

    exportRoot.classList.remove('hidden');
    exportRoot.classList.add('exporting');

    await waitForLayoutAndConnectors(miniBracket, miniCanvas, miniBracket, true);
    await prepareExportImages(exportRoot);

    try {
      const card = exportRoot.querySelector('.export-card');
      const maxSide = Math.max(card.offsetWidth, card.offsetHeight);
      const scale = maxSide > 4000 ? 1 : 2;

      const canvas = await html2canvas(card, {
        scale,
        useCORS: false,
        allowTaint: false,
        backgroundColor: '#ffffff',
        logging: false,
        imageTimeout: 15000,
      });

      const dataUrl = canvas.toDataURL('image/png');

      if (isWeChatBrowser()) {
        showWeChatSavePreview(dataUrl);
      } else {
        const link = document.createElement('a');
        const safeName = nickname.replace(/[^\w\u4e00-\u9fa5-]/g, '') || '竞猜';
        link.download = `FIFA2026_${safeName}_${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
      }
    } catch (err) {
      console.error('export failed', err);
      alert('导出图片失败，请刷新页面后重试。');
    } finally {
      exportRoot.classList.add('hidden');
      exportRoot.classList.remove('exporting');
    }
  }

  function bindEvents() {
    document.getElementById('btn-reset').addEventListener('click', () => {
      if (confirm('确定要重置全部竞猜吗？')) clearAll();
    });

    const modal = document.getElementById('share-modal');
    document.getElementById('btn-share').addEventListener('click', () => {
      modal.classList.remove('hidden');
      document.getElementById('nickname-input').focus();
    });

    document.getElementById('btn-cancel-share').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    document.getElementById('btn-export').addEventListener('click', async () => {
      const nickname = document.getElementById('nickname-input').value.trim();
      if (!nickname) {
        alert('请输入竞猜人昵称');
        return;
      }
      modal.classList.add('hidden');
      await exportImage(nickname);
    });

    const wechatSaveModal = document.getElementById('wechat-save-modal');
    document.getElementById('btn-close-wechat-save').addEventListener('click', hideWeChatSavePreview);
    wechatSaveModal.querySelector('.modal-backdrop').addEventListener('click', hideWeChatSavePreview);

    if (isWeChatBrowser()) {
      document.getElementById('btn-export').textContent = '生成图片';
    }

    window.addEventListener('resize', () => {
      const board = document.getElementById('bracket');
      const overlay = board && board.querySelector('.connector-svg');
      if (board && overlay) {
        alignBracketLayout(board);
        layoutZoneBackgrounds(board);
        drawConnectors(overlay, board);
      }
    });
  }

  async function init() {
    try {
      const res = await fetch('data.json');
      data = await res.json();
    } catch (e) {
      document.getElementById('bracket').innerHTML =
        '<p style="color:#f44;padding:24px">无法加载 data.json，请通过本地服务器访问此页面。</p>';
      return;
    }

    buildBracketMeta();
    document.getElementById('tournament-title').textContent = data.tournament;
    document.getElementById('tournament-subtitle').textContent =
      data.subtitle || '晋级之路竞猜';

    loadState();
    validateDownstream('r32-1');
    await Promise.all([loadFootballIcon(), loadTrophyIcon(), loadFifaPlaceholder()]);
    await preloadAllFlags();
    bindEvents();
    render();
  }

  init();
})();
