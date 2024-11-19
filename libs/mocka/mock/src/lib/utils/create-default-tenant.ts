import { seedRoles, seedTasks, UserService } from '@mocka/authentication';
import { Group, Space } from '../models';
import Mock from '../models/mock';

export async function createDefaultTenant() {
  console.log('CREATE DEFAULT TENANT');
  const space = await Space.create({
    name: 'Default Space',
    description: 'This is the default space for development.',
  });

  // Create default group for the space
  const group = await Group.create({
    spaceId: space._id,
    name: 'Default Group',
    description: 'This is the default group within the space.',
  });

  // Create default item for the group
  await Mock.create({
    groupId: group._id,
    value: '{}',
    name: 'Default Item',
    description: 'This is a default item in the group.',
    details: 'For testing',
  });

  try {
    const user = await UserService.findOne();
    if (!user) {
      await seedTasks();
      await seedRoles();
      await UserService.createDefaultUser();
      console.log('Default user created');
    } else {
      console.log('Default user already exists');
    }
  } catch (err) {
    console.error('Error checking/creating default user:', err);
  }

  console.log('Default tenant created successfully!');
}
