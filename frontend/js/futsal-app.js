import './public-i18n.js?v=20260809-public-i18n';
import { API_BASE as apiBase } from './api-config.js';
import {
  apiBracketView,
  bracketWinnerView,
  scheduleView,
  shell,
  standingView,
} from './sports.js?v=20260808-live-only';

const host = document.querySelector('#sport-view');
let groups = [];
let liveBracket = null;
let topScorers = [];
let standingSource = 'empty';
let bracketSource = 'empty';
let scorerSource = 'empty';

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]));

const emptyState = (title, message) => `
  <div class="public-empty-state">
    <strong>${escapeHtml(title)}</strong>
    <span>${escapeHtml(message)}</span>
  </div>`;

function scorers() {
  const content = topScorers.length
    ? topScorers.map((player, index) => `
        <article><b>${String(index + 1).padStart(2, '0')}</b><strong>${escapeHtml(player.name)}</strong><span>${player.goals} GOALS${player.team ? ` &bull; ${escapeHtml(player.team)}` : ''}</span></article>`).join('')
    : emptyState('TOP SCORER BELUM TERSEDIA', 'Daftar pencetak gol akan tampil setelah diisi oleh admin.');
  return `<aside class="top-scorers" data-source="${scorerSource}"><header><span>PLAYER RANKING</span><h2>TOP SCORER</h2></header><div>${content}</div></aside>`;
}

function render(id) {
  if (id === 'group-standing') {
    host.dataset.source = standingSource;
    host.innerHTML = standingView(groups);
    return;
  }
  if (id === 'schedule') {
    host.dataset.source = 'empty';
    host.innerHTML = scheduleView([]);
    return;
  }
  if (id === 'winner') {
    host.dataset.source = bracketSource;
    host.innerHTML = liveBracket
      ? bracketWinnerView('FUTSAL WINNERS', liveBracket)
      : emptyState('HASIL BELUM TERSEDIA', 'Pemenang akan tampil setelah bracket disimpan dan pertandingan selesai.');
    return;
  }
  host.dataset.source = bracketSource;
  const bracket = liveBracket
    ? apiBracketView('TOURNAMENT BRACKET', liveBracket)
    : emptyState('BRACKET BELUM TERSEDIA', 'Bracket akan tampil setelah dibuat oleh admin.');
  host.innerHTML = `${bracket}${scorers()}`;
}

shell('Futsal', [
  { id: 'group-standing', label: 'Group Standing' },
  { id: 'bracket', label: 'Bracket' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'winner', label: 'Winner Futsal' },
], render);

if (apiBase) {
  Promise.allSettled([
    fetch(`${apiBase}/tournaments/futsal-bp-2026/standings`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/futsal-bp-2026/bracket`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/futsal-bp-2026/top-scorers`).then(response => response.ok ? response.json() : Promise.reject()),
  ]).then(([standingResult, bracketResult, scorerResult]) => {
    const standingData = standingResult.status === 'fulfilled' ? standingResult.value.data : null;
    if (standingData?.length) {
      groups = standingData.map(group => group.rows.map(row => [row.name, row.points]));
      standingSource = 'api';
    }
    if (bracketResult.status === 'fulfilled' && bracketResult.value.data) {
      liveBracket = bracketResult.value.data;
      bracketSource = 'api';
    }
    if (scorerResult.status === 'fulfilled') {
      topScorers = scorerResult.value.data || [];
      scorerSource = topScorers.length ? 'api' : 'empty';
    }
    render(location.hash.slice(1) || 'group-standing');
  });
}
