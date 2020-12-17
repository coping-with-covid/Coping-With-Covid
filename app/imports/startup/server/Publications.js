import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { Posts } from '../../api/post/Posts';
import { Websites } from '../../api/website/Websites';
import { Comments } from '../../api/comment/Comments';
import { Topics } from '../../api/topic/Topic';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.

Meteor.publish(Profiles.userPublicationName, function () {
  if (this.userId) {
    return Profiles.collection.find();
  }
  return this.ready();
});

Meteor.publish(Topics.userPublicationName, function () {
  if (this.userId) {
    return Topics.collection.find();
  }
  return this.ready();
});

Meteor.publish(Posts.userPublicationName, function () {
  if (this.userId) {
    return Posts.collection.find();
  }
  return this.ready();
});

Meteor.publish(Websites.userPublicationName, function () {
  if (this.userId) {
    return Websites.collection.find();
  }
  return this.ready();
});

Meteor.publish(Comments.userPublicationName, function () {
  if (this.userId) {
    return Comments.collection.find();
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
