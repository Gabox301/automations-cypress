import { defineConfig } from 'cypress';
import 'dotenv/config';
import fs from 'fs';

export default defineConfig({
  allowCypressEnv: false,
  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        delete_file({ filePath, timeout = 30000, interval = 1000 }) {
          return new Promise((resolve) => {
            const check = () => {
              if (fs.existsSync(filePath)) {
                try {
                  fs.unlinkSync(filePath);
                  resolve(true);
                } catch {
                  resolve(false);
                }
              } else if (Date.now() - startTime >= timeout) {
                resolve(false);
              } else {
                setTimeout(check, interval);
              }
            };
            const startTime = Date.now();
            check();
          });
        },
      });
    },
    downloads: 'cypress/downloads',
    env: {
      ...process.env,
    },
  },
});
