import { BookCollection } from '/lib/Collections';

/**
* @class BookMigrations
* @desc Implements operations should be run on company collection during app startup
*/
export default class BookMigrations {
  /**
  * Run migrations
  * @method up
  * @desc This method will run company migrations
  * @return {Boolean} true if completed successfully, false otherwise
  */
  static up() {
    // Make indexes
    BookCollection.rawCollection().stats().then(status => {
    if (!status.indexSizes['name_text']) {
      BookCollection.rawCollection().createIndex({ 'name': 'text' }).then().catch(err => {
        console.error(err);
      });
    }
  });
  }
}
