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
    while (bets.length < noOfBets) {
      const bet = Math.floor(Math.random() * totalAvailableBets);

      if (!bets.includes(bet)) {
        bets.push(bet);
      }
    }

    return bets;
  }

  async placeBets(noOfBets: number, homepage: SbHomePage) : Promise<string[]> {
    let betsName: string[] = [];
    if ((await this.outcomeSuspended()) || (await this.CheckRaceHasStarted())) {
      await this.home().click();
      await homepage.clickSecondCard();
    }
    await expect(this.betWinPrice().first()).toBeVisible();
    const count = await this.betWinPrice().evaluateAll(
      (elements) => elements.length
    );
    let bets: number[] = await this.getRandomBets(noOfBets, count);
    for (let i = 0; i < noOfBets; i++) {
      await expect(this.betWinPrice().first()).toBeEnabled();
      const betPrice: Locator = this.betWinPrice().nth(bets[i]);
      const betName: Locator = this.betWinName().nth(bets[i]);
      await expect(betPrice).toBeVisible();
      await betPrice.click();
      let name = await betName.innerText();
      betsName.push(name);

      if (i === 0) {
        await expect(this.closeBetSlip()).toBeVisible();
        await this.closeBetSlip().click({ force: true });
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

  async assertBetsInBetSlip(betsName: string[], noOfBets: number): Promise<void> {
    await this.betSlipWindow().click();
    await expect(this.betSlipTitle()).toHaveCount(noOfBets);

    for (let i = 0; i < noOfBets; i++) {
      const betSlip = this.betSlipTitle().nth(i);
      await expect(betSlip).toHaveText(betsName[i]);
    }
  }
}
