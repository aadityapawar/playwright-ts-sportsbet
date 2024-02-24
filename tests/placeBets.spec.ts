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
});
