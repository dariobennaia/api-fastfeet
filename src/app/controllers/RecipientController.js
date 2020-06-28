import { Op } from 'sequelize';
import Recipient from '../models/Recipient';
import { RECIPIENT_NOT_FOUND } from '../messages';

class RecipientController {
  /**
   * Mostrando destinatarios
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
    const recipients = await Recipient.findAll({ where });
    res.json(recipients);
  }

  /**
   * Mostrando destinatario por ID
   * @param {*} req
   * @param {*} res
   */
  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);
    return res.json(recipient || {});
  }

  /**
   * Criando destinatário
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { body } = req;
    const recipient = await Recipient.create(body);
    res.status(201).json(recipient);
  }

  /**
   * Atualizando destinatario
   * @param {*} req
   * @param {*} res
   */
  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ err: RECIPIENT_NOT_FOUND });
    }

    await recipient.update(body);
    return res.json(recipient);
  }

  /**
   * Deletando Destinatario
   * @param {*} req
   * @param {*} res
   */
  async delete(req, res) {
    const { id } = req.params;
    await Recipient.destroy({ where: { id } });
    return res.json();
  }
}

export default new RecipientController();
