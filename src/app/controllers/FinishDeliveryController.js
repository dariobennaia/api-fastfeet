import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import { NO_DELIVERY_AVAILABLE } from '../messages/index';

class FinishDeliveryController {
  /**
   * Finalizando entrega
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { deliverymanId, signatureId } = req.body;
    const { id } = req.params;

    // checa se a entrega pode ser finalizada.
    const delivery = await Delivery.findOne({
      where: {
        deliverymanId,
        id,
        startDate: { [Op.ne]: null },
        endDate: null,
        canceledAt: null,
      },
    });

    if (!delivery) {
      return res.status(400).json({ err: NO_DELIVERY_AVAILABLE });
    }

    await delivery.update({ signatureId, endDate: new Date() });
    return res.json(delivery);
  }
}

export default new FinishDeliveryController();
