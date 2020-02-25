import Sequelize, { Model } from 'sequelize';

class Deliverymen extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // avatar_id: Sequelize.INTEGER,
      },
      {
        sequelize,
        tableName: 'deliverymen',
        // freezeTableName: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'file' });
  }
}

export default Deliverymen;
