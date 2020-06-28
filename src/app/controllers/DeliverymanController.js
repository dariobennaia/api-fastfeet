import { Op } from 'sequelize';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

import { DELIVERYMAN_NOT_FOUND, DELIVERYMAN_ALREADY_EXISTS } from '../messages';

class DeliverymanController {
  /**
   * Mostrando entregadores
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const { q } = req.query;
    let where = {};

    if (q) {
      where = {
        name: { [Op.iLike]: `%${q}%` },
      };
    }
    const deliveryman = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      where,
      order: [['id', 'ASC']],
    });
    return res.json(deliveryman);
  }

  /**
   * Mostrando entregadores por ID
   * @param {*} req
   * @param {*} res
   */
  async show(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliveryman.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(deliveryman || {});
  }

  /**
   * Criando entregadores
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { body } = req;

    const deliverymanExists = await Deliveryman.findOne({
      where: { email: body.email },
    });

    if (deliverymanExists) {
      return res.status(400).json({ err: DELIVERYMAN_ALREADY_EXISTS });
    }

    const deliveryman = await Deliveryman.create(body);
    return res.status(201).json(deliveryman);
  }

  /**
   * Atualizando entregadores
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(400).json({ err: DELIVERYMAN_NOT_FOUND });
    }

    await deliveryman.update(body);
    return res.json(deliveryman);
  }

  /**
   * Deletando entregadores
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    const { id } = req.params;
    await Deliveryman.destroy({ where: { id } });
    return res.json();
  }
}

export default new DeliverymanController();
