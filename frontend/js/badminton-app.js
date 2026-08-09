import './public-i18n.js?v=20260809-clean-empty-copy';
import { API_BASE as apiBase } from './api-config.js';
import { apiBracketView, scheduleView, shell } from './sports.js?v=20260809-clean-empty-copy';

const host = document.querySelector('#sport-view');

const emptyBracket = `
  <div class="public-empty-state">
    <strong>BRACKET BELUM TERSEDIA</strong>
  </div>`;

async function loadApiData() {
  try {
    const [bracketResponse, matchesResponse] = await Promise.all([
      fetch(`${apiBase}/tournaments/badminton-bp-2026/bracket`, { signal: AbortSignal.timeout(5000) }),
      fetch(`${apiBase}/tournaments/badminton-bp-2026/matches?scheduledOnly=true`, { signal: AbortSignal.timeout(5000) }),
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
    const time = new Intl.DateTimeFormat('id-ID', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta',
    }).format(new Date(match.scheduledAt)).replace('.', ':');
    return [
      `${time} WIB`,
      match.homeParticipant?.name || 'MENUNGGU HASIL',
      match.awayParticipant?.name || 'MENUNGGU HASIL',
      match.roundName,
    ];
  });
}

const apiData = await loadApiData();
shell('Badminton', [
  { id: 'bracket', label: 'Bracket' },
  { id: 'schedule', label: 'Schedule' },
], id => {
  host.dataset.source = id === 'schedule'
    ? (apiData.matches.length ? 'api' : 'empty')
    : (apiData.bracket ? 'api' : 'empty');
  host.innerHTML = id === 'schedule'
    ? scheduleView(apiData.matches.length ? apiScheduleRows(apiData.matches) : [])
    : (apiBracketView('CHAMPIONSHIP BRACKET', apiData.bracket) || emptyBracket);
});
