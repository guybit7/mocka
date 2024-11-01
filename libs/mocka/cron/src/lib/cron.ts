import { UserService } from '@mocka/authentication';
import { CronClient } from '@mocka/core';

export class MockCron {
  constructor() {
    CronClient.client.schedule('0 5 * * 1', this.cleanInVerifiedUsers);
  }

  cleanInVerifiedUsers() {
    console.log(`#CRON ${Date.now()}-> clearIsUnVerifiedUsers`);
    UserService.clearIsUnVerifiedUsers();
  }
}
export default MockCron;
