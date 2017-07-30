import { Meteor } from 'meteor/meteor';
import bootstrap from '/server/imports/bootstrap';

Meteor.startup(() => {
  bootstrap();
});
