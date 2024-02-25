import { env } from '../utils/parseEnv';
import { test } from './fixtures/basePage';

test.describe('Run on given viewport', () => {
  test.use({ viewport: { width: 420, height: 720 } });

  test('Place 2 bets and verify in bet slip', async ({
    sbHomePage,
    raceCardPage,
  }) => {
    await sbHomePage.goto();
    await sbHomePage.clickFirstCard();
    const bets = await raceCardPage.placeBets(2, sbHomePage);
    await raceCardPage.assertBetsInBetSlip(bets, 2);
  });

  test('Place 3 bets and verify in bet slip', async ({
    sbHomePage,
    raceCardPage,
  }) => {
    await sbHomePage.goto();
    await sbHomePage.clickFirstCard();
    const bets = await raceCardPage.placeBets(3, sbHomePage);
    await raceCardPage.assertBetsInBetSlip(bets, 3);
  });

  test('Place 4 bets and verify in bet slip', async ({
    sbHomePage,
    raceCardPage,
  }) => {
    await sbHomePage.goto();
    await sbHomePage.clickFirstCard();
    const bets = await raceCardPage.placeBets(4, sbHomePage);
    await raceCardPage.assertBetsInBetSlip(bets, 4);
  });

  test.afterEach(async ({ page }, testInfo) => {
    const screenshot = await page.screenshot({
      path: `${env('SCREENSHOT_PATH')}${testInfo.title}_${Date.now()}.png`,
    });
    await testInfo.attach(`${testInfo.title}`, {
      body: screenshot,
      contentType: 'image/png',
    });
    await page.close();
  });
});
