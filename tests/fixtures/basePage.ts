import { test as base } from '@playwright/test';

import  RaceCardPage from '../support/pages/raceCard.page';
import  SbHomePage  from '../support/pages/sbHome.page';


export const test = base.extend<{
  sbHomePage: SbHomePage;
  raceCardPage: RaceCardPage;
}>({
  sbHomePage: async ({ page }, use) => {
   await use (new SbHomePage(page))
  },
  raceCardPage: async ({ page }, use) => {
    await use(new RaceCardPage(page))
  },
});
