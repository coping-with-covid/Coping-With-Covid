import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profiles';
import { Websites } from '../../api/website/Websites';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addProfiles(profile) {
  console.log(`  Adding: ${profile.firstname} (${profile.owner})`);
  Profiles.collection.insert(profile);
}

function addWebsite(website) {
  console.log(`  Adding: ${website.title} (${website.owner})`);
  Websites.collection.insert(website);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(profile => addProfiles(profile));
  }
}

if (Websites.collection.find().count() === 0) {
  if (Meteor.settings.defaultWebsites) {
    console.log('Creating default websites.');
    Meteor.settings.defaultWebsites.map(website => addWebsite(website));
  }
}
