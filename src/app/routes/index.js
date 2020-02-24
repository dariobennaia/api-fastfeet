import auth from './modules/auth';
import recipients from './modules/recipients';
import deliverymen from './modules/deliverymen';
import files from './modules/files';

const routes = [auth, recipients, deliverymen, files];

export default routes;
