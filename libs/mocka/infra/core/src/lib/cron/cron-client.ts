import cron from 'node-cron';

export class CronClient {
  static client: cron = cron;
}

export default new CronClient();
