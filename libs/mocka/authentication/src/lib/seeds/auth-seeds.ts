import Role from '../models/role';
import Task from '../models/task';

export async function seedTasks() {
  const tasks = [
    { taskId: 'create_space', description: 'Create new Space' },
    { taskId: 'read_space', description: 'Read Space' },
    { taskId: 'update_space', description: 'Update Space' },
    { taskId: 'delete_space', description: 'Delete Space' },
  ];

  for (const task of tasks) {
    if (!(await Task.findOne({ taskId: task.taskId }))) {
      await Task.create(task);
      console.log(`Task ${task.taskId} created.`);
    }
  }
}

export async function seedRoles() {
  const roles = [
    { name: 'super-admin', tasks: ['create_space', 'read_space', 'update_space', 'delete_space'] },
    { name: 'admin', tasks: ['create_space', 'read_space', 'update_space'] },
    { name: 'user', tasks: ['read_space'] },
  ];

  for (const role of roles) {
    if (!(await Role.findOne({ name: role.name }))) {
      await Role.create(role);
      console.log(`Role ${role.name} created.`);
    }
  }
}
