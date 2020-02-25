import Sequelize, { Model } from 'sequelize';

const { APP_URL, PORT } = process.env;

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${APP_URL}:${PORT}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default File;
