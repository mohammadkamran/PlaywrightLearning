import { test, expect, Locator } from "@playwright/test";

test.describe("Dynamic Table Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const title: string = await page.title();
    console.log(`Page title is: ${title}`);
    const tableLocator: Locator = page.locator("[id=taskTable]");
    await expect(tableLocator).toBeVisible();
    await tableLocator.scrollIntoViewIfNeeded();
  });
  test("TC_001: should validate dynamic table", async ({ page }) => {
    console.log("Dynamic table is visible and ready for interaction.");
  });
  test("TC_002: should read the CPU value of name `Chrome`", async ({
    page,
  }) => {
    let cellCPU = "";
    const tableLocator: Locator = page.locator("[id=taskTable]");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const rowsCount: number = await tableRows.count();
    console.log("Total number of rows in the table: " + rowsCount);
    await page.waitForTimeout(5000);
    for (let i = 1; i < rowsCount; i++) {
      const row: Locator = tableRows.nth(i);
      const cellName: string | null = await row
        .locator("td")
        .first()
        .innerText();
      if (cellName === "Chrome") {
        const cellCPU: string | null = await row
          .locator("td", { hasText: "%" })
          .innerText();
        console.log(`CPU value of ${cellName} is: ${cellCPU}`);
        break;
      }
    }
    const chromeCPU: Locator = page.locator(".chrome-cpu");
    await expect(chromeCPU).toBeVisible();
    const cpuValue: string | null = await chromeCPU.innerText();
    console.log(
      `Verified CPU value of Chrome from highlighted cell: ${cpuValue}`
    );
    expect(cpuValue).toContain(cellCPU);
  });

  test("TC_003: should read the Memory size of name `Firefox`", async ({
    page,
  }) => {
    let cellMemory = "";
    const tableLocator: Locator = page.locator("[id=taskTable]");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const rowsCount: number = await tableRows.count();
    console.log("Total number of rows in the table: " + rowsCount);
    await page.waitForTimeout(5000);
    for (let i = 1; i < rowsCount; i++) {
      const row: Locator = tableRows.nth(i);
      const cellName: string | null = await row
        .locator("td")
        .nth(0)
        .innerText();
      if (cellName === "Firefox") {
        const cellMemory: string | null = await row
          .locator("td")
          .filter({ hasText: /MB$/ })
          .innerText();
        console.log(`Memory value of ${cellName} is: ${cellMemory}`);
        break;
      }
    }
    const firefoxMemory: Locator = page.locator(".firefox-memory");
    await expect(firefoxMemory).toBeVisible();
    const memoryValue: string | null = await firefoxMemory.innerText();
    console.log(
      `Verified CPU value of Chrome from highlighted cell: ${memoryValue}`
    );
    expect(memoryValue).toContain(cellMemory);
  });

  test("TC_004: should read the Network speed of name `Chrome`", async ({
    page,
  }) => {
    let cellNetwrokSpeed = "";
    const tableLocator: Locator = page.locator("[id=taskTable]");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const rowsCount: number = await tableRows.count();
    console.log("Total number of rows in the table: " + rowsCount);
    await page.waitForTimeout(5000);
    for (let i = 1; i < rowsCount; i++) {
      const row: Locator = tableRows.nth(i);
      const cellName: string | null = await row
        .locator("td")
        .first()
        .innerText();
      if (cellName === "Chrome") {
        const cellNetwrokSpeed: string | null = await row
          .locator("td", { hasText: /Mbps$/ })
          .innerText();
        console.log(`CPU value of ${cellName} is: ${cellNetwrokSpeed}`);
        break;
      }
    }
    const chromeNetwork: Locator = page.locator(".chrome-network");
    await expect(chromeNetwork).toBeVisible();
    const networkSpeedText: string | null = await chromeNetwork.innerText();
    console.log(
      `Verified CPU value of Chrome from highlighted cell: ${networkSpeedText}`
    );
    expect(networkSpeedText).toContain(cellNetwrokSpeed);
  });

  test("TC_005: should read the Disk space of name `Firefox`", async ({
    page,
  }) => {
    let cellDiskSpace = "";
    const tableLocator: Locator = page.locator("[id=taskTable]");
    const tableRows: Locator = tableLocator.locator("tr"); //locator chaining
    const rowsCount: number = await tableRows.count();
    console.log("Total number of rows in the table: " + rowsCount);
    await page.waitForTimeout(5000);
    for (let i = 1; i < rowsCount; i++) {
      const row: Locator = tableRows.nth(i);
      const cellName: string | null = await row
        .locator("td")
        .nth(0)
        .innerText();
      if (cellName === "Firefox") {
        // assign to outer variable so it can be used after the loop
        cellDiskSpace =
          (await row
            .locator("td")
            .filter({ hasText: /MB\/s$/ })
            .innerText()) || "";
        console.log(`Disk value of ${cellName} is: ${cellDiskSpace}`);
        break;
      }
    }
    const firefoxDisk: Locator = page.locator(".firefox-disk");
    await expect(firefoxDisk).toBeVisible();
    const diskValue: string | null = await firefoxDisk.innerText();
    console.log(
      `Verified Disk value of Firefox from highlighted cell: ${diskValue}`
    );
    expect(diskValue).toContain(cellDiskSpace);
  });
});
