// netlify/functions/shopifyApi.js

const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const apiKey = 'a8e7646c131a57f30477a97d2cdde5bb';
  const apiSecret = 'c25a5316dd408414932ef4c72c377c2b';
  const shopifyApiUrl = 'https://alkaramat.myshopify.com/admin/api/2023-10/graphql.json';

  const graphqlQuery = `
    {
      shop {
        name
      }
    }
  `;

  try {
    const response = await fetch(shopifyApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
      body: JSON.stringify({ query: graphqlQuery }),
    });

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
