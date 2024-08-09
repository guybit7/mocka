import Redis, { Redis as IoredisClient } from 'ioredis';

export class RedisClient {
  private static client: IoredisClient;

  constructor() {
    RedisClient.client = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: Number(process.env.REDIS_PORT) || 6379, // Add other options as needed
    });
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
        return await RedisClient.client.setex(key, expiration, value);
      } else {
        return await RedisClient.client.set(key, value);
      }
    } catch (error) {
      console.error('Error setting key in Redis:', error);
      throw error;
    }
  }

  static async delete(key: string) {
    return new Promise((resolve, reject) => {
      RedisClient.client.del(key, (err, res) => {
        if (err) {
          reject(err); 
        }
        if (res === 1) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
export default new RedisClient();
