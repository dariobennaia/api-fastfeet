import auth from './modules/auth';
import recipients from './modules/recipients';
import deliverymen from './modules/deliverymen';
import files from './modules/files';
import deliveries from './modules/deliveries';
import problems from './modules/problems';

const routes = [auth, recipients, deliverymen, files, deliveries, problems];

export default routes;
