import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '/lib/Config/constants';
import { ACCOUNTS_REGISTER_SCHEMA } from '/lib/Config/schemas';
import { Controller } from './';

export default class AccountsController extends Controller {

  /**
   * @method AccountsController.register
   * @desc This method handles registering a new customer
   * @param {Object} data The account info used
   * @return {String} The account id
   */
  static register(data) {
    this.validate(data, ACCOUNTS_REGISTER_SCHEMA);
    // Create account
    const userId = Accounts.createUser(data);
    // Set role as customer
    this.setRole(userId, ROLES.customer.value);
    return userId;
  }

  /**
   * @method AccountsController.setRole
   * @desc Sets user role
   * @param {String} id The user id
   * @param {Integer} role The user role
   * @return {String} The number of effected recoreds
   */
  static setRole(id, role) {
    return Accounts.users.update(id, {
      $set: { role }
    });
  }


}
