import { Selector } from 'testcafe';

class ForumPage {
  constructor() {
    this.pageId = '#forum-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async hasCards(testController) {
    const cardCount = Selector('.ui.centered.card').count;
    await testController.expect(cardCount).gte(12);
  }

  async create(testController) {
    await testController.click('#forum-create');
  }
}

export const forumPage = new ForumPage();
