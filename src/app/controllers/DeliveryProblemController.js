import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class DeliveryProblemController {
  /**
   * Retorna a encomenda com todos os seus problemas.
   * @param {*} req
   * @param {*} res
   */
  async show(req, res) {
    const { id: deliveryId } = req.params;
    const deliveriesProblems = await DeliveryProblem.findAll({
      where: { deliveryId },
      include: {
        model: Delivery,
        as: 'delivery',
        include: {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
        },
        attributes: ['id', 'product', 'startDate', 'endDate', 'canceledAt'],
      },
      attributes: ['id', 'description', 'createdAt'],
    });
    return res.json(deliveriesProblems);
  }
}

export default new DeliveryProblemController();
