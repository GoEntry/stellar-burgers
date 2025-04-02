import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.ts',
  },
  video: false,
  viewportWidth: 1440,
  viewportHeight: 900,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'cypress/screenshots',
  fixturesFolder: 'cypress/fixtures',
}); 
