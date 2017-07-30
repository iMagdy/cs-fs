import { Category } from '/server/imports/Models';
import _ from 'lodash';

/**
* @class CategorySeeder
* @desc Companies seeds class, must be called first
*/
export default class CategorySeeder {

  /**
  * Run seeding process
  * @method run
  * @desc This method will insert categories data
  * @return {Boolean} true if seeding is completed successfully, false otherwise
  */
  static run() {
    const categoryModel = new Category();
    if (categoryModel.find().count() > 0) {
      return false;
    }
    const seeds = [
      { name: 'Math' },
      { name: 'Science' },
      { name: 'Geography' }
    ];
    _.each(seeds, doc => {
      categoryModel.insert(doc);
    });
    return true;
  }
}
