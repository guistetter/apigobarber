import Notification from '../Schemas/Notification';
import User from '../models/User';

class Notificationcontroller {
  async index(req, res) {
    const checkIsProvider = await User.findOne({
      // userId vem automatico pelo metodo auth
      where: { id: req.userId, provider: true },
    });

    if (!checkIsProvider) {
      return res
        .status(401)
        .json({ error: 'Only provider can load notification' });
    }

    const notification = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notification);
  }

  // marcar notification como lida
  async update(req, res) {
    // encontra e atualiza ao mesmo tempo, retorna o novo registro com propriedade new
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}
export default new Notificationcontroller();
