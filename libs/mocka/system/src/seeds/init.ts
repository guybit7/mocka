import { createSystemTenentSeed } from './system-tenant-seed';

export async function initializeSystem() {
  try {
    await createSystemTenentSeed();
    console.log('System seeding completed successfully.');
  } catch (error) {
    console.error('Error initializing application:', error);
    process.exit(1); // Exit the process if initialization fails
  }
}
