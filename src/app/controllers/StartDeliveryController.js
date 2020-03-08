import { format, startOfToday, startOfTomorrow } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import {
  OUT_OF_TIME_FOR_DELIVERY,
  DELIVERY_NOT_FOUND,
  DAILY_DELIVERY_LIMIT_EXCEEDED,
} from '../messages/index';

class StartDeliveryController {
  /**
   * Iniciando entrega
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { deliverymanId } = req.body;
    const { id } = req.params;

    // checagem da janela de horario para entregas.
    const currentHours = format(new Date(), 'HH');
    if (currentHours < '08' || currentHours >= '18') {
      return res.status(400).json({ err: OUT_OF_TIME_FOR_DELIVERY });
    }

    // checagem de entregas disponiveis para o entregador informado.
    const delivery = await Delivery.findOne({
      where: { deliverymanId, id, startDate: null },
    });
    if (!delivery) {
      return res.status(400).json({ err: DELIVERY_NOT_FOUND });
    }

    // checagem de entregas diárias para o entregador informado.
    const count = await Delivery.count({
      where: {
        deliverymanId,
        startDate: {
          [Op.between]: [startOfToday(), startOfTomorrow()],
        },
      },
    });
    if (count >= 5) {
      return res.status(400).json({ err: DAILY_DELIVERY_LIMIT_EXCEEDED });
    }

    // inicia entrega
    await delivery.update({ startDate: new Date() });
    return res.json({ delivery });
  }
}

export default new StartDeliveryController();
