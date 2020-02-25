import Deliverymen from '../models/Deliverymen';
import File from '../models/File';

class DeliverymanController {
  /**
   * Mostrando entregadores
   * @param {*} req
   * @param {*} res
   */
  async index(req, res) {
    const recipients = await Deliverymen.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'file',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });
    return res.json(recipients);
  }

  /**
   * Mostrando entregadores por ID
   * @param {*} req
   * @param {*} res
   */
  async show(req, res) {
    const { id } = req.params;
    const recipient = await Deliverymen.findByPk(id);
    return res.json(recipient || {});
  }

  /**
   * Criando entregadores
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { body } = req;
    const recipient = await Deliverymen.create(body);
    res.status(201).json(recipient);
  }

  /**
   * Atualizando entregadores
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const recipient = await Deliverymen.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Entregador inexistente!' });
    }

    await Deliverymen.update(body);
    return res.json(recipient);
  }

  /**
   * Deletando entregadores
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    const { id } = req.params;
    await Deliverymen.destroy({ where: { id } });
    return res.json();
  }
}

export default new DeliverymanController();
