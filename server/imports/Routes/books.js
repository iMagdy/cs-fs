import { Meteor } from 'meteor/meteor';
import BooksController from '/server/imports/Controllers/BooksController';

export default () => {
  Meteor.methods({
    'books/create': data => BooksController.create(data),
    'books/update': (id, data) => BooksController.update(id, data),
    'books/delete': id => BooksController.delete(id),
    'books/search': text => BooksController.search(text)
  });
};
