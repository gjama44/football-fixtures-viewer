const competitionSelect = document.getElementById('competition-select');
const fixturesList = document.getElementById('fixtures-list');
const statusMessage = document.getElementById('status-message');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let currentMatches = [];

async function fetchFixtures(competitionCode) {
  statusMessage.textContent = 'Loading fixtures...';
  fixturesList.innerHTML = '';

  try {
    const response = await fetch(`/.netlify/functions/fixtures?competition=${competitionCode}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    currentMatches = data.matches;
    applyFilterAndRender();
    statusMessage.textContent = '';

  } catch (error) {
    statusMessage.textContent = 'Could not load fixtures. Please try again later.';
    console.error(error);
  }
}

function applyFilterAndRender() {
  const now = new Date();
  let filtered = currentMatches;

  if (currentFilter === 'today') {
    filtered = currentMatches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate.toDateString() === now.toDateString();
    });
  } else if (currentFilter === 'week') {
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);
    filtered = currentMatches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate >= now && matchDate <= oneWeekFromNow;
    });
  }

  renderFixtures(filtered);
}

function renderFixtures(matches) {
  fixturesList.innerHTML = '';

  if (matches.length === 0) {
    statusMessage.textContent = 'No fixtures found for this filter.';
    return;
  } else {
    statusMessage.textContent = '';
  }

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

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentFilter = button.dataset.filter;
    applyFilterAndRender();
  });
});

fetchFixtures(competitionSelect.value);