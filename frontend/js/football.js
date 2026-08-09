import './public-i18n.js?v=20260809-clean-empty-copy';
import { API_BASE } from './api-config.js';
import { apiBracketView, bracketView, scheduleView, shell } from './sports.js?v=20260809-clean-empty-copy';

const host = document.querySelector('#sport-view');
const localTeams = [
  'FINAL INSP', 'BANBURY', 'OFFICE', 'EXT–BEAD',
  'TIRE CURING', 'BIAS BUILDING', 'CURING', 'BE MANTAP',
  'CALENDER', 'ALL ENGINEERING', 'PRODUCTION', 'QUALITY ASSURANCE',
  'WAREHOUSE', 'MAINTENANCE', 'UTILITY', 'ENGINEERING',
].map((name, index) => [name, [2, 1, 3, 0][index % 4]]);
const localSchedule = [
  ['18:00', 'FINAL INSP', 'BANBURY', 'QF'],
  ['18:45', 'OFFICE', 'EXT–BEAD', 'QF'],
  ['18:00', 'BANBURY', 'EXT–BEAD', 'SF'],
  ['18:45', 'TIRE CURING', 'BIAS BUILDING', 'SF'],
];

function apiBaseUrl() {
  return API_BASE;
}

async function loadApiData() {
  const apiBase = apiBaseUrl();
  if (!apiBase) return { bracket: null, matches: [] };

  try {
    const [bracketResponse, matchesResponse] = await Promise.all([
      fetch(`${apiBase}/tournaments/football-bp-2026/bracket`, { signal: AbortSignal.timeout(1500) }),
      fetch(`${apiBase}/tournaments/football-bp-2026/matches?scheduledOnly=true`, { signal: AbortSignal.timeout(1500) }),
    ]);
    if (!bracketResponse.ok) return { bracket: null, matches: [] };
    const bracketPayload = await bracketResponse.json();
    const matchesPayload = matchesResponse.ok ? await matchesResponse.json() : null;
    return {
      bracket: bracketPayload.success ? bracketPayload.data : null,
      matches: matchesPayload?.success ? matchesPayload.data : [],
    };
  } catch {
    return { bracket: null, matches: [] };
  }
}

function apiScheduleRows(matches) {
  return matches.map(match => {
    const date = new Intl.DateTimeFormat('id-ID', {
      day: '2-digit', month: 'short', timeZone: 'Asia/Jakarta',
    }).format(new Date(match.scheduledAt)).toUpperCase();
    const time = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta',
    }).format(new Date(match.scheduledAt)).replace('.', ':');
    return [
      `${date} • ${time} WIB`,
      match.homeParticipant?.name || 'MENUNGGU HASIL',
      match.awayParticipant?.name || 'MENUNGGU HASIL',
      match.venue ? `${match.roundName} • ${match.venue}` : match.roundName,
    ];
  });
}

const apiData = await loadApiData();

shell('Football', [
  { id: 'bracket', label: 'Bracket' },
  { id: 'schedule', label: 'Schedule' },
], id => {
  if (id === 'schedule') {
    host.innerHTML = scheduleView(apiData.matches.length ? apiScheduleRows(apiData.matches) : []);
    host.dataset.source = apiData.matches.length ? 'api' : 'empty';
    return;
  }

  host.innerHTML = apiBracketView('CHAMPIONSHIP BRACKET', apiData.bracket)
    || bracketView('CHAMPIONSHIP BRACKET', localTeams, 'BANBURY');
  host.dataset.source = apiData.bracket ? 'api' : 'fallback';
});
