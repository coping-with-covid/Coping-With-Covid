import { Selector } from 'testcafe';

class AddWebsitePage {
  constructor() {
    this.pageId = '#add-website-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new website */
  async addWebsite(testController) {
    const title = `Google-${new Date().getTime()}`;
    const url = 'https://www.google.com';
    const description = 'Google is a popular search engine.';
    await this.isDisplayed(testController);
    // Define the new website
    await testController.typeText('#website-title', title);
    await testController.typeText('#website-url', url);
    await testController.typeText('#website-description', description);
    await testController.click('#website-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addWebsitePage = new AddWebsitePage();
