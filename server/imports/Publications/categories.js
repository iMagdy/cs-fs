import { Meteor } from 'meteor/meteor';
import { Category } from '/server/imports/Models';

export default () => {
  /**
   * @summary Meteor publication method to find one category.
   */
  Meteor.publish('category', () => new Category().findOne({}, {
    transform: category => new Category().transform(category)
  }));
  /**
   * @summary Meteor publication method to find categories.
   */
  Meteor.publish('categories', () => new Category().find({}, {
    transform: category => new Category().transform(category)
  }));
};
