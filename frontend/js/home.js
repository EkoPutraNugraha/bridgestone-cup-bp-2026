import './public-i18n.js?v=20260809-admin-footer';
import { API_BASE as apiBase } from './api-config.js';
import { renderGalleryPreview, renderHome, renderGreetings, renderSchedules, renderSports, renderSupporters } from './components/home.js?v=20260809-mobile-cleanup';

renderHome();

const scheduleTournaments = {
  FUTSAL:'futsal-bp-2026',
  CHESS:'chess-bp-2026',
  BADMINTON:'badminton-bp-2026',
  'TABLE TENNIS':'table-tennis-bp-2026',
  FOOTBALL:'football-bp-2026',
};

if (apiBase) {
  Promise.all(Object.entries(scheduleTournaments).map(async ([sport, tournamentId]) => {
    try {
      const response = await fetch(`${apiBase}/tournaments/${tournamentId}/matches?scheduledOnly=true`);
      if (!response.ok) return [sport, []];
      const payload = await response.json();
      return [sport, payload.success ? payload.data : []];
    } catch {
      return [sport, []];
    }
  })).then(entries => renderSchedules(Object.fromEntries(entries)));

  fetch(`${apiBase}/greetings`)
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(payload => {
      if (payload.data?.length) { latestGreetings = payload.data; renderGreetings(latestGreetings, 'api'); }
    })
    .catch(() => {});

  fetch(`${apiBase}/gallery`)
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(payload => { latestGallery = payload.data || []; renderGalleryPreview(latestGallery, latestGallery.length ? 'api' : 'empty'); })
    .catch(() => {});

  Promise.allSettled([
    fetch(`${apiBase}/tournaments/futsal-bp-2026/standings`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/chess-bp-2026/standings`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/badminton-bp-2026/bracket`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/table-tennis-bp-2026/standings`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/football-bp-2026/bracket`).then(response => response.ok ? response.json() : Promise.reject()),
    fetch(`${apiBase}/tournaments/fishing-bp-2026/pairs`).then(response => response.ok ? response.json() : Promise.reject()),
  ]).then(([futsal, chess, badminton, tableTennis, football, fishing]) => {
    const groupTotal = result => result.status === 'fulfilled'
      ? (result.value.data || []).reduce((total, group) => total + (group.rows?.length || 0), 0)
      : 0;
    const bracketTotal = result => result.status === 'fulfilled' ? Number(result.value.data?.participantCount || 0) : 0;
    const fishingTotal = fishing.status === 'fulfilled' ? Number(fishing.value.data?.length || 0) : 0;
    const counts = {};
    if (groupTotal(futsal)) counts.FUTSAL = `${groupTotal(futsal)} TEAMS`;
    if (groupTotal(chess)) counts.CHESS = `${groupTotal(chess)} PLAYERS`;
    if (bracketTotal(badminton)) counts.BADMINTON = `${bracketTotal(badminton)} PAIRS`;
    if (groupTotal(tableTennis)) counts['TABLE TENNIS'] = `${groupTotal(tableTennis)} PLAYERS`;
    if (bracketTotal(football)) counts.FOOTBALL = `${bracketTotal(football)} TEAMS`;
    if (fishingTotal) counts.FISHING = `${fishingTotal} PAIRS`;
    renderSports(counts);
  });
}

let latestAnnouncement = null;
const announcementBanner = document.querySelector('#announcement-banner');
const announcementTitle = document.querySelector('#announcement-title');
const announcementBody = document.querySelector('#announcement-body');
const announcementClose = document.querySelector('#announcement-close');
const dismissalKey = announcement => `bridgestone_announcement_dismissed_${announcement.id}`;
const renderAnnouncement = () => {
  if (!latestAnnouncement) return;
  const english = document.documentElement.lang === 'en';
  announcementTitle.textContent = english ? (latestAnnouncement.titleEn || latestAnnouncement.titleId) : latestAnnouncement.titleId;
  announcementBody.textContent = english ? (latestAnnouncement.bodyEn || latestAnnouncement.bodyId) : latestAnnouncement.bodyId;
  announcementBanner.hidden = sessionStorage.getItem(dismissalKey(latestAnnouncement)) === 'true';
  announcementBanner.dataset.source = 'api';
};
announcementClose.addEventListener('click', () => {
  if (latestAnnouncement) sessionStorage.setItem(dismissalKey(latestAnnouncement), 'true');
  announcementBanner.hidden = true;
});
if (apiBase) {
  fetch(`${apiBase}/announcements`)
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(payload => {
      if (payload.data?.length) {
        latestAnnouncement = payload.data[0];
        renderAnnouncement();
      }
    })
    .catch(() => {});
}

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('#main-nav a').forEach(link => link.addEventListener('click', () => {
  header.classList.remove('nav-open');
  toggle.setAttribute('aria-expanded', 'false');
}));
const sections = [...document.querySelectorAll('main > section')];
const links = [...document.querySelectorAll('#main-nav a')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
}), { rootMargin:'-35% 0px -55%' });
sections.forEach(section => observer.observe(section));
const sportsList = document.querySelector('#sports-list');
const activeSportName = document.querySelector('.arena-active-name');
const arenaHint = document.querySelector('.arena-hint');
const clearActiveSport = () => {
  sportsList.querySelectorAll('.sport-card').forEach(item => {
    item.classList.remove('active');
    item.removeAttribute('aria-current');
    const ornament = item.querySelector('img');
    if (ornament) ornament.src = 'assets/images/card-ornament.svg';
  });
  activeSportName.textContent = '—';
  arenaHint.classList.remove('has-active');
};
const activateSportCard = card => {
  if (!card || card.classList.contains('active')) return;
  sportsList.querySelectorAll('.sport-card').forEach(item => {
    const active = item === card;
    item.classList.toggle('active', active);
    item.setAttribute('aria-current', active ? 'true' : 'false');
    const ornament = item.querySelector('img');
    if (ornament) ornament.src = `assets/images/${active ? 'card-ornament-active' : 'card-ornament'}.svg`;
  });
  activeSportName.textContent = card.querySelector('h3')?.textContent.trim() || '';
  arenaHint.classList.add('has-active');
};
sportsList.addEventListener('pointerover', event => activateSportCard(event.target.closest('.sport-card')));
sportsList.addEventListener('pointerleave', () => {
  if (!sportsList.contains(document.activeElement)) clearActiveSport();
});
sportsList.addEventListener('focusin', event => activateSportCard(event.target.closest('.sport-card')));
sportsList.addEventListener('focusout', event => {
  if (!sportsList.contains(event.relatedTarget)) clearActiveSport();
});
let latestGreetings = [];
let latestGallery = [];
window.addEventListener('publiclanguagechange', () => {
  renderAnnouncement();
  if (latestGreetings.length) renderGreetings(latestGreetings, 'api');
  if (latestGallery.length) renderGalleryPreview(latestGallery, 'api');
  renderSupport(activeSupport);
});

let activeSupportSlides = [];
let activeSupport = 0;
let carouselDots = [...document.querySelectorAll('.carousel-dot')];
const supportQuote = document.querySelector('.support-feature blockquote>p');
const supportAuthor = document.querySelector('.support-feature cite');
const supportMedia = document.querySelector('.support-media');
const supportControls = document.querySelector('.carousel-controls');
const supportCard = document.querySelector('.support-feature blockquote');

const renderSupport = index => {
  if (!activeSupportSlides.length) {
    supportQuote.textContent = 'Dukungan akan tampil setelah dipublikasikan oleh admin.';
    supportAuthor.textContent = '— BRIDGESTONE CUP BP 2026';
    supportMedia.dataset.label = 'SUPPORT';
    supportMedia.style.backgroundImage = '';
    supportMedia.classList.remove('live');
    supportControls.innerHTML = '';
    supportCard.dataset.source = 'empty';
    return;
  }
  activeSupport = (index + activeSupportSlides.length) % activeSupportSlides.length;
  const slide = activeSupportSlides[activeSupport];
  supportQuote.textContent = document.documentElement.lang === 'en' ? (slide.messageEn || slide.message || slide.messageId) : (slide.messageId || slide.message);
  supportAuthor.textContent = `— ${slide.author}`;
  supportMedia.dataset.label = slide.label || 'SUPPORT';
  supportMedia.style.backgroundImage = slide.photoUrl
    ? `linear-gradient(rgba(3,3,3,.12),rgba(3,3,3,.32)),url("${slide.photoUrl}")`
    : '';
  supportMedia.classList.toggle('live', Boolean(slide.photoUrl));
  carouselDots.forEach((dot, dotIndex) => {
    const active = dotIndex === activeSupport;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });
};
const bindDots = () => carouselDots.forEach((dot, index) => dot.addEventListener('click', () => renderSupport(index)));
document.querySelectorAll('.carousel-arrow').forEach(button => button.addEventListener('click', () => {
  renderSupport(activeSupport + (button.classList.contains('next') ? 1 : -1));
}));
bindDots();
renderSupport(0);

if (apiBase) {
  fetch(`${apiBase}/support`)
    .then(response => response.ok ? response.json() : Promise.reject())
    .then(payload => {
      if (payload.meta?.leaderboard?.length) renderSupporters(payload.meta.leaderboard, 'api');
      if (!payload.data?.length) return;
      activeSupportSlides = payload.data;
      supportControls.innerHTML = activeSupportSlides.map((_, index) => `<button type="button" class="carousel-dot${index === 0 ? ' active' : ''}" aria-label="Support slide ${index + 1}"></button>`).join('');
      carouselDots = [...supportControls.querySelectorAll('.carousel-dot')];
      bindDots();
      supportCard.dataset.source = 'api';
      renderSupport(0);
    })
    .catch(() => {});
}
