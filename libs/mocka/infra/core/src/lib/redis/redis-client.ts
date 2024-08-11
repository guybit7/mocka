import Redis, { Redis as IoredisClient } from 'ioredis';

export class RedisClient {
  private static client: IoredisClient;

  constructor() {
    if (!RedisClient.client) {
      RedisClient.client = new Redis({
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
      });

      RedisClient.client.on('connect', () => {
        console.log('Connected to Redis');
      });

      RedisClient.client.on('error', error => {
        console.error('Redis error:', error);
      });
    }
  }

  static async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error('Error getting key from Redis:', error);
      throw error;
    }
  }

  static async set(key: string, value: string, expiration?: number): Promise<'OK'> {
    try {
      if (expiration) {
        return await this.client.setex(key, expiration, value);
      } else {
        return await this.client.set(key, value);
      }
    } catch (error) {
      console.error('Error setting key in Redis:', error);
      throw error;
    }
  }

  static async delete(key: string): Promise<boolean> {
    try {
      const result = await this.client.del(key);
      return result === 1;
    } catch (error) {
      console.error('Error deleting key from Redis:', error);
      throw error;
    }
  }
}

export default new RedisClient();
