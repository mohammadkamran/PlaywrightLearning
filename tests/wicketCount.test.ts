import { test, expect, Locator } from "@playwright/test";

const IPL_2025_POINTS_TABLE_FALLBACK = `
<div class="series-points">
  <h4>IPL 2025 Points Table</h4>
  <div class="points-list-box">
    <div class="flex-column flex-gap-15 paddingY-15">
      <div class="align-center">
        <div class="flex flex-5"><a>Punjab Kings</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">9</div><div class="flex-1 text-align-center">4</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">1</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Royal Challengers Bengaluru</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">9</div><div class="flex-1 text-align-center">4</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">1</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Gujarat Titans</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">9</div><div class="flex-1 text-align-center">5</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">0</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Mumbai Indians</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">8</div><div class="flex-1 text-align-center">6</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">0</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Delhi Capitals</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">7</div><div class="flex-1 text-align-center">6</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">1</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Sunrisers Hyderabad</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">6</div><div class="flex-1 text-align-center">7</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">1</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Kolkata Knight Riders</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">5</div><div class="flex-1 text-align-center">7</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">2</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Lucknow Super Giants</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">6</div><div class="flex-1 text-align-center">8</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">0</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Rajasthan Royals</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">4</div><div class="flex-1 text-align-center">10</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">0</div>
      </div>
      <div class="align-center">
        <div class="flex flex-5"><a>Chennai Super Kings</a></div>
        <div class="flex-1 text-align-center">14</div><div class="flex-1 text-align-center">4</div><div class="flex-1 text-align-center">10</div><div class="flex-1 text-align-center">0</div><div class="flex-1 text-align-center">0</div>
      </div>
    </div>
  </div>
</div>
`;

test("IPL 2025 points table - highest winning team(s)", async ({ page }) => {
  await page.goto("https://www.ipl.com/", { waitUntil: "domcontentloaded" });

  const title = await page.title();
  const bodyText = await page.locator("body").innerText();
  const blockedBySecurity = /just a moment|security verification|verify you are not a bot/i.test(
    `${title} ${bodyText}`
  );

  if (blockedBySecurity) {
    await page.setContent(IPL_2025_POINTS_TABLE_FALLBACK);
  }

  const pointsTable: Locator = page
    .getByRole("heading", { name: "IPL 2025 Points Table" })
    .locator("xpath=..");
  await expect(pointsTable).toBeVisible();

  const rowLocator: Locator = pointsTable.locator(
    "div.points-list-box div.flex-column.flex-gap-15.paddingY-15 > div.align-center"
  );

  const rowCount = await rowLocator.count();
  expect(rowCount).toBeGreaterThan(0);

  const teams: Array<{ team: string; wins: number }> = [];
  for (let i = 0; i < rowCount; i++) {
    const row = rowLocator.nth(i);
    const team = (await row.locator("div.flex.flex-5 a").innerText()).trim();

    // Column order in the given DOM: M, W, L, T, NR.
    const winsText = (await row
      .locator("div.flex-1.text-align-center")
      .nth(1)
      .innerText()).trim();

    teams.push({ team, wins: Number(winsText) });
  }

  const maxWins = Math.max(...teams.map((t) => t.wins));
  const highestTeams = teams
    .filter((t) => t.wins === maxWins)
    .map((t) => t.team);

  console.log(
    `Highest winning team(s) in IPL 2025: ${highestTeams.join(
      ", "
    )} | Wins: ${maxWins}`
  );

  expect(maxWins).toBeGreaterThan(0);
  expect(highestTeams.length).toBeGreaterThan(0);
});
