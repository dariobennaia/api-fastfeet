import Sequelize, { Model } from 'sequelize';

class Deliveryman extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // avatarId: Sequelize.INTEGER,
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
    this.belongsTo(models.File, { foreignKey: 'avatarId', as: 'avatar' });
  }
}

export default Deliveryman;
