import { defineConfig } from 'cypress';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  allowCypressEnv: false,
  retries: 2,
  e2e: {
    setupNodeEvents(on, config) {
      const downloadsDir = path.isAbsolute(config.downloadsFolder)
        ? config.downloadsFolder
        : path.join(config.projectRoot, config.downloadsFolder);
      on('task', {
        clearDownloadsFolder() {
          if (!fs.existsSync(downloadsDir)) {
            return null;
          }
          for (const name of fs.readdirSync(downloadsDir)) {
            const filePath = path.join(downloadsDir, name);
            try {
              const stat = fs.statSync(filePath);
              if (stat.isFile()) {
                fs.unlinkSync(filePath);
              }
            } catch {
              /* ignorar archivos bloqueados u otros errores */
            }
          }
          return null;
        },
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
