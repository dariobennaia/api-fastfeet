import auth from './modules/auth';
import recipients from './modules/recipients';
import deliverymen from './modules/deliverymen';
import files from './modules/files';
import deliveries from './modules/deliveries';

const routes = [auth, recipients, deliverymen, files, deliveries];

export default routes;
