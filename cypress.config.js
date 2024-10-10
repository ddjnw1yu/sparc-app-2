import { defineConfig } from "cypress";
import dynamicConfig from './tests/cypress/support/dynamicConfig.js'

export default defineConfig({
  defaultCommandTimeout: 5000,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 0,
  retries: 2,
  e2e: {
    baseUrl: process.env.ROOT_URL ? process.env.ROOT_URL : 'http://localhost:3000',
    blockHosts: ["*google-analytics.com"],
    experimentalStudio: true,
    projectId: process.env.CYPRESS_PROJECT_ID,
    specPattern: "tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "tests/cypress/support/e2e.js",
    viewportWidth: 1600,
    viewportHeight: 900,
    //Prevent huge amount of time on reloading page
    testIsolation: true,
    // pageLoadTimeout: 1024*1024*1024,
    setupNodeEvents(on, config) {
      return dynamicConfig(config)
    },
    env: {
      PORTAL_API: process.env.PORTAL_API_HOST ? process.env.PORTAL_API_HOST : 'https://sparc-api.herokuapp.com',
      // databrowser.js
      PAGE_LIMIT: process.env.PAGE_LIMIT ? process.env.PAGE_LIMIT : '20',
      SEARCH_KEYWORDS: process.env.SEARCH_KEYWORDS ? process.env.SEARCH_KEYWORDS : 'Spine, Neck',
      FILTER_FACETS: process.env.FILTER_FACETS ? process.env.FILTER_FACETS : 'Human, Heart',
      // datasets.js
      DATASET_IDS: process.env.DATASET_IDS ? process.env.DATASET_IDS : '76, 117, 175, 226, 338',
      // mapsviewer.js
      TAXON_MODELS: process.env.TAXON_MODELS ? process.env.TAXON_MODELS : 'Rat, Pig',
      THREE_SYNC_VIEW: process.env.THREE_SYNC_VIEW ? process.env.THREE_SYNC_VIEW : 'Human Male',
      SEARCH_IN_MAP: process.env.SEARCH_IN_MAP ? process.env.SEARCH_IN_MAP : 'Heart',
      SCAFFOLD_DATASET_IDS: process.env.SCAFFOLD_DATASET_IDS ? process.env.SCAFFOLD_DATASET_IDS : '150, 155',
    }
  },
  fixturesFolder: "tests/cypress/fixtures",
  screenshotsFolder: "tests/cypress/screenshots",
  videosFolder: "tests/cypress/videos",
  downloadsFolder: "tests/cypress/downloads",
});
