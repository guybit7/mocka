import axios from 'axios';

async function redirect(groupId, endpoint) {
  try {
    // Make a request to another API
    const body = {
      groupId: groupId,
      endpoint: endpoint,
    };
    const response = await axios.post(`http://localhost:3000/api/mock/findQuery`, body);

    // Return the response from the external API to the client
    return response;
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error calling external API:', error);
  }
}

export async function mainMiddleware(req: Request, res, next) {
  const segments = req.url.split('/').filter(segment => segment); // Filter out empty segments
  const firstPath = segments[0] || ''; // First segment
  if (firstPath === 'api' || firstPath === '') {
    return next();
  }
  const groupId = segments[0]; // Second segment
  const endpoint = segments.slice(1).join('/') || ''; // Join remaining segments
  if (groupId === 'favicon.ico') {
    return next();
  }
  console.log('*****[mainMiddleware START]***');
  // console.log('[main]groupid: ', groupId);
  // console.log('[main]endpoint: ', endpoint);
  console.log('*****middleware end***');
  const response = await redirect(groupId, endpoint);
  res.json(response.data);
}
