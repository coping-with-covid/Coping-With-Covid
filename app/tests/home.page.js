import { Selector } from 'testcafe';

class HomePage {
  constructor() {
    this.pageId = '#home-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Asserts that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }
}

export const homePage = new HomePage();
