import { API_BASE, clearAdminSession, requireAdmin } from './admin-auth.js';

const sportsList = document.querySelector('#sports-list');

const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character]));

async function request(path) {
  if (!API_BASE) throw new Error('URL backend belum dikonfigurasi.');
  const response = await fetch(`${API_BASE}${path}`, { signal: AbortSignal.timeout(5000) });
  const payload = await response.json().catch(() => null);
  if (!response.ok) throw new Error(payload?.message || `Request gagal (${response.status})`);
  return payload;
}

async function initializeDashboard() {
  try {
    const sports = await request('/sports');
    sportsList.innerHTML = sports.data.map((sport, index) => `
      <article class="sport-row">
        <b>${String(index + 1).padStart(2, '0')}</b>
        <strong>${escapeHtml(sport.name)}</strong>
        <span>${sport.participantLimit} ${escapeHtml(sport.participantType)}</span>
      </article>`).join('');
  } catch (error) {
    sportsList.innerHTML = '<p class="error">Daftar cabang olahraga belum dapat dimuat. Coba muat ulang halaman.</p>';
  }
}

const identity = await requireAdmin();
if (identity) {
  document.querySelector('#admin-identity').textContent = identity.profile.display_name;
  document.querySelector('#logout-button').addEventListener('click', () => {
    clearAdminSession();
    location.replace('admin-login.html');
  });
  initializeDashboard();
}
