import './public-i18n.js?v=20260809-public-i18n';
import { API_BASE as apiBase } from './api-config.js';
import {
  apiBracketView,
  bracketWinnerView,
  shell,
  standingView,
} from './sports.js?v=20260808-live-only';

const host = document.querySelector('#sport-view');
let groups = [];
let liveBracket = null;
let standingSource = 'empty';
let bracketSource = 'empty';

const emptyState = (title, message) => `
  <div class="public-empty-state">
    <strong>${title}</strong>
    <span>${message}</span>
  </div>`;

function render(id) {
  if (id === 'group-standing') {
    host.dataset.source = standingSource;
    host.innerHTML = standingView(groups);
    return;
  }
  host.dataset.source = bracketSource;
  if (id === 'winner') {
    host.innerHTML = liveBracket
      ? bracketWinnerView('CHESS WINNERS', liveBracket)
      : emptyState('HASIL BELUM TERSEDIA', 'Pemenang Chess akan tampil setelah bracket disimpan dan pertandingan selesai.');
    return;
  }
  host.innerHTML = liveBracket
    ? apiBracketView('CHESS CHAMPIONSHIP BRACKET', liveBracket)
    : emptyState('BRACKET BELUM TERSEDIA', 'Bracket Chess akan tampil setelah dibuat dari Group Standing.');
}

shell('Chess', [
  { id: 'group-standing', label: 'Group Standing' },
  { id: 'bracket', label: 'Bracket' },
  { id: 'winner', label: 'Winner Chess' },
], render);

if (apiBase) {
  Promise.allSettled([
    fetch(`${apiBase}/tournaments/chess-bp-2026/standings`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/chess-bp-2026/bracket`).then(response => response.ok ? response.json() : Promise.reject()),
  ]).then(([standingResult, bracketResult]) => {
    const standingData = standingResult.status === 'fulfilled' ? standingResult.value.data : null;
    if (standingData?.length) {
      groups = standingData.map(group => group.rows.map(row => [row.name, row.points]));
      standingSource = 'api';
    }
    if (bracketResult.status === 'fulfilled' && bracketResult.value.data) {
      liveBracket = bracketResult.value.data;
      bracketSource = 'api';
    }
    render(location.hash.slice(1) || 'group-standing');
  });
}
