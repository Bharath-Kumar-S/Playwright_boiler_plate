const { test, expect } = require("@playwright/test");

require("dotenv").config();

const { email, sign_up } =
  require("../utils/selector").locator.signup.form;

const { testemail } = require("../fixtures/testdata").testdata.signup;

const { colors } = require("../utils/colors");

test.describe("sample tests", async () => {
  test.beforeAll(async () => {
    console.log("Starting execution");
  });

  let $;
  test.beforeEach(async ({ page }) => {
    $ = (selector) => page.locator(selector);
    await page.goto(process.env.url);
  });

  test("User Sign up tests", async ({ page }) => {
    await expect(page).toHaveTitle('GitHub: Where the world builds software · GitHub');
    await expect($(email)).toBeVisible();
    await expect($(sign_up)).toBeEnabled();
    await $(email).type(testemail);
    await expect($(sign_up)).toHaveCSS("background-color", colors.sign_up);
    await expect($(email)).toHaveValue(testemail)
  });

  test("Visual regression test", async ({ page }) => {
    expect(await page.screenshot()).toMatchSnapshot("signup.png", {
      threshold: 2.5,
    });
  });

  test.afterAll(async () => {
    console.log("Finishing execution");
  });
});
