import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Topics } from '../../api/topic/Topic';
import { Posts } from '../../api/post/Posts';
import { Websites } from '../../api/website/Websites';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */

function addProfiles(profile) {
  console.log(`  Adding: ${profile.firstname} (${profile.owner})`);
  Profiles.collection.insert(profile);
}

function addTopics(topic) {
  console.log(`  Adding: ${topic.topic}`);
  Topics.collection.insert(topic);
}

function addPosts(post) {
  console.log(`  Adding: ${post.title} (${post.owner})`);
  Posts.collection.insert(post);
}

function addWebsite(website) {
  console.log(`  Adding: ${website.title} (${website.owner})`);
  Websites.collection.insert(website);
}

/** Initialize the collection if empty. */
if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(profile => addProfiles(profile));
  }
}

/**
 * If the loadAssetsFile field in settings.development.json is true, then load the data in private/data.json.
 * This approach allows you to initialize your system with large amounts of data.
 * Note that settings.development.json is limited to 64,000 characters.
 * We use the "Assets" capability in Meteor.
 * For more info on assets, see https://docs.meteor.com/api/assets.html
 * User count check is to make sure we don't load the file twice, which would generate errors due to duplicate info.
 */
if ((Meteor.settings.loadAssetsFile) && (Profiles.collection.find().count() < 4)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.profiles.map(profile => addProfiles(profile));
}

if ((Meteor.settings.loadAssetsFile) && (Topics.collection.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.topics.map(topic => addTopics(topic));
}

if ((Meteor.settings.loadAssetsFile) && (Websites.collection.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.websites.map(website => addWebsite(website));
}

if ((Meteor.settings.loadAssetsFile) && (Posts.collection.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.posts.map(post => addPosts(post));
}
