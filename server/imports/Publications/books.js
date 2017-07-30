import { Meteor } from 'meteor/meteor';
import { Book } from '/server/imports/Models';

export default () => {
  /**
   * @summary Meteor publication method to find one book.
   */
  Meteor.publish('book', () => new Book().findOne({}, {
    transform: book => book.transform()
  }));
  /**
   * @summary Meteor publication method to find books.
   */
  Meteor.publish('books', () => new Book().find({}, {
    transform: book => book.transform()
  }));
};
