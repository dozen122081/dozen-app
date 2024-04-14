// pages/api/check-ip.ts

import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';

const IPINFO_API_TOKEN = '17784ee5314b1f';

export async function GET(req: NextApiRequest) {
  const queryParams = new URLSearchParams(req.url?.split('?')[1]);
  const clientIp = queryParams.get('clientip')
  try {
    // Call the IP geolocation API to get country information
    const response = await fetch(`https://ipinfo.io/${clientIp}/json?token=${IPINFO_API_TOKEN}`);
    const data = await response.json();

    // Extract country from the response
    const country = data.country;
    // Check if the country is Nepal
    const isFromNepal = country === 'NP';  // 'NP' is the ISO 3166-1 alpha-2 country code for Nepal

    return new NextResponse(JSON.stringify({isFromNepal}))
  } catch (error) {
    console.error('Error checking IP:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }))
  }
}
