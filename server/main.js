import { Meteor } from 'meteor/meteor';
import { Emails } from '../imports/api/emails.js'
import { SearchResults } from '../imports/api/searchResults.js'

Meteor.startup(() => {
  // code to run on server at startup
});

if (Meteor.isServer) {
  Meteor.publish("emails", function() {
    return Emails.find();
  });
  Meteor.publish("searchresults", function(query) {
    if (query) {
      return SearchResults.find({
        $text: {
          $search: query
        }
      },{limit: 10});
    } else {
      return SearchResults.find({},{limit:25});
    }
  });
  SearchResults._ensureIndex({
    'RawText': 'text',
  });
}
