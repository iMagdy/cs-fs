import accountsRoutes from './accounts';
import booksRoutes from './books';

export default () => {
  accountsRoutes();
  booksRoutes();
};
