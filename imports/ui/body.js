import { Template } from 'meteor/templating';
import { Emails } from '../api/emails.js';
import { Hits } from '../api/hits.js';
import { SearchResults } from '../api/searchResults.js';
import './body.html';

Session.set('id',1);
Session.set('searchQuery', "");



Template.body.helpers({
  emails() {
  Meteor.subscribe("emails");
    console.log("Running email helper computation");
    return Emails.find({"Id": Session.get('id')},{limit:1});
  },
  id() {
    return Session.get('id');
  },
  searchQuery() {
    return Session.get('searchQuery');
  },
  searchResults() {
    console.log("Running search query: " + Session.get('searchQuery'));
    Meteor.subscribe("searchresults", Session.get('searchQuery'));
      return SearchResults.find({});
  }
});

Template.body.events({
  'submit .emailId'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const new_id = target.id.value;

    Session.set('id', parseInt(new_id));
    console.log("ID entered: " + Session.get('id'));
//    Hits.update(
//        { EmailId: id },
//        { $inc: { Count: 1 }},
//        { upsert: true }
//    );

    // Clear form
    target.id.value = '';
   
  },
  'click .prev'(event) {
    if ( Session.get('id') <= 1 ) {
      Session.set('id', 1);
    } else {
      Session.set('id', Session.get('id')-1);
    }
  },
  'click .next'(event) {
    if ( Session.get('id') >=  7945) {
      Session.set('id', 7945);
    } else {
      Session.set('id', Session.get('id')+1);
    }
  },
  'click .random'(event) {
    Session.set('id', Math.floor((Math.random() * 7945) + 1));
  },
  'submit .searchInput'(event) {
    event.preventDefault();
    const target = event.target;
    const new_query = target.search.value;
    Session.set('searchQuery',new_query);
    target.search.value = '';
  },
  'click .from'(event) {
    Session.set('searchQuery', this.MetadataFrom);
  },
  'click .to'(event) {
    Session.set('searchQuery', this.MetadataTo);
  },
  'click .result'(event) {
    Session.set('id', this.Id);
  }
  // AND FOR SEARCH PAGING
});
