import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
    retries: 1,

  reporter: 'html',
  
  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    trace: 'on',
  },
});