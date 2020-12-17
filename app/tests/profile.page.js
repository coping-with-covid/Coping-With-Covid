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

  /** Checks this page is displayed, then changes firstName field, checks update succeeded, then restores value. */
  async updateProfile(testController, firstName) {
    const newFirstName = 'New First Name';
    await testController.click('#edit-profile');
    await testController.expect(Selector('#edit-profile-page').exists).ok();
    // Delete text from first name field.
    await testController.selectText('#firstName').pressKey('delete');
    // Type in new first name.
    await testController.typeText('#firstName', newFirstName);
    // Submit it.
    await testController.click('#profile-page-submit');
    // Click the OK button on the Sweet Alert.
    await testController.click(Selector('.swal-button--confirm'));
    // Now restore original value
    await testController.click('#edit-profile');
    await testController.expect(Selector('#edit-profile-page').exists).ok();
    await testController.selectText('#firstName').pressKey('delete');
    await testController.typeText('#firstName', firstName);
    await testController.click('#profile-page-submit');
    await testController.click(Selector('.swal-button--confirm'));
  }
}

export const profilePage = new ProfilePage();
