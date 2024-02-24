import { Page } from '@playwright/test';

export default class SbHomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async goto() {
    await this.page.goto('/',{});
  }

  firstCard = () => this.page.locator("[data-automation-id='group-1-carousel-1-body-container-cell-1']");
  secondCard = () => this.page.locator("[data-automation-id='group-1-carousel-1-body-container-cell-2']");

  public async clickFirstCard() {
    await this.firstCard().click();
  }

  public async clickSecondCard() {
    await this.secondCard().click();
  }
}
