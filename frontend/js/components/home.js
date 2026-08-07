import { dates, gallery, greetings, sports, supporters } from '../data/home-data.js?v=20260807-support-arrows';

const greetingCard = item => `<article class="greeting-card"><div class="portrait"><img src="assets/images/portrait-head.svg" alt=""><i></i><span>${item.initials}</span><b>BP</b></div><h3>${item.name}</h3><strong>${item.role}</strong><blockquote>“<p>${item.message}</p></blockquote><small>BRIDGESTONE CUP BP 2026</small></article>`;
const scheduleCard = sport => sport.name === 'FISHING' ? `<a class="schedule-card fishing" href="#sports"><header><span>${sport.code}</span><h3>${sport.name}</h3></header><div class="fishing-panel"><time><b>13</b><small>DESEMBER</small></time><label>LOKASI</label><p>Empang Ikan Mas Bungur</p><label>WAKTU</label><strong>07.00 WIB</strong></div><div class="final-event">FINAL EVENT<br>Timbang hasil tangkapan</div></a>` : `<a class="schedule-card" href="#sports"><header><span>${sport.code}</span><h3>${sport.name}</h3></header>${dates.map((date,i) => `<div class="schedule-row${i===0?' current':''}"><time datetime="2026-12-${String(date).padStart(2,'0')}"><b>${date}</b><small>DES</small></time><p>Cafetaria<small>${i===4?'16.45':'16.30'} WIB</small></p></div>`).join('')}</a>`;
const sportLinks = {
  BADMINTON: 'pages/badminton.html',
  FUTSAL: 'pages/futsal.html',
  CHESS: 'pages/chess.html',
  'TABLE TENNIS': 'pages/table-tennis.html',
  FOOTBALL: 'pages/football.html',
  FISHING: 'pages/fishing.html'
};
const sportCard = (sport, index) => `<a class="sport-card${index===0?' active':''}" href="${sportLinks[sport.name] || '#sports'}" aria-label="Buka ${sport.name}"><img src="assets/images/${index===0?'card-ornament-active':'card-ornament'}.svg" alt=""><small>0${index + 1}</small><i></i><h3>${sport.name}</h3><b>${sport.count}</b></a>`;

export function renderHome() {
  document.querySelector('#greeting-list').innerHTML = greetings.map(greetingCard).join('');
  document.querySelector('#schedule-list').innerHTML = sports.map(scheduleCard).join('');
  document.querySelector('#sports-list').innerHTML = sports.map(sportCard).join('');
  const galleryLinks = ['pages/gallery.html', 'pages/gallery-sport.html?sport=futsal', 'pages/gallery-sport.html?sport=chess'];
  document.querySelector('#gallery-list').innerHTML = gallery.map((item, i) => `<a href="${galleryLinks[i]}"><article><small>0${i + 1}</small><h3>${item}</h3></article></a>`).join('');
  document.querySelector('#support-list').innerHTML = supporters.map(item => `<article><b>${item.rank}</b><img src="${item.image}" alt=""><h4>${item.team}</h4><p>${item.count} Support Cards</p></article>`).join('');
}
