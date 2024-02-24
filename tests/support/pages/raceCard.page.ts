import { expect, Locator, Page } from '@playwright/test';
import SbHomePage from './sbHome.page';

export default class RaceCardPage {
  readonly page: Page;

  constructor(page) {
    this.page = page;
  }

  betWinPrice = () =>
    this.page.locator("[data-automation-id='racecard-outcome-0-L-price']");
  betWinName = () =>
    this.page.locator("[data-automation-id='racecard-outcome-name']");
  betSlipTitle = () =>
    this.page.locator("[data-automation-id='betslip-bet-title']");
  closeBetSlip = () =>
    this.page.locator("[data-automation-id='close-isolated-icon']");
  betSlipWindow = () =>
    this.page
      .locator("[data-automation-id='header-betslip-touchable']")
      .first();
  liveBettingOpen = () => this.page.getByText('Live Betting Open');
  liveBet = () => this.page.getByText('Live Bet');
  liveBettingClosed = () => this.page.getByText('Live Betting Closed');
  home = () => this.page.locator("a[href='/']").first();
  raceHasStarted = () => this.page.getByText('Race has started');
  raceCardOutcomeSuspended = () =>
    this.page
      .locator("[data-automation-id= 'racecard-outcome-suspended']")
      .first();

  async getRandomBets(noOfBets: number, totalAvailableBets: number) {
    const bets: number[] = [];
    let previousBet = -1;

    for (let i = 0; i < noOfBets; i++) {
      let bet: number | undefined = undefined;

      do {
        bet = Math.floor(Math.random() * totalAvailableBets);
      } while (bet === previousBet);

      if (typeof bet === 'number') {
        bets.push(bet);
        previousBet = bet;
      }
    }
    return bets;
  }

  async placeBets(noOfBets: number, homepage: SbHomePage) {
    let betsName: string[] = [];
    if ((await this.outcomeSuspended()) || (await this.CheckRaceHasStarted())) {
      await this.home().click();
      await homepage.clickSecondCard();
    }
    const count = await this.betWinPrice().evaluateAll(
      (elements) => elements.length
    );
    let bets: number[] = await this.getRandomBets(noOfBets, count);
    for (let i = 0; i < noOfBets; i++) {
      const firstBetPrice: Locator = this.betWinPrice().nth(bets[i]);
      const firstBetName: Locator = this.betWinName().nth(bets[i]);

      await firstBetPrice.click();
      let text1 = await firstBetName.innerText();
      betsName.push(text1);

      if (i === 0) {
        await this.closeBetSlip().click();
      }
    }
    return betsName;
  }

  async outcomeSuspended() {
    return await this.raceCardOutcomeSuspended().isVisible();
  }

  async CheckRaceHasStarted() {
    return await this.raceHasStarted().isVisible();
  }

  async assertBetsInBetSlip(betsName: string[], noOfBets: number) {
    await this.betSlipWindow().click();
    await expect(this.betSlipTitle()).toHaveCount(noOfBets);

    for (let i = 0; i < noOfBets; i++) {
      const betSlip = this.betSlipTitle().nth(i);
      await expect(betSlip).toHaveText(betsName[i]);
    }
  }
}
