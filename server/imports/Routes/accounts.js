import { Meteor } from 'meteor/meteor';
import AccountsController from '/server/imports/Controllers/AccountsController';

export default () => {
  Meteor.methods({
    'accounts/register': data => AccountsController.register(data)
  });
};
