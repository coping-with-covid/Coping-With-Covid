import { Selector } from 'testcafe';

class ProfilePage {
  constructor() {
    this.pageId = '#profile-page';
    this.pageSelector = Selector(this.pageId);
  }

  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  async isLoggedIn(testController, username) {
    const loggedInUser = Selector('#profile-current-user').innerText;
    await testController.expect(loggedInUser).eql(username);
  }
}

export const profilePage = new ProfilePage();
