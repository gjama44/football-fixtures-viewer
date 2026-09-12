exports.handler = async function (event, context) {
  const API_KEY = 'd7cedb8ec08b4559b44ced2febf2f07f'; // your football-data.org key
  const competitionCode = event.queryStringParameters.competition || 'PL';

  try {
    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competitionCode}/matches`,
      {
        headers: { 'X-Auth-Token': API_KEY }
      }
    );

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Failed to fetch fixtures' })
    };
  }
};
