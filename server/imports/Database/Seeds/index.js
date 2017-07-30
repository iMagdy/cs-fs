import AccountSeeder from './AccountSeeder';
import CategorySeeder from './CategorySeeder';

// Order is IMPORTANT
export default () => {
  AccountSeeder.run();
  CategorySeeder.run();
};
