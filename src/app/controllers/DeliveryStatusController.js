import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveryStatusController {
  /**
   * Listagem de entregas não inicializadas
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const { id: deliverymanId } = req.params;
    const { status = 'pending' } = req.query;

    let where = { deliverymanId };

    switch (status) {
      case 'finished':
        where = { endDate: { [Op.ne]: null }, ...where };
        break;
      case 'pending':
        where = { startDate: null, endDate: null, canceledAt: null, ...where };
        break;
      default:
        where = { id: -1 };
    }

    const deliveries = await Delivery.findAll({ where });

    return res.json(deliveries);
  }
}

export default new DeliveryStatusController();
