# Football Fixtures & Results Viewer

A clean, responsive web app for viewing football fixtures and results across major competitions, built using the football-data.org API.

🔗 **Live demo**: [YOUR-GITHUB-PAGES-URL-HERE]

## Features

- View fixtures and results for Premier League, Champions League, and La Liga
- Switch between competitions via dropdown
- Live match indicators with colour-coded status (upcoming, live, finished)
- Readable formatted match dates and times
- Responsive layout

## Tech stack

- HTML5, CSS3, vanilla JavaScript (no frameworks)
- [football-data.org API](https://www.football-data.org/) for live fixture data
- Deployed via GitHub Pages

## What I learned / built this to practise

- Fetching and handling data from a third-party REST API using `fetch` and `async/await`
- DOM manipulation without a framework
- Git and GitHub workflow: staging, committing, pushing, and deployment
- Structuring a small project from scratch to a deployed, public-facing product

## Running locally

1. Clone the repo:
```bash
   git clone https://github.com/YOUR-USERNAME/football-fixtures-viewer.git
```
2. Open `index.html` with a local server (e.g. VS Code's Live Server extension)
3. Add your own [football-data.org](https://www.football-data.org/client/register) API key in `script.js`

## Possible future improvements

- Date/matchday filtering
- Team crests and logos
- Hiding the API key via a backend proxy