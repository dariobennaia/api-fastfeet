import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliverymen from '../models/Deliverymen';

class DeliveryController {
  /**
   * Mostrando entregas
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const recipients = await Delivery.findAll({
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliverymen,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'file',
              attributes: ['name', 'path', 'url'],
            },
          ],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'postcode',
          ],
        },
      ],
    });
    return res.json(recipients);
  }

  /**
   * Mostrando entregas por ID
   * @param {*} req
   * @param {*} res
   */
  async show(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    return res.json(delivery || {});
  }

  /**
   * Criando entregas
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { body } = req;
    const delivery = await Delivery.create(body);
    res.status(201).json(delivery);
  }

  /**
   * Atualizando entregas
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(400).json({ error: 'Entrega inexistente!' });
    }

    await Delivery.update(body);
    return res.json(delivery);
  }

  /**
   * Deletando entregas
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    const { id } = req.params;
    await Delivery.destroy({ where: { id } });
    return res.json();
  }
}

export default new DeliveryController();
