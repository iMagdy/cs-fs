import { Book } from '/server/imports/Models';
import { ID, BOOKS_CREATE_SCHEMA, BOOKS_UPDATE_SCHEMA } from '/lib/Config/schemas';
import { Controller } from './';


export default class BooksController extends Controller {

  /**
  * @method BooksController.create
  * @desc Creates a new book document
  * @param {Object} data The book info
  * @access private
  * @return {String} The book unique _id
  */
  static create(data) {
    // Validate & Insert
    this.validate(data, BOOKS_CREATE_SCHEMA);
    data.createdAt = new Date().getTime();
    return new Book().insert(data);
  }

  /**
  * @method BooksController.update
  * @desc Updates an existing book instance
  * @param {String} id The book ID
  * @param {Object} data The book modified info
  * @access private
  * @return {Integer} The number of the affected documents
  */
  static update(id, data) {
    this.validate(id, ID);
    this.validate(data, BOOKS_UPDATE_SCHEMA);
    data.updatedAt = new Date().getTime();
    return new Book().update(id, {
      $set: data
    });
  }

  /**
  * @method BooksController.delete
  * @desc Deletes an existing book instance
  * @param {String} id The book ID
  * @access private
  * @return {Integer} The number of the affected documents
  */
  static delete(id) {
    this.validate(id, ID);
    return new Book().remove({ _id: id });
  }

  /**
  * @method BooksController.search
  * @desc Searches books
  * @param {String} text
  * @access private
  * @return {Array}
  */
  static search(text) {
    return new Book().find({ $text: { $search: text } }).fetch();
  }

}
