import { BookCollection } from '/lib/Collections';
import { Model } from './';

export default class Book extends Model {
  constructor() {
    super();
    this.collection = BookCollection;
  }
}
