import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { createAzurePlaywrightConfig, ServiceOS } from '@azure/playwright';
import { DefaultAzureCredential } from '@azure/identity';
import config from './playwright.config';

// Ensure Azure CLI is visible to Azure Identity when this process starts
// from a shell that has not reloaded the updated PATH yet.
const azureCliBin = 'C:\\Program Files\\Microsoft SDKs\\Azure\\CLI2\\wbin';
if (process.platform === 'win32' && !process.env.PATH?.includes(azureCliBin)) {
  process.env.PATH = `${process.env.PATH ?? ''};${azureCliBin}`;
  process.env.Path = process.env.PATH;
}

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
export default defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    /*
    Enable Playwright Workspaces Reporter:
    Uncomment the reporter section below to upload test results and reports to Playwright Workspaces.

    Note: The HTML reporter must be included before Playwright Workspaces Reporter.
    This configuration will replace any existing reporter settings from your base config.
    If you're already using other reporters, add them to this array.
    */
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);
