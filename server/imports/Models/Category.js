import { CategoryCollection } from '/lib/Collections';
import { Model } from './';

export default class Category extends Model {

  constructor() {
    super();
    this.collection = CategoryCollection;
  }


}
