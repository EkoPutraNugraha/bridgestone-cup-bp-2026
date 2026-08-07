import { galleryMoments, gallerySports } from './data/gallery-data.js';

const filters = document.querySelector('#gallery-filters');
const selectedId = new URLSearchParams(location.search).get('sport');
const selectedSport = gallerySports.find(item => item.id === selectedId) || gallerySports[0];

if (filters) {
  const all = `<a class="${document.querySelector('#collection-grid') ? 'active' : ''}" href="gallery.html">ALL</a>`;
  filters.innerHTML = all + gallerySports.map(sport => `<a class="${sport.id === selectedId ? 'active' : ''}" href="gallery-sport.html?sport=${sport.id}">${sport.name}</a>`).join('');
}

const collectionGrid = document.querySelector('#collection-grid');
if (collectionGrid) {
  collectionGrid.innerHTML = gallerySports.map((sport, index) => `<a class="collection-card" style="--accent:${sport.accent}" href="gallery-sport.html?sport=${sport.id}"><small>${String(index + 1).padStart(2, '0')}</small><span class="sport-code">${sport.code}</span><div><h2>${sport.name} GALLERY</h2><p>OPEN COLLECTION · 20 PHOTOS</p><b>↗</b></div></a>`).join('');
}

const momentsGrid = document.querySelector('#moments-grid');
if (momentsGrid) {
  document.title = `${selectedSport.name} Gallery — Bridgestone Cup BP 2026`;
  document.querySelector('#sport-gallery-title').textContent = `${selectedSport.name} MOMENTS`;
  document.querySelector('#footer-sport').textContent = selectedSport.name;
  momentsGrid.style.setProperty('--accent', selectedSport.accent);
  const moments = galleryMoments[selectedSport.id];
  momentsGrid.innerHTML = moments.map((moment, index) => `<button class="moment-card" style="--accent:${selectedSport.accent}" type="button" data-index="${index}" aria-label="Buka ${moment.title} ${moment.number}"><span>${moment.number}</span><i>↗</i><div><small>${moment.sport}</small><strong>TOURNAMENT MOMENT</strong></div></button>`).join('');

  const dialog = document.querySelector('#gallery-lightbox');
  let activeIndex = 0;
  const paint = index => {
    activeIndex = (index + moments.length) % moments.length;
    const moment = moments[activeIndex];
    document.querySelector('#lightbox-number').textContent = moment.number;
    document.querySelector('#lightbox-sport').textContent = moment.sport;
    document.querySelector('#lightbox-title').textContent = moment.title;
    document.querySelector('#lightbox-image').style.setProperty('--accent', selectedSport.accent);
  };
  momentsGrid.addEventListener('click', event => {
    const card = event.target.closest('.moment-card');
    if (!card) return;
    paint(Number(card.dataset.index));
    dialog.showModal();
  });
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.previous').addEventListener('click', () => paint(activeIndex - 1));
  dialog.querySelector('.next').addEventListener('click', () => paint(activeIndex + 1));
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
}
