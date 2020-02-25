import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import Deliveryman from '../app/models/Deliveryman';
import File from '../app/models/File';
import Delivery from '../app/models/Delivery';

const models = [User, Recipient, Deliveryman, File, Delivery];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;
    this.mongoConnection = mongoose.connect(
      `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
      { useNewUrlParser: true, useFindAndModify: true }
    );
  }
}

export default new Database();
