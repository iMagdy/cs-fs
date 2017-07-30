import _ from 'lodash';
import { Accounts } from 'meteor/accounts-base';
import { ROLES } from '/lib/Config/constants';

/**
* @class AccountSeeder
* @desc Users fixtures class, MUST be called after CompanySeeder
*/
export default class AccountSeeder {

  /**
  * Run seeding process
  * @method run
  * @desc This method will insert companies data
  * @return {Boolean} true if seeding is completed successfully, false otherwise
  */
  static run() {
    if (Accounts.users.find().count() > 0) {
      return false;
    }
    const seeds = [
      {
        username: 'admin',
        email: 'admin@test.com',
        role: ROLES.admin.value,
        profile: { name: 'Admin', email: 'admin@test.com' }
      },
      {
        username: 'reader',
        email: 'reader@test.com',
        role: ROLES.reader.value,
        profile: { name: 'Reader', email: 'reader@test.com' }
      },
      {
        username: 'author1',
        email: 'author1@test.com',
        role: ROLES.author.value,
        profile: { name: 'Author1', email: 'author1@test.com' }
      },
      {
        username: 'author2',
        email: 'author2@test.com',
        role: ROLES.author.value,
        profile: { name: 'Author2', email: 'author2@test.com' }
      }
    ];
    _.each(seeds, doc => {
      doc.password = '123456';
      const userId = Accounts.createUser(doc);
      Accounts.users.update(userId, { $set: { role: doc.role } });
    });
    return true;
  }
}
