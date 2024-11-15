import axios from 'axios';
import { IMock } from '../models';
import { Response } from 'express';

async function redirect(groupId, endpoint): Promise<IMock> {
  try {
    // Make a request to another API
    const body = {
      groupId: groupId,
      endpoint: endpoint,
    };
    return await axios.post(`http://localhost:3000/api/mock/findQuery`, body);
  } catch (error) {
    // Handle any errors that occur during the API call
    console.error('Error calling external API:', error);
  }
}

export async function mainMiddleware(req: Request, res, next) {
  console.log('mainMiddleware');
  const segments = req.url.split('/').filter(segment => segment); // Filter out empty segments
  const firstPath = segments[0] || ''; // First segment
  if (firstPath === 'api' || firstPath === '') {
    return next();
  }
  const groupId = segments[0]; // Second segment
  const endpoint = segments.slice(1).join('/') || ''; // Join remaining segments
  console.log(groupId);
  console.log(endpoint);
  if (groupId === 'favicon.ico') {
    return next();
  }

  const response: any = await redirect(groupId, endpoint);

  if (response.data.status) {
    res.json(JSON.parse(response.data.value));
  } else {
    if (Object.keys(response.data.value).length > 0) {
      res.status(500).json(JSON.parse(response.data.value));
    } else {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
