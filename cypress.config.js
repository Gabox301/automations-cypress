import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  allowCypressEnv: false,
  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {},
    env: {
      ...process.env,
    },
  },
});
