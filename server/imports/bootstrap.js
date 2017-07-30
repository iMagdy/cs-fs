import seeds from '/server/imports/Database/Seeds';
import migrations from '/server/imports/Database/Migrations';
import routes from '/server/imports/Routes';
import publications from '/server/imports/Publications';

export default () => {
  seeds();
  routes();
  publications();
  migrations();
};
