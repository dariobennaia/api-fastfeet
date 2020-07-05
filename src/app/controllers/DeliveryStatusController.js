import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliveryStatusController {
  /**
   * Listagem de entregas não inicializadas
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const { id: deliverymanId } = req.params;
    const { status = 'pending' } = req.query;
    const { page = 1 } = req.query;

    let where = { deliverymanId };

    switch (status) {
      case 'finished':
        where = { endDate: { [Op.ne]: null }, ...where };
        break;
      case 'pending':
        where = { startDate: null, endDate: null, canceledAt: null, ...where };
        break;
      default:
        where = { ...where };
    }

    const deliveries = await Delivery.findAll({
      where,
      limit: 5,
      offset: (page - 1) * 5,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postCode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'path', 'url'],
        },
      ],
      order: [['updatedAt', 'DESC']],
    });

    return res.json(deliveries);
  }
}

export default new DeliveryStatusController();
