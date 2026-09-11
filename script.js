const API_KEY = 'YOUR_API_KEY_HERE'; // your football-data.org key
const BASE_URL = 'https://api.football-data.org/v4';

const competitionSelect = document.getElementById('competition-select');
const fixturesList = document.getElementById('fixtures-list');
const statusMessage = document.getElementById('status-message');

async function fetchFixtures(competitionCode) {
  statusMessage.textContent = 'Loading fixtures...';
  fixturesList.innerHTML = '';

  try {
    const response = await fetch(`${BASE_URL}/competitions/${competitionCode}/matches`, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    renderFixtures(data.matches);
    statusMessage.textContent = '';

  } catch (error) {
    statusMessage.textContent = 'Could not load fixtures. Please try again later.';
    console.error(error);
  }
}

function renderFixtures(matches) {
  fixturesList.innerHTML = '';

  matches.slice(0, 20).forEach(match => {
    const li = document.createElement('li');
    li.classList.add('fixture');

    const homeTeam = match.homeTeam.name;
    const awayTeam = match.awayTeam.name;
    const status = match.status;

    let scoreText = 'vs';
    let statusLabel = '';

    if (status === 'FINISHED') {
      scoreText = `${match.score.fullTime.home} - ${match.score.fullTime.away}`;
      statusLabel = 'Full Time';
      li.classList.add('finished');
    } else if (status === 'IN_PLAY' || status === 'PAUSED') {
      scoreText = `${match.score.fullTime.home ?? 0} - ${match.score.fullTime.away ?? 0}`;
      statusLabel = 'Live';
      li.classList.add('live');
    } else if (status === 'SCHEDULED' || status === 'TIMED') {
      const matchDate = new Date(match.utcDate);
      statusLabel = matchDate.toLocaleString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      statusLabel = status;
    }

    li.innerHTML = `
      <span class="teams">${homeTeam} ${scoreText} ${awayTeam}</span>
      <span class="status">${statusLabel}</span>
    `;

    fixturesList.appendChild(li);
  });
}

competitionSelect.addEventListener('change', (e) => {
  fetchFixtures(e.target.value);
});

fetchFixtures(competitionSelect.value);