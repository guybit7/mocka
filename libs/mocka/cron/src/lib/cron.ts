import { UserService } from '@mocka/auth';
import { CronClient } from '@mocka/core';

export class MockCron {
  constructor() {
    CronClient.client.schedule('5 * * * * *', this.cleanInVerifiedUsers);
  }

  cleanInVerifiedUsers() {
    console.log(`#CRON ${Date.now()}-> clearIsUnVerifiedUsers`);
    UserService.clearIsUnVerifiedUsers();
  }
}
export default MockCron;
