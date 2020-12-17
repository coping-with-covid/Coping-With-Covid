import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signoutPage } from './signout.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { forumPage } from './forum.page';
import { websitesPage } from './websites.page';
import { profilePage } from './profile.page';
import { homePage } from './home.page';
import { aboutPage } from './about.page';
import { addWebsitePage } from './addwebsite.page';
import { addPostPage } from './addpost.page';

/* global fixture:false, test:false */

/** Credentials for one of the sample users defined in settings.development.json. */
const credentials = { username: 'jocelynjones@yahoo.com', password: 'test', firstname: 'Jocelyn' };

fixture('coping-with-covid localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page shows up', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test that signin, homepage, and signout work', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.isLoggedIn(testController, credentials.username);
  await homePage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `user-${new Date().getTime()}@foo.com`;
  const firstname = 'John';
  const lastname = 'Foo';
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, firstname, lastname, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Forum Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoForumPage(testController);
  await forumPage.isDisplayed(testController);
  await forumPage.hasCards(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Websites Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoWebsitesPage(testController);
  await websitesPage.isDisplayed(testController);
  await websitesPage.hasCards(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test About Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoAboutPage(testController);
  await aboutPage.isDisplayed(testController);
  await navBar.logout(testController);
  await signoutPage.isDisplayed(testController);
});

test('Test Profile Page and Edit Profile Page', async (testController) => {
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoProfilePage(testController);
  await profilePage.isDisplayed(testController);
  await profilePage.isLoggedIn(testController, credentials.username);
  await profilePage.updateProfile(testController, credentials.firstname);
});

test('Test that addPost page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoForumPage(testController);
  await forumPage.isDisplayed(testController);
  await forumPage.create(testController);
  await addPostPage.isDisplayed(testController);
  await addPostPage.addPost(testController);
});

test('Test that addWebsite page works', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoWebsitesPage(testController);
  await websitesPage.isDisplayed(testController);
  await websitesPage.create(testController);
  await addWebsitePage.isDisplayed(testController);
  await addWebsitePage.addWebsite(testController);
});
