import { renderHome } from './components/home.js?v=20260807-gallery';
import { supportSlides } from './data/home-data.js?v=20260807-support-arrows';
renderHome();

const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => { const open = header.classList.toggle('nav-open'); toggle.setAttribute('aria-expanded', String(open)); });
document.querySelectorAll('#main-nav a').forEach(link => link.addEventListener('click', () => { header.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); }));
const sections = [...document.querySelectorAll('main > section')];
const links = [...document.querySelectorAll('#main-nav a')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) links.forEach(a => a.classList.toggle('active', a.hash === `#${entry.target.id}`)); }), { rootMargin: '-35% 0px -55%' });
sections.forEach(section => observer.observe(section));
document.querySelector('.language-toggle').addEventListener('click', event => { const labels = event.currentTarget.querySelectorAll('span'); labels.forEach(label => label.classList.toggle('active')); document.documentElement.lang = labels[0].classList.contains('active') ? 'id' : 'en'; });
const carouselDots = [...document.querySelectorAll('.carousel-dot')];
let activeSupport = 0;
const supportQuote = document.querySelector('.support-feature blockquote>p');
const supportAuthor = document.querySelector('.support-feature cite');
const supportMedia = document.querySelector('.support-media');
const renderSupport = index => {
  activeSupport = (index + supportSlides.length) % supportSlides.length;
  const slide = supportSlides[activeSupport];
  supportQuote.textContent = slide.message;
  supportAuthor.textContent = `— ${slide.author}`;
  supportMedia.dataset.label = slide.label;
  carouselDots.forEach((dot, dotIndex) => {
    const active = dotIndex === activeSupport;
    dot.classList.toggle('active', active);
    dot.setAttribute('aria-current', active ? 'true' : 'false');
  });
};
document.querySelectorAll('.carousel-arrow').forEach(button => button.addEventListener('click', () => renderSupport(activeSupport + (button.classList.contains('next') ? 1 : -1))));
carouselDots.forEach((dot, index) => dot.addEventListener('click', () => renderSupport(index)));
renderSupport(0);
