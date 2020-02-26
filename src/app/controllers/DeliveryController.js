import Delivery from '../models/Delivery';
import File from '../models/File';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';

import Queue from '../../lib/Queue';
import DeliveryMail from '../jobs/DeliveryMail';

class DeliveryController {
  /**
   * Mostrando entregas
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const delivery = await Delivery.findAll({
      attributes: ['id', 'product', 'startDate', 'endDate', 'canceledAt'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
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
            'postCode',
          ],
        },
      ],
    });
    return res.json(delivery);
  }

  /**
   * Mostrando entregas por ID
   * @param {*} req
   * @param {*} res
   */
  async show(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id, {
      attributes: ['id', 'product', 'startDate', 'endDate', 'canceledAt'],
      include: [
        {
          model: File,
          as: 'signature',
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
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
            'postCode',
          ],
        },
      ],
    });
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

    // enviando email para o entregador
    const deliveryman = await Deliveryman.findByPk(delivery.deliverymanId);
    const recipient = await Recipient.findByPk(delivery.recipientId);
    await Queue.add(DeliveryMail.key, {
      deliveryman,
      recipient,
      product: body.product,
    });

    return res.status(201).json(delivery);
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

    await delivery.update(body);
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
