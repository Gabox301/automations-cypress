import { defineConfig } from 'cypress';
import 'dotenv/config';

export default defineConfig({
  allowCypressEnv: false,
  e2e: {
    setupNodeEvents(on, config) {},
    env: {
      ...process.env,
    },
  },
});
