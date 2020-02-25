import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipientId: Sequelize.INTEGER,
        deliverymanId: Sequelize.INTEGER,
        signatureId: Sequelize.INTEGER,
        product: Sequelize.STRING,
        startDate: Sequelize.DATE,
        endDate: Sequelize.DATE,
        canceledAt: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'deliveries',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipientId',
      as: 'recipient',
    });

    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliverymanId',
      as: 'deliveryman',
    });

    this.belongsTo(models.File, {
      foreignKey: 'signatureId',
      as: 'signature',
    });
  }
}

export default Delivery;
