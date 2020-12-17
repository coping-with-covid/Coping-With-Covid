import { Selector } from 'testcafe';

class AddPostPage {
  constructor() {
    this.pageId = '#add-post-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Checks this page is displayed, then adds a new post */
  async addPost(testController) {
    const title = `Hawaii-${new Date().getTime()}`;
    const description = 'I love the breathtaking scenery there from clear beaches to lush mountains';
    await this.isDisplayed(testController);
    // Define the new post
    await testController.typeText('#post-title', title);
    await testController.typeText('#post-description', description);
    await testController.click('#post-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const addPostPage = new AddPostPage();
