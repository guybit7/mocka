import * as jwt from 'jsonwebtoken';
import { MockDocument } from '../models';
import { MockService } from '../services';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const mockService = new MockService();

async function redirect(tid, groupId, endpoint): Promise<MockDocument> {
  try {
    return await mockService.findQuery(tid, groupId, endpoint);
  } catch (error) {
    console.error('Error calling external API:', error);
  }
}

export async function mainMiddleware(req: any, res, next) {
  let theUrl = req.url;
  if (theUrl.endsWith('/')) {
    theUrl = theUrl.slice(0, -1);
  }
  const segments = theUrl.split('/').filter(segment => segment);
  const firstPath = segments[0] || '';
  if (firstPath === 'api' || firstPath === '') {
    return next();
  }
  const groupId = segments[0];
  const endpoint = segments.slice(1).join('/') || '';
  if (groupId === 'favicon.ico') {
    return next();
  }
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  const decoded = jwt.verify(token, JWT_SECRET_KEY);
  req.user = decoded;
  req.tenantId = decoded.tenantId;
  const response: MockDocument = await redirect(req.tenantId, groupId, endpoint);
  if (response && response.status) {
    res.json(JSON.parse(response.value));
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
