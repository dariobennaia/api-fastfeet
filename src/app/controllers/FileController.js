import File from '../models/File';

class FileController {
  /**
   * Criando arquivo
   * @param {*} req
   * @param {*} res
   */
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });
    res.status(201).json(file);
  }
}

export default new FileController();
