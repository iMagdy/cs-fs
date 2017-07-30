import { Mongo } from 'meteor/mongo';
import { CategoryCollection } from './';

const BookCollection = new Mongo.Collection('book', { defineMutationMethods: false });

BookCollection.helpers({
  category() {
    return CategoryCollection.find(this.category_id);
  },
  authors() {
    return Meteor.users.find({ _id: { $in: this.authors } });
  }
});

export default BookCollection;
