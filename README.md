# Football Fixtures & Results Viewer

A clean, responsive web app for viewing football fixtures and results across major competitions, built using the football-data.org API.

🔗 **Live demo**: [https://majestic-truffle-7325c5.netlify.app/]

## Features

- View fixtures and results for Premier League, Champions League, and La Liga
- Switch between competitions via dropdown
- Filter fixtures by All / Today / This Week
- Live match indicators with colour-coded status (upcoming, live, finished)
- Readable formatted match dates and times
- Responsive layout

## Tech stack

- HTML5, CSS3, vanilla JavaScript (no frameworks)
- [football-data.org API](https://www.football-data.org/) for live fixture data
- Netlify Functions (serverless) to proxy API requests — avoids CORS restrictions and keeps the API key server-side rather than exposed in client code
- Deployed via Netlify (auto-deploys from GitHub on every push)

## What I learned / built this to practise

- Fetching and handling data from a third-party REST API using `fetch` and `async/await`
- DOM manipulation without a framework
- Git and GitHub workflow: staging, committing, pushing, tagging releases
- Diagnosing and fixing a real-world CORS issue in a deployed app
- Building and deploying a serverless function to proxy an API and protect credentials
- Continuous deployment via Netlify

## Running locally

1. Clone the repo:
```bash
   git clone https://github.com/gjama22/football-fixtures-viewer.git
```
2. Add your football-data.org API key to `netlify/functions/fixtures.js`
3. Run locally using the [Netlify CLI](https://docs.netlify.com/cli/get-started/) with `netlify dev` (required to run functions locally, unlike plain Live Server)

## Possible future improvements

- Team crests and logos
- Pagination for larger fixture lists
- Caching to reduce API calls against the free-tier rate limit