import Sequelize, { Model } from 'sequelize';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        deliveryId: Sequelize.INTEGER,
        description: Sequelize.STRING,
      },
      {
        sequelize,
        tableName: 'deliveries_problems',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'deliveryId',
      as: 'delivery',
    });
  }
}

export default DeliveryProblem;
