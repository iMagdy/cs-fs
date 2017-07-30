import { Mongo } from 'meteor/mongo';
import { BooksCollection } from './';

const CategoryCollection = new Mongo.Collection('category', { defineMutationMethods: false });

CategoryCollection.helpers({
  books() {
    return BooksCollection.find({ category_id: this._id });
  }
});

export default CategoryCollection;
