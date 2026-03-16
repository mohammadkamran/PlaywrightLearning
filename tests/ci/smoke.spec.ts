// import { expect, test } from "@playwright/test";

// test.describe("CI smoke suite", () => {
//   test("@ci can submit a local form", async ({ page }) => {
//     await page.setContent(`
//       <main>
//         <form id="profile-form">
//           <label>
//             Name
//             <input aria-label="Name" name="name" />
//           </label>
//           <label>
//             Role
//             <select aria-label="Role" name="role">
//               <option value="QA">QA</option>
//               <option value="SDET">SDET</option>
//             </select>
//           </label>
//           <label>
//             <input aria-label="Subscribe" type="checkbox" name="subscribe" />
//             Subscribe
//           </label>
//           <button type="submit">Save</button>
//         </form>
//         <p data-testid="result"></p>
//       </main>
//       <script>
//         const form = document.getElementById("profile-form");
//         const result = document.querySelector('[data-testid="result"]');
//         form.addEventListener("submit", (event) => {
//           event.preventDefault();
//           const data = new FormData(form);
//           const isSubscribed = form.elements.subscribe.checked ? "yes" : "no";
//           result.textContent = [
//             data.get("name"),
//             data.get("role"),
//             isSubscribed,
//           ].join("|");
//         });
//       </script>
//     `);

//     await page.getByLabel("Name").fill("Kamran");
//     await page.getByLabel("Role").selectOption("SDET");
//     await page.getByLabel("Subscribe").check();
//     await page.getByRole("button", { name: "Save" }).click();

//     await expect(page.getByTestId("result")).toHaveText("Kamran|SDET|yes");
//   });

//   test("@ci can filter a local list", async ({ page }) => {
//     await page.setContent(`
//       <main>
//         <label>
//           Search
//           <input aria-label="Search" id="search" />
//         </label>
//         <p data-testid="count">4</p>
//         <ul id="items">
//           <li data-item>Release notes</li>
//           <li data-item>Regression checklist</li>
//           <li data-item>Smoke tests</li>
//           <li data-item>Bug bash notes</li>
//         </ul>
//       </main>
//       <script>
//         const search = document.getElementById("search");
//         const count = document.querySelector('[data-testid="count"]');
//         const items = [...document.querySelectorAll("[data-item]")];

//         search.addEventListener("input", () => {
//           const query = search.value.toLowerCase().trim();
//           let visibleCount = 0;

//           for (const item of items) {
//             const matches = item.textContent.toLowerCase().includes(query);
//             item.hidden = !matches;
//             if (matches) visibleCount += 1;
//           }

//           count.textContent = String(visibleCount);
//         });
//       </script>
//     `);

//     await page.getByLabel("Search").fill("notes");

//     await expect(page.locator("[data-item]:visible")).toHaveCount(2);
//     await expect(page.getByTestId("count")).toHaveText("2");
//   });
// });
