import { Selector } from 'testcafe';

class WebsitesPage {
  constructor() {
    this.pageId = '#websites-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasCards(testController) {
    const cardCount = Selector('.ui.centered.card').count;
    await testController.expect(cardCount).gte(5);
  }
}

export const websitesPage = new WebsitesPage();
